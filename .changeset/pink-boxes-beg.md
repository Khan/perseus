---
"@khanacademy/perseus": patch
---

There was a bug where inline math was incorrectly wrapped in a `<div>` element when `inline: true` was passed to the Renderer and the `perseus-renderer-upgrade` feature flag was on. This has been fixed.
