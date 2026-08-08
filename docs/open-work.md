# Open Work Backlog — Architecture Sessions 2026-08-07/08

Consolidated gaps from product framing, agent platform, senses, instrument rack, Moment Matrix, Kingdom houses, solvency formula, and desktop stack work. Update status as items close.

See also: [architecture-session-2026-08.md](./architecture-session-2026-08.md) · [dependency-table.md](./dependency-table.md) · [favor-product.md](./favor-product.md)

---

## P0 — Product foundation (critical path)

| Item | Notes |
|------|-------|
| User / favor / vote storage | See dependency table |
| Wire IdentityScore into voice credits | |
| Finish quadratic module + API | |
| Voting UI path | Electron / Capacitor |
| API layer + auth | |

---

## P0 — Product exchange model (documented 2026-08-08; build next)

| Item | Source doc | Status |
|------|------------|--------|
| Product definition: social-capital ledger | [favor-product.md](./favor-product.md) | **Docs done** |
| Verb vs Noun favor taxonomy + UI tabs | [verb-noun-favors.md](./verb-noun-favors.md) | **Docs done** |
| Barter settlement (cash % + favors) | [favor-barter-solvency.md](./favor-barter-solvency.md) | **Docs done** |
| Proposed-favors catalog data model | favor-barter-solvency.md | **Open** — implement |
| Escrow alternative on favor-primary deals | favor-barter-solvency.md | **Open** — provider choice |
| Proof tiers for high claimed values | favor-barter-solvency.md | **Open** — policy + UX |
| Obligation timeline / breach UX | verb-noun-favors.md | **Open** |
| Legal stance on honor-contract enforceability | favor-product.md | **Open** — jurisdiction |

---

## P1 — Favor Moment Matrix + solvency measurement

| Item | Source doc | Notes |
|------|------------|-------|
| Adapter wrapping `@nephew/moment-matrix` `scorePrompt` | favor-moment-matrix.md | Do not fork engine |
| Claim composer stencil checklist (V·N·D·Q·T) | microslice-solvency-formula.md | needs-information, not punish |
| Persist `moment_id` + hash on favor/review records | favor-moment-matrix.md | Version EQ presets |
| Improve offline Destination/Quality/Time extraction | upstream nephew | Honest incomplete until then |
| SCORE-NAMESPACES compliance in Favor API responses | score-namespaces.md | Reject non-null composite_soul_score |

---

## P1 — Agent + measurement fusion

| Item | Source doc | Notes |
|------|------------|-------|
| Map Favor stewards to Bishop births | favor-stewards.md | Map, review, marketplace, reputation first |
| Explicit `primary_role` on compose decisions | bishop-birth-roles.md | Do not rely on executor default |
| Pin `hierarchy.boss` for Favor product line | bishop-birth-roles.md | |
| Consciousness text per steward | senses-architecture.md | Use templates |
| Birth posture detect→recommend only | bishop-birth-roles.md | No remediate tools initially |
| Mount schema JSON (instrument rack) | instrument-rack.md | Shared Media Resolver + Favor |
| Reading schema JSON | instrument-rack.md | Align with moment_observation |
| Explicit Favor consumption contracts per instrument | instruments-library.md | counsel vs ranking input |
| Device plugin IDs (camera, biometrics, haptics) | senses + desktop-stack | Capacitor / Unity |
| Keep Presence browser scorer schema-compatible | moment-matrix.md | nephew package is SoT |

---

## P1 — Moment Matrix / instruments (measurement quality)

| Item | Notes |
|------|-------|
| Populate `affect.dominance` for full VAD | emotion-modeling + SCORE-NAMESPACES |
| Optional Plutchik overlay labels only | never replace continuous scores |
| Build voice tone spectrum + speech pattern curve | signal family gaps |
| Attention decay + proof-over-time curve | instruments-library gaps |
| Scene Skout drift flags as Smell-channel mounts | senses-architecture |

---

## P1 — App shell

| Item | Notes |
|------|-------|
| Electron shell around voting flow | desktop-stack |
| Capacitor mobile twin | shared web surface |
| Unity embed only for spatial map / light game | not outer shell |

---

## P2 — Kingdom counsel + stewards later

| Item | Notes |
|------|-------|
| Decide which Favor decisions warrant targeted Kingdom routes | kingdom-houses.md |
| Pair 5 (Precision/Vision) for exact-vs-durable product questions | solvency-house.md |
| Scoreboard Studio Matrix + optional Kingdom counsel panels | no composite |
| Presence steward durable birth | biometrics permission contracts |
| Ready Play steward | counsel only on ratings |
| YONAW / Ready Play stewards P2 after P1 four | favor-stewards.md |
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
- No Matrix axes as Ready Play match outcomes or quadratic multipliers
- No twelve permanent agents for twelve Kingdom sides
- No inventing registry roles outside the fourteen without SNF update
- No framing Favor as a state social-credit system
- No chore-marketplace-first positioning (network leverage is the product language)

---

## Related

- [What Favor Is](./favor-product.md)
- [Verb / Noun Favors](./verb-noun-favors.md)
- [Favor Barter & Solvency](./favor-barter-solvency.md)
- [Architecture Session 2026-08](./architecture-session-2026-08.md)
- [Dependency Table](./dependency-table.md)
- [Agent Platform](./agent-platform.md)
- [Bishop Birth Roles](./bishop-birth-roles.md)
- [Favor Stewards](./favor-stewards.md)
- [Favor Moment Matrix](./favor-moment-matrix.md)
- [Instrument Rack](./instrument-rack.md)
- [Kingdom Houses](./kingdom-houses.md)
- [Microslice Solvency Formula](./microslice-solvency-formula.md)
