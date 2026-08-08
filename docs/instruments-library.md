# Instruments Library — Measurement Shapes for Favor + ReadyPlay

**Primary sources**
- `media-resolver/lib/instruments/` — concrete instrument implementations and panel
- `philosophy-semantic-node-framework` — Moment Matrix profiles + VerbNoun library
- This document — Favor-side catalog so every instrument is counted for productization

---

## 1. Design principle

An **instrument** declares *how a reading is shaped*, not what it means.

- A `meter` and a `balance` can both measure honesty; they differ in whether the answer is a level or a tilt.
- Shape stays separate from meaning so one signal can drive several instruments without any of them lying.
- Every instrument carries a **missing-data shape**. A rack full of zeros must never look identical to a rack full of *nothing*.

Status vocabulary used by Media Resolver:
- `built` — real signal, real `read()`
- `specified` — fixed contract, no implementation yet
- `gap` — named so it is visible on the panel rather than forgotten

---

## 2. Instrument kinds (shapes)

From `lib/instruments/kinds.mjs`:

**Level and tilt**
- Meter — single level in a declared range
- Balance — tilt between two named poles
- Range — low, high, and current position
- Gambit — what is risked against what is offered

**Shape over time or corpus**
- Curve — value across an axis
- Decay — how fast something falls off
- Spectrum — energy across bands
- Histogram — counts per bucket

**Position and direction**
- Vector — position + direction in a declared space
- Cube — three declared axes at once
- Spear — one direction with magnitude

**Shaping and rounding**
- Equalizer — bands the operator can lift or cut
- Quantizer — continuous values snapped to a grid (always keeps raw)
- Statistic — summary over a set, with its *n*

---

## 3. Families (what the instrument is about)

| Family | Label | Asks |
|--------|-------|------|
| truth | Architecture of Truth | Is this demonstrated? |
| expression | Mood of Expression / Mode of Expression | How is it being said? |
| attention | Attention | Is it worth mine? |
| economics | Economics | What does it cost or return? |
| signal | Signal | What is physically there? |

---

## 4. Shipped instruments (Media Resolver panel)

**Truth family**
- Honesty meter (built)
- Fact ↔ Opinion balance (built)
- Drop histogram (built)
- Claims without a basis / claim ledger (built)
- Proof over time curve (gap)

**Expression family (SNF bridge)**
- Concise perspective vector (built) — VerbNoun pairing
- Parts-of-speech spectrum (built)
- Mode of Expression cube (built) — philosophy.fit × mindset.orientation × social.context_fit
- Mood of Expression cube (built) — valence × arousal (+ tension)

**Attention / Economics**
- Interest meter, Usability meter, Preference equalizer (built)
- Capitalization gambit (built)
- Attention decay (gap)

**Signal family**
- Voice tone spectrum, Speech pattern curve (gap)

---

## 5. Semantic / Intent instruments (SNF)

These are the “library” side of the Mode of Expression work:

- Intent Library (VerbNoun + valid_intent entries)
- Affect lexicon (V + A)
- Philosophy / Mindset / Social keyword profiles
- Moment Matrix engine that binds place + time + scores

See `docs/moment-matrix.md` and `docs/emotion-modeling.md` for full detail.

---

## 6. Productization direction

Every distinct instrument (shape + family + profile version) is a candidate **product**:

- Internal catalog entry or WooCommerce-style product
- Versioned, auditable, composable
- Consumed by Favor (reputation, YONAW context, claim completeness) and ReadyPlay (competitive overlays, counsel panels)
- Never gains authority simply by existing; policy and witnesses remain the only authorization path

**Example product candidates**
- Mood of Expression (V/A cube)
- Mode of Expression (philosophy × mindset × social cube)
- Honesty meter + Fact/Opinion balance
- Operational stencil (Verb + Noun completeness)
- Capitalization gambit
- Future: Dominance-augmented VAD, Plutchik overlay, speech-pattern curve

---

## 7. Open gaps to track

- Dominance axis population for full VAD
- Plutchik optional overlay (readable labels only)
- Attention decay and proof-curve instruments
- Voice / speech signal instruments
- Explicit Favor consumption contracts for each instrument (what is counsel vs what may affect ranking inputs)
