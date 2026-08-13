---
"@khanacademy/perseus-editor": major
"@khanacademy/perseus-core": major
"@khanacademy/perseus": major
---

Remove `static` from `Perseus*WidgetOptions` since it was shadowed by `static` in `WidgetOptions` (the higher-level type). This has some large implications: types in `perseus-core` have changed and serialization in `perseus-editor` and `perseus` are also likely to change.
