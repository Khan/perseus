---
"@khanacademy/perseus-core": major
"@khanacademy/perseus": patch
"@khanacademy/perseus-editor": patch
---

Remove deprecated fields from Radio widget (`onePerLine`, `displayCount`, `noneOfTheAbove`, and `widgets`) and rename `clue` to `rationale` in Radio widget options. Clients may need to update their test data with the new field names. As always, data in the old format can be safely migrated to the latest by calling `parseAndMigratePerseusItem` or `parseAndMigratePerseusArticle`.
