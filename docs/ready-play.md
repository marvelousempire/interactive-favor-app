# Ready Play — Competitive Layer

Ready Play is the optional ranked / competitive mode on top of ordinary favors.

## Purpose

- Let people who want competition opt into ranked matches or favor leagues.
- Keep ordinary Reputation (Performance, Credibility, Reach, Y-score) separate from competitive rankings so casual users are not forced into ladders.

## Core Ideas

1. **Opt-in only** — a user must explicitly join a Ready Play season or league.
2. **Pluggable rating engine** — any system from the [rating systems](./rating-systems.md) tap list can power a league (Glicko-2 default, Elo hybrid, TrueSkill for teams).
3. **Separate scoreboard** — Ready Play ranks do not overwrite core Performance or Y-score.
4. **Seasonal resets** — optional soft or hard reset of competitive ratings at season boundaries while preserving lifetime Reputation.

## Match Types

| Type | Description | Suggested engine |
|------|-------------|------------------|
| 1v1 Favor Duel | Two people complete comparable favors; community or judge ranks quality | Glicko-2 or Elo hybrid |
| Team Challenge | Groups compete on coordinated favors | TrueSkill / TrueSkill 2 |
| Season Ladder | Ongoing ranked queue | Glicko-2 |
| Open Leaderboard | Simple high-score style | Elo or raw Performance |

## Data Flow

```
Favor completed (ordinary path)
        │
        ▼
Core Reputation update (Performance, Credibility, Y-score)
        │
        ├── (if user is in Ready Play) ──► Rating engine update
        │                                      │
        │                                      ▼
        │                               Ready Play scoreboard
        │
        └── ordinary scoreboard / profile
```

## Identity & Anti-Gaming

- Ready Play still requires IdentityScore gates and Semaphore nullifiers where applicable.
- Abandoning a ranked favor counts as a loss / surrender (TrueSkill-2 style).
- Excessive volatility (high Y-score) can temporarily reduce Ready Play matchmaking weight.

## UI Surfaces

- “Ready Play” tab or toggle on profile
- Season standings inside Scoreboard Studio
- Optional conservative rating display (μ − 3σ or r − 2·RD)
