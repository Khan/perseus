---
"@khanacademy/perseus-editor": patch
---

Fix an interactive graph editor crash when a locked vector or line is edited so that its two points momentarily overlap. Label coordinates no longer become invalid, and previously invalid ones are repaired on the next edit.
