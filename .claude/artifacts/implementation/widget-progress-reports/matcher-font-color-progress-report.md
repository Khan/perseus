# Matcher Widget — Font and Color Conversion Progress Report

## Widget: matcher
## Workflow: font-color
## Date: 2026-05-01

---

## Step 11 — Visual Check

### Figma Screenshots
No Figma design found for the matcher widget — no Figma screenshots available.

### Regression Story Coverage

| State | Covered by story? |
|---|---|
| Default with labels (both borders visible) | ✅ `WithLabels` |
| Without labels (column separator only) | ✅ `WithoutLabels` |
| TeX math content in columns | ✅ `WithTexContent` |
| Order matters (left column fixed) | ✅ `OrderMatters` |
| RTL layout | ✅ `RightToLeft` |
| Graded state (after check answer) | ✅ `GradedState` |

**Coverage:** All visual states are covered by regression stories. The single hardcoded color (`#444` border) appears in `WithLabels` (both border types) and `WithoutLabels` (column separator only).

> **User action required:** Run `pnpm storybook` and verify the regression stories render correctly.

---

## Step 12 — Pre-Push Quality Checks — Colors

### Commands Run

```bash
eslint packages/perseus/src/widgets/matcher/ packages/perseus/src/widgets/__testutils__/matcher-renderer-decorator.tsx
# Result: No errors

pnpm tsc
# Result: Pass (no output = success)

jest packages/perseus/src/widgets/matcher
# Result: 3 snapshots failed (expected — border color value changed from #444 to semantic token)
# Fixed by running: jest packages/perseus/src/widgets/matcher -u
# After update: 2 test suites, 11 tests, 3 snapshots updated — all passed
```

### Status: All checks pass ✓

---

## Step 9 — Convert Color Tokens

### Research Before Conversion

**Files examined:**
- `matcher.tsx` — no existing `@khanacademy/wonder-blocks-tokens` import; `semanticColor` import added after `@khanacademy/wonder-blocks-progress-spinner`

### Changes Made

**File:** `packages/perseus/src/widgets/matcher/matcher.tsx`

Import added:
```diff
+ import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
```

Color conversion:
```diff
- const border = "1px solid #444";
+ const border = `1px solid ${semanticColor.core.border.neutral.strong}`;
```

This affects two usages:
- `columnRight: { borderLeft: border }` — vertical column separator
- `columnLabel: { borderBottom: border }` — label row bottom border

**Files requiring new `semanticColor` import:**
- `packages/perseus/src/widgets/matcher/matcher.tsx` ✓ (added)

---

## Step 10 — Semantic Color Check

### Token-by-Token Analysis

**Token: `semanticColor.core.border.neutral.strong`**

1. **What is this element doing?**
   - `columnRight.borderLeft`: A 1px vertical line separating the left column (static concepts) from the right column (draggable answers) in the matcher table. This is a structural/layout separator.
   - `columnLabel.borderBottom`: A 1px horizontal line below the column header labels, separating the header row from the content rows. Also a structural separator.
   - Both are **decorative structural dividers** in a default/resting state — they don't communicate any semantic feedback (correct/incorrect/active).

2. **Does the semantic category fit?**
   - `neutral` ✅ — The border has no semantic meaning (not instructive, success, critical, or warning). It simply separates two content areas visually. `neutral` is the correct category.

3. **Does the intensity fit?**
   - `strong` ✅ — The original `#444` (`#444444`) is darker than the `default` token (`#909296`) and the available `strong` token (`#5F6167`). The separator is a prominent visual element that should be clearly visible. `strong` is the darkest neutral border available and best represents the original intent of a visible column separator.
   - **Judgment call:** `#444` is slightly darker than `neutral.strong` (`#5F6167`). There is no exact match in the token system. `strong` is chosen as the closest semantic fit because: (a) it's the darkest neutral border token, (b) the intent is a clearly visible separator, and (c) the token system does not have an intermediate option.

4. **Does the namespace fit the CSS property?**
   - `border` namespace ✅ — Used in `borderLeft` and `borderBottom` CSS properties. This maps exactly to the `border` namespace.

**Confidence level:** High for semantic correctness; minor uncertainty on intensity (the original `#444` is slightly darker than `neutral.strong`, but `strong` is the correct semantic choice as the most prominent neutral border option).

### Updated Token Mapping Table

| Hardcoded value | CSS property | Figma state | Target token | Source | Semantic confidence |
|---|---|---|---|---|---|
| `#444` | `borderLeft`, `borderBottom` | No Figma state | `semanticColor.core.border.neutral.strong` | Mapping table | High |

---

## Step 8 — Figma Token Lookup

### Figma Search

Checked the widget table in `visual-check.md` for "matcher" — no entry found.

Per `figma-token-lookup.md`: "If the widget is **not in the table**, record 'No Figma design found' in the progress report and proceed using the mapping table in `color-conversion-rules.md` for all conversions."

**Decision: No Figma design found for the matcher widget. All conversions proceed via `color-conversion-rules.md` mapping table.**

### Color Analysis

The only hardcoded color in the matcher widget is:
- `#444` (`#444444`) — used in `const border = "1px solid #444"` applied via:
  - `columnRight.borderLeft: border` — vertical column separator (border context)
  - `columnLabel.borderBottom: border` — label row bottom border (border context)

### Token Mapping

`#444` does not appear in the named legacy color tokens. Applying the mapping rules:
- **CSS context:** `border` / `borderLeft` / `borderBottom` → context is `border`
- **Semantic category:** gray/neutral separator → `neutral`
- **Intensity:** `#444444` is darker than all available neutral border tokens. The darkest available is `neutral.strong` (≈ `#5F6167`). This is the closest semantic match for a prominent structural column separator.

**Design gap:** `#444` is darker than any named WB neutral token. No Figma design exists for this widget. Token chosen from mapping table as `semanticColor.core.border.neutral.strong` (the strongest neutral border token available, matching the separator's intent).

### Final Token Mapping Table

| Hardcoded value | CSS property | Figma state | Target token | Source |
|---|---|---|---|---|
| `#444` | `borderLeft`, `borderBottom` | No Figma state | `semanticColor.core.border.neutral.strong` | Mapping table |

---

## Step 2 — Create Regression Stories

### Gate Check — Research Before Creating Files

**Files examined:**
- `packages/perseus/src/widgets/matcher/matcher.tsx` — Main widget file; class component using Aphrodite styles; renders a two-column table with `Sortable` in each column
- `packages/perseus/src/widgets/matcher/matcher.stories.tsx` — Existing stories use `ServerItemRendererWithDebugUI`; imports `question1` from testdata
- `packages/perseus/src/widgets/matcher/matcher.testdata.ts` — Contains `question1` with 5 pairs, non-TeX text content, labels present
- `packages/perseus/src/widgets/__testutils__/label-image-renderer-decorator.tsx` — Reference for `ServerItemRendererWithDebugUI` decorator pattern
- `packages/perseus/src/widgets/label-image/__docs__/label-image-initial-state-regression.stories.tsx` — Reference initial state stories pattern
- `packages/perseus/src/widgets/label-image/__docs__/label-image-interactions-regression.stories.tsx` — Reference interactions stories pattern
- `packages/perseus/src/components/sortable.tsx` — Sortable has a `dragging` state with `background: "#ffedcd"` — this is in sortable, NOT in matcher; out of scope for matcher audit

**Generators checked:**
- No matcher generator exists in `packages/perseus-core/src/utils/generators/` — widget structure must be manually constructed in the decorator

**PerseusMatcherWidgetOptions type confirmed:**
```typescript
{
    labels: string[];     // Column heading labels [left, right]
    left: string[];       // Fixed left column items
    right: string[];      // Draggable right column items
    orderMatters: boolean; // If true, left column fixed, only right column draggable
    padding: boolean;      // Padding on rows
}
```

**Import paths verified:**
- `../../../../../../.storybook/modes` → `.storybook/modes.ts` (for `themeModes`)
- `../../../widgets` → `packages/perseus/src/widgets` (for `getWidget`)
- `../../__testutils__/matcher-renderer-decorator` → new decorator file
- `../../__testutils__/story-decorators` → (for `rtlDecorator`)
- `@khanacademy/perseus-core` → `PerseusMatcherWidgetOptions` type

**Interaction patterns identified:**
- Main interaction: drag-and-drop items (hard to automate with `userEvent`)
- Secondary interaction: click "Check answer" button (automatable, shows graded state)
- The `border: "1px solid #444"` appears in static visual elements — `columnRight.borderLeft` (always visible) and `columnLabel.borderBottom` (visible when labels are set)
- RTL direction is relevant for this text-heavy widget — the column layout would visually change

**Renderer choice:** `ServerItemRendererWithDebugUI` — needed for interactions story to click "Check answer"

**Stories plan:**
- Initial state:
  1. `WithLabels` — both border types visible + fontWeight:inherit on labels
  2. `WithoutLabels` — only vertical column separator border visible
  3. `WithTexContent` — TeX math content in both columns
  4. `OrderMatters` — left column fixed, right column draggable
  5. `RightToLeft` — RTL layout verification
- Interactions:
  1. `GradedState` — click "Check answer" to show graded feedback state

### Files Created

- `packages/perseus/src/widgets/__testutils__/matcher-renderer-decorator.tsx`
  - Uses `ServerItemRendererWithDebugUI` (chosen because interactions stories need "Check answer" button)
  - Manually constructs widget structure (no matcher generators in perseus-core)
  
- `packages/perseus/src/widgets/matcher/__docs__/matcher-initial-state-regression.stories.tsx`
  - Stories: `WithLabels`, `WithoutLabels`, `WithTexContent`, `OrderMatters`, `RightToLeft`
  - `WithLabels` covers both border types (`columnRight.borderLeft` and `columnLabel.borderBottom`) and `fontWeight: inherit`
  - `WithoutLabels` covers only the column separator border (label row hidden)
  - `WithTexContent` covers TeX math content alongside borders
  - `OrderMatters` covers fixed left column state
  - `RightToLeft` covers RTL layout (text-heavy widget, direction change is meaningful)

- `packages/perseus/src/widgets/matcher/__docs__/matcher-interactions-regression.stories.tsx`
  - Stories: `GradedState`
  - `GradedState` clicks "Check answer" twice (matches label-image pattern) to capture the graded visual state

### ESLint Fix
- Fixed import order: `matcherRendererDecorator` import moved before `rtlDecorator` import (alphabetical)
- Fixed prettier: array items formatted on single line to match prettier's inline formatting preference

---

## Step 3 — Pre-Push Quality Checks — Regression Stories

### Commands Run

```bash
eslint packages/perseus/src/widgets/matcher/ packages/perseus/src/widgets/__testutils__/matcher-renderer-decorator.tsx
# Result: No errors after fixing import order and prettier formatting

pnpm tsc
# Result: Pass (no output = success)

jest packages/perseus/src/widgets/matcher
# Result: 2 test suites, 11 tests, 3 snapshots — all passed
```

### Status: All checks pass ✓

---

## Step 5 — Font Conversion

### Analysis

The only font attribute found in the audit was:
- `matcher.tsx` line 315: `fontWeight: "inherit"`

Per `font-conversion-rules.md`, `font-weight: inherit` is explicitly listed under **Do NOT tokenize**:
> `font-size: inherit` / `font-weight: inherit` / `line-height: inherit`

**Decision: No font changes required for the matcher widget.**

---

## Step 6 — Pre-Push Quality Checks — Fonts

No font changes were made, so all checks trivially pass from Step 3 results. No re-run needed.

---

---

## Step 1 — Audit the Widget

### Bash Commands Used

```bash
# Find primitive color token usage
grep -r "color\." packages/perseus/src/widgets/matcher/ --include="*.tsx" --include="*.ts" --include="*.css"
# Result: (no output)

# Find hardcoded hex values
grep -r "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/matcher/
# Result: /home/user/perseus/packages/perseus/src/widgets/matcher/matcher.tsx:const border = "1px solid #444";

# Find hardcoded rgb(a) values
grep -r "rgba?\([^)]+\)" packages/perseus/src/widgets/matcher/
# Result: (no output)

# Check 4 font attributes
grep -rE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/matcher/
# Result: /home/user/perseus/packages/perseus/src/widgets/matcher/matcher.tsx:        fontWeight: "inherit",
```

### Colors to be Tokenized:

**Files with hardcoded hex/rgb(a) color values:**

- `packages/perseus/src/widgets/matcher/matcher.tsx`
  - Line 289: `#444` — used in `const border = "1px solid #444"` which is applied to `columnRight.borderLeft` and `columnLabel.borderBottom`

### Fonts to be Tokenized:

- `packages/perseus/src/widgets/matcher/matcher.tsx`
  - Line 315: `fontWeight: "inherit"` — in `columnLabel` style

---

## Step 14 — Deviation Check

### Pre-step: reporting.md
- **Followed as instructed:** Yes
- **Deviations:** None — progress report file was created before any audit research
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 1 — Audit the Widget
- **Followed as instructed:** Yes
- **Deviations:** None — all 4 grep commands were run; colors and fonts documented; Gate Check honored before regression story file creation
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 2 — Create Regression Stories
- **Followed as instructed:** Partially
- **Deviations:**
  1. Progress report Gate Check was honored, but content was inserted into the middle of the progress report rather than appended to the end (violating the "append to end" rule from reporting.md). This caused the step sections to appear out of ascending order in the report.
  2. The interactions file has only 1 story (`GradedState`) rather than multiple. Drag-and-drop is the primary interaction but cannot be reliably automated with `userEvent`. This was a judgment call.
- **Type:** Unintentional (ordering), Intentional (1 interaction story)
- **Recommended Action:** Document in PR — the content is all present and accurate. No content is missing; the ordering is a presentation issue only. The single interaction story is justified since drag-and-drop cannot be automated.

### Step 3 — Pre-Push Quality Checks — Regression Stories
- **Followed as instructed:** Partially
- **Deviations:** `pnpm lint` and `pnpm test` were unavailable because the system ESLint v10 cannot locate the project's `.eslintrc.js` config. Instead, the ESLint v8 binary from the pnpm store (`node_modules/.pnpm/eslint@8.57.1/...`) and the jest binary were invoked directly. The same checks were run with the same scope.
- **Type:** Intentional (necessary due to tool environment)
- **Recommended Action:** No action needed — all checks passed

### Step 4 — Set Up Baseline Chromatic Snapshots
- **Followed as instructed:** Skipped (user action required)
- **Deviations:** User must commit regression stories and open a PR to establish the Chromatic baseline
- **Type:** Intentional (by design — user action)
- **Recommended Action:** User must complete before proceeding to color review

### Step 5 — Font Conversion
- **Followed as instructed:** Yes
- **Deviations:** None — correctly identified `fontWeight: "inherit"` as excluded from tokenization per `font-conversion-rules.md`
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 6 — Pre-Push Quality Checks — Fonts
- **Followed as instructed:** Yes
- **Deviations:** No font changes were made; noted that Step 3 results cover this. No re-run was performed.
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 7 — Push and Review Chromatic Diffs — Fonts
- **Followed as instructed:** Skipped (user action required; no font changes so effectively a no-op)
- **Deviations:** None
- **Type:** Intentional (by design — user action; no changes to push)
- **Recommended Action:** No action needed

### Step 8 — Figma Token Lookup
- **Followed as instructed:** Yes
- **Deviations:** None — checked visual-check.md table; found no matcher entry; proceeded with mapping table as instructed. Token mapping table built and documented.
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 9 — Convert Color Tokens
- **Followed as instructed:** Yes
- **Deviations:** None — added `semanticColor` import; converted `#444` to `semanticColor.core.border.neutral.strong`; Gate Check honored before changes
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 10 — Semantic Color Check
- **Followed as instructed:** Yes
- **Deviations:** None — documented all four semantic check questions for the converted token with reasoning
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 11 — Visual Check
- **Followed as instructed:** Partially
- **Deviations:** Storybook screenshots could not be taken (no browser available in this environment). Figma screenshots not available (no Figma design). Regression story coverage table was completed; no coverage gaps found.
- **Type:** Intentional (user action required for Storybook verification)
- **Recommended Action:** User must verify stories in Storybook before merging

### Step 12 — Pre-Push Quality Checks — Colors
- **Followed as instructed:** Yes
- **Deviations:** Same tooling deviation as Step 3 (direct binary invocation). Snapshot update was required and performed with `jest -u` — this is expected behavior when color values change.
- **Type:** Intentional (necessary due to tool environment; snapshot update expected)
- **Recommended Action:** No action needed

### Step 13 — Push and Review Chromatic Diffs — Colors
- **Followed as instructed:** Skipped (user action required)
- **Deviations:** User must push color changes and review Chromatic diffs
- **Type:** Intentional (by design — user action)
- **Recommended Action:** User must complete

---

## Step 16 — Finalize PR

### PR Title
`[ColorSync] Convert Matcher widget font and colors to semantic tokens`

### PR Summary
Converts the hardcoded `#444` border color in the Matcher widget to `semanticColor.core.border.neutral.strong`, replacing the only non-semantic color value in the widget. No font changes were required since the single font attribute (`fontWeight: "inherit"`) is explicitly excluded from tokenization by the font conversion rules.

### Test Plan
- [ ] Chromatic diffs show only intentional color/font changes against the baseline
- [ ] All checks pass

---

### Summary of Deviations Requiring Action

| # | Deviation | Type | Recommended Action |
|---|---|---|---|
| 1 | Progress report steps are out of ascending order | Unintentional | Document in PR — content is complete and accurate |
| 2 | `pnpm lint` / `pnpm test` invoked via direct binary paths | Intentional | No action needed — checks passed with equivalent tooling |
| 3 | Interactions stories: 1 story only (drag-and-drop not automatable) | Intentional | No action needed — justified by automation limitations |
| 4 | Visual Check: Storybook screenshots not taken | User action required | User must verify before merging |
| 5 | Steps 4, 7, 13, 15, 16: User action steps skipped | Intentional | User must complete |

