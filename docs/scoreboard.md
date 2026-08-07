# Scoreboard — All Scores in the System

Single reference for every numeric score the Favor app maintains.

## User-Facing Scores

| Score | Range | Meaning | Primary Driver |
|-------|-------|---------|----------------|
| **Performance** | 0–100 | How well you deliver favors | Finalized favor values you received |
| **Credibility** | 0–100 | How accurately your reviews predict others’ outcomes + chain-of-responsibility | Review accuracy + liability from people you boosted |
| **Reach** | 0–100 (or unbounded graph metric) | Network leverage / how much of the map you have revealed | Unique connections + relationship weight |
| **Y-score** | [–5.0, +5.0] | Reputation volatility | Swings in Performance (and Credibility) inside rolling window |
| **IdentityScore** | 0–100 | Progressive Sybil-resistance / trust | Account age, activity, network, PoP, stake |

## Competitive Scores (Ready Play)

| Score | Typical range | Engine options |
|-------|---------------|----------------|
| Ready Play Rating | engine-dependent (e.g. ~1500 Glicko) | Elo, Glicko-2, TrueSkill, hybrid |
| Conservative Rating | lower than raw | μ − 3σ or r − 2·RD |
| Season Rank | 1 … N | Derived from above |

## Favor-Level Score

| Score | Range | Meaning |
|-------|-------|--------|
| **Favor Value** | 0–100 | Community-assigned value of a single completed favor | YONAW aggregation |

## Derived / Internal

| Quantity | Purpose |
|----------|--------|
| Voice-credit budget | Quadratic intensity spend (base 100, scaled by IdentityScore) |
| Effective vote power | qualitative strength × √credits × (Credibility/100) × IdentityScore factor |
| Nullifier hash | One-time uniqueness token per favor (Semaphore) |
| Rating Deviation / σ | Confidence / uncertainty attached to competitive or core scores |

## Relationships

```
IdentityScore ──► scales voice credits & gates voting
       │
YONAW vote ──► Favor Value ──► Performance update
       │
Credibility ◄── chain-of-responsibility from people you rated
       │
Performance + Credibility swings ──► Y-score
       │
Unique connections ──► Reach ──► network map
       │
(opt-in) Ready Play results ──► competitive rating (Elo / Glicko-2 / TrueSkill / hybrid)
       │
All of the above surface in Scoreboard Studio
```

## Where the Code Lives

| Score | Module |
|-------|--------|
| Favor Value / YONAW | `src/yonaw/` |
| IdentityScore | `src/sybil/` |
| Y-score | `src/reputation/yScore.ts` |
| Competitive ratings | `src/rating/` |
| Voice credits / nullifiers | `src/semaphore/` + future credits module |
| Performance / Credibility / Reach updates | `src/reputation/` (to be expanded) |

See also: [Scoreboard Studio](./scoreboard-studio.md) · [Ready Play](./ready-play.md) · [Rating systems](./rating-systems.md)
