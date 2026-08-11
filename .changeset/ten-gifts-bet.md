---
"@khanacademy/perseus-editor": patch
---

Add opt-in logging of preview bridge messages, in both directions, to make
diagnosing a silent or looping preview possible without hand-instrumenting
`postMessage` in the console. Off unless
`window.__PERSEUS_PREVIEW_BRIDGE_DEBUG__` is set to `true` in either the editor
or the preview iframe frame.
