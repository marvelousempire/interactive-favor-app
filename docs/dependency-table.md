# Engineering Dependency & Priority Table

## How to Read This Table

- **Depends on** = must be stable before this component can be finished.
- **Status** = Design / Stub / Implemented / Blocked.
- **Priority** = P0 (critical path) → P3 (can wait).

Architecture backlog: [open-work.md](./open-work.md) · Session record: [architecture-session-2026-08.md](./architecture-session-2026-08.md)

---

## Core Engine

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| YONAW scoring (`src/yonaw/`) | — | Implemented | P0 | Pure TS functions |
| Vote aggregation | YONAW scoring | Implemented | P0 | Same module |
| Quadratic voice-credit budget | YONAW scoring | Designed | P0 | Needs dedicated module + persistence |
| IdentityScore / Sybil (`src/sybil/`) | — | Implemented | P0 | Gates voice credits & voting |
| Voice-credit × IdentityScore wiring | Quadratic + IdentityScore | Not started | P0 | Simple multiplier |
| Y-score (`src/reputation/yScore.ts`) | Performance history | Implemented | P0 | MAD + IQR + discrete decay |
| Reputation update engine (Performance, Credibility) | Aggregation events | Designed | P0 | Chain-of-responsibility + decay |
| Reputation decay helpers | — | Designed | P1 | See [reputation-decay.md](./reputation-decay.md) |
| Reach / network graph | Reputation + favor history | Designed | P1 | Feeds Unity map |

## Competitive / Ranking

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| Rating engine interface (`src/rating/types.ts`) | — | Implemented | P1 | Pluggable |
| Elo engine | Interface | Implemented | P1 | `src/rating/elo.ts` |
| Glicko-2 engine | Interface | Implemented | P1 | `src/rating/glicko2.ts` — default for 1v1 |
| Elo+μ/σ hybrid | Interface | Implemented | P1 | `src/rating/hybrid.ts` |
| TrueSkill 2 engine | Interface + telemetry | Documented | P2 | Features/mechanics in [trueskill-2.md](./trueskill-2.md) |
| Ready Play seasons / matchmaking | Rating engines + IdentityScore | Designed | P1 | Opt-in leagues |
| Scoreboard Studio | Core scores + rating engines | Designed | P1 | No composite soul score |

## Privacy & Uniqueness

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| Semaphore nullifier helpers | — | Stub | P1 | `src/semaphore/nullifier.ts` |
| Merkle membership (group tree) | Identity commitments | Stub | P1 | Official `@semaphore-protocol/group` |
| Semaphore proof generation / verification | Nullifier + Merkle | Stub | P1 | Real Poseidon + `@semaphore-protocol/proof` |
| External nullifier convention | Favor ID | Documented | P1 | `hash("yonaw-vote", favorId)` |
| Nullifier store (used-set) | Proof verification | Not started | P1 | DB or on-chain mapping |
| Optional World ID / PoP boost | IdentityScore | Designed | P2 | Boosts IdentityScore |

## Agent Platform & Measurement

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| Bishop being-profile births | Bishop factory | Designed | P1 | External repo; Favor consumes |
| Registry role pinning (`primary_role`) | Bishop AGENT_ROLES | Documented | P1 | [bishop-birth-roles.md](./bishop-birth-roles.md) |
| Favor steward map | Agent platform + senses | Designed | P1 | [favor-stewards.md](./favor-stewards.md) |
| Senses → consciousness templates | Being profile | Designed | P1 | [senses-architecture.md](./senses-architecture.md) |
| Instrument rack mounts | Instruments library + producers | Designed | P1 | [instrument-rack.md](./instrument-rack.md) |
| Moment Matrix package (nephew) | SNF profiles | Implemented (external) | P0 | `@nephew/moment-matrix` |
| Favor Matrix adapter + claim path | nephew package | Designed | P1 | [favor-moment-matrix.md](./favor-moment-matrix.md) |
| Microslice solvency stencil gate | Formula doctrine | Documented | P1 | [microslice-solvency-formula.md](./microslice-solvency-formula.md) |
| Kingdom targeted counsel (optional) | philosophy-kingdoms | Documented | P2 | [kingdom-houses.md](./kingdom-houses.md) — counsel only |
| SCORE-NAMESPACES compliance | SNF contract | Documented | P0 | [score-namespaces.md](./score-namespaces.md) |
| Device plugins (camera, biometrics, haptics) | Capacitor / Unity | Designed | P1 | Instrument inputs only |
| Mood / Mode of Expression instruments | Moment Matrix profiles | Built (Media Resolver) | P1 | Counsel only |

## Product Surfaces

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| Favor creation & P-more record | — | Designed | P0 | Schema + storage |
| Claim stencil UI | Matrix adapter | Designed | P1 | Fill V/N/D/Q/T gaps |
| Voting UI (YONAW form) | YONAW scoring, voice credits, IdentityScore | Not started | P0 | Electron / Capacitor |
| Review threshold & Why privacy | Aggregation | Designed | P1 | Hide until 13 reviews |
| Tip receipt handling | Aggregation (high score path) | Designed | P1 | Manual → zkTLS later |
| Ready Play UI | Rating engines + seasons | Not started | P1 | No Matrix axes in ladder |
| Scoreboard Studio UI | All scores | Not started | P1 | Optional Matrix panel |
| Honor contracts | P-more record | Designed | P2 | Link to Approval Engine |
| Marketplace / IOU | P-more + reputation | Designed | P2 | |
| Unity network map (2D/3D) | Reach graph | High-level | P2 | Embedded in shell only |
| App shell (Electron + Capacitor) | Core engine | Scaffold | P1 | [desktop-stack.md](./desktop-stack.md) |

## Infrastructure

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| User / identity store | — | Not started | P0 | |
| Favor + vote store | — | Not started | P0 | |
| Nullifier + reputation event store | — | Not started | P0 | |
| moment_observation store (optional) | Matrix adapter | Not started | P1 | moment_id + hash |
| Ready Play rating store | Rating engines | Not started | P1 | |
| API layer | Stores + core engine | Not started | P0 | |
| Auth | IdentityScore / optional PoP | Not started | P0 | |
| Background jobs (aggregation close, reputation updates, decay) | Event store | Not started | P1 | |

## Recommended Build Order (Critical Path)

1. **P0 foundation**  
   User/favor/vote storage → wire IdentityScore into voice credits → finish quadratic module → expose YONAW scoring via API.

2. **P0 voting path**  
   Voting UI → submit vote (IdentityScore + credits + YONAW) → aggregation → Performance / Credibility / Y-score updates.

3. **P1 privacy**  
   Real Semaphore packages + nullifier store → optional uniqueness proof for full credit budget.

4. **P1 competitive + scoreboard**  
   Ready Play seasons on top of `src/rating/` → Scoreboard Studio UI → optional decay jobs.

5. **P1 app shell**  
   Electron/Capacitor shell around the working voting flow; Unity embed for map later.

6. **P1 agent + measurement**  
   Favor Matrix adapter + claim stencil UI → steward births via Bishop with explicit roles → instrument rack mounts (no permission laundering).

7. **P2 leverage + counsel depth**  
   Reach graph → Unity map → marketplace / honor contracts → optional targeted Kingdom routes → TrueSkill 2 if team leagues demand it.

## External Dependencies (Expected)

| Package / Service | Used by | Notes |
|-------------------|---------|-------|
| `@semaphore-protocol/identity` | Semaphore identity | Official |
| `@semaphore-protocol/group` | Merkle tree of commitments | Official |
| `@semaphore-protocol/proof` | Proof gen/verify | Official |
| `poseidon-lite` or circuit Poseidon | Nullifier & commitments | Must match circuit |
| Unity | Network map | Embedded 2D + 3D |
| Electron + Capacitor | App shell | |
| Bishop (external) | Durable agent birth | Being profiles + AGENT_ROLES |
| `@nephew/moment-matrix` | Utterance multi-axis scores | Counsel + policy axis |
| philosophy-kingdoms / SNF | Optional counsel routes | Not Favor runtime authority |
| Postgres (or equivalent) | Primary store | Lean |
| Optional: World ID / zkPassport | PoP boost | |

---

*This table is the engineering source of truth for sequencing work. Update status as components move from Designed → Stub → Implemented.*
