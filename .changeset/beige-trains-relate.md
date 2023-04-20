---
"@khanacademy/perseus": major
"@khanacademy/perseus-editor": minor
---

Remove getKaTeX from the PerseusDependencies type

perseus-editor now detects KaTeX rendering errors by calling KaTeX directly,
rather than using getKaTeX from PerseusDependencies.

The logKaTeXError method, which was unused by Perseus, has been removed from
the PerseusDependencies type as well.

Clients should update their code by removing the getKaTeX and logKaTeXError
properties from their PerseusDependencies object. If they want to log an error
when TeX fails to render, they should do so in their TeX component.
