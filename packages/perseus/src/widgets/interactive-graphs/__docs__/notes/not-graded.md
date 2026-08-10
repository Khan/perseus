# Interactive-but-Ungraded InteractiveGraph — Technical Reference

Technical reference for the "interactive but not graded" state of the Interactive Graph (IG)
widget. This state turns an IG into a **sketchpad**: a graph learners can interact with to work
through a problem visually, but that is never scored and never reveals a "correct answer". The
toggle and the prop plumbing live in shared code (`WidgetEditor`, `Renderer`) so other widgets
can adopt them later; the learner-facing indicator lives inside the IG widget itself.

## Traceability

- **Shipped in:** #3805 ("Fix Ungraded Story"), #3806 ("Add screen-reader information for the
  interactive but not graded graph"), plus the plumbing PRs before them.
- This document was originally an implementation plan; the feature is now shipped, so it has been
  rewritten to describe the behavior as built. See [Known gap](#known-gap) for the one planned
  item that was not implemented.

## How grading is represented

Grading is controlled by the **shared** `WidgetOptions.graded` field
(`packages/perseus-core/src/data-schema.ts`), not by an IG-specific option. `WidgetOptions.graded`
already existed (historically for IFrame/Explanation/Image/Transformer, which are never scored);
this feature builds on it. Its JSDoc has been updated to describe the ungraded-IG sketchpad use
case (and reframes the old always-unscored widgets as "historical uses").

Because `graded` is shared, the scoring pipeline needed no changes: `is-widget-scoreable.ts`
already returns `false` when `graded === false`, so an ungraded widget is simply skipped at
scoring time.

> **Why not a flag on `PerseusInteractiveGraphWidgetOptions`?** A per-widget flag would force
> every consumer to handle it individually. `WidgetOptions.graded` is shared across all widget
> types, so it is the right home.

## Architecture

### File map

| File | Role |
|------|------|
| `perseus-core/src/data-schema.ts` | `WidgetOptions.graded` field + JSDoc (ungraded sketchpad use case) |
| `perseus/src/types.ts` | `graded?: boolean \| null` on `UniversalWidgetProps`; `supportsUngraded?: boolean` on `WidgetExports` |
| `perseus/src/renderer.new.tsx` / `renderer.old.tsx` | `getWidgetProps()` passes `graded: widgetInfo?.graded`; default widget info sets `graded: true` (`renderer.tsx` is a feature-flag shim that delegates to these) |
| `perseus/src/widgets.ts` | `supportsUngraded(type)` — reads the explicit `supportsUngraded === true` flag off the widget export |
| `perseus/src/widgets/interactive-graphs/interactive-graph.tsx` | Sets `supportsUngraded: true` on the IG export; renders the "not graded" indicator; forwards `graded` + `ungradedDescriptionId` to `StatefulMafsGraph` |
| `perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` | Guards the correct-answer reveal with `graded !== false` |
| `perseus-editor/src/components/widget-editor.tsx` | `_setGraded` handler; checks `Widgets.supportsUngraded(...)`; passes the toggle state down |
| `perseus-editor/src/components/widget-editor-settings.tsx` | Renders the "Interactive but ungraded" `LabeledSwitch` |
| `perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx` | Accepts a `graded?: boolean` prop (see [Known gap](#known-gap)) |

### Naming

The shipped API diverged from the original plan's names — be aware of both when searching:

- Registry function: **`supportsUngraded`** (not `supportsGradedToggle`).
- The widget export flag: **`supportsUngraded: true`**.
- The editor switch label: **"Interactive but ungraded"**, and it is `checked={!isGraded}`
  (checked = ungraded). Note the prop passed into `widget-editor-settings.tsx` is still named
  `supportsGradedToggle`, while the registry function it comes from is `supportsUngraded`.

## Expected behavior

### Authoring (editor)

- `WidgetEditor` shows an **"Interactive but ungraded"** switch only for widgets whose export
  sets `supportsUngraded: true` (currently just Interactive Graph). It defaults to graded
  (`isGraded = widgetInfo.graded !== false`, so `undefined`/`true` both mean graded).
- Toggling calls `_setGraded`, which serializes `graded` onto the widget info.

### Learner (renderer)

- `Renderer.getWidgetProps()` forwards `graded` to the widget via `UniversalWidgetProps`
  (default `true`).
- When `graded === false` (and the graph `type` is not `"none"`), the IG widget renders a visible
  `<p>` label — `strings.ungradedInteractiveGraph` — making it clear the graph won't be scored.
  This label lives **inside the IG widget**, not in `WidgetContainer`, on purpose: many widgets
  (Explanation, Image, Definition) are always `graded: false` by convention and must not grow such
  a label.
- The label's element id (`ungradedDescriptionId`) is forwarded to `StatefulMafsGraph` so the
  message is part of the graph's screen-reader description (#3806).

### Review mode

- `StatefulMafsGraph` gates the correct-answer reveal with
  `if (props.static && props.correct && props.graded !== false)`. An ungraded graph therefore
  stays in whatever state the learner left it and never swaps in the correct answer, even in
  static mode.

### What is deliberately still available when ungraded

- **Start coordinates** — content creators may still set an initial sketchpad state.
- **Locked figures** (lines, points, polygons, etc.) — still available for visual context.

## Known gap

Hiding the answer-configuration sections in the IG editor when `graded === false` was planned
(original Objective 2 / plan step 7) but **was not implemented**. `interactive-graph-editor.tsx`
declares a `graded?: boolean` prop and `WidgetEditor` passes it down, but the prop is never used:
`InteractiveGraphCorrectAnswer`, `AngleAnswerOptions`, `GraphPointsCountSelector`,
`PolygonAnswerOptions`, `SegmentCountSelector`, and `StartCoordsSettings` are still gated only by
`correct.type`/`static`, never by `graded`. If this is picked up later, the intent was to wrap
those sections with `{(graded ?? true) && ...}` **without** clearing the stored `correct` data, so
toggling grading back on restores the answer.

## Testing

- **Renderer:** `interactive-graph.test.tsx` ("ungraded interactive graph") covers: the message
  renders when `graded: false`; it is announced as the first description; it is absent when
  `graded: true`; and it is absent when the graph type is `"none"`.
- **Stories:** `Ungraded` in `__docs__/interactive-graph.stories.tsx` (uses `ungradedQuestion`),
  and an `Ungraded` visual-regression story in
  `__docs__/interactive-graph-initial-state-regression.stories.tsx` (`graded: false`).
- **Gaps in coverage:** there is no `widget-editor` test for the ungraded toggle, no IG-editor
  test for answer-section hiding (the feature is unimplemented — see [Known gap](#known-gap)),
  and no explicit `stateful-mafs-graph` test that `static + graded:false` suppresses the
  correct-answer reveal.
