---
"@khanacademy/perseus-linter": minor
"@khanacademy/perseus-core": minor
"@khanacademy/perseus": patch
---

Add a `table-empty-column-header` lint warning for markdown tables with an empty column header, skipping row header and layout tables. Move `tableHasRowHeaders` to perseus-core so the renderer and linter share it.
