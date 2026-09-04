---
"@khanacademy/perseus-core": major
"@khanacademy/perseus": patch
---

Looking up an unregistered widget type now throws outside production, naming
the widget and the registration call that was missed. Production is unchanged:
content naming a widget the build doesn't know about still renders an empty
`<div>` with a warning, since registries must stay forward-compatible with
future widget types.

Tests and tools that deliberately exercise an unknown type can turn the check
off for the duration of a call with `withStrictRegistration(false, fn)`, or for
longer with `setStrictRegistration`.
