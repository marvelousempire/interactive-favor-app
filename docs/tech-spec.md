# Interactive Favor App (P-more) — Technical Specification v0.4

## 1. System Overview

The Favor app turns real-world favors into tradable non-fungible credits called **P-more** (Perceived Moment of Real Energy). Value is assigned by structured community voting (YONAW), intensity is expressed via quadratic voice credits, and Sybil resistance + privacy are provided by progressive IdentityScore and optional Semaphore / zero-knowledge proofs.

An optional competitive layer (**Ready Play**) lets users opt into ranked leagues powered by pluggable rating engines (Elo, Glicko-2, hybrid, future TrueSkill 2). **Scoreboard Studio** is the control panel for every score in the system.

**Agent direction:** Favor does not invent a god-agent. Durable specialists are born through **Bishop** with being profiles and explicit registry **primary_role** values. **Optimus Nephew** is law/manifest. **Nephew** is runtime. Measurement flows through the **instrument rack** and **Moment Matrix** under SCORE-NAMESPACES law (scores counsel; policy authorizes). Optional **Kingdom** routes provide contrasting counsel only.

### Core Loop
1. User performs a favor.
2. A P-more credit (NFT or NFT-like record) is created.
3. Community values it via YONAW (Yes/No + Why + Light/Mixed/Dark tiers + contextual variable).
4. Voters spend quadratic voice credits to signal intensity.
5. Reputation scores (Performance, Credibility, Reach, Y-score) update; optional Ready Play rating updates if the user is in a league.
6. Credits can be redeemed, traded, or used as leverage in the network.

**Counsel path (parallel, never permission):** claim/review text may be scored by Moment Matrix (stencil + axes); stewards may read instrument mounts; high-stakes product decisions may request targeted Kingdom pairs.

## 2. Major Components

### 2.1 P-more Credit Layer
- Represents a completed favor as a unique, non-fungible credit.
- Carries original intent, performer, timestamps, and community-assigned value.
- Open decision: on-chain NFT vs signed off-chain attestation with optional anchoring.

### 2.2 YONAW Voting Engine
- **Location**: `src/yonaw/`
- Structured vote: binary decision, three tier judgments, contextual “if this, then that”, intensity.
- Scoring: qualitative strength × intensity factor × Credibility weight.
- Aggregation produces a 0–100 favor value.
- High values (≥ 90) that claim a tip require a verifiable receipt.
- Moment Matrix affect axes must **not** multiply vote power.

### 2.3 Quadratic Voice Credits
- Equal base budget (recommended: 100 credits per favor).
- Cost of intensity is quadratic; effective factor ≈ √(credits spent).
- Credits burn at end of voting window.
- Final vote power = qualitative strength × √credits × (Credibility / 100) × IdentityScore factor.

### 2.4 Reputation System
- **Location**: `src/reputation/`
- **Performance** — delivery quality of favors performed.
- **Credibility** — accuracy of reviews + chain-of-responsibility (20 % decay per hop, max 5 hops).
- **Reach** — network leverage, visualized as a Dune-style fog-of-war map.
- **Y-score** — reputation volatility (MAD Z-score + IQR hybrid, range [−5, +5], discrete decay toward 0).
- Decay options documented in [reputation-decay.md](./reputation-decay.md).

### 2.5 Sybil Resistance / IdentityScore
- **Location**: `src/sybil/`
- Progressive 0–100 score from age, activity, network connections, optional PoP signals, optional stake.
- Gates and multiplies voice-credit budget.
- Rate limits on account creation and voting frequency.

### 2.6 Privacy & Zero-Knowledge Layer
- **Location**: `src/semaphore/` + docs
- Optional Semaphore proofs for uniqueness and private voting.
- External nullifier = hash("yonaw-vote", favorId) → one vote per identity per favor.
- Merkle tree of identity commitments for group membership proofs.
- Future: private Why text, selective disclosure of reputation claims, zkTLS tip receipts.

### 2.7 Ready Play (Competitive Layer)
- **Location**: docs + `src/rating/`
- Opt-in ranked leagues / ladders / team challenges.
- Pluggable engines: Elo, Glicko-2 (default for 1v1), Elo+μ/σ hybrid; TrueSkill 2 documented for future team use.
- Separate from core Reputation; seasonal resets do not wipe Performance / Y-score.
- Moment Matrix axes are **excluded** from rating updates.
- See [ready-play.md](./ready-play.md) and [rating-systems.md](./rating-systems.md).

### 2.8 Scoreboard Studio
- Control panel and display layer for every score (core Reputation + Ready Play + derived quantities).
- Optional Moment Matrix / Kingdom counsel panels — never averaged into a soul score.
- Engine selector, confidence view (μ − 3σ / r − 2·RD), volatility lens, season browser, comparison mode.
- See [scoreboard-studio.md](./scoreboard-studio.md).

### 2.9 Gamified Network Map
- Unity (2D + 3D) **embedded** inside Electron/Capacitor shell.
- Map starts dark; working with new people reveals territory (Reach).
- Visualizes leverage and relationship weight.

### 2.10 App Shell
- **Electron** desktop foundation; **Capacitor** mobile twin; shared web UI.
- Unity embedded for spatial/game surfaces only.
- WordPress + WooCommerce as backend product catalog engine (not primary client UI).
- See [desktop-stack.md](./desktop-stack.md).

### 2.11 Marketplace & Honor Contracts
- Trade / IOU of P-more credits.
- Private honor contracts with optional notarization via Approval Engine.
- Leverage game: strategic network position is rewarded.
- Claim completeness guided by Microslice Solvency Formula / Matrix stencil ([microslice-solvency-formula.md](./microslice-solvency-formula.md)).

### 2.12 Agent Platform (Bishop + Optimus + Nephew)
- Bishop: sole durable-agent factory; being profile required; **primary_role** from fourteen registry roles.
- Optimus Nephew: law, philosophies, Motif product schema.
- Nephew: runtime + `moment-matrix` package.
- Favor stewards (map, review, marketplace, reputation, …) born via Bishop when justified.
- See [agent-platform.md](./agent-platform.md), [bishop-birth-roles.md](./bishop-birth-roles.md), [favor-stewards.md](./favor-stewards.md), [senses-architecture.md](./senses-architecture.md).

### 2.13 Instrument Rack & Moment Matrix
- Instrument rack: producers → instruments → mounts → consumers; missing ≠ 0.
- Moment Matrix: multi-axis utterance scoring at place + time; policy authorizes; no soul score.
- Favor consumption contracts: [favor-moment-matrix.md](./favor-moment-matrix.md).
- See also [instrument-rack.md](./instrument-rack.md), [moment-matrix.md](./moment-matrix.md), [score-namespaces.md](./score-namespaces.md).

### 2.14 Kingdom Houses (optional counsel)
- Seven-house pipeline; six contrasting pairs; House 7 synthesis under real policy authority.
- Targeted routing for hard product decisions; full-court exceptional.
- See [kingdom-houses.md](./kingdom-houses.md), [solvency-house.md](./solvency-house.md).

### 2.15 Backend & Storage (Open)
- User profiles, favor records, votes, nullifier sets, reputation history, Ready Play ratings, optional moment_observation ids.
- Decision pending: pure off-chain + signed attestations vs hybrid with on-chain anchoring.

## 3. Data Flows (High Level)

**Favor creation** → optional Matrix score on description → stencil gate / clarify → P-more record → voting window opens  
**Vote submission** → IdentityScore check → voice-credit spend → YONAW score → optional Semaphore proof + nullifier → aggregation  
**Aggregation complete** → favor value locked → Performance / Credibility / Y-score updates → Reach map may update  
**(If Ready Play)** → rating engine update → Ready Play scoreboard  
**(Counsel path)** → Moment Matrix / instrument rack readings → steward consciousness; optional Kingdom ballots (never permission)  
**Redemption / trade** → marketplace or honor-contract flow

## 4. Open Technical Decisions

| Area | Options under consideration | Current lean |
|------|-----------------------------|--------------|
| P-more representation | On-chain NFT vs signed attestation + optional anchor | Attestation first, NFT later |
| Backend | Node/TS, serverless, or lightweight chain | Node/TS + Postgres |
| Identity uniqueness | IdentityScore only vs IdentityScore + Semaphore/World ID | Hybrid |
| Voice-credit refresh | Per-favor vs daily pool | Per-favor |
| Unity map data source | Local graph vs backend graph service | Backend graph service |
| Tip receipt verification | Manual upload vs zkTLS / payment provider webhooks | Start manual, add zkTLS later |
| Ready Play default engine | Glicko-2 vs hybrid vs TrueSkill 2 | Glicko-2 for 1v1; TrueSkill 2 later for teams |
| Performance decay | Half-life vs window vs activity-triggered step | Activity-triggered mild half-life |
| Agent birth priority | Which stewards first | Map, review, marketplace, reputation |
| Kingdom routing in Favor | None vs targeted pairs | Targeted only when product policy needs contrast |

## 5. Security & Integrity Priorities

1. Sybil resistance (IdentityScore + optional ZK uniqueness).
2. Double-vote prevention (Semaphore nullifiers).
3. Review gaming (synonym shuffling, hidden weights, 13-review threshold).
4. Chain-of-responsibility liability for Credibility.
5. Receipt requirement for extreme high scores.
6. Ready Play anti-gaming (abandon = loss, IdentityScore gates, volatility dampening).
7. No score-to-permission laundering (SCORE-NAMESPACES / instrument rack / Matrix law).

## 6. Implementation Status (Snapshot)

| Component | Design | Code | Notes |
|-----------|--------|------|-------|
| YONAW scoring | Done | Done (`src/yonaw/`) | Pure functions |
| Quadratic credits | Done | Partial | Logic described, not yet a dedicated module |
| IdentityScore / Sybil | Done | Done (`src/sybil/`) | Ready |
| Semaphore integration | Done | Stubs (`src/semaphore/`) | Needs real Poseidon + official packages |
| Y-score | Done | Done (`src/reputation/yScore.ts`) | MAD + IQR + discrete decay |
| Rating engines (Elo, Glicko-2, hybrid) | Done | Done (`src/rating/`) | Ready Play ready |
| TrueSkill 2 engine | Documented | Not started | Heavy; use hybrid/Glicko for now |
| Reputation update engine (Performance, Credibility) | Designed | Not started | Depends on aggregation events |
| Ready Play seasons / matchmaking | Designed | Not started | Uses `src/rating/` |
| Scoreboard Studio UI | Designed | Not started | |
| Network map (Unity) | High-level | Not started | Embedded only |
| Marketplace | High-level | Not started | |
| App shell (Electron + Capacitor) | Designed | Scaffold | See desktop-stack |
| Bishop steward births for Favor | Designed | Not started | favor-stewards + bishop-birth-roles |
| Instrument rack mounts in Favor | Designed | Not started | instrument-rack.md |
| Moment Matrix package | Done (nephew) | External | scorePrompt |
| Favor Matrix adapter + claim UI | Designed | Not started | favor-moment-matrix.md |
| Kingdom targeted routes | Documented | Not started | Optional P2 |

## 7. Doc map

See [docs/README.md](./README.md), [open-work.md](./open-work.md), and [architecture-session-2026-08.md](./architecture-session-2026-08.md).
