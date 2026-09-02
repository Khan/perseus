---
"@khanacademy/perseus": major
---

Fixes a console error that appeared when re-clicking the already-selected function type in the Grapher widget. Clicking the option that is already selected in a button group (such as the Grapher's "Choose your type" row) is now simply ignored — nothing on screen changes, same as before, but no error is logged. For developers using the exported `ButtonGroup` component directly: its `allowEmpty` prop is removed, and `onChange` no longer fires when the selected button is clicked again (the reason for the major version bump).
