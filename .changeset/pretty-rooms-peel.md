---
"@khanacademy/perseus": patch
---

Internal: Temporarily replace Mafs' `vec.midpoint()` with our own `line.midpoint()` to guard against a bug. Mafs' implementation of `midpoint()` returns `[NaN, NaN]` given two equal points.
