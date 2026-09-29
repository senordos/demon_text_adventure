# Demon — technical specification

## 1. Product decision

**Demon will be an installable, offline-capable static web game (a Progressive Web App).** It opens in a browser, can be installed to a phone or desktop home screen, and has no server, account, database, or ongoing hosting cost beyond static-file hosting.

After a player's first successful visit, all game code, fonts, 320×200 scene art, and content will be cached locally. Starting or continuing a game must therefore work with the device completely offline.

This is the best first release format: it feels app-like, works everywhere, is very small, and can later be packaged for app stores using a wrapper only if that proves worthwhile. GitHub Pages, Cloudflare Pages, or Netlify would be suitable low-cost hosting choices; the release choice can wait until a playable build exists.

## 2. Technology

| Concern | Decision |
| --- | --- |
| Language | TypeScript |
| UI | Plain HTML/CSS plus small TypeScript modules; no framework dependency initially |
| Build | Vite |
| Runtime | Modern evergreen browsers (mobile and desktop) |
| Content format | A data-only JSON game definition loaded by the runtime; YAML authoring can be added later if it compiles to the same JSON format |
| Persistence | `localStorage`, with an export/import save option later |
| Offline | Web app manifest and service worker generated at build time |
| Automated checks | Unit tests for state rules and content validation; browser smoke test for a full winning route |

The deliberate non-framework choice keeps the game close to its GW-BASIC roots: a compact, readable engine and content that can be understood without a large web stack. It remains easy to adopt a UI framework later if evidence says it helps.

## 3. Experience requirements

- Present one illustrated text-adventure **screen** at a time.
- Offer numbered choices (`1`–`9`) that work by click/tap and keyboard.
- Show concise location/status text, a 320×200 scene illustration restricted to the fixed 16-colour EGA palette, choices, and a compact persistent status panel.
- Preserve the original palette principle: situation/location in red, choices in green, with accessible contrast and no colour-only meaning.
- Support restart, undo last decision (where technically safe), save/continue, and an optional “start fresh” mode.
- Be deterministic by default: the same choices from the same state yield the same result. Any later randomness must be declared in content and seeded for replayability.
- Support data-driven maxim duels: a character presents a maxim opening, the player selects a learned completion, and the sword applies the corresponding form. Correct completions reduce opponent poise; incorrect completions create comic, recoverable health or story consequences. This must be a learned language puzzle, never an insult-exchange system.
- Use responsive layout, readable font sizing, reduced-motion support, screen-reader labels, and keyboard focus.
- Use a dedicated splash screen for the title, original-style creator credit, and one named title image only—no story text, choices, status, or footer controls. Gameplay screens must not repeat the large title masthead. The splash is shown on every page load and restart for **3 seconds**, then automatically opens the introduction screen. Its duration is a named, easily editable configuration value in the client code. The current replaceable title image is `assets/scenes/title-splash.png`.
- The introduction screen contains the opening premise and exactly one **Continue the adventure** choice. It then starts a new game at City Gates or resumes the saved game when one exists.
- The status strip and footer controls are one compact persistent row anchored to the bottom of the game viewport. It shows gold, health, and held inventory, followed by square restart and street-map icon buttons. It must stay visible and must never drift below the active screen. Do not display a redundant input hint.
- The game occupies one locked, non-scrollable viewport. There must be no document-level vertical scrolling; scenes must be authored and laid out to fit.
- On a typical laptop viewport (minimum target: 1280×720), keep an active gameplay screen—including scene art, narrative, choices, status, and controls—within one viewport. Use a two-column composition: 320×200 scene art on the left, description on the right, choices beneath the description, and the compact status/footer controls below.
- On modern-phone portrait screens, use **iPhone 14 Pro portrait (393×852 CSS pixels)** as the baseline. The scene art is a full-width, un-cropped 16:10 visual header anchored to the top, with no separate gameplay masthead. The location and narrative always remain in a distinct panel beneath the image. The bottom of that panel shows a preview of the first available choice, suffixed **(+ more)** when further choices exist; this preview opens the full choice drawer but does not take the displayed action. The full list slides up from above the footer over the lower story panel, while the image and story remain in place behind it. The footer becomes **Read story** while open and is the control for closing the drawer. Keep real choices at least 44 CSS pixels high for comfortable touch input. The anchored status/footer remains visible at the bottom.
- Fixed-screen content budget: a normal mobile gameplay scene should use no more than two short narrative paragraphs and four choices. A scene requiring more should be split into a follow-on scene or use a short deliberate “continue” choice; it must not introduce scrolling or clip essential controls. Narrative is intentionally replaced, never partly obscured, while the choice drawer is open.
- The live scene files in `assets/scenes/` are strict 16-colour EGA PNGs at 320×200. Their original full-colour source versions are retained unchanged in `assets/scenes/original-colour/` for comparison or future reworking. Palette conversion uses the standard EGA sixteen colours with no dithering, so all scene pixels remain crisp and legible.

## 4. Engine model

The engine is a finite state machine driven by content.

```text
Game state = location + flags + inventory + gold + health + known maxims + history
screen = location/state rules + narrative + scene art + available choices
choice = visibility rules + effects + destination/outcome
```

At every turn the engine will:

1. Select the applicable scene variant for the current location and state.
2. Render its text, scene art, status, and choices.
3. Reject unavailable input safely and explain why.
4. Apply the selected choice's effects atomically.
5. Persist the resulting state locally.

Content owns story text, choices, requirements, effects, characters, items, endings, and scene-art references. The engine owns only generic rules, rendering, input, persistence, and validation. This separation means story changes do not require engine changes. The first implementation is `content/demon.json`; see `docs/content-format.md` for the author-facing schema. Named-character creative continuity is held in `docs/character-bible.md`; the future data catalogue will use stable character IDs so scenes can refer to profiles without duplicating them.

The maxim-duel extension follows the same separation. The engine will understand a generic learned-maxim record and generic numeric meters such as player health and opponent poise; content will define all openings, completions, characters, outcomes, and sword forms. See `docs/maxim-duel-spec.md`.

## 5. Repository shape when implementation begins

```text
content/             Author-written story source and scene-art references
  world.yaml          World topology and initial state
  locations/          One file per location
  items.yaml
  characters.yaml
docs/                Decisions, specs, source inventory, writing notes
src/                 Generic game engine and browser UI
tests/               Engine and content-route tests
public/              Manifest, icons, and other static release assets
original_assets/     Untouched photographs of the original material
```

## 6. Acceptance criteria for the first playable slice

- The game runs locally after one documented install command.
- A player can start at City Gates with 100 gold and a sword.
- Number keys and buttons select the same choices.
- At least two map locations, one NPC, one collectible, one blocked route, and one failure/restart path work.
- Refreshing the page restores the current game.
- A built copy works after its first load with the network disabled.
- Automated validation fails for broken destinations, duplicated choice IDs, unknown items, impossible requirements, and a location with no viable route.

## 7. Release path

1. Develop and test locally.
2. Publish the generated static files to a static host with HTTPS.
3. Test installation and offline play on an iPhone/Android device and a desktop browser.
4. Share the URL.
5. Only consider App Store/Google Play packaging after the web version has players; that adds developer accounts, store review, and maintenance without improving the core game.
