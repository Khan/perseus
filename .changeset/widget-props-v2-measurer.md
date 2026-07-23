---
"@khanacademy/perseus": patch
---

Measurer: fix the protractor so it renders in the center of the widget. It previously relied on `protractorX`/`protractorY` props that nothing supplied, so it was positioned at an undefined (NaN) coordinate and effectively didn't appear. It now defaults to the center of the graph, matching the ruler.

Internal: the measurer widget now groups all `options` under a separate prop.
