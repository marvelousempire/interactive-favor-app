# Interactive Favor App (P-more) — Technical Specification v0.1

## 1. System Overview

The Favor app turns real-world favors into tradable non-fungible credits called **P-more** (Perceived Moment of Real Energy). Value is assigned by structured community voting (YONAW), intensity is expressed via quadratic voice credits, and Sybil resistance + privacy are provided by progressive IdentityScore and optional Semaphore / zero-knowledge proofs.

### Core Loop
1. User performs a favor.
2. A P-more credit (NFT or NFT-like record) is created.
3. Community values it via YONAW (Yes/No + Why + Light/Mixed/Dark tiers + contextual variable).
4. Voters spend quadratic voice credits to signal intensity.
5. Reputation scores (Performance, Credibility, Reach, Y-score) update.
6. Credits can be redeemed, traded, or used as leverage in the network.

## 2. Major Components

### 2.1 P-more Credit Layer
- Represents a completed favor as a unique, non-fungible credit.
- Carries original intent, performer, timestamps, and community-assigned value.
- Open decision: on-chain NFT (ERC-721/1155 or equivalent) vs signed off-chain attestation with optional anchoring.

### 2.2 YONAW Voting Engine
- **Location**: `src/yonaw/`
- Structured vote: binary decision, three tier judgments, contextual “if this, then that”, intensity.
- Scoring: qualitative strength × intensity factor × Credibility weight.
- Aggregation produces a 0–100 favor value.
- High values (≥ 90) that claim a tip require a verifiable receipt.

### 2.3 Quadratic Voice Credits
- Equal base budget (recommended: 100 credits per favor).
- Cost of intensity is quadratic; effective factor ≈ √(credits spent).
- Credits burn at end of voting window.
- Final vote power = qualitative strength × √credits × (Credibility / 100).

### 2.4 Reputation System
- **Performance** — delivery quality of favors performed.
- **Credibility** — accuracy of reviews + chain-of-responsibility (20 % decay per hop, max 5 hops).
- **Reach** — network leverage, visualized as a Dune-style fog-of-war map.
- **Y-score** — reputation volatility (starts at 0, moves in ±0.1 / ±0.2 increments).

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

### 2.7 Gamified Network Map
- Unity (2D + 3D).
- Map starts dark; working with new people reveals territory (Reach).
- Visualizes leverage and relationship weight.

### 2.8 App Shell
- Cross-platform: Electron + Capacitor.
- Native iOS polish: Swift.
- Shared business logic in TypeScript where possible.

### 2.9 Marketplace & Honor Contracts
- Trade / IOU of P-more credits.
- Private honor contracts with optional notarization via Approval Engine.
- Leverage game: strategic network position is rewarded.

### 2.10 Backend & Storage (Open)
- User profiles, favor records, votes, nullifier sets, reputation history.
- Decision pending: pure off-chain + signed attestations vs hybrid with on-chain anchoring.

## 3. Data Flows (High Level)

**Favor creation** → P-more record → voting window opens  
**Vote submission** → IdentityScore check → voice-credit spend → YONAW score → optional Semaphore proof + nullifier → aggregation  
**Aggregation complete** → favor value locked → Performance / Credibility / Y-score updates → Reach map may update  
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

## 5. Security & Integrity Priorities

1. Sybil resistance (IdentityScore + optional ZK uniqueness).
2. Double-vote prevention (Semaphore nullifiers).
3. Review gaming (synonym shuffling, hidden weights, 13-review threshold).
4. Chain-of-responsibility liability for Credibility.
5. Receipt requirement for extreme high scores.

## 6. Implementation Status (Snapshot)

| Component | Design | Code | Notes |
|-----------|--------|------|-------|
| YONAW scoring | Done | Done (`src/yonaw/`) | Pure functions, ready for integration |
| Quadratic credits | Done | Partial | Logic described, not yet a dedicated module |
| IdentityScore / Sybil | Done | Done (`src/sybil/`) | Ready |
| Semaphore integration | Done | Stubs (`src/semaphore/`) | Needs real Poseidon + official packages |
| Reputation updates | Designed | Not started | Depends on aggregation events |
| Network map (Unity) | High-level | Not started | |
| Marketplace | High-level | Not started | |
| App shell | High-level | Scaffold only | |
