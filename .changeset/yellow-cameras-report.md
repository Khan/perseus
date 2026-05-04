---
"@khanacademy/perseus-core": patch
---

The Perseus parsers now guard against NaN and Infinity values in number fields. These values get converted to null by `JSON.stringify`, and previously caused the parsers to be non-idempotent.
