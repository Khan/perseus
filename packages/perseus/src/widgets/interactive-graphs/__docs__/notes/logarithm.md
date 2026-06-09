# Logarithm Graph — Technical Reference

Technical specification for the logarithm graph type in the Interactive Graph widget.
This document defines expected behavior, architecture, and design decisions. It is intended
as context for future development and Claude Code sessions.

## Traceability

- **Ticket:** [LEMS-3950](https://khanacademy.atlassian.net/browse/LEMS-3950)
- **POC:** https://github.com/Khan/perseus/pull/3322
- **Technical research revision:** [7e377d631900c46f5d6d4b993d1d9238a942575a](https://github.com/Khan/perseus/blob/7e377d631900c46f5d6d4b993d1d9238a942575a/packages/perseus/src/widgets/interactive-graphs/__docs__/notes/logarithm.md)

## Architecture Overview

### File Map

| File | Purpose |
|------|---------|
| `graphs/logarithm.tsx` | Main rendering component: curve, asymptote, points, SR descriptions |
| `graphs/components/movable-asymptote.tsx` | Reusable draggable asymptote line (shared with exponential) |
| `graphs/components/asymptote-drag-handle.tsx` | Pill-shaped SVG drag handle (shared with exponential) |
| `reducer/interactive-graph-reducer.ts` | `doMovePoint` and `doMoveCenter` cases for logarithm |
| `reducer/initialize-graph-state.ts` | `getLogarithmCoords()` — default coords and asymptote |
| `reducer/interactive-graph-state.ts` | `getGradableGraph` serialization for logarithm |
| `mafs-state-to-interactive-graph.ts` | Logarithm state → persisted data conversion |
| `types.ts` | `LogarithmGraphState` (coords + asymptote + snapStep) |
| `interactive-graph.tsx` | `getLogarithmEquationString()`, `defaultLogarithmCoords()` |
| `interactive-graph-question-builder.ts` | `withLogarithm()` test helper |
| `interactive-graph.testdata.ts` | `logarithmQuestion` fixture |
| `@khanacademy/kmath` `coefficients.ts` | `getLogarithmCoefficients()` — shared math utility |
| `@khanacademy/perseus-core` `data-schema.ts` | `PerseusGraphTypeLogarithm`, `LogarithmGraphCorrect` |
| `@khanacademy/perseus-score` `score-interactive-graph.ts` | Logarithm scoring block |
| `@khanacademy/perseus-editor` `start-coords-logarithm.tsx` | Editor start coords UI |
| `__docs__/interactive-graph-asymptote-regression.stories.tsx` | Drag handle visual regression stories (shared with exponential) |

### Data Flow

```
User interaction (drag/keyboard)
  → Dispatch action (movePoint / moveCenter)
  → Reducer applies constraints, updates LogarithmGraphState
  → LogarithmGraph component re-renders:
      1. Computes coefficients from coords + asymptote (getLogarithmCoefficients)
      2. Renders Plot.OfX with domain restriction
      3. Renders MovableAsymptote with drag handle
      4. Renders MovablePoints
  → On submit: getGradableGraph extracts coords + asymptote
  → Scoring: coefficient comparison via approximateDeepEqual
```

## Expected Behavior

### Curve Rendering

- The curve renders `f(x) = a * ln(b * x + c)` using a single `<Plot.OfX>`.
- The curve is only drawn on the side of the asymptote where the points are:
  - Points right of asymptote → domain `[asymptoteX + offset, xMax]`
  - Points left of asymptote → domain `[xMin, asymptoteX - offset]`
  - The offset is **computed dynamically** from the current coefficients (see
    [Curve-Asymptote Visual Continuity](#curve-asymptote-visual-continuity)).
- The curve never visually touches or intersects the asymptote — the dynamic domain offset
  ensures the first sampled y-value is always off-screen (`yMin - 2` or `yMax + 2`), so the
  curve appears to enter continuously from the edge of the visible area. Unlike exponential
  (which uses a y-padding NaN cutoff), logarithm relies on the domain offset because the
  curve exits the visible area **vertically** — a y-padding cutoff would end the SVG path
  near the asymptote, causing a visible discontinuity for flatter curves.
- When the asymptote sits between the two points, no logarithm fits — `getLogarithmCoefficients`
  returns `undefined` and the `<Plot.OfX>` is not rendered. The asymptote and points remain
  fully interactive in this state, so the user can recover by dragging anything back to a
  valid configuration.
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
applies to the exponential graph.

### Asymptote Rendering

- The asymptote is a full-height vertical **dashed** line using `MovableAsymptote` with `orientation="vertical"`.
- The line is rendered as two stacked SVG lines: a solid white backing line (so dashes are
  visible on grid lines and axes) and a dashed blue line on top with rounded ends (`stroke-linecap: round`).
- **Resting state**: stroke weight 2px, dash length 6, gap 8.
- **Hover/focus/drag state**: stroke weight 4px, dash length 8, gap 12.
- These are controlled by CSS variables `--movable-asymptote-stroke-weight`,
  `--movable-asymptote-dash-length`, and `--movable-asymptote-dash-gap` in `mafs-styles.css`,
  activated via `:hover`, `:focus-visible`, and `.movable-dragging` selectors.
- The entire line is draggable (not just the handle) via a transparent 44px-wide SVG hit target.
- A pill-shaped drag handle (`AsymptoteDragHandle`) is rendered at the midpoint:
  - **Active state** (hovered, focused, or dragging): 12px × 22px pill with 6 white grip dots (2×3 grid)
  - **Inactive state** (default): 6px × 16px pill, no grip dots
  - **Focus ring** (keyboard focus only): rounded outline around the handle (not the full line)
- When a drag starts (pointer or touch), the asymptote group programmatically focuses
  itself, mirroring `useControlPoint`'s behavior for movable points. This blurs whatever
  was previously focused (e.g. a movable point), so the focus indicator follows the
  element the user is currently interacting with.
- The drag handle retains focus after a mouse drag ends, matching movable point behavior.
  Focus clears only when the user clicks elsewhere or navigates away via keyboard.

### Asymptote Drag Behavior

- The asymptote is constrained to horizontal movement only (Y component ignored).
- The asymptote snaps to the grid.
- The asymptote may be dragged to any x-position, including between the two curve points.
  When between the points, no valid logarithm fits and the curve disappears (the asymptote
  and points remain interactive).
- The asymptote cannot land such that its drag handle (a pill at the y-midpoint of the range,
  on the asymptote line) would overlap a curve point's coord. This guarantees the handle is
  always grabbable. Built from `getAsymptoteHandleCoord("vertical", range, asymptote)`.

### Point Behavior

- Two movable control points define the curve shape along with the asymptote.
- Points may be placed anywhere along the asymptote line. The only forbidden position is the
  exact coord of the asymptote drag handle (so the handle stays grabbable).
- Both points must have different x-values and different y-values (either case is degenerate
  for the coefficient computation).
- Invalid moves are rejected gracefully (no crash, no invalid state).

### Keyboard Navigation

- **Points:** Arrow keys move by snap step. The shared `getAsymptoteGraphKeyboardConstraint`
  helper applies an `isValidPosition()` predicate that rejects same-x or same-y collisions
  with the other point and rejects landing on the asymptote drag handle's coord. If a step
  lands on a forbidden position, the constraint retries up to 3 snap steps in the same
  direction. If no valid position exists within 3 steps, the point stays in place.
- **Asymptote:** Arrow keys move horizontally by snap step. `skipAsymptoteKeyboardOverPoint`
  snaps the proposed point to the grid (required by `useDraggable`'s function-form
  constraint), then if the snapped position would put the handle on a point's coord, it
  steps further in the direction of travel until it finds a valid position (up to 3 extra
  snap steps).

### Scoring

- Coefficients `{a, b, c}` are computed for both user answer and rubric using
  `getLogarithmCoefficients()`.
- Comparison uses `approximateDeepEqual` on the coefficient objects.
- No canonical normalization needed (logarithm has no periodic equivalences).
- Two different sets of control points that produce the same curve score as correct.
- Returns `invalid` if coords or asymptote are missing, or coefficient computation fails.

### Accessibility

- `aria-label` on the graph container (`srLogarithmGraph`).
- Localized labels for each point (`srLogarithmPoint1`, `srLogarithmPoint2`).
- Localized asymptote label (`srLogarithmAsymptote`) with keyboard navigation instructions.
- Graph description (`srLogarithmDescription`) with point and asymptote positions.
- Interactive elements description (`srLogarithmInteractiveElements`).
- Asymptote and point moves are announced to screen readers via the WB Announcer (the reducer's `stateAnnouncement`), consumed in `stateful-mafs-graph.tsx`.
- All number values use `srFormatNumber` for locale-appropriate formatting.

### Editor

- "Logarithm function" appears in the graph type selector, gated by `interactive-graph-logarithm` feature flag.
- `StartCoordsLogarithm` component provides: two coordinate pair inputs, a single number
  input for asymptote x-position, and equation display showing `y = a * ln(b*x + c)`.
- CSS module styling (not Aphrodite), following `start-coords-exponential.module.css` pattern.

### Mobile

- All interactions (drag points, drag asymptote) work via touch.
- The 44px transparent hit target on the asymptote ensures adequate touch target size.
- Focus follows the dragged element on touch as well as pointer drags. Touch input
  doesn't move DOM focus the way a click does, so both `MovableAsymptote` and
  `useControlPoint` programmatically focus their group on drag start. Without this
  the previously focused element (e.g. a movable point) would keep its focus ring
  while the user dragged the asymptote.

## Mathematical Model

### Formula

```
f(x) = a * ln(b * x + c)
```

Where `[a, b, c]` are 3 coefficients derived from 2 movable points and 1 vertical asymptote.

### Coefficient Computation (Inverse Exponential)

1. Flip each coordinate `(x, y)` → `(y, x)` for both points
2. Use the asymptote x-position as the flipped exponential's c coefficient (`cExp = asymptoteX`)
3. Compute exponential coefficients from the flipped coordinates:
    - `bExp = ln((p1_flipped[1] - cExp) / (p2_flipped[1] - cExp)) / (p1_flipped[0] - p2_flipped[0])`
    - `aExp = (p1_flipped[1] - cExp) / e^(bExp * p1_flipped[0])`
4. Invert the exponential coefficients to get logarithm coefficients:
    - `a = 1 / bExp`
    - `b = 1 / aExp`
    - `c = -cExp / aExp`

### When `getLogarithmCoefficients` returns `undefined`

These are the cases where no logarithm fits and the renderer skips `<Plot.OfX>`. The widget
allows the user to enter these states (asymptote between points is intentionally allowed) —
they just produce no curve.

- Same y-coordinate on both points (makes `bExp` undefined)
- A point lying on the asymptote
- Points on opposite sides of the asymptote
- Non-finite or zero intermediate results

### Domain Restriction

The vertical asymptote occurs where `b * x + c = 0`, i.e. `x = -c / b`. The curve is only
defined on one side. The `domain` prop on `Plot.OfX` restricts rendering:
- `[asymptoteX + offset, xMax]` if points are right of asymptote
- `[xMin, asymptoteX - offset]` if points are left of asymptote

### Curve-Asymptote Visual Continuity

The domain offset is **computed dynamically** from the current coefficients to ensure the
curve always starts off-screen. This is fundamentally different from exponential, which uses
a y-padding NaN cutoff.

**How the dynamic offset is computed:**
For `f(x) = a * ln(b*x + c)`, we solve for the x where the curve reaches a target y-value
safely beyond the visible range (`yMin - 2` if a > 0, `yMax + 2` if a < 0):
```
x = (e^(targetY / a) - c) / b
offset = |x - asymptoteX|
```
Falls back to `1e-8` if the computation produces a non-finite or non-positive result.

**Why logarithm can't use a y-padding cutoff (like exponential does):**
The logarithm curve approaches the asymptote **vertically** — y goes to ±∞ as x nears the
asymptote. A y-padding cutoff ends the SVG path where y exceeds the threshold, which is
*near the asymptote* — the exact area where continuity matters. Mafs samples x-values at
regular intervals across the domain, so for a flat curve the first sampled x where y falls
within the cutoff can be visibly far from the asymptote, creating a visible discontinuity.

**Why a fixed offset doesn't work:**
The required offset depends on the curve's coefficients. For `y = a * ln(b*x + c)`, the
y-value at a given x near the asymptote is `≈ a * (ln(b) + ln(offset))`. When `a` is small
(flat curve), even a very small offset can yield a y-value inside the visible range. Examples:
- coords `[[1,1],[9,2]]` (a≈0.455): at x=1e-8, y ≈ -7.38 — **visible** in [-10,10]
- coords `[[1,3],[5,5]]` (a≈1.243): at x=0.0001, y ≈ -8.45 — **visible** in [-10,10]
The dynamic computation handles all coefficient values correctly.

**Why exponential doesn't need this:**
The exponential curve approaches the asymptote **horizontally** — x goes to ±∞ while y
converges on the asymptote. The curve exits the visible area off the left/right edges,
and the y-padding cutoff controls how far the curve extends vertically (away from the
asymptote), which works well.

Alternatives evaluated and rejected:

| Approach | Issue |
|----------|-------|
| Fixed domain offset (`0.1`–`1e-8`) | Fails for sufficiently flat curves (small `a`) |
| Y-padding NaN cutoff (`2×`–`10×`) | Ends SVG path near asymptote; visible for flat curves |
| Y-value clamping (cap at yMin/yMax) | SVG stroke width causes visual overlap at boundary |
| Pixel-to-graph-unit stroke calculation | Overly complex, didn't account for curve curvature |

## State Management

### `LogarithmGraphState`

```typescript
interface LogarithmGraphState {
    type: "logarithm";
    coords: [Coord, Coord];    // Two curve control points
    asymptote: number;          // X-value of the vertical asymptote
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    hasBeenInteractedWith: boolean;
}
```

### Actions

Reuses existing action creators (no new action types):
- `actions.logarithm.movePoint(index, destination)` → `MOVE_POINT`
- `actions.logarithm.moveCenter(newPoint)` → `MOVE_CENTER`

### Reducer: `doMovePoint`

1. Snap destination to grid, bound to range.
2. Reject if both points would have the same x-value (degenerate coefficient computation).
3. Reject if both points would have the same y-value (degenerate coefficient computation).
4. Reject if the destination overlaps the asymptote drag handle's coord (so the handle stays
   grabbable). Handle coord is computed via `getAsymptoteHandleCoord("vertical", range, asymptote)`.

### Reducer: `doMoveCenter`

1. Extract X component only (horizontal movement) and snap to grid.
2. Reject if the snapped position equals the current asymptote (no-op).
3. Reject if the new asymptote's drag handle would land on a point's coord. Future handle
   coord is computed via `getAsymptoteHandleCoord("vertical", range, newX)`.

### Defaults

`getLogarithmCoords()` returns default coords using normalized fractions `[0.55, 0.55]` and
`[0.75, 0.75]` to ensure both points are to the right of the default asymptote at x=0
(x=0.5 would land exactly on the asymptote after normalization).

## Decisions Log

Numbered decisions with rationale for future context.

1. **Explicit asymptote dragging** — The asymptote is user-movable (matching Grapher behavior)
   rather than derived from the control points. Gives content creators full control.

2. **Reuse `moveCenter` action** — Instead of a new `moveAsymptote` action type, reuses the
   existing `MOVE_CENTER` action (also used by circle and exponential graphs). Keeps the action
   surface small.

3. **Single `Plot.OfX` with domain restriction** — Unlike tangent (which needs segment splitting
   for multiple periodic asymptotes), logarithm has one asymptote and the function is defined on
   only one side. No discontinuity workaround needed.

4. **Conditional curve rendering when no valid fit** — When the asymptote sits between the
   two points (or shares a coord with one), `getLogarithmCoefficients` returns `undefined`
   and `<Plot.OfX>` is skipped. The asymptote and points stay interactive so the user can
   recover by moving them. This replaces an earlier ref-based caching approach that would
   keep showing a stale curve in invalid states.

5. **Direct coefficient comparison for scoring** — No canonical normalization needed because
   logarithm has no periodic equivalences. `approximateDeepEqual` on `{a, b, c}` suffices.

6. **Asymptote-between-points is allowed** — The asymptote can be dragged anywhere along its
   axis, including between the two control points. Content authors requested this state
   because it improves the usability of authoring questions about the asymptote. When the
   asymptote is between the points there is no real exponential/logarithm fit, so the curve
   simply disappears.

7. **Full-line draggable asymptote** — Uses `useDraggable` + `SVGLine` pattern from `MovableLine`,
   making the entire line interactive. A pill-shaped handle provides visual affordance.

8. **Dynamic domain offset for curve-asymptote visual continuity** — The domain offset is
   computed from the current coefficients by solving for the x where y reaches a target
   safely beyond the visible range. This ensures the SVG path always starts off-screen,
   regardless of curve flatness. A y-padding NaN cutoff (used by exponential) was rejected
   for logarithm because the curve exits vertically — the cutoff would end the path near
   the asymptote. See [Curve-Asymptote Visual Continuity](#curve-asymptote-visual-continuity).

9. **Localized focus ring on drag handle** — Focus ring appears around the drag handle pill
   (not the full asymptote line), consistent with how movable points display focus.

10. **Point-on-handle is the only forbidden overlap** — Points can sit anywhere along the
    asymptote line; the only constraint is that a point's coord cannot equal the asymptote
    drag handle's coord (a single point in graph-space at the midpoint of the y-range, on
    the asymptote x-value). This keeps the handle grabbable while letting the rest of the
    asymptote line be a valid landing surface for points. The same rule mirrors in reverse
    for asymptote moves.

11. **Bounded keyboard skip retry** — Both the point-keyboard predicate and the asymptote
    keyboard constraint cap their direction-of-travel skip at 3 snap steps. With at most 2
    curve points blocking, 3 is always sufficient to find a valid position; if none is
    found, the element stays put.

12. **Drag handle retains focus after drag** — Matches movable point behavior. Auto-blur on drag
    end was implemented and reverted for consistency (see Post-Implementation Fixes).

    **Drag start moves focus to the asymptote** — Complementary to the above: when a drag
    starts (pointer or touch), `MovableAsymptote` programmatically focuses its group via a
    `useLayoutEffect` keyed on `dragging`. This mirrors the same pattern in `useControlPoint`
    and ensures focus follows the element the user is interacting with, including on mobile
    where touch input does not naturally shift DOM focus. Without this, a previously focused
    movable point would keep its focus ring during an asymptote drag.

13. **Curve renders between asymptote lines and drag handle** — `Plot.OfX` is rendered as
    `children` of `MovableAsymptote`, placing it between the asymptote lines (white backing +
    dashed blue) and the drag handle in the SVG DOM. This ensures the curve is visible where
    it approaches the asymptote (not hidden behind the white backing line) while keeping the
    drag handle visually above the curve. The curve has `pointerEvents: "none"` so it does
    not intercept events meant for the asymptote's hit target underneath.

14. **CSS modules (not Aphrodite)** — All component styling uses `.module.css` files with class
    names, following the project convention.

## Comparison with Other Graph Types

### vs. Tangent

| Aspect | Tangent | Logarithm |
|--------|---------|-----------|
| Formula | `a * tan(b*x - c) + d` | `a * ln(b*x + c)` |
| Coefficients | 4 | 3 |
| Interactive elements | 2 points | 2 points + 1 draggable asymptote |
| Asymptotes | Multiple (periodic, computed) | Single vertical (user-movable) |
| Domain restriction | Undefined at each asymptote | Undefined on one side |
| Rendering | Segment splitting (multiple `Plot.OfX`) | Single `Plot.OfX` with `domain` prop |
| Canonical normalization | Yes | No |

### vs. Exponential

| Aspect | Exponential | Logarithm |
|--------|-------------|-----------|
| Formula | `a * e^(b*x) + c` | `a * ln(b*x + c)` |
| Asymptote | Horizontal (y-value) | Vertical (x-value) |
| Asymptote movement | Vertical only | Horizontal only |
| Drag handle orientation | Horizontal | Vertical |
| Point degeneracy | Same x-values rejected | Same x-values **and** same y-values rejected |
| No-curve-fits state | Asymptote between point y-values | Asymptote between point x-values |
| Coefficient relationship | Inverse of logarithm | Inverse of exponential |

### vs. Sinusoid

| Aspect | Sinusoid | Logarithm |
|--------|----------|-----------|
| Control points | 2 points | 2 points + 1 asymptote |
| Asymptotes | None | Single vertical (draggable) |
| Domain | All real numbers | Restricted by asymptote |
| Reducer actions | `movePoint` | `movePoint` + `moveCenter` |

## Legacy Reference: Grapher Widget

The Grapher widget has a complete logarithm implementation that served as the mathematical reference:

- `packages/perseus-core/src/utils/grapher-util.ts` (lines 449–558) — `Logarithm` object
  with coefficient computation, evaluation, equation string, asymptote constraints,
  reflection support (`allowReflectOverAsymptote: true`), and default coordinates.
- `packages/perseus-core/src/utils/grapher-types.ts` (lines 71–74) — `LogarithmType` extends
  `SharedGrapherType` and `AsymptoticGraphsType`.
- `packages/perseus-core/src/data-schema.ts` (lines 598–606) — Grapher `logarithm` answer type.
- `packages/perseus/src/widgets/grapher/grapher.testdata.ts` (lines 162–214) — `logarithmQuestion`
  test data (`y = 4 * log_2(x + 6) - 7`, asymptote `x = -6`).

## Visual Regression Testing

A dedicated stories file (`interactive-graph-asymptote-regression.stories.tsx`) covers all drag
handle visual states for both logarithm and exponential graphs. Located at
"Widgets/Interactive Graph/Visual Regression Tests/Asymptote Drag Handle" in Storybook.
Stories use `play` functions to programmatically focus elements, making states visible in both
the Storybook UI and Chromatic snapshots. Follows the radio widget interaction regression pattern
(`tags: ["!autodocs"]`).
