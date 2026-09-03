---
"@khanacademy/perseus": patch
---

registerAllWidgetsForTesting now registers each widget's core logic alongside
its React implementation. `replaceDeprecatedWidgets` maps deprecated types onto
the standin in the core registry as well as the React one, so callers no longer
have to replace the deprecated logics themselves. The legacy
`registerWidgets(WidgetExports[])` overload registers no logic, so it adds
nothing to the core registry; in practice the core registry is already
populated by `@khanacademy/perseus-core`'s own initialization on import.
