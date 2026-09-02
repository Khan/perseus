---
"@khanacademy/perseus": major
---

ButtonGroup no longer supports deselection: the `allowEmpty` prop is removed, and clicking the already-selected button no longer calls `onChange`. This also fixes an error thrown when re-clicking the selected function type in the Grapher widget.
