---
"@khanacademy/perseus": patch
"@khanacademy/perseus-core": patch
"@khanacademy/perseus-linter": patch
---

Fix infinite loop in SvgImage component when loading graphie images. This fixes the "Maximum update depth exceeded" error (React error # 185) that was occurring when rendering graphie images (web+graphie:// URLs) in production.
