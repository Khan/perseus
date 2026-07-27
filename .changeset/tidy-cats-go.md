---
"@khanacademy/perseus": patch
---

FIX: `ServerItemRenderer` no longer calls `onRendered` before
asynchronously-rendered content has finished rendering. Assets register
themselves while it is still rendering, so it now tracks their statuses
synchronously instead of in React state, where they weren't visible until after
it had already reported completion. Previously any item containing an async
asset — math or images — reported complete during mount, and because that report
is only made once, no corrected call followed.
