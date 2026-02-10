# Editor Preview Data Flow Deep Dive — LEMS-3710

## Overview

This document traces the complete data flow from when a content creator changes a setting in the Radio widget editor to when the Edit tab sidebar preview re-renders. Understanding this flow is critical for knowing where to intercept the `randomize` flag.

## The Full onChange-to-Preview Flow

When the user toggles "Randomize order" (or any setting), here's the complete chain:

### 1. User clicks the Switch
**File:** `packages/perseus-editor/src/widgets/radio/editor.tsx` (lines 339-341)
```typescript
onChange={(value) => {
    this.props.onChange({randomize: value});
}}
```

### 2. WidgetEditor merges the change
**File:** `packages/perseus-editor/src/widget-editor.tsx` (lines 85-103)
```typescript
_handleWidgetChange = (newProps, cb, silent) => {
    const newWidgetInfo = {
        ...this.state.widgetInfo,
        options: {
            ...this.state.widgetInfo.options,
            ...(this.widget.current?.serialize() ?? {}),
            ...newProps,
        },
    };
    this.props.onChange(newWidgetInfo, cb, silent);
};
```
Merges `{randomize: value}` into `widgetInfo.options`, creating a full `PerseusWidget` object.

### 3. Editor updates widgets
**File:** `packages/perseus-editor/src/editor.tsx` (lines 271-285)

Copies all widgets, updates the changed widget by ID:
```typescript
this.props.onChange({widgets}, cb, silent);
```

### 4. ItemEditor merges into question
**File:** `packages/perseus-editor/src/item-editor.tsx` (lines 156-159)
```typescript
const question = _.extend({}, this.props.question, newProps);
this.updateProps({question}, cb, silent);
```

### 5. ItemEditor.updateProps propagates up
**File:** `packages/perseus-editor/src/item-editor.tsx` (lines 145-149)

Merges into `{question, answerArea}`, calls `this.props.onChange(...)`.

### 6. EditorPage.handleChange
**File:** `packages/perseus-editor/src/editor-page.tsx` (lines 264-268)

Calls `this.props.onChange(newProps, cb, silent)` to the host application.

### 7. Host re-renders EditorPage → componentDidUpdate fires
**File:** `packages/perseus-editor/src/editor-page.tsx` (lines 139-149)
```typescript
componentDidUpdate(previousProps, prevState, snapshot) {
    setTimeout(() => {
        this.updateRenderer();
    });
}
```
Every prop change triggers `updateRenderer()` via `setTimeout`.

### 8. updateRenderer() serializes and sends to iframe
**File:** `packages/perseus-editor/src/editor-page.tsx` (lines 204-239)
```typescript
updateRenderer() {
    // ...
    this.itemEditor.current?.triggerPreviewUpdate({
        type: "question",
        data: _({
            item: this.serialize(),          // <-- serializes entire item
            apiOptions: deviceBasedApiOptions,
            initialHintsVisible: 0,
            device: this.props.previewDevice,
            linterContext: { ... },
            reviewMode: true,                // <-- always true for Edit tab
            legacyPerseusLint: ...,
        }).extend(_(this.props).pick("problemNum")),
    });
}
```

### 9. Serialization chain
`this.serialize()` walks the tree:
- `EditorPage.serialize()` (line 254) → `ItemEditor.serialize()` → `Editor.serialize()` → iterates widget refs → `RadioEditor.serialize()`
- `RadioEditor.serialize()` returns `{choices, randomize, multipleSelect, ...}`
- The `randomize` value flows through unchanged into `item.question.widgets["radio 1"].options.randomize`

### 10. Data sent to iframe
**File:** `packages/perseus-editor/src/item-editor.tsx` (lines 151-153)
```typescript
triggerPreviewUpdate: (newData?: any) => void = (newData: any) => {
    this.frame.current?.sendNewData(newData);
};
```

### 11. IframeContentRenderer posts to iframe
**File:** `packages/perseus-editor/src/iframe-content-renderer.tsx` (lines 179-190)
```typescript
sendNewData(data: any) {
    if (this._isMounted && data && frame?.contentWindow) {
        this._lastData = data;
        window.iframeDataStore[this.iframeID] = data;
        frame.contentWindow.postMessage(this.iframeID, "*");
    }
}
```
Data stored in `window.iframeDataStore[id]`, iframe notified via `postMessage`.

### 12. Iframe renders the preview
The iframe reads `window.parent.iframeDataStore[id]` and renders the item with the received data, including the `randomize` value.

## Data Structure Sent to Iframe

```typescript
{
    type: "question",
    data: {
        item: {
            question: {
                content: "...",
                widgets: {
                    "radio 1": {
                        type: "radio",
                        options: {
                            choices: [...],
                            randomize: boolean,  // <-- THIS IS THE KEY FIELD
                            multipleSelect: boolean,
                            // ...
                        }
                    }
                }
            },
            answerArea: {...},
            hints: [...]
        },
        apiOptions: {...},
        reviewMode: true,
        problemNum: number,
        // ...
    }
}
```

## Key Insight: serialize() Dual Use

`RadioEditor.serialize()` is called in TWO contexts:
1. **Preview updates** — via `updateRenderer()` → `this.serialize()` chain
2. **Saving content** — via `EditorPage.serialize()` when the host app saves

Both paths call the same `serialize()` method, so any modification to `serialize()` output affects both preview and saving. This is why a marker field approach (include a temporary field, strip it on save) is needed to control preview behavior without affecting saved data.

## Edit Tab vs Preview Tab: Key Differences

| Aspect | Edit Tab (sidebar) | Preview Tab |
|--------|-------------------|-------------|
| Rendering | iframe via `IframeContentRenderer` | Inline via `ContentPreview` → `Renderer` |
| `reviewMode` | Always `true` | Passed through |
| `problemNum` | From parent props | Hardcoded to `0` |
| Data source | `EditorPage.updateRenderer()` | Widget options from props directly |
| Shuffle control | Through iframe data pipeline | Through widget options directly |

## Interception Point

The best place to modify `randomize` for the preview is in `EditorPage.updateRenderer()`, after `this.serialize()` returns but before the data is sent to `triggerPreviewUpdate()`. This lets us:
- Leave `RadioEditor.serialize()` mostly unchanged (just add a marker)
- Override `randomize` only for the Edit tab preview
- Keep the Preview tab unaffected (it doesn't go through `updateRenderer()`)

---

*Co-authored by Claude Opus 4.6*