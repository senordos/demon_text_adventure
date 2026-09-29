# Demon — current playable story map

_Generated from [`content/story-map.yaml`](../content/story-map.yaml) by `ruby scripts/render-story-map.rb`. Edit the YAML, not this diagram._

## Current playable slice

```mermaid
flowchart LR
  introduction(["The King's request"])
  city_gates["City Gates"]
  low_street["Low Street (optional)"]
  market_street["Market Street"]
  market_key["Acquire brass key blank"]
  market_intro["Gatekeeper's route advice"]
  east_street{{"East Street delivery cart"}}
  east_street_cleared["Acquire lock-pattern rubbing"]
  christian_street["Christian Street"]
  senor_dos_garage["Señor Dos' Garage"]
  garage_advice["Christian's engineering advice"]
  garage_key_made["Acquire Heath Lane key"]
  locked_road{{"Heath Lane gate"}}
  heath_lane[["Heath Lane — current goal reached"]]
  harbour_street["Harbour Street (optional)"]
  gate_failure(["Lose to the City Gates"])
  introduction -->|"Continue"| city_gates
  city_gates -->|"Market Street"| market_street
  city_gates -->|"Low Street"| low_street
  city_gates -->|"Harbour Street"| harbour_street
  city_gates -->|"Walk into the gate"| gate_failure
  gate_failure -->|"Try again"| city_gates
  low_street -->|"Return"| city_gates
  low_street -->|"Market"| market_street
  market_street -->|"Buy brass key"| market_key
  market_street -->|"Ask Gatekeeper"| market_intro
  market_street -->|"East Street"| east_street
  market_street -->|"Try Heath Lane gate"| locked_road
  market_street -->|"Low Street"| low_street
  market_street -->|"Return"| city_gates
  market_key -->|"Ask Gatekeeper"| market_intro
  market_key -->|"East Street"| east_street
  market_key -->|"Return"| market_street
  market_intro -->|"East Street"| east_street
  market_intro -->|"Try Heath Lane gate"| locked_road
  market_intro -->|"Return to market"| market_street
  market_intro -->|"Return"| city_gates
  east_street -->|"Chock wheel — requires brass-key"| east_street_cleared
  east_street -->|"Christian Street — requires lock-pattern-rubbing"| christian_street
  east_street -->|"Return"| market_street
  east_street_cleared -->|"Christian Street"| christian_street
  east_street_cleared -->|"Return"| market_street
  christian_street -->|"Enter garage"| senor_dos_garage
  christian_street -->|"Return to East Street"| east_street
  senor_dos_garage -->|"Cut Heath Lane key — requires brass-key, lock-pattern-rubbing"| garage_key_made
  senor_dos_garage -->|"Ask for advice"| garage_advice
  senor_dos_garage -->|"Return"| christian_street
  garage_advice -->|"Cut Heath Lane key — requires brass-key, lock-pattern-rubbing"| garage_key_made
  garage_advice -->|"Return"| christian_street
  garage_key_made -->|"Thank Christian"| christian_street
  garage_key_made -->|"East Street"| east_street
  locked_road -->|"Open gate — requires heath-lane-key"| heath_lane
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
