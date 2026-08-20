---
"@khanacademy/perseus-editor": minor
"@khanacademy/perseus": minor
---

jquery moves from a peer dep to a direct dep. Will not break any current or future consumers; just leaves a redundant dep in the consuming package config that the consuming app can remove.
