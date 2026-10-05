---
"@khanacademy/perseus-core": minor
---

Move the all-widgets aggregate out of `core-widget-registry` into the new
`@khanacademy/perseus-core/init` entry point, where it is now
`initPerseusCore()`. Registration is also available one logic at a time via
`registerLogic`/`registerLogics`; `registerWidget(type, logic)` is deprecated.
