# Moment Matrix

The Moment Matrix is the multi-axis counsel layer from the Semantic Node Framework. It scores an utterance across independent axes without ever producing a composite “soul score.”

## Axes & Profiles

| Axis | Profile | What it measures |
|------|---------|------------------|
| Affect | `affect-lexicon-v1` | Valence (−1…+1) and Arousal (0…1) |
| Philosophy | `philosophy-prudence-sovereign-v1` | Fit / tension with prudence, contracts, fail-closed design |
| Mindset | `mindset-precision-execution-v1` | Orientation toward precise, executable language vs vague speech |
| Social | `social-staff-agent-v1` | Collaborative operator/staff footing vs hostile cues |
| Intent | `intent-library-v1` | VerbNoun matching for valid intents |

All scores are **counsel-only**. They inform; they never authorize action.

## Design rules

- Missing data ≠ 0 ≠ neutral. Unmatched axes are marked `not-measured`.
- No composite score across axes.
- Spiritual scoring is refused unless the operator explicitly declares a spiritual lens.
- Policy and witnesses remain the authority; the matrix only supplies evidence.

## Mindset scoring (summary)

- Base: 0.4
- Precision tokens: +0.1 each (classify, measure, ship, verify, …)
- Vague tokens: −0.12 each (whatever, vibes, idk, just, …)
- Clamped 0–1

Vague tokens carry a heavier penalty than precision rewards, so a few fillers can drag the orientation score low.

## Source

Profiles live in `philosophy-semantic-node-framework/profiles/moment-matrix/`.
