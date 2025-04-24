---
"@khanacademy/perseus-core": major
"@khanacademy/perseus": patch
"@khanacademy/perseus-editor": patch
---

Removes `undefined` from the types of
`PerseusInteractiveGraphWidgetOptions.lockedFigures` and
the `labels` property of locked figures. Removes the `coords`
property from interactive graph widget options types, for graphs that do not
use it (all but the `point` graph type).

This is a breaking change because assigning `undefined` to `lockedFigures` or
`labels`, or setting `coord` in an object literal, will now give a type error.
Callers should use an empty array instead of `undefined` for `lockedFigures` and
`labels`. Avoid setting `coord` for graph types other than `point`.
