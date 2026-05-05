# Visual Check

## Expected Progress Report Output
- Figma node IDs examined and the states they represent
- A Figma screenshot for each state
- A Storybook screenshot for each corresponding story
- Any visible discrepancies between Figma and the rendered widget
- A list of code states with no Figma counterpart, flagged for design
- Regression story coverage check: one story per visual state

## GATE CHECK
**Before marking this step complete**: Every widget state that has a corresponding Figma design must have a screenshot comparison. Any state without a matching regression story must be noted. Discrepancies must be recorded even if pre-existing.

## Actions to Take

### 1. Get Figma screenshots for each state

For each state node ID identified in Step 9, call `get_design_context`:

```
get_design_context(fileKey: "HlLQJqNeMTLenuDfkyzYzE", nodeId: "<state-node-id>")
```

This returns a screenshot of that state. Record it in the progress report.

Note: `get_design_context` may fail for complex nodes. If it fails, rely on the token comparison from Step 9 alone for that state.

### 2. Get Storybook screenshots

Navigate to the widget's regression stories in Storybook. The story URL pattern is:

```
http://localhost:6006/?path=/story/widgets-[widget-name]-visual-regression-tests-initial-state--[story-name]
```

Take a screenshot for each initial-state story. For interaction stories, also navigate to the interactions regression story and confirm the play function ran (check the Interactions tab shows a green checkmark).

### 3. Compare Figma and Storybook screenshots visually

Look at each pair of screenshots side by side. Note any visible color or font differences not already captured by the token comparison in Step 9. Pay particular attention to:
- States that could not be covered by `get_variable_defs` (e.g. hover, focus)
- Composite colors (shadows, overlays) that may not appear as named tokens

### 4. Flag code states with no Figma design

For each code state that has no corresponding Figma state (identified in Step 9), record it as a design gap:

> **Design gap:** `[state name]` in `[file]` — no Figma state found. Token chosen from mapping table. Recommend design adds this state to the Figma widget page.

### 5. Check regression story coverage

For each visual state identified — both from Figma and from the code — verify that a regression story covers it. A state is "covered" if a story either renders it as an initial state or reaches it via a play function.

For any state not covered by a story, record it as a coverage gap and add a story before proceeding.

| State | Covered by story? |
|---|---|
| Unanswered (initial) | ✅ `DefaultUnanswered` |
| Filled (answer selected) | ❌ No story — add one |
| Correct (graded) | ❌ No story — add one |