---
"@khanacademy/perseus": major
---

Remove the `init`, `widgets`, and `registerAllWidgetsForTesting` exports from
`@khanacademy/perseus`; they pulled every widget into every barrel importer.
Call `initPerseus()` from `@khanacademy/perseus/init` if you need to register
all widgets instead.
