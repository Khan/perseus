# Adding a New Graph Type to Interactive Graph

This document walks through all the files you need to touch to add a new interactive graph type. The examples below use a hypothetical `"vector-sum"` graph type as illustration; replace it with your actual type name.

---

## Overview of the Architecture

When a user interacts with an interactive graph, data flows like this:

```
PerseusGraphType (JSON / data schema)
        ↓  initializeGraphState()
InteractiveGraphState (internal reducer state)
        ↓  interactiveGraphReducer()  ←  InteractiveGraphAction
InteractiveGraphState (updated)
        ↓  renderGraphElements()
React components (Mafs SVG)
        ↓  getUserInput() → getGradableGraph()
PerseusGraphType (answer / user input)
        ↓  scoreInteractiveGraph()
Score result
```

Each graph type needs representation at every level of this pipeline.

---

## Step-by-Step Checklist

### 1. Define the public data type

**File:** `packages/perseus-core/src/data-schema.ts`

Add a new named type for your graph:

```typescript
export type PerseusGraphTypeVectorSum = {
    type: "vector-sum";
    // The answer coordinates (set by the editor after interaction)
    coords?: [Coord, Coord] | null;
    // The initial coordinates to render with
    startCoords?: [Coord, Coord];
    // Any type-specific config options go here
};
```

Then add it to the `PerseusGraphType` union (~line 905):

```typescript
export type PerseusGraphType =
    | PerseusGraphTypeAngle
    | PerseusGraphTypeCircle
    // ... existing types ...
    | PerseusGraphTypeVectorSum; // add here
```

**Note:** The `coords` field is typically `null` until the user interacts, and is populated by `getGradableGraph()` when the user submits.

---

### 2. Define the internal state type

**File:** `packages/perseus/src/widgets/interactive-graphs/types.ts`

Add your graph's state interface, extending `InteractiveGraphStateCommon`:

```typescript
export interface VectorSumGraphState extends InteractiveGraphStateCommon {
    type: "vector-sum";
    coords: [Coord, Coord];
    // Add any runtime-only state (e.g., focus tracking, interaction mode)
}
```

Then add it to the `InteractiveGraphState` union (~line 31):

```typescript
export type InteractiveGraphState =
    | AngleGraphState
    // ... existing types ...
    | VectorSumGraphState; // add here
```

`InteractiveGraphStateCommon` provides:
- `hasBeenInteractedWith: boolean`
- `range: [xRange: Interval, yRange: Interval]`
- `snapStep: vec.Vector2`

---

### 3. Define actions

**File:** `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts`

Add action constants, interfaces, and factory functions:

```typescript
export const MOVE_VECTOR_SUM_POINT = "move-vector-sum-point";

interface MoveVectorSumPoint {
    type: typeof MOVE_VECTOR_SUM_POINT;
    pointIndex: 0 | 1;
    destination: Coord;
}

function moveVectorSumPoint(
    pointIndex: 0 | 1,
    destination: Coord,
): MoveVectorSumPoint {
    return {type: MOVE_VECTOR_SUM_POINT, pointIndex, destination};
}
```

Add your new action type(s) to the `InteractiveGraphAction` union, and add an entry in the `actions` export object:

```typescript
export const actions = {
    // ... existing entries ...
    vectorSum: {
        movePoint: moveVectorSumPoint,
    },
};
```

---

### 4. Handle initialization

**File:** `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts`

Add a `case` to the `initializeGraphState` switch (~line 42) to convert the `PerseusGraphType` → `InteractiveGraphState`:

```typescript
case "vector-sum":
    return {
        ...shared,
        type: "vector-sum",
        coords: getVectorSumCoords(graph, range, step),
    };
```

Then implement `getVectorSumCoords()`:

```typescript
export function getVectorSumCoords(
    graph: PerseusGraphTypeVectorSum,
    range: [x: Interval, y: Interval],
    step: [x: number, y: number],
): [Coord, Coord] {
    if (graph.coords) {
        return graph.coords;
    }
    if (graph.startCoords) {
        return graph.startCoords;
    }
    // Return sensible defaults, normalized to the graph's range/step
    return normalizePoints(range, step, [[0.25, 0.5], [0.75, 0.5]], true);
}
```

This function is also exported and used by the editor's `StartCoordsSettings` component (see Step 9).

---

### 5. Handle state transitions in the reducer

**File:** `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts`

Add handling for your new action in the main switch statement (~line 86). You can either add a new `case` at the top level or extend an existing one if your action type is shared (e.g., `MOVE_POINT`):

```typescript
case MOVE_VECTOR_SUM_POINT:
    return doMoveVectorSumPoint(state, action);
```

Implement the reducer function. Use `boundAndSnapToGrid()` to constrain movement to the graph's snap grid:

```typescript
function doMoveVectorSumPoint(
    state: InteractiveGraphState,
    action: MoveVectorSumPoint,
): InteractiveGraphState {
    if (state.type !== "vector-sum") {
        return state;
    }
    const newCoords = state.coords.map((coord, i) =>
        i === action.pointIndex
            ? boundAndSnapToGrid(action.destination, state)
            : coord,
    ) as [Coord, Coord];
    return {
        ...state,
        hasBeenInteractedWith: true,
        coords: newCoords,
    };
}
```

Other utility functions available in the reducer file:
- `boundToEdgeAndSnapToGrid()` — keeps points strictly inside the graph
- `snap()` / `clamp()` — for manual snapping/clamping
- `angleSidePointsTooCloseToVertex()`, `polygonSidesIntersect()` — validation helpers

---

### 6. Convert state back to gradable graph

**File:** `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts`

Add a branch to `getGradableGraph()` (~line 4) so that internal state is serialized back to the `PerseusGraphType` format when the user submits:

```typescript
if (state.type === "vector-sum" && initialGraph.type === "vector-sum") {
    return {
        ...initialGraph,
        coords: state.coords,
    };
}
```

Make sure this is added before the final `throw` at the bottom of the function.

---

### 7. Implement the graph component

**File:** `packages/perseus/src/widgets/interactive-graphs/graphs/vector-sum.tsx` (new file)

Create the render function and component. The pattern used by every existing graph type:

```typescript
import * as React from "react";
import {actions} from "../reducer/interactive-graph-action";
import {MovablePoint} from "./components/movable-point";
import type {Dispatch, InteractiveGraphElementSuite, MafsGraphProps} from "../types";
import type {VectorSumGraphState} from "../types";
import type {I18nContextType} from "../../../strings";

export function renderVectorSumGraph(
    state: VectorSumGraphState,
    dispatch: Dispatch,
    i18n: I18nContextType,
): InteractiveGraphElementSuite {
    return {
        graph: <VectorSumGraph graphState={state} dispatch={dispatch} />,
        interactiveElementsDescription: getVectorSumDescription(state, i18n),
    };
}

function VectorSumGraph(props: MafsGraphProps<VectorSumGraphState>) {
    const {graphState, dispatch} = props;
    const {coords} = graphState;

    return (
        <>
            {coords.map((coord, i) => (
                <MovablePoint
                    key={i}
                    point={coord}
                    onMove={(destination) =>
                        dispatch(
                            actions.vectorSum.movePoint(i as 0 | 1, destination),
                        )
                    }
                />
            ))}
            {/* Render lines, shapes, etc. */}
        </>
    );
}

function getVectorSumDescription(
    state: VectorSumGraphState,
    i18n: I18nContextType,
): React.ReactNode {
    // Return a screen-reader description of the graph's current state.
    // See graphs/screenreader-text.ts for helper utilities.
    return null;
}
```

Reusable components available in `graphs/components/`:
- `MovablePoint` — draggable point with keyboard support
- `MovableLine` — draggable line segment
- `useControlPoint` — hook for controlling a single draggable point
- `Hairlines` — crosshair lines extending from a point
- `TextLabel`, `AngleIndicator`, `Arrowhead`, `SvgLine` — rendering utilities

---

### 8. Register the render function in MafsGraph

**File:** `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx`

Import your render function at the top:

```typescript
import {renderVectorSumGraph} from "./graphs/vector-sum";
```

Add a `case` to the `renderGraphElements` switch (~line 748):

```typescript
case "vector-sum":
    return renderVectorSumGraph(state, dispatch, i18n);
```

The `default` branch of this switch uses `UnreachableCaseError`, so TypeScript will give a compile error if you add to `InteractiveGraphState` without also adding the case here.

---

### 9. Implement scoring

**File:** `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts`

Add a new branch to `scoreInteractiveGraph()`. The function returns `{type: "points", earned: 0 | 1, total: 1, message: null}`:

```typescript
} else if (
    userInput.type === "vector-sum" &&
    rubric.correct.type === "vector-sum" &&
    userInput.coords != null &&
    rubric.correct.coords != null
) {
    const correct = approximateDeepEqual(
        [...userInput.coords].sort(),
        [...rubric.correct.coords].sort(),
    );
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
```

Available scoring utilities in this file and nearby:
- `approximateEqual(a, b)` — floating-point equality for scalars
- `approximateDeepEqual(a, b)` — floating-point equality for nested structures
- `geometry.collinear(p1, p2, p3)` — check collinearity
- `geometry.similar(polygon1, polygon2, tolerance)` — polygon similarity
- `getSinusoidCoefficients()`, `getQuadraticCoefficients()` — shape coefficient extractors
- `canonicalSineCoefficients()` — normalize sinusoid for comparison

---

### 10. Add to the editor's graph type selector

**File:** `packages/perseus-editor/src/widgets/interactive-graph-editor/components/graph-type-selector.tsx`

Add an `<OptionItem>` for the new type (~line 18):

```tsx
<OptionItem value="vector-sum" label="Vector Sum" />
```

---

### 11. Add start-coords support in the editor

**File:** `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-settings.tsx`

Import your `getVectorSumCoords` helper (it must be exported from `initialize-graph-state.ts` and re-exported from the `@khanacademy/perseus` package):

```typescript
import {getVectorSumCoords} from "@khanacademy/perseus";
```

Add a `case` to the `StartCoordsSettingsInner` switch (~line 44) to show coordinate inputs for authors:

```typescript
case "vector-sum":
    const vectorSumCoords = getVectorSumCoords(props, range, step);
    return (
        <StartCoordsPoint
            startCoords={vectorSumCoords}
            onChange={onChange}
        />
    );
```

Reuse one of the existing `StartCoords*` components if the coordinate shape matches, or create a new one in `start-coords/` if needed.

---

### 12. Add type-specific answer options in the editor (if needed)

If your graph type needs configuration controls in the editor (e.g., number of sides, snap mode, match type), create a new component:

**File:** `packages/perseus-editor/src/widgets/interactive-graph-editor/components/vector-sum-answer-options.tsx`

Then import it in the editor and render it conditionally based on `this.props.graph?.type`:

**File:** `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx`

Look for where `AngleAnswerOptions`, `PolygonAnswerOptions`, etc. are rendered and follow the same pattern.

---

## Summary Table

| What | File | Notes |
|------|------|-------|
| Public data type | `perseus-core/src/data-schema.ts` | Add `PerseusGraphTypeXxx` and add to `PerseusGraphType` union |
| Internal state type | `interactive-graphs/types.ts` | Add `XxxGraphState`, add to `InteractiveGraphState` union |
| Actions | `reducer/interactive-graph-action.ts` | Add constants, interfaces, factory fns, and entry in `actions` |
| State initialization | `reducer/initialize-graph-state.ts` | Add `case` in `initializeGraphState`, implement `getXxxCoords()` |
| Reducer transitions | `reducer/interactive-graph-reducer.ts` | Add `case` in main switch, implement `doXxx()` functions |
| Gradable output | `reducer/interactive-graph-state.ts` | Add `if` branch in `getGradableGraph()` |
| Graph component | `graphs/xxx.tsx` (new file) | Implement `renderXxxGraph()` and graph React component |
| Render dispatch | `mafs-graph.tsx` | Import and add `case` in `renderGraphElements()` switch |
| Scoring | `perseus-score/.../score-interactive-graph.ts` | Add `else if` branch in `scoreInteractiveGraph()` |
| Editor selector | `interactive-graph-editor/components/graph-type-selector.tsx` | Add `<OptionItem>` |
| Editor start coords | `interactive-graph-editor/start-coords/start-coords-settings.tsx` | Add `case` in switch |
| Editor answer options | `interactive-graph-editor/components/xxx-answer-options.tsx` | New file if type-specific controls needed |

---

## Tips

- **TypeScript exhaustiveness:** Both `initializeGraphState` and `renderGraphElements` use `UnreachableCaseError` / `throw` on the default branch. TypeScript will report a compile error if you add a type to the union without handling it in those switches — use this as your checklist.
- **Accessibility:** Each graph component must return an `interactiveElementsDescription` node. See `graphs/screenreader-text.ts` for helper utilities that format numbers and coordinates for screen readers.
- **Snap & bound:** Always use `boundAndSnapToGrid()` (or `boundToEdgeAndSnapToGrid()`) when processing user movement in the reducer to keep points on the grid and within bounds.
- **Test data:** Add a fixture for your graph type in `interactive-graph.testdata.ts` and write unit tests for your scoring logic and reducer following the existing test patterns.
- **Export:** If `getXxxCoords()` is needed by the editor's start-coords UI, export it from `initialize-graph-state.ts` and ensure it is re-exported from the `@khanacademy/perseus` package's `index.ts`.
