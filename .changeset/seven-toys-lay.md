---
"@khanacademy/perseus-core": minor
---

Extend parseAndMigratePerseusItem so that it accepts either a JS object or a string (instead of only a string). When an object is passed, it skips calling `JSON.parse()`.
