# TrueSkill 2 — Features & Mechanics

Microsoft Research extension of classic TrueSkill (2018). Keeps a single skill number compatible with existing matchmakers while improving how that skill is inferred.

## Key Features

1. **Individual performance signals** — kills, deaths, score, etc. influence skill in addition to final win/loss.
2. **Quit = surrender** — mid-match dropout is treated as a loss for rating purposes.
3. **Experience-aware growth** — early matches in a mode produce a systematic upward skill drift (capped ~200 matches).
4. **Squad / party bonus** — pre-made groups get an explicit coordination offset.
5. **Cross-mode correlation** — skills in different modes borrow strength from each other.
6. **Biased skill evolution** — random walk includes a small positive improvement bias, especially early on.
7. **Automatic parameter estimation** — weights learned from historical match batches.
8. **Two modes** — online (forward-only) and batch / “TrueSkill Through Time”.
9. **Backward-compatible output** — still emits one skill number with the same meaning as classic TrueSkill.

## Measured Impact

On Halo 5 data: ~68% historical outcome prediction accuracy vs ~52% for classic TrueSkill.

## Core Mechanics (Summary)

- Latent skill ~ N(μ, σ²); noisy performance ~ N(skill, β²).
- Team performance aggregates member performances (+ optional squad offset).
- Individual counts are modeled as noisy observations of the same performance.
- Inference via expectation propagation on an expanded factor graph.
- Displayed rating often μ − 3σ (conservative).

## Mapping to Favor / Ready Play

| Feature | Favor analogue |
|---------|----------------|
| Individual stats beyond win/loss | Weight quality by effort, tips, context |
| Quit = surrender | Abandoned ranked favors count as losses |
| Experience offset | New users’ Ready Play ratings move faster |
| Squad bonus | Future team-favor challenges |
| Cross-mode correlation | Borrow strength across favor categories |
| Explicit σ | Confidence band (see also Glicko RD, Y-score) |

## Status in Repo

- Documented here and in [rating-systems.md](./rating-systems.md).
- Full factor-graph TrueSkill 2 engine is **not** implemented yet.
- Lighter substitutes available: Glicko-2 and Elo+μ/σ hybrid in `src/rating/`.

See also: [Ready Play](./ready-play.md) · [Rating systems](./rating-systems.md)
