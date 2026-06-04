---
"@khanacademy/perseus": minor
"@khanacademy/perseus-core": minor
---

Add new JSON field "showLabels" for interactive graphs. When set, every movable point gets a visible on-canvas label driven by the matching `pointLabels[i]` entry. `pointLabels` is required whenever `showLabels` is true (enforced by the interactive-graph-widget-error lint rule); the renderer never auto-generates fallback letters, so non-Latin-alphabet locales are unaffected.
