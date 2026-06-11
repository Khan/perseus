---
"@khanacademy/perseus-editor": major
---

Rework the preview message data shapes exposed via `usePreviewController` / `usePreviewPresenter`: rename `ArticlePreviewData.json` to `article` (now a single section `PerseusRenderer`), drop `QuestionPreviewData.initialHintsVisible`, replace the `article-all` payload with `ArticleAllPreviewData` (a single shared `apiOptions` across all sections), rename the presenter content field from `data` to `content`, and type preview `apiOptions` as the new `SerializableApiOptions` (the `postMessage`-safe subset of `APIOptions`).
