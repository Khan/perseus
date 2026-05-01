---
"@khanacademy/perseus-editor": major
---

Narrow the type of `linterContext` on the preview-bridge message types to just `contentType` and `highlightLint` (removing `paths` and corresponding `contentPaths` prop from `EditorPage`, `ArticleEditor`, and `HintEditor`). The receiving side already builds the rest of the linter context via `pushContextStack`. 
