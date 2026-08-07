---
"@khanacademy/perseus-editor": minor
---

Rework the exported `Issue` type into an `A11yIssue | LinterIssue` union, adding exported `A11yIssue`, `LinterIssue`, and `getIssueKey`. `A11yIssue` gains a `previewId` for preview-side highlighting.
