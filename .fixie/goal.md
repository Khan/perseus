# Clean up dead code reported by `knip --production`

## Task

> `knip --production` currently reports a lot of warnings about unused code
> and files. Triage these, delete any code that's truly unused (or only used
> in its own tests) and mark the rest with `@internal` so knip ignores them.

(from `knip.config.ts`, line 84)

## Code analysis

- `knip.config.ts` configures knip per workspace. Patterns suffixed with `!`
  are production files; in `--production` mode knip ignores tests, stories,
  testdata, etc., so anything reachable *only* from those is reported.
  - `basePackageConfig` applies to `packages/*`; `perseus` and
    `perseus-editor` also include `__docs__`, `__testdata__`,
    `__testutils__`, and `testing` dirs as (non-production) project files.
  - The root workspace covers `config/` and `utils/`. `__docs__/` and `data/`
    at the repo root also show up (as their own workspaces via
    `package.json`).
- Production entry points are each package's `src/index.{ts,tsx}`. An export
  is "used" in production only if it's reachable from there.
- `pnpm knip` (non-production) presumably passes today; only `--production`
  is noisy. Verify with `pnpm knip` and `pnpm knip --production` after each
  batch of changes.
- At the time of writing, `pnpm knip --production` reports 19 unused files,
  5 unused dependencies, 102 unused exports, and 19 unused exported types.
  The categories break down roughly as:
  - **Test helpers in production paths** (e.g.
    `perseus-score/src/util/parser.testutils.ts`,
    `perseus-core/.../general-purpose-parsers/parser.testutils.ts`,
    `perseus/src/widgets/table/test-util.ts`,
    `perseus/src/util/test-utils.ts`,
    `perseus-editor/src/util/register-all-widgets-and-editors-for-testing.ts`,
    `mockPerseusI18nContext`, `getBaseMafsGraphPropsForTests`,
    `mockedJoinLabelsAsSpokenMathForTests`, mock widgets, image fixtures in
    `perseus/src/widgets/image/utils.ts`, `storybook-constants.ts`,
    `tinted-background-decorator.tsx`).
  - **Pure helpers exported only so their own tests can call them** (e.g.
    keyboard-constraint functions in `interactive-graphs/graphs/*.tsx`,
    `numeric-input/utils.ts`, `radio/util.ts`, `colors.ts`, Radio parser
    migrations, `map-axe-results.ts`).
  - **Components/types exported for tests or stories** (`LabelImage`,
    `PhetSimulation`, `CircleGraph`, `FreeResponse`, various `Props` types).
  - **Possibly genuinely dead code** (`perseus/src/util/scoring.ts`,
    `perseus-core/src/utils/range.ts`, `tex-error-view.tsx`,
    `blank` scorer/validator, `blank-user-input.ts`, `point-labels.ts`,
    `kas/src/parser-generator.ts`, `config/build/get-entry-points.js`,
    `data/find-questions.ts`, `__docs__/sample-data.ts`).
  - **Unused dependencies** in `__docs__/package.json` and
    `data/package.json`.
- Some reported files are actually used outside the TypeScript import graph
  (verified):
  - `config/build/get-entry-points.js` is imported by
    `config/build/rollup.config.js`, which isn't a knip entry.
  - `packages/kas/src/parser-generator.ts` runs via the `gen:parsers`
    script in `packages/kas/package.json`.
  - `data/find-questions.ts` is a CLI, exposed as `bin` in
    `data/package.json` (`pnpm find-questions`).
  - The `blank` scorer and validator, and `blank-user-input.ts`, are
    imported only by their own tests and typetests. They are not in the
    widget registry.
- The extra perseus-core entries in `knip.config.ts` (the regression-test
  data, `exhaustive-test-tool/index.ts`, `index.item-splitting.ts`) have no
  `!` suffix, so `--production` ignores them. `index.item-splitting.ts` is
  bundled by esbuild in CI, so it is a real production entry point. Code
  reachable only from it shows up as unused under `--production`.
- CI (`.github/workflows/node-ci.yml`) and the root `package.json` run only
  `pnpm knip`. Nothing runs `--production`.

## Examples to follow

- Existing use of `@internal` in
  `packages/perseus/src/widgets/plotter/plotter.tsx`:

  ```ts
  /**
   * Plotter uses Graphie and Graphie is inaccessible,
   * this helps us populate user input in tests
   * (not great, but not a lot of options)
   *
   * @internal
   */
  _testInsertUserInput(userInput: PerseusPlotterUserInput) { ... }
  ```

  For exports, put the JSDoc tag directly above the `export`:

  ```ts
  /** @internal exported for testing */
  export function getCircleKeyboardConstraint(...) { ... }
  ```

- For files that only exist for tests/stories, prefer renaming or moving them
  so they match the non-production patterns in `knip.config.ts`
  (`*.testdata.ts`, `__testutils__/`, `__docs__/`, `testing/`) rather than
  tagging every export. See e.g.
  `packages/perseus/src/widgets/expression/expression.testdata.ts`.

## Behavioral requirements

- `pnpm knip --production` reports no issues (or only ones that are
  explicitly justified, e.g. via config `ignore` with a comment).
- Keep it clean by adding a `knip:production` script to the root
  `package.json` and running it in `node-ci.yml` next to `pnpm knip`.
- Fix the config before changing any code:
  - Add `!` to the `index.item-splitting.ts` entry so it counts as
    production.
  - Make `config/build/rollup.config.js` a root-workspace entry.
  - Make `packages/kas/src/parser-generator.ts` an entry.
  - Make `data/find-questions.ts` a production entry.
  - Rerun `--production` and triage only what remains.
- Delete the `blank` scorer, validator and user-input parser, together with
  their tests.
- `pnpm knip`, `pnpm tsc`, the test suite, and lint keep passing.
- Do not delete or `@internal`-tag anything exported from a package's
  `src/index.ts` public API; no public API of a published package changes.
  If something reported unused is reachable from consumers via another route
  (e.g. a separate entry point in `package.json` `exports`), add it to the
  knip `entry` config instead of tagging it.
- Before deleting a file, check it isn't used outside the TypeScript import
  graph: CLI scripts, GitHub workflows, `package.json` scripts, Storybook
  config, dynamic imports/globs, or the Khan webapp via deep imports.
- When a helper is used only by its own tests, delete both the helper and
  those tests, unless the helper is clearly meant to be used soon — but
  prefer `@internal` for pure helpers that are tested separately as a unit of
  a larger, used module (the function is used internally; only the `export`
  exists for tests).
- Deleting packages from `package.json` files requires `pnpm install` to
  update the lockfile.
- Each published package touched needs a changeset (patch/internal-only).
- Split the work into reviewable commits (e.g. per package or per category).

## Open questions

- For test-helper files living in production paths, is renaming/moving them
  (to `__testutils__/` or `*.testdata.ts`) preferred over `@internal`?
  - Yes, move test helpers to `*.testdata.ts`.
- Is `__docs__/sample-data.ts` used by anything outside the import graph,
  such as Storybook config? Check this before deleting it.
  - It is used by `__docs__/introduction.mdx`, a Storybook page. Don't
    delete it.
- Should `__docs__/` and `data/` at the repo root be configured as explicit
  knip workspaces so their dependencies are tracked correctly?
  - No, that's out of scope.

## Checklist

- [ ] Mark `index.item-splitting.ts` as a production entry (`!`) in `knip.config.ts`
- [ ] Add `config/build/rollup.config.js` as a root-workspace entry
- [ ] Add `packages/kas/src/parser-generator.ts` as a kas entry
- [ ] Add `data/find-questions.ts` as a production entry
- [ ] Rerun `pnpm knip --production` and record the remaining issues in `.fixie/knip-production.md` for triage
- [ ] Delete the `blank` scorer, validator, user-input parser, and their tests/typetests
- [ ] perseus-score: move `util/parser.testutils.ts` to a `*.testdata.ts` file and update imports
- [ ] perseus-core: move `general-purpose-parsers/parser.testutils.ts` to a `*.testdata.ts` file and update imports
- [ ] perseus-core: delete `utils/range.ts` if unused outside its tests (else tag `@internal`)
- [ ] perseus-core: triage remaining unused exports (Radio parser migrations etc.): `@internal` for tested internals, delete dead code
- [ ] perseus: move `widgets/table/test-util.ts` and `util/test-utils.ts` to `*.testdata.ts` files
- [ ] perseus: move test-only fixtures (`mockPerseusI18nContext`, `getBaseMafsGraphPropsForTests`, `mockedJoinLabelsAsSpokenMathForTests`, mock widgets, image fixtures in `image/utils.ts`) into `*.testdata.ts` files
- [ ] perseus: move story-only helpers (`storybook-constants.ts`, `tinted-background-decorator.tsx`) under `__docs__/` or rename to match non-production patterns
- [ ] perseus: tag interactive-graph keyboard-constraint functions `@internal`
- [ ] perseus: tag tested helpers in `numeric-input/utils.ts`, `radio/util.ts`, `colors.ts`, `map-axe-results.ts` `@internal`, or delete ones used only by tests
- [ ] perseus: handle components/types exported for tests or stories (`LabelImage`, `PhetSimulation`, `CircleGraph`, `FreeResponse`, `Props` types) — unexport or tag `@internal`
- [ ] perseus: delete dead code (`util/scoring.ts`, `tex-error-view.tsx`, `point-labels.ts`) after checking for non-import usages, along with their tests
- [ ] perseus-editor: move `register-all-widgets-and-editors-for-testing.ts` to a non-production location and update imports
- [ ] perseus-editor: triage remaining unused exports
- [ ] Triage remaining packages (math-input, kas, linter, etc.) reported by knip
- [ ] Remove unused dependencies from `__docs__/package.json` and `data/package.json`; run `pnpm install`
- [ ] Confirm `pnpm knip --production` and `pnpm knip` report no issues
- [ ] Add a `knip:production` script to the root `package.json`
- [ ] Run `pnpm knip:production` in `node-ci.yml` next to `pnpm knip`
- [ ] Add changesets for each touched published package
