---
"@khanacademy/perseus-editor": minor
"@khanacademy/perseus": minor
---

Interactive-graph editor: add a "Show point labels" toggle behind the
"perseus-enable-point-label-field" flag. Toggling writes `showPointLabels`
to the graph JSON. The toggle is disabled until the author has populated
`pointLabels`, mirroring the lint rule that requires labels when
`showPointLabels` is true. Adds two translated strings
(`interactiveGraphShowPointLabels`, `interactiveGraphShowPointLabelsInfoTip`)
to `@khanacademy/perseus` for the toggle label and InfoTip text.
