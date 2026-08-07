# Y-score — Reputation Volatility Tracker

Y-score measures how volatile a user’s reputation is. It starts at 0 (stable) and moves away from zero when results deviate significantly from the user’s own recent baseline.

## Core Parameters

| Parameter | Value |
|-----------|-------|
| Window | Last 30 completed favors **or** last 90 days (whichever is shorter) |
| Minimum samples | 5 (Y-score stays 0 until then) |
| Primary measure | Modified Z-score (median + MAD) |
| Secondary check | IQR fences (1.5× and 3×) |
| Decay | 0.1 toward 0 every 14 quiet days |
| Hard clamp | [–5.0, +5.0] |

## Calculation Steps

1. Collect Performance values (and optionally Credibility accuracy) inside the rolling window.
2. Compute **median** and **MAD** (median absolute deviation).
3. Convert the newest result to a modified Z-score:

   ```
   z = 0.6745 * (x - median) / MAD
   ```

   (Fallback to classic Z-score or treat as small step if MAD ≈ 0.)

4. Map |z| to step size:

   | |z| range | Y-score step |
   |----------|--------------|
   | < 1.0 | 0 |
   | 1.0 – 1.99 | ±0.1 |
   | ≥ 2.0 | ±0.2 |

   Sign follows the direction of the deviation.

5. Optional IQR secondary flag:
   - Beyond 1.5×IQR → at least ±0.1
   - Beyond 3×IQR → at least ±0.2

6. Apply decay: if no qualifying swing has occurred for 14 days, move Y-score 0.1 closer to zero.
7. Clamp final value to [–5.0, +5.0].

## Dual Input (Recommended)

- Primary driver: Performance swings
- Secondary driver: Credibility accuracy swings (half weight or max of the two)

## Update Timing

Recalculate only when:
- A new favor valuation is finalized, or
- The 14-day decay timer fires

Never on every individual vote.

## Interpretation

- Near 0 → consistent, predictable reputation
- Large positive or negative → high volatility (recent big ups or downs)
- Used for UI warnings, weighting, and forensic analysis of reputation stability
