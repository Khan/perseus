---
"@khanacademy/perseus": patch
"@khanacademy/kmath": patch
---

[Interactive Graph] Update screen reader descriptions for absolute value graph

`getAbsoluteValueCoefficients` now always returns coefficients instead of `undefined`: when the two control points share an x-coordinate the slope is `±Infinity`.
