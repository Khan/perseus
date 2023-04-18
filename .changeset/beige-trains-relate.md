---
"@khanacademy/perseus": major
"@khanacademy/perseus-editor": minor
---

Remove getKaTeX from the PerseusDependencies type

perseus-editor now detects KaTeX rendering errors by calling KaTeX directly,
rather than using getKaTeX from PerseusDependencies.

Clients should update their code by removing the getKaTeX property from their
PerseusDependencies object.
