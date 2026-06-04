---
"@khanacademy/perseus": minor
"@khanacademy/perseus-core": minor
"@khanacademy/perseus-linter": minor
---

Add new JSON field "showPointLabels" for interactive graphs. When set, everymovable point gets a visible on-canvas label driven by the matching`pointLabels[i]` entry. `pointLabels` is required whenever `showPointLabels`is true (enforced by the interactive-graph-widget-error lint rule);the renderer never auto-generates fallback letters.
