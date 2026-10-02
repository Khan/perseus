---
"@khanacademy/perseus-core": major
---

The `type` property of deprecated widgets is now preserved, rather than forced to `"deprecated-standin"`, during parsing. Breaking change: the `DeprecatedStandinWidget` type now has a required type parameter for the value of the `type` property.
