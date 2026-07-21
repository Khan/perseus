---
"@khanacademy/perseus-editor": patch
"@khanacademy/perseus-linter": patch
---

Interactive-graph `showPointLabels`: two follow-ups on top of the
partial-labels change (#3819). The lint rule now checks that
`pointLabels.length` matches the number of points on the graph, so
hand-edited JSON with a mis-sized array (e.g. `["A", "C"]` for a
triangle) fails with a clear message. The correct-answer preview
also hides point labels when the widget is set to static, matching
the starting-graph preview so the author sees what the student
sees. Author data is untouched — flipping static back off restores
the labels.
