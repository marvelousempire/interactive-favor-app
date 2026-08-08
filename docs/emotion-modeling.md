# Emotion Modeling — VAD, Plutchik, and Sentiment Approaches

**Context:** Moment Matrix affect axis and Media Resolver “Mood of Expression” instrument.  
**Date of synthesis:** 2026-08-07 research session.

---

## 1. Current Favor / SNF baseline

The Moment Matrix ships a **compact valence + arousal lexicon** (`affect-lexicon-v1`).

- Valence: −1 … +1
- Arousal: 0 … 1
- Missing data is first-class (`not-measured`)
- Always counsel-only
- No composite soul score

Dominance (the third VAD axis) is already reserved in `SCORE-NAMESPACES.md` as `affect.dominance` but is not yet populated by the lexicon.

---

## 2. VAD (Valence–Arousal–Dominance)

| Axis | Meaning | Typical range |
|------|---------|---------------|
| Valence | pleasure ↔ displeasure | −1 … +1 or 1–9 |
| Arousal | calm ↔ activated | 0 … 1 or 1–9 |
| Dominance | controlled ↔ in-control | 1–9 |

**Why it fits the stack**
- Continuous coordinates instead of forced categories
- Easy to keep independent of philosophy / mindset / operational axes
- Dominance helps disambiguate Anger vs Fear in high-arousal / low-valence regions
- Compatible with the existing “missing ≠ 0” rule

**Recommended next step:** extend the affect lexicon with a Dominance column (or a parallel dominance lexicon) while keeping the same counsel-only contract.

---

## 3. Plutchik’s Wheel of Emotions

Eight primary emotions as opposite pairs:

- Joy ↔ Sadness
- Trust ↔ Disgust
- Fear ↔ Anger
- Surprise ↔ Anticipation

Each primary has intensity levels (outer = milder, center = stronger). Adjacent pairs form dyads (Love, Submission, Awe, Contempt, Optimism, etc.).

**Strengths:** intuitive labels, intensity gradients, secondary combinations.  
**Limitations for us:** categorical rather than continuous; harder to keep “not-measured”; less natural to combine with other continuous axes.

### Valence–Arousal → Plutchik region map

| Region | Plutchik primary (intensity) |
|--------|------------------------------|
| High valence + high arousal | Joy / Ecstasy |
| High valence + low arousal | Trust / Serenity / Acceptance |
| Low valence + high arousal | Anger / Rage *or* Fear / Terror (Dominance helps separate) |
| Low valence + low arousal | Sadness / Grief (Disgust can also appear) |
| High arousal + swinging valence | Surprise |
| Forward-looking + moderate–high arousal | Anticipation |

Near-zero valence + moderate arousal should usually stay unlabeled or “mixed.”

Plutchik labels are useful as an **optional readable overlay** on top of continuous V/A scores; they must never replace the continuous scores or authorize action.

---

## 4. Sentiment analysis model families (comparison)

| Family | Examples | Strengths | Weaknesses | Fit for Moment Matrix |
|--------|----------|-----------|------------|-----------------------|
| Lexicon | AFINN, VADER, NRC, our affect-v1 | Transparent, offline, honest missing data | Negation, sarcasm, domain shift | **Primary** — current design |
| Classical ML | Naive Bayes, SVM, logistic on TF-IDF | Learns domain patterns | Needs labels; brittle to word order | Optional secondary |
| Transformers | BERT / RoBERTa sentiment heads | Strong context | Opaque, heavy, forced scores, hard to audit | Use only with strict confidence + counsel bounds |
| Multidimensional / aspect | VAD predictors, aspect-based | Multiple independent axes | Complexity | Aligns with multi-axis philosophy |

**Design rule for Favor**
1. Keep the lexicon as the default, auditable baseline.
2. Any learned model must still surface confidence and may never silently fill missing values.
3. No sentiment or affect score may authorize action; policy and witnesses remain the only authority path.

---

## 5. Product implications

- **Mood of Expression** instrument (Media Resolver) already consumes SNF affect readings.
- Future instrument products can expose:
  - Raw V/A (and later Dominance) cells
  - Optional Plutchik label overlay
  - Confidence + missing flags
- These become WooCommerce-style (or internal catalog) products that Favor and ReadyPlay can compose without inventing new scoring authority.
