---
"@khanacademy/kmath": patch
---

`getAbsoluteValueCoefficients` now always returns coefficients instead of `undefined`: when the two control points share an x-coordinate the slope is `±Infinity`.
