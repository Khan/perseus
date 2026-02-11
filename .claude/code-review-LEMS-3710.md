# Code Review: LEMS-3710 — Shuffle Preview Toggle

## Review Summary

Three parallel reviews were conducted focusing on: (1) Correctness & Functionality, (2) Code Quality & Maintainability, and (3) Security & Performance.

**No critical issues found.** Three warnings converged across multiple reviewers and should be addressed before merging.

---

## Converging Findings (flagged by 2+ reviewers)

### 1. Mutation of shared serialized objects (all 3 reviewers)

Both `serializeForPreview()` and `serialize()` mutate the object returned by `itemEditor.serialize()` in place (`delete` and property assignment). If the serialized objects share references with the widget editor's internal state, this could corrupt state between frames — particularly `widget.options.randomize = false` being set on every preview tick.

**Fix:** Shallow-copy `widget.options` before mutating:

```typescript
if (widget?.type === "radio" && widget.options) {
    widget.options = {...widget.options};
    // then delete/modify safely
}
```

### 2. Missing EditorPage-level tests (all 3 reviewers)

No tests exist for `EditorPage.serialize()` stripping or `serializeForPreview()` override logic. The RadioEditor tests cover the widget level well, but the save-path safety net and preview-path correctness live in EditorPage and are untested.

### 3. `getSnapshotBeforeUpdate` bypasses stripping (2 reviewers)

When toggling into JSON mode, `getSnapshotBeforeUpdate` calls `itemEditor.serialize()` directly — not `EditorPage.serialize()`. This means `_showShuffledPreview` could appear in the JSON editor and potentially be saved from there. Low risk (developer-only JSON mode) but an inconsistency.

---

## Additional Findings

### Code Quality

- **Import ordering:** `const {InfoTip} = components;` sits between import blocks. Should be moved after all imports to match patterns in `input-number-editor.tsx` and `dropdown-editor.tsx`.
- **Duplicated serialization base:** `serialize()` and `serializeForPreview()` both call `_.extend(this.itemEditor.current?.serialize(), {...})`. Could extract a shared `serializeBase()` helper.
- **Conditional spread readability:** `...(!value && { _showShuffledPreview: false })` is concise but harder to parse at a glance. A plain `if` would be more readable.
- **Disabled color override:** Manual `color: semanticColor.core.foreground.disabled.default` may be unnecessary if `LabeledSwitch` already handles disabled styling via the `disabled` prop. Worth verifying.
- **`serializeForPreview()` return type:** Claims `PerseusItem` but is built from the same `any`-returning pattern as `serialize()`. Inconsistency worth noting.

### Security & Performance

- **No security vulnerabilities identified.** Editor-only changes, no user-controlled data in dangerous sinks.
- **No performance issues.** Widget iteration is O(n) over a small set (<10 widgets). No double-serialization on the hot path.
- **`delete` operator:** Negligible performance impact in modern V8. Acceptable.

---

## Recommended Actions

| Priority | Action | Effort |
|----------|--------|--------|
| **High** | Add shallow copy before mutating widget.options in both serialize methods | Small |
| **High** | Add EditorPage tests for stripping and preview override | Medium |
| **Medium** | Fix import ordering in editor.tsx | Trivial |
| **Medium** | Strip marker in `getSnapshotBeforeUpdate` or extract shared helper | Small |
| **Low** | Extract `serializeBase()` to reduce duplication | Small |
| **Low** | Verify disabled color override is needed | Trivial |

---

*Co-authored by Claude Opus 4.6*