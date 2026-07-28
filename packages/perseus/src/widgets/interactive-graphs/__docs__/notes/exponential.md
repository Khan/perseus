# Exponential Graph — Technical Reference

Technical specification for the exponential graph type in the Interactive Graph widget.
This document defines expected behavior, architecture, and design decisions. It is intended
as context for future development and Claude Code sessions.

## Traceability

- **Ticket:** [LEMS-3711](https://khanacademy.atlassian.net/browse/LEMS-3711)

## Architecture Overview

### File Map

| File | Purpose |
|------|---------|
| `graphs/exponential.tsx` | Main rendering component: curve, asymptote, points, SR descriptions |
| `graphs/components/movable-asymptote.tsx` | Reusable draggable asymptote line (shared with logarithm); renders its visible line via `DashedAsymptoteLine` |
| `graphs/components/dashed-asymptote-line.tsx` | Shared presentational backing+dashed line pair (also used by the tangent graph) |
| `graphs/components/movable-pill-handle.tsx` | Pill-shaped SVG drag handle (also used by the vector graph) |
| `reducer/interactive-graph-reducer.ts` | `doMovePoint` and `doMoveCenter` cases for exponential |
| `reducer/initialize-graph-state.ts` | `getExponentialCoords()` — default coords and asymptote |
| `reducer/interactive-graph-state.ts` | `getGradableGraph` serialization for exponential |
| `mafs-state-to-interactive-graph.ts` | Exponential state → persisted data conversion |
| `types.ts` | `ExponentialGraphState` (coords + asymptote + snapStep) |
| `interactive-graph.tsx` | `getExponentialEquationString()`, `defaultExponentialCoords()` |
| `interactive-graph-question-builder.ts` | `withExponential()` test helper |
| `interactive-graph.testdata.ts` | `exponentialQuestion` fixture |
| `@khanacademy/kmath` `coefficients.ts` | `getExponentialCoefficients()` — shared math utility |
| `@khanacademy/perseus-core` `data-schema.ts` | `PerseusGraphTypeExponential`, `ExponentialGraphCorrect` |
| `@khanacademy/perseus-score` `score-interactive-graph.ts` | Exponential scoring block |
| `@khanacademy/perseus-editor` `start-coords-exponential.tsx` | Editor start coords UI |
| `__docs__/interactive-graph-asymptote-regression.stories.tsx` | Drag handle visual regression stories (shared with logarithm) |

### Data Flow

```
User interaction (drag/keyboard)
  → Dispatch action (movePoint / moveCenter)
  → Reducer applies constraints, updates ExponentialGraphState
  → ExponentialGraph component re-renders:
      1. Computes coefficients from coords + asymptote (getExponentialCoefficients)
      2. Renders Plot.OfX with y-padding NaN cutoff
      3. Renders MovableAsymptote with drag handle
      4. Renders MovablePoints
  → On submit: getGradableGraph extracts coords + asymptote
  → Scoring: coefficient comparison via approximateDeepEqual
```

## Expected Behavior

### Curve Rendering

- The curve renders `f(x) = a * e^(b*x) + c` using a single `<Plot.OfX>`.
- The curve is drawn across the full x-domain `[xMin, xMax]` — exponential is defined
  everywhere, so no domain restriction is needed.
- The curve approaches the horizontal asymptote as `x → ±∞`. The `Plot.OfX` callback
  applies a **y-padding NaN cutoff** so that y-values far outside the visible range stop
  the SVG path (see [Curve-Asymptote Visual Continuity](#curve-asymptote-visual-continuity)).
- The curve never visually touches or intersects the asymptote: as `x → ±∞` the curve
  exits horizontally off the left/right edges of the visible area while y converges on
  the asymptote.
- When the asymptote sits between the two points (or a point lies exactly on the asymptote),
  no exponential fits — `getExponentialCoefficients` returns `undefined` and the
  `<Plot.OfX>` is not rendered. The asymptote and points remain fully interactive in this
  state, so the user can recover by dragging anything back to a valid configuration.
- The curve updates in real time as points or asymptote are dragged.

### SVG Rendering Order

The `MovableAsymptote` component wraps both the asymptote lines and the drag handle. The
curve is rendered as `children` of `MovableAsymptote`, which places it between the lines
and the handle in the SVG DOM. This gives the following back-to-front stacking:

1. **Asymptote lines** (white backing + dashed blue) — bottom layer
2. **Curve** (`Plot.OfX`, rendered as `MovableAsymptote` children) — above the lines
3. **Drag handle** (`AsymptoteDragHandle`) — above the curve
4. **Movable points** (`MovablePoint`) — top layer

This order ensures two things: (a) the curve is visible where it approaches the asymptote
(not hidden behind the white backing line), and (b) the drag handle is always visually
above the curve line. The curve has `pointerEvents: "none"` so it does not intercept
mouse/touch events meant for the asymptote's hit target underneath. The same ordering
applies to the logarithm graph.

### Asymptote Rendering

- The asymptote is a full-width horizontal **dashed** line using `MovableAsymptote` with `orientation="horizontal"`.
- The visible line is rendered by the shared `DashedAsymptoteLine` component (also used by the
  tangent graph) as two stacked SVG lines: a solid white backing line (so dashes are visible on
  grid lines and axes) and a dashed blue line on top with rounded ends (`stroke-linecap: round`).
- **Resting state**: stroke weight 2px, dash length 6, gap 8.
- **Hover/focus/drag state**: stroke weight 4px, dash length 8, gap 12.
- These are controlled by CSS variables `--movable-asymptote-stroke-weight`,
  `--movable-asymptote-dash-length`, and `--movable-asymptote-dash-gap` in `mafs-styles.css`,
  activated via `:hover`, `:focus-visible`, and `.movable-dragging` selectors.
- The entire line is draggable (not just the handle) via a transparent 44px-tall SVG hit target.
- A pill-shaped drag handle (`AsymptoteDragHandle`) is rendered at the midpoint:
  - **Active state** (hovered, focused, or dragging): 22px × 12px pill with 6 white grip dots (3×2 grid)
  - **Inactive state** (default): 16px × 6px pill, no grip dots
  - **Focus ring** (keyboard focus only): rounded outline around the handle (not the full line)
- The drag handle retains focus after a mouse drag ends, matching movable point behavior.
  Focus clears only when the user clicks elsewhere or navigates away via keyboard.

### Asymptote Drag Behavior

- The asymptote is constrained to vertical movement only (X component ignored).
- The asymptote snaps to the grid.
- The asymptote may be dragged to any y-position, including between the two curve points.
  When between the points (i.e. one point above and one below), no valid exponential fits
  and the curve disappears (the asymptote and points remain interactive).
- The asymptote cannot land such that its drag handle (a pill at the x-midpoint of the range,
  on the asymptote line) would overlap a curve point's coord. This guarantees the handle is
  always grabbable. Built from `getAsymptoteHandleCoord("horizontal", range, asymptote)`.

### Point Behavior

- Two movable control points define the curve shape along with the asymptote.
- Points may be placed anywhere within the graph range, including on or across the asymptote.
  Configurations that produce no fit (point on asymptote, or points on opposite sides) are
  allowed — they simply produce no curve.
- Both points must have **different x-values** (same x makes coefficient `b` undefined).
  Unlike logarithm, same y-values are *allowed* — only same x is degenerate for exponential.
- The only forbidden landing position is the exact coord of the asymptote drag handle (so
  the handle stays grabbable).
- Invalid moves are rejected gracefully (no crash, no invalid state).

### Keyboard Navigation

- **Points:** Arrow keys move by snap step. The shared `getAsymptoteGraphKeyboardConstraint`
  helper applies an `isValidPosition()` predicate that rejects same-x collisions with the
  other point and rejects landing on the asymptote drag handle's coord. If a step lands on
  a forbidden position, the constraint retries up to 3 snap steps in the same direction. If
  no valid position exists within 3 steps, the point stays in place.
- **Asymptote:** Arrow keys move vertically by snap step. `skipAsymptoteKeyboardOverPoint`
  snaps the proposed point to the grid (required by `useDraggable`'s function-form
  constraint), then if the snapped position would put the handle on a point's coord, it
  steps further in the direction of travel until it finds a valid position (up to 3 extra
  snap steps).

### Scoring

- Coefficients `{a, b, c}` are computed for both user answer and rubric using
  `getExponentialCoefficients()`.
- Comparison uses `approximateDeepEqual` on `[a, b, c]` arrays of the coefficients.
- No canonical normalization needed (exponential has no periodic equivalences).
- Two different sets of control points that produce the same curve score as correct.
- Returns `invalid` if coords or asymptote are missing, or coefficient computation fails.

### Accessibility

- `aria-label` on the graph container (`srExponentialGraph`).
- Localized labels for each point (`srExponentialPoint1`, `srExponentialPoint2`).
- Localized asymptote label (`srExponentialAsymptote`) with keyboard navigation instructions.
- Graph description (`srExponentialDescription`) with point and asymptote positions.
- Interactive elements description (`srExponentialInteractiveElements`).
- Asymptote and point moves are announced to screen readers via the WB Announcer (the reducer's `stateAnnouncement`), consumed in `stateful-mafs-graph.tsx`.
- All number values use `srFormatNumber` for locale-appropriate formatting.

### Editor

- "Exponential function" appears in the graph type selector, gated by the
  `interactive-graph-exponent` feature flag (note: the flag name is `-exponent`, not
  `-exponential`).
- `StartCoordsExponential` component provides: two coordinate pair inputs, a single number
  input for asymptote y-position, and equation display showing `y = a * e^(b*x) + c`.
- CSS module styling (`start-coords-exponential.module.css`), not Aphrodite.

### Mobile

- All interactions (drag points, drag asymptote) work via touch.
- The 44px transparent hit target on the asymptote ensures adequate touch target size.

## Mathematical Model

### Formula

```
f(x) = a * e^(b * x) + c
```

Where `[a, b, c]` are 3 coefficients derived from 2 movable points and 1 horizontal asymptote.
The asymptote y-value *is* the `c` coefficient — no extra computation needed for `c`.

### Coefficient Computation

Direct (no flipping/inversion). Given `p1 = [x1, y1]`, `p2 = [x2, y2]`, asymptote y = `c`:

1. `c = asymptote` (the asymptote y-value is the c coefficient directly)
2. `b = ln((y1 - c) / (y2 - c)) / (x1 - x2)`
3. `a = (y1 - c) / e^(b * x1)`

### When `getExponentialCoefficients` returns `undefined`

These are the cases where no exponential fits and the renderer skips `<Plot.OfX>`. The widget
allows the user to enter these states (asymptote between points is intentionally allowed) —
they just produce no curve.

- Same x-coordinate on both points (makes `b` undefined: division by zero in the exponent formula)
- A point lying exactly on the asymptote (`y1 === c` or `y2 === c` makes the ratio `0` or `∞`)
- Points on opposite sides of the asymptote (`(y1 - c) / (y2 - c) <= 0`, so `ln(ratio)` is undefined)
- Non-finite or zero `a`/`b`

### Domain

The exponential function is defined for all real `x`. `Plot.OfX` is given no `domain` prop,
so it samples across the full visible x-range.

### Curve-Asymptote Visual Continuity

The curve uses a **y-padding NaN cutoff** to terminate the SVG path when y escapes the
visible range. In `exponential.tsx`:

```typescript
const yPadding = (yMax - yMin) * 4;
// inside Plot.OfX y={(x) => ...}:
if (y < yMin - yPadding || y > yMax + yPadding) {
    return NaN;
}
```

A `NaN` return tells Mafs to break the SVG path at that x — the curve simply ends.

**Why this works for exponential:**
The exponential curve approaches its asymptote **horizontally** — `x` extends to ±∞ while
`y` converges on the asymptote value. The curve exits the visible area off the left/right
edges. The y-padding cutoff just controls how far vertically the curve extends (away from
the asymptote) before being clipped, which is robust for all coefficient values.

**Why exponential doesn't need a dynamic domain offset (like logarithm does):**
Logarithm approaches its vertical asymptote vertically (y → ±∞ as x nears the asymptote),
so a y-padding cutoff would end the SVG path *near the asymptote itself*, causing visible
discontinuity for flatter curves. Exponential avoids that problem entirely because the
curve exits horizontally, not vertically. See logarithm.md for the dynamic-offset approach
used there.

## State Management

### `ExponentialGraphState`

```typescript
interface ExponentialGraphState {
    type: "exponential";
    coords: [Coord, Coord];    // Two curve control points
    asymptote: number;          // Y-value of the horizontal asymptote
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    hasBeenInteractedWith: boolean;
}
```

### Actions

Reuses existing action creators (no new action types):
- `actions.exponential.movePoint(index, destination)` → `MOVE_POINT`
- `actions.exponential.moveCenter(newPoint)` → `MOVE_CENTER`

### Reducer: `doMovePoint`

1. Snap destination to grid, bound to range.
2. Reject if both points would have the same x-value (degenerate coefficient computation).
3. Reject if the destination overlaps the asymptote drag handle's coord (so the handle stays
   grabbable). Handle coord is computed via `getAsymptoteHandleCoord("horizontal", range, asymptote)`.

Note: same y-values are *not* rejected for exponential (unlike logarithm).

### Reducer: `doMoveCenter`

1. Extract Y component only (vertical movement) and snap to grid.
2. Reject if the snapped position equals the current asymptote (no-op).
3. Reject if the new asymptote's drag handle would land on a point's coord. Future handle
   coord is computed via `getAsymptoteHandleCoord("horizontal", range, newY)`.

### Defaults

`getExponentialCoords()` returns default coords using normalized fractions `[0.5, 0.55]` and
`[0.75, 0.75]` (matching Grapher widget defaults), with the default asymptote at `y = 0`
(the x-axis). Both default points sit above the asymptote so the curve renders immediately.

## Decisions Log

Numbered decisions with rationale for future context.

1. **Explicit asymptote dragging** — The asymptote is user-movable (matching Grapher behavior)
   rather than derived from the control points. Gives content creators full control.

2. **Asymptote y-value is stored as a `number`, not a coord pair** — `asymptote: number`
   = the `c` coefficient directly. This eliminates stale x-coordinates and simplifies all
   downstream code (kmath, scoring, serialization).

3. **Reuse `moveCenter` action** — Instead of a new `moveAsymptote` action type, reuses the
   existing `MOVE_CENTER` action (also used by circle and logarithm graphs). Keeps the action
   surface small.

4. **Single `Plot.OfX` with full domain** — Exponential is defined everywhere, so no domain
   restriction is needed. The y-padding NaN cutoff handles visual continuity.

5. **Conditional curve rendering when no valid fit** — When the asymptote sits between the
   two points (or shares a y-value with one), `getExponentialCoefficients` returns `undefined`
   and `<Plot.OfX>` is skipped. The asymptote and points stay interactive so the user can
   recover by moving them.

6. **Direct coefficient comparison for scoring** — No canonical normalization needed because
   exponential has no periodic equivalences. `approximateDeepEqual` on `[a, b, c]` suffices.

7. **Asymptote-between-points is allowed at runtime, rejected by the editor** — The runtime
   reducer lets the user drag the asymptote anywhere, including between the two control
   points; when it's between them no exponential fits and the curve simply disappears
   (the asymptote and points stay interactive). The editor's start-coords validator, however,
   rejects this state for *initial* coords (see `interactive-graph-editor.tsx` `validate()`
   block) — content can only be authored with a valid configuration, but the learner can
   transiently enter the no-fit state while interacting.

8. **Same-x rejected; same-y allowed** — Only same x-values make the coefficient computation
   degenerate (`b = ln(ratio) / 0`). Same y-values are geometrically valid for exponential
   (e.g. two points equally distant from the asymptote on different sides — though that
   produces no fit for a different reason). This differs from logarithm, where both same-x
   and same-y are rejected at the reducer level.

9. **Handle-box HTML hitbox for touch drag (LEMS-4353)** — Pointer/touch dragging goes through
   an HTML `<div>` hitbox — a box centered on the pill handle (`HANDLE_HITBOX_SIZE_PX`), portaled
   into the graph's overlay layer via the shared `useHitbox` primitive
   (`graphs/components/hitbox.tsx`) — not the SVG line. Safari ignores `touch-action` on SVG
   elements, so a real-HTML hitbox with `touch-action: none` is the only reliable way to capture
   the drag while letting the page scroll over the rest of the graph. Keyboard dragging stays on
   the focusable SVG `<g role="button">` (a second `useDraggable`). The transparent full-line
   `SVGLine` is kept as the visual hit affordance but no longer carries a pointer gesture, so
   touches along the line away from the handle fall through to page scroll. The pill handle
   provides the visual affordance.

10. **Y-padding NaN cutoff for curve termination** — Uses a fixed `4 × (yMax - yMin)` padding
    multiplier. This works for exponential because the curve exits horizontally off the
    visible area; the y-padding only controls how far vertically the SVG path extends. A
    dynamic domain offset (used by logarithm) is unnecessary here.
    See [Curve-Asymptote Visual Continuity](#curve-asymptote-visual-continuity).

11. **Localized focus ring on drag handle** — Focus ring appears around the drag handle pill
    (not the full asymptote line), consistent with how movable points display focus.

12. **Point-on-handle is the only forbidden overlap** — Points can sit anywhere within the
    graph range; the only constraint is that a point's coord cannot equal the asymptote
    drag handle's coord (a single point in graph-space at the midpoint of the x-range, on
    the asymptote y-value). This keeps the handle grabbable while letting the rest of the
    graph be a valid landing surface for points. The same rule mirrors in reverse for
    asymptote moves.

13. **Bounded keyboard skip retry** — Both the point-keyboard predicate and the asymptote
    keyboard constraint cap their direction-of-travel skip at 3 snap steps. With at most 2
    curve points blocking, 3 is always sufficient to find a valid position; if none is
    found, the element stays put.

14. **Drag handle retains focus after drag** — Matches movable point behavior. Focus clears
    only when the user clicks elsewhere or navigates away via keyboard.

15. **Curve renders between asymptote lines and drag handle** — `Plot.OfX` is rendered as
    `children` of `MovableAsymptote`, placing it between the asymptote lines (white backing +
    dashed blue) and the drag handle in the SVG DOM. This ensures the curve is visible where
    it approaches the asymptote (not hidden behind the white backing line) while keeping the
    drag handle visually above the curve. The curve has `pointerEvents: "none"` so it does
    not intercept pointer events meant for the asymptote (the touch/pointer hit target is now
    the handle-box HTML overlay, not the SVG line underneath).

16. **CSS modules (not Aphrodite)** — All component styling uses `.module.css` files with class
    names, following the project convention.

## Comparison with Other Graph Types

### vs. Logarithm

| Aspect | Exponential | Logarithm |
|--------|-------------|-----------|
| Formula | `a * e^(b*x) + c` | `a * ln(b*x + c)` |
| Asymptote | Horizontal (y-value) | Vertical (x-value) |
| Asymptote movement | Vertical only | Horizontal only |
| Drag handle orientation | Horizontal | Vertical |
| Point degeneracy | Same x-values rejected | Same x-values **and** same y-values rejected |
| No-curve-fits state | Asymptote between point y-values, or point on asymptote | Asymptote between point x-values, or point on asymptote |
| Coefficient computation | Direct from points + asymptote | Inverse of exponential (flip coords, compute, invert) |
| Curve continuity approach | Y-padding NaN cutoff | Dynamic domain offset |
| Domain | Full `[xMin, xMax]` | Restricted to one side of the asymptote |

### vs. Tangent

| Aspect | Tangent | Exponential |
|--------|---------|-------------|
| Formula | `a * tan(b*x - c) + d` | `a * e^(b*x) + c` |
| Coefficients | 4 | 3 |
| Interactive elements | 2 points | 2 points + 1 draggable asymptote |
| Asymptotes | Multiple (periodic, computed) | Single horizontal (user-movable) |
| Domain restriction | Undefined at each asymptote | Defined everywhere |
| Rendering | Segment splitting (multiple `Plot.OfX`) | Single `Plot.OfX` with NaN cutoff |
| Canonical normalization | Yes | No |

### vs. Sinusoid

| Aspect | Sinusoid | Exponential |
|--------|----------|-------------|
| Control points | 2 points | 2 points + 1 asymptote |
| Asymptotes | None | Single horizontal (draggable) |
| Domain | All real numbers | All real numbers |
| Reducer actions | `movePoint` | `movePoint` + `moveCenter` |

## Legacy Reference: Grapher Widget

The Grapher widget has a complete exponential implementation that served as the mathematical
reference:

- `packages/perseus-core/src/utils/grapher-util.ts` — `Exponential` object with coefficient
  computation, evaluation, equation string, asymptote constraints, and default coordinates.
- `packages/perseus-core/src/utils/grapher-types.ts` — `ExponentialType` extends
  `SharedGrapherType` and `AsymptoticGraphsType`.
- `packages/perseus-core/src/data-schema.ts` — Grapher `exponential` answer type.
- `packages/perseus/src/widgets/grapher/grapher.testdata.ts` — `exponentialQuestion` test data.

## Visual Regression Testing

A dedicated stories file (`interactive-graph-asymptote-regression.stories.tsx`) covers all drag
handle visual states for both exponential and logarithm graphs. Located at
"Widgets/Interactive Graph/Visual Regression Tests/Asymptote Drag Handle" in Storybook.
Stories use `play` functions to programmatically focus elements, making states visible in both
the Storybook UI and Chromatic snapshots. Follows the radio widget interaction regression pattern
(`tags: ["!autodocs"]`).
