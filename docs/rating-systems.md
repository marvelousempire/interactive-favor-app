# Rating Systems — The Full Tap List

Like Yard House beer: many styles on tap. Use the right one for the job, or mix them.

## Available Systems

| System | Numbers tracked | Best for | Complexity |
|--------|-----------------|----------|------------|
| **Elo** | 1 (rating) | Simple 1v1, transparent leaderboards | Low |
| **Glicko** | 2 (rating + RD) | Intermittent activity, confidence bands | Medium |
| **Glicko-2** | 3 (rating + RD + volatility) | Same as Glicko + erratic performers | Medium-High |
| **TrueSkill** | 2 (μ + σ) | Teams, multiplayer, fast convergence | High |
| **TrueSkill 2** | 2 + extra signals | Rich telemetry (kills, quit, experience, squad) | Highest |
| **Elo + μ/σ hybrid** | 2 | Explainable + uncertainty-aware | Medium |
| **MAD Z-score + IQR** | rolling window stats | Reputation volatility (our Y-score) | Low-Medium |
| **Y-score** | signed volatility [–5, +5] | Stability vs swing detection | Low |

## When to Use Which

- **Core reputation (Performance / Credibility)** → keep current rolling-window + MAD/IQR + Y-score. Optionally add a Glicko-style RD confidence band.
- **Ranked “Ready Play” leagues / head-to-head favors** → Glicko-2 or the Elo + μ/σ hybrid.
- **Team or multi-party challenges** → TrueSkill / TrueSkill 2.
- **Simple public leaderboards** → classic Elo or pure Performance.
- **Volatility / consistency signal** → Y-score (already implemented).

## Design Principle

All systems live behind a common interface so Scoreboard Studio and Ready Play can swap or combine them without rewriting the rest of the app.

```ts
interface RatingSystem {
  name: string;
  update(player: RatingState, outcome: Outcome, opponents?: RatingState[]): RatingState;
  conservativeScore(state: RatingState): number; // e.g. μ − 3σ or r − 2·RD
}
```

See also:
- [Ready Play](./ready-play.md)
- [Scoreboard Studio](./scoreboard-studio.md)
- [Y-score](./y-score.md)
- [Scoreboard overview](./scoreboard.md)
