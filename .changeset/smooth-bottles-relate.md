---
"@khanacademy/perseus": patch
---

Bugfix: responsive markdown images (which are rendered using `<div>`s) are no longer wrapped in `<p>` tags. This caused an invalid DOM nesting error.
