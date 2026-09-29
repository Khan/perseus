---
"@khanacademy/perseus-core": major
---

Importing the perseus-core barrel no longer registers widget logic, and the
barrel no longer re-exports the per-widget `xLogic` defaults. Both coupled every
consumer to every widget. Call `initPerseusCore()` from
`@khanacademy/perseus-core/init` at startup instead, or import one logic from
`@khanacademy/perseus-core/widgets/<name>`.

`CoreWidgetRegistry.registerWidget(type, logic)` is also gone; use
`registerLogic(logic)`, which takes the type from `logic.name`.
