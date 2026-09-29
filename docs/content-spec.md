# Demon — content specification

## 1. Purpose and canon

This is a new game built from the surviving original design, not an attempt to pretend that unfinished teenage code was complete. The original material is authoritative for its title, premise, starting kit, original map, and deterministic numbered-choice format. New story and puzzles will be written around it in the same affectionate spirit.

**Canonical opening:** The King of Gaalway's daughter, the Princess of Gaalway, has been kidnapped by the evil Mario Puzo. The player must rescue her. They begin at the City Gates with 100 gold pieces and a sword.

**Original design promises to retain:** follow the map; navigate the city; find clues; collect objects; stay alive; numbered choices; a game that can be learned through replay.

**Canonical new mechanic:** the player's sword is enchanted to perform forms when a known maxim is correctly completed. During the adventure, people may offer an opening from a proverb, idiom, local saying, or family saying. The player learns these maxims through exploration and later selects the appropriate completion in a maxim duel. This is a language-and-memory challenge, not an insult contest. The detailed rule set is in [the maxim-duel system](maxim-duel-spec.md).

## 2. Tone

Comic fantasy with a straight-faced narrator, silly names, dry consequences, and warmly absurd people. The danger is real enough for a game, but never grim or cruel. The joke should usually emerge from character, observation, or a player's choice—not from reference-heavy parody.

Mario Puzo is an original fictional villain in this game world. We will avoid borrowing plot, dialogue, or distinctive characters from external works.

## 2.1 Presentation rules

The opening splash screen carries the full title, **Demon: The Ultimate Text Adventure**, and the credit **“A game by Christian Timms and Andrew Davies”**, echoing the original manual. Active game screens lead with the current location and situation instead, so the story has the available screen space.

## 3. World seed

The city is Gaalway. Its recovered street names are:

- **City Gates** at the south entrance.
- **Low Street** and **Harbour Street** along the southern edge.
- **Acton Avenue** and **Manchester Road** as the lower west/east boundaries.
- **West Street** and **East Street** across the centre.
- **Wigan Street** through the upper centre and **Market Street** through the lower centre.
- **Andy Street** and **Christian Street** as the upper west/east boundaries.
- **High Street** and **Heath Lane** along the northern edge.

The schematic topology in `content/world.yaml` is intentionally an initial interpretation of the hand-drawn map, rather than a claim to exact historical reconstruction. It is easy to amend once the original code is found.

The canonical street graph and placement metadata live in `docs/world-graph.md`. The playable map, content data, and future navigation choices must follow that document.

## 4. Story arc (first draft)

| Act | Player goal | Tentative comic material |
| --- | --- | --- |
| I — Getting in | Find out why the gates are unattended and enter the city | A gatekeeper on an unpaid tea break; a guard who insists the sword needs a library card |
| II — Getting wise | Assemble clues, allies, maxims, and the means to reach Puzo | Bureaucratic market traders, an overconfident harbour ferryman, a suspiciously literal street musician, and sayings that turn into sword forms |
| III — Getting there | Pass the villain's layered defences | Puzzles that reward attention to prior jokes and map knowledge |
| IV — Getting out | Rescue the Princess and resolve the final bargain | The Princess has a competent escape plan, but needs one ridiculous missing component |

This is a planning scaffold, not final prose. The player should be able to finish one intended route in roughly 45–90 minutes, with optional scenes, failure endings, and alternate comic outcomes.

## 5. Authoring rules

Every location file will define:

- a stable ID and map position;
- its default narrative and EGA scene-art reference;
- state-specific variants, ordered from most specific to least specific;
- two to five clearly worded choices;
- requirements (items, gold, flags, or prior events);
- effects (move, add/remove item, adjust gold/health, set flag, ending);
- an explicit response for a choice that becomes unavailable after discovery, if that is funny or useful.

Where a location teaches a maxim, author the speaker or source, the opening, the completion, its Book of Questionable Wisdom note, and the later encounter(s) in which it is useful. Where a character challenges the player, author their poise, their openings, the correct completions, and both comic success and recoverable failure text.

Every item needs a unique ID, display name, short description, and a purpose or deliberate red-herring label. Every non-player character needs a role, voice note, location(s), and state flags that record meaningful changes. Named characters additionally need a profile and story-anchor record in [the character bible](character-bible.md) before their first dialogue-heavy scene is authored.

No prose should silently modify state. No choice should dead-end the player without an intentional ending or a recoverable route. Failures should explain what happened and offer restart/undo.

## 6. Content workflow

1. Translate the original map into location IDs and connections.
2. Create a one-screen “story card” for each location: purpose, resident, clue/item, exits, and possible joke.
3. Draw the critical path in a route diagram before writing full prose.
4. Write the playable scenes as data, including state variants and choices.
5. Create maxim cards and place each learning route before its required encounter.
6. Add a short original EGA-style 320×200 scene only after each scene works in text.
7. Play through the route from a clean save, then test the wrong-but-plausible choices and every duel outcome.
8. Mark every new invention as `new` in author notes, so recovered GW-BASIC code can be reconciled respectfully.

## 7. Initial content questions to settle later

- Is “Gaalway” intentionally spelled with two As, and should it remain so? (Default: yes.)
- Which parts of the recovered map are routes versus district labels?
- Does the Princess have a recorded name or personality in the original code/manual?
- Is Mario Puzo a demon, a person, a title, or something cheerfully less sensible?
- Which real-life in-jokes from the original creators should be preserved, changed, or kept private?
