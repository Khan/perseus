---
"@khanacademy/perseus": major
---

Convert `ServerItemRenderer` to a function component. Its ref is now a
`ServerItemRendererHandle`, which replaces the `ServerItemRendererComponent`
type export. The handle's `questionRenderer` is null while the component isn't
mounted, and its methods do nothing and return empty values then, rather than
throw; the first such call is logged through `Log.log`.
