---
"@khanacademy/perseus-editor": patch
---

Internal cleanup of the preview bridge: the parent's send helper now takes the
`ParentToIframeMessage` union rather than the loose message base, so outbound
messages are type-checked, and the base type is no longer exported. The iframe
side sends through a single `postToParent` helper instead of three inline
`postMessage` calls. No behavior change.
