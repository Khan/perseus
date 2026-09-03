---
"@khanacademy/perseus-editor": patch
---

Fix an interactive graph editor crash when editing a locked vector or line so that its two points momentarily coincide. Label positions no longer become invalid, coordinate fields render invalid saved values as empty highlighted fields instead of crashing the editor, and previously corrupted coordinates are repaired on the next edit.
