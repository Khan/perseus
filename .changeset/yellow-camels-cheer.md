---
"@khanacademy/perseus": major
"@khanacademy/perseus-editor": patch
---

Remove obsolete properties from the PerseusDependencies type

We are in the process of migrating the webapp and mobile repos to use
MathJax 3 as their math renderer instead of KaTeX. This change removes some of
Perseus's dependencies on KaTeX.

Clients should update their code by removing the `getRenderA11yString`,
`loadMathjax`, `KatexProvider`, and `shouldUseFutureKaTeX` properties from
their PerseusDependencies object.
