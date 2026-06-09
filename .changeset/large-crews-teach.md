---
"@khanacademy/perseus": minor
"@khanacademy/perseus-core": minor
"@khanacademy/perseus-editor": minor
---

Render visible point labels on interactive graphs when the`perseus-enable-point-label-field` flag is on and the graph's`showPointLabels` field is true. Labels render via TeX in an HTML overlayso authors can include math (`$A$`, `$\theta$`, …) and stay outside theplotted region as a point is dragged toward an edge. Covers point,circle, angle, polygon, sinusoid, linear, linear-system, ray, andsegment in this release; remaining graph types follow in a per-graphseries. Existing content that sets `pointLabels` for screen-readerpurposes is unaffected — visible rendering requires both the flag and`showPointLabels: true`.
