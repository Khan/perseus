---
"@khanacademy/perseus": patch
---

Add scaffolding for the WidgetProps redesign (options nested under an `options` prop). No behavior change: introduces the transitional `WidgetPropsV2` type and a per-widget `getWidgetProps` branch that is inert until widgets are migrated.
