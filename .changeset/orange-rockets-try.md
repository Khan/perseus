---
"@khanacademy/perseus": patch
---

Sortable (used by matcher and sorter) remeasures its rows once web fonts
finish loading. Before, rows were measured against the fallback font's line
box and never again, so on a cold cache every row rendered a few pixels too
tall and stayed that way for the session.
