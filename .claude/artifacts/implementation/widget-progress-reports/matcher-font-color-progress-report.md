# Matcher Widget — Font & Color Conversion Progress Report

Widget: `matcher`
Workflow: font-color
Started: 2026-05-01

---

## Step 1 — Audit the Widget

### Commands Run

```bash
# Find primitive color token usage
grep -r "color\." packages/perseus/src/widgets/matcher/ --include="*.tsx" --include="*.ts" --include="*.css" -n
# Result: no output

# Find hardcoded hex values
grep -r "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/matcher/ -n
# Result: packages/perseus/src/widgets/matcher/matcher.tsx:289:const border = "1px solid #444";

# Find hardcoded rgb(a) values
grep -rn "rgba?\([^)]+\)" packages/perseus/src/widgets/matcher/
# Result: no output

# Check 4 font attributes
grep -rEn "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/matcher/
# Result: packages/perseus/src/widgets/matcher/matcher.tsx:315:        fontWeight: "inherit",
```

### Colors to be Tokenized:

**Files with hardcoded color values:**

- `packages/perseus/src/widgets/matcher/matcher.tsx`
  - Line 289: `#444` (used in `const border = "1px solid #444"`)

### Fonts to be Tokenized:

- `packages/perseus/src/widgets/matcher/matcher.tsx`
  - Line 315: `fontWeight: "inherit"`

---

## Step 2 — Create Regression Stories

### Research (Gate Check)

#### Files Examined
- `packages/perseus/src/widgets/matcher/matcher.tsx` — main widget component
- `packages/perseus/src/widgets/matcher/matcher.stories.tsx` — existing stories (uses `ServerItemRendererWithDebugUI`)
- `packages/perseus/src/widgets/matcher/matcher.testdata.ts` — test data (question1: 5-item matching)
- `packages/perseus/src/components/sortable.tsx` — shared Sortable component used inside Matcher
- `packages/perseus/src/widgets/__testutils__/label-image-renderer-decorator.tsx` — reference decorator pattern
- `packages/perseus/src/widgets/label-image/__docs__/label-image-initial-state-regression.stories.tsx` — reference initial state stories
- `packages/perseus/src/widgets/label-image/__docs__/label-image-interactions-regression.stories.tsx` — reference interactions stories
- `packages/perseus-core/src/data-schema.ts` — `PerseusMatcherWidgetOptions` type
- `packages/perseus-core/src/utils/generators/` — no matcher generator exists

#### Test Data Discovered
- `question1` in `matcher.testdata.ts`: 5-item match (Claims ↔ Evidence), labels `["**Claims**", "**Evidence**"]`, `orderMatters: false`, `padding: true`
- No TeX content in existing testdata; will construct new inline args with TeX labels for stories

#### Import Paths Verified
- `ServerItemRendererWithDebugUI`: `../../testing/server-item-renderer-with-debug-ui` (from `__testutils__/`)
- `generateTestPerseusItem`, `generateTestPerseusRenderer`: `@khanacademy/perseus-core`
- `themeModes`: `../../../../../../.storybook/modes` (from `matcher/__docs__/`)
- `getWidget`: `../../../widgets` (from `matcher/__docs__/`)
- `rtlDecorator`: `../../__testutils__/story-decorators` (from `matcher/__docs__/`)
- No `generateMatcherWidget` / `generateMatcherOptions` generator — widget constructed inline in decorator
- `PerseusMatcherWidgetOptions` from `@khanacademy/perseus-core`

#### Interaction Patterns Identified
- Primary interaction: drag-and-drop using jQuery mouse events — not practically simulable in a play function
- Sortable `<li>` items have no ARIA roles or labels; can't be queried by role
- The left column is disabled (non-sortable) when `orderMatters: false`
- The only simulable interaction via play function: clicking "Check answer" in `ServerItemRendererWithDebugUI`
- Matcher has no graded-state coloring in its own styles; graded state shows the renderer ScoreBar

#### Color Coverage by Story
- `#444` on `columnRight.borderLeft` (vertical column divider) → always visible in default render → **initial state** stories cover it
- `#444` on `columnLabel.borderBottom` (header row underline) → visible only when `showLabels` is true → **DefaultWithLabels** story covers it
- `fontWeight: "inherit"` on `columnLabel` → visible when labels present → **DefaultWithLabels** story covers it

#### Story Plan
**Decorator** (`matcher-renderer-decorator.tsx` in `__testutils__/`):
- Uses `ServerItemRendererWithDebugUI` (matches existing matcher story pattern)
- Constructs widget inline (no generator); spreads `args` into `options`

**Initial state** (`matcher-initial-state-regression.stories.tsx` in `matcher/__docs__/`):
1. `DefaultWithLabels` — standard widget with text labels; shows both `#444` borders and `fontWeight: "inherit"`
2. `WithoutLabels` — labels `["", ""]`; header row hidden, only `borderLeft` visible (distinct DOM structure from DefaultWithLabels)
3. `WithTexLabels` — TeX math in labels and item cards; tests TeX rendering alongside `#444` borderBottom
4. `OrderMatters` — `orderMatters: true`; left column renders as draggable cards rather than flat/disabled

**Stories considered and removed:**
- `RightToLeft` — removed. Matcher uses physical CSS properties (`border-left`, `text-align: center`) that do not respond to `direction: rtl`, confirmed visually in Storybook. Story was pixel-identical to `DefaultWithLabels`. RTL story appropriate only if/when Matcher adopts logical CSS properties (`border-inline-start`, etc.).
- `GradedIncorrect` (interactions) — removed. Matcher has no graded-state coloring in its own styles. All meaningful interactions (drag-and-drop, `#ffedcd` dragging highlight, placeholder styling) are in `packages/perseus/src/components/sortable.tsx`, which is shared with Sorter and will be migrated in a dedicated PR after both widgets have Chromatic baselines.

#### Files Created
- `packages/perseus/src/widgets/__testutils__/matcher-renderer-decorator.tsx` — uses `ServerItemRendererWithDebugUI`, constructs widget inline (no generator available)
- `packages/perseus/src/widgets/matcher/__docs__/matcher-initial-state-regression.stories.tsx` — 4 stories: `DefaultWithLabels`, `WithoutLabels`, `WithTexLabels`, `OrderMatters`

#### Issues Fixed During Creation
- Import order: `matcher-renderer-decorator` moved before `story-decorators` (ESLint `import/order`)
- Prettier formatting: multi-line short arrays for `left`/`right` collapsed to single line
- Trailing newline removed (Prettier)

---

## Step 3 — Pre-Push Quality Checks (Regression Stories)

```
pnpm lint   → PASS (no errors)
pnpm tsc    → PASS (no output)
pnpm test   → PASS (2 suites, 11 tests, 3 snapshots)
```

> User action required: Run `pnpm storybook` locally and verify all 4 initial state stories render correctly (no spinner stuck, TeX renders, OrderMatters shows both columns as cards).

---

## Step 4 — Chromatic Baseline

Regression stories committed and pushed. Chromatic snapshots approved — baseline established.

---

## Step 5 — Font Conversion

No changes. The only font attribute found in the audit was `fontWeight: "inherit"` (matcher.tsx:315), which is explicitly excluded from tokenization per font-conversion-rules.md (`font-weight: inherit` → Do NOT tokenize).

## Step 6 — Pre-Push Quality Checks (Fonts)

Skipped — no font changes made.

## Step 7 — Push and Review Chromatic Diffs (Fonts)

Skipped — no font changes to push.

---

## Step 8 — Figma Token Lookup

### Figma Page
- File: `HlLQJqNeMTLenuDfkyzYzE` (Perseus Widgets)
- Page: Matcher — node `2476:4165`
- URL: https://www.figma.com/design/HlLQJqNeMTLenuDfkyzYzE/Perseus-Widgets?node-id=2476-4165

### Nodes Examined
- `2477:4316` — `Matcher` (full widget component)
- `2477:4274` — `_Base/Header` (column header row)

### `get_variable_defs` Results
Both nodes returned `semanticColor.core.border.neutral.strong: #4a4c53` as the border token.

### Token Mapping Table

| Hardcoded value | CSS property | Figma state | Target token | Source |
|---|---|---|---|---|
| `#444` | `borderLeft`, `borderBottom` (via `const border`) | Matcher / _Base/Header | `semanticColor.core.border.neutral.strong` | Figma |

### Design Gaps
None — the single color in the audit is fully covered by Figma.

---

## Step 9 — Convert Color Tokens

### Changes Made — `packages/perseus/src/widgets/matcher/matcher.tsx`

**Import added:**
```diff
+ import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
```

**Color converted (line 289):**
```diff
- const border = "1px solid #444";
+ const border = `1px solid ${semanticColor.core.border.neutral.strong}`;
```

Both uses of `border` (`columnRight.borderLeft` and `columnLabel.borderBottom`) are covered by this single constant change.

### Files That Needed Import Added
- `packages/perseus/src/widgets/matcher/matcher.tsx` — added `semanticColor` import

---

## Step 10 — Semantic Color Check

### Token: `semanticColor.core.border.neutral.strong`
**File:** `packages/perseus/src/widgets/matcher/matcher.tsx:289`
**Element:** `const border` — applied to `columnRight.borderLeft` (vertical column divider) and `columnLabel.borderBottom` (horizontal line under column headers)

| Question | Answer | Confidence |
|---|---|---|
| What is this element doing? | Structural separator between the two columns and below headers. Always visible, no interaction state. | — |
| Semantic category — `neutral`? | ✅ Pure organizational divider; no correctness, active, or disabled meaning. | High |
| Intensity — `strong`? | ✅ Primary structural border of the widget. `subtle` would be invisible as a column divider; `strong` is correct for a prominent, always-visible separator. | High |
| Namespace — `border`? | ✅ CSS properties are `borderLeft` and `borderBottom`. | High |

**Judgment calls / uncertainty:** None. All four dimensions are confident matches. Token also confirmed by Figma — no table-only mapping was needed.

### Updated Token Mapping Table

| Hardcoded value | CSS property | Figma state | Target token | Source | Semantic check |
|---|---|---|---|---|---|
| `#444` | `borderLeft`, `borderBottom` | Matcher / _Base/Header | `semanticColor.core.border.neutral.strong` | Figma | ✅ Confident |

---

## Step 12 — Pre-Push Quality Checks (Colors)

```
pnpm lint        → PASS
pnpm tsc         → PASS
pnpm test        → 3 snapshots updated (border hex #444 → #4a4c53), all tests pass
```

> User action required: Run `pnpm storybook` and verify the 4 regression stories still render correctly with the new border color.