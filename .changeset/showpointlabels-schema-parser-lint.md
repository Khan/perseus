---
"@khanacademy/perseus-core": minor
"@khanacademy/perseus": minor
"@khanacademy/perseus-linter": minor
---

Add new JSON field "showPointLabels" for interactive graphs. When set, every
movable point gets a visible on-canvas label driven by the matching
`pointLabels[i]` entry. `pointLabels` is required whenever `showPointLabels`
is true (enforced by the interactive-graph-widget-error lint rule);
the renderer never auto-generates fallback letters.
