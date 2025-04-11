---
"@khanacademy/perseus-core": patch
---

Fix Radio widget parser types; the parser now always sets
`PerseusRadioWidgetOptions.noneOfTheAbove` to either `false` or `undefined`
(whereas before it might be missing entirely).
