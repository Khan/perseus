# Vector Graph - Interactive Graph Widget

## Overview

Research and plan for adding vector graph support to the Interactive Graph widget,
allowing content creators to define vector exercises using a draggable arrowhead tip,
a static tail dot, and a body grab handle that translates the entire vector.

- **Spike ticket:** LEMS-3972 — technical research (this document is the deliverable)
- **Implementation ticket:** LEMS-3971 — Add support for vector answer types
- **Design ticket:** LEMS-3929 — Original design (completed)
- **Primary reference:** Ray graph (`graphs/ray.tsx`) for patterns; composed from
  `useControlPoint`, `useDraggable`, and `Vector` component

## Scenarios

### Learner: Interacting with a Vector Graph

> As a learner working on physics or precalculus problems,
> I want to interact with a vector by dragging its tip point to change direction/magnitude
> or dragging the body to translate it,
> So that I can visually construct the correct vector and check my answer.

- A vector graph renders in the Interactive Graph widget as a directed line segment
  from tail to tip with an arrowhead at the tip
- The **tip arrowhead** is a draggable chevron control that changes the length and
  direction of the vector. It has halo / ring / focus-outline treatment matching
  the movable point, using stacked stroke widths on the chevron path. The focus
  outline is a separate rounded-triangle path that encloses the arrowhead and
  scales up smoothly on hover via CSS `transform: scale()` with
  `vector-effect: non-scaling-stroke`
- The **tail dot** is a static filled circle at the vector origin — not interactive.
  Its position is controlled by the body grab handle
- The **grab handle** (pill-shaped) on the vector body moves the entire vector while
  preserving its length and direction. It is **hidden by default** and only appears
  on hover, focus, or drag
- The graph has **two interactive elements**: the tip arrowhead and the body grab
  handle
- Keyboard navigation works on both elements (arrow keys move by snap step)
- If the tip would overlap with the tail after a move, the move skips to the next
  snap step gracefully
- The visible line is pulled back slightly (`LINE_PULLBACK_PX = 2`) from the tip
  so its stroke doesn't poke past the arrowhead shape
- The graph is scorable — the correct answer is compared by checking both the tail
  and tip coordinates with `approximateDeepEqual`
- Screen reader announces the graph label, tail and tip positions correctly
- The widget renders correctly on mobile

### Content Creator: Configuring a Vector Graph Exercise

> As a content creator building physics or precalculus exercises,
> I want to select Vector as an answer type in the Interactive Graph widget and configure
> its correct answer, starting positions, and axis settings,
> So that I can create accurate and customizable vector graph exercises for learners.

- "Vector" appears as a selectable option in the Interactive Graph editor's
  answer type dropdown
- Selecting vector renders the vector graph in the editor's correct answer preview
- The content creator can drag the tip point or the body grab handle to set the correct answer
- Start coordinates are supported — the editor can configure where the
  points start before the learner interacts
- Switching away from vector and back preserves the graph state correctly
- The editor does not crash or show TypeScript errors when vector is selected

## References

### Interactive Graph: Ray (Primary Reference)

The ray graph implementation is the closest structural match for the vector graph.
Both use two points (an endpoint and a direction-defining point) connected by a line
with an arrowhead. The key difference is that a ray extends to the edge of the graph,
while a vector is a finite segment with an arrowhead at the tip.

- `packages/perseus/src/widgets/interactive-graphs/graphs/ray.tsx` — Full implementation
  reference: two-point interaction model via `MovableLine`, body drag via `onMoveLine()`,
  individual point drags via `onMovePoint()`, and screen reader strings
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/movable-line.tsx` —
  Reference for the body grab handle pattern: the `Line` subcomponent uses `useDraggable`
  with a transparent hit target, cursor styling, focus outline, and keyboard navigation.
  The vector's grab handle follows this same pattern but is built as a standalone element
  rather than reusing `MovableLine` (which assumes two draggable endpoints)
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/vector.tsx` —
  Existing `Vector` rendering component used by locked figures. Renders a line from
  `tail` to `tip` with an `Arrowhead` at the tip. Can be reused or adapted for
  the interactive version
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/arrowhead.tsx` —
  The `Arrowhead` component uses inline path scaling (not CSS transform) to avoid
  scaling the stroke weight — this design already satisfies the requirement that
  arrowhead stroke weight should not increase on hover/focus

### Interactive Graph: Segment (Two-Point Pattern Reference)

- `packages/perseus/src/widgets/interactive-graphs/graphs/segment.tsx` — Two-point
  interaction model with body drag. Segments don't have arrows but share the same
  move pattern. Supports multiple segments — vector will be simpler (single segment).

### Interactive Graph: Locked Vector (Rendering Reference)

- `packages/perseus/src/widgets/interactive-graphs/locked-figures/locked-vector.tsx` —
  Locked (non-interactive) vector rendering. Uses the `Vector` component directly.
  The interactive version will need the same visual output but with draggable points
  and a grab handle on the body.

### Adding a New Graph Type (Implementation Checklist)

- `packages/perseus/src/widgets/interactive-graphs/__docs__/notes/new-graph-type.md` —
  The step-by-step checklist for adding any new graph type end-to-end. All 13 steps
  apply to the vector implementation. The Files Modified section below maps directly
  to that checklist.

## Mathematical Model

A vector is defined by two points: a **tail** (origin) and a **tip** (endpoint). Unlike
exponential, sinusoid, tangent, and logarithm graph types, vectors require no coefficient
extraction or mathematical formula. The vector is uniquely identified by its coordinate
pair `[tail, tip]`.

The component form `⟨dx, dy⟩` (where `dx = tip[0] - tail[0]`, `dy = tip[1] - tail[1]`)
is displayed in the editor as a convenience but is not used for scoring — scoring compares
the raw coordinates directly.

**No Grapher widget precedent:** The legacy Grapher widget does not have a vector type.
Vectors exist in the Interactive Graph widget only as locked figures (`LockedVectorType`).
This implementation promotes vectors from locked-only to a fully interactive graph type.

## Visual Design

From the design spec (LEMS-3929), updated after design review:

- **Default state:** A filled dot at the tail, a chevron arrowhead at the tip,
  solid line connecting them. The arrowhead is a straight-line chevron (90° opening,
  `strokeLinecap: round`). The body grab handle (pill-shaped) is hidden until
  the user hovers, focuses, or drags the line.
- **Arrowhead layers (centre → ring → halo):** The same chevron path at increasing
  stroke widths (2px → 5px → 12px), following the arrow shape. The halo is
  semi-transparent with a drop-shadow, matching the movable point's treatment.
- **Focus state:** A rounded-triangle outline encloses the arrowhead. This is a
  separate SVG path (not a thick stroke on the chevron) so it reads as a thin
  outline rather than a filled shape. It scales up smoothly on hover via
  CSS `transform: scale(1.15)` with `vector-effect: non-scaling-stroke`.
- **Hover state:** Centre / ring / halo stroke widths expand by 2px each. The
  focus outline scales up. The line stroke transitions from 2px to 4px.

## Interaction Model

### Tip Arrowhead

- Draggable chevron control at the end of the vector
- Dragging changes the vector's direction and magnitude; the tail stays fixed
- Rendered via `useControlArrowhead` hook (mirrors `useControlPoint`)
- Uses `MovableArrowheadView` for the visual — chevron path layers + focus outline
- Constrained to snap grid and graph bounds; cannot overlap with the tail

### Tail Dot

- Static filled circle at the vector origin (6px radius, interactive color)
- Not focusable, not draggable — purely visual
- Position is controlled exclusively by the body grab handle

### Body Grab Handle

- Pill-shaped handle positioned ~1/3 along the line from tail to tip
- **Hidden by default** — only rendered when the line is hovered, focused, or dragged
- Dragging translates both tail and tip by the same delta
- Preserves the vector's length and direction exactly
- Uses the same `getChange()` pattern as ray/segment/linear body drags in
  `doMoveLine`

### Keyboard Navigation

- Tab order: grab handle → tip arrowhead (two interactive elements)
- Arrow keys move by snap step
- Tip moves are constrained to avoid overlap with the tail
- Grab handle moves translate both points

## Solution Approach

The implementation composes the vector from low-level primitives rather than reusing
`MovableLine`. `MovableLine` assumes two independently draggable endpoints plus a
body grab handle (three interactive elements), but the vector design only has two
interactive elements: the tip point and the body grab handle. The tail is a visual
marker only.

### Rendering (`vector.tsx`)

The component is built from four layers:

1. **Body grab handle (`VectorBody`)** — a `<g>` element with `useDraggable`, containing:
   - A transparent `SVGLine` for a large click/touch target (`TARGET_SIZE`)
   - The visible line from tail to tip (pulled back `LINE_PULLBACK_PX` from tip)
   - A `PillDragHandle` — only rendered when active (hovered / focused / dragging)
   - `onMove` computes a delta and dispatches `actions.vector.moveVector(delta)`

2. **Tail dot (`TailDot`)** — a static filled `<circle>` at the tail position.
   Not interactive — purely visual. Moves when the body grab handle translates
   the whole vector.

3. **Tip arrowhead (`TipArrowhead`)** — a `useControlArrowhead` hook providing:
   - `focusableHandle` + `visibleArrowhead` (draggable chevron with outlines)
   - `onMove` dispatches `actions.vector.moveTip(destination)`
   - Keyboard constraint prevents overlap with the tail

4. **SR description** — hidden screen reader text with point coordinates

**Rendering order** (SVG paints in document order, later = on top):

```text
VectorBody (line + pill handle)
TailDot (static circle)
TipArrowhead (focusable handle + visible arrowhead)
SR description (hidden)
```

### New components

- **`movable-arrowhead-view.tsx`** — Presentational component for the arrowhead.
  Renders the chevron path at three stroke widths (centre 2px, ring 5px, halo 12px)
  plus a separate rounded-triangle focus outline path. Uses `.movable-arrowhead-*`
  CSS classes for hover/focus/drag states.
- **`use-control-arrowhead.tsx`** — Hook mirroring `useControlPoint`. Manages
  dual `useDraggable` (keyboard handle + visible element), focus state, and
  aria labels. Returns `{ focusableHandle, visibleArrowhead }`.

**Default state (no `startCoords`):** normalize raw seed coords via `normalizePoints`:

```typescript
// Default: tail at ~25% of range, tip at ~75% of range (horizontal vector)
return normalizePoints(range, step, [[0.25, 0.5], [0.75, 0.5]], true);
```

### Scoring

Vector scoring compares coordinates directly — no coefficient extraction needed.
A vector is uniquely defined by its tail and tip coordinates.

1. Check that both `userInput.coords` and `rubric.correct.coords` are present
2. Compare `userInput.coords[0]` (tail) with `rubric.correct.coords[0]` using
   `approximateDeepEqual`
3. Compare `userInput.coords[1]` (tip) with `rubric.correct.coords[1]` using
   `approximateDeepEqual`
4. Both must match for a correct answer — **order matters** (tail is tail, tip is tip)

Unlike ray (which uses `collinear` for the second point since any point on the ray
suffices), vector requires exact coordinate matching for both points because the
vector has a specific magnitude and position.

### Constraints

- **Overlap rejection (tip only)** — the tip cannot be moved to overlap with the tail;
  reject the move. Keyboard constraint uses a retry pattern similar to
  `getMovableLineKeyboardConstraint` to skip past the tail position
- **Bounds enforcement** — the tip must remain within the graph range after snapping
  to the grid; use `boundAndSnapToGrid()` in the reducer
- **Body drag bounds** — when translating both points, both must remain in bounds;
  use `getChange()` to compute the constrained delta (existing pattern from
  `doMoveLine`)

### Key Differences from Ray

| | Ray | Vector |
|---|---|---|
| Interactive elements | 2 draggable points + grab handle | 1 draggable control (tip arrowhead) + grab handle |
| Tail/endpoint | Independently draggable point | Static dot (non-interactive) |
| Tip control | Draggable point | Draggable `MovableArrowheadView` (chevron with outlines) |
| Line extension | Extends to graph edge with arrow | Finite segment, arrowhead at tip only |
| Tip scoring | Any collinear point is correct | Exact tip coordinates must match |
| Component | Reuses `MovableLine` | Custom composition (`useControlPoint` + `useControlArrowhead` + `useDraggable`) |
| Grab handle | Always visible | Hidden until hover / focus / drag |
| Arrowhead | At graph-edge intersection | At tip point position |
| Equation string | N/A (ray has no equation) | Component form `⟨dx, dy⟩` |

## Files Modified

### New files

- `packages/perseus/src/widgets/interactive-graphs/graphs/vector.tsx` — Main component
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/movable-arrowhead-view.tsx` — Arrowhead presentational component
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-arrowhead.tsx` — Arrowhead drag/focus hook

### Modified files

- `packages/perseus-core/src/data-schema.ts` — `PerseusGraphTypeVector`,
  added to `PerseusGraphType` and `PerseusGraphCorrectType` unions
- `packages/perseus-core/.../interactive-graph-widget.ts` — Parser for vector type
- `packages/perseus-score/.../score-interactive-graph.ts` — Vector scoring branch
- `packages/perseus/src/strings.ts` — SR strings:
  - `srVectorGraph` — `"A vector on a coordinate plane."`
  - `srVectorTipPoint` — `"Tip point at %(x)s comma %(y)s."`
  - `srVectorDescription` — full vector description including tail, tip, and
    component form
  - `srVectorInteractiveElements` — `"The graph has a draggable point and a
    draggable grab handle."`
  - `srVectorGrabHandle` — `"Vector from %(tailX)s comma %(tailY)s to %(tipX)s
    comma %(tipY)s. Use arrow keys to move."`
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` — Register
  vector type and `getVectorEquationString()` static method (component form
  `⟨dx, dy⟩`)
- `packages/perseus/src/widget-ai-utils/interactive-graph/interactive-graph-ai-utils.ts` —
  `VectorUserInput` type and case handlers
- `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` — Import and dispatch
  `renderVectorGraph()`
- `packages/perseus/src/widgets/interactive-graphs/mafs-state-to-interactive-graph.ts` —
  Vector case
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts` —
  Add `vector: { moveTip, moveVector }` to `actions`
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` —
  Add `doMoveTip` and vector case in `doMoveLine`
- `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` —
  Add vector case in `getGradableGraph()`
- `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` —
  Add `case "vector"`, implement and export `getVectorCoords()`
- `packages/perseus/src/widgets/interactive-graphs/types.ts` — `VectorGraphState`, add to
  `InteractiveGraphState` union
- `packages/perseus-editor/.../graph-type-selector.tsx` — Add "Vector" option
- `packages/perseus-editor/.../interactive-graph-editor.tsx` — Add `vector` case in
  `mergeGraphs`
- `packages/perseus-editor/.../start-coords/types.ts` — Add `vector` to
  `GraphTypesThatHaveStartCoords`
- `packages/perseus-editor/.../start-coords/util.ts` — Add `vector` case in
  `getDefaultGraphStartCoords` and `shouldShowStartCoordsUI`
- `packages/perseus-editor/.../start-coords/start-coords-settings.tsx` — `case "vector"`
  dispatching to `<StartCoordsPoint>` (two coordinate pairs — can reuse existing
  component since vector has no extra config like asymptote)
- `packages/perseus/src/index.ts` — Re-export `getVectorCoords`
- `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx` —
  Add Storybook story for vector
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` — Test
  fixtures; example: `{ type: "vector", coords: [[0, 0], [3, 4]] }` representing a
  vector from origin to (3, 4)
- `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` —
  Add `withVector()` + `VectorGraphConfig` class
- `.changeset/*.md` — Changeset entry

## Decisions

1. **Compose from primitives, not `MovableLine`** — `MovableLine` assumes two
   independently draggable endpoints plus a body grab handle (three interactive
   elements). The vector design has only two interactive elements: the tip point
   and the body grab handle. The tail is a visual marker, not a control point.
   Rather than fighting `MovableLine` to disable point1, we compose the vector
   from `useControlPoint` (tip), `useDraggable` (body grab handle), and the
   existing `Vector` rendering component (line + arrowhead).

2. **Ray as reference for patterns, not for reuse** — The ray graph is the closest
   structural analog and provides patterns for body drag (`doMoveLine` /
   `getChange()`), keyboard constraints, and SR strings. But the interaction
   model differs enough that the rendering component is built fresh.

3. **Custom arrowhead component, not the existing `Arrowhead`** — After design
   review, the tip control uses a new `MovableArrowheadView` with a straight-line
   chevron (not the bezier `Arrowhead`). The centre / ring / halo are the same
   chevron path at increasing stroke widths. The focus outline is a separate
   rounded-triangle path — this avoids the "blob" effect that thick round-joined
   strokes produce on a chevron. The existing `Arrowhead` component is unchanged
   and still used by locked vectors.

4. **Reuse `moveLine` action for body translation** — The existing `moveLine`
   action (used by ray/segment/linear) carries a delta. The vector's body grab
   handle dispatches the same action. A `moveTip` action handles the tip
   point independently.

5. **Exact coordinate scoring** — Unlike ray (which accepts any collinear point),
   vector scoring requires exact tail and tip coordinate matching via
   `approximateDeepEqual`. Order matters — `coords[0]` is always tail, `coords[1]`
   is always tip.

6. **No coefficient extraction** — A vector is uniquely defined by its two endpoint
   coordinates. There's no need for coefficient computation (unlike exponential,
   sinusoid, or quadratic). Scoring directly compares coordinates.

7. **`coords` shape matches ray** — `coords: CollinearTuple` (i.e.,
   `[Coord, Coord]`) — same as ray. This maximizes reuse of existing infrastructure
   (start coords UI, test data helpers, serialization).

8. **Equation string shows component form** — The editor displays the vector in
   component form `⟨dx, dy⟩` where `dx = tip[0] - tail[0]` and
   `dy = tip[1] - tail[1]`. This is the standard mathematical notation for vectors
   and gives content creators immediate feedback on the vector's magnitude and
   direction.

## PR Breakdown

The work ships as one spike PR and five implementation PRs. The structure mirrors the
exponential graph type (LEMS-3711) and absolute-value graph type (LEMS-3347) which
landed with the same PR breakdown.

### Spike — Spike deliverable

This document (`vector.md`) is the sole deliverable for the spike ticket.

**Branch:** `LEMS-3972`

**New files:**

- `packages/perseus/src/widgets/interactive-graphs/__docs__/notes/vector.md` — this file

---

### PR 1 — Types & stubs

Establishes the type contract and foundational setup. Defines all type shapes and
adds placeholder stubs so the type can enter the `PerseusGraphType` union without
breaking exhaustiveness checks.

**Branch:** `LEMS-3971/vector-pr1`

**New files:** *(none)*

**Modified files (12 total — originally planned 7, but `pnpm tsc` revealed 5 additional
exhaustiveness switches):**

| File | Change |
| --- | --- |
| `packages/perseus-core/src/data-schema.ts` | `PerseusGraphTypeVector` with `coords: CollinearTuple \| null`, `VectorGraphCorrect`, added to `PerseusGraphType` and `PerseusGraphCorrectType` unions |
| `packages/perseus-core/.../interactive-graph-widget.ts` | `parsePerseusGraphTypeVector` parser + registered in `parsePerseusGraphType` |
| `packages/perseus/src/widgets/interactive-graphs/types.ts` | `VectorGraphState` (type `"vector"`, `coords: PairOfPoints`), added to `InteractiveGraphState` union |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | Stub: `case "vector"` throws `"Not implemented"` |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` | Stub: `case "vector"` returns `""` for equation string |
| `packages/perseus-editor/.../interactive-graph-editor.tsx` | Exhaustiveness fix: `case "vector"` in `mergeGraphs` |
| `packages/perseus-editor/.../start-coords/util.ts` | Exhaustiveness fix: `case "vector"` in `shouldShowStartCoordsUI` |
| `packages/perseus/src/widget-ai-utils/interactive-graph/interactive-graph-ai-utils.ts` | Exhaustiveness fix: `case "vector"` in both `getGraphOptionsForProps` and `getUserInput` |
| `packages/perseus/src/widgets/interactive-graphs/mafs-state-to-interactive-graph.ts` | Exhaustiveness fix: `case "vector"` serialization stub |
| `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` | Stub: `case "vector"` throws `"Not implemented"` |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` | Exhaustiveness fix: added `"vector"` to `movePointInFigure` guard |
| `.changeset/*.md` | Changeset entry |

**Lesson learned:** The plan originally listed 7 files for PR 1, but running `pnpm tsc`
after the initial edits revealed 5 additional `UnreachableCaseError` switches that
needed stubs: `interactive-graph-ai-utils.ts` (2 switches), `mafs-state-to-interactive-graph.ts`,
`initialize-graph-state.ts`, and `interactive-graph-reducer.ts`. For future graph types,
expect ~12 files in the types-and-stubs PR — run `pnpm tsc` iteratively to catch all
exhaustiveness errors.

---

### PR 2 — State management

Actions, reducer, initializer, and serialization. The graph is stateful and interactive
but not yet visible (rendering still throws "Not implemented" from PR 1's stub).

**Branch:** `LEMS-3971/vector-pr2`

**New files:** *(none)*

**Modified files:**

**Modified files (11 total):**

| File | Change |
| --- | --- |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-action.ts` | `vector: { moveTip, moveVector }` actions — `moveTip` dispatches `movePoint(1, destination)`, `moveVector` dispatches `moveLine(0, delta)` |
| `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.ts` | `case "vector"` (replaces PR 1 stub), exports `getVectorCoords()`. Default coords: `[-5, 0]` → `[5, 0]` (horizontal vector) |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` | Vector case in `doMovePoint` (snap, bounds, overlap rejection) and `"vector"` added to `doMoveLine` case alongside `"linear"` / `"ray"` |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` | `getGradableGraph()` branch for vector (coords passthrough, same as ray) |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` | `vectorQuestion` and `vectorQuestionWithDefaultCorrect` fixtures |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph-question-builder.ts` | `withVector()` builder method + `VectorGraphConfig` class |
| `packages/perseus-core/src/utils/generators/interactive-graph-widget-generator.ts` | `generateIGVectorGraph()` generator (new pattern, replacing builder long-term) |
| `packages/perseus-core/src/index.ts` | Re-export `generateIGVectorGraph` |
| `packages/perseus/src/index.ts` | Re-export `getVectorCoords` |
| `packages/perseus/src/widgets/interactive-graphs/reducer/initialize-graph-state.test.ts` | Vector initialization tests (3 cases: coords provided, startCoords fallback, defaults) |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.test.ts` | Vector moveTip and moveVector tests (6 cases: basic move, hasBeenInteractedWith, overlap rejection, body translation, body hasBeenInteractedWith, bounds enforcement) |

**Note:** `mafs-state-to-interactive-graph.ts` was listed here in the original plan but
was completed in PR 1 — the exhaustiveness stub was already the full implementation
(simple coords passthrough). Also added `generateIGVectorGraph` generator alongside
the builder, following the codebase's migration toward generators (see PR #3415).

---

### PR 3 — Rendering & accessibility

The visual component and all strings. Replaces PR 1's stubs with real implementations.
The graph is now fully visible and interactive for learners.

**Branch:** `LEMS-3971/vector-pr3`

**New files:**

- `packages/perseus/src/widgets/interactive-graphs/graphs/vector.tsx` — rendering component (`VectorGraph`, `VectorBody`, `TailDot`, `TipArrowhead`)
- `packages/perseus/src/widgets/interactive-graphs/graphs/vector.test.tsx` — tests (SR strings, keyboard constraints, arrowhead rendering)
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/movable-arrowhead-view.tsx` — presentational SVG for the arrowhead (chevron layers + rounded-triangle focus outline)
- `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-arrowhead.tsx` — hook for arrowhead drag/focus behaviour (mirrors `useControlPoint`)

**Modified files:**

| File | Change |
| --- | --- |
| `packages/perseus/src/strings.ts` | Five SR strings for graph, tip, grab handle, description, and interactive elements |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | Replace stub with `renderVectorGraph()` dispatch |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` | Replace stub with real `getVectorEquationString()` case (component form `⟨dx, dy⟩`) |
| `packages/perseus/src/widget-ai-utils/interactive-graph/interactive-graph-ai-utils.ts` | `VectorUserInput` type and case handlers |
| `packages/perseus/src/widgets/interactive-graphs/__docs__/interactive-graph.stories.tsx` | Storybook story |
| `packages/perseus/src/widgets/interactive-graphs/mafs-styles.css` | `.movable-arrowhead-*` CSS classes (centre/ring/halo stroke layers, focus outline with scale transform, hover/focus/drag states) and `.movable-vector-line` styling |

---

### PR 4 — Scoring

Scoring branch in `perseus-score`. The graph is now gradeable.

**Branch:** `LEMS-3971/vector-pr4`

**New files:** *(none)*

**Modified files:**

| File | Change |
| --- | --- |
| `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.ts` | Vector scoring branch: `approximateDeepEqual(userInput.coords[0], rubric.correct.coords[0]) && approximateDeepEqual(userInput.coords[1], rubric.correct.coords[1])` |
| `packages/perseus-score/src/widgets/interactive-graph/score-interactive-graph.test.ts` | Scoring unit tests: correct, incorrect tail, incorrect tip, default (not interacted) |

---

### PR 5 — Editor support

Surfaces the vector type in the content-creator UI. Once landed, content creators
can author vector graph exercises.

**Branch:** `LEMS-3971/vector-pr5`

**New files:** *(none — reuses `StartCoordsPoint` since vector has no extra config)*

**Modified files:**

| File | Change |
| --- | --- |
| `packages/perseus-editor/.../components/graph-type-selector.tsx` | Add `"Vector"` option to dropdown (gated behind `interactive-graph-vector` feature flag) |
| `packages/perseus-editor/.../interactive-graph-editor.tsx` | Full `"vector"` case in `mergeGraphs` (replaces PR 1 stub) |
| `packages/perseus-editor/.../start-coords/types.ts` | Add `"vector"` to `GraphTypesThatHaveStartCoords` |
| `packages/perseus-editor/.../start-coords/util.ts` | Full `"vector"` cases in `getDefaultGraphStartCoords` and `shouldShowStartCoordsUI` |
| `packages/perseus-editor/.../start-coords/start-coords-settings.tsx` | `case "vector"` dispatching to `<StartCoordsPoint>` with two coordinate pair inputs |
