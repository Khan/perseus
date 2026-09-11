---
"@khanacademy/perseus-editor": major
---

The deprecated, non-functional `developerMode` and `onPreviewDeviceChange` props have been removed from `EditorPage`. The `serialize()` imperative method has also been removed. Callers should use `onChange` instead of imperative APIs to receive updates.
