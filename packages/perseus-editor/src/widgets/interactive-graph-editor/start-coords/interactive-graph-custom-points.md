# Interactive Graph: Custom Point Names

## Problem Statement

When a content author writes a question like *"Move Point T to coordinates (3, 4)"*, the interactive graph's screen reader reads the point as **"Point 1"** instead of **"Point T"**. This creates a disconnect between the question text and the screen reader output, which is confusing for visually impaired users.

## Current Implementation (Before The POC)

### How points are named today

Point naming flows through these layers:

1. **String template** (`packages/perseus/src/strings.ts:1269`):
   ```ts
   srPointAtCoordinates: ({num, x, y}) => `Point ${num} at ${x} comma ${y}.`
   ```

2. **`sequenceNumber` prop** on `MovablePoint` (`packages/perseus/src/widgets/interactive-graphs/graphs/components/movable-point.tsx:18-26`):
   - 1-indexed integer, resets per interactive figure
   - Passed to `useControlPoint` which builds the aria-label

3. **Aria-label generation** (`packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx:93-100`):
   ```ts
   const pointAriaLabel =
       ariaLabel ||
       strings.srPointAtCoordinates({
           num: sequenceNumber,
           x: srFormatNumber(point[X], locale),
           y: srFormatNumber(point[Y], locale),
       });
   ```
   Note: A custom `ariaLabel` prop already overrides the default — this is the extension point used by the POC.

4. **Editor UI** shows "Point 1:", "Point 2:", etc. in:
   - Start coords settings (`packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-point.tsx`)
   - SR tree visualization (`packages/perseus-editor/src/widgets/interactive-graph-editor/components/interactive-graph-sr-tree.tsx`)

### Graph types that use point naming

| Graph Type | # Points | Naming Source | File |
|---|---|---|---|
| **Point** | 1+ (or unlimited) | `sequenceNumber={i + 1}` | `graphs/point.tsx` |
| **Polygon** | 3+ (or unlimited) | `sequenceNumber={i + 1}` | `graphs/polygon.tsx` |
| **Angle** | 3 (fixed) | Hard-coded 1, 2, 3 + custom ariaLabels | `graphs/angle.tsx` |
| **Line/Ray** | 2 per line | Via `MovableLine`, sequenceNumber 1 & 2 | `graphs/linear.tsx`, `graphs/ray.tsx` |
| **Segment** | 2 per segment | Via `MovableLine` | `graphs/segment.tsx` |
| **Linear System** | 2 per line | `srLinearSystemPoint` string | `graphs/linear-system.tsx` |
| **Circle** | 1 | sequenceNumber 1 | `graphs/circle.tsx` |
| **Quadratic** | 2-3 | `srQuadraticPoint*` strings | `graphs/quadratic.tsx` |
| **Sinusoid** | 2 | sequenceNumber 1 & 2 | `graphs/sinusoid.tsx` |

---

## POC Implementation (Completed)

### Scope

The `point` graph type only. Other graph types (polygon, line, etc.) can be addressed in follow-up work using the same pattern.

### Architecture Decision: Props Over Reducer State

**Key learning from POC iteration:** `pointNames` must NOT be stored in the reducer state (`PointGraphState`). Instead, it flows directly through React props from the widget config to the renderer.

**Why:** Storing `pointNames` in the reducer requires `reinitialize` to update the state when names change. `reinitialize` fires in a `useEffect`, which causes a timing issue — the SR tree reads the DOM's aria-labels in its own `useEffect` before the graph has re-rendered with the new state. By passing `pointNames` directly through props, changes take effect in the same render cycle.

**Data flow (implemented):**
```
Editor: this.props.graph.pointNames + this.props.correct.pointNames
  → InteractiveGraph widget: userInput (which is correct)
    → StatefulMafsGraph: props.graph (which is userInput)
      → MafsGraph: props.graph passed to renderGraphElements
        → renderGraphElements extracts pointNames from graphOptions
          → renderPointGraph(state, dispatch, i18n, pointNames)
            → PointGraph component receives pointNames as prop
              → MovablePoint receives custom ariaLabel
```

### Files Modified (9 files)

#### 1. Data Schema — `packages/perseus-core/src/data-schema.ts`
Added `pointNames?: string[]` to `PerseusGraphTypePoint`:
```ts
export type PerseusGraphTypePoint = {
    type: "point";
    numPoints?: number | "unlimited";
    coords?: Coord[] | null;
    startCoords?: Coord[];
    coord?: Coord;
    pointNames?: string[];  // NEW
};
```

#### 2. Parser — `packages/perseus-core/src/parse-perseus-json/perseus-parsers/interactive-graph-widget.ts`
Added `pointNames: optional(array(string))` to `parsePerseusGraphTypePoint`.

#### 3. String Type — `packages/perseus/src/strings.ts`
Changed `srPointAtCoordinates` `num` parameter type from `number` to `number | string` so custom names can be passed.

#### 4. Graph Renderer — `packages/perseus/src/widgets/interactive-graphs/graphs/point.tsx`
- `renderPointGraph` now accepts an optional `pointNames?: string[]` parameter
- Passes `pointNames` as a prop to the `PointGraph` component
- `LimitedPointGraph` and `UnlimitedPointGraph` read `pointNames` from props (NOT from state)
- When a custom name exists at index `i`, builds a custom `ariaLabel` using `strings.srPointAtCoordinates({num: customName, ...})` and passes it to `MovablePoint`
- When no custom name exists, passes `ariaLabel={undefined}` which falls back to the default `sequenceNumber` behavior
- `getPointGraphDescription` also accepts `pointNames` and uses custom names in the SR element description string

#### 5. Mafs Graph — `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx`
- Added `graph: PerseusGraphType` to `MafsGraphProps` type (it was already passed via spread from `StatefulMafsGraph` but not declared in the type)
- `renderGraphElements` now receives and passes through `graphOptions`
- For the `"point"` case, extracts `pointNames` from `graphOptions` and passes it to `renderPointGraph`

#### 6. Test Utils — `packages/perseus/src/widgets/interactive-graphs/utils.ts`
Added `graph: {type: "segment"}` to `getBaseMafsGraphPropsForTests()` to satisfy the new `MafsGraphProps.graph` field.

#### 7. Editor — `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx`
- Added `changePointNames` method that updates BOTH `graph` and `correct` with the new `pointNames` (both must be updated — `correct` becomes the widget's `userInput`, `graph` is the editor's state)
- Passes `onChangePointNames={this.changePointNames}` to `StartCoordsSettings`
- `serialize()` includes `pointNames` in the serialized graph: added to the `_.each` list of keys copied from `correct`, and also explicitly spread from `this.props.graph` into the serialized `graph` object

#### 8. Start Coords Settings — `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-settings.tsx`
- Added `onChangePointNames?` to `Props` type
- Threads `pointNames` and `onChangePointNames` through to `StartCoordsPoint` (only for `type === "point"`)

#### 9. Start Coords Point UI — `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-point.tsx`
- Added `pointNames?: string[]` and `onChangePointNames?` to `Props`
- Layout: "Point {name}:" title on top, input fields row below
- Name input uses `LabelMedium tag="label"` with "name" label, matching the `CoordinatePairInput` styling pattern
- `TextField` with `placeholder={index + 1}` so default numbering is visible when empty
- Title dynamically shows custom name (e.g., "Point T:") or falls back to index (e.g., "Point 1:")

### SR Tree — No Changes Needed
`packages/perseus-editor/src/widgets/interactive-graph-editor/components/interactive-graph-sr-tree.tsx` reads aria-labels directly from the DOM. Since `pointNames` changes flow through `correct` (which is in the `useEffect` dependency array), the tree re-reads the DOM after the graph re-renders with updated aria-labels.

---

## Remaining Work for Production

### Tests to Write
1. **`point.tsx` tests** — Verify that `renderPointGraph` with `pointNames` produces correct aria-labels on `MovablePoint` elements
2. **`point.tsx` tests** — Verify `getPointGraphDescription` includes custom names in the description string
3. **`start-coords-point.tsx` tests** — Verify the name input renders and calls `onChangePointNames` on input
4. **`interactive-graph-editor.tsx` tests** — Verify `changePointNames` updates both `graph` and `correct`
5. **`interactive-graph-editor.tsx` tests** — Verify `serialize()` includes `pointNames` in output

### Storybook
- Add a story demonstrating custom point names in the editor
- Add a story showing the SR tree with custom names

### Edge Cases to Handle

| Case | Current POC Behavior | Production Recommendation |
|---|---|---|
| `pointNames` not provided | Falls back to "Point 1", etc. (working) | No change needed |
| `pointNames` shorter than `numPoints` | Named points use custom names; remaining use index numbers (working) | No change needed |
| `pointNames` has empty string at index | Falls back to index number for that point (working) | No change needed |
| Unlimited points mode | Custom names apply to points at matching indices; extras use numbers (working) | No change needed |
| Duplicate point names | Allowed (no validation) | Consider adding an editor warning |
| Non-ASCII names (e.g., Greek letters) | Works — template literals handle Unicode | No change needed |
| `numPoints` changes after names are set | `pointNames` array may be longer/shorter than new count | Consider trimming/extending in `changePointNames` or the editor |

### Polish
- Consider adding a tooltip or info text explaining the "name" field in the editor
- Consider visual point labels on the graph (showing "T" next to the point, not just SR)

---

## Key Files Reference

| File | Role |
|---|---|
| `packages/perseus-core/src/data-schema.ts` | `PerseusGraphTypePoint` type with `pointNames` field |
| `packages/perseus-core/src/parse-perseus-json/perseus-parsers/interactive-graph-widget.ts` | Parser for `pointNames` |
| `packages/perseus/src/strings.ts` | `srPointAtCoordinates` string template (`num: number \| string`) |
| `packages/perseus/src/widgets/interactive-graphs/graphs/point.tsx` | Point graph renderer — builds custom aria-labels |
| `packages/perseus/src/widgets/interactive-graphs/graphs/components/movable-point.tsx` | `MovablePoint` component — accepts `ariaLabel` prop |
| `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx` | Builds aria-label from `ariaLabel` prop or `sequenceNumber` fallback |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | Routes `pointNames` from widget props to graph renderer |
| `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx` | Editor — `changePointNames`, serialization |
| `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-settings.tsx` | Threads props to `StartCoordsPoint` |
| `packages/perseus-editor/src/widgets/interactive-graph-editor/start-coords/start-coords-point.tsx` | Editor UI — name input per point |
| `packages/perseus-editor/src/widgets/interactive-graph-editor/components/interactive-graph-sr-tree.tsx` | SR tree — reads DOM aria-labels (no changes needed) |

---

## Future Work (Out of Scope)

- Custom point names for other graph types (polygon, segment, line, etc.) — same pattern: add `pointNames` to the graph type, thread through `renderGraphElements`
- Visual point labels on the graph itself (not just SR — showing "T" next to the point)
- Locked figure point naming (for non-interactive reference points)
- Migration tooling if we want to backfill existing content with custom names
