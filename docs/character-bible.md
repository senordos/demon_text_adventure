# Demon — character bible

## Purpose

This is the design-time source of truth for named characters. It gives the story a stable set of people with skills, motives, voices, and plot anchors before their scenes are written. It is not the live game data file and does not itself make a character appear in play.

The game will also retain generic background characters: traders, guards, ferry passengers, and passers-by whose purpose is atmosphere, a small joke, or a local clue. Named characters appear only where the story benefits from their particular skill or relationship.

## Privacy and visual-reference rule

The supplied original photographs and character-reference images are private working material in `original_assets/photos/`. They are deliberately excluded from the public repository and game build. A profile may name its local EGA reference file for authoring continuity, but the game should use only approved, game-ready artwork. Before a named person becomes a public character, decide whether their real name, likeness, and backstory are appropriate for a public game, or give them a fictional in-world name.

## How profiles connect to the game

Each named character supplies one or more **story anchors**: a capability, clue, object, authority, relationship, or maxim that makes a later part of the adventure possible. Scenes remain baked game content, but scene authors refer back to this document rather than recreating a person's personality each time.

The eventual data model will contain a generic `characters` catalogue and let a screen list its present cast by stable character ID. The engine does not need to know who Claire or Christian is; it only loads character data, checks availability rules, and renders the scene content written for the current state.

## Profile template

| Field | What to record |
| --- | --- |
| Stable ID | Lowercase, hyphenated content identifier. |
| Working name | The current authoring name; later replace if a fictional public name is chosen. |
| Status | Draft, implemented first encounter, approved, or retired. |
| Role and home base | Occupation, shop/house/area, and likely map location. |
| Visual direction | Short EGA-art direction and local-only reference filename, if one exists. |
| Skills and limits | What this person can help with and what prevents them simply solving the game. |
| Voice | A few concise notes on rhythm, vocabulary, priorities, and comic angle. |
| Story anchors | The legal, practical, social, or maxim-related things this character enables. |
| Maxim relationship | Sayings taught, tested, misunderstood, or otherwise connected to the Book of Questionable Wisdom. |
| State changes | What changes after meeting, helping, offending, or completing their request. |
| Scene use | Intended first meeting, recurring locations, and likely EGA scene needs. |
| Relationships | Connections to the Princess, Puzo, other characters, or the town. |

## Initial named-character register

### Claire — draft

| Field | Current design direction |
| --- | --- |
| Stable ID | `claire-solicitor` |
| Role and home base | A solicitor or legal adviser; exact office and map location to be decided. |
| Visual direction | Local-only reference: `original_assets/photos/claire_EGA.jpg`. Public character art still requires approval. |
| Skills | Reads ancient agreements, spots loopholes, drafts permissions, and knows which authority has accidentally signed away a right of way. |
| Limits | Will not help without a properly framed question, plausible evidence, or an appointment that is technically valid. |
| Voice | Calm, precise, dry, and unhurried while everybody else is in a panic. |
| Story anchors | A legal requirement blocks a route, object, or action. Claire identifies the rule and the evidence or wording needed to satisfy it. |
| Maxim relationship | Can teach a formal or archaic maxim whose precise wording matters. |
| Scene use | A consultation scene, followed later by a consequence of her advice rather than repeated exposition. |

### Christian — implemented first encounter

| Field | Current design direction |
| --- | --- |
| Stable ID | `christian-wheelwright` |
| Role and home base | A carriage, wheel, and mechanical-repair specialist at Señor Dos' Garage on Christian Street. |
| Visual direction | Local-only reference: `original_assets/photos/christian_EGA.jpg`. The game currently uses an approved 320×200 strict-16-colour EGA garage scene derived from this direction. |
| Skills | Diagnoses wheels, axles, gates, pulleys, winches, ropes, and other practical contraptions; offers grounded engineering advice. |
| Limits | Needs the correct parts, a safe working space, or a reason not to repair something in the most expensive possible way. |
| Voice | Practical, curious, and ready with an analogy involving a wheel that has definitely failed before. |
| Story anchors | Turns the brass key blank and East Street lock-pattern rubbing into the Heath Lane key; explains why a normal key will not satisfy the gate. |
| Maxim relationship | Can teach a practical saying about preparation, leverage, or not trusting a wheel simply because it is round. |
| Scene use | Christian Street arrival, Señor Dos' Garage introduction/advice, and the key-cutting exchange after the player brings both materials. |

### Other drafted visual references

These people have local EGA reference images but no approved game role yet. Do not invent their profiles prematurely; their role should grow from the needed story anchor and their own ideas.

| Working name | Proposed stable ID | Local-only reference | Status |
| --- | --- | --- | --- |
| Andy | `andy` | `original_assets/photos/andy_ega.jpg` | Role to define |
| Becky | `becky` | `original_assets/photos/becky_EGA.jpg` | Role to define |
| Jade | `jade` | `original_assets/photos/jade_EGA.jpg` | Role to define |
| Laura | `laura` | `original_assets/photos/laura_EGA.jpg` | Role to define |
| Mark | `mark` | `original_assets/photos/mark_EGA.jpg` | Role to define |
| Rob | `rob` | `original_assets/photos/rob_EGA.jpg` | Role to define |

## Story spine, before scene prose

The story should be planned as a chain of needs, not merely a route through locations. Named characters make the chain believable:

```text
Rescue the Princess
  └─ reach Mario Puzo's final defence
       ├─ resolve a legal or authority-based restriction → Claire
       ├─ resolve a mechanical route, machine, or vehicle problem → Christian
       ├─ learn required maxims through people and places
       └─ assemble ordinary objects that become useful in a ridiculous context
```

This is intentionally not a finished plot. It establishes that each named character has a useful, bounded contribution, while the player remains the person who connects clues, gathers the required knowledge, and makes the decisions.

## Authoring workflow

1. Define the required story anchor before assigning a character to it.
2. Complete a profile before writing that character's first dialogue-heavy scene.
3. Give each named character a first scene, a useful scene, and a changed-or-return scene where appropriate.
4. Connect each maxim to a discoverable speaker, place, or document before requiring it.
5. Add scene-specific text and choices to `content/demon.json` only after the profile and route dependency are clear.
6. Keep a character's public name, visual depiction, and personal references under review before publication.
