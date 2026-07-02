---
"@khanacademy/perseus": patch
"@khanacademy/perseus-editor": patch
---

Migrate Wonder Blocks font sizing from the deprecated `font.size` / `--wb-font-size` tokens to the newer `font.body.size` / `--wb-font-body-size` tokens. Sizes that have no `body` equivalent (`large`) now use the matching `font.heading.size` token.