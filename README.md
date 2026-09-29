# Demon

The modern return of the original **Demon: The Ultimate Text Adventure**, conceived by Christian Timms and Andrew Davies.

This repository begins with the surviving manual and city map in `original_assets/`. They are the source material for a small, funny, deterministic, choice-driven adventure about rescuing the Princess of Gaalway from the evil Mario Puzo.

## Project guide

- [Technical specification](docs/technical-spec.md) — platform, engine, accessibility, offline play, and release plan.
- [Content specification](docs/content-spec.md) — canon, tone, story structure, world rules, and authoring workflow.
- [World seed data](content/world.yaml) — the first machine-readable version of the original city map and starting state.
- [Playable game definition](content/demon.json) — all current screens, text, artwork references, choices, item definitions, requirements, and effects.
- [Content format](docs/content-format.md) — how to edit a game definition without changing the runtime engine.
- [Source inventory](docs/source-inventory.md) — what was recovered from each original asset.

## Try the first prototype

The project includes a small, dependency-free playable style prototype. From this folder, run:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). Choose options by clicking or pressing their number keys. Progress is saved in the browser; use **Start again** to reset it.

The current build is a deliberately short vertical slice: City Gates, Low Street, the Market, a comic character, an item, a blocked route, and a failure/restart path. Its five original scene illustrations are displayed at 320×200 source resolution with crisp pixel scaling.

`game.js` is now a generic runtime: it loads `content/demon.json`, keeps state, renders screens, applies generic item/status effects, and saves progress. It contains no Demon story text, routes, item names, or artwork paths. To write or alter the game, edit the JSON definition and refresh the local server. The browser validates broken screen and item references when the game starts.

Every launch and restart begins with a 3-second title splash using [title-splash.png](/Users/christian/Documents/coding/demon_text_adventure/assets/scenes/title-splash.png). It then opens the one-choice introduction screen, which starts a new game at City Gates or resumes the saved game. The splash duration is configured in `content/demon.json`.
