---
"@khanacademy/perseus-editor": major
---

The preview moved to the new `@khanacademy/perseus-preview` package, and perseus-editor no longer exports it. Import these from `@khanacademy/perseus-preview` instead: `PreviewWithIframe`, `usePreviewController`, `usePreviewPresenter`, `A11yOverlays`, `PreviewOptions`, `DEFAULT_PREVIEW_OPTIONS`, `PreviewContent`, `revealHints`, `describeHints`, `shownHintPositions`, `INITIAL_HINTS_REVEAL`, `HintsState`, `HintsReveal`, and the `Issue` type that `IssuesPanel` takes.
