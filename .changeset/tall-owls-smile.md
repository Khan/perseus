---
"@khanacademy/perseus": patch
"@khanacademy/perseus-editor": patch
---

Internal: Finish the WidgetProps redesign. `WidgetPropsV2` is now `WidgetProps`; the old
spread shape and `UniversalWidgetProps` are gone. Widget options arrive under a single
`options` prop instead of being spread alongside the universal props.
