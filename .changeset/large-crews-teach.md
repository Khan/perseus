---
"@khanacademy/perseus": minor
"@khanacademy/perseus-core": minor
"@khanacademy/perseus-editor": minor
---

Render visible point labels on interactive graphs when the `perseus-enable-point-label-field` flag is on and the graph's `showPointLabels` field is true. Labels render as plain text in an HTML overlay using the Symbola font for a TeX-style serif appearance, and stay outside the plotted region as a point is dragged toward an edge. Plain text (rather than TeX) keeps the same string usable for both the visible label and the screen-reader announcement. Covers point, circle, angle, polygon, sinusoid, linear, linear-system, ray, and segment in this release; remaining graph types follow in a per-graph series. Existing content that sets `pointLabels` for screen-reader purposes is unaffected — visible rendering requires both the flag and `showPointLabels: true`.
