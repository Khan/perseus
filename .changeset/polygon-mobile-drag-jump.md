---
"@khanacademy/perseus": patch
---

Fix jumping/drift when dragging an Interactive Graph polygon on mobile. The polygon now dispatches the anchor's absolute target position rather than a delta computed against potentially-stale render state (mirrors the MovableLine fix in #3493).
