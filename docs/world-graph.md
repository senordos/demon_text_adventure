# Gaalway street graph

This is the canonical, editable interpretation of the original hand-drawn city map. It is deliberately separate from the archival photograph: if recovered GW-BASIC code proves a connection wrong, update this document and `content/world.yaml` together.

```mermaid
flowchart TB
  HS[High Street] --- AS[Andy Street]
  HS --- WS[Wigan Street]
  HL[Heath Lane] --- WS
  HL --- CS[Christian Street]
  AS --- WEST[West Street]
  WS --- WEST
  WS --- EAST[East Street]
  CS --- EAST
  WEST --- AA[Acton Avenue]
  WEST --- MS[Market Street]
  EAST --- MS
  EAST --- MR[Manchester Road]
  LOW --- WEST
  LOW --- EAST
  AA --- LOW[Low Street]
  MS --- LOW
  EAST --- HAR[Harbour Street]
  MS --- HAR[Harbour Street]
  MR --- HAR
  LOW --- GATES[City Gates]
  HAR --- GATES
  MS --- GATES
```

## Street placement

| Street | Orientation | Map position |
| --- | --- | --- |
| High Street | Horizontal | Upper-left |
| Heath Lane | Horizontal | Upper-right |
| Andy Street | Vertical | Upper-left |
| Wigan Street | Vertical | Upper-centre |
| Christian Street | Vertical | Upper-right |
| West Street | Horizontal | Centre-left |
| East Street | Horizontal | Centre-right |
| Acton Avenue | Vertical | Bottom-left |
| Market Street | Vertical | Bottom-centre |
| Manchester Road | Vertical | Bottom-right |
| Low Street | Horizontal | Lower-left |
| Harbour Street | Horizontal | Lower-right |
| City Gates | Landmark/entrance | Lower centre |

## Route examples

- Low Street → West Street → Acton Avenue
- Low Street → East Street → Harbour Street
- Low Street → East Street → Market Street
- High Street → Wigan Street → East Street
- City Gates → Market Street → Harbour Street

The first three routes are retained as explicit navigation checks when the full game engine is implemented.
