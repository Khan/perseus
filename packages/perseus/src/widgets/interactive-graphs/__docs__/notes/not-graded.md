# Not-Graded InteractiveGraph Feature

## Goal

Allow content creators to mark an InteractiveGraph (IG) widget as unscored, turning it into a "sketchpad" learners can use to work through a problem visually alongside other, scored parts of an exercise.

## Background

Perseus already has a `graded` field on `WidgetOptions` (in `packages/perseus-core/src/data-schema.ts`). Historically it was only relevant for IFrame widgets and a few others that are never scored (Explanation, Definition, Image). The scoring system in `packages/perseus-score` already reads `widget.graded` and skips unscored widgets — so the scoring pipeline doesn't need to change.

What's missing is the authoring experience (a toggle in the editor), the learner experience (a visual "not graded" indicator), and the review-mode behavior (suppress the correct-answer reveal when `graded: false`). The editor toggle and renderer plumbing should live in shared code (`WidgetEditor`, `Renderer`) so other widgets can adopt them later. The learner-facing indicator, however, belongs inside the IG widget itself — not in `WidgetContainer` — because `WidgetContainer` can't distinguish between widgets that actively opted into the ungraded state versus widgets like Explanation and Image that are always unscored and should show no such label.

### Why not add a flag to `PerseusInteractiveGraphWidgetOptions`?

Putting `graded` on the per-widget options type would require every consumer to handle it individually. `WidgetOptions.graded` is already the right home — it's shared across all widget types — so we're building on that.

---

## Objectives

1. **Editor toggle** — Content creators get a "Graded" switch in the IG widget editor, defaulting to on (graded). The switch is only shown for widgets that opt in.
2. **Hide answer fields when ungraded** — When `graded` is off, the answer-configuration sections in the IG editor are hidden. The stored answer data is preserved so toggling back on restores it.
3. **Learner indicator** — When `graded: false` is rendered for a learner, a visible label inside the IG widget makes it clear the widget won't be scored. This lives in the widget rather than `WidgetContainer` because many existing widgets (Explanation, Image, etc.) are already `graded: false` but should never show such a label.
4. **Scoring is unaffected** — Already handled: `is-widget-scoreable.ts` returns `false` when `graded === false`.
5. **Review mode is unaffected** — After a learner submits, a `graded: false` IG should stay in the learner's last state and never reveal the correct answer.

---

## Current State

| Area | Status | Notes |
|------|--------|-------|
| `WidgetOptions.graded` field | ✅ Done | Defined in `data-schema.ts` line 382 |
| Scoring respects `graded` | ✅ Done | `is-widget-scoreable.ts` already skips `graded: false` widgets |
| `widget-editor.tsx` serializes `graded` | ✅ Done | `serialize()` includes `graded: widgetInfo.graded` |
| `renderer.tsx` sets `graded: true` as default | ✅ Done | Line 427 in the default widget info object |
| `data-schema.ts` JSDoc | ⚠️ Needs update | Comment currently says "except for IFrame widgets (deprecated)" — should describe the new use case |
| `graded` in `UniversalWidgetProps` | ❌ Missing | `types.ts` has `static` but not `graded` |
| `renderer.tsx` passes `graded` to widgets | ❌ Missing | `getWidgetProps()` passes `static` (line 550) but not `graded` |
| `supportsGradedToggle` registry function | ❌ Missing | No analog to `supportsStaticMode` exists yet |
| "Graded" toggle in `widget-editor.tsx` | ❌ Missing | Has "Static" toggle but no "Graded" toggle |
| "Not graded" visual indicator | ❌ Missing | `interactive-graph.tsx` doesn't render an ungraded label |
| IG editor hides answer fields when ungraded | ❌ Missing | `interactive-graph-editor.tsx` always renders answer sections |
| IG review-mode respects `graded: false` | ❌ Missing | `stateful-mafs-graph.tsx` doesn't check `graded` |

---

## Implementation Plan

### 1. Update `data-schema.ts` JSDoc

In `packages/perseus-core/src/data-schema.ts`, update the comment on `WidgetOptions.graded` to describe the expanded use case (unscored "sketchpad" mode for IG, and potentially other widgets in the future).

---

### 2. Add `graded` to `UniversalWidgetProps`

In `packages/perseus/src/types.ts`, add `graded?: boolean | null` to `UniversalWidgetProps`, mirroring how `static` is declared. This lets widgets receive and act on the flag.

---

### 3. Pass `graded` through `Renderer.getWidgetProps()`

In `packages/perseus/src/renderer.tsx`, in the `getWidgetProps()` method, add `graded: widgetInfo?.graded` alongside the existing `static: widgetInfo?.static` (line 550). This routes the flag down to individual widgets.

---

### 4. Add `supportsGradedToggle` to the widget registry

In `packages/perseus/src/widgets.ts`, add a `supportsGradedToggle()` function. Unlike `supportsStaticMode()` — which infers support by checking whether `getCorrectUserInput` is exported — this should read an explicit boolean flag from the widget's export object (e.g., `widgetExport.supportsGradedToggle`). Add `supportsGradedToggle: true` to the interactive-graph widget export in `packages/perseus/src/widgets/interactive-graphs/index.ts` (or wherever IG registers itself).

> **Why explicit rather than inferred?** `supportsStaticMode` uses `getCorrectUserInput` as a proxy because static mode is tightly coupled to the concept of a correct answer. Graded/ungraded is a distinct concern — a widget might want to support the ungraded toggle even if it doesn't have a classic "correct answer" concept.

---

### 5. Add "Graded" toggle to `WidgetEditor`

In `packages/perseus-editor/src/components/widget-editor.tsx`:

- Add a `_setGraded` handler method, mirroring `_setStatic`.
- In `render()`, call `Widgets.supportsGradedToggle(widgetInfo.type)` (analogous to the `supportsStaticMode` check on line 155).
- Render a `LabeledSwitch` labeled "Graded" when that returns true. The switch should default to `checked={widgetInfo.graded !== false}` (treats `undefined` and `true` as graded).

---

### 6. Add "Not graded" indicator inside the IG widget

In `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx`, when `props.graded === false`, render a visible label (e.g., "This graph is for your use only and will not be graded.") alongside the graph. Placing this inside the IG widget rather than in `WidgetContainer` is intentional: `WidgetContainer` can't distinguish between widgets that actively opted into the ungraded state (IG) and widgets that are always unscored by convention (Explanation, Image, Definition). Those existing widgets already have `graded: false` in content and must not grow a new label.

---

### 7. Hide answer sections in the IG editor when ungraded

In `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx`:

- Accept a `graded?: boolean` prop (passed through from `WidgetEditor`, which already spreads `widgetInfo.options` — note: `graded` is on `widgetInfo` itself, not `widgetInfo.options`, so `WidgetEditor` needs to pass it explicitly).
- Wrap `InteractiveGraphCorrectAnswer`, `AngleAnswerOptions`, `GraphPointsCountSelector`, `PolygonAnswerOptions`, `SegmentCountSelector`, and `StartCoordsSettings` with `{(graded ?? true) && ...}`.
- Do **not** clear the stored `correct` data — just hide the UI. This ensures the correct answer is restored if the content creator re-enables grading.

---

### 8. Suppress correct-answer reveal in review mode

In `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx`, the current static-mode guard (line 138) renders the correct answer when `props.static && props.correct`. Add a `graded?: boolean` prop and change the condition to:

```typescript
if (props.static && props.correct && props.graded !== false) {
```

This ensures a `graded: false` IG is never replaced by the correct answer, even if it's in static mode. The widget stays in whatever state the learner left it.

`interactive-graph.tsx` will need to receive `graded` from `UniversalWidgetProps` (step 2) and forward it to `StatefulMafsGraph`.

---

### 9. Tests and stories

Each change above needs coverage:

- **`widget-editor.tsx`**: Unit test that the "Graded" toggle renders for IG and not for e.g. radio; test that toggling calls the handler.
- **`interactive-graph-editor.tsx`**: Test that answer sections are hidden when `graded={false}`.
- **`interactive-graph.tsx`**: Test that the "not graded" message renders when `graded={false}` and not otherwise.
- **`stateful-mafs-graph.tsx`**: Test that setting `static={true}` on a `graded={false}` graph does not display the correct answer.
- **Storybook**: Add a story for the IG widget with `graded={false}` in both learner and review contexts.

---

## Files to Change

| File | Change |
|------|--------|
| `packages/perseus-core/src/data-schema.ts` | Update JSDoc on `WidgetOptions.graded` |
| `packages/perseus/src/types.ts` | Add `graded?: boolean \| null` to `UniversalWidgetProps` |
| `packages/perseus/src/renderer.tsx` | Pass `graded: widgetInfo?.graded` in `getWidgetProps()` |
| `packages/perseus/src/widgets.ts` | Add `supportsGradedToggle()` function |
| `packages/perseus/src/widgets/interactive-graphs/index.ts` (or export file) | Add `supportsGradedToggle: true` to IG widget export |
| `packages/perseus-editor/src/components/widget-editor.tsx` | Add `_setGraded` handler + `LabeledSwitch` for "Graded" |
| `packages/perseus-editor/src/widgets/interactive-graph-editor/interactive-graph-editor.tsx` | Accept `graded?: boolean`; wrap answer sections |
| `packages/perseus/src/widgets/interactive-graphs/interactive-graph.tsx` | Render "not graded" label when `graded === false`; forward `graded` to `StatefulMafsGraph` |
| `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` | Guard static/correct-answer reveal with `graded !== false` |
| Tests + stories | Cover all of the above |
