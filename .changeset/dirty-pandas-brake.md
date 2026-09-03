---
"@khanacademy/perseus-editor": patch
---

Fix an interactive graph editor crash when editing a locked vector or line so that its two points momentarily coincide. Label positions no longer become invalid, and coordinate fields tolerate invalid saved values instead of crashing the editor.
