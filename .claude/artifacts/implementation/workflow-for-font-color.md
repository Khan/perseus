# Workflow for Font and Color Conversion

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

> **User action required for interaction stories:** Run `pnpm storybook` locally and verify each `play` function completes without errors. Open the **Addons → Interactions** tab in Storybook and confirm every step shows a green checkmark. Also verify the stories reach the intended visual states (e.g. a dropdown is open, an answer is selected, markers show their post-interaction styling). Fix any failures before continuing.

### Step 4 — Set Up Baseline Chromatic Snapshots
> **User action required:** Commit the regression stories, then open a new PR from this commit. Approve the Chromatic snapshots in the PR — this establishes the baseline. All changes pushed after this will show diffs against this baseline.

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

> **User action required for interaction stories:** Run `pnpm storybook` locally and verify each `play` function completes without errors. Open the **Addons → Interactions** tab in Storybook and confirm every step shows a green checkmark. Also verify the stories reach the intended visual states (e.g. a dropdown is open, an answer is selected, markers show their post-interaction styling). Fix any failures before continuing.

### Step 7 — Push and Review Chromatic Diffs — Fonts
> **User action required:** Commit the font changes, then push. Review and approve the Chromatic diffs against the baseline — both `default` and `thunderblocks` themes will be shown side by side.

### Step 8 — Figma Token Lookup
- Follow the instructions in figma-token-lookup.md to extract the target tokens from Figma before converting
- Use the results as the primary token source in Step 9

### Step 9 — Convert Color Tokens
- For each file that needs conversion, confirm `semanticColor` is imported from `@khanacademy/wonder-blocks-tokens` — add it if not present
- For each color found in the audit, use the token mapping table built in Step 8
  - **Figma specifies the token** → use it directly
  - **No Figma coverage** → use the context rules and mapping table in color-conversion-rules.md

### Step 10 — Semantic Color Check
- Follow the instructions in semantic-check.md to verify the semantic correctness of each conversion

### Step 11 — Visual Check
- Follow the instructions in visual-check.md to compare screenshots and confirm regression story coverage

### Step 12 — Pre-Push Quality Checks — Colors
- Run the following quality checks and fix any failures before continuing. All checks need to pass for all files.

```bash
pnpm lint
pnpm tsc
pnpm test
```

> **User action required for interaction stories:** Run `pnpm storybook` locally and verify each `play` function completes without errors. Open the **Addons → Interactions** tab in Storybook and confirm every step shows a green checkmark. Also verify the stories reach the intended visual states (e.g. a dropdown is open, an answer is selected, markers show their post-interaction styling). Fix any failures before continuing.

### Step 13 — Push and Review Chromatic Diffs — Colors
> **User action required:** Commit the color changes, then push. Review and approve the Chromatic diffs against the baseline — both `default` and `thunderblocks` themes will be shown side by side.

### Step 14 — Deviation Check
- Follow the instructions in deviation-check.md to compare the completed work against the workflow instructions and identify any deviations

### Step 15 — Add a Changeset
> **User action required:** Run `pnpm changeset` in the terminal and follow the interactive prompts. Choose `patch` for color, font, and styling changes.

### Step 16 — Finalize PR
- Write a PR summary of the changes that occurred during this workflow. Keep it as short as possible.
- Write a test plan for the PR
- Add the PR summary and test plan to the progress report
- Update the existing PR description with the summary and test plan
> **User action required:** Copy the summary and test plan from the progress report into the open PR description
