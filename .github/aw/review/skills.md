<!--
Khan/perseus best-practice catalog for the PR-reviewer workflow. Injected at RUNTIME
into the skill-auditor and claim-validator sub-agents of the shared workflow
(Khan/actions/workflows/review/review.md). The auditor has no GitHub API access — it
reads each path below directly from its checked-out workspace, so every path must
exist in the repo. Keep this plain Markdown with no GitHub Actions template
expressions.

A convention not written in one of these files is not auditable: don't flag from
memory or from another Khan repo's conventions. A deviation is blocking only when it
is itself a correctness, security, or breaking-change issue; style deviations are
non-blocking suggestions.
-->

### accessibility - `accessibility-instructions.md`

**Evaluate when:** any change to rendered HTML/JSX markup, ARIA attributes, keyboard
or focus handling, or interactive elements in `packages/*/src/**`. Requires WCAG 2.2
AA; semantic HTML strongly preferred over ARIA (native element → modified native
element → ARIA last resort); never a `role` on a `<div>` when a semantic element
exists; never re-implement keyboard handling native elements already provide.

### development-guide - `CLAUDE.md`

**Evaluate when:** any PR. Repo-wide conventions: the Testing Guidelines section
(AAA structure, widget test-data generators from
`packages/perseus-core/src/utils/generators`, behavior-describing test titles —
"returns/renders/disables/throws", not "should handle") and the commit-message
guidance. `AGENTS.md` is a mirror of this file.

### wonder-blocks - `.claude/skills/wonder-blocks/SKILL.md`

**Evaluate when:** UI changes that use or should use Wonder Blocks components or
design tokens — imports from `@khanacademy/wonder-blocks-*`, hardcoded colors/
spacing/typography where `semanticColor`/`sizing`/`font` tokens exist, or hand-rolled
components WB already provides.

### storybook-conventions - `packages/perseus/CLAUDE.md`

**Evaluate when:** `*.stories.tsx` files change in `packages/perseus`. New stories
belong in `__docs__/` directories; every new widget needs stories for its key visual
states; non-component stories (regression/docs/dev-utility pages) must carry the
`!manifest` tag, and real widget/component stories must not.