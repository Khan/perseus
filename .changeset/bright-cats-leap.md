---
"@khanacademy/perseus-editor": major
---

Migrate Perseus editors to use the new `PreviewWithIframe` component and migrate the storybook preview page to `usePreviewPresenter`. After this change, no Perseus code uses the legacy `iframeDataStore` + string-postMessage protocol; the editors and the storybook preview page communicate through the typed `usePreviewController` / `usePreviewPresenter` hook pair.
