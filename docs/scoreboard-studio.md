# Scoreboard Studio

Scoreboard Studio is the control panel and display layer for every score in the system.

## What It Shows

### Core Reputation (always on)
- Performance
- Credibility
- Reach
- Y-score (volatility)
- IdentityScore

### Competitive (Ready Play)
- Active league / season ranking
- Conservative rating (confidence-adjusted)
- Recent match history
- Engine in use (Glicko-2, Elo hybrid, TrueSkill, …)

### Derived / Internal
- Voice-credit remaining
- Effective vote power
- Nullifier status (privacy)

## Studio Features

1. **Engine selector** — for Ready Play leagues, choose which rating system powers the board.
2. **Confidence view** — toggle between raw score and conservative score (μ − 3σ / r − 2·RD).
3. **Volatility lens** — surface Y-score and Glicko-style RD side by side.
4. **Season browser** — past Ready Play seasons and their final standings.
5. **Comparison mode** — show how the same set of results would rank under Elo vs Glicko-2 vs TrueSkill (for admins / researchers).

## Architecture Sketch

```
Scoreboard Studio
├── Core Reputation panel          ← src/reputation/
├── Ready Play panel               ← src/rating/ + ready-play config
├── Engine registry                ← pluggable RatingSystem implementations
└── Display preferences            ← user & league settings
```

## Relation to Existing Docs

- [Scoreboard overview](./scoreboard.md) — the list of every score
- [Rating systems](./rating-systems.md) — the full variety on tap
- [Ready Play](./ready-play.md) — competitive layer that feeds Studio
- [Y-score](./y-score.md) — volatility definition already in code
