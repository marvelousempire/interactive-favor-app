# Interactive Favor App (P-more)

A gamified community favor economy that turns real human energy and intent into tradable non-fungible credits.

## Vision
Do a favor for someone. Earn a **P-more** credit (Perceived Moment of Real Energy). That credit is an NFT tied to the original intent. You can redeem it for favors from others, trade it, or exchange it for real-world value (e.g., fish from the market of the person you helped).

## Core Mechanics

### P-more Credits
- Non-fungible tokens representing real favors performed.
- Formula incorporates variables such as effort, time, skill rarity, personal energy (potentially VO2 max / age / heart-rate components), and community valuation.

### Valuation System (YONAW)
- **Yes or No and Why**
- Three evaluative tiers: Light / Mixed / Dark
- Contextual variable: "If this, then that" (second witness / conditional flip)
- Community consensus determines fair value.

### Reputation Scores
- **Performance**: Delivery quality of favors.
- **Credibility**: Accuracy of your reviews in predicting others' future performance.
  - Chain of responsibility: Boosting a lower-scored person makes you partially liable for their next outcomes.
  - 20% decay per degree of separation, capped at 5 people in the chain.
- **Reach**: Network leverage visualized as a Dune-style map that lights up as you work with more people.
- **Y-score**: Reputation volatility (starts balanced at 0; moves in ±0.1 / ±0.2 increments).

### Anti-Gaming Protections
- Reviews use synonym-shuffled, differently ordered questions with hidden weights + sliders.
- Individual reviews hidden until a threshold (e.g., 13 reviews).
- Public reviewer reputation.
- Proof of payment/tip required for high scores (Cash App / Zelle / Venmo receipts).
- Escrow / honor contracts with optional notarization via Approval Engine.

### Marketplace & Leverage Game
- Buy, sell, or IOU P-more credits.
- Strategic network building is rewarded.
- Gamified experience powered by Unity (2D + 3D views), embedded in the app shell.

## Architecture direction

- **App shell:** Electron (desktop) + Capacitor (mobile); Unity embedded for spatial map only.
- **Agents:** Bishop births durable stewards with being profiles and explicit registry roles; Optimus Nephew is law; Nephew is runtime. No god-agent.
- **Measurement:** Instrument rack + Moment Matrix under SCORE-NAMESPACES — scores counsel, policy authorizes, no soul score.
- **Claim readiness:** Microslice Solvency Formula (Verb·Noun·Destination·Quality·Time ≥ 0.90) as execution_input counsel.
- **Senses:** Consciousness channels map to instrument inputs (sight, hearing, touch, metaphorical smell/taste).
- **Kingdom houses:** Optional contrasting counsel pipeline — never permission.

## Docs

Full index: [docs/README.md](./docs/README.md)  
Session record (2026-08): [docs/architecture-session-2026-08.md](./docs/architecture-session-2026-08.md)

Key architecture notes:
- [Tech Spec v0.4](./docs/tech-spec.md)
- [Dependency Table](./docs/dependency-table.md)
- [Open Work](./docs/open-work.md)
- [Agent Platform](./docs/agent-platform.md) · [Bishop Birth Roles](./docs/bishop-birth-roles.md) · [Favor Stewards](./docs/favor-stewards.md)
- [Senses Architecture](./docs/senses-architecture.md) · [Instrument Rack](./docs/instrument-rack.md)
- [Moment Matrix](./docs/moment-matrix.md) · [Favor Moment Matrix](./docs/favor-moment-matrix.md)
- [Microslice Solvency Formula](./docs/microslice-solvency-formula.md) · [Kingdom Houses](./docs/kingdom-houses.md)

## Current Status
Repository holds core product docs, full architecture investigation from 2026-08 (agents, senses, rack, Matrix, Kingdom, solvency), and TypeScript modules for YONAW, reputation Y-score, sybil, and rating engines. App shell, steward births, and Favor Matrix adapter are designed; implementation continues on the P0 voting path.

## Next Steps
1. P0 storage + voting path (see [dependency table](./docs/dependency-table.md)).
2. Electron/Capacitor shell around voting.
3. Favor Matrix adapter + claim stencil UI.
4. Bishop steward births for map/review/marketplace/reputation with pinned `primary_role`.
5. Instrument rack mounts + SCORE-NAMESPACES compliance in API responses.
