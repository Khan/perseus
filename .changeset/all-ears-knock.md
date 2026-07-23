---
"@khanacademy/perseus-editor": patch
---

Preview bridge: the parent now replies to the iframe's `iframe-ready` handshake with a single `iframe-init` message carrying the full current preview state, resent on every ready (including reloads), so a freshly loaded preview iframe never misses state sent before it was listening.
