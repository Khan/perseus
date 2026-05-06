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

None found. No `fontSize`, `fontWeight`, `lineHeight`, or `fontFamily` in any sortable files.

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