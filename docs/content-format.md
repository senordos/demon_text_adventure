# Text-adventure content format

`content/demon.json` is a complete game definition. It is intentionally data-only: no JavaScript functions, game-specific rules, or HTML are allowed in it. The generic runtime in `game.js` loads this file and applies the rules below.

## Top-level sections

| Section | Purpose |
| --- | --- |
| `meta` | Title, save-key namespace, and splash duration. |
| `playerStart` | Initial screen, gold, health, inventory item IDs, and flags. |
| `items` | Item catalogue. Each item has a stable ID, display name, and description. |
| `screens` | Every playable screen, keyed by a stable ID. |
| `maxims` | Planned catalogue of learnable maxim records for the maxim-duel system. Not interpreted by the current prototype yet. |

## Screen fields

Each screen has a `location`, `art`, `text`, and `choices` array. `art` names an image file and alternative text. `text` is an array of paragraphs. A screen can also have `onEnter`, a list of generic effects applied when the player arrives.

Each choice has a visible `label` and a `destination` screen ID. `@resume` is the only reserved destination; it continues from the saved game after the introduction. A choice can also have `requires` and `effects`.

```json
{
  "label": "Use the brass key",
  "destination": "heath-lane",
  "requires": { "items": ["brass-key"] },
  "effects": [{ "type": "set-flag", "flag": "heath-gate-open", "value": true }]
}
```

When a choice has `requires`, keep the route visible to the player by adding a `blockedHint`. The engine disables it and displays the hint without naming the requirement. This is how an adventure gate remains discoverable without giving away its answer.

```json
{
  "label": "Open the Heath Lane gate",
  "destination": "heath-lane",
  "requires": { "items": ["heath-lane-key"] },
  "blockedHint": "The tiny lock seems to be waiting for a more exact answer."
}
```

## Supported requirements

- `items`: every named item must be held.
- `flags`: every `{ "flag": "name", "value": true }` check must match.
- `goldAtLeast`: player gold must meet the minimum.
- `healthAtLeast`: player health must meet the minimum.

## Supported effects

| Effect type | Required fields | Result |
| --- | --- | --- |
| `add-item` | `item` | Adds the item once. |
| `remove-item` | `item` | Removes the item if held. |
| `change-gold` | `amount` | Adds or subtracts gold. |
| `change-health` | `amount` | Adds or subtracts health, never below zero. |
| `set-flag` | `flag`, `value` | Stores a named story fact. |

## Editing rules

1. Keep screen and item IDs lowercase and hyphenated.
2. Every destination must name an existing screen.
3. Every item referenced by a requirement or effect must exist in `items`.
4. JSON requires double quotes and no trailing commas.
5. Test through a local web server after an edit; direct `file://` opening cannot load JSON content safely.

The browser validates the most important links when it starts and displays an error instead of silently running a broken adventure.

## Planned maxim-duel extension

The next engine increment will add a data-only `maxims` catalogue and generic duel screens. A maxim will have an `opening`, `completion`, source note, and sword-form outcome. The player state will record which maxim IDs have been learned. A duel will declare an opponent poise meter and choices that use known completions; success reduces poise and an incorrect completion applies a generic recoverable health or story effect.

This belongs in content rather than `game.js`: the engine will only recognise generic maxims, meters, requirements, and effects. Demon-specific sayings, characters, jokes, and sword forms remain data. See [the maxim-duel system](maxim-duel-spec.md) for the player-facing and authoring rules.
