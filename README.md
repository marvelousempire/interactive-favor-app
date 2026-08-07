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
- Gamified experience powered by Unity (2D + 3D views).

## Planned Tech Stack
- Cross-platform app shell: Electron + Capacitor
- iOS native layer: Swift
- Gamification & network map: Unity
- Backend & NFT layer: TBD (intent/semantic node system, possible blockchain, integration with Approval Engine)

## Current Status
Repository initialized with core concept documentation. Scaffolding and implementation in progress.

## Next Steps
1. Define precise P-more calculation formula.
2. Design the voting / reputation engine.
3. Prototype the network map.
4. Build basic favor posting & claiming flow.
