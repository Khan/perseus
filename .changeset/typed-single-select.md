---
"@khanacademy/perseus-editor": patch
---

Add a typesafe `TypedSingleSelect` wrapper around Wonder Blocks' `SingleSelect` and use it for the editor's dropdowns. Its `selectedValue`/`onChange` are constrained to the union inferred from the `options` keys, letting call sites drop the `as` casts they previously used to narrow `SingleSelect`'s `string` value type. No user-visible behavior change.
