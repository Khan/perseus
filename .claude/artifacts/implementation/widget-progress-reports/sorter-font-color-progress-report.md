# Sorter Widget — Font and Color Conversion Progress Report

## Widget: Sorter
## Workflow: Font and Color Conversion
## Date: 2026-05-01

---

## Step 1 — Audit the Widget

### Commands Run

```bash
# Find primitive color token usage
grep -r "color\." packages/perseus/src/widgets/sorter/ --include="*.tsx" --include="*.ts" --include="*.css"

# Find hardcoded hex values
grep -rn "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/sorter/

# Find hardcoded rgb(a) values
grep -rn "rgba\?([^)]\+)" packages/perseus/src/widgets/sorter/

# Check 4 font attributes
grep -rEn "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/sorter/
```

### Files in Sorter Widget Directory

- `packages/perseus/src/widgets/sorter/index.ts`
- `packages/perseus/src/widgets/sorter/sorter.tsx`
- `packages/perseus/src/widgets/sorter/sorter.testdata.ts`
- `packages/perseus/src/widgets/sorter/sorter.stories.tsx`
- `packages/perseus/src/widgets/sorter/serialize-sorter.test.ts`

### Colors to be Tokenized

No color token usage, hardcoded hex values, or rgb/rgba values were found in the sorter widget directory (`packages/perseus/src/widgets/sorter/`).

**Note:** The Sorter widget delegates all visual rendering to the shared `Sortable` component (`packages/perseus/src/components/sortable.tsx`), which also serves the Matcher widget. That component contains hardcoded hex colors at:
- Line 920: `background: "#fff"` (card style)
- Line 921: `border: "1px solid #ddd"` (card style)
- Line 935: `background: "#ddd"` (placeholder style)
- Line 936: `border: "1px solid #ccc"` (placeholder style)
- Line 958: `background: "#ffedcd"` (dragging style)

These are shared-component colors — they are outside the sorter widget directory and will affect both the Sorter and Matcher widgets if changed.

### Fonts to be Tokenized

No `fontSize`, `fontWeight`, `lineHeight`, or `fontFamily` attributes were found in the sorter widget directory.

### Summary

The Sorter widget directory itself has **no color or font attributes** that require tokenization. All styling for the Sorter widget comes from the shared `Sortable` component, which is outside the widget directory scope.

---

## Step 2 — Create Regression Stories

### Research

**Files examined:**
- `packages/perseus/src/widgets/sorter/sorter.tsx` — Main widget, delegates rendering to `Sortable` via `QuestionRendererForStories` pattern (no "Check answer" needed)
- `packages/perseus/src/widgets/sorter/sorter.testdata.ts` — Has one `question1` with horizontal layout, text items, TeX math
- `packages/perseus/src/widgets/sorter/sorter.stories.tsx` — Existing story using `ServerItemRendererWithDebugUI`
- `packages/perseus/src/components/sortable.tsx` — Shared component, contains all styling; states: STATIC, DRAGGING, ANIMATING, DISABLED
- `packages/perseus/src/widgets/__testutils__/question-renderer-for-stories.tsx` — Renderer for stories
- `packages/perseus/src/widgets/__testutils__/story-decorators.tsx` — Provides `rtlDecorator`
- `packages/perseus/src/widgets/label-image/__docs__/label-image-initial-state-regression.stories.tsx` — Reference example
- `packages/perseus/src/widgets/label-image/__docs__/label-image-interactions-regression.stories.tsx` — Reference example
- `packages/perseus-core/src/data-schema.ts` — `PerseusSorterWidgetOptions`: `{correct: string[], padding: boolean, layout: "horizontal" | "vertical"}`

**No sorter widget generator exists** in `packages/perseus-core/src/utils/generators/` — widget options must be constructed inline.

**Widget type:** `PerseusSorterWidgetOptions` is exported from `@khanacademy/perseus-core`.

**Renderer choice:** `QuestionRendererForStories` — the Sorter widget does not require a "Check answer" button or graded visual states from the Sortable cards.

**Visual states from Sortable component:**
- `card` (static): background `#fff`, border `1px solid #ddd` — always visible in default state
- `placeholder`: background `#ddd`, border `1px solid #ccc` — shown during drag at drop target
- `dragging`: background `#ffedcd`, opacity 0.8 — shown on card being dragged

**Drag interaction mechanism:** Uses jQuery `mousemove`/`mouseup` on `$(document)` with `requestAnimationFrame`. The `onMouseDown` handler on `<li>` fires a `requestAnimationFrame` then calls `props.onMouseDown()` to set item state to DRAGGING.

**Interaction patterns identified:**
- Press and hold on a card (mousedown) triggers DRAGGING state after a rAF cycle
- Releasing (mouseup) transitions to ANIMATING, then STATIC

**Initial state vs interactions coverage:**
- Initial state: default horizontal layout, vertical layout, TeX content — these cover the card/static visual state
- Interactions: mousedown on a card to trigger dragging state — covers the `#ffedcd` dragging color
- The sorter widget is text-heavy and RTL would be relevant; RTL story should be included

### Story Reasoning

**Initial state stories:**
1. `DefaultHorizontal` — horizontal layout with text items (covers default card state with `#fff`/`#ddd` colors)
2. `VerticalLayout` — vertical layout (ensures card sizing and column layout renders correctly)
3. `WithTeXContent` — horizontal layout with TeX math expressions (confirms math renders inside cards)
4. `RightToLeft` — RTL direction with text items (the widget renders text cards, so RTL direction meaningfully changes visual layout)

**Interaction stories:**
1. `DraggingCard` — mousedown on first card to trigger the DRAGGING state with `#ffedcd` background

### Files Created

- `packages/perseus/src/widgets/sorter/__docs__/sorter-renderer-decorator.tsx`
  - Uses `QuestionRendererForStories`
  - Constructs `SorterWidget` inline (no generator exists for sorter)
  - Spreads `args` into `PerseusSorterWidgetOptions`

- `packages/perseus/src/widgets/sorter/__docs__/sorter-initial-state-regression.stories.tsx`
  - 4 stories: `DefaultHorizontal`, `VerticalLayout`, `WithTeXContent`, `RightToLeft`
  - All use `sorterRendererDecorator`
  - `RightToLeft` uses `rtlDecorator`

- `packages/perseus/src/widgets/sorter/__docs__/sorter-interactions-regression.stories.tsx`
  - 1 story: `DraggingCard`
  - Uses `userEvent.pointer` with `[MouseLeft>]` to trigger mousedown
  - Waits one `requestAnimationFrame` for drag state to apply

### Quality Checks

- `pnpm lint`: PASS (after auto-fix for import ordering and prettier formatting)
- `pnpm tsc`: PASS
- `pnpm test` (sorter widget): PASS — 1 test suite, 1 test passed
