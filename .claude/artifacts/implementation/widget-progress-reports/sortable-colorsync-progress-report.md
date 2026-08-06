# ColorSync Widget Migration — `sortable` — Progress Report

This is a historical record of the ColorSync migration workflow for the `sortable` widget. Entries are appended as each step completes; earlier entries are not edited.

## Step 1 — Audit the Widget

### Scope note
`packages/perseus/src/styles/widgets/sortable.css` contains rules for two unrelated consumers:
- Lines 1–52 (`.draggy-boxy-thing .card`, `.cards-area`, `.drag-hint`, `.stack`, etc.) are applied by the **`orderer`** widget via the classname built at `packages/perseus/src/widgets/orderer/orderer.tsx:737` (`"draggy-boxy-thing orderer " + ...`). All the hardcoded hex colors in the file live here.
- Lines 54–71 (`.perseus-sortable ...`) style the shared `Sortable` component (`packages/perseus/src/components/sortable.tsx`), consumed by the `matcher` and `sorter` widgets.

Per user decision: keep this migration named "sortable" (scoped to `sortable.css`), and also verify `orderer.tsx` itself (the widget that actually renders the `.draggy-boxy-thing` markup) has no hardcoded values of its own, since it was expected to already be migrated.

### Bash commands used
```bash
grep -n "color\." packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -n "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "rgba?\([^)]+\)" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "fontSize|fontWeight|lineHeight|fontFamily|font-size|font-weight|line-height|font-family" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "borderWidth|borderTopWidth|borderBottomWidth|borderLeftWidth|borderRightWidth|border-width" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "borderRadius|border-radius" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -n "color:" packages/perseus/src/components/sortable.tsx
grep -nE "border" packages/perseus/src/components/sortable.tsx

# Verification pass on orderer.tsx (expected to already be migrated)
grep -n "color:" packages/perseus/src/widgets/orderer/orderer.tsx
grep -n "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "rgba?\([^)]+\)" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "borderWidth|borderTopWidth|borderBottomWidth|borderLeftWidth|borderRightWidth|border-width" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "borderRadius|border-radius" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "\bborder\b" packages/perseus/src/widgets/orderer/orderer.tsx
grep -n "wonder-blocks-tokens" packages/perseus/src/widgets/orderer/orderer.tsx
```

### Colors to be Tokenized:
- **Files with color token usage:**
  - `packages/perseus/src/components/sortable.tsx` — imports `border`, `semanticColor` from `@khanacademy/wonder-blocks-tokens` (line 5); uses them in inline styles at lines 922, 937, 960, 966 (`semanticColor.core.border.neutral.subtle`, `semanticColor.core.border.instructive.default`, `semanticColor.core.border.disabled.subtle`). No hardcoded colors present — this file does not need color conversion.
- **Files with hardcoded hex/rgb(a) color values (need changing):**
  - `packages/perseus/src/styles/widgets/sortable.css`:
    - Line 3: `background: #eee;`
    - Line 4: `border: 1px solid #ccc;`
    - Line 5: `border-bottom: 1px solid #aaa;`
    - Line 6: `box-shadow: 0 1px 2px #ccc;`
    - Line 9: `background-color: #fff;`
    - Line 10: `border: 1px solid #b9b9b9;`
    - Line 11: `border-bottom-color: #939393;`
    - Line 17: `background: #ddd;`
    - Line 18: `border: 1px solid #ccc;`
    - Line 22: `border: 1px dashed #aaa;`
    - Line 26: `border-color: #aaa;`
    - Line 30: `background-color: #ffedcd;`
    - Line 39: `background-color: #fff;`
    - Line 40: `border: 1px solid #b9b9b9;`
    - Line 41: `border-bottom-color: #939393;`
    - Line 51: `border-color: #ffa500;`
    - Line 52: `box-shadow: 0 0 4px #c78100;`
  - `packages/perseus/src/widgets/orderer/orderer.tsx`: **none found.** No hex/rgb(a) values, no `color:` style props, no `border` usage of any kind, no `wonder-blocks-tokens` import. Confirms the widget itself carries no hardcoded values — all color/border styling for its rendered markup lives in `sortable.css`.

### Fonts to be Tokenized:
- **Files with font attributes:**
  - `packages/perseus/src/styles/widgets/sortable.css` line 65: `font-size: var(--wb-font-body-size-small);` — already using a WB token, no change needed.
  - No other font attributes (`fontSize`/`fontWeight`/`lineHeight`/`fontFamily`) found in `sortable.css`, `components/sortable.tsx`, or `orderer.tsx`.
- **Files with border width attributes:**
  - No standalone `border-width`/`borderWidth`-family properties found. Border widths appear only inside shorthand `border: <width> <style> <color>` declarations (lines 4, 5, 10, 18, 22, 40 of `sortable.css`, all `1px`) — these will be evaluated against `border.width.*` tokens (e.g. `border.width.thin`) during Step 5, alongside the color conversion in Step 9, since they're bundled with the hardcoded colors.
- **Files with border radius attributes:**
  - `packages/perseus/src/styles/widgets/sortable.css` line 12: `border-radius: 4px;`
  - `packages/perseus/src/styles/widgets/sortable.css` line 42: `border-radius: 4px;`
  - `packages/perseus/src/components/sortable.tsx` line 923: `borderRadius: 4,` (unitless, Aphrodite style — belongs to the `.perseus-sortable` / shared component side, already otherwise token-based; flagging for radius-token check even though it has no color problem)

### Summary
- **In scope for this migration:** the 17 hardcoded hex-color declarations in `sortable.css` lines 1–52 (the `.draggy-boxy-thing` rules rendered by the `orderer` widget), plus the two `border-radius: 4px` declarations in that same block.
- **Confirmed already migrated / no action needed:** `orderer.tsx` (no hardcoded values of any kind) and `components/sortable.tsx` (already uses `border`/`semanticColor` tokens; only the unitless `borderRadius: 4` is worth a token check, no color issue).
