# Workflow for CSS Module Conversion

## Progress Documentation
- **Before proceeding to step 1**, follow all the instructions in reporting.md.
  - Confirm the progress report for the current widget has been created before proceeding with the Steps in this workflow.

## Steps

### Step 1 — CSS Module Conversion
- Follow the instructions in css-module-conversion.md to convert the widget's Aphrodite styles to CSS modules

### Step 2 — Pre-Push Quality Checks — CSS Modules
- Run the following quality checks and fix any failures before continuing. All checks need to pass for all files.

```bash
pnpm lint
pnpm tsc
pnpm test
```

### Step 3 — Open PR and Review Chromatic Diffs — CSS Modules
> **User action required:** Commit the CSS module changes, then open a new PR. Approve the Chromatic snapshots — the diff against main (which includes the font and color changes from the preceding workflow) should be zero or near-zero. Any visual changes indicate the conversion introduced an unintended appearance change that should be investigated before proceeding.

### Step 4 — Deviation Check
- Follow the instructions in deviation-check.md to compare the completed work against the workflow instructions and identify any deviations

### Step 5 — Add a Changeset
> **User action required:** Run `pnpm changeset` in the terminal and follow the interactive prompts. Choose `patch` for CSS module refactors.

### Step 6 — Finalize PR
- Write a PR summary of the changes that occurred during this workflow. Keep it as short as possible.
- Write a test plan for the PR
- Add the PR summary and test plan to the progress report
- Update the existing PR description with the summary and test plan
> **User action required:** Copy the summary and test plan from the progress report into the open PR description