---
"@khanacademy/perseus": patch
---

Internal: the Numeric Input widget is now a functional component. Its widget
instance no longer has a public `blur()` method; `blur()` was never part of the
`Widget` interface, and renderers blur the widget through `blurInputPath()`.
