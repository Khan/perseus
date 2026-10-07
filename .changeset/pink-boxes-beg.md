---
"@khanacademy/perseus": patch
---

There was a bug where inline math was incorrectly wrapped in a `<div>` element when `inline: true` was passed to the Renderer. This has been fixed in the new version of the Renderer (active when the perseus-renderer-upgrade feature flag is on).
