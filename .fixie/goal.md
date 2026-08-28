# Run the pre-publish check in CI on Version Packages PRs

## Task

> TODO-NEXT: run this script in CI on every Version Packages (changesets release) PR.
> We want to verify that the release will go smoothly *before* actually
> cutting the release.

(from `utils/pre-publish-check-ci.ts`, line 17)

## Code analysis

- **The check itself:** `utils/pre-publish-check-ci.ts`
  - A standalone executable script (shebang runs it through `@swc-node/register`).
  - Globs `packages/*/package.json` and, for each, runs the pure predicates from
    `utils/internal/pre-publish-utils.ts`: `checkPrivate`, `checkPublishConfig`,
    `checkEntrypoints`, `checkSource`. They log to stderr and return a boolean.
  - Then calls `verifyCatalogHashes()` (`utils/internal/verify-catalog-hashes.ts`),
    which recomputes each published package's `khan.catalogHash` from
    `pnpm-workspace.yaml` and reports drift.
  - Exits 1 if anything failed. It only reads files — no build, no network, no
    npm auth — so it is safe and cheap to run on a PR.

- **Where it runs today:** two places, both at publish time, never before.
  - `package.json` script `publish:ci` — the command `changesets/action` invokes
    from the `release` job in `.github/workflows/publish.yml`.
  - `utils/publish-snapshot.sh`'s `pre_publish_check`, which additionally asserts
    the working tree is clean.

- **The release flow:** `.github/workflows/publish.yml` (`Release` workflow) runs
  on push to `main`. `changesets/action` either opens/updates the "Version
  Packages" PR (branch `changeset-release/main`, per `.changeset/config.json`'s
  `baseBranch: main`) or, when that PR lands, publishes. So the Version Packages
  PR is the last chance to catch a bad `package.json` before a release.

- **PR-time CI:** `.github/workflows/node-ci.yml` (`Node CI`) runs on
  `pull_request`. Jobs: `changeset` (requires a changeset entry — deliberately
  skipped for bots), `lint` (format/knip/STOPSHIP/eslint/typecheck/jest),
  `cypress`, `check_builds`. Most jobs share a preamble: checkout → `Khan/actions@secure-network-v1`
  → `./.github/actions/shared-node-cache`. Runner is chosen by the
  `USE_GITHUB_RUNNERS` repo variable.

- Workflow YAML in this repo uses a non-standard `parallel:` step list that is
  expanded by `Khan/actions@fix-workflows-v3`; `validate-workflows.yml` pushes
  the expansion back to the PR branch. Prefer plain steps unless adding to an
  existing `parallel:` block.

## Examples to follow

- The `lint` job in `.github/workflows/node-ci.yml` is the model for a new job:
  checkout, secure network, shared-node-cache, then run a `pnpm` script.

```yaml
    pre_publish_check:
        name: Pre-publish check
        runs-on: ${{ vars.USE_GITHUB_RUNNERS == 'true' && 'ubuntu-latest' || 'ephemeral-runner' }}
        steps:
            - name: Checking out latest commit
              uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2

            - name: Secure Network
              uses: Khan/actions@secure-network-v1
              timeout-minutes: 5
              with:
                  conf-files: .github/npm-extra-domains.conf

            - name: Install & cache node_modules
              uses: ./.github/actions/shared-node-cache

            - name: Pre-publish check
              run: pnpm pre-publish-check
```

- The `changeset` job shows the idiom for gating a job on who opened the PR
  (`if: github.actor != 'dependabot[bot]'`); the gate here is the head branch
  instead, e.g. `github.head_ref == 'changeset-release/main'`.

- `package.json` already exposes similar one-off scripts (`update-catalog-hashes`
  → `utils/update-catalog-hashes-cli.ts`); add a sibling entry rather than
  spelling the script path out in YAML.

- `knip.config.ts` lists `utils/pre-publish-check-ci.ts` as an entry point; keep
  that in sync if the file is renamed or a new one is added.

## Behavioral requirements

- On a Version Packages PR, CI fails if any check in `pre-publish-check-ci.ts`
  fails, and the failure is visible as a required-looking status on the PR.
- The failure output names the offending package and the specific problem, and
  for catalog-hash drift tells the reader to run `pnpm update-catalog-hashes`.
  (The script already does this; just don't swallow its output.)
- The job must not require npm credentials, a build, or write access to the repo.
- The job must not be skipped just because the PR was authored by a bot — the
  Version Packages PR is always authored by the changesets bot, so any
  bot-actor filter would defeat the purpose.
- Running the check on non-release PRs must not slow ordinary CI noticeably; if
  it's cheap enough to run everywhere, running it everywhere is acceptable and
  arguably better, but it must at minimum run on `changeset-release/main`.
- The Version Packages PR is force-pushed as new changesets land; the check must
  re-run on `synchronize`, not only `opened`.
- Publish-time behavior is unchanged: `publish:ci` still runs the same check.

## Open questions

- Should the check run on *every* PR rather than only Version Packages PRs? It's
  a fast, read-only check, and running it everywhere catches a bad `package.json`
  at the PR that introduces it instead of at release time. The TODO asks only for
  the release PR. Recommendation: run on all PRs, which also sidesteps the
  head-branch gating and the "skipped job can't be required" problem below.
  - Answer: No, only Version Packages PRs. If it runs on every PR, there is a
    greater risk that devs will update the catalog hashes but forget to add
    changesets for the affected packages. That is because our CI only checks
    for the existence of a changeset file; it doesn't actually check that all
    changed packages are listed in the changeset.
- If it is gated to `changeset-release/main`, a `if:`-skipped job reports
  "skipped", which GitHub treats as passing but which can't be a meaningful
  required check. Do we want it in the branch protection required set?
  - Answer: The behavior of `if:` is fine.
- Should the CI job also assert a clean working tree (the extra check
  `publish-snapshot.sh` does)? On a PR there is nothing to dirty the tree unless
  a step writes files, so probably not.
  - Answer: No need to check for a clean working tree.
- New job in `node-ci.yml` versus a new workflow file? A job in `node-ci.yml`
  reuses the shared node cache and the existing concurrency group; a separate
  workflow would let `paths:` narrow the triggers.
  - Answer: add it to node-ci.yml

## Checklist

- [ ] Add a `pre-publish-check` script to the root `package.json` that runs
      `utils/pre-publish-check-ci.ts`.
- [ ] Reuse the new script in `publish:ci` so publish-time behavior is unchanged.
- [ ] Add a `pre_publish_check` job to `.github/workflows/node-ci.yml`, gated on
      `github.head_ref == 'changeset-release/main'`, following the `lint` job's
      checkout / secure-network / shared-node-cache preamble and running
      `pnpm pre-publish-check`.
- [ ] Confirm `node-ci.yml`'s `pull_request` trigger includes `synchronize` (the
      default) so the job re-runs on force-pushes to the Version Packages PR.
- [ ] Verify `knip.config.ts` still lists `utils/pre-publish-check-ci.ts` as an
      entry point; no rename means no change, so just confirm.
- [ ] Add a changeset if any published package changed (root-only changes need
      none).
