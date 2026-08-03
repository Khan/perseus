---
"@khanacademy/perseus-core": major
"@khanacademy/perseus": patch
---

The unused `cursorPosition` and `static` options of the Matrix widget have been removed, and the `prefix` and `suffix` options are now required. As always, clients should use the parsers to migrate data to the latest schema, and avoid constructing Perseus widget data manually.
