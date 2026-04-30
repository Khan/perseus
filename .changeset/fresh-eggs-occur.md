---
"@khanacademy/perseus-core": major
---

Breaking change: The deprecated `violatingWidgets` function has been removed. Callers should use `isItemAccessible` instead. `isItemAccessible` now checks for inaccessible widgets in hints as well as question content.
