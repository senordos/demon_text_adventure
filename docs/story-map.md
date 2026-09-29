# Demon — current playable story map

_Generated from [`content/story-map.yaml`](../content/story-map.yaml) by `ruby scripts/render-story-map.rb`. Edit the YAML, not this diagram._

## Current playable slice

```mermaid
flowchart LR
  introduction(["The King's request"])
  city_gates["City Gates"]
  low_street["Low Street"]
  low_street_key["Find the brass key"]
  market_street["Market Street"]
  market_intro["Gatekeeper's advice"]
  locked_road{{"Heath Lane gate"}}
  heath_lane[["Heath Lane — chapter complete"]]
  harbour_street["Harbour Street"]
  gate_failure(["Lose to the City Gates"])
  introduction -->|"Continue"| city_gates
  city_gates -->|"Market Street"| market_street
  city_gates -->|"Low Street"| low_street
  city_gates -->|"Harbour Street"| harbour_street
  city_gates -->|"Walk into the gate"| gate_failure
  gate_failure -->|"Try again"| city_gates
  low_street -->|"Collect key"| low_street_key
  low_street -->|"Return"| city_gates
  low_street -->|"Market"| market_street
  low_street_key -->|"Ask the man"| market_intro
  low_street_key -->|"Market"| market_street
  low_street_key -->|"Return"| city_gates
  market_street -->|"Ask Gatekeeper"| market_intro
  market_street -->|"Try locked road"| locked_road
  market_street -->|"Low Street"| low_street
  market_street -->|"Return"| city_gates
  market_intro -->|"Go to gate"| locked_road
  market_intro -->|"Return to market"| market_street
  market_intro -->|"Return"| city_gates
  locked_road -->|"Use brass key — requires brass-key"| heath_lane
  locked_road -->|"Return"| market_street
  heath_lane -->|"Restart chapter"| city_gates
  harbour_street -->|"Return"| city_gates
  harbour_street -->|"Market"| market_street
```

## Legend

- Rounded: start or comic failure scene.
- Double-bordered: chapter end.
- Diamond: checkpoint; an edge label states any requirement.
- Rectangles: locations, discoveries, or conversations.

## How to use this map

- A node names one current screen or a planned narrative beat and records its matching screen ID where it exists.
- An edge is a player route; its label records the action and its requirements.
- Node `gives` fields record the knowledge or item unlocked there, even where the current prototype does not yet represent that knowledge in runtime state.
- Add future character encounters, maxim learning, optional routes, and checkpoints here before writing their detailed screens.
- The map is the planning backbone, not a replacement for `content/demon.json`; the JSON remains the authoritative live screen definition.
