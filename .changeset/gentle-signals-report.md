---
"@khanacademy/perseus-preview": minor
---

The preview iframe can report how its render of the content went. `usePreviewPresenter` returns `reportRenderState(renderState)`, which sends a new `render-state` message (`RenderState`: `{status: "rendering"}`, `{status: "done"}` or `{status: "error", message}`, tagged with the content version it describes). `usePreviewController` returns the latest `renderState`: `"rendering"` from the moment it sends content, or resends it to a reloaded iframe, until the iframe reports on that content; reports about superseded content are ignored.
