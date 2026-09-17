<!--
Khan/perseus list of issues CI/tooling already catches, so the reviewer doesn't flag
them. Injected at RUNTIME into the correctness-reviewer ("What NOT to flag") and
claim-validator sub-agents of the shared workflow
(Khan/actions/workflows/review/review.md). Keep this plain Markdown with no GitHub
Actions template expressions. Every claim below names the real command or workflow
that enforces it (see .github/workflows/node-ci.yml and friends).
-->

- **Formatting** — `pnpm prettier --check .` (node-ci). Never comment on formatting.
- **Lint** — ESLint via node-ci: `pnpm lint` (full) when an ESLint config file
  changed, otherwise `pnpm eslint [FILES...]` over the changed files only. Don't
  re-flag what ESLint enforces (import order, unused vars, hook deps,
  `testing-library` rules).
- **Type errors** — `pnpm typecheck` (tsc across all packages) plus `pnpm tstyche`
  (type-level tests, `*.typetest.ts`). If it wouldn't type-check, CI fails.
- **Test failures** — node-ci runs `pnpm jest` (the full suite when shared test
  infrastructure changed, otherwise `--findRelatedTests` over the changed files) and
  `pnpm cypress:ci` for the Cypress component tests. There is no coverage gate.
- **Missing changeset** — node-ci's "Verify changeset entries" job fails a PR that
  changes publishable files without a `.changeset/*.md` entry. Don't flag a missing
  changeset; DO flag a wrong semver level (CI can't judge that).
- **Data-schema and item-splitting drift** — `pr-comparison-checks.yml` compares the
  built Perseus JSON schema and item-splitting bundle against the base branch and
  enforces `schema-change` / `item-splitting-change` labels with matching `-ack`
  acknowledgment labels. Don't flag that a schema change happened or is unlabelled;
  DO review whether the change is backward-compatible (CI only detects the diff).
- **Frozen parser-regression fixtures** — `protect-regression-data.yml` fails any PR
  that modifies, renames, or deletes an existing file under
  `packages/perseus-core/src/parse-perseus-json/regression-tests/{item,article,renderer,user-input}-data`.
  Don't warn about edits there; CI blocks them outright. (Adding new fixtures is
  allowed and worth a look.)
- **Visual regressions** — Chromatic (`chromatic-pr.yml`, which calls
  `chromatic-build.yml`) snapshots Storybook stories in
  `*-regression.stories.tsx` files and blocks on unapproved visual diffs. Don't
  flag purely visual styling concerns ("this color/spacing change might look
  wrong") — a human approves the Chromatic diff. DO flag behavioral or a11y
  consequences of styling changes (contrast, focus visibility), which Chromatic
  doesn't judge.
- **Unused exports/files/deps** — `pnpm knip` (node-ci). Don't flag dead exports.
- **Ship-blocker markers** — `./utils/stopship-check.sh` (node-ci) fails on the
  STOP-SHIP marker (spelled as one word in code). Don't re-flag them.
- **Workflow hygiene autofix** — `validate-workflows.yml` normalizes
  checkout/setup ordering in workflow files automatically.
- **Type build** — `pnpm build:types` runs on node-ci whenever the PR changes any
  JS/TS file (same gate as `pnpm typecheck`); config-only PRs skip it.
  `pnpm pre-publish-check` runs only on the `changeset-release/main` release PR, so
  don't cite it as coverage for ordinary PRs.

### Don't raise these false alarms

- Parallel `renderer.tsx` / `renderer.new.tsx` (and `.old.tsx`, plus the paired
  `perseus-renderer.css` / `.new.css`) files are a deliberate side-by-side renderer
  migration, not accidental duplication.
- Widget option types carry legacy/deprecated fields on purpose: published content
  referencing them still exists. Removing "unused-looking" schema fields is the bug,
  not keeping them.
- TypeScript 5.5+ inferred type predicates are in use here — a `.filter()` narrowing
  without an explicit type guard or cast is fine.
- Tests build data through the widget generators in
  `packages/perseus-core/src/utils/generators`. Per CLAUDE.md, a value the test
  asserts on or that drives the logic under test must be passed explicitly; leaning
  on a shared default for anything else is fine and not worth a comment.
