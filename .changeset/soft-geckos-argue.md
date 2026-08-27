---
"@khanacademy/perseus-core": minor
---

Move the all-widgets aggregate out of `core-widget-registry` into
`widgets/index.ts`, where it is now `initPerseusCore()`. Registration is also
available one logic at a time via `registerLogic`/`registerLogics`;
`registerWidget(type, logic)` is deprecated. `free-response` was missing from
the aggregate, so its version and default options now come from its logic
rather than silently defaulting.
