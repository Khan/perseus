---
"@khanacademy/perseus-linter": minor
"@khanacademy/pure-markdown": minor
---

Add a `table-missing-caption` lint rule that warns when a markdown table has no caption, or has a caption line with no text in it. Also fix the `|| Caption ||` syntax so it works above tables written with surrounding pipes, which previously failed to parse as a table at all.
