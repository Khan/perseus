# @khanacademy/perseus-preview

Previews Perseus content in an iframe. The page that shows the preview uses
`usePreviewController` (or `PreviewWithIframe`, which wraps it); the page in
the iframe uses `usePreviewPresenter` to receive the content and render it.
They talk over `postMessage`.
