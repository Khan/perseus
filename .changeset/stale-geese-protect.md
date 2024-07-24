---
"@khanacademy/perseus": patch
---

useDraggable - fix to ignore keyup events (we don't want to treat keyup events as an intent to move - we have keydown for that)
