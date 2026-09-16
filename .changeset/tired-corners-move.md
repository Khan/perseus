---
"@khanacademy/perseus": major
"@khanacademy/perseus-editor": major
---

The widget editor registry has moved out of `@khanacademy/perseus`'s `Widgets`
namespace. `registerEditors`, `replaceEditor`, `replaceDeprecatedEditors`, and
`getEditor` now live in `@khanacademy/perseus-editor`, which is their only
consumer. The editor barrel no longer re-exports the legacy all-widget
`widgets` array from `@khanacademy/perseus`.
