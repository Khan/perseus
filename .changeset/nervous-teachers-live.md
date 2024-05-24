---
"@khanacademy/perseus": minor
---

Revert changes to axis numbering since @khanacademy/perseus@22.5.1. The axis numbers were not visible on Safari 15.6. This change ensures the numbers show up, but we lose a feature: the axis numbers no longer appear beside the graph if the origin is outside the graph bounds.
