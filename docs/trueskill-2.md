# TrueSkill 2

Microsoft Research’s 2018 extension of classic TrueSkill. Keeps the same single-number skill interface while adding richer evidence from real online play.

## Core Features

1. **Individual performance signals** — kills, deaths, score, etc. influence the update, not only final win/loss.
2. **Quit = surrender** — leaving mid-match is treated as a loss for rating purposes.
3. **Experience offset** — early matches produce systematic upward skill drift (capped ~200 matches).
4. **Squad / party bonus** — pre-made groups get an explicit coordination offset.
5. **Cross-mode correlation** — skills in different modes share statistical strength.
6. **Biased skill evolution** — random walk includes a small positive improvement bias.
7. **Automatic parameter learning** — weights learned from historical match batches.
8. **Online + batch modes** — live forward updates or full-history “TrueSkill Through Time”.

## Base Model (Shared with Classic TrueSkill)

Each player has latent skill:

```
skill_i ~ N(μ_i, σ_i²)
perf_i  ~ N(skill_i, β²)
```

Team performance is typically the sum of member performances. Inference uses expectation propagation on a factor graph. Displayed rating is often the conservative estimate μ − 3σ.

## Measured Impact

On Halo 5 data: ~68% match-outcome prediction accuracy vs ~52% for classic TrueSkill.

## Mapping to Favor / Ready Play

| TrueSkill 2 feature | Favor analogue |
|---------------------|----------------|
| Individual stats | Weight by effort, tips, context |
| Quit = surrender | Abandoned ranked favors count as losses |
| Experience offset | New users move faster until history grows |
| Squad bonus | Future team-favor challenges |
| Cross-mode correlation | Borrow strength across favor categories |
| Explicit σ | Confidence band (cf. Glicko RD, Y-score) |

## Status in Repo

Documented. Full factor-graph engine not yet implemented. Lighter alternatives live in `src/rating/` (Glicko-2, Elo+μ/σ hybrid).
