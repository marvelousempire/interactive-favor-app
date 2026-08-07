# Engineering Dependency Table — Interactive Favor App (P-more)

This table maps every major component, its current status, what it depends on, and recommended implementation priority.

| Component | Status | Depends On | Priority | Recommended Tech / Notes |
|-----------|--------|------------|----------|--------------------------|
| **P-more Credit Core** | Design only | — | P0 | NFT or internal ledger. Formula still open (effort + time + skill + energy variables). |
| **YONAW Voting** | Implemented (src/yonaw) | Types, Credibility | P0 | Pure TS scoring. Already supports slider + quadratic intensity flag. |
| **Quadratic Voice Credits** | Designed + partial | YONAW, IdentityScore | P0 | 100 credits per favor, √ cost. Equal base budget. |
| **Reputation: Performance** | Design | YONAW aggregation | P1 | Updated from final favor_value. |
| **Reputation: Credibility** | Design | Chain of responsibility | P1 | 20% decay over max 5 hops. Affects vote power. |
| **Reputation: Reach** | Design | Network graph | P2 | Dune-style map visualization. |
| **Reputation: Y-score** | Design | Performance history | P2 | Volatility tracker (±0.1 / ±0.2). |
| **Sybil / IdentityScore** | Implemented (src/sybil) | Age, activity, network, PoP stubs | P0 | Gates voice credits & canVote. |
| **Semaphore / Nullifiers** | Stubs + docs (src/semaphore) | Merkle tree, ZK libs | P1 | Use official @semaphore-protocol. externalNullifier = hash("yonaw-vote", favorId). |
| **Merkle Membership** | Documented | Identity commitments | P1 | Required by Semaphore. Poseidon preferred for ZK. |
| **Zero-Knowledge Layer** | Documented | Semaphore, IdentityScore | P1 | Optional PoP boost for full credits. |
| **Favor Marketplace / IOUs** | Concept only | P-more credits, Reputation | P2 | Buy/sell/trade credits. |
| **Honor Contracts** | Concept only | Approval Engine, notarization | P2 | Private agreements backed by NFTs. |
| **Gamified Network Map** | Concept only | Reach score, Unity | P2 | 2D + 3D, fog-of-war reveal. |
| **App Shell** | Scaffold | — | P1 | Electron + Capacitor + Swift (iOS). |
| **Backend / Storage** | Open decision | All data models | P0 | Needed before production. |
| **NFT / Blockchain Layer** | Open decision | P-more credits | P2 | Optional; can start with internal ledger. |

## Priority Legend
- **P0**: Must have for first working vertical slice (favor → vote → value).
- **P1**: Required for trustworthy production use.
- **P2**: Important for full vision but can follow later.

## Critical Path (recommended build order)
1. Backend + data models (P-more, users, votes)
2. YONAW scoring + IdentityScore gating
3. Quadratic voice credits
4. Basic Reputation updates
5. Semaphore nullifier integration for vote uniqueness
6. Marketplace + map + advanced reputation

## Open Decisions
- Exact P-more calculation formula
- Backend choice (Postgres + Node, Supabase, custom, etc.)
- Whether to mint real NFTs on day one or use an internal credit ledger
- Primary Proof-of-Personhood provider (World ID, Gitcoin Passport, zkPassport, etc.)
