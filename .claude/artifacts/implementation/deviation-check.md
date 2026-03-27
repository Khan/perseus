# Deviation Check

## Expected Progress Report Output
For each step in the workflow, document:
- Whether the step was followed as instructed
- Any deviations found — what the instruction said vs. what was actually done
- Whether the deviation was intentional (user directed) or unintentional (Claude error or misread)
- Any steps that were skipped, and why

Use this structure for each step:

```
### Step N — [Step Name]
- **Followed as instructed:** Yes / No / Partially
- **Deviations:** [description, or "None"]
- **Type:** Intentional / Unintentional / N/A
```

## Actions to Take

1. Re-read each step's instruction file (audit-widget.md, regression-stories.md, etc.)
2. Re-read the corresponding section in the progress report
3. For each step, compare what the instructions required against what was recorded as done
4. Look specifically for:
   - Actions taken that weren't instructed
   - Instructions that weren't followed or were only partially followed
   - Decisions made that contradicted documented guidance
   - Steps skipped (note whether user directed or not)
   - Ordering violations (e.g. GATE CHECK not honored before files were created)
5. Record all findings in the progress report — including steps with no deviations