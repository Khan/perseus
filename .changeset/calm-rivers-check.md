---
"@khanacademy/perseus-linter": minor
---

New lint rules: `duplicate-choices` (radio or dropdown choices that read the same, ignoring `$` and spacing), `graphie-image-url` (a Graphie image used as a PNG, whose labels can't be translated; suggests a `web+graphie://` URL instead), and `widget-placeholder-missing-widget`, `widget-placeholder-duplicate` and `widget-placeholder-unrenderable` (a placeholder with no widget, one used more than once, and one whose id won't render).
