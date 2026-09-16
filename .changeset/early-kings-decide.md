---
"@khanacademy/kas": major
"@khanacademy/keypad-context": major
"@khanacademy/kmath": major
"@khanacademy/math-input": major
"@khanacademy/perseus": major
"@khanacademy/perseus-core": major
"@khanacademy/perseus-editor": major
"@khanacademy/perseus-linter": major
"@khanacademy/perseus-score": major
"@khanacademy/perseus-utils": major
"@khanacademy/pure-markdown": major
"@khanacademy/simple-markdown": major
---

Ship ES modules only. Every package now declares `"type": "module"`, drops
the legacy `main` and `module` fields, and no longer offers a `require`
condition, so `require()` of a
package or any of its sub-paths fails at resolution time. Bundles moved from
`dist/es/*.js` to `dist/*.js`.

`import` specifiers are unchanged — `@khanacademy/perseus`,
`@khanacademy/perseus/strings`, `@khanacademy/perseus/styles.css` and the rest
all still resolve. CJS consumers need to either move to `import`, or use a
dynamic `await import()` from an async context.
