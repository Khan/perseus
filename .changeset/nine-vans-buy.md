---
"@khanacademy/perseus-core": major
"@khanacademy/perseus-editor": minor
"@khanacademy/perseus": patch
---

Remove `"chi2Table"`, `"tTable"`, and `"zTable"` from the `ItemExtras` type exported from `@khanacademy/perseus-core`. These properties weren't used. This is a breaking change because consumers might see type errors if they set chi2Table, tTable, or zTable properties on the `answerArea` object of a `PerseusItem`. The fix is to avoid setting those properties.
