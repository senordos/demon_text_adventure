# Maxim-duel system

## Purpose

The sword is not merely an inventory item. It is an old enchanted blade whose forms are activated by correctly completed pieces of wisdom. This makes confrontations a language-and-exploration puzzle, not a simulation of violence and not a contest of insults.

The system is a core Demon mechanic. It is deliberately deterministic: a player who has heard, recorded, and understood a maxim can use it successfully later. There is no random “correct” answer.

## Vocabulary

| Term | Meaning |
| --- | --- |
| **Maxim** | A complete proverb, idiom, local saying, or family saying. |
| **Opening** | The beginning of a maxim offered during an encounter. |
| **Completion** | The correct ending selected by the player. |
| **Turn of Wisdom** | One exchange in a maxim duel. |
| **Book of Questionable Wisdom** | The player-facing record of maxims learned during the adventure. |
| **Poise** | An opponent's ability to maintain composure in a maxim duel; it fulfils the opposing meter role without describing injury. |

## Player experience

1. While exploring, the player encounters people, signs, overheard conversations, books, and family lore that teach a maxim.
2. The maxim is added to the Book of Questionable Wisdom, including where it was learned.
3. A challenging character presents an opening and attempts to turn it into a sword form.
4. The player chooses a completion from the maxims they know, or from a small set of plausible endings where discovery is part of the puzzle.
5. A correct completion activates the appropriate sword form and reduces the opponent's poise.
6. A wrong completion causes a comic misfire—an ill-timed parry, a misplaced flourish, or an embarrassing collision—and costs the player one health point or creates a recoverable setback.
7. At zero poise, the opponent concedes, is distracted, or retreats with dignity under protest. At zero player health, the game gives a comic failure scene and a clear recovery or restart route.

The challenge is never a verbal attack or a response to an insult. Characters may be pompous, cryptic, or needlessly fond of sayings, but the player is completing shared language correctly.

## Content rules

- Traditional English-language proverbs can be used where they are recognisable and fair.
- Distinctive Gaalway and family sayings should be introduced in context before they are required.
- Every required maxim must have an achievable learning route before its first mandatory duel.
- Each maxim needs an opening, completion, source, a short explanation or joke, and the sword form it activates.
- A normal early duel should contain two or three turns; no duel should become a long quiz on a phone screen.
- The sword may use the same maxim knowledge outside a duel: parrying a trap, persuading a stubborn person, or resolving an absurd practical obstacle.

## Example content card

```text
id: bird-in-hand
opening: "A bird in the hand..."
completion: "...is worth two in the bush."
learnedFrom: "The market bird seller, who distrusts bushes."
swordForm: "Bush Parry"
success: "The challenger overcommits and becomes briefly entangled in a hedge."
failure: "The sword searches for a bush indoors and points at a potted fern."
```

## Engine direction

The current prototype does not yet run maxim duels. When implemented, the generic engine will add a data-driven `maxims` catalogue, known-maxim state, and generic numeric meters. A duel screen will declare an opponent poise meter and one or more turns. It will use generic requirements and effects rather than hard-coding any Demon character, phrase, or sword form in `game.js`.
