<!--
Khan/perseus risk-tier prose and deep-checks for the PR-reviewer workflow. Injected
into the correctness-reviewer sub-agent of the shared workflow
(Khan/actions/workflows/review/review.md) at RUNTIME. Keep this plain Markdown with no
GitHub Actions template expressions — gh-aw rejects those inside imported files.

Blast radius: Perseus is a published npm library that renders and scores every exercise
and article on Khan Academy. Wrong code here ships via changeset releases into
webapp/frontend production, where it breaks content rendering, answer scoring
(perseus-score grades learner answers server-side), or accessibility for learners.
The machine-readable path map lives in ROUTING; this file is the model-facing prose.
-->

### How tiers are assigned

The router assigns each file's tier from ROUTING, which covers every tracked
path and is the only path list. This file does not repeat it: it says why each
category sits in its tier and what to check there.

### Generated files are automatically Trivial

Anything `.gitattributes` marks `linguist-generated`. The router short-circuits
these (tier Trivial, no lenses, contents not analysed), so a hand-edit to one
reaches no reviewer here. If a generated file changed but its source did not,
say so in the review: a human has to check that change. A gh-aw `.lock.yml` is
compiled from its sibling `.md`, and nothing in CI recompiles and compares. The
agent config under `.claude/`, `.codex/` and `.cursor/` is written by the
Khan/agent-settings installer, so a hand-edit is unreviewed and the next install
overwrites it.

### High Risk

Can silently mis-score learners, break published content at scale, or compromise the
CI supply chain:

- **Answer scoring and validation.** A wrong scorer marks correct learner answers
  wrong (or wrong answers correct) silently: tests pass, nothing crashes, learners
  are harmed. Scoring semantics are the single most consequential surface in the
  repo.
- **The content data schema and parsers.** These are the contract with all
  published Khan Academy content and with other consumers (webapp, content tools).
  CI's schema-comparison gate flags that the schema *changed* (via the
  `schema-change` label); it cannot judge whether the change is backward-compatible
  with existing published content. A parser change that rejects (or reinterprets)
  previously-valid content breaks live exercises. The parser regression snapshot
  records the parser's output over every frozen fixture: a changed snapshot means
  that output changed, so check each changed entry is an intended behavior change,
  not a regression.
- **Vendored libraries and pnpm patches.** Forked, hand-patched, no upstream
  review; edits are rare and deserve full scrutiny.
- **Publish configuration.** Decides what gets published to npm and how consumers
  resolve it (`exports`/`main`, changeset config).
- **Dependency and install surface** (root manifest, lockfile, workspace file).
  Install scripts run on every workstation and in CI. In the lockfile, look for a
  changed `resolved` URL or integrity hash without a version change, and new
  install-script dependencies; it is never hand-edited, so any odd diff is a flag.
  In the workspace file, check that the `minimumReleaseAge` guard and overrides are
  not weakened.
- **CI supply chain** (workflows, composite actions, the network allowlists their
  jobs use). Public repo: check for pwn-request patterns, over-scoped secrets and
  tokens, and new allowlisted domains in jobs that hold secrets.
- **Review and merge controls** (the reviewer's own config, `.gitattributes`,
  CODEOWNERS). A change here can hide files from review, lower their tier, or
  change who must approve a merge.
- **Code that runs on a contributor's machine** (`.mcp.json`, the dev container).
  It runs as the engineer, with their credentials, when the repo is opened or an
  agent session starts.

### Medium Risk

The default for shipped source: widgets, renderers, editors, math-input,
kmath/kas math utilities. User-facing rendering, interaction, keyboard
handling, and ARIA semantics for learners, including screen-reader and
keyboard-only users. Not High because a rendering defect is visible and recoverable
in a way a silent mis-score is not — but an accessibility regression can be
invisible to a sighted mouse-using reviewer, so treat a11y-relevant diffs (focus
management, ARIA attributes, keyboard handlers, semantic HTML swaps) as the top of
this tier.

Also Medium, because a mistake changes what ships or waves a bad PR through
without failing anything:

- **CI and release scripts.** Not shipped, but CI runs them to gate PRs and to
  publish to npm.
- **Build and CI-gate config** (bundler, type build, TypeScript, Jest, ESLint,
  knip). Check that a change does not exclude files, disable rules, or loosen a
  check as a side effect.
- **Agent prose** (skills, `CLAUDE.md`, `AGENTS.md`, the accessibility
  instructions). It steers coding agents rather than executing.
- **Editor and agent-tool config** that names commands to run (VS Code
  workspace, fixie, dependabot).

### Low Risk

Repo-local dev surfaces: tests, test data and their snapshots (except the parser
regression snapshot, High above), Storybook stories and docs, local-only tooling
config, and changeset entry files (but see the changeset deep-check below).

### Trivial

Prose docs (READMEs, changelogs), the sample question corpus for the local
analysis scripts, and the frozen parser-regression fixtures (CI blocks any edit to
an existing fixture; only additions get through).

### What to verify that CI cannot

- **Scoring semantics.** CI runs the tests that exist; it cannot tell that a rubric
  is now wrong. For any `perseus-score` change, reason about learner answers that
  would flip between correct/incorrect, especially edge inputs (empty, partial,
  equivalent-but-differently-formed math expressions).
- **Schema/parser backward compatibility.** The CI gate detects schema *diffs*, not
  *compat*. Ask: does previously-published content still parse and render the same?
  Is a new field optional with a safe default? Does a widget-options change handle
  content saved by older editor versions?
- **Changeset semver level.** CI verifies a changeset *exists*, not that the bump
  level is right. A breaking change marked `patch` ships un-flagged into consumers.
- **Accessibility semantics** (WCAG 2.2 AA, per `accessibility-instructions.md`):
  semantic HTML over ARIA, keyboard reachability, focus not lost on state changes.
  Automated checks catch attribute-level issues only.
- **Widget upgrade paths.** Widgets carry versioned options with migration functions;
  a shape change without a migration breaks previously-authored content.
