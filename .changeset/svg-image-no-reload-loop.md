---
"@khanacademy/perseus": patch
---

Fix `SvgImage` re-running `loadResources` (and calling `setState` during React's commit phase) on every update while a labeled SVG's image was still loading, which could trip React's "Maximum update depth exceeded" limit
