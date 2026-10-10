---
"@khanacademy/perseus": major
"@khanacademy/perseus-core": major
"@khanacademy/perseus-editor": major
"@khanacademy/perseus-score": patch
---

Treat removed widget types like any other widget type Perseus doesn't implement. There is no longer a `deprecated-standin` widget: for any widget type without a registered implementation, the renderer shows a notice (and logs the type and widget ID), the editor shows a fallback editor that keeps the widget's options, and scoring skips the widget.

Breaking changes:

- `@khanacademy/perseus`: removed `Widgets.replaceWidget`, `replaceDeprecatedWidgets`, `registerEditors`, `getEditor`, `replaceEditor` and `replaceDeprecatedEditors`. The `deprecatedStandin` string is now `unsupportedWidget`.
- `@khanacademy/perseus-core`: `DeprecatedStandinWidget` is now `DeprecatedWidget`, and the `deprecated-standin` widget logic is gone.
- `@khanacademy/perseus-editor`: no longer re-exports `widgets` from `@khanacademy/perseus`.
