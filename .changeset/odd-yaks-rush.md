---
"@khanacademy/kas": patch
---

Expressions are now compared more thoroughly. Now we always check that the expressions evaluate the same with all variables bound to -1, 0, and 1. We also check more randomly-chosen values: 28 instead of 12.
