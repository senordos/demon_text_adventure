#!/usr/bin/env node
/* Convert 8-bit RGB/RGBA PNGs into indexed 16-colour EGA PNGs. */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const EGA = [
  [0, 0, 0], [0, 0, 170], [0, 170, 0], [0, 170, 170],
  [170, 0, 0], [170, 0, 170], [170, 85, 0], [170, 170, 170],
  [85, 85, 85], [85, 85, 255], [85, 255, 85], [85, 255, 255],
  [255, 85, 85], [255, 85, 255], [255, 255, 85], [255, 255, 255],
];
const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const result = Buffer.alloc(12 + data.length);
  result.writeUInt32BE(data.length, 0);
  typeBytes.copy(result, 4);
  data.copy(result, 8);
  result.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 8 + data.length);
  return result;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

function decodePng(file) {
  const bytes = fs.readFileSync(file);
  if (!bytes.subarray(0, 8).equals(SIGNATURE)) throw new Error(`${file} is not a PNG`);
  let offset = 8, width, height, bitDepth, colourType;
  const dataParts = [];
  while (offset < bytes.length) {
    const length = bytes.readUInt32BE(offset); const type = bytes.toString('ascii', offset + 4, offset + 8);
    const data = bytes.subarray(offset + 8, offset + 8 + length); offset += length + 12;
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colourType = data[9]; }
    if (type === 'IDAT') dataParts.push(data);
    if (type === 'IEND') break;
  }
  if (bitDepth !== 8 || ![2, 6].includes(colourType)) throw new Error(`${file} must be an 8-bit RGB or RGBA PNG`);
  const channels = colourType === 6 ? 4 : 3;
  const stride = width * channels;
  const packed = zlib.inflateSync(Buffer.concat(dataParts));
  const pixels = Buffer.alloc(width * height * channels);
  let source = 0;
  for (let y = 0; y < height; y++) {
    const filter = packed[source++]; const row = pixels.subarray(y * stride, (y + 1) * stride);
    const previous = y ? pixels.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const value = packed[source++], left = x >= channels ? row[x - channels] : 0, above = previous ? previous[x] : 0, upperLeft = previous && x >= channels ? previous[x - channels] : 0;
      row[x] = (value + (filter === 1 ? left : filter === 2 ? above : filter === 3 ? Math.floor((left + above) / 2) : filter === 4 ? paeth(left, above, upperLeft) : 0)) & 255;
    }
  }
  return { width, height, channels, pixels };
}

function closestEga(r, g, b) {
  let best = 0, distance = Infinity;
  EGA.forEach((colour, index) => {
    const d = (r - colour[0]) ** 2 + (g - colour[1]) ** 2 + (b - colour[2]) ** 2;
    if (d < distance) { distance = d; best = index; }
  });
  return best;
}

function encodeEga({ width, height, channels, pixels }) {
  const rows = Buffer.alloc(height * (1 + Math.ceil(width / 2)));
  for (let y = 0; y < height; y++) {
    const row = y * (1 + Math.ceil(width / 2)); rows[row] = 0;
    for (let x = 0; x < width; x++) {
      const pixel = (y * width + x) * channels;
      const index = closestEga(pixels[pixel], pixels[pixel + 1], pixels[pixel + 2]);
      const packed = row + 1 + Math.floor(x / 2);
      rows[packed] |= x % 2 ? index : index << 4;
    }
  }
  const header = Buffer.alloc(13); header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4); header[8] = 4; header[9] = 3;
  const palette = Buffer.from(EGA.flat());
  return Buffer.concat([SIGNATURE, chunk('IHDR', header), chunk('PLTE', palette), chunk('IDAT', zlib.deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

const directory = process.argv[2];
if (!directory) throw new Error('Usage: quantize-ega.js <scene-directory>');
for (const name of fs.readdirSync(directory).filter(name => name.endsWith('.png')).sort()) {
  const file = path.join(directory, name);
  fs.writeFileSync(file, encodeEga(decodePng(file)));
  console.log(`Converted ${name}`);
}
