# Workflow

## Progress Documentation
- **Before proceeding to step 1**, follow all the instructions in reporting.md.
  - Confirm the progress report for the current widget has been created before proceeding with the Steps in this workflow.

## Steps

### Step 1 — Audit the Widget
- Follow the instructions in audit-widget.md

### Step 2 — Create Regression Stories
- Follow the instructions in regression-stories.md

### Step 3 — Pre-Push Quality Checks — Regression Stories
- Run the following quality checks and fix any failures before continuing. All checks need to pass for all files.

```bash
pnpm lint
pnpm tsc
pnpm test
```

### Step 4 — Set Up Baseline Chromatic Snapshots
> **User action required:** Commit the regression stories, then push as the first commit of the widget PR and approve the Chromatic snapshots in the PR — this establishes the baseline. All changes pushed after this will show diffs against this baseline.

### Step 5 — Font Conversion
- Follow the instructions in font-conversion-rules.md to convert older font styles to the new font tokens

### Step 6 — Pre-Push Quality Checks — Fonts
- Confirm the font changes are covered by the regression stories created in Step 2
- Run the following quality checks and fix any failures before continuing. All checks need to pass for all files.

```bash
pnpm lint
pnpm tsc
pnpm test
```

### Step 7 — Push and Review Chromatic Diffs — Fonts
> **User action required:** Commit the font changes, then push. Review and approve the Chromatic diffs against the baseline — both `default` and `thunderblocks` themes will be shown side by side.

### Step 8 — Update Color Imports
- Follow the instructions in update-color-imports.md

### Step 9 — Convert Color Tokens
- Use the context rules and mapping table in the color-conversion-rules.md to convert color tokens

### Step 10 — Semantic Color Check
- Follow the instructions in semantic-check.md to verify the semantic correctness of each conversion

### Step 11 — Visual Check
- Follow the instructions in visual-check.md to compare the rendered widget against the Figma design

### Step 12 — Pre-Push Quality Checks — Colors
- Confirm the color changes are covered by the regression stories created in Step 2
- Run the following quality checks and fix any failures before continuing. All checks need to pass for all files.

```bash
pnpm lint
pnpm tsc
pnpm test
```

### Step 13 — Push and Review Chromatic Diffs — Colors
> **User action required:** Commit the color changes, then push. Review and approve the Chromatic diffs against the baseline — both `default` and `thunderblocks` themes will be shown side by side.

### Step 14 — CSS Module Conversion
- Follow the instructions in css-module-conversion.md to convert the widget's Aphrodite styles to CSS modules

### Step 15 — Pre-Push Quality Checks — CSS Modules
- Confirm the existing regression stories from Step 2 still render correctly — CSS module conversion is a structural refactor, so no new story coverage is needed, but the conversion must not break existing story setup
- Run the following quality checks and fix any failures before continuing. All checks need to pass for all files.

```bash
pnpm lint
pnpm tsc
pnpm test
```

### Step 16 — Push and Review Chromatic Diffs — CSS Modules
> **User action required:** Commit the CSS module changes, then push. The Chromatic diff against the baseline should be zero or near-zero — any visual changes here indicate the conversion introduced an unintended appearance change that should be investigated before proceeding.

### Step 17 — Add a Changeset
> **User action required:** Run `pnpm changeset` in the terminal and follow the interactive prompts. Choose `patch` for color, font, and styling changes.

### Step 18 — Deviation Check
- Follow the instructions in deviation-check.md to compare the completed work against the workflow instructions and identify any deviations

### Step 19 — Create PR
- Write a PR summary of the changes that occurred during this workflow. Keep it as short as possible.
- Write a test plan for the PR
- Add the PR summary and test plan to the progress report
- Share this with the user with the below prompt
> **User action required:** Open a draft pull-request with `git pull-request` / `git pr`