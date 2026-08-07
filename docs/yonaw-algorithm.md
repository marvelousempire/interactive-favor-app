# YONAW Voting Algorithm

**Yes or No and Why** — the core community valuation mechanism for P-more credits.

## Purpose

Determine the community-assigned value of a completed favor. The system is designed to be structured, reflective, and resistant to gaming while still feeling human.

## Vote Structure

Every vote contains four required parts:

1. **Binary Decision**  
   `Yes` or `No` — does this favor deserve the claimed value?

2. **Tier Evaluation** (three independent judgments)  
   - **Light** (White): How clean / high-quality / low-friction was the favor?  
   - **Mixed** (Gray): How balanced or conditional is the quality?  
   - **Dark** (Black): How messy / incomplete / high-friction was it?  

   Each tier receives its own Yes/No + short Why.

3. **Contextual Variable** (“If this, then that”)  
   One required conditional statement that would flip the vote.  
   Example:  
   > “Yes because the lawn is clean and edges are sharp; **if** the photo was taken before the job was finished, **then** No.”

4. **Intensity Signal**  
   - Original design: 0–100 slider  
   - Preferred evolution: Quadratic votes (see `docs/quadratic-voting.md`)

## Scoring a Single Vote (base version)

```
base = 1.0 if Yes else -1.0

tier_weight = (
  0.4 * Light_score +
  0.3 * Mixed_score +
  0.3 * Dark_score
)

# Light_score / Mixed_score / Dark_score = +1 or -1

contextual_bonus = +0.15 if the “if this, then that” is clear and falsifiable
                 = -0.10 if vague or missing

slider_factor = slider / 100   # 0.0 → 1.0

vote_strength = base * tier_weight * slider_factor + contextual_bonus
```

## Voter Weighting

```
final_vote_power = vote_strength × (Credibility / 100)
```

High-Credibility voters move the needle more. New accounts start near zero influence.

## Aggregation into Final Favor Value

After a minimum number of votes (start: 7, target: 13):

```
community_score = Σ (final_vote_power) / Σ (Credibility of all voters)

favor_value = clamp( (community_score + 1) * 50 , 0, 100 )
```

If `favor_value ≥ 90` and any voter claimed a tip, at least one verified receipt is required before the high value is locked.

## Side Effects on Reputation

- Performer receives a **Performance** update based on `favor_value`.
- Voters receive a **Credibility** adjustment once the performer’s future outcomes are known (chain of responsibility).
- Large swings relative to historical average move the **Y-score** (volatility).

## Anti-Gaming Protections

- Questions that generate tier judgments are synonym-shuffled and re-ordered every session.
- Exact weights of Light / Mixed / Dark are hidden and can be rotated.
- Individual Why text stays private until the 13-review threshold.
- Extreme high scores require payment proof.
- New accounts start with near-zero Credibility.

## Status

Base algorithm defined. Quadratic intensity layer is the preferred next evolution (see companion document).
