# Tangent Graph — Technical Reference

Technical specification for the tangent graph type in the Interactive Graph widget.
This document defines expected behavior, architecture, and design decisions. It is intended
as context for future development and Claude Code sessions.

## Traceability

- **Original ticket:** [LEMS-3937](https://khanacademy.atlassian.net/browse/LEMS-3937)
- **POC:** https://github.com/Khan/perseus/pull/3311
- **Asymptote follow-up:** [LEMS-4100](https://khanacademy.atlassian.net/browse/LEMS-4100) —
  added the visible vertical asymptotes described below. The original implementation
  intentionally omitted them; a content-editor interview later confirmed a tangent graph is
  mathematically expected to show its asymptotes.

## Architecture Overview

### File Map

| File | Purpose |
|------|---------|
| `graphs/tangent.tsx` | Main rendering component: curve segments, asymptote lines, points, SR descriptions |
| `graphs/components/dashed-asymptote-line.tsx` | Shared presentational backing+dashed line pair for an asymptote; used by both `TangentAsymptotes` and `MovableAsymptote` (exp/log) |
| `graphs/components/svg-line.tsx` | Low-level reusable SVG `<line>` (used by `DashedAsymptoteLine` and other components) |
| `graphs/strings/tangent.ts` | `describeTangentGraph()` and the SR graph description (`buildTangentDescription`) |
| `reducer/interactive-graph-reducer.ts` | `movePoint` case for tangent (same-x rejection) |
| `reducer/initialize-graph-state.ts` | Default coords + snap step |
| `types.ts` | `TangentGraphState` (coords + snapStep) |
| `interactive-graph.tsx` | Registers the tangent graph type |
| `@khanacademy/kmath` `coefficients.ts` | `getTangentCoefficients()` — shared math utility |
| `@khanacademy/kmath` `geometry.ts` | `canonicalTangentCoefficients()` — canonical form for scoring |
| `@khanacademy/perseus-core` `data-schema.ts` | `PerseusGraphTypeTangent`, `TangentGraphCorrect` |
| `@khanacademy/perseus-score` `score-interactive-graph.ts` | Tangent scoring block |
| `@khanacademy/perseus-editor` `graph-type-selector.tsx` | "Tangent function" option |

### Data Flow

```
User interaction (drag/keyboard)
  → Dispatch action (movePoint)
  → Reducer applies constraints (reject same-x), updates TangentGraphState
  → TangentGraph component re-renders:
      1. Computes coefficients from coords (getTangentCoefficients)
      2. Computes asymptote x-positions in view (getAsymptotePositions)
      3. Renders the dashed asymptote lines (TangentAsymptotes)
      4. Splits the curve into segments between asymptotes and renders one
         <Plot.OfX> per segment (Mafs discontinuity workaround)
      5. Renders MovablePoints
  → On submit: coefficients extracted from coords
  → Scoring: canonical coefficient comparison via approximateDeepEqual
```

## Expected Behavior

### Curve Rendering

- The curve renders `f(x) = a * tan(b * x - c) + d`.
- Because the tangent function is discontinuous at each asymptote, the curve is **split into
  segments** between consecutive asymptotes; each segment is a separate `<Plot.OfX>` with its
  own `domain`. This works around a Mafs rendering issue (see
  [Workaround: Mafs Discontinuity Rendering](#workaround-mafs-discontinuity-rendering)).
- `computeTangent()` additionally returns `NaN` within `0.001` of an asymptote as a defensive
  backup, so even a single `<Plot.OfX>` would not draw a connecting line across a gap.
- The curve updates in real time as either control point is dragged.
- `coeffRef` caches the last valid coefficients so the curve keeps rendering during transient
  invalid states (e.g. mid-drag where the two points momentarily share an x-coordinate).

### Asymptote Rendering

- A tangent has **multiple** vertical asymptotes. Their x-positions are **fully derived from
  the two control points** (the curve's period and phase) — they are *not* an independent,
  user-set value. Every asymptote that falls within the visible x-range is drawn.
- Asymptotes occur where `b*x - c = π/2 + n*π`, i.e. `x = (c + π/2 + n*π) / b`. The nearest
  two sit half a period on either side of the inflection point.
- The positions are computed once by `getAsymptotePositions()` and feed **both** the visible
  dashed lines (`TangentAsymptotes`) and the curve segment splitting, keeping them in sync.
- Each asymptote is a full-height vertical **dashed** line, drawn by the shared
  `DashedAsymptoteLine` component so it matches the exponential and logarithm graphs' asymptotes
  exactly: a solid background-colored backing line (so dashes stay visible on grid lines and
  axes) with a dashed `interactiveColor` line on top and rounded ends (`stroke-linecap: round`).
  Styling uses the shared CSS variables `--movable-asymptote-stroke-weight`,
  `--movable-asymptote-dash-length`, and `--movable-asymptote-dash-gap` from `mafs-styles.css`.
- The lines render **behind** the curve and the movable points in the SVG DOM.

### Asymptote Interaction

- **The tangent asymptotes are visible but not interactive.** Unlike exponential and logarithm
  — where the single asymptote is an independent value stored in graph state and is draggable
  via `MovableAsymptote` — a tangent's asymptotes are a consequence of the control points, so
  there is nothing to drag independently. The learner adjusts period, amplitude, and phase by
  moving the two points, and the asymptotes move with them.
- The asymptote lines are `aria-hidden` and carry no drag handle or hit target. They stay at
  the resting stroke weight/dash values at all times (they are not inside a `.movable-line`
  group, so the hover/focus/drag CSS variants never activate).

### Point Behavior

- Two movable control points define the curve:
  - `coords[0]` — the **inflection point** (where `tan = 0`, i.e. the curve crosses its
    vertical offset).
  - `coords[1]` — a **quarter-period away**; sets the amplitude and period.
- The two points **cannot share the same x-coordinate** (the coefficient computation would be
  undefined). Invalid moves are rejected gracefully (no crash, no invalid state).

### Keyboard Navigation

- Arrow keys move the focused point by the snap step (`getTangentKeyboardConstraint`).
- If a horizontal move would land the point on the other point's x-coordinate, the constraint
  moves it one additional snap step in the same direction so the two points never share an x.

### Scoring

- Coefficients `{amplitude, angularFrequency, phase, verticalOffset}` are computed for both the
  user answer and the rubric via `getTangentCoefficients()`.
- Both are normalized to canonical form (`canonicalTangentCoefficients()`) before comparison
  with `approximateDeepEqual`, so two different point placements that produce the same curve
  score as correct.
- Canonical form guarantees `b > 0` using the odd-function identity
  `a * tan(-|b|x - c) = (-a) * tan(|b|x - (-c))` (which flips the signs of `a` and `c`) and
  normalizes `c` to the smallest positive value within the period `π`. Unlike sine, tangent
  has no half-period identity (`sin(x + π) = -sin(x)`), so only `b > 0` — not both `a > 0` and
  `b > 0` — can be guaranteed.

### Accessibility

- `aria-label` on the graph container (`srTangentGraph`).
- Localized labels for each point (`srTangentInflectionPoint`, `srTangentSecondPoint`), with
  custom author `pointLabels` taking precedence.
- The graph description (`buildTangentDescription`) states the two points, whether the curve
  is increasing or decreasing through the inflection point, the period, and the **positions of
  the nearest vertical asymptotes** (`srTangentAsymptotes`). The asymptotes are therefore
  described to screen readers even though they are not a separate interactive element.
- Interactive elements description (`srTangentInteractiveElements`) lists **only the two
  points** — consistent with the asymptotes being visual/derived rather than interactive.
- All number values use `srFormatNumber` for locale-appropriate formatting.

### Mobile

- Both control points support touch dragging (same as the sinusoid graph).
- The asymptote lines are non-interactive, so there is no touch target to size for them.

## Mathematical Model

### Formula

```
f(x) = a * tan(b * x - c) + d
```

Derived from the two control points (`p1` = inflection, `p2` = quarter-period point):

- `a` = amplitude (vertical stretch) = `p2[y] - p1[y]`
- `b` = angular frequency = `π / (4 * (p2[x] - p1[x]))`
- `c` = phase = `p1[x] * b`
- `d` = vertical offset = `p1[y]`

### Key Differences from Sinusoid

- **Period:** `π` (vs `2π` for sine); the on-screen period is `4 * |p2[x] - p1[x]|`.
- **Vertical asymptotes:** at `x = (c + π/2 + n*π) / b`. Sine has none.
- **Discontinuities:** the function is undefined at each asymptote, requiring segment-based
  rendering.

### When `getTangentCoefficients` returns `undefined`

Returned when the two points share an x-coordinate (`p2[x] === p1[x]`), which would make
`angularFrequency` divide by zero. The renderer falls back to the cached `coeffRef` value so
the graph keeps drawing until a valid configuration returns.

## Workaround: Mafs Discontinuity Rendering

**Problem:** Mafs `Plot.OfX` renders a single SVG `<path>`. When it hits non-finite values
(like at asymptotes) it skips them but uses `L` (lineTo) for the next valid point, drawing
unwanted vertical lines across discontinuities.

**Workaround:** Split the curve into separate `<Plot.OfX>` components, one per segment between
asymptotes (`getPlotSegments()`), each getting its own SVG `<path>`. Isolated in
`getPlotSegments()` / `getAsymptotePositions()` so it is easy to remove later.

- **Tracked upstream:** https://github.com/stevenpetryk/mafs/issues/133
- **Prior research:** LEMS-2262.

**To remove this workaround** once Mafs uses `M` (moveTo) after non-finite gaps:

1. Delete `getPlotSegments()`. (Keep `getAsymptotePositions()` — the visible asymptote lines
   still need it.)
2. Replace the `segments.map(...)` in `TangentGraph` with a single `<Plot.OfX>` covering the
   full x-range.

## State Management

### `TangentGraphState`

```typescript
interface TangentGraphState extends InteractiveGraphStateCommon {
    type: "tangent";
    coords: [vec.Vector2, vec.Vector2]; // [inflection point, quarter-period control point]
}
```

`InteractiveGraphStateCommon` supplies the shared fields (`snapStep`, `range`,
`hasBeenInteractedWith`, etc.). Note there is **no `asymptote` field** (contrast with
`LogarithmGraphState` / `ExponentialGraphState`, which add one): the tangent asymptotes are
derived, not stored.

### Actions

- `actions.tangent.movePoint(index, destination)` → `MOVE_POINT`

## Decisions Log

1. **Reuse sinusoid patterns** — Two-point interaction model and coefficient extraction mirror
   the sinusoid graph type.

2. **Asymptotes are derived, not draggable** — A tangent's asymptotes follow from the control
   points, so (unlike exponential/logarithm) they are rendered as visible dashed lines but are
   not independent, draggable elements. This also keeps the SR interactive-elements contract to
   just the two points. (LEMS-4100)

3. **Shared asymptote-position source** — `getAsymptotePositions()` feeds both the visible
   dashed lines and the curve segment splitting, so the lines can never drift out of sync with
   the gaps in the curve.

4. **Shared `DashedAsymptoteLine` visual** — The backing+dashed line pair is one shared
   presentational component (`graphs/components/dashed-asymptote-line.tsx`) used by both
   `TangentAsymptotes` and `MovableAsymptote` (exp/log), so all three graph types render the
   exact same asymptote visual and cannot drift apart. The component is visual-only: the drag
   hitbox and handle stay in `MovableAsymptote`, so the tangent lines remain non-interactive and
   never enter the hover/focus/drag "active" styling. (LEMS-4100)

5. **Segment-based rendering** — Rather than relying on Mafs to handle discontinuities, the
   curve is split into segments between asymptotes. More code, but correct visuals.

6. **NaN + segments (belt and suspenders)** — `computeTangent()` returns `NaN` near asymptotes
   as an extra safety net on top of the segment splitting.

7. **Ref-based coefficient caching** — `coeffRef` stores the last valid coefficients so the
   graph does not break during transient invalid states (e.g. mid-drag same-x).

8. **Canonical form for scoring** — Normalization makes equivalent tangent curves score as
   equal. Tangent has no half-period phase identity, so canonical form guarantees only `b > 0`,
   not both `a > 0` and `b > 0`.

## Comparison with Other Graph Types

### vs. Logarithm / Exponential

| Aspect | Tangent | Logarithm / Exponential |
|--------|---------|-------------------------|
| Formula | `a * tan(b*x - c) + d` | `a * ln(b*x + c)` / `a * e^(b*x) + c` |
| Interactive elements | 2 points | 2 points + 1 draggable asymptote |
| Asymptotes | Multiple, periodic, **derived** from points | Single, **user-movable**, stored in state |
| Asymptote UI | Visible dashed lines, non-interactive | `MovableAsymptote` with drag handle |
| State | coords + snapStep (no asymptote field) | coords + `asymptote` number |
| Rendering | Segment splitting (multiple `Plot.OfX`) | Single `Plot.OfX` with `domain` prop |
| Canonical normalization | Yes | No |

### vs. Sinusoid

| Aspect | Sinusoid | Tangent |
|--------|----------|---------|
| Period | `2π` | `π` |
| Asymptotes | None | Multiple (periodic, derived) |
| Rendering | Single `Plot.OfX` | Segment splitting |
| Canonical guarantee | `a > 0` **and** `b > 0` | `b > 0` only |

## Legacy Reference: Grapher Widget

The Grapher widget has a tangent graph type that served as the mathematical reference:

- `packages/perseus-core/src/utils/grapher-util.ts` — `getTangentCoefficients`, equation string
  generation, and its own `canonicalTangentCoefficients()` (guarantees both `a > 0` and `b > 0`
  via a `phase += period/2` step, unlike the kmath version). Historically contained a
  `"sin("` → `"tan("` label bug, fixed separately on `LEMS-3984/fix-grapher-tangent-label`.
- `packages/perseus-core/src/utils/grapher-types.ts` — `TangentPlotDefaults`.
- `packages/perseus-score/src/widgets/grapher/score-grapher.ts` — Grapher tangent scoring.
</content>
</invoke>
