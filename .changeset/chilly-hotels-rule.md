---
"@khanacademy/perseus": patch
"@khanacademy/perseus-editor": patch
"@khanacademy/math-input": patch
---

Internal: stop minifying CSS at build time. Consumers re-minify with their own bundler, so doing it here was redundant and pulled in cssnano → caniuse-lite, which periodically required refreshing the browserslist DB.
