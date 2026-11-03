---
"@khanacademy/perseus-editor": major
---

Preview iframes can show a page on another origin than the editor's. `usePreviewController` now sends messages to the origin of its iframe's `src` (instead of `"/"`) and accepts messages only from that origin, so an iframe with no `src`, or `about:blank`, receives nothing. `usePreviewPresenter` sends `iframe-ready` to any origin, then replies only to the origin of the parent's first message, and sends nothing (such as height updates) before that message arrives.
