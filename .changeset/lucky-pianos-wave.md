---
"@khanacademy/perseus": patch
---

Fix a Safari hard-freeze when rendering graphie images with TeX labels: graphie label positioning now waits for `document.fonts.ready` at most once instead of re-checking `document.fonts.status`, which Safari can leave at "loading" while `ready` is already resolved (WebKit bugs 174030, 225790), causing an infinite microtask loop
