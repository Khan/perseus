---
"@khanacademy/perseus-linter": major
---

Remove `Rule.Severity.BULK_WARNING` and the four lint rules that used it (`double-spacing-after-terminal`, `extra-content-spacing`, `image-in-table`, `widget-in-table`). These rules were always filtered out of the exported rule list, so they never ran. Rules created without a severity now default to `GUIDELINE`.
