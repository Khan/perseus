# Tangent Graph - Interactive Graph Widget

## Overview

Research and POC for adding tangent graph support to the Interactive Graph widget,
allowing content creators to define tangent function exercises using two movable points.

- **Ticket:** [LEMS-3937](https://khanacademy.atlassian.net/browse/LEMS-3937)
- **POC:** https://github.com/Khan/perseus/pull/3311
- **Branch:** `LEMS-3937/poc-interactive-tangent-graph`

## Scenarios

### Learner: Interacting with a Tangent Graph

> As a learner working on trigonometry problems,
> I want to interact with a tangent graph by dragging it, adjusting its period, amplitude, and phase shift,
> So that I can visually construct the correct tangent function and check my answer.

- A tangent graph renders in the Interactive Graph widget using two movable control points
- The curve updates in real time as the user drags either control point
- The graph correctly renders `f(x) = a * tan(b*x - c) + d` based on point positions
- No vertical lines are drawn across asymptotes (discontinuities are handled correctly)
- Keyboard navigation works on both control points (arrow keys move the point by snap step)
- If both points share the same x-coordinate, the move is rejected gracefully (no crash, no invalid state)
- The graph is scorable — the correct answer is compared using canonical coefficient normalization (angular frequency > 0, phase in [0, π))
- Screen reader announces the graph label and point positions correctly
- The widget renders correctly on mobile

### Content Creator: Configuring a Tangent Graph Exercise

> As a content creator building trigonometry exercises,
> I want to select Tangent as an answer type in the Interactive Graph widget and configure its correct answer, starting position, axis settings, and asymptote visibility,
> So that I can create accurate and customizable tangent graph exercises for learners.

- "Tangent function" appears as a selectable option in the Interactive Graph editor's answer type dropdown
- Selecting tangent renders the tangent graph in the editor's correct answer preview
- The editor displays the correct equation string in the format `y = a * tan(b*x - c) + d`
- The content creator can drag the control points in the editor to set the correct answer
- Start coordinates are supported — the editor can configure where the points start before the learner interacts
- Switching away from tangent and back preserves the graph state correctly
- The editor does not crash or show TypeScript errors when tangent is selected

## References

### Grapher Widget (Legacy Tangent)

The Grapher widget already has a tangent graph type that served as the mathematical reference:

- `packages/perseus-core/src/utils/grapher-util.ts` — Tangent coefficient computation (`getTangentCoefficients`), equation string generation, and its own copy of `canonicalTangentCoefficients()` that uses a different normalization strategy than the kmath version: it guarantees both `a > 0` and `b > 0` by using a `phase += period/2` step, whereas the kmath version only guarantees `b > 0` via the odd function identity (see [Canonical Normalization](#canonical-normalization) for details). Uses the same `f(x) = a * tan(b*x - c) + d` model. Also contains the `"sin("` → `"tan("` label bug (see [Related: Grapher Widget Bug](#related-grapher-widget-bug)).
- `packages/perseus-core/src/utils/grapher-types.ts` — `TangentPlotDefaults` type with default coords and asymptote config
- `packages/perseus-core/src/data-schema.ts` — Existing `PerseusGrapherWidgetOptions` already includes `"tangent"` as a valid plot type
- `packages/perseus-score/src/widgets/grapher/score-grapher.ts` — Grapher scoring uses `coefficients.getTangentCoefficients()` and `geometry.canonicalTangentCoefficients()` for comparison

### Interactive Graph: Sinusoid (Pattern Reference)

The sinusoid graph type was the primary pattern reference for the tangent implementation:

- `packages/perseus/src/widgets/interactive-graphs/graphs/sinusoid.tsx` — Two-point interaction model, coefficient extraction, `Plot.OfX` rendering, keyboard constraints, and screen reader descriptions. The tangent graph mirrors this structure.
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` — Sinusoid reducer case (movePoint action with same-x constraint). Tangent adds an analogous case.
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` — Sinusoid state initialization pattern (default coords, snap step). Tangent follows the same approach.
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `SinusoidGraphState` type. `TangentGraphState` follows the same shape.
- `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` — Sinusoid scoring block (canonical coefficient comparison with `approximateDeepEqual`). Tangent scoring is modeled after this.
- `packages/kmath/src/geometry.ts` — `canonicalSineCoefficients()`. The tangent equivalent normalizes with period `π` instead of `2π`, and can only guarantee `b > 0` (not both `a > 0` and `b > 0` like sine).
- `packages/kmath/src/coefficients.ts` — `getSinusoidCoefficients()`. `getTangentCoefficients()` was added alongside it.

### Mafs Graphing Library

- `mafs` npm package — Provides `Plot.OfX` for rendering function curves on coordinate planes
- https://github.com/stevenpetryk/mafs/issues/133 — Upstream issue for discontinuity rendering (lineTo vs moveTo after non-finite gaps)

## Mathematical Model

The tangent curve uses the form:

```
f(x) = a * tan(b * x - c) + d
```

Where:
- `a` = amplitude (vertical stretch) = `p2[y] - p1[y]`
- `b` = angular frequency = `π / (4 * (p2[x] - p1[x]))`
- `c` = phase = `p1[x] * b`
- `d` = vertical offset = `p1[y]`

Two movable points define the curve (same pattern as sinusoid):
- `p1` is the inflection point (where `tan = 0`, i.e. the curve crosses through its vertical offset)
- `p2` is a quarter-period away and determines the amplitude and period

### Key Differences from Sinusoid

- **Period:** Tangent has period `π` (vs `2π` for sine)
- **Vertical asymptotes:** Occur where `b*x - c = π/2 + n*π`, i.e. `x = (c + π/2 + n*π) / b`
- **Discontinuities:** The function is undefined at asymptotes, requiring special rendering

## Solution Approach

The implementation follows the same patterns established by the sinusoid graph type:

### Rendering (`tangent.tsx`)

1. Compute coefficients from the two movable point coordinates (delegates to `@khanacademy/kmath`'s `getTangentCoefficients()` to keep the formula in one place)
2. Determine asymptote positions within the visible x-range
3. Split the curve into segments between asymptotes
4. Render each segment as a separate `<Plot.OfX>` with its own domain
5. Return `NaN` near asymptotes (within `0.001` distance) to create SVG path gaps

### Scoring (`score-interactive-graph.ts`)

1. Extract tangent coefficients from both user and rubric coordinates
2. Normalize to canonical form (ensure `b > 0`, phase minimized)
3. Use `approximateDeepEqual` to compare canonical coefficients

### Canonical Form Normalization (`geometry.ts`)

Ensures equivalent curves compare as equal:
- Guarantee `b > 0` using the odd function identity: `a * tan(-|b|x - c) = (-a) * tan(|b|x - (-c))`, which flips the signs of `a` and `c`
- Normalize `c` to smallest positive value within period `π`
- Note: unlike sine (where `sin(x + π) = -sin(x)` allows guaranteeing both `a > 0` and `b > 0`), tangent has no such half-period identity, so only `b > 0` can be guaranteed

### Constraints

- Two points **cannot share the same x-coordinate** (would make coefficients undefined)
- Keyboard movement skips positions where `x1 === x2`

## Workaround: Mafs Discontinuity Rendering Issue

**Problem:** Mafs `Plot.OfX` renders a single SVG `<path>` element. When it encounters
non-finite values (like at asymptotes), it skips them but uses `L` (lineTo) for the
next valid point. This draws unwanted vertical lines across discontinuities.

**Prior research:** This was initially reported in LEMS-2262: \[LX\] \[Locked Function\] Spike -
Does Mafs support discontinuities in plot functions?

**Workaround:** Split the tangent curve into separate `<Plot.OfX>` components, one per
segment between asymptotes. Each component gets its own SVG `<path>` element, preventing
cross-discontinuity lines. The workaround is isolated within `getPlotSegments()` and
`getAsymptotePositions()` helper functions so it will be easy to swap out later once the
library is updated.

### Upstream Status

The current plan to avoid blocking our project timeline:

1. **Implement our own solution** — Handle discontinuities in our code, but isolate it in
   a way that makes it easy to update later once the library addresses the issue.
2. **Raise the issue in the library** — No similar issue had been raised, so we filed one.
3. **Propose a fix upstream** — Contribute a solution to the Mafs library.

Steps 2 and 3 are expected to take longer than our current project timeline, so step 1
is the approach used in the POC.

### Upstream Links

- **Mafs issues:** https://github.com/stevenpetryk/mafs/issues
- **Related Issue filed:** https://github.com/stevenpetryk/mafs/issues/133
- **Closest existing work:** https://github.com/stevenpetryk/mafs/pull/134/changes — A stale
  draft PR that touches related path generation logic but does not address the discontinuity problem.

### To Remove This Workaround

Once Mafs fixes path generation to use `M` (moveTo) after non-finite gaps instead of `L` (lineTo):

1. Delete `getPlotSegments()` and `getAsymptotePositions()`
2. Replace the `segments.map(...)` with a single `<Plot.OfX>` covering the full x-range

## Files Modified (POC)

### New files
- `packages/perseus/src/widgets/interactive-graphs/graphs/tangent.tsx` — Main component

### Modified files
- `packages/kmath/src/geometry.ts` — `TangentCoefficient` type, `canonicalTangentCoefficients()`
- `packages/kmath/src/coefficients.ts` — `getTangentCoefficients()`, `NamedTangentCoefficient` type
- `packages/kmath/src/index.ts` — Re-exports `NamedTangentCoefficient`
- `packages/perseus-core/src/data-schema.ts` — `PerseusGraphTypeTangent`, `TangentGraphCorrect`
- `packages/perseus-core/.../interactive-graph-widget.ts` — Parser for tangent type
- `packages/perseus-score/.../score-interactive-graph.ts` — Tangent scoring logic
- `packages/perseus/src/strings.ts` — Screen reader strings (`srTangentGraph`, etc.)
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` — Register tangent type
- `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` — Render tangent graph
- `packages/perseus/src/widgets/interactive-graphs/reducer/` — Actions, reducer, state, init
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `TangentGraphState`
- `packages/perseus-editor/.../graph-type-selector.tsx` — Add "Tangent function" option
- `packages/perseus-editor/.../interactive-graph-editor.tsx` — Editor support
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` — Test data
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` — Builder

## Related: Grapher Widget Bug

The legacy Grapher widget has a tangent graph type, but its `getEquationString` method
in `packages/perseus-core/src/utils/grapher-util.ts` displays `"sin("` instead of `"tan("`
in the equation label. This was fixed in a separate PR on branch
`LEMS-3984/fix-grapher-tangent-label`.

## Decisions

1. **Reuse sinusoid patterns** — The tangent graph follows the same two-point interaction
   model and coefficient extraction approach as the sinusoid graph type.

2. **Segment-based rendering** — Rather than relying on Mafs to handle discontinuities,
   we manually split the curve into segments. This is more code but produces correct visuals.

3. **NaN + segments (belt and suspenders)** — `computeTangent()` returns `NaN` near
   asymptotes as an additional safety net, even though the segment splitting already
   prevents cross-asymptote rendering.

4. **Ref-based coefficient caching** — `coeffRef` stores the last valid coefficients so
   the graph doesn't break during transient invalid states (e.g., mid-drag where points
   momentarily share an x-coordinate).

5. **Canonical form for scoring** — Normalization ensures equivalent tangent curves
   (which can be expressed with different coefficient signs) are scored correctly.
   Unlike sine, tangent has no half-period phase shift identity (`sin(x + π) = -sin(x)`),
   so the canonical form can only guarantee `b > 0`, not both `a > 0` and `b > 0`.
