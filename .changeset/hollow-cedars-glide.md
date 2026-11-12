---
"@khanacademy/perseus": major
---

Convert `ServerItemRenderer` to a function component. Its ref is now a
`ServerItemRendererHandle`, which replaces the `ServerItemRendererComponent`
type export, and offers only `focus`, `blur`, `getPromptJSON`,
`getUserInput`, `getWidgetIds`, `getSerializedState` and `questionRenderer`:
`focusPath`, `blurPath`, `getDOMNodeForPath`, `getInputPaths` and
`getNumHints` are gone (use `questionRenderer` for the path methods, and the
item's `hints.length`). `questionRenderer` is null while the component isn't
mounted, and the methods do nothing and return empty values then, rather than
throw; the first such call is logged through `Log.log`.

`ServerItemRenderer` also takes an `onRendered` prop, called once the item
and its assets have rendered; a `LoadingContext` provider's `onRendered` is
still called as well.
