---
"@khanacademy/kas": patch
"@khanacademy/keypad-context": patch
"@khanacademy/kmath": patch
"@khanacademy/math-input": patch
"@khanacademy/perseus": patch
"@khanacademy/perseus-core": patch
"@khanacademy/perseus-editor": patch
"@khanacademy/perseus-linter": patch
"@khanacademy/perseus-score": patch
"@khanacademy/perseus-utils": patch
"@khanacademy/pure-markdown": patch
"@khanacademy/simple-markdown": patch
---

Build packages with Vite (Rolldown and Oxc) instead of Rollup and SWC. Packages now import `react/jsx-runtime` and `react-dom/client` from their React peer dependencies instead of bundling copies. CSS is now built for Chrome 144 and Safari 16.6, which expands nested rules so they apply in Safari versions before 17.2.
