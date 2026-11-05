---
"@khanacademy/perseus": minor
---

Fetch a Graphie image's label data through the `generateUrl` dependency, with the new context `"graphie:data_url"`, as the image itself already is, so a host can serve both files from another host or path. `generateUrl` implementations that look at `context` should return the URL unchanged for contexts they don't handle. The label data cache is now keyed by the resolved data URL instead of the image's hash.

`ImageLoader` now preloads an image from the URL `generateUrl` returns, the one its `<img>` shows, instead of the original URL, so an image whose URL a host rewrites is loaded once and from where the host serves it.
