# Absolute Value Graph - Interactive Graph Widget

## Overview

Research and plan for adding absolute value graph support to the Interactive Graph widget,
allowing content creators to define absolute value function exercises using two movable points.

The Grapher widget already implements this graph type (`absolute_value`). This document
covers porting that implementation into the InteractiveGraph architecture.

## Scenarios

### Learner: Interacting with an Absolute Value Graph

> As a learner working on algebra problems,
> I want to interact with an absolute value graph by dragging its vertex and a point on one arm,
> So that I can visually construct the correct absolute value function and check my answer.

- An absolute value graph renders in the Interactive Graph widget using two movable control points
- The curve updates in real time as the user drags either control point
- The graph correctly renders `f(x) = m * |x - h| + v` based on point positions
- Both upward-opening (m > 0) and downward-opening (m < 0) V shapes are supported
- Keyboard navigation works on both control points (arrow keys move the point by snap step)
- If both points share the same x-coordinate, the move is rejected gracefully (no crash, no invalid state)
- The graph is scorable — the correct answer is compared by checking all three coefficients
- Screen reader announces the graph label and point positions correctly
- The widget renders correctly on mobile

### Content Creator: Configuring an Absolute Value Graph Exercise

> As a content creator building algebra exercises,
> I want to select Absolute Value as an answer type in the Interactive Graph widget and configure
> its correct answer, starting position, and axis settings,
> So that I can create accurate and customizable absolute value graph exercises for learners.

- "Absolute value" appears as a selectable option in the Interactive Graph editor's answer type dropdown
- Selecting absolute value renders the graph in the editor's correct answer preview
- The editor displays the correct equation string in the format `y = m|x - h| + v`
- The content creator can drag the control points in the editor to set the correct answer
- Start coordinates are supported — the editor can configure where the points start before the learner interacts
- Switching away from absolute value and back preserves the graph state correctly
- The editor does not crash or show TypeScript errors when absolute value is selected

## References

### Grapher Widget (Source Implementation)

The Grapher widget already implements absolute value as a graph type. This is the primary reference:

- `packages/perseus-core/src/utils/grapher-util.ts` — `AbsoluteValue` object with `getCoefficients`,
  `getFunctionForCoeffs`, and `getEquationString`. Defines the two-point model and equation form.
- `packages/perseus-core/src/utils/grapher-types.ts` — `AbsoluteValueType` (extends `SharedGrapherType`).
  No asymptote or extra constraints needed (unlike exponential/logarithm).
- `packages/perseus-core/src/data-schema.ts` — `GrapherAnswerTypes` union includes
  `{ type: "absolute_value"; coords: null | [vertex: Coord, secondPoint: Coord] }`.
  Note the existing Grapher type uses `absolute_value` (underscore); the new InteractiveGraph type
  should follow the hyphenated convention used by all other interactive graph types: `"absolute-value"`.
- `packages/perseus-score/src/widgets/grapher/score-grapher.ts` — Grapher scoring uses
  `AbsoluteValue.getCoefficients()` and direct `areEqual` comparison.

### Interactive Graph: Sinusoid (Closest Pattern Reference)

The sinusoid graph type uses the same two-point interaction model and is the best reference:

- `packages/perseus/src/widgets/interactive-graphs/graphs/sinusoid.tsx` — Two-point interaction,
  coefficient extraction via `getSinusoidCoefficients`, `Plot.OfX` rendering, keyboard same-x constraint,
  and screen reader descriptions. Absolute value mirrors this structure closely.
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` — Sinusoid
  reducer case using the shared `movePoint` action with same-x constraint.
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` — `getSinusoidCoords()`
  pattern: check `graph.coords`, then `graph.startCoords`, then fall back to normalized defaults.
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `SinusoidGraphState` shape:
  `{ type: "sinusoid"; coords: [vec.Vector2, vec.Vector2] }`. Absolute value follows the same shape.
- `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` — Sinusoid scoring
  block using `getSinusoidCoefficients` and `approximateDeepEqual`. Absolute value can follow
  the same pattern with its own `getAbsoluteValueCoefficients` helper.

### Interactive Graph: Quadratic (Secondary Pattern Reference)

The quadratic graph type also uses `Plot.OfX` rendering and is a useful secondary reference:

- `packages/perseus/src/widgets/interactive-graphs/graphs/quadratic.tsx` — `Plot.OfX` rendering pattern,
  `coeffRef` fallback for transient invalid states, and keyboard constraint helpers.

## Mathematical Model

The absolute value curve uses the form:

```
f(x) = m * |x - h| + v
```

Where:
- `h` = horizontal offset (x-coordinate of the vertex) = `p1[x]`
- `v` = vertical offset (y-coordinate of the vertex) = `p1[y]`
- `m` = slope of each arm = `|Δy / Δx|`, with sign determined by whether `p2` is above or below `p1`

### Two-Point Definition

- `p1` = vertex of the V (the corner/apex)
- `p2` = any point on one arm of the V (determines slope and direction)

**Coefficient extraction** (from Grapher source):

```
denom = p2[x] - p1[x]
num   = p2[y] - p1[y]

m = |num / denom|
if (p2[y] < p1[y]) m = -m

h = p1[x]
v = p1[y]
```

The `Math.abs` on the initial slope ensures that which side of the vertex `p2` is placed on
does not affect the slope magnitude — only the sign of `m` (open up vs. open down) matters.

### Constraint

- `p2[x]` **cannot equal** `p1[x]` (would make `denom = 0`, coefficients undefined)

This is the same guard used by sinusoid and quadratic.

### Scoring / Equality

Two absolute value graphs are equal iff their coefficients `[m, h, v]` all match (within floating-point
tolerance). No canonical normalization is required — the vertex `(h, v)` uniquely defines the graph's
position, and `m` uniquely defines its shape and orientation. Use `approximateDeepEqual` following
the sinusoid scoring pattern.

### Default Coordinates

The Grapher widget uses normalized defaults `[[0.5, 0.5], [0.75, 0.75]]` — vertex at center, second
point up and to the right. For InteractiveGraph these need to be de-normalized using `normalizePoints`
(same as sinusoid/quadratic).

Suggested defaults (in normalized [0,1] space, same as Grapher):
```
p1 (vertex):       [0.5,  0.5]
p2 (second point): [0.75, 0.75]
```

## Solution Approach

The implementation follows the same patterns established by the sinusoid graph type.
No discontinuities or segment-splitting is needed — absolute value is continuous everywhere.

### Rendering (`absolute-value.tsx`)

1. Compute `[m, h, v]` coefficients from the two movable point coordinates
2. Render the full function with a single `<Plot.OfX>` component
3. Use a `coeffRef` to cache the last valid coefficients (same guard as sinusoid/quadratic)
4. Return screen reader description via `SRDescInSVG`

### Scoring

1. Extract absolute value coefficients from both user and rubric coordinates
2. Use `approximateDeepEqual([m, h, v], [m_rubric, h_rubric, v_rubric])` to compare

No canonical normalization is needed (vertex is uniquely defined).

### Constraints

- Two points **cannot share the same x-coordinate** — keyboard movement skips positions
  where `p2[x] === p1[x]` (same guard as sinusoid)

## Files to Create / Modify

### New files

- `packages/perseus/src/widgets/interactive-graphs/graphs/absolute-value.tsx` — Main component

### Modified files

| File | Change |
|------|--------|
| `packages/perseus-core/src/data-schema.ts` | Add `PerseusGraphTypeAbsoluteValue` type, add to `PerseusGraphType` union |
| `packages/perseus-core/.../interactive-graph-widget.ts` | Add parser for `"absolute-value"` type |
| `packages/perseus/src/widgets/interactive-graphs/types.ts` | Add `AbsoluteValueGraphState`, add to `InteractiveGraphState` union |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts` | Add action(s) for moving absolute value points |
| `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` | Add `case "absolute-value"`, implement `getAbsoluteValueCoords()` |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` | Add case for absolute value move action |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` | Add branch in `getGradableGraph()` |
| `packages/perseus/src/widgets/interactive-graphs/mafs-state-to-interactive-graph.ts` | Add case in `mafsStateToInteractiveGraph()` |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | Import and add `case "absolute-value"` in `renderGraphElements()` |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` | Add case in `getEquationString()` |
| `packages/perseus/src/strings.ts` | Add screen reader strings (`srAbsoluteValueGraph`, etc.) |
| `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` | Add scoring branch |
| `packages/perseus-editor/.../graph-type-selector.tsx` | Add `<OptionItem value="absolute-value" label="Absolute value" />` |
| `packages/perseus-editor/.../interactive-graph-editor.tsx` | Add editor support |
| `packages/perseus-editor/.../start-coords/start-coords-settings.tsx` | Add `case "absolute-value"` |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` | Add test fixture |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` | Add builder method |

## Implementation Checklist

### Data layer

- [ ] **`data-schema.ts`** — Add `PerseusGraphTypeAbsoluteValue`:
  ```ts
  export type PerseusGraphTypeAbsoluteValue = {
      type: "absolute-value";
      coords?: [Coord, Coord] | null;
      startCoords?: [Coord, Coord];
  };
  ```
  Add to `PerseusGraphType` union.
- [ ] **`interactive-graph-widget.ts`** — Add `.withBranch("absolute-value", ...)` to `parsePerseusGraphType`.

### State layer

- [ ] **`types.ts`** — Add `AbsoluteValueGraphState`:
  ```ts
  export interface AbsoluteValueGraphState extends InteractiveGraphStateCommon {
      type: "absolute-value";
      coords: [vec.Vector2, vec.Vector2];
  }
  ```
  Add to `InteractiveGraphState` union.

### Actions

- [ ] **`interactive-graph-action.ts`** — Reuse the existing `MOVE_POINT` action pattern (same as sinusoid),
  or add a dedicated `actions.absoluteValue.movePoint` entry. Follow the sinusoid pattern.

### Initialization

- [ ] **`initialize-graph-state.ts`** — Add `case "absolute-value"` calling `getAbsoluteValueCoords()`.
  Implement `getAbsoluteValueCoords(graph, range, step)`:
  - Return `graph.coords` if set
  - Return `graph.startCoords` if set
  - Return `normalizePoints(range, step, [[0.5, 0.5], [0.75, 0.75]], true)` as default
  - Export the function (needed by start-coords editor UI)

### Reducer

- [ ] **`interactive-graph-reducer.ts`** — Add case handling absolute value point movement with
  the same-x constraint (reject move if `p2[x]` would equal `p1[x]`).

### Serialization

- [ ] **`interactive-graph-state.ts`** — Add branch in `getGradableGraph()` mapping
  `AbsoluteValueGraphState` → `PerseusGraphTypeAbsoluteValue`.
- [ ] **`mafs-state-to-interactive-graph.ts`** — Add `case "absolute-value"` in
  `mafsStateToInteractiveGraph()` for live equation display.

### Rendering

- [ ] **`graphs/absolute-value.tsx`** (new file) — Implement `renderAbsoluteValueGraph()` and
  `AbsoluteValueGraph` component:
  - `coeffRef` fallback for transient invalid state
  - `getAbsoluteValueCoefficients(coords)` returning `{m, h, v}` (or `undefined` if invalid)
  - Single `<Plot.OfX y={(x) => m * Math.abs(x - h) + v} />`
  - Two `<MovablePoint>` components with same-x keyboard constraint
  - `<SRDescInSVG>` for accessibility
- [ ] **`mafs-graph.tsx`** — Import `renderAbsoluteValueGraph`, add `case "absolute-value"` in
  `renderGraphElements()` switch.

### Equation string (editor display)

- [ ] **`interactive-graph.tsx`** — Add `case "absolute-value"` in `getEquationString()`, returning
  a string like `y = 1.000|x - 0.000| + 0.000`.

### Screen reader strings

- [ ] **`strings.ts`** — Add:
  - `srAbsoluteValueGraph: string` — short label for the graph element
  - `srAbsoluteValueVertexPoint: ({x, y}: ...) => string` — aria label for the vertex point
  - `srAbsoluteValueSecondPoint: ({x, y}: ...) => string` — aria label for the second point
  - `srAbsoluteValueDescription: ({vertex, slope}: ...) => string` — description of the graph shape
  - `srAbsoluteValueInteractiveElements: ({point1X, point1Y, point2X, point2Y}: ...) => string`

### Scoring

- [ ] **`score-interactive-graph.ts`** — Add `else if` branch:
  ```ts
  } else if (
      userInput.type === "absolute-value" &&
      rubric.correct.type === "absolute-value" &&
      userInput.coords != null &&
      rubric.correct.coords != null
  ) {
      const userCoeffs = getAbsoluteValueCoefficients(userInput.coords);
      const rubricCoeffs = getAbsoluteValueCoefficients(rubric.correct.coords);
      const correct = approximateDeepEqual(userCoeffs, rubricCoeffs);
      return { type: "points", earned: correct ? 1 : 0, total: 1, message: null };
  ```

### Editor

- [ ] **`graph-type-selector.tsx`** — Add `<OptionItem value="absolute-value" label="Absolute value" />`.
- [ ] **`interactive-graph-editor.tsx`** — Add editor support for absolute value type.
- [ ] **`start-coords/start-coords-settings.tsx`** — Add `case "absolute-value"` using
  `StartCoordsPoint` with `getAbsoluteValueCoords`.

### Tests and test data

- [ ] **`interactive-graph.testdata.ts`** — Add a fixture for the `"absolute-value"` graph type.
- [ ] **`interactive-graph-question-builder.ts`** — Add builder method for the new type.
- [ ] **`graphs/absolute-value.test.tsx`** (new file) — Unit tests for the component and coefficient
  extraction logic.
- [ ] **`score-interactive-graph.test.ts`** — Unit tests for the scoring branch.

## Decisions

1. **Type name `"absolute-value"` (hyphenated)** — Follows the convention used by all other
   InteractiveGraph types (`"linear-system"`, `"sinusoid"`, etc.), distinct from the Grapher widget's
   `"absolute_value"` (underscore).

2. **Two-point model (vertex + arm point)** — Directly ported from the Grapher implementation.
   `p1` is the vertex, `p2` is any point on one arm. This is the simplest model for content creators
   to understand and use.

3. **No canonical normalization needed for scoring** — Unlike sinusoid/tangent, every absolute value
   graph has a unique vertex `(h, v)` and a unique slope magnitude and sign `m`. Direct coefficient
   comparison with `approximateDeepEqual` is sufficient.

4. **Single `Plot.OfX` (no segments)** — Absolute value is continuous everywhere, so no discontinuity
   workaround is needed. This is simpler than tangent.

5. **Reuse `coeffRef` fallback pattern** — The same guard used in sinusoid and quadratic to cache
   the last valid coefficients protects against transient invalid states mid-drag.

6. **No `kmath` changes needed** — Unlike tangent, there is no need to add a new file to `kmath`.
   The coefficient extraction logic is simple enough to live entirely in `absolute-value.tsx`
   (similar to how sinusoid coefficient extraction is duplicated between `kmath/coefficients.ts`
   and `sinusoid.tsx`). Alternatively, a `getAbsoluteValueCoefficients` helper could be added
   to `kmath/coefficients.ts` for reuse in scoring — this matches the tangent/sinusoid precedent
   and is the recommended approach.
