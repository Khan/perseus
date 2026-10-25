---
"@khanacademy/perseus-linter": major
---

Removed `Rule.Severity.BULK_WARNING` and the four lint rules that used it (`double-spacing-after-terminal`, `extra-content-spacing`, `image-in-table`, `widget-in-table`). These rules were always filtered out of the exported rule list, so they never ran. Breaking change: `severity` is now a required parameter of `Rule.makeRule`, `Rule.makeWidgetRule`, and the `Rule` constructor.
