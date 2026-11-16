# config/test/modules

This directory exists to house TypeScript modules that use `import`/`export`
syntax. Modules need to be located under a `package.json` file with
`{"type":"module"}`; otherwise, Vite (used by Playwright) will fail to import
them with an error like `SyntaxError: Unexpected token 'export'`.

The effect of putting module files in this directory is that it allows
Playwright to work.

FUTURE: we'd like all of our package.json files to use `{"type":"module"}` so
this special-casing of modules isn't necessary. Try adding `"type": "module"`
to every package.json that doesn't have it, and then move the modules in
this directory up a level. If Jest and Playwright still work (after you've
fixed up the import paths) you can safely delete this directory.
