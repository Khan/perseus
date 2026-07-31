---
"@khanacademy/perseus": patch
---

Internal: the Matcher widget is now a functional component. The `Matcher` class
is no longer exported; the shape of the widget instance a renderer sees is
described by the exported `MatcherHandle` type.
