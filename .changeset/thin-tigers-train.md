---
"@khanacademy/perseus-core": minor
"@khanacademy/perseus": patch
---

Registry registration is now idempotent: the first value registered under a key wins. Deliberate overwrites go through the new `replace` method, which is what `replaceWidget`/`replaceEditor` use.

Breaking: `Registry.entries()` now returns an iterator rather than an array, so callers using array methods (`map`, `filter`, `length`, ...) on the result need to spread it first.
