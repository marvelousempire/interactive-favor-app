# Rating Systems — The Full Tap List

Like Yard House beer selection, the Favor app keeps a rich variety of rating and scoring systems available. Different modes and scoreboards can choose the tool that fits the job.

## Available Systems

| System | Core Idea | Best For | Status in Favor |
|--------|-----------|----------|-----------------|
| **YONAW + MAD/IQR** | Community valuation + robust volatility | Core favor scoring & Y-score | Implemented |
| **Y-score** | Rolling-window volatility (MAD Z-score) | Reputation stability | Implemented |
| **Elo** | Simple expected-score updates | Transparent 1v1 competitive play | Designed |
| **Glicko / Glicko-2** | Rating + RD (+ volatility) | Uncertainty-aware ranking, inactivity handling | Designed |
| **TrueSkill** | Bayesian μ + σ, multiplayer | Team / multi-player matchmaking | Documented |
| **TrueSkill 2** | TrueSkill + extra signals (stats, quit, squad, experience) | Rich competitive telemetry | Documented |
| **Elo + μ/σ Hybrid** | Elo updates with TrueSkill-style uncertainty | Best practical competitive layer for Favor | Recommended |

## Design Philosophy

- **Core reputation** (Performance, Credibility, Reach, Y-score) stays on the YONAW + MAD/IQR + decay foundation.
- **Ready Play / competitive leagues** can switch between Elo, Glicko-2, or the Elo+μ/σ hybrid.
- **Scoreboard Studio** lets users and admins choose which rating lens to display.

## Mapping to Favor Concepts

- **μ / rating** ↔ Performance or competitive Favor Skill
- **σ / RD** ↔ confidence / sample-size awareness
- **Volatility** ↔ Y-score
- **Extra signals (TrueSkill 2)** ↔ tip receipts, abandonment, category history, IdentityScore

## Recommendation

Keep the current reputation engine for everyday favors.  
For ranked “Ready Play” challenges and leagues, default to the **Elo + μ/σ hybrid** while exposing pure Elo and Glicko-2 as selectable alternatives in Scoreboard Studio.
