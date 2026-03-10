# Absolute Value Graph - Interactive Graph Widget

## Overview

Research and implementation notes for adding absolute value graph support to the
Interactive Graph widget, allowing content creators to define absolute value function
exercises using two movable points.

## Scenarios

### Learner: Interacting with an Absolute Value Graph

> As a learner working on algebra problems,
> I want to interact with a V-shaped absolute value graph by dragging two control points,
> So that I can visually construct the correct absolute value function and check my answer.

- An absolute value graph renders in the Interactive Graph widget using two movable control points
- The V-shaped curve updates in real time as the user drags either control point
- The graph correctly renders `f(x) = m * |x - h| + k` based on point positions
- The vertex point (coords[0]) controls the tip of the V: `(h, k)`
- The second point (coords[1]) controls the slope: `m = (y₂ - k) / |x₂ - h|`
- A positive slope `m` produces a standard upward-opening V; negative `m` produces an inverted V
- Keyboard navigation works on both control points (arrow keys move the point by snap step)
- If both points share the same x-coordinate, the move is rejected gracefully (no crash, no invalid state)
- The graph is scorable — the correct answer is compared using `{m, h, k}` coefficient equality
- Screen reader announces the graph label, vertex position, and second point position correctly
- The widget renders correctly on mobile

### Content Creator: Configuring an Absolute Value Graph Exercise

> As a content creator building algebra exercises,
> I want to select Absolute Value as an answer type in the Interactive Graph widget and configure
> its correct answer and starting position,
> So that I can create accurate and customizable absolute value graph exercises for learners.

- The content creator can use `withAbsoluteValue()` in the question builder to set up the exercise
- `coords` sets the correct answer; `startCoords` sets where the points begin before the learner interacts
- Switching away from absolute value and back preserves the graph state correctly
- The editor does not crash or show TypeScript errors when absolute value is selected

## References

### Grapher Widget (Legacy Absolute Value)

The Grapher widget already had an `absolute_value` graph type that served as the
mathematical reference:

- `packages/perseus-core/src/utils/grapher-util.ts` — `AbsoluteValue` object with
  `getCoefficients`, `getFunctionForCoeffs`, and `getEquationString`. Uses the same
  `f(x) = m * |x - h| + k` model. The Grapher's `getCoefficients` uses `Math.abs(num/denom)`
  then negates if `p2[y] < p1[y]`, which is equivalent to our `(y₂ - k) / |x₂ - h|` formula.
- `packages/perseus-core/src/utils/grapher-types.ts` — `AbsoluteValueType` and
  `AbsoluteValuePlotDefaults` with default coords `[[0.5, 0.5], [0.75, 0.75]]`

### Interactive Graph: Sinusoid (Pattern Reference)

The sinusoid graph type was the primary pattern reference for the implementation:

- `packages/perseus/src/widgets/interactive-graphs/graphs/sinusoid.tsx` — Two-point interaction
  model, `getSinusoidKeyboardConstraint` (same-x prevention), `Plot.OfX` rendering, and screen
  reader descriptions. The absolute value graph mirrors this structure exactly.
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` —
  Sinusoid reducer case (movePoint action with same-x constraint). Absolute value adds an
  analogous case.
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` —
  Sinusoid state initialization pattern. Absolute value follows the same approach.
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `SinusoidGraphState` type
  (`coords: [vec.Vector2, vec.Vector2]`). `AbsoluteValueGraphState` has the same shape.
- `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` —
  Sinusoid scoring block. Absolute value scoring is modeled after this but uses
  `{m, h, k}` directly (no canonical normalization needed — see [Scoring](#scoring)).

### Mafs Graphing Library

- `mafs` npm package — Provides `Plot.OfX` for rendering function curves on coordinate planes.
  Unlike tangent, absolute value has no discontinuities, so a single `<Plot.OfX>` covering the
  full x-range is sufficient.

## Mathematical Model

The absolute value curve uses the form:

```
f(x) = m * |x - h| + k
```

Where:
- `h` = horizontal offset (x-coordinate of the vertex, `coords[0][x]`)
- `k` = vertical offset (y-coordinate of the vertex, `coords[0][y]`)
- `m` = slope = `(y₂ - k) / |x₂ - h|`
  - `m > 0`: upward-opening V
  - `m < 0`: downward-opening V (inverted V)
  - `m = 0`: degenerate (horizontal line) — prevented by the same-x constraint

Two movable points define the curve:
- **coords[0]** — the vertex `(h, k)`, the tip of the V
- **coords[1]** — a second point `(x₂, y₂)` that determines the slope

### Key Differences from Sinusoid

- **No periodicity:** The curve extends to infinity in both directions without repeating.
- **No discontinuities:** `|x - h|` is defined and continuous everywhere — no asymptote
  handling needed, a single `<Plot.OfX>` suffices.
- **No canonical normalization for scoring:** There is only one set of `{m, h, k}` coefficients
  for any given absolute value curve, unlike sinusoids where `sin` curves can be expressed with
  multiple equivalent coefficient combinations. Direct `approximateDeepEqual` comparison works.
- **Constraint:** Same as sinusoid — the two points cannot share the same x-coordinate
  (would make `|x₂ - h| = 0` and `m` undefined).

## Solution Approach

The implementation follows the same patterns established by the sinusoid graph type.

### Rendering (`absolute-value.tsx`)

1. Compute `{m, h, k}` coefficients from the two movable point coordinates
2. Render `f(x) = m * |x - h| + k` as a single `<Plot.OfX>` (no segments needed)
3. Cache the last valid coefficients in a `ref` so the graph does not crash during
   transient invalid states (e.g., mid-drag)
4. Apply `getAbsoluteValueKeyboardConstraint` on each point to skip same-x positions

### Scoring

1. Extract `{m, h, k}` from both user and rubric coordinates using `getAbsoluteValueCoefficients`
2. Use `approximateDeepEqual` to compare the coefficient objects directly

No canonical normalization step is needed. For any two distinct points with different x-coordinates,
there is exactly one absolute value function of the form `m|x - h| + k` that passes through both.

### Constraints

- Two points **cannot share the same x-coordinate** (would make `m` undefined)
- Keyboard movement skips positions where `x₁ === x₂` using `getAbsoluteValueKeyboardConstraint`
- Drag moves that would place both points at the same x are rejected in the reducer

## Files Modified

### New files
- `packages/perseus/src/widgets/interactive-graphs/graphs/absolute-value.tsx` — Main component

### Modified files
- `packages/perseus-core/src/data-schema.ts` — `PerseusGraphTypeAbsoluteValue`, `AbsoluteValueGraphCorrect`, added to `PerseusGraphType` and `PerseusGraphCorrectType` unions
- `packages/perseus-core/src/parse-perseus-json/perseus-parsers/interactive-graph-widget.ts` — Parser for `absolute_value` graph type
- `packages/perseus-core/src/utils/generators/interactive-graph-widget-generator.ts` — `generateIGAbsoluteValueGraph()`
- `packages/perseus-core/src/index.ts` — Export `generateIGAbsoluteValueGraph`
- `packages/perseus/src/strings.ts` — Screen reader strings (`srAbsoluteValueGraph`, `srAbsoluteValueVertexPoint`, `srAbsoluteValueSecondPoint`, `srAbsoluteValueDescription`, `srAbsoluteValueInteractiveElements`)
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `AbsoluteValueGraphState`
- `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` — Render absolute value graph
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts` — `absoluteValue: { movePoint }` in actions registry
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` — `absolute_value` cases in `doMovePointInFigure` (throws) and `doMovePoint`
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` — `absolute_value` init case and `getAbsoluteValueCoords()`
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` — `absolute_value` case in `mafsStateToCurrentGraph`
- `packages/perseus/src/widgets/interactive-graphs/mafs-state-to-interactive-graph.ts` — `absolute_value` case
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` — `absolute_value` case in `getEquationString`
- `packages/perseus/src/widget-ai-utils/interactive-graph/interactive-graph-ai-utils.ts` — `absolute_value` cases in both exhaustive switches
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` — `withAbsoluteValue()` method, `AbsoluteValueGraphConfig` class
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` — `absoluteValueQuestion`, `absoluteValueQuestionWithDefaultCorrect`
- `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx` — `AbsoluteValue` story
- `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` — Absolute value scoring logic
- `packages/perseus-editor/.../interactive-graph-editor.tsx` — `absolute_value` case in graph merge switch
- `packages/perseus-editor/.../start-coords/util.ts` — `absolute_value` case in start-coords support check

## Decisions

1. **Reuse sinusoid patterns** — The absolute value graph follows the same two-point interaction
   model, keyboard constraint, `Plot.OfX` rendering, and coefficient-ref caching as the sinusoid
   graph type.

2. **Single `<Plot.OfX>` (no segment splitting)** — Unlike tangent, `|x - h|` is continuous
   everywhere. No discontinuity workaround is needed.

3. **No canonical normalization for scoring** — Each absolute value curve has a unique
   `{m, h, k}` representation. Direct `approximateDeepEqual` comparison is sufficient and correct.

4. **Ref-based coefficient caching** — `coeffRef` stores the last valid coefficients so the
   graph does not break during transient invalid states (e.g., mid-drag where points momentarily
   share an x-coordinate).

5. **Vertex as coords[0]** — Following the Grapher widget convention, `coords[0]` is the
   vertex `(h, k)` and `coords[1]` is the second point that determines slope. This matches
   the intuition that the vertex is the primary defining feature of the curve.

## Tasks

### Core implementation

- [x] Add `PerseusGraphTypeAbsoluteValue` to `data-schema.ts` and `PerseusGraphType` union
- [x] Add `AbsoluteValueGraphCorrect` to `data-schema.ts` and `PerseusGraphCorrectType` union
- [x] Add `AbsoluteValueGraphState` to `types.ts` and `InteractiveGraphState` union
- [x] Add `absolute_value` parser to `interactive-graph-widget.ts`
- [x] Add `absolute_value` case to `initialize-graph-state.ts`
- [x] Add `absolute_value` case to `interactive-graph-reducer.ts` (`doMovePoint` + `doMovePointInFigure`)
- [x] Add `absolute_value` case to `interactive-graph-state.ts` (`mafsStateToCurrentGraph`)
- [x] Add `absolute_value` case to `mafs-state-to-interactive-graph.ts`
- [x] Create `graphs/absolute-value.tsx` (rendering, coefficients, keyboard constraint, SR descriptions)
- [x] Register `renderAbsoluteValueGraph` in `mafs-graph.tsx`
- [x] Add `absoluteValue: { movePoint }` to the actions registry in `interactive-graph-action.ts`
- [x] Add `absolute_value` case to `getEquationString` in `interactive-graph.tsx`
- [x] Add `absolute_value` cases to `interactive-graph-ai-utils.ts`

### Scoring

- [x] Add `getAbsoluteValueCoefficients` and scoring block to `score-interactive-graph.ts`
- [x] Add dedicated scoring tests for absolute value in `score-interactive-graph.test.ts`

### i18n

- [x] Add screen reader strings to `strings.ts` (`srAbsoluteValueGraph`, `srAbsoluteValueVertexPoint`, `srAbsoluteValueSecondPoint`, `srAbsoluteValueDescription`, `srAbsoluteValueInteractiveElements`)

### Testing

- [x] Create `graphs/absolute-value.test.tsx` (rendering, point dragging, same-x constraint, SR output)

### Generators and test data

- [x] Add `generateIGAbsoluteValueGraph` to `interactive-graph-widget-generator.ts`
- [x] Export `generateIGAbsoluteValueGraph` from `packages/perseus-core/src/index.ts`
- [x] Add `absoluteValueQuestion` and `absoluteValueQuestionWithDefaultCorrect` to `interactive-graph.testdata.ts`
- [x] Add `withAbsoluteValue()` to `interactive-graph-question-builder.ts`

### Storybook

- [x] Add `AbsoluteValue` story to `interactive-graph.stories.tsx`

### Editor support

- [x] Add `absolute_value` case to the graph merge switch in `interactive-graph-editor.tsx`
- [x] Add `absolute_value` to the start-coords support check in `start-coords/util.ts`
- [x] Add `"Absolute value function"` option to `graph-type-selector.tsx` dropdown
- [x] Create `start-coords/start-coords-absolute-value.tsx` component (mirrors `start-coords-sinusoid.tsx`)
- [x] Wire up start-coords component in `start-coords-settings.tsx`
