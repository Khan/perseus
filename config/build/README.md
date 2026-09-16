# persus-build

This is not a real package. It is used to ensure publishing bumps the version numbers in all of the actual packages if any of the build settings change. This is necessary since build settings can affect the built versions of the code which should result in a minor version bump even if the source for a particular package hasn't changed.

## ESM only

Every published package ships ES modules and nothing else. Each
`package.json` declares `"type": "module"`, has no legacy `main` or `module`
field, and its `exports` map offers only `types` / `source` / `default` — no
`require` condition. A CJS
consumer that calls `require("@khanacademy/perseus")` therefore fails at
resolution time rather than half-loading a build.

Node offers two ways to mark a file as ESM: `"type": "module"` with `.js`
extensions, or `.mjs` extensions with no `type` field. We picked
`"type": "module"` because:

- The whole package is one format, so there is nothing to keep in sync. With
  `.mjs` the package stays dual-typed from Node's point of view, and every
  new file has to remember the right extension.
- Declarations come out of `tsc --build` as `.d.ts`. `.mjs` bundles want
  `.d.mts` beside them, which needs extra config to emit and is easy to get
  subtly wrong.
- Bundlers and `arethetypeswrong` read a `"type": "module"` package the same
  way Node does, so what the checks see is what consumers get.

The root `package.json` deliberately has no `"type"` field: the config files
at the repo root (`jest.config.js`, `config/test/*.js`, this directory's
`rollup.config.js`) are CJS and stay that way. Only the published packages
are ESM.

## Output layout

Rollup emits one bundle per entry point into `dist/`, plus shared chunks named
`chunk-[name]-[hash].js`. Entry points come from `getEntryPoints()` in
`get-entry-points.js`, which reads the non-standard `source` condition in each
package's `exports` map — the same field Jest and Vite alias against.

All of a package's entry points build together in a single Rollup config, so a
module reachable from two entry points is emitted once and shared. Chunks live
inside `dist/` and are never named in an `exports` map, so they are not part
of the public sub-path surface even though they ship.

Cross-package sharing is handled by `autoExternal()`, which marks everything
in `dependencies` and `peerDependencies` as external. That is what keeps
module-level state like `perseus-core`'s widget registry a singleton across
`perseus`, `perseus-score`, and `perseus-editor`.
