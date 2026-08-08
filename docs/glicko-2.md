# Glicko-2 — Formulas & Comparison

Mark Glickman’s public-domain rating system. Tracks rating (r), ratings deviation (RD), and volatility (σ). Default engine recommendation for Ready Play 1v1 / ladder play.

## Parameters

| Symbol | Meaning | Typical start |
|--------|---------|---------------|
| r | Rating | 1500 |
| RD | Ratings deviation (uncertainty) | 350 |
| σ | Volatility | 0.06 |
| τ | System constant limiting volatility change | 0.5 |

## Scale Conversion

Heavy math runs on the Glicko-2 scale:

```
μ = (r − 1500) / 173.7178
φ = RD / 173.7178
```

(173.7178 = 400 / ln(10))

## Update Steps (One Rating Period)

1. Convert player and opponents to μ, φ.
2. Estimated variance:

```
g(φⱼ) = 1 / √(1 + 3φⱼ²/π²)
E(μ, μⱼ, φⱼ) = 1 / (1 + exp(−g(φⱼ)(μ − μⱼ)))
v = ( Σ g(φⱼ)² · Eⱼ · (1 − Eⱼ) )⁻¹
```

3. Estimated improvement:

```
Δ = v · Σ g(φⱼ) · (sⱼ − Eⱼ)
```

where sⱼ ∈ {0, 0.5, 1}.

4. New volatility σ′ — solve f(A) = 0 (Illinois / regula-falsi) then σ′ = exp(A/2).
5. Intermediate RD: φ* = √(φ² + σ′²).
6. New RD and rating:

```
φ′ = (1/φ*² + 1/v)⁻½
μ′ = μ + φ′² · Σ g(φⱼ) · (sⱼ − Eⱼ)
```

7. Convert back: r′ = 173.7178·μ′ + 1500, RD′ = 173.7178·φ′.

**Inactivity**: if no games, only RD grows: φ* = √(φ² + σ²).

## Comparison Snapshot

| Feature | Elo | Glicko-2 | TrueSkill 2 |
|---------|-----|----------|-------------|
| Uncertainty | No | RD | σ |
| Volatility | No | σ | Partial |
| Inactivity | Poor | RD rises | Partial |
| Teams | Awkward | Averaged | Native |
| Extra signals | No | No | Yes |
| Complexity | Low | Medium | High |

## Favor Mapping

- RD ≈ confidence band on a competitive or Performance score.
- Volatility σ ≈ conceptual cousin of Y-score (erraticness).
- Implemented in `src/rating/glicko2.ts` and registered for Scoreboard Studio / Ready Play.

See also: [Rating systems](./rating-systems.md) · [Ready Play](./ready-play.md) · [Y-score](./y-score.md)
