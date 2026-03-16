# Exponential Graph - Interactive Graph Widget

## Overview

Research and plan for adding exponential graph support to the Interactive Graph widget,
allowing content creators to define exponential function exercises using two movable points
and a movable horizontal asymptote.

- **Spike ticket:** LEMS-3945 — technical research (this document is the deliverable)
- **Implementation ticket:** LEMS-3711 — Add support for exponential function answer types
- **Primary reference:** `LEMS-3950/poc-logarithm-interactive-graph`

## Scenarios

### Learner: Interacting with an Exponential Graph

> As a learner working on algebra or precalculus problems,
> I want to interact with an exponential graph by dragging its control points and asymptote,
> So that I can visually construct the correct exponential function and check my answer.

- An exponential graph renders in the Interactive Graph widget using two movable control points
  and one movable horizontal asymptote line
- The curve updates in real time as the user drags any of the three interactive elements
- The graph correctly renders `f(x) = a * e^(b*x) + c` based on point and asymptote positions
- The curve is continuous everywhere — no asymptote rendering workaround is needed (unlike tangent)
- Keyboard navigation works on both control points and the asymptote (arrow keys move by snap step)
- If both curve points share the same x-coordinate, the move is rejected gracefully (no crash,
  no invalid state), because this makes `b` undefined (division by zero in the coefficient formula)
- If a curve point would cross or land exactly on the asymptote y-value, the move is rejected —
  both curve points must remain strictly above or strictly below the asymptote
- If dragging the asymptote would place it between or on the curve points, it snaps to one step
  past the nearest point, matching the logarithm POC's asymptote constraint behavior
- The graph is scorable — the correct answer is compared by extracting coefficients `[a, b, c]`
  and using `approximateDeepEqual`
- Screen reader announces the graph label, point positions, and asymptote position correctly
- The widget renders correctly on mobile

### Content Creator: Configuring an Exponential Graph Exercise

> As a content creator building algebra or precalculus exercises,
> I want to select Exponential as an answer type in the Interactive Graph widget and configure
> its correct answer, starting positions, asymptote, and axis settings,
> So that I can create accurate and customizable exponential graph exercises for learners.

- "Exponential function" appears as a selectable option in the Interactive Graph editor's
  answer type dropdown
- Selecting exponential renders the exponential graph in the editor's correct answer preview
- The editor displays the correct equation string in the format `y = a * e^(b*x) + c`
- The content creator can drag the two control points and the asymptote line in the editor
  to set the correct answer
- Start coordinates and start asymptote are supported — the editor can configure where the
  points and asymptote start before the learner interacts
- Switching away from exponential and back preserves the graph state correctly
- The editor does not crash or show TypeScript errors when exponential is selected

## References

### Interactive Graph: Logarithm POC (Primary Reference)

The logarithm POC (`LEMS-3950/poc-logarithm-interactive-graph`) is the direct implementation
reference for the exponential graph. Exponential is the inverse function of logarithm, and
the two graph types are symmetric in their structure: where logarithm has a **vertical** asymptote
that moves horizontally, exponential has a **horizontal** asymptote that moves vertically.

- `packages/perseus/src/widgets/interactive-graphs/graphs/logarithm.tsx` — Full implementation
  reference: two-point + asymptote interaction model, `AsymptoteDragHandle` component,
  `useDraggable` for asymptote movement, keyboard constraint pattern (`isValidPosition` with
  bounded retry loop), and screen reader strings. Note: `AsymptoteDragHandle` is
  **orientation-specific** (tall pill, 2×3 dot grid for a vertical line). For a horizontal
  asymptote it needs adaptation — at minimum swapping width/height constants and rotating the
  dot layout. The cleanest approach is adding an `orientation: "horizontal" | "vertical"` prop.
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` —
  Logarithm `moveCenter` case: strips the irrelevant axis (y for logarithm; x for exponential),
  enforces the same-side constraint, and snaps the asymptote when a drag would cross a point.
  The exponential reducer case is the vertical mirror of this logic.
- `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` — Logarithm
  scoring defines `getLogarithmCoeffs()` locally and compares `[a, b, c]` with
  `approximateDeepEqual`. Exponential follows the same pattern.
- `packages/perseus-core/src/data-schema.ts` — `PerseusGraphTypeLogarithm` with `coords`,
  `asymptote`, `startCoords`, and `startAsymptote`. `PerseusGraphTypeExponential` has the same
  shape.
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` —
  `getLogarithmCoords()` pattern (coords → startCoords → normalized defaults with asymptote
  placed one step outside the first point).

### Grapher Widget (Legacy Exponential)

The Grapher widget's exponential type provides the mathematical reference:

- `packages/perseus-core/src/utils/grapher-util.ts` — Exponential coefficient computation and
  equation string generation. Formula: `y = a * e^(b*x) + c`. Also contains the constraint
  logic (`extraCoordConstraint`, `extraAsymptoteConstraint`) that the reducer enforces.
- `packages/perseus-core/src/data-schema.ts` — The existing Grapher schema shape
  (`type: "exponential"`, `coords: [Coord, Coord]`, `asymptote: [Coord, Coord]`) mirrors the
  new `PerseusGraphTypeExponential`.
- `packages/perseus-score/src/widgets/grapher/score-grapher.ts` — Uses
  `GrapherUtil.functionForType("exponential").getCoefficients(coords, asymptote)` and
  `approximateDeepEqual` for comparison.

### Interactive Graph: Sinusoid and Tangent (Two-Point Pattern Reference)

- `packages/perseus/src/widgets/interactive-graphs/graphs/sinusoid.tsx` — Two-point interaction
  model and `Plot.OfX` rendering. The exponential curve also uses a single `<Plot.OfX>` spanning
  the full x-range (no discontinuities to handle, unlike tangent).
- `packages/perseus/src/widgets/interactive-graphs/__docs__/notes/tangent.md` — Full
  implementation notes; the exponential notes follow the same format.

### Adding a New Graph Type (Implementation Checklist)

- `packages/perseus/src/widgets/interactive-graphs/__docs__/notes/new-graph-type.md` — The
  step-by-step checklist for adding any new graph type end-to-end. All 12 steps apply to the
  exponential implementation. The Files Modified section below maps directly to that checklist.

## Mathematical Model

The exponential curve uses the form:

```
f(x) = a * e^(b * x) + c
```

Where:

- `a` = vertical stretch factor
- `b` = growth/decay rate (positive = growth, negative = decay)
- `c` = vertical offset = y-coordinate of the horizontal asymptote

Given two points `p1 = (x1, y1)` and `p2 = (x2, y2)` on the curve and the asymptote
y-value `c`:

```
b = ln((y1 - c) / (y2 - c)) / (x1 - x2)
a = (y1 - c) / e^(b * x1)
```

The asymptote is a horizontal line at `y = c`. Both curve points must satisfy `y ≠ c`
(they must be strictly above or strictly below the asymptote) and must stay on the same side.

### Key Differences from Logarithm

Exponential and logarithm are inverse functions of each other, and their interactive graph
implementations are symmetric:

| | Logarithm | Exponential |
|---|---|---|
| Asymptote orientation | Vertical (`x = c`) | Horizontal (`y = c`) |
| Asymptote moves | Left / right | Up / down |
| Point constraint | Both points left or both right of asymptote | Both points above or both below asymptote |
| Coefficient formula | Inverted exponential (flip x↔y, compute exponential, invert) | Direct (no inversion needed) |
| `moveCenter` axis used | x only (y stripped) | y only (x stripped) |

## Solution Approach

The implementation follows the logarithm POC directly, mirroring its structure with the
asymptote axis swapped from vertical to horizontal.

### Rendering (`exponential.tsx`)

1. Compute `[a, b, c]` from the two movable point coordinates and the asymptote y-value
2. Cache last valid coefficients via `coeffRef` (same pattern as logarithm/tangent) to handle
   transient invalid states mid-drag
3. Render a single `<Plot.OfX>` covering the full x-range — no discontinuity workaround needed
4. Render the asymptote as a full-width horizontal line (left edge to right edge of graph range)
   with `AsymptoteDragHandle` at its midpoint. The handle component needs an
   `orientation: "horizontal"` mode (swap `ACTIVE_W`/`ACTIVE_H` constants and rotate the grip
   dot layout from a 2×3 vertical grid to a 3×2 horizontal grid).
5. Render two `<MovablePoint>` instances for the curve points

**Default state (no `startCoords`):** normalize raw seed coords `[[0.55, 0.5], [0.75, 0.75]]`
via `normalizePoints`, then place the asymptote one snap step *below* `coords[0]`
(mirroring the logarithm default of one step to the *left* of `coords[0]`):

```typescript
const asymptoteY = coords[0][1] - step[1];
const asymptote: [Coord, Coord] = [
    [range[0][0], asymptoteY],
    [range[0][1], asymptoteY],
];
```

### Scoring

1. Define `getExponentialCoefficients(coords, asymptote)` locally in `score-interactive-graph.ts`
   (matching the logarithm pattern of keeping the helper co-located with the scorer)
2. Extract `[a, b, c]` for both user input and rubric
3. Compare with `approximateDeepEqual` — no canonical normalization needed (exponential has no
   periodicity, coefficients uniquely identify the curve)

### Constraints

- **Same-x rejection for curve points** — two curve points cannot share the same x-coordinate
  (would make `b` undefined); reject the move
- **Asymptote crossing for curve points** — a curve point cannot land on or cross to the opposite
  side of the asymptote; reject the move
- **Asymptote crossing for asymptote drags** — if dragging the asymptote would place it between
  the curve points, snap it to one step past the nearer point (same logic as logarithm reducer,
  with x↔y axes swapped)
- Both constraints are enforced in the reducer AND in the keyboard constraint function
  (`getExponentialKeyboardConstraint`), using the bounded retry loop pattern from the
  logarithm POC

## Files Modified (POC)

### New files

- `packages/perseus/src/widgets/interactive-graphs/graphs/exponential.tsx` — Main component

### Modified files

- `packages/perseus-core/src/data-schema.ts` — `PerseusGraphTypeExponential`,
  `ExponentialGraphCorrect`, register in `PerseusGraphType` and `PerseusGraphCorrectType` unions
- `packages/perseus-core/.../interactive-graph-widget.ts` — Parser for exponential type
- `packages/perseus-score/.../score-interactive-graph.ts` — Exponential scoring branch +
  `getExponentialCoefficients()` helper
- `packages/perseus/src/strings.ts` — Six new SR strings:
  - `srExponentialGraph` — `"An exponential curve on a coordinate plane."`
  - `srExponentialPoint1` / `srExponentialPoint2` — `"Point N at %(x)s comma %(y)s."`
  - `srExponentialDescription` — full curve description including both point positions and
    asymptote y-value
  - `srExponentialInteractiveElements` — `"The graph has 2 draggable points and a draggable asymptote."`
  - `srExponentialAsymptote` — `"Horizontal asymptote at y equals %(asymptoteY)s. Use up and
    down arrow keys to move."` (differs from logarithm's "left and right" — the asymptote
    moves vertically)
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` — Register exponential
  type and `getExponentialEquationString()` static method
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph-ai-utils.ts` —
  `ExponentialUserInput` type and case handlers
- `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` — Import and dispatch
  `renderExponentialGraph()`
- `packages/perseus/src/widgets/interactive-graphs/mafs-state-to-interactive-graph.ts` —
  Exponential case (must include `asymptote` in serialized output)
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts` —
  Add `exponential: { movePoint, moveCenter }` to `actions`
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` —
  Add exponential case in both `doMovePoint` and `doMoveCenter`
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` —
  Add exponential case in `getGradableGraph()` (includes `asymptote` in output)
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` —
  Add `case "exponential"`, implement and export `getExponentialCoords()`
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `ExponentialGraphState`, add to
  `InteractiveGraphState` union
- `packages/perseus-editor/.../graph-type-selector.tsx` — Add "Exponential function" option
- `packages/perseus-editor/.../interactive-graph-editor.tsx` — Add `exponential` case in
  `mergeGraphs`
- `packages/perseus-editor/.../start-coords/types.ts` — Add `exponential` to
  `GraphTypesThatHaveStartCoords`
- `packages/perseus-editor/.../start-coords/util.ts` — Add `exponential` case in
  `getDefaultGraphStartCoords` and `shouldShowStartCoordsUI`
- `packages/perseus-editor/.../start-coords/start-coords-settings.tsx` — `new-graph-type.md`
  step 11 lists this file, but the logarithm POC did **not** modify it (only `types.ts` and
  `util.ts` were changed). Verify before implementing whether a `case "exponential"` is needed
  here or if `util.ts` alone is sufficient.
- `packages/perseus/src/index.ts` — Re-export `getExponentialCoords` (confirmed pattern:
  logarithm POC added `getLogarithmCoords` to the existing `getXxxCoords` export block)
- `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx` —
  Add Storybook story for exponential (logarithm POC added one)
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` — Test
  fixtures; example from Grapher: `{ type: "exponential", coords: [[0, 3], [1, -1]], asymptote: [[-10, 5], [10, 5]] }`
  representing `y = -2e^x + 5`
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` —
  Add `withExponential()` + `ExponentialGraphConfig` class
- `.changeset/*.md` — Changeset entry (every POC includes one)

## Decisions

1. **Logarithm POC as primary reference** — The logarithm and exponential graph types are
   structural inverses. Every implementation decision made in the logarithm POC applies directly
   to exponential with the asymptote axis swapped (vertical ↔ horizontal). New decisions are
   documented below; otherwise, the logarithm decisions apply.

2. **Adapt `AsymptoteDragHandle` for horizontal orientation** — The component is
   orientation-specific (tall narrow pill, 2×3 vertical dot grid). Rather than duplicating it,
   add an `orientation: "horizontal" | "vertical"` prop that swaps the width/height constants
   and rotates the dot layout to a 3×2 grid. This keeps a single shared component and makes
   the orientation intent explicit.

3. **Reuse `moveCenter` action for asymptote** — The existing `moveCenter` action (used by
   logarithm) carries a `destination: vec.Vector2`. The exponential reducer ignores the x
   component and uses only y, mirroring how the logarithm reducer ignores y and uses only x.
   No new action type is needed.

4. **Local coefficient helper** — `getExponentialCoefficients()` is defined locally in
   `score-interactive-graph.ts`, matching the logarithm POC pattern. (The tangent implementation
   used `kmath/coefficients.ts` instead; the logarithm pattern is preferred here for consistency
   with the graph type we're most closely following.)

5. **No canonical normalization for scoring** — Unlike sinusoid/tangent, the exponential
   `[a, b, c]` coefficients uniquely describe the curve (no periodicity). `approximateDeepEqual`
   on the raw coefficient triple is sufficient.

6. **Single `<Plot.OfX>` for rendering** — Exponential is continuous everywhere. There are no
   asymptote discontinuities in the rendered curve (the horizontal asymptote is a visual guide
   only), so the tangent workaround of splitting into multiple `<Plot.OfX>` segments is not needed.

## PR Breakdown

The work ships as one spike PR and five implementation PRs. The structure mirrors the
absolute-value graph type (LEMS-3347) which landed with the same PR breakdown.

### LEMS-3945 — Spike deliverable

This document (`exponential.md`) is the sole deliverable for the spike ticket.

**Branch:** `LEMS-3945`

**New files:**

- `packages/perseus/src/widgets/interactive-graphs/__docs__/notes/exponential.md` — this file

---

### LEMS-3711 PR 1 — Types, kmath & stubs

Establishes the type contract and foundational setup. Introduces `getExponentialCoefficients`
to kmath, defines all type shapes, and adds placeholder stubs so the type can enter the
`PerseusGraphType` union without breaking exhaustiveness checks or silently failing if an
exponential widget is somehow encountered before PR 3 renders.

**Branch:** `LEMS-3711/exponential-types-kmath`

**New files:**

- `packages/kmath/src/coefficients.test.ts` — tests for `getExponentialCoefficients`

**Modified files:**

| File | Change |
| --- | --- |
| `packages/kmath/src/coefficients.ts` | `ExponentialCoefficient` type + `getExponentialCoefficients` function |
| `packages/kmath/src/index.ts` | Export `ExponentialCoefficient` type |
| `packages/perseus-core/src/data-schema.ts` | `PerseusGraphTypeExponential`, added to `PerseusGraphType` and `PerseusGraphCorrectType` unions |
| `packages/perseus-core/.../interactive-graph-widget.ts` | Parser branch for `"exponential"` |
| `packages/perseus/src/widgets/interactive-graphs/types.ts` | `ExponentialGraphState`, added to `InteractiveGraphState` union |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | Stub: `case "exponential"` throws `"Not implemented"` |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` | Stub: `case "exponential"` returns `""` for equation string |
| `packages/perseus-editor/.../interactive-graph-editor.tsx` | Exhaustiveness fix: minimal `case "exponential"` in `mergeGraphs` |
| `packages/perseus-editor/.../start-coords/util.ts` | Exhaustiveness fix: `case "exponential"` in `shouldShowStartCoordsUI` |

---

### LEMS-3711 PR 2 — State management

Actions, reducer, initializer, and serialization. The graph is stateful and interactive but
not yet visible (rendering still throws "Not implemented" from PR 1's stub).

**Branch:** `LEMS-3711/exponential-pr2-state`

**New files:** *(none)*

**Modified files:**

| File | Change |
| --- | --- |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts` | `exponential: { movePoint, moveCenter }` actions |
| `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` | `case "exponential"`, exports `getExponentialCoords()` |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` | `doMovePoint` and `doMoveCenter` cases with same-x and asymptote-crossing constraints |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` | `getGradableGraph()` branch (includes `asymptote` in output) |
| `packages/perseus/src/widgets/interactive-graphs/mafs-state-to-interactive-graph.ts` | `case "exponential"` (includes `asymptote`) |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` | Test fixture |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` | `withExponential()` builder method |
| `packages/perseus/src/index.ts` | Re-export `getExponentialCoords` |

---

### LEMS-3711 PR 3 — Rendering & accessibility

The visual component and all strings. Replaces PR 1's stubs with real implementations.
The graph is now fully visible and interactive for learners.

**Branch:** `LEMS-3711/exponential-pr3-rendering`

**New files:**

- `packages/perseus/src/widgets/interactive-graphs/graphs/exponential.tsx` — rendering component (468 lines)

**Modified files:**

| File | Change |
| --- | --- |
| `packages/perseus/src/strings.ts` | Six SR strings for graph, points, asymptote, and descriptions |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | Replace stub with `renderExponentialGraph()` dispatch |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` | Replace stub with real `getEquationString()` case |
| `packages/perseus/src/widget-ai-utils/interactive-graph/interactive-graph-ai-utils.ts` | `ExponentialUserInput` type and case handlers |
| `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx` | Storybook story |

**Notes:**

- `AsymptoteDragHandle` horizontal variant is inlined in `exponential.tsx`. Extract to a shared
  component when LEMS-3950 merges and its `AsymptoteDragHandle` is available on main.

---

### LEMS-3711 PR 4 — Scoring

Scoring branch in `perseus-score`. Imports `getExponentialCoefficients` from kmath (available
since PR 1). The graph is now gradeable.

**Branch:** `LEMS-3711/exponential-pr4-scoring`

**New files:** *(none)*

**Modified files:**

| File | Change |
| --- | --- |
| `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` | Scoring branch; imports `getExponentialCoefficients` from kmath |
| `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.test.ts` | Scoring unit tests |

---

### LEMS-3711 PR 5 — Editor support

Surfaces the exponential type in the content-creator UI. The "on switch" — once landed,
content creators can author exponential graph exercises. Stacks on PR 1.

**Branch:** `LEMS-3711/exponential-pr5-editor`

**New files:**

- `packages/perseus-editor/.../start-coords/start-coords-exponential.tsx` — dedicated start-coords
  component (asymptote is a third interactive element; can't reuse `StartCoordsPoint` directly)

**Modified files:**

| File | Change |
| --- | --- |
| `packages/perseus-editor/.../components/graph-type-selector.tsx` | Add `"Exponential function"` option to dropdown |
| `packages/perseus-editor/.../interactive-graph-editor.tsx` | Full `"exponential"` case in `mergeGraphs` (replaces PR 1 stub) |
| `packages/perseus-editor/.../start-coords/types.ts` | Add `"exponential"` to `GraphTypesThatHaveStartCoords` |
| `packages/perseus-editor/.../start-coords/util.ts` | Full `"exponential"` cases in `getDefaultGraphStartCoords` and `shouldShowStartCoordsUI` |
| `packages/perseus-editor/.../start-coords/start-coords-settings.tsx` | `case "exponential"` dispatching to `<StartCoordsExponential>` |
| `packages/perseus-linter/.../interactive-graph-widget-error.ts` | Validation: start asymptote must not fall between or on the curve's start points |
