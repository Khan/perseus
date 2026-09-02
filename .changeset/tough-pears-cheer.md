---
"@khanacademy/perseus": major
---

Fixes a console error that appeared when re-clicking the already-selected function type in the Grapher widget by removing ButtonGroup's `allowEmpty` prop — clicking the selected button no longer calls `onChange`.
