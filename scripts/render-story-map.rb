#!/usr/bin/env ruby
# Renders the design-time story graph as Mermaid Markdown.
require "yaml"
require "json"

source = File.expand_path("../content/story-map.yaml", __dir__)
destination = File.expand_path("../docs/story-map.md", __dir__)
game_source = File.expand_path("../content/demon.json", __dir__)
map = YAML.load_file(source)
game = JSON.parse(File.read(game_source))

node_ids = map.fetch("nodes").keys
map.fetch("edges").each do |edge|
  [edge.fetch("from"), edge.fetch("to")].each do |node_id|
    abort("Story-map edge refers to unknown node '#{node_id}'.") unless node_ids.include?(node_id)
  end
  edge.fetch("requires", {}).fetch("items", []).each do |item_id|
    abort("Story-map requirement refers to unknown item '#{item_id}'.") unless game.fetch("items").key?(item_id)
  end
end

mapped_screens = map.fetch("nodes").values.map { |node| node["screen"] }.compact
mapped_screens.each do |screen_id|
  abort("Story-map node refers to unknown screen '#{screen_id}'.") unless game.fetch("screens").key?(screen_id)
end

unmapped_screens = game.fetch("screens").keys - mapped_screens - ["splash"]
abort("Live screens missing from story map: #{unmapped_screens.join(', ')}.") unless unmapped_screens.empty?

def mermaid_text(value)
  value.to_s.gsub("\\", "\\\\").gsub('"', '\\"')
end

shapes = {
  "start" => ["([", "])"],
  "checkpoint" => ["{{", "}}"],
  "chapter-end" => ["[[", "]]"],
  "failure" => ["([", "])"],
  "discovery" => ["[", "]"],
  "encounter" => ["[", "]"],
  "location" => ["[", "]"]
}

lines = [
  "# #{map.fetch('title')}",
  "",
  "_Generated from [`content/story-map.yaml`](../content/story-map.yaml) by `ruby scripts/render-story-map.rb`. Edit the YAML, not this diagram._",
  "",
  "## Current playable slice",
  "",
  "```mermaid",
  "flowchart LR"
]

map.fetch("nodes").each do |id, node|
  open, close = shapes.fetch(node.fetch("type"), ["[", "]"])
  lines << "  #{id.gsub('-', '_')}#{open}\"#{mermaid_text(node.fetch('label'))}\"#{close}"
end

map.fetch("edges").each do |edge|
  from = edge.fetch("from").gsub('-', '_')
  to = edge.fetch("to").gsub('-', '_')
  requirements = edge.fetch("requires", {}).fetch("items", [])
  suffix = requirements.empty? ? "" : " — requires #{requirements.join(', ')}"
  lines << "  #{from} -->|\"#{mermaid_text(edge.fetch('label'))}#{suffix}\"| #{to}"
end

lines.concat([
  "```",
  "",
  "## Legend",
  "",
  "- Rounded: start or comic failure scene.",
  "- Double-bordered: chapter end.",
  "- Diamond: checkpoint; an edge label states any requirement.",
  "- Rectangles: locations, discoveries, or conversations.",
  "",
  "## How to use this map",
  "",
  "- A node names one current screen or a planned narrative beat and records its matching screen ID where it exists.",
  "- An edge is a player route; its label records the action and its requirements.",
  "- Node `gives` fields record the knowledge or item unlocked there, even where the current prototype does not yet represent that knowledge in runtime state.",
  "- Add future character encounters, maxim learning, optional routes, and checkpoints here before writing their detailed screens.",
  "- The map is the planning backbone, not a replacement for `content/demon.json`; the JSON remains the authoritative live screen definition."
])

File.write(destination, lines.join("\n") + "\n")
