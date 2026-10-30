---
"@khanacademy/perseus": patch
---

Wrap the numeric input's examples tooltip anchor in an element instead of a Fragment, so the upcoming Wonder Blocks Tooltip (which no longer uses `findDOMNode`) can find it.
