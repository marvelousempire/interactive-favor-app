# Open Work Backlog — Architecture Sessions 2026-08-07/08

Consolidated gaps from agent platform, senses, instrument rack, Moment Matrix, and desktop stack work. Update status as items close.

---

## P0 — Product foundation (existing critical path)

| Item | Notes |
|------|-------|
| User / favor / vote storage | See dependency table |
| Wire IdentityScore into voice credits | |
| Finish quadratic module + API | |
| Voting UI path | Electron / Capacitor |

---

## P1 — Agent + measurement fusion

| Item | Source doc | Notes |
|------|------------|-------|
| Map Favor stewards to Bishop births | favor-stewards.md | Map, review, marketplace, reputation first |
| Consciousness text per steward | senses-architecture.md | Use templates |
| Mount schema JSON (instrument rack) | instrument-rack.md | Shared Media Resolver + Favor |
| Reading schema JSON | instrument-rack.md | Align with moment_observation |
| Explicit Favor consumption contracts per instrument | instruments-library.md | counsel vs ranking input |
| Device plugin IDs (camera, biometrics, haptics) | senses + desktop-stack | Capacitor / Unity |
| Keep Presence browser scorer schema-compatible | moment-matrix.md | nephew package is SoT |

---

## P1 — Moment Matrix / instruments

| Item | Notes |
|------|-------|
| Populate `affect.dominance` for full VAD | emotion-modeling + SCORE-NAMESPACES |
| Optional Plutchik overlay labels only | never replace continuous scores |
| Build voice tone spectrum + speech pattern curve | signal family gaps |
| Attention decay + proof-over-time curve | instruments-library gaps |
| Improve offline stencil D/Q/T detection | engine limitation |
| Scene Skout drift flags as Smell-channel mounts | senses-architecture |

---

## P1 — App shell

| Item | Notes |
|------|-------|
| Electron shell around voting flow | desktop-stack |
| Capacitor mobile twin | shared web surface |
| Unity embed only for spatial map / light game | not outer shell |

---

## P2 — Later

| Item | Notes |
|------|-------|
| Presence steward durable birth | biometrics permission contracts |
| Ready Play steward | counsel only on ratings |
| Scoreboard Studio rack presets without composite scores | |
| WooCommerce / catalog SKUs for instrument products | Optimus / Motif path |
| TrueSkill 2 engine | documented only |
| Spiritual lens UX (operator-declared only) | |

---

## Explicit non-goals

- No god-agent expansion of “Nephew” as single identity
- No senses.py as second birth authority
- No composite soul score API
- No literal nutrition chemistry for software agents
- No affect/philosophy scores as automatic rank or payment authority

---

## Related

- [Dependency Table](./dependency-table.md)
- [Agent Platform](./agent-platform.md)
- [Favor Stewards](./favor-stewards.md)
- [Instrument Rack](./instrument-rack.md)
- [Moment Matrix](./moment-matrix.md)
