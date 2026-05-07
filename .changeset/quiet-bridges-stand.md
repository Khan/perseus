---
"@khanacademy/perseus-editor": minor
---

`PreviewWithIframe` now also speaks the legacy `IframeContentRenderer` wire protocol (raw-string handshake + `window.iframeDataStore`) alongside the typed `usePreviewController` protocol, so editor consumers can drive preview frames from older perseus versions without code changes. This is transitional — will be removed once all clients can upgrade to a version of Perseus that supports the modernized preview system (aka `usePreviewPresenter`).
