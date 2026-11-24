---
"@khanacademy/perseus-editor": patch
---

Internal: Remove the call to `excludeDenylistKeys()` in `WidgetEditorContainer`. It's no longer needed because widget editors don't emit any keys that need to be excluded.
