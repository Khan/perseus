---
"@khanacademy/perseus": patch
"@khanacademy/perseus-editor": patch
"@khanacademy/math-input": patch
---

Adopt the Wonder Blocks `require-logical-properties-for-rtl` ESLint rule and auto-fix physical CSS properties to their logical equivalents (e.g. `marginLeft` → `marginInlineStart`) for RTL support. No behavior change in LTR; correctly mirrors in RTL.
