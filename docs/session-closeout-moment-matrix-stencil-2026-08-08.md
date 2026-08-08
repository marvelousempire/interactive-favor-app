# Session Closeout — Moment Matrix Stencil Extraction · 2026-08-08

**Scope:** Investigate Moment Matrix → explore V/N/D/Q/T stencil → extraction techniques → implement dependency-lite patterns → repository closeout.

---

## Landed upstream (`nephew/moment-matrix`)

| Commit | What |
|--------|------|
| `1698a0d` | **`src/stencil.mjs`** — dependency-lite extractor approximating UD relations (`obl:place`, `advmod:manner`, `obl:tmod`) without NLP deps |
| `5fc89b7` | **Package exports** — `extractStencilSlots`, `scoreStencil`, `solveStencil`, `STENCIL_WEIGHTS`, `STENCIL_PASS_THRESHOLD` from `src/index.mjs` |

### Extractor contract

- **Weights (doctrine):** Verb 0.25 · Noun 0.25 · Destination 0.25 · Quality 0.125 · Time 0.125
- **Pass:** ≥ 0.90
- **Missing:** stays `not-measured` — never invented, never coerced to zero
- **Call:** `import { extractStencilSlots } from '@nephew/moment-matrix'`

### Patterns

| Slot | Dependency-lite approach |
|------|--------------------------|
| Verb | Library verbs → common imperative set → first content token |
| Noun | Library nouns → first object-like token after verb |
| Destination | Place preps (`to`/`into`/`at`/`on`/`in`/…) + NP; bare place adverbs |
| Quality | Manner adverbs; `with`/`using`/`via` + NP |
| Time | Temporal adverbs; `every`/`by`/`before`/`after`/`until`/`at` + expression; ISO/clock |

---

## Still open (honest)

| Item | Status |
|------|--------|
| Wire `extractStencilSlots` into `engine-snf.mjs` `scoreOperational` | **Not landed** — concurrent write locks blocked; `scorePrompt` still uses V+N-only path |
| `tests/stencil.test.mjs` | **Not landed** |
| Attach `syntax.stencil_v1` on `moment_observation` from engine | Depends on engine wire |
| Favor adapter + claim UI stencil checklist | Unchanged P1 |
| Persist `moment_id` on favor records | Unchanged P1 |

**Workaround until engine wire:** Favor (or any consumer) can import `extractStencilSlots` directly and treat the result as execution_input counsel. Do not average into reputation or Ready Play.

---

## Favor consumption reminder

- Stencil = **execution_input** (completeness / clarify path)
- Affect / philosophy / mindset / social = **counsel_only**
- Policy axis alone **authorizes**
- No composite soul score
- Missing ≠ 0 ≠ neutral

See [favor-moment-matrix.md](./favor-moment-matrix.md) · [microslice-solvency-formula.md](./microslice-solvency-formula.md) · [open-work.md](./open-work.md)

---

## Related upstream paths

- `nephew/moment-matrix/src/stencil.mjs`
- `nephew/moment-matrix/src/index.mjs` (exports)
- `nephew/moment-matrix/src/engine-snf.mjs` (wire still pending)
- Presence browser twin: `apps/super-rick-presence/lib/moment-matrix-sentence-syntax.ts` (cue lists; keep schema-compatible)
