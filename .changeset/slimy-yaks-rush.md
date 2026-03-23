---
"@khanacademy/perseus-editor": major
---

The `serialize` methods of classes in `@khanacademy/perseus-editor` no longer use arrow function syntax. Callers should not unbind them from the class instance.

Additionally, the `Editor` component no longer accepts a `replace` prop (used for hints), and its serialize method no longer returns `replace`. The `replace` prop was only used in `serialize`. Users of the `Editor` component should manage hints' `replace` setting themselves.
