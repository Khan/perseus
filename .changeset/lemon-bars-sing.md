---
"@khanacademy/perseus-core": major
---

Remove the `@khanacademy/perseus-core/item-splitting` entry point.

This entry point (`/item-splitting`) was incorrectly added to support a CI
check that detects important item splitting changes. It doesn't need to be an
export to do this though, so this change removes it.

Import `splitPerseusItem` from `@khanacademy/perseus-core` instead.
