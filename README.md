# Demon

The modern return of the original **Demon: The Ultimate Text Adventure**, conceived by Christian Timms and Andrew Davies.

This repository begins with the surviving manual and city map in `original_assets/`. They are the source material for a small, funny, deterministic, choice-driven adventure about rescuing the Princess of Gaalway from the evil Mario Puzo.

## Project guide

- [Technical specification](docs/technical-spec.md) — platform, engine, accessibility, offline play, and release plan.
- [Content specification](docs/content-spec.md) — canon, tone, story structure, world rules, and authoring workflow.
- [World seed data](content/world.yaml) — the first machine-readable version of the original city map and starting state.
- [Source inventory](docs/source-inventory.md) — what was recovered from each original asset.

## Try the first prototype

The project includes a small, dependency-free playable style prototype. From this folder, run:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). Choose options by clicking or pressing their number keys. Progress is saved in the browser; use **Start again** to reset it.

The current build is a deliberately short vertical slice: City Gates, Low Street, the Market, a comic character, an item, a blocked route, and a failure/restart path. Its five original scene illustrations are displayed at 320×200 source resolution with crisp pixel scaling, establishing an EGA-era visual language before we grow the full content-driven engine.

Every launch and restart begins with a 3-second title splash using [title-splash.png](/Users/christian/Documents/coding/demon_text_adventure/assets/scenes/title-splash.png). It then opens the one-choice introduction screen, which starts a new game at City Gates or resumes the saved game. The splash duration is configurable near the top of `game.js`.
