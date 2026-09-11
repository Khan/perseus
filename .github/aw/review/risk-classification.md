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

### Generated files are automatically Trivial

Files matching `linguist-generated` patterns in `.gitattributes`
(`.github/workflows/*.lock.yml`, `agentics-maintenance.yml`), `pnpm-lock.yaml`, and
`**/__snapshots__/**`. A generated file edited *without* its source changing is a red
flag — classify by the manual edit.

### High Risk

Can silently mis-score learners, break published content at scale, or compromise the
CI supply chain:

- **Answer scoring and validation** — `packages/perseus-score/src/**`. A wrong scorer
  marks correct learner answers wrong (or wrong answers correct) silently: tests pass,
  nothing crashes, learners are harmed. Scoring semantics are the single most
  consequential surface in the repo.
- **The content data schema and parsers** — `packages/perseus-core/src/data-schema.ts`
  and `packages/perseus-core/src/parse-perseus-json/**`. These are the contract with
  all published Khan Academy content and with other consumers (webapp, content tools).
  CI's schema-comparison gate flags that the schema *changed* (via the `schema-change`
  label); it cannot judge whether the change is backward-compatible with existing
  published content. A parser change that rejects (or reinterprets) previously-valid
  content breaks live exercises.
- **Vendored libraries** — `vendor/**` (raphael, jsdiff). Forked, hand-patched, no
  upstream review; edits here are rare and deserve full scrutiny.
- **GitHub Actions workflows and the reviewer's own config** — `.github/workflows/**`,
  `.github/actions/**`, `.github/aw/review/**`. Public repo; workflow changes are CI
  supply chain (secrets exposure, pwn-requests), and reviewer-config changes can
  suppress future review.
- **Publish configuration** — `.changeset/config.json`, package `exports`/`main`
  fields in `packages/*/package.json`. Decides what gets published to npm and how
  consumers resolve it.

### Medium Risk

The default for shipped source: `packages/*/src/**` — widgets, renderers, editors,
math-input, kmath/kas math utilities. User-facing rendering, interaction, keyboard
handling, and ARIA semantics for learners, including screen-reader and
keyboard-only users. Not High because a rendering defect is visible and recoverable
in a way a silent mis-score is not — but an accessibility regression can be
invisible to a sighted mouse-using reviewer, so treat a11y-relevant diffs (focus
management, ARIA attributes, keyboard handlers, semantic HTML swaps) as the top of
this tier.

### Low Risk

Repo-local dev surfaces: tests (`**/__tests__/**`, `*.test.*`, `*.testdata.*`,
`__testutils__`), Storybook stories and `__docs__`, `.storybook/`, `config/`,
`utils/` scripts, changeset entry files (`.changeset/*.md` — but see the changeset
deep-check below).

### Trivial

Prose docs (READMEs, changelogs), `data/questions/**` (frozen parser-regression
fixtures — CI blocks changes to them outright), snapshots.

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