# ColorSync Widget Migration Progress Report — sorter

Widget: `sorter`
Workflow: colorsync-widget-migration
Started: 2026-08-06
Note: out of scope for this migration batch — `plotter` (separate ticket, needs a wholesale conversion, not covered here).

## Step 1 — Audit the Widget

### Bash commands used

Initial audit of the widget's own directory:
```bash
grep -r "color\." packages/perseus/src/widgets/sorter/ --include="*.tsx" --include="*.ts" --include="*.css"
grep -r "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/sorter/
grep -rE "rgba?\([^)]+\)" packages/perseus/src/widgets/sorter/
grep -rE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/sorter/
grep -rE "borderWidth|borderTopWidth|borderBottomWidth|borderLeftWidth|borderRightWidth|border-width" packages/perseus/src/widgets/sorter/
grep -rE "borderRadius|border-radius" packages/perseus/src/widgets/sorter/
```
Result: no matches. `../../../packages/perseus/src/widgets/sorter/sorter.tsx` contains no styling of its own — it renders `<Sortable>` from `../../components/sortable`, which owns all visual styling. Extended the audit to that shared component and its stylesheet:
```bash
grep -n "color\." packages/perseus/src/components/sortable.tsx
grep -n "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/components/sortable.tsx
grep -nE "rgba?\([^)]+\)" packages/perseus/src/components/sortable.tsx
grep -nE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/components/sortable.tsx
grep -nE "borderWidth|...|border-width" packages/perseus/src/components/sortable.tsx
grep -nE "borderRadius|border-radius" packages/perseus/src/components/sortable.tsx
```
Also read `../../../packages/perseus/src/styles/widgets/sortable.css` in full, since it's imported by the renderer stylesheets and referenced in a comment in `sortable.tsx` ("See sortable.css for details").

### Colors to be Tokenized:
- `../../../packages/perseus/src/components/sortable.tsx` — already uses `semanticColor` tokens (imported from `@khanacademy/wonder-blocks-tokens`), no hardcoded colors found:
  - Line 921: `semanticColor.core.background.base.default`
  - Line 922: `semanticColor.core.border.neutral.subtle`
  - Line 936: `semanticColor.core.background.neutral.subtle`
  - Line 937: `semanticColor.core.border.neutral.subtle`
  - Line 959: `semanticColor.core.background.instructive.subtle`
  - Line 960: `semanticColor.core.border.instructive.default`
  - Line 966: `semanticColor.core.border.disabled.subtle`
  - Line 965: `backgroundColor: "inherit"` (disabled state) — a CSS keyword, not a color literal; not in scope for token conversion.
- No files with hardcoded hex/rgb(a) color values were found for the `sorter` widget.
  - `../../../packages/perseus/src/styles/widgets/sortable.css` does contain hardcoded hex colors (lines 1–52, under the `.draggy-boxy-thing` selector), but that selector belongs to the `orderer` widget (confirmed via `grep -rn "draggy-boxy-thing"` — only referenced in `packages/perseus/src/widgets/orderer/orderer.tsx:737`), not `sorter`. Out of scope here.

### Fonts to be Tokenized:
- No files with hardcoded font attributes (`fontSize`/`fontWeight`/`lineHeight`/`fontFamily`) were found for `sorter`.
  - `packages/perseus/src/styles/widgets/sortable.css:65` (`.perseus-sortable .perseus-sortable-draggable > div`) sets `font-size: var(--wb-font-body-size-small)` — already a token, no action needed.
- Border width: `../../../packages/perseus/src/components/sortable.tsx` already uses `border.width.thin` (lines 922, 937, 960, 966) — already tokenized, no action needed.
- Border radius: `packages/perseus/src/components/sortable.tsx:923` — `borderRadius: 4` — **hardcoded, needs tokenization**. `border.radius.radius_040` resolves to 4px (verified via `wonder-blocks-tokens` primitive `border` + `sizing` source: `radius_040: remToPx(sizing.size_040)`, `size_040: pxToRem(4)`), which is an exact match.

### Summary
This widget's color/border-width tokenization appears to have already been completed in a prior change — `semanticColor` and `border.width.thin` are already in place with no hardcoded hex/rgb values or font attributes remaining. The only outstanding item found in the audit is the hardcoded `borderRadius: 4` on the `card` style, which should be converted to `border.radius.radius_040`.

### Regression story coverage (found during audit)
`packages/perseus/src/components/__docs__/sortable-initial-state-regression.stories.tsx` and `sortable-interactions-regression.stories.tsx` already exist and cover: horizontal layout, vertical layout, disabled state, dragging card, and placeholder-visible states — i.e. every visual state touched by the `card`, `disabled`, `dragging`, and `placeholder` styles, including the `card` style that owns the `borderRadius` value to be converted. These pre-exist on the branch (present before this session) and appear sufficient for Step 2; will confirm before creating any additional story files.

## Step 2 — Create Regression Stories

### Research
Re-checked `packages/perseus/src/components/__docs__/sortable-initial-state-regression.stories.tsx` and `sortable-interactions-regression.stories.tsx` (found during the Step 1 audit) against every style block in `sortable.tsx`:
- `card` (owns the `borderRadius: 4` value to be converted) → rendered by `HorizontalLayout` and `VerticalLayout` in the initial-state file.
- `disabled` → rendered by `DisabledState`.
- `dragging` → rendered by `DraggingCard` (interactions file).
- `placeholder` → rendered by `PlaceholderVisible` (interactions file).

All style blocks touched by this migration already have story coverage. No new story files were created — the existing files satisfy Step 2 for this migration.

### Gate check
No new files created, so no new-file gate check applies here. Progress report updated with the research above before proceeding.

## Step 3 — Pre-Push Quality Checks — Regression Stories
N/A — no regression story files were added or modified in this workflow run (Step 2 found existing coverage sufficient), so there is nothing new to quality-check or push here.

## Step 4 — Set Up Baseline Chromatic Snapshots
N/A — the existing regression stories were already committed and merged to the base branch prior to this session, so a Chromatic baseline for them already exists upstream. No new baseline PR is needed before making the font/border change in Step 5.

## Step 5 — Font Conversion (covers border width/radius per `font-conversion-rules.md`)

### Research
- Re-confirmed via `font-conversion-rules.md` → Border Radius Token Conversion Rules: `4` / `4px` maps to `border.radius.radius_040`.
- Cross-checked against the `wonder-blocks-tokens` package source (`node_modules/.pnpm/@khanacademy+wonder-blocks-tokens@17.2.0.../dist/index.js`): `radius_040: remToPx(sizing.size_040)` and `size_040: pxToRem(4)` — confirms `radius_040` resolves to exactly 4px, an exact match for the hardcoded value.
- `border` is already imported from `@khanacademy/wonder-blocks-tokens` in `../../../packages/perseus/src/components/sortable.tsx` (used for `border.width.thin` elsewhere in the same file), so no new import is needed.
- No other font attributes (`fontSize`/`fontWeight`/`lineHeight`/`fontFamily`) or border-width values needed conversion (see Step 1 audit) — this is the only change in this step.

### Change made
`../../../packages/perseus/src/components/sortable.tsx` — `card` style, line 923:
```diff
- borderRadius: 4,
+ borderRadius: border.radius.radius_040,
```

## Step 6 — Pre-Push Quality Checks (Font/Border Conversion)

Ran the quality-check gate (`pnpm lint` / `pnpm tsc` / `pnpm test`, invoked directly against the local eslint@8.57.1 and jest@30.2.0 binaries since the `pnpm lint`/`pnpm test` wrapper scripts couldn't resolve bins in this environment):

- **Lint** (`eslint` on `sortable.tsx`): clean, no errors or warnings.
- **Typecheck** (`tsc --noEmit`): clean.
- **Tests** (`jest sortable`): 2 snapshot tests failed on first run — `packages/perseus/src/components/__tests__/sortable.test.tsx` ("should snapshot", "renders a spinner while waiting for the TeX renderer to load"). The diff was solely the Aphrodite-generated class hash for the `card` style (`card_13e9mqo-o_O-...` → `card_7grg1b-o_O-...`), an expected consequence of changing the style object's value — no structural/behavioral change. Updated snapshots with `jest -u`; re-ran and all 10 tests in the file pass.

No other test files reference `sortable`/`sorter` styling, and no story files needed changes (Step 2 already covered the affected `card` state).

**No user action pending** — there are no new `play`-function interaction stories in this change (Step 2 found existing coverage sufficient), so the "run Storybook and check the Interactions tab" callout in `quality-check-gate.md` doesn't apply here.

## Step 7 — Push and Review Chromatic Diffs — Fonts

Committed the `borderRadius: 4` → `border.radius.radius_040` change (`sortable.tsx` + updated `sortable.test.tsx.snap`) locally, then ran `git push -u origin claude/widget-styles-token-review-hdrmrw`.

The push was rejected (`fetch first`) because a parallel session had pushed new commits to this same branch in the meantime: `fc49cc5` (audit), `bdc80de` ("[ColorSync] Convert sortable.css and Sortable component to semantic tokens"), and `50d3fc4` ("Align sortable.css token choices with the Sortable component precedent"). That session ran a broader migration under the widget name `sortable` (see its own report, `sortable-colorsync-progress-report.md`), covering the hardcoded hex colors in `sortable.css` (the `orderer` widget's `.draggy-boxy-thing` rules) plus — as part of the same sweep — the identical `borderRadius: 4` → `border.radius.radius_040` change in `sortable.tsx` that this report's Step 5 made independently.

Ran `git rebase origin/claude/widget-styles-token-review-hdrmrw`. Git detected the local commit's patch content was already present upstream and dropped it automatically ("patch contents already upstream") — no conflict, no manual resolution needed. Post-rebase, `git diff origin/... --stat` showed no remaining differences: the `sorter`/`Sortable` border-radius conversion is fully captured by the other session's already-pushed commits.

### Outcome
- **No new push was needed** for the code change — it's already on `origin/claude/widget-styles-token-review-hdrmrw` via the other session's commits.
- This progress report is kept as the historical record of this session's independent audit and verification (Steps 1–6), per `reporting.md`'s "do not clean up" rule, even though the resulting code change was superseded by duplicate upstream work.
- Steps 8–13 (Figma color lookup, color token conversion, semantic/visual checks) are **N/A** for this migration — the Step 1 audit found no hardcoded colors or other font attributes to convert; the only outstanding item was the border radius, now resolved.
- Step 14 (Deviation Check): the one deviation from the standard 16-step flow is that Step 4's baseline PR and Step 7's push/Chromatic-review were not performed by this session — the regression-story baseline predates this session (already on `main`), and the Step 5 code change was independently duplicated and pushed by a sibling session before this session's own push landed. Unintentional (a race between two sessions assigned overlapping scope), no action needed — the sibling session's PR (once opened) is the vehicle for the Chromatic review of this change.
- `plotter` was explicitly excluded from this session's scope per user instruction mid-session (needs a wholesale conversion, tracked on its own ticket).
