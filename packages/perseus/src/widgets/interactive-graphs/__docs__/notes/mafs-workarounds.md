# Mafs Library Workarounds & Upstream Decisions

Perseus's Interactive Graph widget renders with the third-party [Mafs](https://github.com/stevenpetryk/mafs)
library (pinned at `0.19.0`, unforked — the only repo patch is `postcss-url.patch`). Two Mafs
limitations required workarounds in Perseus. This document records **what the workarounds are** and,
more importantly, **the decisions about whether to fix them upstream** — so the analysis doesn't have
to be re-derived. It is context for future maintenance and Claude Code sessions.

**Bottom line:** both workarounds are complete and correct, and **neither upstream fix is planned.**
The discontinuity upstream PR was explicitly declined (LEMS-4010 → Won't Do); the touch-scroll
upstream PR is an optional post-project nicety that Perseus does not need.

## Ticket map

| Ticket | What | Status |
|--------|------|--------|
| **LEMS-4010** | Open a PR to fix Mafs `Plot.OfX` discontinuity rendering (`lineTo → moveTo` after non-finite gaps) | **Won't Do** |
| **LEMS-2262** | Fix discontinuity rendering for **Locked Functions** (umbrella ticket) | Open, **moved to a future Interactive Graph epic**; was blocked by LEMS-4010 |
| **LEMS-4100** | Add the visible asymptote back to the tangent graph | Done |
| **LEMS-4353** | Fix iOS 26.5 touch-scroll over interactive graphs (the Perseus-side touch fix) | Done |

---

## Workaround 1 — Discontinuity rendering (tangent segment-splitting)

### The Mafs limitation

`Plot.OfX` builds its curve as a single SVG `<path>` in `sampleParametric`
(`mafs@0.19.0/build/index.js` ~L883). The path is `M x0 y0 L x1 y1 L x2 y2 …`. When a sampled point
is non-finite it is **skipped, but the running `L` (lineTo) connector stays** — so the next finite
point after a gap gets a `lineTo` from the last finite point before the gap. That `lineTo` is the
spurious vertical line drawn across an asymptote/discontinuity.

Sampling is **adaptive** (`sample`/`subdivide`, `minSamplingDepth=8`, `maxSamplingDepth=14`): it only
subdivides where the error is high. This matters for the decision below.

### The Perseus workaround (in `graphs/tangent.tsx`)

- `getAsymptotePositions()` computes the exact x-positions of the tangent's asymptotes.
- `getPlotSegments()` splits the visible x-range into intervals between those asymptotes, and
  `TangentGraph` renders **one `<Plot.OfX>` per segment** — so each gets its own `<path>` and no line
  is drawn across a gap. This is **deterministic**: it breaks the curve at the computed asymptotes
  regardless of where the sampler happens to evaluate.
- `computeTangent()` additionally returns `NaN` within `0.001` of an asymptote as a defensive backup.

### Decision: do NOT open the upstream PR (LEMS-4010 → Won't Do)

LEMS-4010 proposed changing Mafs to emit `M` (moveTo) instead of `L` after a non-finite sample
("Option A"). It was marked **Won't Do**. That is the right call:

1. **Option A wouldn't reliably remove our workaround.** For a `moveTo`-after-non-finite change to
   break the path at a tangent asymptote, the adaptive sampler must actually evaluate an `x` inside
   the narrow `distToAsymptote < 0.001` NaN band. Whether it does is **sampling-dependent** — the
   band's x-width is proportional to `1/b`, so it shrinks for steep tangents, and the near-asymptote
   samples that get evaluated are otherwise large-but-finite and still joined by `L`. Perseus's
   segment-splitting is deterministic and coefficient-independent, so it is strictly safer. Relying on
   Option A to justify deleting a correct, deterministic workaround is a bad trade. (For gentle
   default tangents Option A + the NaN band would *often* work at depth 14 — but "often" is not
   "reliably.")

2. **The robust fix (Option B) is the abandoned upstream work.** The reliable fix is an explicit
   `discontinuities` / `Exclusions`-style prop that forces a subpath break at known x-values (which
   Perseus already computes via `getAsymptotePositions()`). That is exactly what upstream issue
   [#133](https://github.com/stevenpetryk/mafs/issues/133) asked for and what draft PR
   [#134 "wip - discontinuities"](https://github.com/stevenpetryk/mafs/pull/134) attempted — and both
   have been **inactive since 2024** (issue: no maintainer response since Jan 2024; PR: unmergeable
   draft, never merged). The upstream path is effectively dead; a PR there is high-effort and
   externally gated, with no guarantee it lands or ships.

3. **The payoff is small and it's pure cleanup.** Even a merged upstream fix would need a Mafs release
   plus a Perseus version-pin bump before any code could be deleted — and `getAsymptotePositions()`
   would stay regardless, because since **LEMS-4100** it also feeds the visible dashed asymptote lines
   (`TangentAsymptotes`). The current code is correct; there is no product/quality gap.

**If this is ever revisited** (e.g. for locked functions under LEMS-2262 in the future IG epic): scope
it as **Option B**, not Option A, and — given the dead upstream — a local `patch-package` patch on
Mafs is likely more realistic than an upstream PR.

---

## Workaround 2 — Touch-scroll over graphs (HTML hitboxes)

### The Mafs limitation

Mafs' `core.css` sets `touch-action: none` on the top-level `.MafsView` container. That is correct for
Mafs' default pannable/zoomable mode, but when pan/zoom is disabled it traps **page** scroll over the
whole graph. Critically, **Safari does not reliably honor `touch-action` on SVG elements** (nor inside
`<foreignObject>`), so the fix can't just be per-element CSS — only real HTML siblings of the `<svg>`
honor `touch-action`.

### The Perseus workaround

Every draggable (points, lines, asymptotes, vector body/tip, etc.) uses an **HTML `<div>` hitbox**
(`touch-action: none`) portaled into an overlay layer above the SVG as its pointer/touch gesture
target, instead of an SVG hit target. Keyboard/AT interaction stays on the focusable SVG element. See
`graphs/components/hitbox.tsx` (the reusable `useHitbox` primitive), `hitbox-layer-context.ts`, and
`mafs-graph.tsx` (mounts the overlay). Shipped under **LEMS-4353** (iOS 26.5 made this critical).

### Decision: upstream PR is optional and deferred (no ticket, not needed by Perseus)

Contributing this back to Mafs — relaxing `.MafsView`'s `touch-action` conditionally on pan/zoom
**and** giving `MovablePoint` et al. HTML hitboxes — would benefit other Mafs consumers, but Perseus is
already fixed (it forked the interaction layer). It is not required to finish IGP2 and has no tracking
ticket. Deferred as a possible future contribution only.

---

## Relationship to the code

- `graphs/tangent.tsx` — the discontinuity workaround (`getPlotSegments`, `getAsymptotePositions`,
  `computeTangent` NaN band) and the removal-recipe comment. See also [tangent.md](./tangent.md).
- The touch-scroll workaround: `graphs/components/hitbox.tsx` (the `useHitbox` primitive + Safari
  rationale), `graphs/components/hitbox-layer-context.ts` (carries the `UPSTREAM (Mafs)` note), and
  `mafs-graph.tsx` (mounts the overlay layer).
- The exponential/logarithm/vector docs describe the same HTML-hitbox behavior from each graph's angle.
