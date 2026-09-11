<!--
Khan/perseus list of issues CI/tooling already catches, so the reviewer doesn't flag
them. Injected at RUNTIME into the correctness-reviewer ("What NOT to flag") and
claim-validator sub-agents of the shared workflow
(Khan/actions/workflows/review/review.md). Keep this plain Markdown with no GitHub
Actions template expressions. Every claim below names the real command or workflow
that enforces it (see .github/workflows/node-ci.yml and friends).
-->

- **Formatting** — `pnpm prettier --check .` (node-ci). Never comment on formatting.
- **Lint** — `pnpm lint` (ESLint, node-ci; full run on main-bound PRs, changed-files
  run otherwise). Don't re-flag what ESLint enforces (import order, unused vars,
  hook deps, `testing-library` rules).
- **Type errors** — `pnpm typecheck` (tsc across all packages) plus `pnpm tstyche`
  (type-level tests, `*.typetest.ts`). If it wouldn't type-check, CI fails.
- **Test failures** — `pnpm jest` runs the full suite on PRs (node-ci), with coverage
  reported to Codecov; `pnpm cypress:ci` runs the Cypress component tests.
- **Missing changeset** — node-ci's "Verify changeset entries" job fails a PR that
  changes publishable files without a `.changeset/*.md` entry. Don't flag a missing
  changeset; DO flag a wrong semver level (CI can't judge that).
- **Data-schema and item-splitting drift** — `pr-comparison-checks.yml` compares the
  built Perseus JSON schema and item-splitting bundle against the base branch and
  enforces `schema-change` / `item-splitting-change` labels with matching `-ack`
  acknowledgment labels. Don't flag that a schema change happened or is unlabelled;
  DO review whether the change is backward-compatible (CI only detects the diff).
- **Frozen parser-regression fixtures** — `protect-regression-data.yml` fails any PR
  touching `data/questions/**` frozen fixtures. Don't warn about edits there; CI
  blocks them outright.
- **Visual regressions** — Chromatic (`chromatic.yml`) snapshots every Storybook
  story and blocks on unapproved visual diffs. Don't flag purely visual styling
  concerns ("this color/spacing change might look wrong") — a human approves the
  Chromatic diff. DO flag behavioral or a11y consequences of styling changes
  (contrast, focus visibility), which Chromatic doesn't judge.
- **Unused exports/files/deps** — `pnpm knip` (node-ci). Don't flag dead exports.
- **Ship-blocker markers** — `./utils/stopship-check.sh` (node-ci) fails on the
  STOP-SHIP marker (spelled as one word in code). Don't re-flag them.
- **Workflow hygiene autofix** — `validate-workflows.yml` normalizes
  checkout/setup ordering in workflow files automatically.
- **Type build** — `pnpm build:types` and `pnpm pre-publish-check` verify the
  published type surface builds (publish.yml / node-ci).

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
  `packages/perseus-core/src/utils/generators` — shared defaults there are
  intentional; don't ask each test to restate them unless the value is asserted on.