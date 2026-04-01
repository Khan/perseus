# Label Image Widget — CSS Modules Progress Report 2

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>

---

## Step 1 — CSS Module Conversion

### Files identified for conversion (StyleSheet.create usage)

- `packages/perseus/src/widgets/label-image/marker.tsx`
- `packages/perseus/src/widgets/label-image/hide-answers-toggle.tsx`
- `packages/perseus/src/widgets/label-image/label-image.tsx`
- `packages/perseus/src/widgets/label-image/answer-pill.tsx`
- `packages/perseus/src/widgets/label-image/__stories__/marker.stories.tsx`

### Conversion Results

#### answer-pill.tsx
- Command: `pnpm extract-css packages/perseus/src/widgets/label-image/answer-pill.tsx --keep-aphrodite`
- Output: `answer-pill.module.css`, `answer-pill_legacy-styles.js`
- TODOs: None
- Issues: None

#### hide-answers-toggle.tsx
- Command: `pnpm extract-css packages/perseus/src/widgets/label-image/hide-answers-toggle.tsx --keep-aphrodite`
- Output: `hide-answers-toggle.module.css`, `hide-answers-toggle_legacy-styles.js`
- TODOs: None
- Issues: None

#### marker.tsx
- Command: `pnpm extract-css packages/perseus/src/widgets/label-image/marker.tsx --keep-aphrodite`
- Output: `marker.module.css`, `marker_legacy-styles.js`
- TODOs: None
- Manual fixes required (same as run 1 — these are fundamental script limitations for dynamic values):
  1. `margin-left` and `margin-top` were unresolvable binary expressions (`MARKER_SIZE / -2`). Resolved to `-1.2rem`. Also added to `marker_legacy-styles.js`.
  2. Aphrodite `animationName` inline keyframes emitted as invalid class names. Replaced with a proper `@keyframes marker-pulsate` block and added `animation-name: marker-pulsate` to `.marker-pulsate-base`.

#### label-image.tsx
- Command: `pnpm extract-css packages/perseus/src/widgets/label-image/label-image.tsx --keep-aphrodite`
- Output: `label-image.module.css`, `label-image_legacy-styles.js`
- Script ran successfully (updated script fixed the `satisfies` expression crash)
- TODOs: None
- Manual fix required: `.instructions-caption` received spread properties from `bodyXsmallBold` in camelCase JS format (`fontFamily`, `fontSize`, etc.) instead of CSS kebab-case. Corrected to `font-family`, `font-size` (with `px` unit), `font-weight`, `line-height`.

#### __stories__/marker.stories.tsx
- Command: `pnpm extract-css packages/perseus/src/widgets/label-image/__stories__/marker.stories.tsx --keep-aphrodite`
- Output: `__stories__/marker.module.css`, `__stories__/marker_legacy-styles.js`
- TODOs: None
- Issues: None

---

## Step 2 — Pre-Push Quality Checks

### `pnpm lint`
- Result: PASS (0 errors, 0 warnings)
- Issues fixed:
  - All files: removed unused `stylesLegacy` imports and `.js` extensions; moved CSS module imports to correct position after relative imports.
  - `marker.tsx`: removed unused `boxShadow` import.
  - `label-image.tsx`: removed unused `semanticColor`, `bodyXsmallBold` imports; replaced all `css(styles.xxx)` calls with `styles.xxx` / `classNames(...)`.
  - `answer-pill.tsx`: replaced `CSSProperties` (from removed aphrodite import) with `React.CSSProperties`.
  - `marker.stories.tsx`: replaced `css(styles.wrapper)` with `styles.wrapper`.

### `pnpm tsc`
- Result: PASS (no output)

### `pnpm test`
- Result: PASS
- Test Suites: 472 passed, 472 total
- Tests: 6441 passed, 36 skipped, 6477 total

---

## Step 3 — Deviation Check

### Pre-workflow — Progress Report Creation
- **Followed as instructed:** Partially
- **Deviations:** Filename is `label-image-css-modules-progress-report-2.md` instead of the required `label-image-css-modules-progress-report.md`. The `-2` suffix was added to preserve the first run as historical context.
- **Type:** Intentional — user requested.
- **Recommended Action:** No action needed

### Step 1 — CSS Module Conversion

#### GATE CHECK
- **Followed as instructed:** Yes
- **Deviations:** None — file list recorded in progress report before any script runs.
- **Type:** N/A
- **Recommended Action:** No action needed

#### File identification
- **Followed as instructed:** Yes
- **Deviations:** None — used built-in Grep tool as specified in updated instructions.
- **Type:** N/A
- **Recommended Action:** No action needed

#### Script execution and TODO review
- **Followed as instructed:** Yes
- **Deviations:** None — script run once per file with `--keep-aphrodite`, both `.module.css` and `.tsx` outputs checked for `// TODO` comments after each run. Legacy styles files left with their `// TODO (LEMS-3815)` comment untouched.
- **Type:** N/A
- **Recommended Action:** No action needed

#### `marker.tsx` — binary expressions and keyframes
- **Followed as instructed:** Partially
- **Deviations:** Same two issues as run 1. `margin-left`/`margin-top` binary expressions (`MARKER_SIZE / -2`) and Aphrodite inline keyframes could not be resolved by the script. Manually fixed to `-1.2rem` and a proper `@keyframes` block.
- **Type:** Unintentional — fundamental script limitation for runtime-computed values; not fixable by the script update.
- **Recommended Action:** Document in PR. Worth noting to the script author as a known limitation.

#### `label-image.tsx` — spread properties in camelCase
- **Followed as instructed:** Partially
- **Deviations:** The updated script handled the `satisfies` crash, but `bodyXsmallBold` spread properties were emitted in camelCase JS format (`fontFamily`, `fontSize: 15` without unit) instead of valid CSS. Manually corrected to kebab-case with proper units.
- **Type:** Unintentional — script bug in how it converts spread element property names.
- **Recommended Action:** Document in PR. Worth reporting to the script author as a new bug found in the spread handling feature.

### Step 2 — Pre-Push Quality Checks
- **Followed as instructed:** Yes
- **Deviations:** None — all three checks run, all failures fixed before proceeding.
- **Type:** N/A
- **Recommended Action:** No action needed