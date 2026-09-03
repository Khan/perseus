---
"@khanacademy/perseus": minor
---

`registerWidgets` now accepts `WidgetRegistration` descriptors, registering
each widget's core logic before its React implementation. The React-only
`WidgetExports[]` form still works but is deprecated.
