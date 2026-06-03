---
"@khanacademy/perseus-editor": patch
---

Restore the cursor-positioning behavior after pasting widget content and after inserting a widget via the "Add a widget…" dropdown in the markdown editor. The cursor now lands immediately after the pasted/inserted content rather than jumping to the end of the textarea. This behavior was inadvertently dropped in #3318 when the deprecated `ChangeHandler` callback parameter was removed from the editor `onChange` forwarding chain — `editor.tsx` still queued a cursor-positioning callback, but the parent components no longer invoked it. The fix moves cursor positioning into `Editor`'s own `componentDidUpdate`, where it doesn't depend on any parent forwarding behavior.
