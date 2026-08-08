# Reputation Decay Algorithms

Without decay, early users lock permanent advantage and inactive high-reputation accounts keep unearned power. Decay keeps the system fair and encourages ongoing contribution.

## Families

### Linear
```
R_t = max(0, R_0 − β·t)
```
Fixed amount lost per time unit. Simple; can feel harsh near zero.

### Exponential / Half-life
```
R_t = R_0 · e^(−λt)
# or
R_t = R_0 · 0.5^(t / h)
```
h = half-life. Smooth; recent activity stays influential longer. Most common in reputation and recommender systems.

### Step / Discrete
Every N quiet days, subtract a fixed step. Cheap and easy to explain; produces visible jumps.

**Current Y-score behavior**: 0.1 toward zero every 14 quiet days.

### Window-based
Only the last N events (or last T days) count; older data is dropped. Already used for Y-score *input samples* via the rolling window.

### Activity-triggered vs pure time
- Pure time: decays even while active.
- Activity-triggered: only decays during inactivity (preferred for user-facing scores).

## Recommendations for Favor

| Score | Suggested decay |
|-------|-----------------|
| Y-score | Keep discrete step (0.1 toward 0 every 14 quiet days) |
| Performance | Mild exponential half-life (e.g. 180–365 days) + activity-triggered |
| Credibility | Medium exponential + existing chain-liability decay |
| Reach | Window or slow decay |
| IdentityScore | Mostly activity-driven; mild time decay only |

### Practical rules
1. Prefer activity-triggered decay for user-facing scores.
2. Never let decay go below a floor for established accounts (e.g. Performance floor ~20).
3. Make half-life or window length visible in the UI where helpful.
4. Core reputation decay is separate from Ready Play seasonal resets.

## Simple half-life sketch

```ts
function applyHalfLife(
  value: number,
  lastActiveAt: string,
  halfLifeDays: number,
  now = new Date()
): number {
  const days = (now.getTime() - new Date(lastActiveAt).getTime()) / 86_400_000;
  if (days <= 0) return value;
  return value * Math.pow(0.5, days / halfLifeDays);
}
```

See also: [Y-score](./y-score.md) · [Scoreboard](./scoreboard.md)
