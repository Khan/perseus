---
"@khanacademy/perseus-core": patch
"@khanacademy/perseus-score": patch
---

Update input-number to numeric-input conversion logic to acccount for `inexact`. When `inexact` is false or undefined, we now set `maxError` to 0.
