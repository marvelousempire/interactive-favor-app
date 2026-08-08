# Engineering Dependency & Priority Table

## How to Read This Table

- **Depends on** = must be stable before this component can be finished.
- **Status** = Design / Stub / Implemented / Blocked.
- **Priority** = P0 (critical path) → P3 (can wait).

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
| Scoreboard Studio | Core scores + rating engines | Designed | P1 | Engine selector, confidence view |

## Privacy & Uniqueness

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| Semaphore nullifier helpers | — | Stub | P1 | `src/semaphore/nullifier.ts` |
| Merkle membership (group tree) | Identity commitments | Stub | P1 | Official `@semaphore-protocol/group` |
| Semaphore proof generation / verification | Nullifier + Merkle | Stub | P1 | Real Poseidon + `@semaphore-protocol/proof` |
| External nullifier convention | Favor ID | Documented | P1 | `hash("yonaw-vote", favorId)` |
| Nullifier store (used-set) | Proof verification | Not started | P1 | DB or on-chain mapping |
| Optional World ID / PoP boost | IdentityScore | Designed | P2 | Boosts IdentityScore |

## Product Surfaces

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| Favor creation & P-more record | — | Designed | P0 | Schema + storage |
| Voting UI (YONAW form) | YONAW scoring, voice credits, IdentityScore | Not started | P0 | Electron / Capacitor |
| Review threshold & Why privacy | Aggregation | Designed | P1 | Hide until 13 reviews |
| Tip receipt handling | Aggregation (high score path) | Designed | P1 | Manual → zkTLS later |
| Ready Play UI | Rating engines + seasons | Not started | P1 | |
| Scoreboard Studio UI | All scores | Not started | P1 | |
| Honor contracts | P-more record | Designed | P2 | Link to Approval Engine |
| Marketplace / IOU | P-more + reputation | Designed | P2 | |
| Unity network map (2D/3D) | Reach graph | High-level | P2 | Unity + data service |
| App shell (Electron + Capacitor + Swift) | Core engine | Scaffold | P1 | |

## Infrastructure

| Component | Depends on | Status | Priority | Tech / Notes |
|-----------|------------|--------|----------|--------------|
| User / identity store | — | Not started | P0 | |
| Favor + vote store | — | Not started | P0 | |
| Nullifier + reputation event store | — | Not started | P0 | |
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
   Electron/Capacitor shell around the working voting flow; Swift polish later.

6. **P2 leverage surfaces**  
   Reach graph → Unity map → marketplace / honor contracts → TrueSkill 2 if team leagues demand it.

## External Dependencies (Expected)

| Package / Service | Used by | Notes |
|-------------------|---------|-------|
| `@semaphore-protocol/identity` | Semaphore identity | Official |
| `@semaphore-protocol/group` | Merkle tree of commitments | Official |
| `@semaphore-protocol/proof` | Proof gen/verify | Official |
| `poseidon-lite` or circuit Poseidon | Nullifier & commitments | Must match circuit |
| Unity | Network map | 2D + 3D |
| Electron + Capacitor | App shell | |
| Swift | iOS native layer | |
| Postgres (or equivalent) | Primary store | Lean |
| Optional: World ID / zkPassport | PoP boost | |

---

*This table is the engineering source of truth for sequencing work. Update status as components move from Designed → Stub → Implemented.*
