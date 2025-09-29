---
"@khanacademy/perseus-editor": patch
---

Stop passing jsonMode to onChange callback of EditorPage. This was almost certainly a bug. Nothing in webapp was using this behavior, but if it had been, extra jsonMode properties would have been written into assessmentItem data
