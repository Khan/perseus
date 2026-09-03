---
"@khanacademy/perseus": minor
---

`WidgetExports` takes the widget's name as its first type parameter, and every
widget's export now keeps that name as a literal type. Widget registration
descriptors will use the literal to check that a React widget and its core
logic describe the same widget. The free-response export also drops a stray
`accessible` property that no code read; accessibility metadata lives on the
widget's core logic.
