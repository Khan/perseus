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
  - Points right of asymptote → domain `[asymptoteX + 1e-8, xMax]`
  - Points left of asymptote → domain `[xMin, asymptoteX - 1e-8]`
- The curve never visually touches or intersects the asymptote — the domain offset (`1e-8`)
  ensures the first sampled y-value is always far off-screen, so the curve appears to enter
  continuously from the edge of the visible area. Unlike exponential (which uses a y-padding
  NaN cutoff), logarithm relies on the domain offset because the curve exits the visible area
  **vertically** — a y-padding cutoff would end the SVG path near the asymptote, causing a
  visible discontinuity for flatter curves (see [Curve-Asymptote Visual Continuity](#curve-asymptote-visual-continuity)).
- During transient invalid states (e.g. mid-drag), `coeffRef` provides the last valid
  coefficients so the curve doesn't break.
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
- The drag handle retains focus after a mouse drag ends, matching movable point behavior.
  Focus clears only when the user clicks elsewhere or navigates away via keyboard.

### Asymptote Drag Behavior

- The asymptote is constrained to horizontal movement only (Y component ignored).
- The asymptote snaps to the grid.
- The asymptote cannot land on either point's x-coordinate.
- **Snap-through logic:** When the asymptote would land between or on the curve points, it
  snaps past all points to the other side (one `snapStep` beyond the nearest extreme point
  in the drag direction).
- **Direction detection:** Uses the requested mouse position relative to the midpoint between
  the two curve points (prevents oscillation/flicker from state changes between frames).
- When the asymptote crosses to the other side of both points, the curve flips direction.

### Point Behavior

- Two movable control points define the curve shape along with the asymptote.
- Points cannot be placed on the asymptote line (`point.x !== asymptoteX`).
- Both points must have different y-values (prevents degenerate coefficient computation).
- **Cross-asymptote reflection:** When a point is dragged across the asymptote, the other
  point is automatically reflected across (`reflectedX = 2 * asymptoteX - otherX`) so both
  points end up on the same side. A post-reflection guard rejects the move if the reflected
  point would share the same x-coordinate as the moved point.
- Invalid moves are rejected gracefully (no crash, no invalid state).

### Keyboard Navigation

- **Points:** Arrow keys move by snap step. A unified `isValidPosition()` check enforces
  asymptote and same-y rules with bounded retry (max 3 steps in the move direction). If no
  valid position exists within 3 steps, the point stays in place.
- **Asymptote:** Arrow keys move horizontally by snap step. `constrainAsymptoteKeyboard()`
  applies the same snap-through logic as mouse drag — when the snapped position would land
  between or on points, it snaps past all points using the midpoint heuristic.

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
- `aria-live="polite"` on the asymptote announces position changes to screen readers.
- All number values use `srFormatNumber` for locale-appropriate formatting.

### Editor

- "Logarithm function" appears in the graph type selector, gated by `interactive-graph-logarithm` feature flag.
- `StartCoordsLogarithm` component provides: two coordinate pair inputs, a single number
  input for asymptote x-position, and equation display showing `y = a * ln(b*x + c)`.
- Start asymptote validation: the asymptote x-value cannot fall between or on the x-coordinates
  of the curve's start points (mirrors exponential's y-axis validation but for x-axis).
- CSS module styling (not Aphrodite), following `start-coords-exponential.module.css` pattern.

### Mobile

- All interactions (drag points, drag asymptote) work via touch.
- The 44px transparent hit target on the asymptote ensures adequate touch target size.

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

### Validation Guards (returns `undefined` for invalid inputs)

- Same y-coordinate on both points (makes `bExp` undefined)
- A point lying on the asymptote
- Points on opposite sides of the asymptote
- Non-finite or zero intermediate results

### Domain Restriction

The vertical asymptote occurs where `b * x + c = 0`, i.e. `x = -c / b`. The curve is only
defined on one side. The `domain` prop on `Plot.OfX` restricts rendering:
- `[asymptoteX + 1e-8, xMax]` if points are right of asymptote
- `[xMin, asymptoteX - 1e-8]` if points are left of asymptote

### Curve-Asymptote Visual Continuity

The domain offset (`1e-8`) is what ensures the curve looks continuous as it approaches the
asymptote. This is fundamentally different from exponential, which uses a y-padding NaN cutoff.

**Why logarithm can't use a y-padding cutoff (like exponential does):**
The logarithm curve approaches the asymptote **vertically** — y goes to ±∞ as x nears the
asymptote. A y-padding cutoff ends the SVG path where y exceeds the threshold, which is
*near the asymptote* — the exact area where continuity matters. Mafs samples x-values at
regular intervals across the domain, so for a flat curve (e.g. coords `[[1,3],[5,5]]`),
the first sampled x where y falls within the cutoff can be visibly far from the asymptote,
creating a visible discontinuity. This was observed with multipliers `2×`, `4×`, and `10×`.

**Why the domain offset works:**
By starting the domain extremely close to the asymptote (`1e-8` graph units away), the
first sampled y-value is always far off-screen (e.g. ≈ -20 for a [-10,10] graph). The
curve's SVG path begins well beyond the visible edge and enters the graph smoothly.

**Why exponential doesn't need this:**
The exponential curve approaches the asymptote **horizontally** — x goes to ±∞ while y
converges on the asymptote. The curve exits the visible area off the left/right edges,
and the y-padding cutoff controls how far the curve extends vertically (away from the
asymptote), which works well.

**Why `1e-8` specifically:**
The offset must be small enough that even the flattest reasonable logarithm curve produces
a y-value well off-screen. Example: for coords `[[1,3],[5,5]]` with asymptote at x=0
(a ≈ 1.243, b ≈ 11.18), at `x = 0.0001` y ≈ -8.45 (still visible in a [-10,10] graph),
but at `x = 1e-8` y ≈ -19.9 (safely off-screen). The value `1e-8` is well within
double-precision range and produces reasonable SVG coordinates.

Alternatives evaluated and rejected:

| Approach | Issue |
|----------|-------|
| Large domain offset (`0.1`, `0.001`, `0.0001`) | Flat curves start visibly inside the graph |
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
2. Reject if point lands on asymptote x-coordinate.
3. Reject if both points would have the same y-value.
4. If point crosses asymptote: reflect the other point across (`reflectedX = 2 * asymptoteX - otherX`).
5. Post-reflection guard: reject if reflected point collides with moved point's x-coordinate.

### Reducer: `doMoveCenter`

1. Extract X component only (horizontal movement).
2. Snap to grid.
3. If new position is between or on the curve points: snap past all points to the other side.
4. Direction determined by comparing requested position to midpoint between curve points.

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

4. **Ref-based coefficient caching** — `coeffRef` stores last valid coefficients as fallback
   during transient invalid states. Same pattern as tangent and sinusoid.

5. **Direct coefficient comparison for scoring** — No canonical normalization needed because
   logarithm has no periodic equivalences. `approximateDeepEqual` on `{a, b, c}` suffices.

6. **Midpoint-based snap-through** — Snap direction uses the midpoint between curve points
   (not the previous asymptote position) to prevent oscillation when state changes between frames.

7. **Full-line draggable asymptote** — Uses `useDraggable` + `SVGLine` pattern from `MovableLine`,
   making the entire line interactive. A pill-shaped handle provides visual affordance.

8. **NaN cutoff for curve-asymptote visual gap** — Returns `NaN` (not clamp) when y exceeds
   visible range with padding. This causes Mafs to end the SVG path naturally. Chosen after
   evaluating alternatives (see [Curve-Asymptote Visual Gap](#curve-asymptote-visual-gap)).

9. **Localized focus ring on drag handle** — Focus ring appears around the drag handle pill
   (not the full asymptote line), consistent with how movable points display focus.

10. **Point cross-asymptote reflection** — When a point crosses the asymptote, the other point
    is reflected to the same side. Matches Grapher behavior. Replaced the earlier approach of
    rejecting cross-asymptote moves.

11. **Bounded keyboard constraint retry** — Unified `isValidPosition()` check inside a bounded
    loop (max 3 steps). Prevents infinite-loop risk and ensures the point stays put if no valid
    position exists.

12. **Drag handle retains focus after drag** — Matches movable point behavior. Auto-blur on drag
    end was implemented and reverted for consistency (see Post-Implementation Fixes).

13. **Curve renders behind drag handle** — `Plot.OfX` is rendered before `MovableAsymptote` in
    the SVG DOM so the drag handle is visually above the curve. This prevents the curve from
    blocking interaction with or obscuring the drag handle.

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
| Point constraint | Same x-values rejected | Same y-values rejected |
| Cross-asymptote reflection | Y-axis reflection | X-axis reflection |
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
