---
"@khanacademy/perseus": minor
---

Add DndActionMenu, the per-tile actions menu for the Drag-and-Drop widget
family (internal component, not yet exported). Adds six required entries to
`PerseusStrings`: `dndMoveToHeader`, `dndClear`, `dndMoveToTarget`,
`dndClearTarget`, `dndActionsMenu`, and `dndActionsMenuRemaining` — consumers
that construct a complete `PerseusStrings` object must supply translations
for them.
