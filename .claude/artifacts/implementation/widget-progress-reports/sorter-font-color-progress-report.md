# Sorter Widget — Font and Color Conversion Progress Report

Widget: `sorter`
Workflow: Font and Color Conversion
Date started: 2026-05-04

---

## Step 1 — Audit the Widget

### Commands run

```bash
# Find primitive color token usage
grep -r "color\." packages/perseus/src/widgets/sorter/ --include="*.tsx" --include="*.ts" --include="*.css"
# Result: (no output)

# Find hardcoded hex values
grep -r "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/sorter/
# Result: (no output)

# Find hardcoded rgb(a) values
grep -r "rgba?\([^)]*\)" packages/perseus/src/widgets/sorter/
# Result: (no output)

# Check 4 font attributes
grep -rE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/sorter/
# Result: (no output)
```

### Colors to be Tokenized:
- None found. The sorter widget directory contains no color tokens, hardcoded hex values, or rgb/rgba values.

### Fonts to be Tokenized:
- None found. The sorter widget directory contains no fontSize, fontWeight, lineHeight, or fontFamily usages.

### Notes
- `sorter.tsx` contains no inline styles or color/font references. It renders only a `<div>` wrapper and delegates entirely to the `Sortable` component (`../../components/sortable`).
- All visual styling for the widget (card colors, fonts, borders) lives in the `Sortable` component, which will be converted in the follow-up PR.
- The sorter widget directory contains: `sorter.tsx`, `sorter.stories.tsx`, `sorter.testdata.ts`, `serialize-sorter.test.ts`, `index.ts`

---

## Step 2 — Create Regression Stories

### Research

Files examined:
- `packages/perseus/src/widgets/sorter/sorter.tsx` — thin wrapper around `Sortable`, no color/font. Options: `correct: string[]`, `padding: boolean`, `layout: "horizontal" | "vertical"`.
- `packages/perseus/src/widgets/sorter/sorter.testdata.ts` — one testdata entry (`question1`) with 4 TeX-formatted measurement strings as card items.
- `packages/perseus/src/widgets/sorter/sorter.stories.tsx` — existing story uses `ServerItemRendererWithDebugUI`.
- `packages/perseus-core/src/data-schema.ts` line 1783 — `PerseusSorterWidgetOptions` confirmed: `correct`, `padding`, `layout`.
- No sorter widget generator exists in `packages/perseus-core/src/utils/generators/`.
- `packages/perseus/src/widgets/__testutils__/numeric-input-renderer-decorator.tsx` — reference for decorator using `QuestionRendererForStories` with `parameters?.apiOptions` support.

### Decisions

- **Decorator**: Use `QuestionRendererForStories` (Option A). No "Check answer" needed for initial state stories.
- **No TeX in card items**: Per feedback memory, TeX in card items of Sortable-based widgets causes flaky Chromatic snapshots (Sortable's `constraints.height` is computed from async `onMeasure` callbacks after TeX renders). Plain text used in all stories.
- **No interactions regression file**: Confirmed by user — interactions are handled by the Sortable component and will be covered in the follow-up Sortable conversion PR.
- **Stories planned**: `DefaultHorizontal`, `DefaultVertical`, `MobileHorizontal`, `NoPadding`

### Additional decision: sorter widget generator

Created a generator for consistency with the project pattern, even though the options type is simple (3 fields). Both exports marked `@hidden` (same as most other generator exports in `index.ts`).

### Files created

1. `packages/perseus-core/src/utils/generators/sorter-widget-generator.ts` — `generateSorterOptions` and `generateSorterWidget`
2. `packages/perseus-core/src/index.ts` — added `@hidden` exports for both generator functions
3. `packages/perseus/src/widgets/__testutils__/sorter-renderer-decorator.tsx` — renderer decorator using `QuestionRendererForStories` and the new generator
4. `packages/perseus/src/widgets/sorter/__docs__/sorter-initial-state-regression.stories.tsx` — 4 initial state regression stories: `DefaultHorizontal`, `DefaultVertical`, `MobileHorizontal`, `NoPadding`

---

## Step 3 — Pre-Push Quality Checks — Regression Stories

- `pnpm lint` — PASS (4 prettier/import-order errors fixed with `--fix`)
- `pnpm tsc` — PASS
- `pnpm test` — PASS (480 suites, 6583 passed, 38 skipped)

---

## Steps 4–13 — Skipped

**Reason:** User directed. The audit found no fonts or colors to convert in the sorter widget directory. Steps 4–13 exist to establish a Chromatic baseline before conversions and to review diffs after — neither applies here.

---

## Step 14 — Deviation Check

### Pre-workflow — reporting.md
- **Followed as instructed:** Yes
- **Deviations:** None
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 1 — Audit the Widget
- **Followed as instructed:** Yes
- **Deviations:** None. All 4 grep commands run; results documented using the required "Colors to be Tokenized:" and "Fonts to be Tokenized:" headings; gate check completed before creating any files.
- **Type:** N/A
- **Recommended Action:** No action needed

### Step 2 — Create Regression Stories
- **Followed as instructed:** Partially
- **Deviations:**
  1. **Extra file created (user directed):** A sorter widget generator (`sorter-widget-generator.ts`) was created and exported from `@khanacademy/perseus-core/src/index.ts`. The workflow instructions do not include creating generators. This was explicitly requested by the user.
  2. **TeX stories omitted:** The instructions say "If the widget can display TeX, include as many stories as needed to capture TeX usage within the widget." No TeX story was created because TeX in Sortable card items causes non-deterministic Chromatic snapshots (documented in project feedback memory). Omission was intentional and documented.
  3. **Interactions regression file omitted:** The workflow template describes a third file (`[widget-name]-interactions-regression.stories.tsx`). It was not created because the user confirmed interactions are handled entirely by the Sortable component and will be covered in the follow-up Sortable conversion PR.
- **Type:** All intentional (user directed or documented reasoning)
- **Recommended Action:** Document in PR — the generator, TeX omission, and interactions omission are all worth noting for reviewers.

### Step 3 — Pre-Push Quality Checks — Regression Stories
- **Followed as instructed:** Yes
- **Deviations:** None. All three checks pass. No interaction stories exist to verify in Storybook.
- **Type:** N/A
- **Recommended Action:** No action needed

### Steps 4–13 — Chromatic Baselines, Conversion, and Diff Review
- **Followed as instructed:** No (skipped)
- **Deviations:** All skipped per user direction — no font or color changes exist in the sorter widget directory, so baselines and diff review steps are not applicable.
- **Type:** Intentional (user directed)
- **Recommended Action:** No action needed

---

## Step 15 — Add a Changeset

Completed by user.

---

## Step 16 — Finalize PR

### PR Title
`[ColorSync] Add Sorter regression stories and widget generator (LEMS-3500)`

### PR Summary
Establishes Chromatic baseline coverage for the Sorter widget ahead of the Sortable component color migration. No font or color changes were needed in the widget itself — all styling lives in the Sortable component, which will be migrated in a follow-up PR.

### Test Plan
- [ ] Chromatic snapshots for Sorter stories are approved
- [ ] All checks pass

PR created by user.