# Y-score — Reputation Volatility

Y-score measures how much a person’s reputation swings. It is a signed volatility index, not a quality score.

- Near **0** → stable, consistent results
- Large absolute value → unstable / volatile reputation
- Range is clamped to **[–5.0, +5.0]**

## Rolling Window

| Parameter | Value |
|-----------|-------|
| Primary window | Last 30 completed favors **or** last 90 days (whichever is shorter) |
| Minimum samples | 5 completed favors before Y-score can move |
| Update trigger | New favor finalized, or 14-day decay timer |

## Baseline

Inside the window compute:

- **Median** of Performance (primary)
- Optionally median of Credibility-accuracy (secondary, half weight)

## Primary Measure — Modified Z-score (MAD)

```
MAD = median( |xᵢ − median| )
z = 0.6745 × (x − median) / MAD
```

If MAD ≈ 0 (almost no variation), fall back to a tiny epsilon or treat any non-zero change as a small step.

### Mapping to Y-score steps

| \|z\| range | Step |
|-----------|------|
| < 1.0 | no change |
| 1.0 – 1.99 | ±0.1 |
| ≥ 2.0 | ±0.2 |

Sign matches the direction of the swing.

## Secondary Check — IQR Fences

```
IQR = Q3 − Q1
inner fences = Q1 − 1.5×IQR , Q3 + 1.5×IQR
outer fences = Q1 − 3.0×IQR , Q3 + 3.0×IQR
```

- Between inner and outer → confirm mild swing (±0.1)
- Beyond outer → confirm large swing (±0.2)

IQR is used as a corroborating signal, not the primary driver.

## Decay (Mean Reversion)

Every **14 days** with no swing larger than the small threshold, move Y-score **0.1 toward zero**.

## Dual Input (Recommended)

- Performance swings → full weight
- Credibility-accuracy swings → half weight

Take the larger resulting step (or a weighted sum if both fire).

## Implementation Notes

- Recalculate only on closed outcomes or decay timer — never on every individual vote.
- Store the current Y-score and the last update timestamp on the user profile.
- Expose both the numeric value and a simple label (Stable / Mildly volatile / Highly volatile) in the UI.
