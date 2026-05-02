---
"@khanacademy/perseus-editor": patch
---

Narrow the type of `linterContext` on the preview-bridge message types to just `contentType` and `highlightLint`. The receiving side already builds the rest of the linter context via `pushContextStack`.
