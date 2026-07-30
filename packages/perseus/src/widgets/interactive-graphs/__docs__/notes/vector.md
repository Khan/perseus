# Vector Graph — Technical Reference

Technical specification for the vector graph type in the Interactive Graph widget. This document
defines expected behavior, architecture, and design decisions. It is intended as context for
future development and Claude Code sessions.

The vector graph is a **net-new** interactive graph type introduced in Interactive Graph Phase 2
(IGP2). Unlike most other graph types (sinusoid, exponential, logarithm, tangent, absolute value),
it has **no Grapher-widget predecessor** — there is no legacy vector implementation to mirror, so
the mathematical model and scoring were designed fresh.

## Traceability

- **Original ticket / PR series:** [LEMS-3971](https://khanacademy.atlassian.net/browse/LEMS-3971)
  — built across a multi-PR series (`vector-pr3` rendering & accessibility (#3441), `vector-pr4`
  congruent scoring, etc.).
- **Follow-ups:**
  - [LEMS-4231](https://khanacademy.atlassian.net/browse/LEMS-4231) (#3721) — removed the tail dot
    and increased arrowhead/line sizing (switched to Wonder Blocks sizing tokens).
  - [LEMS-4353](https://khanacademy.atlassian.net/browse/LEMS-4353) — extended the HTML hitbox to
    the vector's draggables so touch drags don't scroll the page (Safari).
  - Vector graph description polish (#3799) — richer screen-reader description
    (magnitude + direction).
  - [LEMS-3976](https://khanacademy.atlassian.net/browse/LEMS-3976) — removed the
    `interactive-graph-vector` feature flag; the type is now available unconditionally.

## Architecture Overview

### File Map

| File | Purpose |
|------|---------|
| `graphs/vector.tsx` | Main rendering component: vector body (grab handle), tip arrowhead, hairlines, SR description; `getVectorTipKeyboardConstraint` |
| `graphs/components/use-control-arrowhead.tsx` | `useControlArrowhead` — draggable arrowhead control (mirrors `useControlPoint`, renders `MovableArrowheadView`) |
| `graphs/components/movable-arrowhead-view.tsx` | `MovableArrowheadView` — the visible arrowhead + focus ring |
| `graphs/components/movable-pill-handle.tsx` | Pill-shaped SVG drag handle (shared with exp/log asymptotes) — the vector body's grab handle |
| `graphs/components/hitbox.tsx` | `useHitbox` — HTML hitbox for pointer/touch drags (line shape for the body, box shape for the tip) |
| `graphs/components/hairlines.tsx` | `Hairlines` — crosshairs shown while the tip is dragged/focused |
| `graphs/components/vector.tsx` | `Vector` — shared **presentational** vector (line + arrowhead, no interaction); used by locked figures, angle rays, and ray/linear extension arrows, **but not** the interactive *vector* graph body (see [Shared `Vector` component](#shared-vector-presentational-component)) |
| `graphs/strings/vector.ts` | `describeVectorGraph()` + `srVectorPointLabel()` — SR strings |
| `reducer/interactive-graph-action.ts` | `actions.vector.moveTip` / `actions.vector.moveVector` |
| `reducer/interactive-graph-reducer.ts` | Tip move (shared `ray`/`linear`/`vector` `MOVE_POINT` case) and body translation (shared `MOVE_LINE` case) |
| `reducer/initialize-graph-state.ts` | `getVectorCoords()` — default coords |
| `reducer/interactive-graph-state.ts` | `getGradableGraph` serialization for vector |
| `mafs-state-to-interactive-graph.ts` | Vector state → persisted data conversion |
| `mafs-graph.tsx` | Registers the vector graph type (`renderVectorGraph` in the `renderGraphElements` switch) |
| `get-equation-string.ts` | `getVectorEquationString()` — component-form `⟨dx, dy⟩` display string |
| `types.ts` | `VectorGraphState` (`coords: PairOfPoints`) |
| `interactive-graph.testdata.ts` | `vectorQuestion` fixture (built via `generateIGVectorGraph` + `generateInteractiveGraphQuestion`) |
| `@khanacademy/perseus-core` `data-schema.ts` | `PerseusGraphTypeVector`, `VectorGraphCorrect` |
| `@khanacademy/perseus-core` `parse-perseus-json/.../interactive-graph-widget.ts` | `parsePerseusGraphTypeVector` parser branch |
| `@khanacademy/perseus-core` generators | `generateIGVectorGraph()` |
| `@khanacademy/perseus-score` `sub-scorers/score-vector.ts` | `scoreVector()` (`score-interactive-graph.ts` dispatches to it) |
| `@khanacademy/perseus-editor` `components/vector-answer-options.tsx` | "Student answer must" match selector (exact / congruent) |
| `@khanacademy/perseus-editor` `start-coords/start-coords-vector.tsx` | Editor start coords UI |
| `@khanacademy/perseus-editor` `graph-type-selector.tsx` | "Vector" option |
| `widget-ai-utils/interactive-graph/interactive-graph-ai-utils.ts` | `VectorGraphOptions` / `VectorUserInput` + `getGraphOptionsForProps`/`getUserInput` cases |

### Data Flow

```
User interaction (drag/keyboard)
  → Dispatch action:
      • tip drag  → actions.vector.moveTip   → movePointInFigure(0, 1, destination)  (MOVE_POINT)
      • body drag → actions.vector.moveVector → moveLine(0, newStart)                (MOVE_LINE)
  → Reducer:
      • tip:  boundToEdgeAndSnapToGrid, reject if tip would overlap tail (coordsOverlap)
      • body: constrainShapePreservingMove (rigid translation, kept in range)
    updates VectorGraphState.coords and emits a stateAnnouncement (WB Announcer)
  → VectorGraph component re-renders:
      1. Hairlines (only while tip is dragged/focused and markings ≠ "none")
      2. VectorBody: visible line (pulled back from the tip) + pill grab handle
      3. Tip arrowhead: focusable handle + visible arrowhead
      4. Hidden SR description
  → On submit: getGradableGraph extracts coords ([tail, tip])
  → Scoring: exact (tail & tip) or congruent (component form ⟨dx, dy⟩) via approximateDeepEqual
```

## Expected Behavior

### Two interactive elements

A vector is defined by two coordinates, `coords = [tail, tip]`, and exposes **two** interactive
elements:

1. **The vector body** — a grab handle that **translates the whole vector** (tail and tip move by
   the same delta, preserving length and direction).
2. **The tip arrowhead** — a draggable arrowhead that changes the vector's **direction and
   magnitude** (the tail stays put).

There is no independent tail handle; the tail moves only via the body translation.

### Vector body (translation)

- Renders the visible line from tail to tip. The line is pulled back from the tip by
  `LINE_PULLBACK_PX = 4` so its stroke doesn't poke past the arrowhead shape.
- Line stroke uses the graph's `interactiveColor` and Wonder Blocks `sizing.size_020` width
  (LEMS-4231).
- A pill-shaped drag handle (`MovablePillHandle`) is rendered at the **midpoint** of the line
  (`handleT = 1/2`), rotated to the vector's on-screen angle. It is only visible while the body is
  **hovered, focused, or dragging** (`active`).
- Dragging translates the vector rigidly via `constrainShapePreservingMove`, which keeps the whole
  vector within the graph range and snapped to the grid.
- Keyboard dragging lives on the focusable SVG `<g role="button">`; pointer/touch dragging runs
  through an HTML hitbox (a **line-shaped** hitbox, `TARGET_SIZE = 44` thick — see
  [Mobile](#mobile)). On mouse-drag end the body blurs so no focus ring lingers.

### Tip arrowhead (direction + magnitude)

- Built with `useControlArrowhead` (which mirrors `useControlPoint` but renders a
  `MovableArrowheadView` instead of a point view). The arrowhead is oriented along the vector via
  `calculateAngleInDegrees`.
- Dragging the tip changes direction and magnitude; the tail is unaffected.
- Keyboard dragging lives on an invisible focusable handle; pointer/touch dragging runs through a
  **box-shaped** HTML hitbox (`HANDLE_HITBOX_SIZE_PX`). Starting a mouse drag focuses the keyboard
  handle so the user can continue with the keyboard afterward.

### Overlap constraint

- The tail and tip can **never overlap** (a zero-length vector has no defined direction).
  - **Pointer/keyboard tip moves:** the reducer rejects any move where `coordsOverlap(newCoords)`
    is true (the shared `ray`/`linear`/`vector` `MOVE_POINT` case), leaving the state unchanged.
  - **Keyboard tip moves:** `getVectorTipKeyboardConstraint` additionally skips one extra snap step
    in the direction of travel if a step would land the tip exactly on the tail.
  - **Body translation** preserves the shape, so it can't create an overlap.

### Keyboard navigation

- **Body:** arrow keys translate the whole vector by the snap step (snapped via `snap(snapStep, p)`),
  clamped to the range by `constrainShapePreservingMove`.
- **Tip:** arrow keys move the tip by the snap step, with the tail-overlap skip described above.

### Hairlines

- While the tip is dragged or focused (and `markings !== "none"`), `Hairlines` draw crosshairs
  through the tip. They render **first** in the group so they paint behind the line and handles.

### SVG rendering order

The graph `<g>` renders children in this back-to-front order:

1. **Hairlines** (conditional) — bottom layer
2. **Vector body** — visible line + pill grab handle
3. **Tip arrowhead** — focusable handle + visible arrowhead
4. **Hidden SR description** (`SRDescInSVG`)

### Scoring

- Handled by `scoreVector()` in `sub-scorers/score-vector.ts`.
- Returns `{type: "invalid"}` if either the user's or the rubric's `coords` are missing.
- **`match: "exact"` (default):** both tail and tip must match — `approximateDeepEqual` on
  `coords[0]` and `coords[1]`.
- **`match: "congruent"`:** same direction and magnitude at any position — compares the **component
  form** `⟨dx, dy⟩` (`tip − tail`) of each vector with `approximateDeepEqual`.
- No canonical normalization (a vector has a single unambiguous `[tail, tip]` representation; the
  congruent case is handled by comparing deltas, not by normalizing).

### Accessibility

- `aria-label` on the graph container (`srVectorGraph`, "A vector on a coordinate plane.").
- The graph description (`describeVectorGraph` → `srVectorDescription`) combines:
  - `srVectorPoints` — tail and head coordinates, and
  - `srVectorMagnitudeDirection` — the vector's **magnitude** (length) and **direction** (angle
    measured counterclockwise from the positive x-axis, normalized to `[0, 360)` degrees).
- Element labels: the body grab handle uses `srVectorGrabHandle`; the tip uses `srVectorHeadPoint`
  ("Vector head at X comma Y."). `srVectorPointLabel` maps point index 0 → generic
  `srPointAtCoordinates` (tail) and index 1 → `srVectorHeadPoint` (tip).
- Interactive-elements description via `srInteractiveElements`.
- Tip/body moves are announced to screen readers via the WB Announcer (the reducer's
  `stateAnnouncement`: `move-vector-point` / `move-vector-line`), consumed in
  `stateful-mafs-graph.tsx`.
- All number values use `srFormatNumber` for locale-appropriate formatting.

### Editor

- "Vector" appears unconditionally in the graph type selector (`graph-type-selector.tsx`). The old
  `interactive-graph-vector` feature flag was removed (LEMS-3976).
- `VectorAnswerOptions` renders a "Student answer must" selector (`TypedSingleSelect`) with options
  **"match exactly"** (`exact`) and **"be congruent"** (`congruent`), plus an `InfoTip` explaining
  that congruency requires only equal direction and magnitude.
- `StartCoordsVector` provides the start-coordinate inputs.
- The Content Editor shows the vector's component form `⟨dx, dy⟩` (3 decimals) via
  `getVectorEquationString()`.

### Mobile

- Both interactions (translate via body, drag the tip) work via touch.
- Pointer/touch dragging goes through HTML hitboxes rather than SVG elements: a **line** hitbox for
  the body (thickness `TARGET_SIZE = 44`) and a **box** hitbox for the tip
  (`HANDLE_HITBOX_SIZE_PX`). Safari ignores `touch-action` on SVG, so real-HTML hitboxes with
  `touch-action: none` are what reliably capture the drag while letting the page scroll over the
  rest of the graph (LEMS-4353). Keyboard dragging stays on the focusable SVG groups.

## Mathematical Model

A vector is stored as its two endpoints `coords = [tail, tip]`. Derived quantities:

- **Component form:** `⟨dx, dy⟩ = ⟨tip.x − tail.x, tip.y − tail.y⟩`
- **Magnitude:** `√(dx² + dy²)`
- **Direction:** `atan2(dy, dx)` in degrees, normalized to `[0, 360)`

Because the tail and tip can never overlap, the magnitude is always positive and the direction is
always well-defined.

## State Management

### `VectorGraphState`

```typescript
interface VectorGraphState extends InteractiveGraphStateCommon {
    type: "vector";
    coords: PairOfPoints; // [tail, tip]
}
```

`InteractiveGraphStateCommon` supplies the shared fields (`snapStep`, `range`,
`hasBeenInteractedWith`, etc.). There is no vector-specific extra state (contrast the asymptote
graphs, which add an `asymptote` field).

### Actions

Reuses existing action creators (no new action types):

- `actions.vector.moveTip(destination)` → `movePointInFigure(0, 1, destination)` (a `MOVE_POINT`,
  figure index 0, point index 1 = the tip).
- `actions.vector.moveVector(newStart)` → `moveLine(0, newStart)` (a `MOVE_LINE`, shared with ray
  and linear).

### Reducer

- **Tip move** — the shared `ray` / `linear` / `vector` `MOVE_POINT` case: `boundToEdgeAndSnapToGrid`,
  then reject the move if `coordsOverlap(newCoords)` (tip on tail). Emits a `move-vector-point`
  announcement.
- **Body translation** — the shared `ray` / `linear` / `vector` `MOVE_LINE` case:
  `constrainShapePreservingMove` translates both endpoints rigidly within the range. Emits a
  `move-vector-line` announcement.

### Defaults

`getVectorCoords()` returns `graph.coords` → `graph.startCoords` → a default **45° diagonal**
vector in the upper-right area: `normalizePoints(range, step, [[0.6, 0.6], [0.85, 0.85]])`. Equal
x/y offsets give a true 45° angle on a square grid.

## Decisions Log

1. **Net-new type, no Grapher predecessor** — The vector graph has no legacy Grapher
   implementation, so the model (`[tail, tip]` endpoints, component-form scoring) was designed
   fresh rather than ported.

2. **Two interactive elements: body + tip (no tail handle)** — The tail is repositioned only by
   translating the whole vector via the body grab handle; the tip handle changes direction and
   magnitude. This keeps the interaction to a translate handle plus a single endpoint, matching how
   a vector is conceptually manipulated.

3. **Reuse `MOVE_POINT` / `MOVE_LINE` (shared with ray/linear)** — No new action types; the tip is a
   figure point move and the body is a line move, so vector piggybacks on the existing ray/linear
   reducer cases.

4. **Arrowhead control instead of a point** — The tip uses `useControlArrowhead` /
   `MovableArrowheadView` (an arrowhead that points along the vector) rather than a `MovablePoint`,
   so the draggable affordance reads as the vector's head. `useControlArrowhead` deliberately
   mirrors `useControlPoint`'s drag/keyboard/focus behavior.

5. **Tail and tip may never overlap** — A zero-length vector has no direction, so overlap is
   rejected at the reducer (`coordsOverlap`) and skipped by the keyboard constraint
   (`getVectorTipKeyboardConstraint`). Body translation preserves shape and can't create an overlap.

6. **Component-form congruent scoring** — Congruency compares `⟨dx, dy⟩` deltas rather than
   normalizing to a canonical position, which naturally makes "same direction and magnitude, any
   position" score as correct while exact matching also checks the endpoints.

7. **HTML hitboxes for touch (LEMS-4353)** — Pointer/touch dragging runs through HTML
   hitboxes (line-shaped for the body, box-shaped for the tip) rather than SVG hit targets, because
   Safari ignores `touch-action` on SVG. Keyboard dragging stays on the focusable SVG groups.
   (This is one of two Mafs workarounds — see [mafs-workarounds.md](./mafs-workarounds.md).)

8. **Grab handle is midpoint-only and appears on interaction** — The pill handle sits at the line
   midpoint and is rendered only while the body is hovered/focused/dragging, keeping the resting
   graph uncluttered.

9. **Shared pill handle with the asymptote graphs** — The body grab handle is the same
   `MovablePillHandle` used by the exponential/logarithm asymptotes, so the drag affordance is
   visually consistent across graph types.

## Comparison with Other Graph Types

### vs. Ray / Linear / Segment (the other two-point line types)

| Aspect | Vector | Ray / Linear / Segment |
|--------|--------|------------------------|
| Endpoints | `[tail, tip]` | two points |
| Direction matters | **Yes** (tail → tip) | No (a line/segment is undirected) |
| Tip affordance | Arrowhead (`MovableArrowheadView`) | Movable point |
| Body handle | Pill handle at midpoint (on hover/focus/drag) | Draggable line |
| Reducer cases | Shares `MOVE_POINT`/`MOVE_LINE` with ray/linear | same |
| Scoring | Exact (endpoints) or congruent (component form) | Type-specific (e.g. collinearity, endpoints) |

### vs. the function graphs (sinusoid, exponential, logarithm, tangent, absolute value)

| Aspect | Vector | Function graphs |
|--------|--------|-----------------|
| What's drawn | A directed segment with an arrowhead | A curve `f(x)` |
| Coefficients | None (stored as endpoints) | Derived coefficients |
| Asymptotes | None | Some (exp/log/tangent) |
| Canonical normalization for scoring | No (component-form compare for congruent) | Sometimes (sinusoid/tangent) |

## Shared `Vector` presentational component

`graphs/components/vector.tsx` exports a **presentational** `Vector` (a line + `Arrowhead`, with no
drag interaction of its own). It renders vectors for **locked figures**
(`locked-figures/locked-vector.tsx`, `locked-line.tsx`), **angle rays** (`angle.tsx`), and the
**ray/linear extension arrows** (`graphs/components/movable-line/line.tsx`). It is used *inside*
those interactive ray/linear graphs, but the interactive **vector** graph body does **not** use it —
`graphs/vector.tsx` draws its own `SVGLine` + `MovableArrowheadView` so it can wire up dragging.
Don't confuse the two: `components/vector.tsx` is a non-interactive drawing primitive; the
interactive vector graph lives in `graphs/vector.tsx`. (A future change to `Vector` can affect
locked figures and ray/linear rendering, not just vectors.)
