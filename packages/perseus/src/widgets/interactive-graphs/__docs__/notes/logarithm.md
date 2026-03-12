# Logarithm Graph - Interactive Graph Widget

## Overview

Research and POC for adding logarithm graph support to the Interactive Graph widget,
allowing content creators to define logarithm function exercises using two movable points
and a movable vertical asymptote.

- **Ticket:** [LEMS-3950](https://khanacademy.atlassian.net/browse/LEMS-3950)
- **POC:** https://github.com/Khan/perseus/pull/3322
- **Branch:** `LEMS-3950/poc-logarithm-interactive-graph`

## Scenarios

### Learner: Interacting with a Logarithm Graph

> As a learner working on logarithmic function problems,
> I want to interact with a logarithmic graph by dragging it, adjusting its base, vertical stretch, and asymptote,
> So that I can visually construct the correct logarithmic function and check my answer.

- A logarithmic graph renders in the Interactive Graph widget using two movable control points and a draggable vertical asymptote
- The curve updates in real time as the user drags either control point or the asymptote
- The graph correctly renders `f(x) = a * ln(b * x + c)` based on point and asymptote positions
- The vertical asymptote is visually displayed as a solid line with a pill-shaped drag handle
- The drag handle shows an active state (larger pill with grip dots) on hover, focus, or drag, and an inactive state (smaller pill, no dots) otherwise
- The entire asymptote line is draggable (not just a single point) — constrained to horizontal movement
- The asymptote can cross to the other side of the curve points, causing the curve to flip direction
- The curve never visually touches or intersects the asymptote — it exits the visible area off-screen
- No curve is drawn on the undefined side of the asymptote (domain restriction is enforced via `Plot.OfX` `domain` prop)
- Keyboard navigation works on both control points (arrow keys move the point by snap step)
- Keyboard navigation works on the asymptote line (arrow keys move it horizontally by snap step, with the same snap-through behavior as mouse drag)
- Points cannot be placed on the asymptote line, both points must have different y-values, and points cannot cross to the other side of the asymptote — invalid moves are rejected gracefully (no crash, no invalid state)
- Keyboard constraints enforce all three point validation rules (asymptote, same-y, same-side) with bounded retry (max 3 steps) and fallback to staying in place
- The graph is scorable — the correct answer is compared using coefficient comparison with `approximateDeepEqual`
- Screen reader announces the graph label, point positions, and asymptote position using localized strings
- The asymptote aria-label is localized and includes keyboard navigation instructions
- Asymptote position changes are announced to screen readers via `aria-live="polite"`
- The widget renders correctly on mobile

### Content Creator: Configuring a Logarithm Graph Exercise

> As a content creator building logarithmic function exercises,
> I want to select Logarithm as an answer type in the Interactive Graph widget and configure its correct answer, starting position, and axis settings,
> So that I can create accurate and customizable logarithmic graph exercises for learners.

- "Logarithm function" appears as a selectable option in the Interactive Graph editor's answer type dropdown
- Selecting logarithm renders the logarithmic graph in the editor's correct answer preview
- The editor displays the correct equation string (derived from logarithm coefficients)
- The content creator can drag the control points and asymptote in the editor to set the correct answer
- Start coordinates are supported — the editor can configure where the points and asymptote start before the learner interacts
- Switching away from logarithm and back preserves the graph state correctly
- The editor does not crash or show TypeScript errors when logarithm is selected

## References

### Grapher Widget (Legacy Logarithm)

The Grapher widget has a complete logarithm implementation that served as the mathematical reference:

- `packages/perseus-core/src/utils/grapher-util.ts` (lines 449–558) — Full `Logarithm` object
  with coefficient computation (inverse exponential approach), function evaluation, equation string,
  asymptote constraints (`extraAsymptoteConstraint`), point constraints (`extraCoordConstraint`),
  reflection support (`allowReflectOverAsymptote: true`), and default coordinates.
- `packages/perseus-core/src/utils/grapher-types.ts` (lines 71–74) — `LogarithmType` extends
  `SharedGrapherType` and `AsymptoticGraphsType`.
- `packages/perseus-core/src/data-schema.ts` (lines 598–606) — Grapher `logarithm` answer type
  with `asymptote: [Coord, Coord]` and `coords: null | [Coord, Coord]`.
- `packages/perseus-score/src/widgets/grapher/score-grapher.ts` — Grapher scoring uses
  `coefficients` and `approximateDeepEqual` for comparison.

### Grapher Logarithm Test Data

- `packages/perseus/src/widgets/grapher/grapher.testdata.ts` (lines 162–214) — `logarithmQuestion`
  exercises `y = 4 * log_2(x + 6) - 7` with asymptote at `x = -6`, coords `[-4, -3]` and `[-5, -7]`.
- `packages/perseus/src/widgets/grapher/grapher.stories.tsx` — Storybook story rendering the
  logarithm question.

### Grapher Discontinuity Handling (Visual Reference)

The Grapher widget's `plotParametric()` function in `packages/perseus/src/util/graphie.ts`
provides the reference for how the legacy system prevents curves from visually touching asymptotes:

- Uses `plotParametric()` with a `shouldShowPoint` callback that returns `false` for points
  where `|y| > 500000`, effectively clipping the curve far from the visible area
- Detects sign flips in the function output to identify asymptote crossings
- Splits the SVG path at discontinuities (starts a new `M` command instead of `L`)

This informed our approach of returning `NaN` from the plot function when y-values exceed
the visible range (see [Curve-Asymptote Visual Gap](#curve-asymptote-visual-gap-preventing-the-curve-from-touching-the-asymptote)).

### Interactive Graph: Sinusoid (Pattern Reference)

The sinusoid graph type was the primary pattern reference for the logarithm implementation:

- `packages/perseus/src/widgets/interactive-graphs/graphs/sinusoid.tsx` — Two-point interaction model, coefficient extraction, `Plot.OfX` rendering, keyboard constraints, and screen reader descriptions. The logarithm graph mirrors this structure but adds asymptote handling.
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` — Sinusoid reducer case (movePoint action with same-x constraint). Logarithm adds analogous cases for both points and asymptote.
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` — Sinusoid state initialization pattern. Logarithm follows the same approach with additional asymptote initialization.
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `SinusoidGraphState` type. `LogarithmGraphState` follows the same shape with an added `asymptote` field.
- `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` — Sinusoid scoring block. Logarithm scoring is modeled after this but uses direct coefficient comparison (no canonical normalization).

### Interactive Graph: MovableLine (Asymptote Pattern Reference)

The `MovableLine` component provided the pattern for making the entire asymptote line draggable:

- `packages/perseus/src/widgets/interactive-graphs/graphs/components/movable-line.tsx` — Uses
  `useDraggable` hook attached to a `<g>` element containing layered SVG lines (transparent
  hit target → focus outlines → visible line). The logarithm asymptote follows the exact same
  layering approach.

### Mafs Graphing Library

- `mafs` npm package — Provides `Plot.OfX` for rendering function curves on coordinate planes.
- Unlike tangent, the logarithm does **not** need the segment-splitting discontinuity workaround. The domain is naturally one-sided, so a single `<Plot.OfX>` with a restricted `domain` prop is sufficient.

## Mathematical Model

The logarithm curve uses the form:

```
f(x) = a * ln(b * x + c)
```

Where `[a, b, c]` are 3 coefficients derived from **2 movable points** and **1 vertical asymptote**.

### Coefficient Computation (Inverse Exponential)

The coefficients are computed by treating the logarithm as the inverse of an exponential:

1. Flip each coordinate `(x, y)` → `(y, x)` for both points
2. Use the asymptote x-position as the flipped exponential's c coefficient (`cExp = asymptoteX`)
3. Compute exponential coefficients from the flipped coordinates:
   - `bExp = ln((p1_flipped[1] - cExp) / (p2_flipped[1] - cExp)) / (p1_flipped[0] - p2_flipped[0])`
   - `aExp = (p1_flipped[1] - cExp) / e^(bExp * p1_flipped[0])`
4. Invert the exponential coefficients to get logarithm coefficients:
   - `a = 1 / bExp`
   - `b = 1 / aExp`
   - `c = -cExp / aExp`

### Domain Restriction

The vertical asymptote occurs where `b * x + c = 0`, i.e. `x = -c / b`. The curve is only
defined on one side of the asymptote. The `domain` prop on `Plot.OfX` restricts rendering to:
- `[asymptoteX + 0.001, xMax]` if points are right of asymptote
- `[xMin, asymptoteX - 0.001]` if points are left of asymptote

The small offset (`0.001`) allows Mafs to sample points extremely close to the asymptote,
so the curve extends as far as possible toward it before the y-value cutoff takes effect.

This is simpler than the tangent approach (no segment splitting needed) since the logarithm
has a single asymptote and the function is defined on only one side.

## Solution Approach

### Rendering (`logarithm.tsx`)

1. Compute coefficients from the two movable point coordinates and asymptote position
2. Use `coeffRef` to cache the last valid coefficients (fallback during transient invalid states)
3. Determine which side of the asymptote the points are on
4. Render a single `<Plot.OfX>` with a restricted `domain` on the valid side
5. The plot function returns `NaN` when y-values exceed the visible range (with padding),
   causing Mafs to end the SVG path before the curve gets close enough to visually touch the asymptote
6. Render the asymptote as a fully draggable vertical line using the `useDraggable` hook
7. Render a pill-shaped drag handle at the asymptote midpoint for visual affordance

### Asymptote Rendering

The asymptote is rendered as a fully interactive vertical line, following the same pattern
as `MovableLine` in the codebase:

- A `<g>` element with `useDraggable` attached — the entire line responds to click/drag/keyboard
- A transparent wide SVG line (44px stroke) as the hit target
- A visible solid line using the interactive color
- A pill-shaped drag handle (`AsymptoteDragHandle`) at the midpoint with:
  - **Active state** (hovered, focused, or dragging): 12px wide × 22px tall pill with 6 white grip dots (2×3 grid)
  - **Inactive state** (default): 6px wide × 16px tall pill, no grip dots
  - **Focus ring** (keyboard focus only): a rounded outline rect outside the halo, consistent with how movable points show their focus indicator on the element itself rather than on the full line
  - Layered SVG `rect` elements (focus ring → halo → ring → center) matching movable point styling
  - `pointerEvents: "none"` so drags pass through to the line

### Asymptote Drag Behavior

The asymptote movement follows the Grapher widget's behavior:

1. **Valid position** — All points on the same side of the new asymptote position: move freely
2. **Invalid position** — Asymptote would be between points or on a point: snap past all points
   to the other side (one `snapStep` beyond the nearest extreme point in the drag direction)
3. **Direction detection** — Uses the requested mouse position relative to the midpoint between the
   two curve points to determine snap direction (prevents flicker from state oscillation)
4. **Safety check** — Asymptote can never land exactly on a point's x-coordinate

### Curve-Asymptote Visual Gap (Preventing the Curve from Touching the Asymptote)

A logarithmic curve approaches infinity near its asymptote — but the rendered SVG path has
visible stroke width, which can make the curve appear to touch the asymptote line even when
there is mathematical separation. Several approaches were evaluated:

| Approach | Result | Issue |
|----------|--------|-------|
| Large domain offset (`0.1`) | Gap visible but curve appears "cut off" | Curve ends abruptly within the visible area |
| Y-value clamping (cap at yMin/yMax) | Curve reaches edge but still appears to touch | SVG stroke width causes visual overlap at the boundary |
| Pixel-to-graph-unit stroke calculation | Worse visual result | Overly complex and didn't account for curve curvature |
| Dashed asymptote line | N/A — not matching Grapher's solid line | Grapher uses a solid asymptote line |
| **NaN cutoff with y-padding (final)** | Curve exits off-screen naturally | No visual touching; curve appears to continue to infinity |

**Final solution:** The plot function returns `NaN` when the computed y-value exceeds
`yMin - yPadding` or `yMax + yPadding` (where `yPadding = 2 × visible y-range`). This causes
Mafs to end the SVG path well before the curve's stroke reaches the asymptote. Combined with
the small domain offset (`0.001`), the curve extends very close to the asymptote but exits
the visible area upward/downward rather than ending abruptly at the domain boundary.

This mirrors the Grapher's approach conceptually — the Grapher clips at `|y| > 500000` and
splits paths at sign flips.

### Scoring (`score-interactive-graph.ts`)

1. Extract logarithm coefficients from both user and rubric (coords + asymptote)
2. Use `approximateDeepEqual` to compare `[a, b, c]` coefficient arrays
3. No canonical normalization needed (logarithm has no periodic equivalences)

### Constraints

**Points:**
- Cannot be placed on the asymptote line (`point.x !== asymptoteX`)
- Must have different y-values (`point1.y !== point2.y`)
- Must remain on the same side of the asymptote as the other point
- Keyboard movement uses a unified `isValidPosition()` check that enforces all three rules,
  with a bounded retry loop (max 3 steps in the move direction) to skip past invalid positions.
  If no valid position is found within 3 steps, the point stays in place.

**Asymptote:**
- Constrained to horizontal movement only
- Snapped to the grid
- Cannot land on either point's x-coordinate
- Can cross to the other side of both points (curve flips direction)

## Key Differences from Tangent

| Aspect | Tangent | Logarithm |
|--------|---------|-----------|
| Formula | `a * tan(b*x - c) + d` | `a * ln(b*x + c)` |
| Coefficients | 4 (amplitude, freq, phase, offset) | 3 (a, b, c) |
| Interactive elements | 2 points | 2 points + 1 draggable asymptote |
| Asymptotes | Multiple (periodic, computed) | Single vertical (user-movable) |
| Domain restriction | Undefined at each asymptote | Undefined on one side of asymptote |
| Rendering approach | Segment splitting (multiple `Plot.OfX`) | Single `Plot.OfX` with `domain` prop |
| Discontinuity workaround | Required (Mafs issue #133) | Not needed |
| Curve-asymptote gap | NaN near asymptotes (within 0.001) | NaN when y exceeds visible range + padding |
| Canonical normalization | Yes (periodic equivalences) | No |
| Scoring comparison | Canonical coefficients | Direct coefficient comparison |

## Key Differences from Sinusoid

| Aspect | Sinusoid | Logarithm |
|--------|----------|-----------|
| Control points | 2 points on the curve | 2 points on the curve + 1 asymptote |
| Asymptotes | None | Single vertical (draggable) |
| Domain | All real numbers | Restricted by asymptote position |
| Discontinuity handling | Not needed | Not needed (domain restriction suffices) |
| Coefficient computation | Direct from points | Inverse exponential approach |
| Reducer actions | `movePoint` | `movePoint` + `moveCenter` (asymptote) |
| Drag handle | None | Pill-shaped with active/inactive states |

## Files Modified (POC)

### New files
- `packages/perseus/src/widgets/interactive-graphs/graphs/logarithm.tsx` — Main component with:
  - `renderLogarithmGraph()` — entry point
  - `LogarithmGraph` — React component with curve, asymptote line, drag handle, and movable points
  - `AsymptoteDragHandle` — pill-shaped SVG drag handle component with active/inactive states
  - `computeLogarithm()` — evaluates `a * ln(b*x + c)`
  - `getLogarithmCoefficients()` — inverse exponential coefficient computation
  - `getLogarithmKeyboardConstraint()` — keyboard movement with asymptote/overlap avoidance
  - `describeLogarithmGraph()` — screen reader description strings
  - `getLogarithmDescription()` — interactive elements description for accessibility

### Modified files
- `packages/perseus-core/src/data-schema.ts` — `PerseusGraphTypeLogarithm`, `LogarithmGraphCorrect` types
- `packages/perseus-core/.../interactive-graph-widget.ts` — Parser for logarithm type
- `packages/perseus-score/.../score-interactive-graph.ts` — Logarithm scoring with `getLogarithmCoeffs()` helper
- `packages/perseus/src/strings.ts` — Screen reader strings (`srLogarithmGraph`, `srLogarithmPoint1`, `srLogarithmPoint2`, `srLogarithmDescription`, `srLogarithmInteractiveElements`, `srLogarithmAsymptote`)
- `packages/perseus/src/index.ts` — Export `getLogarithmCoords`
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` — `getLogarithmEquationString()`, `defaultLogarithmCoords`, register logarithm type
- `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` — Render case for logarithm
- `packages/perseus/src/widgets/interactive-graphs/mafs-state-to-interactive-graph.ts` — Logarithm state conversion
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `LogarithmGraphState` with `coords` and `asymptote`
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts` — Logarithm actions (`movePoint`, `moveCenter`)
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` — `doMovePoint` case (point constraints), `doMoveCenter` case (asymptote snap-through logic)
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` — `getLogarithmCoords()` with defaults
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` — `getGradableGraph` case
- `packages/perseus/src/widgets/interactive-graphs/widget-ai-utils/interactive-graph-ai-utils.ts` — `LogarithmUserInput` type
- `packages/perseus-editor/.../graph-type-selector.tsx` — "Logarithm function" option
- `packages/perseus-editor/.../interactive-graph-editor.tsx` — Editor support in `mergeGraphs`
- `packages/perseus-editor/.../start-coords/types.ts` — `{type: "logarithm"}` in start coords union
- `packages/perseus-editor/.../start-coords/util.ts` — Default start coords and UI visibility
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` — `withLogarithm()`, `LogarithmGraphConfig`
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` — `logarithmQuestion`
- `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx` — Logarithm story

## Decisions

1. **Explicit asymptote dragging** — The logarithm graph uses a user-movable asymptote (matching
   the Grapher widget behavior) rather than deriving it implicitly from the two control points.
   This gives content creators full control over the exercise setup and matches learner expectations
   from the existing Grapher-based exercises.

2. **Reuse `moveCenter` action** — Instead of creating a new `moveAsymptote` action type, the
   implementation reuses the existing `MOVE_CENTER` action (originally for circle graphs). This
   keeps the action surface small and follows the existing discriminated union pattern in the reducer.

3. **Single `Plot.OfX` with domain restriction** — Unlike tangent (which needs segment splitting
   for multiple periodic asymptotes), the logarithm only has one asymptote and the function is
   defined on only one side. A single `<Plot.OfX>` with a restricted `domain` prop is sufficient.
   No discontinuity workaround needed.

4. **Ref-based coefficient caching** — `coeffRef` stores the last valid coefficients so the graph
   doesn't break during transient invalid states (e.g., mid-drag where points momentarily create
   degenerate configurations). Same pattern as tangent and sinusoid.

5. **Direct coefficient comparison for scoring** — No canonical normalization is needed because
   logarithm doesn't have periodic equivalences. Direct `approximateDeepEqual` on `[a, b, c]`
   is sufficient.

6. **Midpoint-based snap-through for asymptote** — When the asymptote is dragged past the curve
   points, it snaps to the other side (one `snapStep` beyond the farthest point). The snap
   direction is determined by comparing the requested mouse position to the midpoint between
   the two curve points. This prevents the oscillation/flicker bug that occurred when using the
   previous asymptote position (`oldX`) for direction detection — because after snapping, the
   state changes, causing the next frame to compute a different direction and snap back.

7. **Full-line draggable asymptote** — The asymptote line uses the same `useDraggable` + `SVGLine`
   pattern as `MovableLine`, making the entire line interactive rather than requiring the user to
   find a specific drag point. A pill-shaped handle provides visual affordance.

8. **Asymptote state as two points** — The asymptote is stored as `[vec.Vector2, vec.Vector2]`
   (two endpoints of the vertical line) rather than a single x-value. This matches the Grapher
   widget's data shape and the `PerseusGraphTypeLogarithm` schema, making serialization straightforward.

9. **NaN cutoff for curve-asymptote visual gap** — The plot function returns `NaN` (instead of
   clamping) when y-values exceed the visible range with padding. This causes Mafs to end the
   SVG path before the curve's stroke gets close enough to visually touch the asymptote. This
   approach was chosen after evaluating several alternatives (see
   [Curve-Asymptote Visual Gap](#curve-asymptote-visual-gap-preventing-the-curve-from-touching-the-asymptote) table).

10. **Active/inactive drag handle states with localized focus ring** — The `AsymptoteDragHandle`
    pill has two visual states: a larger pill with grip dots when hovered, focused, or dragging,
    and a smaller pill without dots when idle. On keyboard focus, a focus ring appears around the
    drag handle (not the full asymptote line), consistent with how movable points display their
    focus indicator. The full-line focus outline was removed in favor of this localized approach.

11. **Localized asymptote aria-label with `aria-live`** — The asymptote's `aria-label` uses a
    translatable string from `strings.ts` (`srLogarithmAsymptote`) with `srFormatNumber` for
    locale-appropriate number formatting. The label includes keyboard navigation instructions
    ("Use left and right arrow keys to move"). `aria-live="polite"` on the asymptote element
    causes screen readers to announce the updated position when the asymptote is moved.

12. **Bounded keyboard constraint retry** — The keyboard constraint uses a unified
    `isValidPosition()` check (asymptote, same-y, same-side) inside a bounded loop (max 3 steps).
    This prevents the infinite-loop risk of the original two-separate-if approach and ensures the
    point stays in place if no valid position exists in the move direction.

13. **Logarithm only has vertical asymptotes** — Horizontal asymptotes are not applicable to
    logarithmic functions. Horizontal asymptotes will be addressed separately for the exponential
    function graph type (see [Future: Horizontal Drag Handle](#future-horizontal-drag-handle-for-exponential-graph)).

## Future: Horizontal Drag Handle for Exponential Graph

The `AsymptoteDragHandle` component is currently designed for vertical asymptotes only. When the
exponential graph type is implemented (which has a horizontal asymptote), the component will need
minor modifications:

### Current limitations (vertical-only)
- **Dimensions are hardcoded vertical** — width < height (12×22 active, 6×16 inactive). A
  horizontal handle would need width > height (22×12).
- **Grip dots assume vertical layout** — 3 rows × 2 columns (`dy ∈ [-3,0,3]`, `dx ∈ [-2,2]`).
  Horizontal would need 2 rows × 3 columns (swap dx/dy).

### Proposed change
Add an `orientation` prop to the component:

```typescript
type AsymptoteDragHandleProps = {
    x: number;
    y: number;
    active: boolean;
    focused: boolean;
    orientation?: "vertical" | "horizontal"; // defaults to "vertical"
};
```

Then swap width/height dimensions and the dot grid layout based on orientation. This is ~5 lines
of conditional logic — no architectural change needed.

### Recommendation
Do not add the `orientation` prop now. The current component is clean and minimal for its single
use case. When the exponential graph ticket comes, adding orientation support will be trivial
and the actual design requirements will guide the exact dimensions. Premature abstraction adds
complexity without a way to verify correctness.
