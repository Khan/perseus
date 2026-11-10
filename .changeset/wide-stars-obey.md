---
"@khanacademy/perseus": patch
---

move `mathOnlyParser` and `replaceOutsideTeX` out of the Interactive Graph widget into a shared Perseus util, so other widgets can render text-and-TeX labels without importing Interactive Graph internals.
