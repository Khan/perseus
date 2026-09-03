---
"@khanacademy/perseus-core": minor
"@khanacademy/perseus-editor": patch
---

`WidgetLogic` takes the widget's name as its first type parameter, and every
widget's logic now keeps that name as a literal type. Widget registration
descriptors will use the literal to check that a React widget and its logic
describe the same widget.

`generateNumericInputOptions` also stops setting `static`, which is not part of
the numeric-input widget options — it belongs to the wrapping widget, where
`generateNumericInputWidget` already sets it.
