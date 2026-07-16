---
"@khanacademy/perseus-editor": major
---

Rework the exported `Issue` type into an `A11yIssue | LinterIssue` union and remove its `elements` field — a11y highlight targets now live inside the preview iframe rather than crossing the bridge. Adds exported `A11yIssue`, `LinterIssue`, `BaseIssue`, and `getIssueKey`.
