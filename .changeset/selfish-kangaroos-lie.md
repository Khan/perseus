---
"@khanacademy/perseus-core": patch
---

Bugfix: Convert null to undefined in the `replace` field of hints.

This fixes a parser error observed in production. `replace` is null in some assessment
items.
