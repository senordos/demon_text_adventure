# Demon — story bible

## Purpose

This document holds the enduring story logic behind individual screens: what the player is trying to achieve, why each major obstacle exists, and how character anchors, maxims, items, and locations contribute to the route. The visual route map is generated in [the story map](story-map.md); named-character continuity lives in [the character bible](character-bible.md).

The story bible is an authoring artifact, not game code. It should remain clear enough to discuss and alter without touching screen prose or JavaScript.

## Canonical premise

The Princess of Gaalway has been kidnapped by Mario Puzo. The King gives the player one hundred gold pieces and a sword, then sends them into Gaalway to rescue her. The sword's fuller purpose is gradually revealed: it is enchanted to respond to correctly completed maxims.

## Current playable chapter

The existing prototype is a deliberately small first chapter, not the complete plot:

1. The player leaves the City Gates and may explore Low Street, Market Street, or Harbour Street.
2. Low Street supplies the brass key.
3. Market Street and the Gatekeeper point the player toward the locked route to Heath Lane.
4. The brass key opens the Heath Lane gate.
5. Heath Lane ends the chapter while the larger rescue remains unresolved.

The current graph is in [the story map](story-map.md). The Gatekeeper's advice is useful direction, but the only presently enforced checkpoint is the brass key.

## Future story structure

The complete game should be a chain of understandable needs, with optional exploration and comic failures around it:

```text
Find the route to the Princess
  → learn why Puzo's defences cannot simply be crossed
  → obtain legal authority or the correct interpretation of a restriction
  → solve a practical mechanical obstacle
  → learn and apply required maxims
  → reach the final defence and rescue the Princess
```

Claire and Christian are draft story anchors, not yet part of the playable slice. Claire makes a legal restriction intelligible and may provide formal authority once the player supplies the right evidence. Christian explains and resolves a mechanical problem once the player has the necessary component or information. The player still assembles the solution; no character should solve the game on their behalf.

## Backbone rules

- Every mandatory checkpoint must state what it requires and where each requirement can be learned, found, traded for, made, or earned.
- Every required item and maxim must be obtainable before it is demanded.
- A clue should point to the next useful place or person; it should not merely restate the current problem.
- Optional branches can grant shortcuts, comic scenes, alternate solutions, or richer character context, but must rejoin the main route cleanly.
- A wrong choice may cost health, time, dignity, or position, but must lead to a recoverable state or an explicit comic failure/restart.
- Character contributions are bounded: advice, authority, object, service, maxim, or witness information. This preserves the player's role as problem solver.
- The maxim-duel system must reward prior learning rather than general-knowledge guessing. See [the maxim-duel specification](maxim-duel-spec.md).

## Authoring sequence

1. Add or revise a node and its edges in `content/story-map.yaml`.
2. Regenerate `docs/story-map.md` and inspect the Mermaid view for missing routes or circular dependencies.
3. Record the story reason, character anchor, and any maxim/item dependency here and in the character bible.
4. Implement or revise the corresponding screens in `content/demon.json`.
5. Play the route from a clean save and test at least one wrong-but-plausible route.
