---
"@khanacademy/perseus": patch
---

Remove `ServerItemRenderer`'s own wait before reporting a blur; the `Renderer`
already waits.
