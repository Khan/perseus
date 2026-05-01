---
"@khanacademy/perseus-linter": major
"@khanacademy/perseus-editor": major
---

Remove unused `paths` field from `LinterContextProps` and the corresponding `contentPaths` prop from `EditorPage`, `ArticleEditor`, and `HintEditor`. The field was never read by any linter rule or renderer.
