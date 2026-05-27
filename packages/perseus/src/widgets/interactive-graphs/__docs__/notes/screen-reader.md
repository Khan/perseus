# Interactive Graph: Screen Reader Improvements (Phase 2 Plan) — v2

---

## Traceability

- **Spike ticket:** [LEMS-3946](https://khanacademy.atlassian.net/browse/LEMS-3946) — closes with this plan as the implementation-side deliverable.
- **Research doc:** [`screen-reader-research.md`](./screen-reader-research.md) — open questions, options considered, decisions and rationale.
- **POC branch:** `catjohnson/lems-3946-prototype` — working reference for the Phase 1 announcer module and the wiring sites in `stateful-mafs-graph.tsx`, `circle.tsx`, and `polygon.tsx`. Not a porting source.
- **Implementation tickets:**
    - [LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943) — WB Announcer integration (Phase 1).
    - [LEMS-4119](https://khanacademy.atlassian.net/browse/LEMS-4119) — Add `role="figure"` to graph (Phase 2).
    - [LEMS-4120](https://khanacademy.atlassian.net/browse/LEMS-4120) — Instructions shortcut and update instructions for commands (Phase 2).
    - [LEMS-4121](https://khanacademy.atlassian.net/browse/LEMS-4121) — Re-order instructions DOM structure (Phase 2).
    - [LEMS-3205](https://khanacademy.atlassian.net/browse/LEMS-3205) — None-type / locked-figure messaging (Phase 2).
    - [LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003) — Keyboard commands conflict with screen readers (Phase 2).
    - [LEMS-4122](https://khanacademy.atlassian.net/browse/LEMS-4122) — Instruction polish for Exponent Graph (Phase 2).
    - [LEMS-4123](https://khanacademy.atlassian.net/browse/LEMS-4123) — Instruction polish for Logarithm Graph (Phase 2).
    - [LEMS-4124](https://khanacademy.atlassian.net/browse/LEMS-4124) — Instruction polish for Vector Graph (Phase 2).
    - [LEMS-4125](https://khanacademy.atlassian.net/browse/LEMS-4125) — Graph descriptions linter rule (Phase 3).
    - [LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995) — `pointLabels` editor feature (Phase 3).
    - [LEMS-3206](https://khanacademy.atlassian.net/browse/LEMS-3206) — Focus trap and Action Bar grouping (Phase 4).
    - [LEMS-2681](https://khanacademy.atlassian.net/browse/LEMS-2681) — Focus jump on Shift + Enter, unlimited polygon (Phase 4).
    - [LEMS-4097](https://khanacademy.atlassian.net/browse/LEMS-4097) — Add Point disable rule + Action Bar polish (Phase 4).
    - [LEMS-2971](https://khanacademy.atlassian.net/browse/LEMS-2971) — reference / umbrella ticket for UXR-derived per-graph copy findings (Phase 5); not an implementation ticket — implementation lives in LEMS-4092–4096.
    - [LEMS-4092](https://khanacademy.atlassian.net/browse/LEMS-4092) — Phase 5: type-aware "moved" announcement for Linear, Segment, Circle.
    - [LEMS-4093](https://khanacademy.atlassian.net/browse/LEMS-4093) — Phase 5: Circle drag handle vs. boundary point distinction.
    - [LEMS-4094](https://khanacademy.atlassian.net/browse/LEMS-4094) — Phase 5: Linear System intersection phrasing.
    - [LEMS-4095](https://khanacademy.atlassian.net/browse/LEMS-4095) — Phase 5: Polygon suppress vertex enumeration on group focus.
    - [LEMS-4096](https://khanacademy.atlassian.net/browse/LEMS-4096) — Phase 5: Sinusoid extremum/midline label re-evaluation (pending design).
- **Related (deferred):** [LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736) (Ctrl + Shift + Arrow conflict — kept-with-warning per OQ2b), [LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949) (mobile SR).
- **Related PRs:**
    - [#3619](https://github.com/Khan/perseus/pull/3619) — Phase 1, Step 1.3.1: Initial Announcer infrastructure (LEMS-3943). Adds `stateAnnouncement` to graph state; wires `announceMessage` call in `stateful-mafs-graph.tsx`.

---

## Document Purpose

This plan turns the decisions in [`screen-reader-research.md`](./screen-reader-research.md) into a phased PR roadmap. **Completing all phases in this plan will bring Interactive Graph from Bronze to Silver accessibility tier** — confirmed with design. Audience: the engineer (or engineers) implementing each phase, plus reviewers and PMs tracking rollout. Read top-to-bottom for the rollout sequence and dependency graph; jump to a phase for its files, steps, tests, flag, and risks; consult `screen-reader-research.md` for the *why* behind any decision (the Decisions Log at the bottom of this plan cross-links back).

---

## Rollout Overview

### High Level Features
- Must have:
    - (Phase 1) Add WB Announcer.
    - (Phase 2) Improve overall graph instructions, add new instruction shortcut command, and `role="figure"`.
    - (Phase 3) Allow custom labeling on points and add linting rules.

- Nice to have:
    - (Phase 2) Improve Locked Figure description (how to traverse)
    - (Phase 4) Focus trap.
    - (Phase 4) Improve Action Bar for Unlimited Graphs
    - (Phase 5) Improved instruction per graph type.

### Phase List

| # | Phase | Tickets | OQs implemented | Depends on |
|---|-------|---------|-----------------|------------|
| 1 | WB Announcer Foundation | LEMS-3943 | OQ3 | — |
| 2 | Graph Instructions and Structure | LEMS-4119, LEMS-4120, LEMS-4121, LEMS-3205, LEMS-4003, LEMS-4122, LEMS-4123, LEMS-4124 | OQ2a, OQ2b, OQ2c, OQ4, OQ6a, OQ6b | — (independent) |
| 3 | Editor and Linter Improvements | LEMS-4125, LEMS-3995 | OQ5 | — (independent) |
| 4 | Trap Focus | LEMS-3206, LEMS-2681, LEMS-4097 | OQ1, OQ7 | Phase 1 |
| 5 | Per Graph Instruction Improvements | LEMS-2971 (ref only), LEMS-4092–4096 | UXR-derived requirements | Phase 1 |

### Dependency Graph

```
        Phase 1 (Announcer foundation)
             │
             ├──► Phase 2 (per-graph instruction polish: LEMS-4122, 4123, 4124 only)
             │
             ├──► Phase 4 (Trap Focus + Action Bar + Add Point disable)
             │
             └──► Phase 5 (Per-graph copy fixes)

        Phase 2 (role, DOM reorder, instruction strings, none-type) — mostly independent (see note above).
        Phase 3 (Editor and Linter) — independent.
```

### Feature Flag Strategy (Summary)

| Phase | Flagged? | Notes |
|-------|----------|-------|
| 1 | No | Additive infrastructure; each paired migration is independently revertible via `git revert`. The announcer module is dormant until at least one event fires. |
| 2 | No | DOM changes, `role="figure"`, instruction string updates, and per-graph instruction polish are all small, independently revertible PRs. No combined user-facing gate needed. |
| 3 | Editor flag only | Schema is backwards-compatible. Editor UI ships behind an editor-side flag while authors are trained. Linter rule is additive and needs no flag. |
| 4 | Yes (single flag: `interactive-graphs-sr-phase-4`) | Focus trap, graph-entered/exited announcements, Action Bar grouping, and the Add Point disable rule are tightly coupled and must roll out together. |
| 5 | No | Each per-graph fix is independently small and ships at its own cadence. |

Detail (names, environments, flip criteria, rollback path) lives in [Cross-Cutting Concerns → Feature Flag Strategy (Detail)](#feature-flag-strategy-detail).

---

## File Map

Cross-phase file map — every file this plan touches at least once, with the phase(s) responsible. Per-phase File subsections drill down with the specific change for each file.

| File | Phase(s) | Touch |
|------|----------|-------|
| `packages/perseus/src/widgets/interactive-graphs/announcer/` *(new module)* | 1 | Create central handler, hooks, tests. |
| `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` | 1 | Swap to `useAnnouncingReducer`. |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | 2, 4 | Phase 2: Add `role="figure"`; reorder sr-only children; none-type/locked-figure copy. Phase 4: focus trap (Shift + Enter / Escape); Insert + I keydown handler; graph-entered/exited announced via Announcer. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/circle.tsx` | 1, 5 | Phase 1 paired migration (radius point); Phase 5 drag-handle vs boundary-point distinction + type-aware "moved" copy. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/polygon.tsx` | 1, 5 | Phase 1 paired migration (limited + unlimited); Phase 5 no vertex enumeration on group focus. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear.tsx` | 1, 5 | Phase 1 paired migration (if applicable); Phase 5 slope/intercept-aware moved copy. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/segment.tsx` | 1, 5 | Phase 1 paired migration (if applicable); Phase 5 endpoint / length copy. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear-system.tsx` | 1 (scoping), 5 | Phase 1 paired migration if source carries an aria-live toggle; Phase 5 intersection phrasing. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/ray.tsx` | 1 (scoping) | Same scoping check as linear-system. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/sinusoid.tsx` | 5 | Extremum / midline / max / min label re-evaluation. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx` | 3 | Read `pointLabels[i]` with per-index fallback. |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` | 4 | Add `lastAddedPointIndex` to point/polygon state. |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` | 4 | Update reducer cases (`ADD_POINT`, `MOVE_POINT`, `REMOVE_POINT`) to maintain `lastAddedPointIndex`. |
| `packages/perseus/src/widgets/interactive-graphs/graph-controls.tsx` *(or per-variant control renderers)* | 4 | Phase 4 wraps in `role="group"` + `aria-label`; disables Add Point button conditionally. |
| `packages/perseus/src/strings.ts` | 1, 2, 3, 4, 5 | New strings each phase. |
| `packages/perseus-core/src/data-schema.ts` | 3 | Optional `pointLabels?: string[]` on `PerseusGraphTypePoint`, `PerseusGraphTypePolygon`. |
| `packages/perseus-editor/src/...point-editor.tsx` *(exact path during impl)* | 3 | Per-point label inputs in the point/polygon editor UI. |
| `packages/perseus-linter/src/rules/interactive-graph-locked-figure-description.ts` *(new)* | 3 | Lint rule: warn when locked figures are present but `fullGraphAriaDescription` is missing or empty. |
| `packages/perseus-editor/src/...interactive-graph-editor.tsx` *(exact path during impl)* | 3 | Add helper text to `fullGraphAriaDescription` field. |
| `packages/perseus/src/widgets/interactive-graphs/__docs__/a11y.mdx` | every phase | Document new behavior, Announcer module, OQ3 routing rule. |
| `packages/perseus/src/widgets/interactive-graphs/__docs__/*.stories.tsx` | every phase | Storybook stories that demonstrate new SR behavior. |
| `packages/perseus/package.json` | 1 | Add `@khanacademy/wonder-blocks-announcer` dependency. |

---

## Phase 1: WB Announcer Foundation

**Tickets:** LEMS-3943
**Implements:** OQ3
**Depends on:** —

### 1.1 Scope

**What ships in this phase:**

- Add optional `stateAnnouncement?: InteractiveGraphStateAnnouncement` to `InteractiveGraphStateCommon` in `types.ts`. This field is how graph reducers signal that an SR announcement is needed — they set it to a typed object carrying raw event data, and the component fires the announcement. The field defaults to `undefined` (no initializer needed in `initialize-graph-state.ts`).
- Add `@khanacademy/wonder-blocks-announcer` as a dependency of `@khanacademy/perseus`.
- In `stateful-mafs-graph.tsx`, add a `useEffect` that watches `state.stateAnnouncement`. When non-null, it builds the localized message string (using `strings` and `locale` from `usePerseusI18n()`) and calls `announceMessage({message})`. String building happens in the component, not the reducer, so reducers stay locale-free.
- Migrate the four currently-aria-live graphs — circle, linear, segment, and the unlimited point/polygon variants — off `aria-live` toggles by having their reducers set `stateAnnouncement` instead. Per-graph copy (e.g., circle resize radius, linear point move, polygon vertex move) ships in the same PR as each migration. Paired-migration constraint from OQ3 still applies: the `stateAnnouncement` set and the `setXxxAriaLive("polite")` removal must land in the same PR.
- Cover the universal events from sr-research.md's OQ3 routing table by adding the corresponding `stateAnnouncement` type variants: `ADD_POINT`, `REMOVE_POINT`, `CLOSE_POLYGON` / `OPEN_POLYGON`, `DELETE_INTENT`, `CHANGE_INTERACTION_MODE`, `MOVE_ALL`, and generic `MOVE_LINE`. New strings and `switch` cases in `stateful-mafs-graph.tsx` are added alongside each type variant as the paired migrations land in steps 1.3.2–1.3.6.

**What this phase does NOT ship:**

- Graph-entered / graph-exited announcements — those depend on the focus trap from Phase 4 and ship there, plugged into the same central handler.
- Insert + I instruction-repeat shortcut — Phase 2.
- DOM reordering, `role="figure"`, instruction-text rewrite — Phase 2.
- Focus trap — Phase 4.

**What this phase enables:**

- Phase 4 adds `stateAnnouncement` type variants for graph-entered / graph-exited events; the focus trap handler sets them in state. No new infrastructure needed — just new type variants, switch cases, and strings.
- Phase 5 adds refined `stateAnnouncement` type variants for UXR-derived copy improvements (e.g., slope/intercept-aware linear copy, circle drag-handle vs. boundary-point distinction). The pattern is established in Phase 1 — Phase 5 just adds new type variants and updated strings.

### 1.2 Files

All paths are relative to the repo root.

**No new files.** This phase adds to existing files only; no new module directory is created.

**Modified files (wiring + paired aria-live migration):**

| File | Change |
|------|--------|
| `packages/perseus/src/widgets/interactive-graphs/types.ts` | Add `InteractiveGraphStateAnnouncement` union type; add optional `stateAnnouncement?: InteractiveGraphStateAnnouncement` to `InteractiveGraphStateCommon`. New type variants are added here alongside each paired migration step. |
| `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` | Import `announceMessage` from `@khanacademy/wonder-blocks-announcer`; add a `useEffect` watching `state.stateAnnouncement`. When non-null, build the localized message (using `strings` / `locale` from `usePerseusI18n()`) and call `announceMessage({message})`. A new `switch` case and string are added here alongside each paired migration step. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/circle.tsx` | In the radius-point reducer case, set `stateAnnouncement` with the raw resize data. Remove the `setRadiusPointAriaLive("polite")` toggle; leave the `"off"` resets in place. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/circle.test.tsx` | Replace the existing "aria-live becomes polite on resize" assertions with `announceMessage`-call assertions. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/polygon.tsx` | In both the limited and unlimited polygon reducer cases, set `stateAnnouncement` on vertex moves. Replace each `setAriaLives([..., "polite", ...])` toggle. Keep the `pointsOffArray` resets. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/polygon.test.tsx` | Replace the four `aria-live` assertion blocks with `announceMessage`-call assertions, one per dispatch path. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear.tsx` *(verify during implementation)* | If it carries an aria-live toggle: set `stateAnnouncement` in the reducer on point moves; remove the toggle. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear.test.tsx` | Replace `expectedAriaLive` assertions with `announceMessage`-call assertions. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/segment.tsx` *(verify during implementation)* | Same pattern as linear. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/segment.test.tsx` | Replace `aria-live` assertions with `announceMessage`-call assertions. |
| `packages/perseus/src/strings.ts` | New strings added alongside each paired migration step, not upfront. |
| `packages/perseus/package.json` | Add `@khanacademy/wonder-blocks-announcer` to `dependencies`. |

**Open scoping question for implementation:**

- `linear-system.test.tsx` and `ray.test.tsx` also assert `aria-live` behavior today. If those graphs' source aria-live toggles are paired migrations within Phase 1's "currently aria-live" set, they belong in this phase's file list; if not, they slot into Phase 5. Decide at the start of Phase 1 implementation by reading each graph's `*.tsx` source for `setXxxAriaLive` callers.

### 1.3 Implementation Steps

Each numbered step is the unit of review — typically one PR. Order is sequential.

#### 1.3.1 Foundation — `stateAnnouncement` field + dormant wiring (PR 1) — **shipped as [#3619](https://github.com/Khan/perseus/pull/3619)**

**Goal:** add `stateAnnouncement` to graph state and wire up the `announceMessage` call in `stateful-mafs-graph.tsx`, with no observable SR-behavior change (all graphs still use their existing aria-live toggles; no reducer sets `stateAnnouncement` to a non-null value yet).

- Add `InteractiveGraphStateAnnouncement` type and optional `stateAnnouncement?: InteractiveGraphStateAnnouncement` to `InteractiveGraphStateCommon` in `types.ts`.
- Add `@khanacademy/wonder-blocks-announcer` to `packages/perseus/package.json` `dependencies`.
- In `stateful-mafs-graph.tsx`, import `announceMessage`; add a `useEffect` watching `state.stateAnnouncement` that returns early if `undefined`, otherwise builds the localized string and calls `announceMessage({message})`.

**Done when:** the existing test suite passes unchanged; no aria-live toggles have been removed; `announceMessage` is never called (since no reducer sets `stateAnnouncement` to a non-`undefined` value in this step).

#### 1.3.2 Universal events — add `stateAnnouncement` types for non-graph-specific events (PR 2)

**Goal:** for every universal event in OQ3's routing table that doesn't depend on Phase 4, update the relevant reducer cases to set `stateAnnouncement`; add the corresponding type variants, `switch` cases in `stateful-mafs-graph.tsx`, and `strings.ts` entries. Graph-entered / graph-exited are deliberately deferred to Phase 4.

Events: `ADD_POINT`, `REMOVE_POINT`, `CLOSE_POLYGON` / `OPEN_POLYGON`, `DELETE_INTENT`, `CHANGE_INTERACTION_MODE`, `MOVE_ALL`, `MOVE_LINE` (generic only).

Files: `types.ts` (new type variants), `reducer/interactive-graph-reducer.ts` (set `stateAnnouncement` in each case), `stateful-mafs-graph.tsx` (new `switch` cases), `strings.ts`.

**Routing-rule canary:** `stateAnnouncement` type variants for these events carry only raw data. Do not pre-compute slope, intercept, angle, or other math-heavy values in the reducer. If building the announcement string requires a math utility, that announcement belongs in a Phase 5 per-graph step.

**Done when:** every universal event causes `announceMessage` to fire; per-graph aria-live toggles still drive math-heavy copy untouched.

#### 1.3.3 Paired migration — Circle radius point (PR 3)

In `circle.tsx`'s reducer, set `stateAnnouncement` with the raw resize data on radius-point moves. Remove the `setRadiusPointAriaLive("polite")` toggle (leave the `"off"` resets). Add the type variant to `types.ts`; add the `switch` case and string to `stateful-mafs-graph.tsx` / `strings.ts`. Update `circle.test.tsx`. SR-matrix verify (no double-announce).

#### 1.3.4 Paired migration — Polygon vertices (PR 4)

Two `setAriaLives` toggle sites in `polygon.tsx` (limited and unlimited code paths). Set `stateAnnouncement` in each reducer case; remove the toggles. Add the corresponding type variants, `switch` cases, and strings. Update `polygon.test.tsx`.

#### 1.3.5 Paired migration — Linear (PR 5)

**Open scoping check at PR start:** confirm `graphs/linear.tsx` actually carries a `setXxxAriaLive` toggle in source. If the toggle is in source, migrate as below. If it lives only in shared-component props or is already off, defer entirely to Phase 5.

Set `stateAnnouncement` in the reducer on point moves; remove the toggle. **Generic message only** — slope/intercept-aware copy is math-heavy and stays per-graph for Phase 5. Add the type variant, `switch` case, and string. Update `linear.test.tsx`.

#### 1.3.6 Paired migration — Segment (and possibly ray, linear-system) (PR 6)

Same open scoping check + same template as 1.3.5 against `graphs/segment.tsx` / `segment.test.tsx`. Apply the same check to `graphs/ray.tsx` and `graphs/linear-system.tsx`.

#### 1.3.7 Verification + Phase 4 plug-in surface (PR 7 or post-PR-6 task)

**Goal:** confirm Phase 1 is stable and Phase 4 has a known plug-in surface for graph-entered / graph-exited.

- Audit: `grep -rn 'setXxxAriaLive("polite")' graphs/`. Every remaining site is either deferred to Phase 5 or out of scope.
- Confirm Phase 4's plug-in surface: Phase 4 adds `stateAnnouncement` type variants for graph-entered / graph-exited events and a `switch` case in `stateful-mafs-graph.tsx`. No new infrastructure needed.
- Update Storybook a11y stories; update `__docs__/a11y.mdx`.

**Done when:** every Phase-1-targeted aria-live toggle is migrated; no direct `aria-live` usage remains for the migrated graphs; Phase 4 has a documented plug-in path.

### 1.4 Tests

**Unit (reducer + state):**

- `interactive-graph-reducer.test.ts` — for each universal event, assert `stateAnnouncement` is set to the expected type variant with correct raw data; assert `stateAnnouncement` is `undefined` on actions that don't produce an announcement.
- `stateful-mafs-graph.test.tsx` — mock `announceMessage`; assert it is called when `stateAnnouncement` transitions from `undefined` to a non-`undefined` value; assert it is not called when `stateAnnouncement` stays `undefined`.

**Integration (per migrated graph component):**

- For each of `circle.test.tsx`, `polygon.test.tsx`, and linear / segment / ray / linear-system files where applicable: replace existing `aria-live` assertions with `announceMessage`-call assertions. Add a regression test per migrated graph asserting the aria-live state is **not** flipped to `"polite"`.

**Manual SR matrix:**

- Per migrated graph, verify on NVDA + Chrome, JAWS + Edge, VoiceOver + Safari that the change reads *once*, not twice.

### 1.5 Rollout / Flag

**No feature flag.** Each paired migration is independently revertible via `git revert`.

**Verification per PR before merge:**

1. `pnpm test` green for the touched packages.
2. Manual SR-matrix pass on the migrated graph.
3. Storybook a11y addon: no new violations on the touched stories.

### 1.6 Risks

- **Doubled announcements** if a paired migration adds the Announcer call but misses the aria-live removal. Mitigation: paired-migration constraint enforced by test.
- **Localization correctness.** New strings carry interpolated values; they need ICU plurals or value formatting where applicable.
- **`stateAnnouncement` object identity.** The `useEffect` fires on reference changes only. Reducers must always produce a new object reference when setting `stateAnnouncement` — never mutate in place. This is the standard Redux/useReducer immutability rule, but worth calling out explicitly.
- **Test flakiness.** WB Announcer mounts a single live region per page; mock the WB module per test file and reset spies in `beforeEach`.
- **Scoping ambiguity for linear / segment / ray / linear-system.** If the source-side aria-live toggle lives in a shared component, the migration may need to touch that shared file — increasing the blast radius.

### 1.7 QE Strategy

Since this implementation is an improvement on existing functionality no QE is needed before release. It would, however, be great to check this as part of a QE pass at the end of the screen reader implementation.

---

## Phase 2: Graph Instructions and Structure

**Tickets:** LEMS-4119, LEMS-4120, LEMS-4121, LEMS-3205, LEMS-4003, LEMS-4122, LEMS-4123, LEMS-4124
**Implements:** OQ2a, OQ2b, OQ2c, OQ4, OQ6a, OQ6b; None-type / locked-figure requirements
**Depends on:** — for most tickets (independent; can ship in parallel with Phase 1). Exception: per-graph instruction polish (LEMS-4122, LEMS-4123, LEMS-4124) depends on Phase 1 — the WB Announcer infrastructure must be in place before auditing and updating per-graph SR strings.

### 2.1 Scope

**What ships in this phase:**

- `role="figure"` on the outer focusable `mafs-graph` View (LEMS-4119; OQ6a primary, OQ6b decision A).
- DOM reorder so the instructions `<View>` is the first sr-only child inside the graph wrapper (LEMS-4121; OQ4).
- Bounded vs. unlimited instruction-string split (LEMS-4120; OQ2a decision B), including the leading mode-toggle warning (OQ2b decision A) and the on-demand-shortcut sentence (OQ2c decision A).
- Insert + I (Windows) / Fn + Enter + I (macOS) keyboard shortcut to repeat the instruction string on demand (LEMS-4120; OQ2c decision A). Platform-detected dual binding.
- Explicit "nothing to move" SR-only label for none-type graphs and locked-figure traversability prefix in the on-entry description (LEMS-3205).
- Instruction-level guidance for keyboard command conflict with screen readers (LEMS-4003); the mode-toggle warning in the instruction text addresses this directly per OQ2b.
- Per-graph instruction polish for Exponent (LEMS-4122), Logarithm (LEMS-4123), and Vector (LEMS-4124) graph types — audit and update all SR strings for overall graph description and interactive element descriptions.

**What this phase does NOT ship:**

- Focus trap (Shift + Enter / Escape) — Phase 4.
- Action Bar grouping — Phase 4.
- Per-question `pointLabels` — Phase 3.
- Add Point disable rule — Phase 4.
- Math-heavy per-graph copy (circle, linear system, polygon, sinusoid) — Phase 5.

### 2.2 Files

| File | Change |
|------|--------|
| `mafs-graph.tsx` | Add `role="figure"` on the outer `<View>`; reorder sr-only children so `instructions` is first; update instruction strings for bounded/unlimited split with mode-toggle warning and repeat hint; branch on graph type for none-type "nothing to move" label and locked-figure traversability prefix. |
| `strings.ts` | Add `srGraphInstructionsBounded`, `srGraphInstructionsUnlimited` (or update existing two strings); `srGraphFocusModeWarning`; `srGraphInstructionsRepeatHint`; `srGraphNothingToMove`; `srGraphLockedFiguresTraversable`. Final wording confirmed with Caitlyn, with Darrell as final sign-off, before merge. |
| `graphs/exponent.tsx` *(or equivalent for exponent graph)* | Audit and update SR strings for overall graph description and interactive element descriptions. |
| `graphs/logarithm.tsx` *(or equivalent for logarithm graph)* | Same audit and update as exponent. |
| `graphs/vector.tsx` *(or equivalent for vector graph)* | Same audit and update as vector. |
| `__docs__/a11y.mdx` | Document the new instruction structure, `role="figure"`, DOM order, none-type treatment, locked-figure prefix, and the Insert + I shortcut. |
| Stories under `__docs__/` | Add or update an a11y story per major flow (instruction display, none-type, locked-figure) with notes on how to verify in NVDA / JAWS / VoiceOver. |

### 2.3 Implementation Steps

#### 2.3.1 Add `role="figure"` on the outer `mafs-graph` View (LEMS-4119)

- Add `role="figure"` to the outer `<View>` in `mafs-graph.tsx`. The element already owns `tabIndex=0`, `aria-label`, and `aria-describedby`; the role just adds semantic scaffolding.
- Verify on NVDA / JAWS / VoiceOver that the figure is announced on entry and that interactive children still announce when focused. If any SR suppresses children, fall back to `role="application"` per OQ6a — see [Cross-Cutting → role="figure" → role="application" Fallback Decision Point](#rolefigure--roleapplication-fallback-decision-point).

**Done when:** `role="figure"` is present on the outer View; no SR suppresses interactive-child announcements.

#### 2.3.2 Reorder DOM children so instructions render first (LEMS-4121; OQ4)

- In `mafs-graph.tsx`, change the order of the sr-only `<View>` children from `description → interactiveElements → instructions` to `instructions → description → interactiveElements`.
- Verify by SR that instructions are read first on graph focus.

**Done when:** DOM order is updated; instructions are the first content a SR user encounters on focus.

#### 2.3.3 Update instruction strings and Insert + I shortcut (LEMS-4120; OQ2a, OQ2b, OQ2c)

- Replace `srGraphInstructions` and `srUnlimitedGraphInstructions` with two new strings that share a leading **mode-toggle warning** sentence ("Set your Screen Reader to Focus mode…") and end with the **instruction-repeat hint** ("Use Insert + I (Windows) or Fn + Enter + I (Mac) to repeat these instructions").
- Bounded variant trims out Action Bar / add-point / close-shape language. Unlimited variant uses the designer's full text.
- Add a keydown handler on the outer View for Insert + I (Windows) / Fn + Enter + I (macOS). The handler is **focus-scoped** — only runs when the graph is focused (WCAG 2.1.4 compliant). Detect the platform (`navigator.platform` or `navigator.userAgentData` with fallback chain).
- On match: call `announce(...)` via WB Announcer with the same instruction string the user heard on entry. (No reducer round-trip needed — use `useGraphAnnouncer` directly.)
- Coordinate final wording with Caitlyn, with Darrell as final sign-off — see [Cross-Cutting → Copy Review Process](#copy-review-process).

**Done when:** bounded and unlimited instruction strings ship with the mode-toggle warning and repeat hint; Insert + I / Fn + Enter + I repeats instructions when the graph is focused; chord is not intercepted when focus is outside the graph.

#### 2.3.4 None-type / locked-figure messaging (LEMS-3205)

- **None-type:** detect `type === "none"` in `mafs-graph.tsx`. Replace (or augment) the description with `srGraphNothingToMove` so SR users hear "This graph is for display only — there is nothing to move" on entry. Verify no interactive elements are still focusable.
- **Locked-figure traversability prefix:** when the graph contains locked figures, prepend `srGraphLockedFiguresTraversable` to the description — e.g., "This graph contains additional figures that can be reached by free exploration with your screen reader." Verify locked figures are still reachable via SR exploration and their existing `role="img"` labels read correctly.
- **Static graph treatment (pending design):** open question whether static graphs get the same "nothing to move" treatment. Implement once design lands.

**Done when:** none-type graphs announce "display only" on entry; locked-figure-bearing graphs announce the traversability prefix; SR-matrix verification passes.

#### 2.3.5 Keyboard conflict guidance (LEMS-4003)

- LEMS-4003 documents that Ctrl + Shift + Arrow is intercepted by JAWS/NVDA in Browse/Virtual Cursor mode. Per OQ2b (decision A), the shortcut is kept and the on-entry instruction text includes the mode-toggle warning sentence.
- This step verifies that the mode-toggle warning copy added in 2.3.3 directly addresses the LEMS-4003 scenario. No additional code change needed beyond what ships in 2.3.3.
- Confirm with the LEMS-4003 acceptance criteria: the instruction text tells SR users how to toggle Focus mode before interacting.

#### 2.3.6 Per-graph instruction polish — Exponent, Logarithm, Vector (LEMS-4122, LEMS-4123, LEMS-4124)

For each graph type:

1. Audit the current SR-only strings: overall graph description, per-point and per-element labels.
2. Verify each string is accurate, concise, and not misleading.
3. Update any strings that are incorrect or could be improved.
4. Copy reviewed with Caitlyn; Darrell signs off on final form before merge.

One PR per graph type is preferred; bundle if trivially the same shape.

### 2.4 Tests

**Per-step jest / RTL tests:**

- `role="figure"` is present on the outer View and survives state changes.
- DOM order: assert the `instructions` `<View>` is the first sr-only child after the new reorder.
- Instruction strings: round-trip through the i18n harness; assert bounded/unlimited branches produce the expected substrings (mode-toggle warning, on-demand hint).
- Insert + I / Fn + Enter + I: simulate each keydown on each platform, assert `announceMessage` is called with the instruction string. Assert the chord is **not** intercepted when focus is outside the graph.
- None-type: assert renders `srGraphNothingToMove` in the sr-only description.
- Locked-figure-bearing graphs: assert the traversability prefix is rendered.
- Per-graph polish: snapshot-style assertions that updated strings are used.

**Axe-core scan:**

- Storybook a11y addon must show no new violations after the role + reorder changes.

### 2.5 Rollout / Flag

**No feature flag.** Each ticket in this phase is a small independently-shippable PR:

- Role + DOM reorder are additive structural changes.
- Instruction string updates are string-only changes.
- None-type / locked-figure copy is additive.
- Per-graph instruction polish is text-only.

Each PR is independently revertible via `git revert` if regressions appear.

**Verification per PR before merge:**

1. `pnpm test` green.
2. Storybook a11y addon: no new violations.
3. Manual SR spot-check for the changed behavior.
4. Copy reviewed with Caitlyn, Darrell final sign-off, before merge (instruction strings).

### 2.6 Risks

- **`role="figure"` may suppress child announcements on some SRs** (documented on focusable widgets in OQ6a). Mitigation: cross-SR test before merging; documented fallback to `role="application"` if needed.
- **i18n copy churn**: the instruction strings are long. Late copy changes could ripple through translation files. Mitigation: complete Caitlyn-led iteration, then get Darrell's final sign-off **before** translation kicks off.
- **"Nothing to move" copy may be misleading** for graph-as-image cases — coordinate with Content team.
- **Platform detection brittleness** for Insert + I vs. Fn + Enter + I — `navigator.platform` is deprecated in some browsers; use `navigator.userAgentData` with fallback chain.

### 2.7 Open Implementation-time Questions

- Final wording of all new strings, especially the mode-toggle warning sentence and whether it names specific SR toggle keys (JAWS: Insert + Z, NVDA: Insert + Space). Owner: Caitlyn, with Darrell as final sign-off.
- Whether on-entry instructions list both Insert + I **and** Fn + Enter + I, or only the platform-relevant one.
- Whether static graphs get the "nothing to move" treatment. Pending design from Caitlyn.
- Exact wording of the locked-figure traversability prefix — Caitlyn & Darrell.
- Final platform-detection signal for Insert + I vs. Fn + Enter + I.

### 2.8 QE Strategy

Regular check-ins with Caitlyn during implementation to fine tune the instructions during development and once completed a simple playtest before release and one QE pass with Darrell at the end of implementation would be ideal.

---

## Phase 3: Editor and Linter Improvements

**Tickets:** LEMS-4125, LEMS-3995
**Implements:** OQ5; locked-figure authoring lint rule
**Depends on:** — (independent; can ship in parallel with other phases)

### 3.1 Scope

**What ships in this phase:**

- Authoring-time `perseus-linter` rule that warns when an interactive-graph widget contains locked figures but has no graph-level description (`fullGraphAriaDescription`) (LEMS-4125). Complements the runtime traversability prefix from Phase 2.
- Optional `pointLabels?: string[]` on `PerseusGraphTypePoint` and `PerseusGraphTypePolygon` in the data schema (LEMS-3995).
- Per-handle SR label renders `pointLabels[i]` if set, otherwise falls back to the existing `srPointAtCoordinates` template — per index, not all-or-nothing.
- Editor UI: per-point label input alongside the coordinate inputs in the point and polygon editors (behind an editor-side flag while authors are trained).

**What this phase does NOT ship:**

- Auto-derivation of labels from the question text (rejected per OQ5 option B).
- A blanket "all labels in the graph come from the question" mode — too brittle.

**Note on the linter rule (LEMS-4125):** it is authoring-side only and independent of all runtime phases — it can ship as its own standalone PR at any time. The `pointLabels` feature (LEMS-3995) is similarly renderer-independent on the display side; only the editor UI piece needs a flag.

### 3.2 Files

| File | Change |
|------|--------|
| `packages/perseus-linter/src/rules/interactive-graph-locked-figure-description.ts` *(new)* | New lint rule: if `lockedFigures` is non-empty and `fullGraphAriaDescription` is missing or empty, emit a warning. |
| `packages/perseus-linter/src/rules/interactive-graph-locked-figure-description.test.ts` *(new)* | Tests for the new lint rule. |
| `packages/perseus-linter/src/rules/all-rules.ts` | Register the new rule. |
| `packages/perseus-core/src/data-schema.ts` | Add `pointLabels?: string[]` to `PerseusGraphTypePoint` and `PerseusGraphTypePolygon`. Update parsers. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx` *(or wherever the per-handle label is computed)* | Read `pointLabels[i]` if present, else the existing fallback. |
| `packages/perseus-editor/src/...point-editor.tsx` *(exact file located during impl)* | Per-point label `<input>` next to coords, behind `perseus-editor-point-labels` flag. |
| `packages/perseus-editor/src/...interactive-graph-editor.tsx` *(exact path during impl)* | Add helper text to `fullGraphAriaDescription` field: "Interactive elements are automatically described for screen reader users. Locked figures are not — use this field to describe them." |
| `packages/perseus/src/strings.ts` | No new SR strings needed for this phase (editor UI uses plain label text). |
| `__docs__/a11y.mdx` | Document the new lint rule, the `pointLabels` field, and authoring guidance. |

### 3.3 Implementation Steps

#### 3.3.1 Linter rule: graph description required when locked figures are present (LEMS-4125)

- Add a new rule under `packages/perseus-linter/src/rules/`. Pattern after existing widget-targeted rules (e.g., `expression-widget-error.ts`).
- Rule checks each interactive-graph widget configuration: if `lockedFigures` is non-empty and `fullGraphAriaDescription` is missing or empty (`undefined`, `null`, or `""`), emit a warning.
- Warning copy (proposed; finalize with Caitlyn, with Darrell as final sign-off): `"This graph has locked figures but no graph description. Add a 'Graph description' so screen reader users can perceive the locked figures."`
- Add helper text to `fullGraphAriaDescription` field in the interactive graph editor: `"Interactive elements are automatically described for screen reader users. Locked figures are not — use this field to describe them."`
- Register the new rule in `packages/perseus-linter/src/rules/all-rules.ts`.

**Done when:** authoring a graph with locked figures but no description surfaces the warning; graphs with a non-empty description produce no warning; graphs without locked figures are unaffected.

#### 3.3.2 Schema addition for `pointLabels` (LEMS-3995)

- Add `pointLabels?: string[]` to both types in `data-schema.ts`.
- Update `parsePerseusGraphTypePoint` / `parsePerseusGraphTypePolygon` to accept the new field (optional, so the parser change is small).
- Round-trip tests: existing fixtures still parse; new fixtures with `pointLabels` parse correctly; invalid types reject.

#### 3.3.3 Per-handle fallback (LEMS-3995)

- In the per-handle label computation site, if `pointLabels?.[i]` is a non-empty string, use it as the point name; otherwise fall back to the existing `srPointAtCoordinates` template with the numeric index. Per-index, not all-or-nothing.
- Tests: full array, partial array, empty array, undefined — each produces sensible output for every index.

#### 3.3.4 Editor UI (LEMS-3995, behind flag)

- Add a small text input per point in the point/polygon editor, labeled "Screen reader label (optional)".
- Persist into the `pointLabels` array, growing/shrinking it to match the coords array.
- Ship behind `perseus-editor-point-labels` flag while authors are trained.

### 3.4 Tests

- Linter rule tests: graph with locked figures and a non-empty `fullGraphAriaDescription` produces no warning; missing or empty `fullGraphAriaDescription` (`undefined`, `null`, `""`) with locked figures present produces the expected warning; graph with no locked figures produces no warning regardless of description.
- Schema parse round-trip tests: existing fixtures unchanged, new fixtures pass, invalid inputs reject.
- Per-handle label tests for: undefined `pointLabels`, empty array, partial array, full array, array with empty-string entries.
- Editor integration tests: typing in the new input persists to the JSON; clearing reverts to the fallback label.

### 3.5 Rollout / Flag

- **Linter rule:** no flag needed. Additive authoring-side warning.
- **Schema additions:** backwards-compatible — no flag needed for the renderer side. Existing content with no `pointLabels` keeps the current "Point N" labels.
- **Editor UI:** ships behind `perseus-editor-point-labels` while authors are trained.

### 3.6 Risks

- **Authoring burden** if the field becomes implicitly required by content reviewers — keep it optional in spirit, not just in schema.
- **Partial-array fallback correctness** — a partial array must fall back per-index, not collapse to "all or nothing".
- **Localization** — `pointLabels` are author-supplied plain text; they're the author's responsibility to localize. Document this clearly in the editor UI helper text.
- **Linter warning copy churn** — coordinate with Caitlyn and Darrell on final wording before landing.

### 3.7 Open Implementation-time Questions

- Exact wording of the linter warning and `fullGraphAriaDescription` helper text — Caitlyn, with Darrell as final sign-off.
- Optional lint rule to nudge authors toward setting `pointLabels` when prose names points (e.g., "Point T") — decide during implementation whether the heuristic is reliable enough to ship.

### 3.8 QE Strategy

Since this implementation is an improvement on existing functionality no QE is needed before release. It would, however, be beneficial to run a playtest on the feature flag piece and run a QE pass at the end of the screen reader implementation.

---

## Phase 4: Trap Focus

**Tickets:** LEMS-3206, LEMS-2681, LEMS-4097
**Implements:** OQ1, OQ7
**Depends on:** Phase 1 (uses WB Announcer for graph-entered / graph-exited messages)

### 4.1 Scope

**What ships in this phase:**

- Focus trap: Shift + Enter enters all graphs (today only unlimited variants), Escape exits (LEMS-3206; OQ1 decision A). Graph-entered / graph-exited spoken via WB Announcer.
- Action Bar grouping: wrap action buttons in `role="group"` + `aria-label="Action Bar"` (LEMS-3206).
- LEMS-2681: after Shift + Enter on an unlimited polygon, focus moves to the Add Point button (today it stays on the graph outline).
- `lastAddedPointIndex` tracking in unlimited point/polygon reducer state (LEMS-4097; OQ7).
- Disable the Add Point button when the most-recently-added point is still at the origin `(0, 0)`. Update `aria-disabled` and the button label so SR users understand why the button is disabled.

**What this phase does NOT ship:**

- Insert + I instruction-repeat shortcut — Phase 2.
- Per-question `pointLabels` — Phase 3.
- Per-graph copy fixes — Phase 5.
- Removing Ctrl + Shift + Arrow (LEMS-2736) — deferred per OQ2b.

### 4.2 Files

| File | Change |
|------|--------|
| `mafs-graph.tsx` | Add focus handler for Shift + Enter (enter) and Escape (exit), wired to dispatch into the central announcer; returns focus to the previously-focused element outside the graph on Escape. |
| `reducer/interactive-graph-action.ts` and `reducer/interactive-graph-reducer.ts` *(if action-based routing chosen at 1.3.7)* | New action types `GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED`; reducer cases that update interaction mode and (for unlimited polygon) flag the LEMS-2681 focus jump. |
| `announcer/central-announcer.ts` | Add cases for `GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED` if the action-routed path is chosen; otherwise `mafs-graph.tsx` calls `announce(...)` directly via `useGraphAnnouncer`. |
| `graph-controls.tsx` *(or per-variant control renderers)* | Wrap controls in `<View role="group" aria-label={strings.srActionBar}>`. Read `lastAddedPointIndex`; if non-null and `coords[lastAddedPointIndex] === [0, 0]`, set `disabled` and `aria-disabled` on the Add Point button; add `aria-describedby` pointing at a hidden `srAddPointDisabledHint` element. |
| `reducer/interactive-graph-state.ts` | Add `lastAddedPointIndex: number \| null` to unlimited point/polygon state shapes. |
| `reducer/interactive-graph-reducer.ts` | Update `ADD_POINT`, `MOVE_POINT`, `REMOVE_POINT` to maintain `lastAddedPointIndex`. |
| `unlimited-polygon` rendering path *(exact file during impl)* | After Shift + Enter, programmatically focus the Add Point button. |
| `strings.ts` | Add `srGraphEntered`, `srGraphExited`, `srActionBar`, `srAddPointDisabledHint`. Final wording confirmed with Caitlyn, with Darrell as final sign-off. |
| `__docs__/a11y.mdx` | Document the focus-trap, the Action Bar grouping, the Add Point disable rule, and LEMS-2681 fix. |

### 4.3 Implementation Steps

Phase 4 ships as one feature-flagged PR stack (or a tightly-coordinated stack) because the user-facing pieces are interlocking. Flag name: `interactive-graphs-sr-phase-4`.

#### 4.3.1 Focus trap: Shift + Enter enters; Escape exits (LEMS-3206)

- Today, only unlimited graphs change `interactionMode` on Shift + Enter. Generalize: Shift + Enter enters all graphs, Escape exits.
- Wire the focus-entry handler to dispatch (or call `announce(...)` directly via `useGraphAnnouncer`) so the WB Announcer says "Graph entered".
- On Escape, dispatch the corresponding exit action and announce "Graph exited"; return focus to the previously-focused element outside the graph (use `useLatestRef` to capture the entry-time activeElement).
- Decide at PR start whether to route via reducer action (`GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED`) or call `announce` directly — both surfaces are open per 1.3.7.

#### 4.3.2 Action Bar grouping (LEMS-3206)

- In `renderPointGraphControls` / `renderPolygonGraphControls`, wrap the action buttons in `<View role="group" aria-label={strings.srActionBar}>`.
- Add the `srActionBar` string ("Action Bar").
- This step does **not** yet ship the Add Point disable rule — that's 4.3.4.

#### 4.3.3 LEMS-2681: focus to Add Point on Shift + Enter for unlimited polygon

- After Shift + Enter mode change on an unlimited polygon, programmatically focus the Add Point button. Use a ref captured during render.
- Verify on the SR matrix that the focus jump isn't double-announced.

#### 4.3.4 State shape: `lastAddedPointIndex` (LEMS-4097)

- Extend unlimited point and polygon `InteractiveGraphState` with `lastAddedPointIndex: number | null` (initial value `null`).
- Update `initializeGraphState` for these types.

#### 4.3.5 Reducer cases (LEMS-4097)

- `ADD_POINT` — set `lastAddedPointIndex` to `coords.length - 1` after the append.
- `MOVE_POINT` — if `action.index === lastAddedPointIndex` and the new coords are not `[0, 0]`, clear to `null`.
- `REMOVE_POINT` — if `action.index === lastAddedPointIndex`, clear to `null`. Otherwise, decrement `lastAddedPointIndex` if removed index is below it.
- Document the invariant: `lastAddedPointIndex === null` ⟺ no recently-added point sitting at the origin.

#### 4.3.6 Button gating (LEMS-4097)

- In the point and polygon control renderers, compute `disabled = lastAddedPointIndex !== null && coordsEqual(coords[lastAddedPointIndex], [0, 0])`.
- Wire `disabled` and `aria-disabled` to the Add Point button. Add an `aria-describedby` pointing at a hidden `srAddPointDisabledHint` element so SR users hear the reason.
- Decide during implementation whether to also `announce(strings.srAddPointDisabledHint)` when the user attempts to click a disabled button. Default: don't — the disabled-state announcement on focus is sufficient.

### 4.4 Tests

**Focus trap:**

- Simulate Shift + Enter, assert focus moves into the graph and `announceMessage` is called with the entered-string.
- Simulate Escape, assert focus returns to the previous element and `announceMessage` is called with the exited-string.
- Assert focus-trap behavior applies to all graph types (not just unlimited).

**Action Bar:**

- Assert `role="group"` and `aria-label` on the wrapper.

**LEMS-2681:**

- Simulate Shift + Enter on an unlimited polygon, assert `document.activeElement` is the Add Point button.

**Add Point disable rule:**

- Reducer tests: `ADD_POINT` sets the index; `MOVE_POINT` off origin clears it; `MOVE_POINT` to origin keeps it; `REMOVE_POINT` clears appropriately.
- Component test: Add Point button is `disabled` and `aria-disabled` when conditions are met; enabled otherwise.

**Manual SR matrix:**

- Full pass per SR before flipping the flag.

### 4.5 Rollout / Flag

**Single feature flag:** `interactive-graphs-sr-phase-4` (default off).

- Flip per environment: dev (immediate) → staging (1 week soak) → 5% prod (1 week) → 100%.
- Flip criteria: (1) full SR-matrix pass; (2) no axe-core regressions; (3) Darrell sign-off on entry/exit experience and Action Bar label; (4) no Sentry spikes attributable to the new keyboard handlers.
- **Rollback:** flag off. Phases 1–3 changes are unflagged and remain in effect.

### 4.6 Risks

- **Focus trap regressions** for users with muscle memory of "Tab away to exit". Mitigation: instruction text (Phase 2) covers Escape explicitly.
- **LEMS-2681 focus jump may confuse SR users** — moving focus programmatically can produce a double announcement. Mitigation: SR-matrix verify; tune the announcement order if needed.
- **`role="figure"` fallback interaction** — if Phase 2 fell back to `role="application"`, the focus-trap behavior in Phase 4 has a different interaction model. Mitigation: Phase 4 implementation lead checks Phase 2's role decision before starting.
- **Origin as a legitimate answer location.** If a question expects a point at `(0, 0)`, the rule only blocks adding a *second* point while the first is at origin — once moved, the user can add the second back at origin. Document this in editor authoring docs.
- **Reset semantics on undo / remove** — if the user removes the tracked point, `lastAddedPointIndex` must reset; if undo is added later, the tracking needs to participate.

### 4.7 Open Implementation-time Questions

- Whether `GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED` are reducer actions or direct `useGraphAnnouncer` calls (1.3.7's plug-in surface — defer the call until Phase 4 implementation begins).
- Final wording of `srGraphEntered`, `srGraphExited`, `srActionBar`, `srAddPointDisabledHint` — Caitlyn, with Darrell as final sign-off.
- Whether to announce the disabled-button hint on click attempt, or rely on the focus-time announcement.

### 4.8 QE Strategy

Regular check-ins with Caitlyn during implementation to fine tune the interactions during development, a simple playtest before release, and one QE pass with Darrell at the end of implementation.

---

## Phase 5: Per Graph Instruction Improvements

**Tickets:** LEMS-2971 (reference only), LEMS-4092, LEMS-4093, LEMS-4094, LEMS-4095, LEMS-4096
**Implements:** UXR-derived requirements
**Depends on:** Phase 1 (uses WB Announcer for "moved" messages); coordinates with Phase 3 for the "Point T" fix on point/polygon

### 5.1 Scope

Per-graph instruction improvements broken out by graph type, each independently shippable as a small PR. LEMS-2971 is a reference ticket only — it tracks the overall UXR finding but is not itself implemented; the implementation tickets are LEMS-4092–4096. Each subsection below is one PR (or a small stack within a PR if related fixes share files).

These are the items called out in research as "math-heavy or graph-specific" — i.e., they belong in `useGraphAnnouncer` per OQ3's routing rule, not in the central handler.

### 5.2 Linear / Segment / Circle — "moved" Announcement (LEMS-4092)

**Problem:** today these announce only the *current* state, not that the element moved. UXR feedback.

**Fix:** in each of `linear.tsx`, `segment.tsx`, `circle.tsx`, replace the generic Phase-1 "moved" string with type-aware copy via `useGraphAnnouncer`:

- Linear: include slope/intercept — `"Line moved. Slope is now 2; y-intercept at (0, 3)."`
- Segment: include endpoints and length — `"Segment moved. From (1, 2) to (4, 6); length 5."`
- Circle: distinguish radius point vs. center — `"Center moved to (3, 4)."` vs. `"Radius is now 5."`

Per-graph reuses `getSlopeStringForLine`, `getInterceptStringForLine`, `vec.dist`. Stays out of `central-announcer.ts` per the routing-rule canary.

### 5.3 Circle — Drag Handle vs. Boundary Point Distinction (LEMS-4093)

**Problem:** circle currently presents the non-interactive boundary points as if they were interactive. Confuses SR users.

**Fix:** in `circle.tsx`, mark non-interactive boundary visualizations with `role="presentation"` (or simply omit them from the SR tree); confine `role="button"` and the focusable handle to the actual drag handle (radius point + center).

### 5.4 Linear System — Intersection Phrasing (LEMS-4094)

**Problem:** "intersection point" overloads "point" — collides with the interactive movable points.

**Fix:** in `linear-system.tsx`, rephrase the intersection description to use unambiguous wording (e.g., "lines intersect at (x, y)" or "intersection location: (x, y)") that doesn't conflate with movable-point terminology.

### 5.5 Polygon — No Vertex Enumeration on Group Focus (LEMS-4095)

**Problem:** when the whole-polygon group is focused, every vertex is enumerated, which is verbose and not what the user wanted.

**Fix:** in `polygon.tsx`, when the group itself receives focus (vs. an individual vertex), produce a confirmation-only label (e.g., "Polygon, 5 vertices") rather than reading every coordinate. Per-vertex labels still apply on individual focus.

### 5.6 Sinusoid — Extremum / Midline / Max / Min Label Re-evaluation (LEMS-4096)

**Problem:** sighted users don't see "extremum" / "midline" labels, but SR users do — UXR flagged the inconsistency.

**Fix (pending design):** decide whether to expose these labels for SR or hide them. In `sinusoid.tsx`, conditionally include the labels based on the design decision. **Coordinate with Caitlyn before implementing.**

### 5.7 Tests

- Per-graph component test: assert `announceMessage` is called with the type-aware string after the relevant action.
- jest assertions for each new copy variant.
- Non-interactive boundary points in circle are hidden from the SR tree (LEMS-4093).
- Polygon group focus produces the summary label, not vertex enumeration; individual vertex focus still announces full coordinate label (LEMS-4095).
- Linear system uses updated intersection phrasing (LEMS-4094).
- SR-matrix manual verification — per-graph, not the full matrix every PR.

### 5.8 Rollout / Flag

Each fix is an independent small PR; **no shared flag.** Each PR is reviewable and revertible on its own.

### 5.9 Risks

- **Copy churn during design review** — each PR may go through 1–2 rounds of copy iteration; build slack into the timeline.
- **Re-running QA per graph type** — lead with Caitlyn-led iteration, with Darrell as final sign-off, and bundle his sign-off across the umbrella to be efficient with his time.
- **Math-utility growth** in `useGraphAnnouncer` callers — keep the routing-rule canary in mind: utility functions belong in `screenreader-text.ts` or a per-graph helper, not in the announcer module.
- **Sinusoid design dependency** — LEMS-4096 cannot be implemented until Caitlyn makes the expose-vs-suppress decision. Do not begin implementation until design decision lands.

### 5.10 QE Strategy

Since this implementation is an improvement on existing functionality no QE is needed before release. It would, however, be great to check this as part of a QE pass at the end of the screen reader implementation.

---

## Cross-Cutting Concerns

### Feature Flag Strategy (Detail)

| Flag (proposed) | Phase(s) | Default | Flip criteria | Rollback |
|-----------------|----------|---------|---------------|----------|
| `interactive-graphs-sr-phase-4` | 4 | off | (1) Full SR matrix pass; (2) no axe-core regressions; (3) Darrell sign-off on copy and entry/exit experience; (4) no Sentry spikes from new keyboard handlers. | Flag off. Phases 1–3 changes are unflagged and remain in effect. |
| `perseus-editor-point-labels` | 3 (editor side only) | off | (1) Editor integration tests pass; (2) authoring team trained on when to use the field. | Flag off; authors revert to default labels. |

Final flag names confirmed with platform team during Phase 4 implementation. Cadence per environment: dev (immediate) → staging (1 week soak) → 5% prod (1 week) → 25% (1 week) → 100%.

### SR Test Matrix

Every phase that touches user-facing SR behavior runs against this matrix before its flag flips (or before merge, for unflagged phases):

| SR | Browser | OS |
|----|---------|----|
| NVDA | Chrome | Windows |
| NVDA | Firefox | Windows |
| JAWS | Chrome | Windows |
| JAWS | Edge | Windows |
| VoiceOver | Safari | macOS |

**"Verified" =** golden path *and* edge cases per phase, plus any UXR-flagged pain points; confirmed by Darrell or designated tester. A run produces a short writeup (Storybook URL + SR + verdict + any divergences) attached to the PR.

Mobile SR (TalkBack on Android, VoiceOver on iOS) is **out of scope** per the deferred section — tracked under [LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949).

### Copy Review Process

To be efficient with Darrell's time — he is a shared SR-testing resource across the org — copy iterates first with Caitlyn (designer), and Darrell is engaged for **final sign-off**, not for round-by-round wordsmithing.

- **Caitlyn (designer)** — leads. Owns initial copy drafts, iterates on tone and clarity, runs internal review with the implementation team. Most rounds happen here.
- **Darrell (SR tester)** — signs off. Engaged once per phase (or once per umbrella batch in Phase 5) on final-form copy against the integrated implementation, not per draft.
- **Cadence per phase:**
    1. Implementation team drafts initial copy from `screen-reader-research.md` and the designer's spec.
    2. Caitlyn reviews and iterates with the team until the copy reads well and matches design intent.
    3. Darrell does a single SR-pass review of the final-form copy against the implementation on the test-everything page (with the relevant feature flag on).
    4. Address any blockers from Darrell, then merge.
- **Artifacts shared with Darrell at sign-off:** test-everything page link with the relevant feature flag turned on + a short screen capture of an SR pass + the proposed string text in plain English.
- **Decision authority:** Caitlyn owns design intent and visual / sighted-user copy; Darrell signs off on whether the final copy works for SR users; product owns whether the authoring story is realistic.
- **Phase 4 specifically:** largest copy surface (focus trap entry/exit + Action Bar label + Add Point disabled hint). Put Darrell's sign-off slot on the calendar early so it isn't a blocker at merge time — but do not engage him until Caitlyn has signed off.

### aria-live ↔ Announcer Paired Migration Constraint

Restated from sr-research.md OQ3, with reviewer-checklist form for Phase 1 PRs (and any later phase that introduces new Announcer call sites alongside legacy aria-live):

> **Every PR that adds an `announce(...)` call for a previously-aria-live event must, in the same change:**
>
> 1. Add the `announce(...)` (centrally or per-graph, per the OQ3 routing split).
> 2. Stop the corresponding `setXxxAriaLive("polite")` toggle that previously triggered the SR re-read.
> 3. Update tests that pinned the old aria-live behavior so they assert the new Announcer behavior instead.

A reviewer who sees a new `announce(...)` call without a matching aria-live removal should treat it as a blocker — that's the invariant Phase 1 establishes.

### Localization

- **String location:** new strings go in `packages/perseus/src/strings.ts`. The corresponding TypeScript `PerseusStrings` type updates in lockstep.
- **Interpolation:** all numeric values flow through `srFormatNumber` (which handles π-multiples, locale-aware decimals, and the math-character labeling table from SRUX).
- **ICU plurals:** any string with variable cardinality (e.g., "5 vertices" vs. "1 vertex") uses ICU plural form, not English-pluralization-by-string-concat.
- **RTL:** new instructions are long; verify rendering in at least one RTL locale (Arabic) for word-order issues. Embedded code-style tokens (e.g., "Insert + I", "Shift + Enter") stay LTR even in RTL contexts.
- **Author-supplied strings** (`pointLabels` from Phase 3) are the author's responsibility to localize, same as `fullGraphAriaLabel` today. Document this in the editor UI helper text.

### `role="figure"` → `role="application"` Fallback Decision Point

This is the single in-flight decision Phase 2 owns and may need to flip during implementation.

- **Owner:** Phase 2 implementation lead.
- **Trigger:** SR-matrix testing of `role="figure"` shows that any of NVDA / JAWS / VoiceOver suppresses announcements of the interactive children when focus enters the graph.
- **Action:** change the role on the outer `mafs-graph` View from `role="figure"` to `role="application"`. Update the corresponding Phase 2 tests. Update the Decisions Log in this plan and the OQ6a entry in `screen-reader-research.md`.
- **Side effect of flipping:** `role="application"` also nudges SRs into Forms / Focus mode, which connects to OQ2b — the mode-toggle warning in the instruction text becomes less load-bearing (but still useful for users who are already in Browse mode when they encounter the graph).
- **⚠️ Implementation cost — read before flipping.** `role="application"` is much more than a label change. It tells assistive technology to stop intercepting browser-level events and to treat the entire region as a custom widget, which means the SR stops providing the built-in HTML accessibility behaviors we currently rely on. Falling back to `role="application"` therefore obligates us to **re-invent those affordances ourselves** — manually announcing focus changes, manually exposing structural navigation, and manually reproducing any role-driven behavior that today comes free from the platform. Treat the fallback as a non-trivial commitment, not a flag flip. Detail in `screen-reader-research.md` OQ6a.

### Documentation Updates

- `__docs__/a11y.mdx` for `interactive-graphs/` — updated each phase to describe new behavior, the Announcer module, the OQ3 routing rule, the focus trap, and the on-demand instruction shortcut.
- Storybook a11y stories — add or update one per migrated graph and one per Phase 4 flow (entry, repeat, exit). Each story includes a "How to verify in NVDA / JAWS / VoiceOver" comment.
- Cross-link from this plan back to the ticket descriptions as PRs land.
- `CLAUDE.md`: if any new file convention emerges (e.g., the `announcer/` module's pure-handler pattern is worth documenting for future widget work), add a short note under "Common Development Patterns".

---

## Deferred / Out of Scope

Restated from `screen-reader-research.md` for plan readers — the spike doc is authoritative.

- **Mobile screen reader support** ([LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949)) — VoiceOver / TalkBack on touch needs a separate spike (gesture conflicts).
- **Locked-figure focus order** (Phase 1 quality note) — separate spike; touches the locked-figures system more broadly.
- **Content-side fixes** — re-authoring questions whose meaning depends on inaccessible background images. Content team owns.
- **Removing Ctrl + Shift + Arrow** ([LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736)) — deferred per OQ2b decision A. Revisit as a separate effort if production SR feedback shows the friction is materially worse than expected.
- **Graph-type-specific copy review beyond the items in Phase 5** — sinusoid extremum, segment slope direction, polygon translation announcement nuance. Each needs design + content sign-off; tracked under LEMS-2971 (reference ticket).

---

## Open Implementation-time Questions

Aggregated from per-phase subsections — living list, not a roadblock to starting Phase 1.

- **Phase 1 (1.2):** Do `linear-system.tsx` and `ray.tsx` carry source-side aria-live toggles, or only test-side assertions? Decides whether they're paired-migration targets in Phase 1 or copy fixes in Phase 5.
- **Phase 1 (1.3.7):** Do graph-entered / graph-exited announcements route through reducer actions or directly via `useGraphAnnouncer` from the focus handler? Phase 4 picks at the start of implementation.
- **Phase 2 (2.7):** Final wording of all new strings, especially the mode-toggle warning sentence and whether it names specific SR toggle keys (JAWS Insert + Z, NVDA Insert + Space). Owner: Caitlyn & Darrell.
- **Phase 2 (2.7):** Whether on-entry instructions list both Insert + I and Fn + Enter + I, or only the platform-relevant one.
- **Phase 2 (2.7):** Whether static graphs get the "nothing to move" treatment. Pending design.
- **Phase 2 (2.7):** Final platform-detection signal for the Insert + I vs. Fn + Enter + I dual binding.
- **Phase 4 (4.7):** Whether to additionally announce the disabled-button hint on click attempt, or rely on the focus-time announcement.
- **Phase 5 (5.6):** Whether to expose sinusoid extremum / midline / max / min labels for SR users at all. Pending design from Caitlyn.
- **Cross-cutting:** Final feature-flag names confirmed with platform team during Phase 4.

---

## Decisions Log

Mirror of `screen-reader-research.md` "Decisions Recorded" — one-line restatements so a reader of this plan can see the resolved decisions inline. Each entry links back to the corresponding OQ in the research doc for full rationale.

- **OQ1 → A.** Focus trap on all graphs (bounded + unlimited).
- **OQ2a → B.** Two instruction strings (bounded vs. unlimited).
- **OQ2b → A.** Keep Ctrl + Shift + Arrow; on-entry mode-toggle warning in the instruction text.
- **OQ2c → A.** Insert + I (Windows) / Fn + Enter + I (macOS), platform-detected dual binding.
- **OQ3 → C.** Hybrid Announcer (central pure-function handler + `useGraphAnnouncer` per-graph escape hatch).
- **OQ4 → A.** Reorder DOM so instructions render first.
- **OQ5 → A.** Optional `pointLabels?: string[]` schema field with per-index fallback to "Point N".
- **OQ6a → A** primary (`role="figure"`), **B** fallback (`role="application"`) if cross-SR testing flags issues. See [Cross-Cutting → role="figure" → role="application" Fallback Decision Point](#rolefigure--roleapplication-fallback-decision-point).
- **OQ6b → A.** Apply the role to the outer focusable `mafs-graph` View.
- **OQ7 → B.** Disable Add Point only when the most-recently-added point is still at `(0, 0)`.

**Implementation dependency:** OQ2b and OQ2c both depend on the on-entry instructions including the Virtual Cursor / Browse mode toggle warning. Phase 2 implements that warning sentence once and verifies both shortcuts in the same QA pass.

---

## Next Actions

Concrete pre-implementation steps. Distinct from "Out of Scope" — these are inside-scope but not yet started.

- **Schedule Caitlyn (copy lead) and Darrell (final sign-off) cadence** — get both plugged in before Phase 2 string work starts; Phase 4 has the largest copy surface but Phase 2 strings need review too.
- **Update implementation tickets** (LEMS-4119, LEMS-4120, LEMS-4121, LEMS-3205, LEMS-4003, LEMS-4122, LEMS-4123, LEMS-4124, LEMS-4125, LEMS-3995, LEMS-3206, LEMS-2681, LEMS-4097) with links to this plan and to their respective phase sections.
- **Walk this plan through with the team** — lead engineer, designer (Caitlyn), accessibility reviewer (Darrell), PM. Capture any redirections back into the relevant section before kickoff.
- **Confirm Phase 1 scoping question** — read `linear-system.tsx` and `ray.tsx` source for `setXxxAriaLive` callers before starting Phase 1 PR 1, to finalize which graphs are paired-migration targets.
