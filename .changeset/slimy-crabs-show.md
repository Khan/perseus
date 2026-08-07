---
"@khanacademy/perseus-editor": minor
---

Rework the exported `Issue` type into an `A11yIssue | LinterIssue` union, adding exported `A11yIssue`, `LinterIssue`, and `getIssueKey`. Issues gain an optional `instanceId` that distinguishes one occurrence of a problem from another, where `id` names the rule and is shared by every occurrence of it.
