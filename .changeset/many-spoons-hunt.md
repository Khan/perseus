---
"@khanacademy/perseus": patch
---

Bugfix: Inline Renderers no longer break up text into separate elements at punctuation marks when the `perseus-renderer-upgrade` feature flag is on. The previous buggy behavior confused screenreaders, especially in cases where words contained an apostrophe. E.g. `"don't"` would become something like `<span>don</span><span>'t</span>`.
