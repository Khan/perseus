---
"@khanacademy/perseus-editor": major
---

Preview iframes can show a page on another origin than the editor's, and get all their configuration through messages.

- `usePreviewController` sends messages to the origin of its iframe's `src` (instead of `"/"`) and accepts messages only from that origin, so an iframe with no `src`, or `about:blank`, receives nothing.
- `usePreviewPresenter` sends `iframe-ready` to any origin, then replies only to the origin of the parent's first message, and sends nothing (such as height updates) before that message arrives.
- New `PreviewOptions` (`isMobile`, `hasLintGutter`, `a11yScanningEnabled`, `reviewMode`, `showSolutions`, `showRationales`, `answerless`, `locale`, `colorScheme`, `readOnly`) and `DEFAULT_PREVIEW_OPTIONS`. The `iframe-init` message carries `previewOptions` in place of `a11yScanningEnabled`, and a `set-preview-options` message with some of the options replaces `set-a11y-scanning-enabled`.
- `usePreviewController` returns `setPreviewOptions(options)` in place of `setA11yScanningEnabled(enabled)`: call `setPreviewOptions({a11yScanningEnabled: enabled})`.
- `usePreviewPresenter` returns `previewOptions` in place of `isMobile`, `hasLintGutter` and `a11yScanningEnabled` (read `previewOptions.isMobile` and so on). It no longer reads the iframe's `data-mobile` and `data-lint-gutter` attributes, and `PreviewWithIframe` no longer sets them: a page that sets them on its own preview iframe should call `setPreviewOptions` instead.
- New `reveal-hint` message (`{hintsVisible?}`, a count as in HintsRenderer's prop: -1 for all, left out for the next hint) and `hints-state` reply (`HintsState`: `hintsVisible`, `total`, `visibleCount`, `isFinalHelpPage`). `usePreviewController` returns `revealHint(hintsVisible?)` and the latest `hintsState`; `usePreviewPresenter` returns `hintsVisible`, to pass to the renderer, and `renderKey`, to key the rendered content with, since hiding hints needs a remount.
