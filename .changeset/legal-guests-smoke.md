---
"@khanacademy/perseus": patch
---

Fix crash in Graphie consumers when a labelStyle is used that is invalid (causing an 'undefined' entity to be added to Graphi'es tracking list of entities - resulting in a call to `.toFront()` on this `undefined` entity).
