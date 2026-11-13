---
"@khanacademy/perseus-editor": major
"@khanacademy/perseus": major
---

Removed `getSaveWarnings()` methods from Perseus editors. Clients should use `@khanacademy/perseus-linter` for all linting needs. The `legacyPerseusLint` props have also been removed from the renderers and the `PreviewContent` types.
