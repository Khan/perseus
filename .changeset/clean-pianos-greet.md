---
"@khanacademy/perseus-core": major
"@khanacademy/perseus-editor": patch
---

Add typetests to ensure that the data format accepted by
`parseAndMigratePerseusItem` stays in sync with the types in `data-schema.ts`,
exported from `@khanacademy/perseus-core`. Breaking change:
`PerseusGraphTypeAngle.coords` can no longer be `null`; use `undefined` instead.
