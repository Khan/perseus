---
"@khanacademy/perseus": patch
---

FIX: `onRendered` now waits for zoomable content to settle. `Zoomable` — which
wraps block math and tables on mobile, and takes several passes to measure and
scale its content before fading it in — now reports its rendering status through
the `AssetContext`, so items containing it are no longer declared rendered early.
