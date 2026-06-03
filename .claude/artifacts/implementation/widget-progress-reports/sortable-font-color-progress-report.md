# Sortable Component — Font and Color Conversion Progress Report

**Component:** Sortable (`packages/perseus/src/components/sortable.tsx`)
**Workflow:** Font and Color Conversion
**Related Widgets:** Sorter, Matcher (both previously migrated)
**Date Started:** 2026-05-05

---

## Step 1 — Audit

**Note:** Sortable is a component, not a widget. Audit grep paths were adapted from `packages/perseus/src/widgets/[widget-name]/` to `packages/perseus/src/components/` for all commands.

### Commands Run

```bash
# Find primitive color token usage
grep -n "color\." packages/perseus/src/components/sortable.tsx
# Result: (no output)

# Find hardcoded hex values
grep -n "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/components/sortable.tsx
# Result: lines 920, 921, 935, 936, 958

# Find hardcoded rgb(a) values
grep -n "rgba\?([^)]\+)" packages/perseus/src/components/sortable.tsx
# Result: (no output)

# Check 4 font attributes
grep -nE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/components/sortable.tsx
# Result: (no output)

# Also checked __tests__/sortable.test.tsx and __docs__/sortable.stories.tsx — no colors or fonts found in either
```

### Colors to be Tokenized:

**`packages/perseus/src/components/sortable.tsx`** — hardcoded hex values:
- Line 920: `background: "#fff"` — `card` style (card default background)
- Line 921: `border: "1px solid #ddd"` — `card` style (card default border)
- Line 935: `background: "#ddd"` — `placeholder` style (placeholder background)
- Line 936: `border: "1px solid #ccc"` — `placeholder` style (placeholder border)
- Line 958: `background: "#ffedcd"` — `dragging` style (card being dragged)

### Fonts to be Tokenized:

Initial grep against `packages/perseus/src/components/sortable.tsx` found no fonts. However, `packages/perseus/src/styles/widgets/sortable.css` (discovered in Step 9) contains:

- Line 65: `font-size: 14px` — `.perseus-sortable .perseus-sortable-draggable > div`

**Note on audit miss:** The initial audit only scanned `components/sortable.tsx`. The CSS file lives in `styles/widgets/` and is loaded via `perseus-renderer.css` (`@import "widgets/sortable.css" layer(perseus-legacy)`). Steps 5–7 were originally marked as skipped but were un-skipped when this was discovered.

---

## Step 2 — Create Regression Stories

### Research (Gate Check — before creating files)

**Files examined:**
- `packages/perseus/src/components/sortable.tsx` — main component, full read
- `packages/perseus/src/components/__docs__/sortable.stories.tsx` — existing stories, no colors or fonts
- `packages/perseus/src/components/__tests__/sortable.test.tsx` — tests render with `waitForTexRendererToLoad: false`
- `packages/perseus/src/widgets/free-response/__docs__/free-response-initial-state-regression.stories.tsx` — reference for story pattern
- `packages/perseus/src/widgets/free-response/__docs__/free-response-interactions-regression.stories.tsx` — reference for interactions pattern
- `packages/perseus/src/widgets/label-image/__docs__/label-image-initial-state-regression.stories.tsx` — reference for `!manifest` tag
- `packages/perseus/src/widgets/label-image/__docs__/label-image-interactions-regression.stories.tsx` — reference for `within` + `waitFor` pattern

**Memory consulted:** `feedback_sortable_chromatic_stories.md` — TeX in card items causes non-deterministic Chromatic snapshots (two-step async: TeX load → measurement). Plain text options used instead.

**Adaptations for component vs. widget:**
- No renderer decorator file needed — Sortable renders directly without QuestionRenderer wrapper
- No `getWidget("sortable")` — `Sortable` is imported directly
- Import path for `.storybook/modes`: `../../../../../.storybook/modes` (components/__docs__ is 5 levels from repo root, widgets/__docs__ is 6 levels)
- `tags: ["!autodocs", "!manifest"]` — consistent with all existing regression stories

**Import path verified:**
`packages/perseus/src/components/__docs__/` → `../../../../../.storybook/modes` ✓

**Interaction patterns identified:**
- Dragging state triggered by `onMouseDown` on a card: sets `item.state = ItemState.DRAGGING`
- `onMouseDown` calls `requestAnimationFrame` before updating state — play function needs `waitFor` to wait for the async state update
- After dragging state is set, a `Placeholder` renders alongside the dragging card → list goes from 3 items to 4 items
- `waitFor(() => expect(canvas.getAllByRole("listitem")).toHaveLength(4))` used to confirm rAF + setState completed
- Mouse held with `userEvent.pointer({target: cards[0], keys: "[MouseLeft>]"})` (no release)

**Story coverage plan:**
- Initial state:
  - `HorizontalLayout` — covers card background (#fff) and border (#ddd)
  - `VerticalLayout` — covers same in vertical orientation
  - `DisabledState` — covers disabled appearance (transparent border, inherit background)
- Interactions:
  - `DraggingCard` — covers dragging (#ffedcd background) AND placeholder (#ddd background, #ccc border)

**Deviation noted:** The workflow template includes a "renderer decorator" file (File 1). This file is not applicable to Sortable since it is a component that renders standalone, not a widget wrapped in a question renderer. Only the two story files are created.

### Files Created

**`packages/perseus/src/components/__docs__/sortable-initial-state-regression.stories.tsx`**
- `HorizontalLayout` — default horizontal, 3 plain-text items
- `VerticalLayout` — vertical layout variant
- `DisabledState` — horizontal with `disabled: true`

**`packages/perseus/src/components/__docs__/sortable-interactions-regression.stories.tsx`**
- `DraggingCard` — horizontal, holds mousedown on first card; uses `waitFor` to wait for `requestAnimationFrame` + `setState` to apply dragging state and render placeholder

---

## Step 3 — Pre-Push Quality Checks — Regression Stories

- `pnpm lint` — PASS
- `pnpm tsc` — PASS
- `pnpm test` — PASS
- Storybook interaction verification — PASS (`DraggingCard` play function completes; Interactions tab shows green checkmarks)

---

## Step 4 — Set Up Baseline Chromatic Snapshots

Regression stories committed and pushed in a dedicated baseline PR. Chromatic snapshots approved by user — baseline established.

---

## Step 5 — Font Conversion

**File changed:** `packages/perseus/src/styles/widgets/sortable.css`

| Location | Before | After |
|---|---|---|
| `.perseus-sortable .perseus-sortable-draggable > div` | `font-size: 14px` | `font-size: var(--wb-font-body-size-small)` |

**Token resolution:** `font.body.size.small` → `sizing.size_140` → `pxToRem(14)` = `0.875rem` (exactly 14px at standard 16px browser root). CSS file uses the CSS variable form directly — no JS import needed.

**Note:** Steps 5–7 were originally marked skipped because the initial audit missed `sortable.css` (scanned only `sortable.tsx`). Un-skipped after the file was discovered during Step 9 review.

---

## Steps 6–7 — Pre-Push Quality Checks and Chromatic Diff — Fonts

Steps 6 and 7 are folded into the existing Step 12 quality checks and Step 13 Chromatic review since the font change is being committed alongside the color changes.

---

## Step 8 — Figma Token Lookup

### Figma Design Search

**Result:** No Figma design found. Sortable is a component, not a widget — it does not have a page in the Perseus Widgets Figma file (`HlLQJqNeMTLenuDfkyzYzE`). All conversions will use the mapping table in `color-conversion-rules.md`.

### Import Changes Required

`packages/perseus/src/components/sortable.tsx` — no existing `@khanacademy/wonder-blocks-tokens` import. Will add:
```typescript
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
```

### CSS Context Notes

All 5 colors are inside `StyleSheet.create()`. Per conversion rules, JS token values are valid inside Aphrodite objects — no CSS variables needed. `border: "1px solid #..."` string values will become template literals using the JS token.

### Token Mapping Table

| Hardcoded value | CSS property | StyleSheet key | Closest WB token | Target token | Source |
|---|---|---|---|---|---|
| `#fff` | `background` | `card` | `color.white` `#FFFFFF` | `semanticColor.core.background.base.default` | Mapping table |
| `#ddd` | `border` (1px solid) | `card` | `color.fadedOffBlack16` `#DBDCDD` | `semanticColor.core.border.neutral.subtle` | Mapping table |
| `#ddd` | `background` | `placeholder` | `color.fadedOffBlack16` `#DBDCDD` | `semanticColor.core.background.disabled.strong` | Mapping table (Confluence) |
| `#ccc` | `border` (1px solid) | `placeholder` | ~`color.fadedOffBlack32` `#B8B9BB` | `semanticColor.core.border.neutral.subtle` | Mapping table |
| `#ffedcd` | `background` | `dragging` | `color.fadedGold8` `#FFF9EB` | `semanticColor.core.background.warning.subtle` | Mapping table (corrected — see note) |

### Judgment Calls

**`#ddd` placeholder background:** The Confluence table maps `fadedOffBlack16` (background context) → `semanticColor.core.background.disabled.strong`, while the codemod mapping table maps it → `background.neutral.subtle`. Followed the Confluence table: a placeholder slot is semantically "disabled/unavailable" (the dragged card has left this slot), making `disabled.strong` a more accurate match. Will revisit in semantic check (Step 10).

**`#ffedcd` dragging background:** Initially mapped to `warning.default` by hex proximity to `color.fadedGold24` (`#FFECC2`). However, in the SYL Light theme `warning.default` resolves to `#F7B92C` — a saturated amber with only 3.394:1 contrast ratio against the card's dark text (below AA). Corrected to `warning.subtle` (`#FFF9EB`), a very light warm tint that closely matches the original `#ffedcd` and provides sufficient contrast. Semantically imprecise either way (dragging is not a "warning" state) — flagged as design gap.

### Design Gap

> **Design gap:** `dragging` style in `sortable.tsx` — no semantic token exists for "card in active drag" state. Token chosen (`warning.subtle`) reflects closest accessible hex match. Recommend design adds an explicit active/in-progress interaction token or documents the intended semantic for this state.

---

## Step 9 — Convert Color Tokens

**File changed:** `packages/perseus/src/components/sortable.tsx`

**Import added:**
```typescript
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
```

**Conversions applied:**

| Location | Before | After |
|---|---|---|
| `card.background` | `"#fff"` | `semanticColor.core.background.base.default` |
| `card.border` | `"1px solid #ddd"` | `` `1px solid ${semanticColor.core.border.neutral.subtle}` `` |
| `placeholder.background` | `"#ddd"` | `semanticColor.core.background.disabled.strong` |
| `placeholder.border` | `"1px solid #ccc"` | `` `1px solid ${semanticColor.core.border.neutral.subtle}` `` |
| `dragging.background` | `"#ffedcd"` | `semanticColor.core.background.warning.subtle` (corrected from `warning.default` — contrast failure) |

**Left unchanged:** `disabled.backgroundColor: "inherit"` and `disabled.border: "1px solid transparent"` — CSS keywords, not color values; replacing them would break the disabled appearance.

---

## Step 10 — Semantic Color Check

### `card.background` → `semanticColor.core.background.base.default`

1. **What is it doing?** Default fill of a sortable card in its resting state.
2. **Category fit?** `base` — this is a plain white surface, the default page/component background. Confident match.
3. **Intensity fit?** `default` — standard white surface (not a tinted variant). Confident match.
4. **Namespace fit?** `background` property → `background` namespace. ✅

### `card.border` → `semanticColor.core.border.neutral.subtle`

1. **What is it doing?** Thin border defining the card's edge in its resting state.
2. **Category fit?** `neutral` — no semantic meaning (not an error, not active, not selected). A plain structural border. Confident match.
3. **Intensity fit?** `subtle` — very light, non-prominent border. `#ddd` ≈ `fadedOffBlack16`, the lightest non-transparent neutral border. Confident match.
4. **Namespace fit?** `border` property → `border` namespace. ✅

### `placeholder.background` → `semanticColor.core.background.disabled.strong`

1. **What is it doing?** Background of the ghost slot where the dragged card was removed from — a visual indicator that a card "lives here" but is currently in flight.
2. **Category fit?** `disabled` — the slot is temporarily not interactable/occupied. `neutral.subtle` was considered (codemod mapping), but `disabled.strong` from the Confluence table is semantically closer: the placeholder communicates "this position is unavailable right now." ⚠️ Moderate confidence — this judgment call is documented in Step 8.
3. **Intensity fit?** `strong` — the placeholder has a visible solid fill (`#ddd`), not a faint wash. `strong` is the most filled disabled shade. Confident match.
4. **Namespace fit?** `background` property → `background` namespace. ✅

### `placeholder.border` → `semanticColor.core.border.neutral.subtle`

1. **What is it doing?** Border of the ghost placeholder slot. Slightly darker than the card border (`#ccc` vs `#ddd`) to keep the slot visually defined.
2. **Category fit?** `neutral` — no semantic meaning, just structural definition. Confident match.
3. **Intensity fit?** `subtle` — `#ccc` maps to ~`fadedOffBlack32`, and both `fadedOffBlack16` and `fadedOffBlack32` map to `border.neutral.subtle` in the border context. Confident match.
4. **Namespace fit?** `border` property → `border` namespace. ✅

### `dragging.background` → `semanticColor.core.background.warning.subtle`

1. **What is it doing?** Background highlight of a card currently being dragged by the user.
2. **Category fit?** `warning` — **imprecise semantic fit.** A card being dragged is not a warning or cautionary state. The gold/warm family is the best available approximation in the current palette. ⚠️ Lower confidence — flagged as a design gap in Step 8.
3. **Intensity fit?** `subtle` — originally mapped to `warning.default`, but in SYL Light that token resolves to `#F7B92C` (saturated amber, contrast ratio 3.394:1 — below AA). Corrected to `subtle` (`#FFF9EB`), a very light warm tint that closely matches the original `#ffedcd` and passes contrast. `subtle` also better reflects the original intent: a faint highlight, not a strong filled indicator.
4. **Namespace fit?** `background` property → `background` namespace. ✅

---

## Step 11 — Visual Check

### Figma Screenshots

No Figma design exists for Sortable (it is a component, not a widget and does not have a page in the Perseus Widgets Figma file). All states are design gaps — no Figma vs. Storybook comparison is possible.

### Story Fix (discovered during this step)

**File:** `packages/perseus/src/components/__docs__/sortable-interactions-regression.stories.tsx`

**Issue:** Storybook 10 requires explicit `fn()` spy declarations for callback props used during `play` functions. The `DraggingCard` story's play function triggers `onMeasure` (called after Sortable measures card dimensions during a drag), causing a "We detected that you use an implicit action arg while playing of your story" error.

**Fix:** Added `fn` to the `storybook/test` import and `onMeasure: fn()` to `DraggingCard.args`.

### Storybook Screenshots

All 4 stories rendered correctly after the fix:

| Story | Result |
|---|---|
| `HorizontalLayout` | ✅ White card backgrounds, light gray borders |
| `VerticalLayout` | ✅ Same treatment, stacked vertically |
| `DisabledState` | ✅ No borders visible, backgrounds inherit from page |
| `DraggingCard` | ✅ First card renders with gold/warning background; remaining cards white with border |

**DraggingCard detail:** The `waitFor` confirmed 4 list items (dragging card + placeholder). The dragging card and placeholder share the same visual position (no `mousemove` — only `mousedown` held), so 3 distinct visual positions are shown. The gold background confirms `semanticColor.core.background.warning.default` is resolving correctly.

### Design Gaps (all states — no Figma coverage)

> **Design gap:** `card` (default) — no Figma state found. Tokens chosen from mapping table.

> **Design gap:** `placeholder` — no Figma state found. Token chosen from mapping table.

> **Design gap:** `dragging` — no Figma state found. Token chosen from mapping table (hex proximity to `fadedGold24`).

> **Design gap:** `disabled` — not converted (uses CSS keywords `inherit` and `transparent`, not color values).

### Regression Story Coverage

| Visual state | Converted color(s) | Covered by story |
|---|---|---|
| Card default | `background`, `border` | ✅ `HorizontalLayout`, `VerticalLayout` |
| Placeholder | `background`, `border` | ✅ `DraggingCard` (4th list item) |
| Dragging | `background` | ✅ `DraggingCard` (gold card) |
| Disabled | none (CSS keywords, not converted) | ✅ `DisabledState` |

All converted colors are covered by at least one regression story.

---

## Step 12 — Pre-Push Quality Checks — Colors and Font

- `pnpm lint` — PASS
- `pnpm tsc` — PASS
- `pnpm test` — PASS (223 passed, 9 snapshots passed)