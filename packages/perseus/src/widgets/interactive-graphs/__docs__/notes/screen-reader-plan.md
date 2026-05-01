# Interactive Graph: Screen Reader Improvements (Phase 2 Plan)

---

## Traceability

- **Spike ticket:** [LEMS-3946](https://khanacademy.atlassian.net/browse/LEMS-3946) — closes with this plan as the implementation-side deliverable.
- **Research doc:** [`screen-reader-research.md`](./screen-reader-research.md) — open questions, options considered, decisions and rationale.
- **POC branch:** `catjohnson/lems-3946-prototype` — working reference for the Phase 1 announcer module and the wiring sites in `stateful-mafs-graph.tsx`, `circle.tsx`, and `polygon.tsx`. Not a porting source.
- **Implementation tickets:**
    - [LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943) — WB Announcer integration (Phase 1).
    - [LEMS-3206](https://khanacademy.atlassian.net/browse/LEMS-3206) — instruction-handling rework (Phase 2).
    - [LEMS-3205](https://khanacademy.atlassian.net/browse/LEMS-3205) — none-type / locked-figure messaging (Phase 3).
    - [LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995) — `pointLabels` (Phase 4; new ticket likely needed for the editor UI portion).
    - [LEMS-2681](https://khanacademy.atlassian.net/browse/LEMS-2681) — focus jump on Shift + Enter, unlimited polygon (Phase 2).
    - [LEMS-2971](https://khanacademy.atlassian.net/browse/LEMS-2971) — UXR-derived per-graph copy umbrella (Phase 6).
    - **New tickets to file:** Phase 5 Add Point disable rule; Phase 6 per-graph children under LEMS-2971.
- **Related (deferred):** [LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003), [LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736) (Ctrl + Shift + Arrow conflict — kept-with-warning per OQ2b), [LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949) (mobile SR).
- **Related PRs:** *(filled as they land — link each PR by phase/ticket)*

---

## Document Purpose

This plan turns the decisions in [`screen-reader-research.md`](./screen-reader-research.md) into a phased PR roadmap. Audience: the engineer (or engineers) implementing each phase, plus reviewers and PMs tracking rollout. Read top-to-bottom for the rollout sequence and dependency graph; jump to a phase for its files, steps, tests, flag, and risks; consult `screen-reader-research.md` for the *why* behind any decision (the Decisions Log at the bottom of this plan cross-links back).

---

## Rollout Overview

### Phase List

| # | Phase | Tickets | OQs implemented | Depends on |
|---|-------|---------|-----------------|------------|
| 1 | WB Announcer Foundation | LEMS-3943 | OQ3 | — |
| 2 | Focus, Entry, Instructions | LEMS-3206, LEMS-2681 | OQ1, OQ2a, OQ2b, OQ2c, OQ4, OQ6a, OQ6b | Phase 1 |
| 3 | None-type / Static / Locked Figure Messaging | LEMS-3205 | None-type / locked-figure requirements | Phase 2 |
| 4 | Per-Question Authoring (`pointLabels`) | LEMS-3995 + new editor ticket | OQ5 | — (parallel to 1–3) |
| 5 | Add Point Disable Rule + Action Bar Polish | New ticket | OQ7 | Phase 2 |
| 6 | Per-Graph Copy Fixes | LEMS-2971 + per-graph children | UXR-derived requirements | Phase 1 |

### Dependency Graph

```
        Phase 1 (Announcer foundation)
             │
             ├──► Phase 2 (Focus + Instructions + role)
             │         │
             │         ├──► Phase 3 (None-type / locked figures)
             │         └──► Phase 5 (Add Point disable)
             │
             └──► Phase 6 (Per-graph copy fixes)

        Phase 4 (pointLabels) — independent; can ship in parallel.
```

### Feature Flag Strategy (Summary)

| Phase | Flagged? | Notes |
|-------|----------|-------|
| 1 | No | Additive infrastructure; each paired migration is independently revertible via `git revert`. The announcer module is dormant until at least one event fires. |
| 2 | Yes (single flag) | Instructions, focus trap, `role="figure"`, Insert + I shortcut, and Action Bar grouping are tightly coupled and must roll out together. |
| 3 | Under Phase 2's flag | Description-text changes are conceptually part of the same entry-experience rework. |
| 4 | Editor flag only | Schema is backwards-compatible. Editor UI ships behind an editor-side flag while authors are trained. |
| 5 | Under Phase 2's flag | Action Bar grouping ships in Phase 2; the disable rule is the layer on top. |
| 6 | No | Each per-graph fix is independently small and ships at its own cadence. |

Detail (names, environments, flip criteria, rollback path) lives in [Cross-Cutting Concerns → Feature Flag Strategy (Detail)](#feature-flag-strategy-detail).

---

## File Map

Cross-phase file map — every file this plan touches at least once, with the phase(s) responsible. Per-phase File subsections drill down with the specific change for each file.

| File | Phase(s) | Touch |
|------|----------|-------|
| `packages/perseus/src/widgets/interactive-graphs/announcer/` *(new module)* | 1 | Create central handler, hooks, tests. |
| `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` | 1 | Swap to `useAnnouncingReducer`. |
| `packages/perseus/src/widgets/interactive-graphs/mafs-graph.tsx` | 2 | Add `role="figure"`; reorder sr-only children; focus trap (Shift + Enter / Escape); Insert + I keydown handler. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/circle.tsx` | 1, 6 | Phase 1 paired migration (radius point); Phase 6 drag-handle vs boundary-point distinction. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/polygon.tsx` | 1, 6 | Phase 1 paired migration (limited + unlimited); Phase 6 no vertex enumeration on group focus. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear.tsx` | 1, 6 | Phase 1 paired migration (if applicable); Phase 6 slope/intercept-aware moved copy. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/segment.tsx` | 1, 6 | Phase 1 paired migration (if applicable); Phase 6 endpoint / length copy. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear-system.tsx` | 1 (scoping), 6 | Phase 1 paired migration if source carries an aria-live toggle; Phase 6 intersection phrasing. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/ray.tsx` | 1 (scoping), 6 | Same scoping check as linear-system. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/sinusoid.tsx` | 6 | Extremum / midline / max / min label re-evaluation. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx` | 4 | Read `pointLabels[i]` with per-index fallback. |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-state.ts` | 5 | Add `lastAddedPointIndex` to point/polygon state. |
| `packages/perseus/src/widgets/interactive-graphs/reducer/interactive-graph-reducer.ts` | 5 | Update reducer cases (`ADD_POINT`, `MOVE_POINT`, `REMOVE_POINT`) to maintain `lastAddedPointIndex`. |
| `packages/perseus/src/widgets/interactive-graphs/graph-controls.tsx` *(or per-variant control renderers)* | 2, 5 | Phase 2 wraps in `role="group"` + `aria-label`. Phase 5 disables Add Point button conditionally. |
| `packages/perseus/src/strings.ts` | 1, 2, 3, 4, 5, 6 | New strings each phase. |
| `packages/perseus-core/src/data-schema.ts` | 4 | Optional `pointLabels?: string[]` on `PerseusGraphTypePoint`, `PerseusGraphTypePolygon`. |
| `packages/perseus-editor/src/...point-editor.tsx` *(exact path during impl)* | 4 | Per-point label inputs in the point/polygon editor UI. |
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

- Build the announcer module directly on `main` under `packages/perseus/src/widgets/interactive-graphs/announcer/`, treating the POC on `catjohnson/lems-3946-prototype` as a working reference for shape, patterns, and pitfalls already surfaced — not a thing we wholesale port. Each piece (central handler, `useGraphAnnouncer` hook, integration into `mafs-graph.tsx`) is rebuilt with fresh tests and review.
- Add `@khanacademy/wonder-blocks-announcer` as a dependency of `@khanacademy/perseus` and mount the WB `<Announcer>` once per page.
- Wire the central handler into `mafs-graph.tsx` so it subscribes to reducer actions and fires `announce(...)` for the universal events listed below.
- Implement `useGraphAnnouncer` so per-graph components in later phases can opt in.
- Migrate the four currently-aria-live graphs — circle, linear, segment, and the unlimited point/polygon variants — off `aria-live` toggles and onto Announcer calls, in the same PR that adds each Announcer call (the paired-migration constraint from OQ3).
- Cover the universal central-handler events from sr-research.md's OQ3 routing table: `ADD_POINT`, `REMOVE_POINT`, `CLOSE_POLYGON` / `OPEN_POLYGON`, `DELETE_INTENT`, `CHANGE_INTERACTION_MODE`, `MOVE_ALL`, and generic `MOVE_LINE` (where no slope/intercept context is needed).
- Add new strings to `strings.ts` for the central events above. Strings for graph-entered / graph-exited and the per-graph math-heavy copy land in their respective phases.

**What this phase does NOT ship:**

- Graph-entered / graph-exited announcements — those depend on the focus trap from Phase 2 and ship there, plugged into the same central handler.
- Math-heavy per-graph copy (circle resize, linear slope/intercept, sinusoid extremum, polygon angle/side changes, etc.) — those land in Phase 6 via `useGraphAnnouncer` once Phase 1's infrastructure is verified.
- Insert + I instruction-repeat shortcut — Phase 2.
- DOM reordering, `role="figure"`, focus trap, instruction-text rewrite — Phase 2.

**What this phase enables:**

- Phase 2 plugs graph-entered / graph-exited messages into the central handler with no infrastructure work — just new action types or focus-handler hooks and new strings.
- Phase 6 plugs per-graph math-heavy copy into `useGraphAnnouncer` from each graph's `graphs/<type>.tsx`, with the routing rule (OQ3) as the canary for what stays per-graph vs. moves central.

### 1.2 Files

All paths are relative to the repo root. The POC at `catjohnson/lems-3946-prototype` is a working reference for the new files in `announcer/` and for the wiring sites.

**New files:**

| File | Purpose |
|------|---------|
| `packages/perseus/src/widgets/interactive-graphs/announcer/central-announcer.ts` | Pure function `getAnnouncementForAction(action, prevState, nextState, strings, locale): string \| null` that maps universal reducer actions to announcement strings. React-free so it is unit-testable as a plain function. POC reference: same path on the POC branch (handles only `ADD_POINT` / `CLOSE_POLYGON` today; Phase 1 expands to the full OQ3 universal-event list). |
| `packages/perseus/src/widgets/interactive-graphs/announcer/central-announcer.test.ts` | Table-driven tests, one row per central event, asserting the resulting string for representative state transitions. POC reference: same path on the POC branch (~124 lines covering the two POC events) — extend the table for each new event. |
| `packages/perseus/src/widgets/interactive-graphs/announcer/use-announcing-reducer.ts` | Exports two hooks: `useAnnouncingReducer` (drop-in for `React.useReducer(interactiveGraphReducer, ...)` that runs each dispatched action through `getAnnouncementForAction` and calls `announceMessage` on the result) and `useGraphAnnouncer` (per-graph escape hatch with a 500 ms default `debounceThreshold`). POC reference: same path on the POC branch. |
| `packages/perseus/src/widgets/interactive-graphs/announcer/use-announcing-reducer.test.ts` | Hook-level tests for `useAnnouncingReducer` (state stays in lockstep with the underlying reducer, announce fires for non-null messages, no announce for `null` returns) and `useGraphAnnouncer` (debounce default applies, per-call override works, callers don't fight each other's queues). The POC has no equivalent — these are net-new for Phase 1. |

**Modified files (wiring + paired aria-live migration):**

| File | Change |
|------|--------|
| `packages/perseus/src/widgets/interactive-graphs/stateful-mafs-graph.tsx` | Replace `React.useReducer(interactiveGraphReducer, ...)` with `useAnnouncingReducer(...)`. Single-line swap — this is the integration point. POC reference: see the diff on the POC branch for the exact call shape. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/circle.tsx` | Adopt `useGraphAnnouncer`. Call `announce(...)` from the radius-point `onMove` callback with the localized "Circle resized. Radius is now N" string. Remove the `setRadiusPointAriaLive("polite")` toggle; leave the `"off"` resets in place (they no longer trigger reads but cost nothing). |
| `packages/perseus/src/widgets/interactive-graphs/graphs/circle.test.tsx` | Replace the existing "aria-live becomes polite on resize" assertions with announcer-call assertions (mock `announceMessage`, assert the localized string was passed). |
| `packages/perseus/src/widgets/interactive-graphs/graphs/polygon.tsx` | Adopt `useGraphAnnouncer` in both the limited and unlimited polygon code paths. Replace each `setAriaLives([..., "polite", ...])` toggle (lines ~300, ~367, ~571 today) with an `announce(...)` call carrying the moved-point copy. Keep the `pointsOffArray` resets — same rationale as circle. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/polygon.test.tsx` | Replace the four `aria-live` assertion blocks with announcer-call assertions, one per dispatch path. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear.tsx` *(if it carries an aria-live toggle — verify during implementation)* | Same migration pattern: `useGraphAnnouncer`, replace the aria-live toggle with `announce(...)`. The test file (`linear.test.tsx`) asserts `aria-live` directly today; whichever source site owns the aria-live toggle needs the migration. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/linear.test.tsx` | Replace the `expectedAriaLive` assertions (lines 230–239 today) with announcer-call assertions. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/segment.tsx` *(verify during implementation, same caveat as linear)* | Same migration pattern. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/segment.test.tsx` | Replace `aria-live` assertions with announcer-call assertions. |
| `packages/perseus/src/strings.ts` | Add new central-event strings (`srGraphPointAdded`, `srGraphPointRemoved`, `srGraphPolygonClosed`, `srGraphPolygonOpened`, `srGraphPointDeleted`, `srGraphKeyboardModeEntered`, `srGraphKeyboardModeExited`, `srGraphTranslated`, `srLineMoved`); plus per-graph migration strings for the four migrated graph types (`srCircleRadiusNow`, `srPolygonVertexMoved`, `srLinearPointMoved`, `srSegmentEndpointMoved` — exact names finalized during implementation). The POC's hardcoded English strings are placeholders; Phase 1 ships localizable versions. |
| `packages/perseus/package.json` | Add `@khanacademy/wonder-blocks-announcer` to `dependencies`. |

**Out-of-scope on the POC, not touched in Phase 1:**

- `packages/perseus/src/widgets/interactive-graphs/interactive-graph.testdata.ts` and `.../interactive-graph-question-builder.ts` are heavily rewritten on the POC branch (~2,500 lines combined) — that work is unrelated to the announcer foundation and stays out of Phase 1 PRs.
- The POC's unrelated reducer / polygon-default-points fix (`reducer/interactive-graph-reducer.ts` and the polygon `coords ?? [[0, 0]]` defensive bit) — out of scope; investigate separately if needed.

**Open scoping question for implementation:**

- `linear-system.test.tsx` and `ray.test.tsx` also assert `aria-live` behavior today. If those graphs' source aria-live toggles are paired migrations within Phase 1's "currently aria-live" set, they belong in this phase's file list; if not, they slot into Phase 6. Decide at the start of Phase 1 implementation by reading each graph's `*.tsx` source for `setXxxAriaLive` callers.

### 1.3 Implementation Steps

Each numbered step is the unit of review — typically one PR. Order is sequential: each PR depends on the previous one being merged so the new exports and strings are in place. The POC at `catjohnson/lems-3946-prototype` is referenced inline as a working shape, not as a porting source.

#### 1.3.1 Foundation — announcer module + dormant wiring (PR 1)

**Goal:** land the announcer module and swap `useAnnouncingReducer` into `stateful-mafs-graph.tsx`, with the central handler returning `null` for every action. Validates the integration with zero observable SR-behavior change.

- Add `@khanacademy/wonder-blocks-announcer` to `packages/perseus/package.json` `dependencies`. Match the version pin used elsewhere in the monorepo.
- Create `announcer/central-announcer.ts` with `getAnnouncementForAction(action, prevState, nextState, strings, locale): string | null`. Body is `default: return null`. POC reference: same path on the POC branch.
- Create `announcer/use-announcing-reducer.ts` exporting `useAnnouncingReducer` (drop-in for `React.useReducer`; calls `announceMessage({message})` when the handler returns non-null) and `useGraphAnnouncer` (returns `{announce}` with default `debounceThreshold: 500 ms`, per-call override). POC reference: same path on the POC branch.
- Create `announcer/central-announcer.test.ts`: table-driven, one row per action type currently in `InteractiveGraphAction`, all asserting `null`. Locks in the dormant default and forces future contributors to *deliberately* add a case.
- Create `announcer/use-announcing-reducer.test.ts`: state stays in lockstep with `interactiveGraphReducer`; `announceMessage` is not called when the handler returns `null`; `useGraphAnnouncer.announce` calls through with the default debounce; per-call `{debounceThreshold: 0}` override works.
- Edit `stateful-mafs-graph.tsx`: import `useAnnouncingReducer`, replace the `React.useReducer(interactiveGraphReducer, props, initializeGraphState)` call. Single-line swap. POC reference: see the diff on the POC branch.

**Done when:** the existing test suite passes unchanged; manually reverting the swap produces zero test diffs; no SR-behavior change is observable.

#### 1.3.2 Central events — universal action → string mapping (PR 2)

**Goal:** implement central-handler cases for every universal event in OQ3's routing table that does not depend on Phase 2 (focus trap). Graph-entered / graph-exited are deliberately deferred — Phase 2 plugs them into the same handler.

Events:

- `ADD_POINT` — action carries `location`; format coords via `srFormatNumber`.
- `REMOVE_POINT` — action carries `index`; read coords from `prevState` for the removed position.
- `CLOSE_POLYGON` / `OPEN_POLYGON` — no payload; universal copy.
- `DELETE_INTENT` — universal "Point deleted" message.
- `CHANGE_INTERACTION_MODE` — branch on the action's mode for "Entered / Exited keyboard mode".
- `MOVE_ALL` — generic "Polygon translated" (no math context needed; routing rule says central).
- `MOVE_LINE` — generic "Line moved" *only*. Slope/intercept-aware copy stays per-graph and lands in Phase 6.

Files: `announcer/central-announcer.ts`, `announcer/central-announcer.test.ts`, `packages/perseus/src/strings.ts`.

Implementation notes:

- One switch case per event; one test row per event. Add tests that exercise `prevState` reads for events that need them (`REMOVE_POINT`, `DELETE_INTENT`).
- **Routing-rule canary:** do not import `getRadius`, `getSlopeStringForLine`, `getClockwiseAngle`, or any math utility into `central-announcer.ts`. If a case starts wanting one, that announcement belongs per-graph and should defer to Phase 6.
- New strings (proposed names; finalize with copy review): `srGraphPointAdded`, `srGraphPointRemoved`, `srGraphPolygonClosed`, `srGraphPolygonOpened`, `srGraphPointDeleted`, `srGraphKeyboardModeEntered`, `srGraphKeyboardModeExited`, `srGraphTranslated`, `srGraphLineMoved`.

**Reviewer-friendliness:** if 8 cases in one PR is too wide, split by event family (point / polygon / line / mode) — the table-driven test layout makes either shape easy to review.

**Done when:** every universal event speaks via WB Announcer; per-graph aria-live toggles still drive math-heavy copy untouched (those migrate in 1.3.3–1.3.6); a SR user dispatching one of these actions hears the new central string.

#### 1.3.3 Paired migration — Circle radius point (PR 3)

**Goal:** cut the `setRadiusPointAriaLive("polite")` toggle in `circle.tsx` over to `useGraphAnnouncer`. Canonical paired-migration template — the next three steps mirror this shape.

- Edit `graphs/circle.tsx`: import `useGraphAnnouncer`. In the radius-point `onMove` callback, compute the new radius (`vec.dist(center, newRadiusPoint)`) and call `announce(strings.srCircleRadiusNow({radius: srFormatNumber(newRadius, locale)}))`. Remove the `setRadiusPointAriaLive("polite")` line at line ~102. Keep the `setRadiusPointAriaLive("off")` resets — now no-ops but harmless; cleanup is a follow-up. POC reference: see the diff on the POC branch (note the inline comment about double-announcements — preserve that warning).
- Add `srCircleRadiusNow` to `strings.ts` (localizable; the POC's English placeholder is not shippable).
- Edit `graphs/circle.test.tsx`: replace the `aria-live="polite"` assertion with a mocked-`announceMessage` assertion. Pattern: `jest.mock("@khanacademy/wonder-blocks-announcer")`, assert called with the localized string after dispatch.
- Manually verify in Storybook + an SR (NVDA / JAWS / VoiceOver) that resize reads *once*, not twice — both the visual aria-live region and the WB Announcer can speak; the migration removes the duplication.

**Done when:** circle radius reads via Announcer; no double-announce in any SR; tests pin the new behavior.

#### 1.3.4 Paired migration — Polygon vertices (PR 4)

Two `setAriaLives` toggle sites in `polygon.tsx` (limited and unlimited code paths). Same template as 1.3.3.

- Edit `graphs/polygon.tsx`: at each `setAriaLives([..., "polite", ...])` site (lines ~300, ~367, ~571 today), insert `announce(strings.srPolygonVertexMoved({...}))`. Remove the `"polite"` slot in the toggle; keep the `pointsOffArray` resets. The limited and unlimited paths share the announce-call shape.
- Add `srPolygonVertexMoved` to `strings.ts`.
- Edit `graphs/polygon.test.tsx`: replace the four `expectedAriaLive` assertion blocks (lines ~337, ~556) with announcer-call assertions, one per dispatch path.
- SR-matrix verification per 1.3.3.

#### 1.3.5 Paired migration — Linear (PR 5)

**Open scoping check at PR start:** confirm `graphs/linear.tsx` actually carries a `setXxxAriaLive` toggle in source (the test file asserts `aria-live`, but the source toggle may live in a shared `MovablePoint` / `MovableLine` component). If the toggle is in source, migrate as below. If it lives only in shared-component props or is already off, defer entirely to Phase 6 and update 1.2's open scoping question.

- Edit `graphs/linear.tsx`: replace the aria-live toggle with `announce(strings.srLinearPointMoved({...}))`. **Generic message only** — slope/intercept-aware copy is math-heavy and stays per-graph for Phase 6.
- Add `srLinearPointMoved` to `strings.ts`.
- Edit `graphs/linear.test.tsx`: replace the `expectedAriaLive` assertions (lines ~230–239) with announcer-call assertions.
- SR-matrix verification.

#### 1.3.6 Paired migration — Segment (and possibly ray, linear-system) (PR 6)

Same open scoping check + same template as 1.3.5 against `graphs/segment.tsx` / `segment.test.tsx`. Apply the same check to `graphs/ray.tsx` (referenced in `ray.test.tsx`) and `graphs/linear-system.tsx` (referenced in `linear-system.test.tsx`). Bundle ray and linear-system into PR 6 if they're trivially the same shape; split into separate PRs if either has graph-specific complexity.

#### 1.3.7 Verification + Phase 2 plug-in surface (PR 7 or post-PR-6 task)

**Goal:** confirm Phase 1 is stable and Phase 2 has a known plug-in surface for graph-entered / graph-exited.

- Audit: `grep -rn 'setXxxAriaLive("polite")' graphs/`. Every remaining site is either deferred to Phase 6 (math-heavy per-graph copy) or out of scope — document each in this plan as a follow-up.
- Confirm Phase 2's plug-in surface: `useAnnouncingReducer` already routes any future action through the central handler, so adding a `GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED` action type in Phase 2 plugs in with one switch case each. If Phase 2 instead wants to call `announce(...)` directly from its focus handler (no reducer round-trip), `useGraphAnnouncer` is already exported. Either path is open — pick during Phase 2 implementation.
- Update Storybook a11y stories: one per migrated graph, with notes for how to verify in a real SR.
- Update `__docs__/a11y.mdx` for `interactive-graphs/` to reference the announcer module and the OQ3 routing rule (so future contributors know where to add new announcements).

**Done when:** every Phase-1-targeted aria-live toggle is migrated; no direct `aria-live` usage remains in `interactive-graphs/` for the migrated graphs (all live-region announcements flow through WB Announcer); no double announcements observed across the SR matrix; the announcer module is documented; Phase 2 has a documented plug-in path.

### 1.4 Tests

**Unit (per file in `announcer/`):**

- `central-announcer.test.ts` — table-driven, one row per `InteractiveGraphAction` type. Each row asserts the resulting string (or `null`) for representative `prevState` / `nextState` inputs. New events added in 1.3.2 each get a row.
- `use-announcing-reducer.test.ts` — `useAnnouncingReducer` keeps state in lockstep with `interactiveGraphReducer`; `announceMessage` is not called when the central handler returns `null`; `useGraphAnnouncer.announce` honors the 500 ms default debounce; per-call `{debounceThreshold: 0}` override works; dispatch identity stays stable across renders (via `useCallback`).

**Integration (per migrated graph component):**

- For each of `circle.test.tsx`, `polygon.test.tsx`, and the linear / segment / ray / linear-system files where applicable: replace existing `aria-live` assertions with announcer-call assertions. Pattern: `jest.mock("@khanacademy/wonder-blocks-announcer")`, dispatch the action that triggers the announcement, assert `announceMessage` was called with the expected localized string.
- Add a regression test per migrated graph that asserts the corresponding aria-live state is **not** flipped to `"polite"` — pins the paired-migration end state.

**Static check / lint:**

- After 1.3.7, run `grep -rn 'setXxxAriaLive("polite")' graphs/` and confirm no migrated graph still owns a `"polite"` toggle. (Knip / TypeScript will also flag dead `AriaLive` imports for migrated graphs, which is the cleanup canary.)

**Manual SR matrix:**

- Per migrated graph, verify on NVDA + Chrome, JAWS + Edge, VoiceOver + Safari that the change reads *once*, not twice. Detail in [Cross-Cutting → SR Test Matrix](#sr-test-matrix).

### 1.5 Rollout / Flag

**No feature flag.** Rationale:

- The announcer module is dormant after PR 1 (1.3.1) — `central-announcer.ts` returns `null` for every action until PR 2 lands.
- Each subsequent PR is a small, independently-revertible change. If a paired migration causes a regression, `git revert` of that single PR restores the old aria-live behavior.
- Phase 1 is additive infrastructure for later phases; gating it behind a flag would block Phase 6 from starting.

**Verification per PR before merge:**

1. `pnpm test` green for the touched packages.
2. Manual SR-matrix pass on the migrated graph (NVDA + Chrome, JAWS + Edge, VoiceOver + Safari).
3. Storybook a11y addon: no new violations on the touched stories.

**Rollback:** `git revert` of the specific PR. Because each paired migration touches one graph, blast radius is contained to that graph.

### 1.6 Risks

- **Doubled announcements** if a paired migration adds the Announcer call but misses the aria-live removal (or vice versa). Mitigation: paired-migration constraint is enforced by the test that asserts no `"polite"` flip; reviewers check both sides.
- **Queue thrashing on busy pages.** Two interactive graphs on the same page (or graph + another announcing widget) share the WB Announcer queue. Per OQ3, `useGraphAnnouncer`'s 500 ms debounce mitigates per-stream thrashing; cross-stream chatter is documented as a future telemetry-driven follow-up.
- **Localization correctness.** New strings carry interpolated values (`{x}`, `{y}`, `{radius}`); they need ICU plurals or value formatting where applicable, and RTL render verification for any concatenation. Coordinate values flow through `srFormatNumber`, which is already locale-aware.
- **Dispatch identity churn.** `useAnnouncingReducer` uses `useCallback` with `[strings, locale]` deps — confirm no consumer relies on dispatch identity across language toggles (rare but possible).
- **Test flakiness.** WB Announcer mounts a single live region per page. If the test environment doesn't reset the announcer between tests, assertions can leak. Mitigation: `jest.mock` the WB module per test file, reset spies in `beforeEach`.
- **Scoping ambiguity for linear / segment / ray / linear-system.** If the open scoping question (1.2) reveals the source-side aria-live toggle lives in a shared component (`MovablePoint`, `MovableLine`), the migration may need to touch that shared file — increasing the blast radius and forcing all dependent graphs to verify together. Mitigation: read the source first; split the PR if the shared-component change needs its own review.

---

## Phase 2: Focus, Entry, and Instructions

**Tickets:** LEMS-3206, LEMS-2681
**Implements:** OQ1, OQ2a, OQ2b, OQ2c, OQ4, OQ6a, OQ6b
**Depends on:** Phase 1 (uses Announcer for graph-entered / exited messages)

### 2.1 Scope

**What ships in this phase:**

- `role="figure"` on the outer focusable `mafs-graph` View (OQ6a primary, OQ6b decision A).
- DOM reorder so the instructions `<View>` is the first sr-only child inside the graph wrapper (OQ4).
- Bounded vs. unlimited instruction-string split (OQ2a decision B), including the leading mode-toggle warning (OQ2b decision A) and the on-demand-shortcut sentence (OQ2c decision A).
- Focus trap: Shift + Enter enters all graphs (today only unlimited variants), Escape exits (OQ1 decision A). Graph-entered / graph-exited spoken via WB Announcer.
- Insert + I (Windows) / Fn + Enter + I (macOS) keyboard shortcut to repeat the instruction string on demand (OQ2c decision A). Platform-detected dual binding.
- Action Bar grouping: wrap action buttons in `role="group"` + `aria-label="Action Bar"`.
- LEMS-2681: after Shift + Enter on an unlimited polygon, focus moves to the Add Point button (today it stays on the graph outline).

**What this phase does NOT ship:**

- None-type / locked-figure description copy — Phase 3 (uses Phase 2's instruction-string infrastructure).
- Add Point disable rule — Phase 5 (the role=group wrapper ships here; the disable behavior is a separate layer).
- Per-question `pointLabels` — Phase 4.
- Per-graph copy fixes — Phase 6.
- Removing Ctrl + Shift + Arrow (LEMS-4003) — deferred per OQ2b.

### 2.2 Files

| File | Change |
|------|--------|
| `mafs-graph.tsx` | Add `role="figure"` on the outer `<View>`; reorder sr-only children so `instructions` is first; add focus handler for Shift + Enter (enter) and Escape (exit), wired to dispatch into the central announcer; add keydown handler for Insert + I / Fn + Enter + I via platform detection. |
| `reducer/interactive-graph-action.ts` and `reducer/interactive-graph-reducer.ts` *(if action-based routing chosen at 1.3.7)* | New action types `GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED`; reducer cases that update interaction mode and (for unlimited polygon) flag the LEMS-2681 focus jump. |
| `announcer/central-announcer.ts` | Add cases for `GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED` if the action-routed path is chosen; otherwise mafs-graph calls `announce(...)` directly via `useGraphAnnouncer`. |
| `graph-controls.tsx` *(or per-variant control renderers in `renderPointGraphControls` / `renderPolygonGraphControls`)* | Wrap controls in `<View role="group" aria-label={strings.srActionBar}>`. |
| `unlimited-polygon` rendering path *(exact file during impl)* | After Shift + Enter, programmatically focus the Add Point button. |
| `strings.ts` | Add `srGraphInstructionsBounded`, `srGraphInstructionsUnlimited` (or update the existing two strings); `srGraphFocusModeWarning` (the lead sentence); `srGraphInstructionsRepeatHint`; `srGraphEntered`, `srGraphExited`; `srActionBar`. Final wording confirmed with Caitlyn, with Darrell as final sign-off, before merge. |
| `__docs__/a11y.mdx` | Document the focus-trap, the role, the DOM order, and the Insert + I shortcut. |
| Stories under `__docs__/` | Add or update an a11y story per major flow (entry, instruction repeat, exit) with notes on how to verify in NVDA / JAWS / VoiceOver. |

### 2.3 Implementation Steps

Each numbered step is the unit of review. Order is sequential within a single PR — Phase 2 ships as one feature-flagged PR (or a tightly-coordinated stack) because the user-facing pieces are interlocking.

#### 2.3.1 Add `role="figure"` on the outer `mafs-graph` View

- Add `role="figure"` to the outer `<View>` in `mafs-graph.tsx`. The element already owns `tabIndex=0`, `aria-label`, and `aria-describedby`; the role just adds semantic scaffolding.
- Verify on NVDA / JAWS / VoiceOver that the figure is announced on entry and that interactive children (movable points, lines) still announce when focused. If any SR suppresses children, fall back to `role="application"` per OQ6a — see [Cross-Cutting → role="figure" → role="application" Fallback Decision Point](#rolefigure--roleapplication-fallback-decision-point).

#### 2.3.2 Reorder DOM children so instructions render first (OQ4)

- In `mafs-graph.tsx`, change the order of the sr-only `<View>` children from `description → interactiveElements → instructions` to `instructions → description → interactiveElements`.
- Update `aria-describedby` on the outer View to match the new visual order, or rely on natural DOM-reading order — verify by SR which is read first.

#### 2.3.3 Update instruction strings (OQ2a, OQ2b, OQ2c)

- Replace `srGraphInstructions` and `srUnlimitedGraphInstructions` with two new strings that share a leading **mode-toggle warning** sentence ("Set your Screen Reader to Focus mode…") and end with the **instruction-repeat hint** ("Use Insert + I (Windows) or Fn + Enter + I (Mac) to repeat these instructions").
- Bounded variant trims out Action Bar / add-point / close-shape language. Unlimited variant uses the designer's full text.
- Coordinate final wording with Caitlyn, with Darrell as final sign-off — see [Cross-Cutting → Copy Review Process](#copy-review-process).

#### 2.3.4 Focus trap: Shift + Enter enters; Escape exits (OQ1)

- Today, only unlimited graphs change `interactionMode` on Shift + Enter. Generalize: Shift + Enter enters all graphs, Escape exits.
- Wire the focus-entry handler to dispatch (or call `announce(...)` directly) so the WB Announcer says "Graph entered".
- On Escape, dispatch the corresponding exit action and announce "Graph exited"; return focus to the previously-focused element outside the graph (use `useLatestRef` to capture the entry-time activeElement).
- Decide at PR start whether to route via reducer action (`GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED`) or call `announce` directly from the focus handler — both surfaces are open per 1.3.7.

#### 2.3.5 Insert + I / Fn + Enter + I instruction repeat (OQ2c)

- Add a keydown handler on the outer View. The handler is **focus-scoped** — it only runs when the graph is focused, which is what makes the chord WCAG 2.1.4 compliant under path 3.
- Detect the platform (`navigator.platform` or `process.platform` in tests) and listen for Insert + I on Windows, Fn + Enter + I on macOS. Bind both chords to the same handler.
- On match: call `announce(strings.srGraphInstructionsRepeat...)` via WB Announcer with the same instruction string the user heard on entry. (No reducer round-trip needed.)
- Coordinate with Caitlyn, with Darrell as final sign-off, on whether the on-entry instructions list both chords or only the platform-relevant one.

#### 2.3.6 Action Bar grouping (`role="group"` + `aria-label`)

- In `renderPointGraphControls` / `renderPolygonGraphControls` (or the equivalent in the new `graph-controls.tsx`), wrap the action buttons in `<View role="group" aria-label={strings.srActionBar}>`.
- Add the `srActionBar` string ("Action Bar").
- This step does **not** ship the Add Point disable rule — that's Phase 5.

#### 2.3.7 LEMS-2681: focus to Add Point on Shift + Enter for unlimited polygon

- Today, Shift + Enter on an unlimited polygon dispatches `changeInteractionMode("keyboard")` but focus stays on the graph outline. Users are told to Tab to the Action Bar but the focus jump never happens.
- After the mode change, programmatically focus the Add Point button. Use a ref captured during render.
- Verify on the SR matrix that the focus jump isn't double-announced (entering keyboard mode + focusing the button = two events; check that the announcement is sane).

### 2.4 Tests

**Per-step jest / RTL tests:**

- `role="figure"` is present on the outer View and survives state changes.
- DOM order: assert the `instructions` `<View>` is the first sr-only child after the new reorder.
- Instruction strings: round-trip through the i18n harness; assert bounded/unlimited branches produce the expected substrings (mode-toggle warning, on-demand hint).
- Focus trap: simulate Shift + Enter, assert focus moves into the graph and `announceMessage` is called with the entered-string. Simulate Escape, assert focus returns to the previous element and `announceMessage` is called with the exited-string.
- Insert + I / Fn + Enter + I: simulate each keydown on each platform, assert `announceMessage` is called with the instruction string. Assert that the chord is **not** intercepted when focus is outside the graph (focus-scoped invariant for WCAG 2.1.4).
- Action Bar: assert `role="group"` and `aria-label` on the wrapper.
- LEMS-2681: simulate Shift + Enter on an unlimited polygon, assert `document.activeElement` is the Add Point button.

**Manual SR matrix:**

- Full pass per SR before flipping the flag — see [Cross-Cutting → SR Test Matrix](#sr-test-matrix).

**Axe-core scan:**

- Storybook a11y addon must show no new violations after the role + reorder changes.

### 2.5 Rollout / Flag

**Single feature flag covering the whole phase** (proposed name `interactive-graphs-sr-phase-2`; final name confirmed with platform team).

- Default off in production while implementation lands and Caitlyn reviews, with Darrell as final sign-off.
- Flip per environment in cadence: dev (immediate) → staging (1 week soak) → 5% prod (1 week) → 100%.
- Flip criteria: (1) full SR-matrix pass; (2) no axe-core regressions; (3) Darrell sign-off on instruction copy and entry/exit experience; (4) no Sentry spikes attributable to the new keyboard handlers.
- **Rollback:** flag off. Because Phase 1 ships unflagged, an off-flag puts users back on the Phase-1-but-no-focus-trap baseline (which is still a usability improvement over pre-Phase-1).

### 2.6 Risks

- **`role="figure"` may suppress child announcements on some SRs** (documented on focusable widgets in OQ6a). Mitigation: cross-SR test before flipping the flag; documented fallback to `role="application"` if needed.
- **Focus trap regressions** for users with muscle memory of "Tab away to exit" — they may not discover Escape. Mitigation: instruction text covers Escape explicitly; revisit if SR feedback shows confusion.
- **Insert + I conflict with JAWS "read window title"** until the user follows the mode-toggle warning. Mitigation: warning is in the on-entry instructions; SR pass-through (Insert + 3 in JAWS, NVDA + F2 in NVDA) is a known escape hatch (documented in research).
- **LEMS-2681 focus jump may itself confuse SR users** — moving focus programmatically can produce a double announcement (mode entered + button focused). Mitigation: SR-matrix verify; tune the announcement order if needed.
- **Platform detection brittleness** for Insert + I vs. Fn + Enter + I — `navigator.platform` is deprecated in some browsers; use a more durable signal (`navigator.userAgentData`, fallback chain). Document the chosen detection in the implementation notes.
- **i18n copy churn**: the instruction strings are long. Late copy changes could ripple through multiple translation files. Mitigation: complete Caitlyn-led iteration, then get Darrell's final sign-off **before** translation kicks off.

### 2.7 Open Implementation-time Questions

- Final wording of all new strings, especially the mode-toggle warning sentence and whether it names specific SR toggle keys (JAWS: Insert + Z, NVDA: Insert + Space). Owner: Caitlyn, with Darrell as final sign-off.
- Whether the on-entry instruction string mentions both Insert + I **and** Fn + Enter + I, or only the platform-relevant one (depends on whether the strings bundle does platform-conditional copy).
- Whether `GRAPH_FOCUS_ENTERED` / `GRAPH_FOCUS_EXITED` are reducer actions or direct `useGraphAnnouncer` calls (1.3.7's plug-in surface — defer the call until Phase 2 implementation begins).
- Final platform-detection signal for Insert + I vs. Fn + Enter + I.

---

## Phase 3: None-type / Static / Locked Figure Messaging

**Tickets:** LEMS-3205
**Implements:** None-type / static / locked-figure requirements (sr-research.md §"None-type / static / locked-figure requirements")
**Depends on:** Phase 2 (uses the instruction-string infrastructure and the new DOM order)

### 3.1 Scope

**What ships in this phase:**

- Explicit "nothing to move" SR-only label for none-type graphs, surfaced on entry so users immediately know the graph is non-interactive.
- Locked-figure traversability mention in the on-entry description, so SR users know to free-explore (rather than Tab) to reach locked figures.
- Authoring-time `perseus-linter` rule that warns when a locked figure on an interactive-graph widget has a missing or empty `ariaLabel`. Surfaced from the LEMS-3946 spike comment after initial research landed; complements the runtime traversability prefix (the prefix tells SR users locked figures *exist*; the linter ensures the labels they hear are *meaningful*).
- Decision (pending design): whether to apply the same "nothing to move" treatment to static graphs.

**What this phase does NOT ship:**

- Locked-figure focus order — separate spike (Phase 1 quality note).
- Re-authoring questions whose meaning depends on inaccessible images — Content team.

**Note on dependencies:** the runtime pieces (3.3.1–3.3.3) depend on Phase 2's instruction-string infrastructure as the section header states. The linter rule (3.3.4) is purely authoring-side and is independent of Phase 2 — it can ship in parallel.

### 3.2 Files

| File | Change |
|------|--------|
| `mafs-graph.tsx` | Branch on graph type to render the "nothing to move" sr-only string for none-type graphs; prepend the locked-figure traversability prefix to the description when locked figures are present. |
| `strings.ts` | Add `srGraphNothingToMove` (none-type / static), `srGraphLockedFiguresTraversable` (the prefix). |
| `packages/perseus-linter/src/rules/interactive-graph-locked-figure-aria-label.ts` *(new)* + corresponding `.test.ts` | New lint rule that walks each interactive-graph widget's `lockedFigures` array and warns on any entry whose `ariaLabel` is missing or empty. Pattern after existing widget-targeted rules (e.g., `expression-widget-error.ts`). |
| `packages/perseus-linter/src/rules/all-rules.ts` | Register the new rule. |
| `__docs__/a11y.mdx` | Document the new runtime copy, the branching logic, and the new linter rule (so authors know what triggers it and how to fix). |

### 3.3 Implementation Steps

#### 3.3.1 "Nothing to move" label for none-type graphs

- Detect none-type via the existing `type === "none"` check in `mafs-graph.tsx`.
- Replace (or augment) the description with `srGraphNothingToMove` so SR users hear "This graph is for display only — there is nothing to move" on entry.
- Verify on the SR matrix that no interactive elements are still focusable (none-type shouldn't have any, but pin the invariant).

#### 3.3.2 Locked-figure traversability prefix

- When the graph contains locked figures, prepend `srGraphLockedFiguresTraversable` to the description — text along the lines of "This graph contains additional figures that can be reached by free exploration with your screen reader."
- Verify locked figures are still reachable via SR exploration (no Tab needed) and that their existing `role="img"` labels read correctly.

#### 3.3.3 Static graph treatment (pending design)

- Open question: do static graphs (read-only but graph-shaped) get the same "nothing to move" treatment as none-type? Pending design from Caitlyn.
- Implement once design lands. If the answer is yes, extend the 3.3.1 branch to include static; if no, no code change.

#### 3.3.4 Linter rule: locked-figure `ariaLabel` required

- Add a new rule under `packages/perseus-linter/src/rules/`. Pattern after existing widget-targeted rules (e.g., `expression-widget-error.ts`).
- Rule walks every interactive-graph widget configuration. For each entry in `lockedFigures` (where present), check that `ariaLabel` is a non-empty string. If `ariaLabel` is missing or empty (`undefined`, `null`, or `""`), emit a warning that names the figure type and its position in the array. Locked figures are not allowed to be unlabeled — there is no "purely decorative" opt-out.
- Warning copy (proposed; finalize with Caitlyn, with Darrell as final sign-off): `"Locked %(figureType)s at index %(index)s is missing an accessibility label. Add an 'ariaLabel' so screen reader users can perceive it."`
- Register the new rule in `packages/perseus-linter/src/rules/all-rules.ts`.

**Done when:** authoring a question with an unlabeled locked figure surfaces the warning in the lint pass; existing labeled content produces no warnings; the rule is registered and shows up in `all-rules.ts`.

### 3.4 Tests

- jest assertion: none-type renders `srGraphNothingToMove` in the sr-only description.
- jest assertion: locked-figure-bearing graphs render the traversability prefix.
- Linter rule tests: locked figures with non-empty `ariaLabel` produce no warning; missing or empty `ariaLabel` (`undefined`, `null`, `""`) produces the expected warning; multiple unlabeled figures produce one warning per figure (with correct `figureType` and `index` interpolation).
- SR-matrix manual verification (focus on whether the new prefix conflicts with existing locked-figure announcements).

### 3.5 Rollout / Flag

Under Phase 2's flag — description text is part of the same entry-experience rework.

### 3.6 Risks

- "Nothing to move" copy may be misleading for graph-as-image cases where the visual is the answer — coordinate with Content team's review process.
- Locked-figure prefix may double up with each locked figure's own announcement — verify the combined output is concise.

### 3.7 Open Implementation-time Questions

- Static-graph treatment: pending design.
- Exact wording of both new strings — Caitlyn & Darrell.
- Final wording of the linter warning copy — Caitlyn, with Darrell as final sign-off.

---

## Phase 4: Per-Question Authoring — `pointLabels`

**Tickets:** LEMS-3995 (existing) + a new schema/editor ticket to be filed
**Implements:** OQ5
**Depends on:** — (independent of Phases 1–3, can ship in parallel)

### 4.1 Scope

**What ships in this phase:**

- Optional `pointLabels?: string[]` on `PerseusGraphTypePoint` and `PerseusGraphTypePolygon` in the data schema.
- Per-handle SR label renders `pointLabels[i]` if set, otherwise falls back to the existing `srPointAtCoordinates` template ("Point %(num)s at %(x)s comma %(y)s") **per index** (so a partial array like `["T"]` on a 3-point graph reads "Point T at …", "Point 2 at …", "Point 3 at …").
- Editor UI: per-point label input alongside the coordinate inputs in the point and polygon editors.
- Documentation / lint guidance directing authors when to set `pointLabels` vs. relying on the default.

**What this phase does NOT ship:**

- Auto-derivation of labels from the question text (rejected per OQ5 option B).
- A blanket "all labels in the graph come from the question" mode — too brittle.

### 4.2 Files

| File | Change |
|------|--------|
| `packages/perseus-core/src/data-schema.ts` | Add `pointLabels?: string[]` to `PerseusGraphTypePoint` and `PerseusGraphTypePolygon`. Update parsers. |
| `packages/perseus/src/widgets/interactive-graphs/graphs/components/use-control-point.tsx` *(or wherever the per-handle label is computed)* | Read `pointLabels[i]` if present, else the existing fallback. |
| `packages/perseus-editor/src/...point-editor.tsx` *(exact file located during impl — point and polygon editor components)* | Per-point label `<input>` next to coords. |
| `packages/perseus-linter/src/...` *(if a linter rule fits)* | Optional rule to nudge authors toward setting `pointLabels` when prose names points (e.g., "Point T"). |
| `__docs__/a11y.mdx` | Document the new field and authoring guidance. |

### 4.3 Implementation Steps

#### 4.3.1 Schema addition

- Add `pointLabels?: string[]` to both types in `data-schema.ts`.
- Update the corresponding `parsePerseusGraphTypePoint` / `parsePerseusGraphTypePolygon` to accept the new field (it's optional, so the parser change is small).
- Round-trip tests: existing fixtures still parse; new fixtures with `pointLabels` parse correctly; invalid types (numbers, mixed arrays) reject.

#### 4.3.2 Per-handle fallback

- In the per-handle label computation site, if `pointLabels?.[i]` is a non-empty string, use it as the point name; otherwise fall back to the existing `srPointAtCoordinates` template with the numeric index. Per-index, not all-or-nothing.
- Tests: full array, partial array, empty array, undefined — each produces sensible output for every index.

#### 4.3.3 Editor UI

- Add a small text input per point in the point/polygon editor, labeled "Screen reader label (optional)".
- Persist into the `pointLabels` array, growing/shrinking it to match the coords array.
- Visual: don't change the existing layout drastically — the label input is a quiet addition.

#### 4.3.4 Lint / docs

- Update `__docs__/a11y.mdx` with an authoring note explaining when to use `pointLabels`.
- Optionally add a lint rule that flags graphs whose adjacent prose contains "Point X" / "Vertex Y" patterns but whose `pointLabels` is unset (heuristic; low confidence; ship behind editor-only mode).

### 4.4 Tests

- Schema parse round-trip tests (`data-schema.test.ts`) — existing fixtures unchanged, new fixtures pass, invalid inputs reject.
- Per-handle label tests (`use-control-point.test.tsx` or equivalent) for: undefined `pointLabels`, empty array, partial array, full array, array with empty-string entries.
- Editor integration tests: typing in the new input persists to the JSON; clearing the input reverts to the fallback label.

### 4.5 Rollout / Flag

- **Schema additions are backwards-compatible** — no flag needed for the renderer side. Existing content with no `pointLabels` keeps the current "Point N" labels.
- **Editor UI** ships behind an editor-side flag (proposed name `perseus-editor-point-labels`) while authors are trained.

### 4.6 Risks

- **Authoring burden** if the field becomes implicitly required by content reviewers — keep it optional in spirit, not just in schema.
- **Partial-array fallback correctness** — a partial array must fall back per-index, not collapse to "all or nothing". Cover this in tests.
- **Localization** — `pointLabels` are author-supplied plain text; they're the author's responsibility to localize, same as `fullGraphAriaLabel` today. Document this clearly in the editor UI helper text.

---

## Phase 5: Add Point Disable Rule + Action Bar Polish

**Tickets:** New ticket to be filed
**Implements:** OQ7
**Depends on:** Phase 2 (Action Bar grouping ships there; this is the disable-rule layer on top)

### 5.1 Scope

**What ships in this phase:**

- Track `lastAddedPointIndex` in the unlimited point/polygon reducer state.
- Disable the Add Point button when the most-recently-added point is still at the origin `(0, 0)`. Re-enable as soon as the user moves it off the origin (or removes it, or adds and moves a different point).
- Update `aria-disabled` and the button label so SR users understand why the button is disabled.

**What this phase does NOT ship:**

- Action Bar `role="group"` — Phase 2.
- Different placement strategies for new points (OQ7 option C, rejected).

### 5.2 Files

| File | Change |
|------|--------|
| `reducer/interactive-graph-state.ts` *(point + polygon state shapes)* | Add `lastAddedPointIndex: number \| null`. |
| `reducer/interactive-graph-reducer.ts` | Update `ADD_POINT` (set `lastAddedPointIndex` to the new point's index), `MOVE_POINT` (clear if the moved point is `lastAddedPointIndex` and it's now off origin), `REMOVE_POINT` (clear if the removed point is `lastAddedPointIndex`). |
| `graph-controls.tsx` *(point + polygon variants)* | Read `lastAddedPointIndex`; if non-null and `coords[lastAddedPointIndex] === [0, 0]`, set `disabled` and `aria-disabled` on the Add Point button. |
| `strings.ts` | Add `srAddPointDisabledHint` ("Add Point is disabled until the new point is moved off the origin") for the button's tooltip / aria-describedby. |
| `__docs__/a11y.mdx` | Document the disable rule. |

### 5.3 Implementation Steps

#### 5.3.1 State shape: `lastAddedPointIndex`

- Extend the unlimited point and polygon `InteractiveGraphState` shapes with `lastAddedPointIndex: number | null` (initial value `null`).
- Update `initializeGraphState` for these types.

#### 5.3.2 Reducer cases

- `ADD_POINT` — set `lastAddedPointIndex` to `coords.length - 1` after the append.
- `MOVE_POINT` — if `action.index === lastAddedPointIndex` and the new coords are not `[0, 0]`, clear to `null`.
- `REMOVE_POINT` — if `action.index === lastAddedPointIndex`, clear to `null`. Otherwise, decrement `lastAddedPointIndex` if removed index is below it.
- Document the invariant: `lastAddedPointIndex === null` ⟺ no recently-added point sitting at the origin.

#### 5.3.3 Button gating

- In the point and polygon control renderers, compute `disabled = lastAddedPointIndex !== null && coordsEqual(coords[lastAddedPointIndex], [0, 0])`.
- Wire `disabled` and `aria-disabled` to the Add Point button. Add an `aria-describedby` pointing at a hidden `srAddPointDisabledHint` element so SR users hear the reason.

#### 5.3.4 Announcement (optional)

- Decide during implementation whether to also `announce(strings.srAddPointDisabledHint)` when the user *attempts* to click a disabled button. Default: don't — the disabled-state announcement on focus is sufficient and avoids extra chatter.

### 5.4 Tests

- Reducer tests: `ADD_POINT` sets the index; `MOVE_POINT` off origin clears it; `MOVE_POINT` to origin (rare) keeps it; `REMOVE_POINT` clears appropriately.
- Component test: Add Point button is `disabled` and `aria-disabled` when conditions are met; enabled otherwise.
- SR matrix: the disabled-state announcement is sane on focus.

### 5.5 Rollout / Flag

Under Phase 2's flag — Action Bar grouping ships there, and the disable rule is best landed on top of the same gated rollout.

### 5.6 Risks

- **Origin as a legitimate answer location.** If a question expects a point at `(0, 0)` and the user adds a second point, they'll be blocked. Mitigation: the rule only blocks adding a *second* point while the first is at origin — once moved, they can add the second back at origin. Document this nuance in the editor authoring docs.
- **Reset semantics on undo / remove** — if the user removes the tracked point, `lastAddedPointIndex` must reset; if undo is added later, the tracking needs to participate.
- **SR users not knowing why button is disabled** — mitigated by `aria-describedby` + the hint string. Verify on the SR matrix.

---

## Phase 6: Per-Graph Copy Fixes (UXR-Derived)

**Tickets:** LEMS-2971 (umbrella) + per-graph child tickets to be filed
**Implements:** "UXR-derived requirements (Phase 1 quality notes)" from sr-research.md
**Depends on:** Phase 1 (uses Announcer for "moved" messages); coordinates with Phase 4 for the "Point T" fix on point/polygon

### 6.1 Scope

Per-graph copy fixes broken out by graph type, each independently shippable as a small PR under the LEMS-2971 umbrella. Each subsection below is one PR (or a small stack within a PR if related fixes share files).

These are the items called out in research as "math-heavy or graph-specific" — i.e., they belong in `useGraphAnnouncer` per OQ3's routing rule, not in the central handler.

### 6.2 Linear / Segment / Circle — "moved" Announcement

**Problem:** today these announce only the *current* state, not that the element moved. UXR feedback.

**Fix:** in each of `linear.tsx`, `segment.tsx`, `circle.tsx`, replace the generic Phase-1 "moved" string with type-aware copy via `useGraphAnnouncer`:

- Linear: include slope/intercept where useful — `"Line moved. Slope is now 2; y-intercept at (0, 3)."`
- Segment: include endpoints and length — `"Segment moved. From (1, 2) to (4, 6); length 5."`
- Circle: distinguish radius point vs. center — `"Center moved to (3, 4)."` vs. `"Radius is now 5."`

Per-graph reuses `getSlopeStringForLine`, `getInterceptStringForLine`, `vec.dist`. Stays out of `central-announcer.ts` per the routing-rule canary.

### 6.3 Circle — Drag Handle vs. Boundary Point Distinction

**Problem:** circle currently presents the non-interactive boundary points as if they were interactive. Confuses SR users.

**Fix:** in `circle.tsx`, mark non-interactive boundary visualizations with `role="presentation"` (or simply omit them from the SR tree); confine `role="button"` and the focusable handle to the actual drag handle (radius point + center).

### 6.4 Linear System — Intersection Phrasing

**Problem:** "intersection point" overloads "point" — collides with the interactive movable points.

**Fix:** in `linear-system.tsx`, rephrase the intersection description to use unambiguous wording (e.g., "lines intersect at (x, y)" or "intersection location: (x, y)") that doesn't conflate with movable-point terminology.

### 6.5 Polygon — No Vertex Enumeration on Group Focus

**Problem:** when the whole-polygon group is focused, every vertex is enumerated, which is verbose and not what the user wanted.

**Fix:** in `polygon.tsx`, when the group itself receives focus (vs. an individual vertex), produce a confirmation-only label (e.g., "Polygon, 5 vertices") rather than reading every coordinate. Per-vertex labels still apply on individual focus.

### 6.6 Sinusoid — Extremum / Midline / Max / Min Label Re-evaluation

**Problem:** sighted users don't see "extremum" / "midline" labels, but SR users do — UXR flagged the inconsistency.

**Fix (pending design):** decide whether to expose these labels for SR or hide them. In `sinusoid.tsx`, conditionally include the labels based on the design decision. Coordinate with Caitlyn before implementing.

### 6.7 Tests

- Per-graph component test: assert `announceMessage` is called with the type-aware string after the relevant action.
- jest snapshot-style tests for each new copy variant.
- SR-matrix manual verification — but per-graph, not the full matrix every PR.

### 6.8 Rollout / Flag

Each fix is an independent small PR; **no shared flag.** Each PR is reviewable and revertible on its own.

### 6.9 Risks

- **Copy churn during design review** — each PR may go through 1–2 rounds of copy iteration; build slack into the timeline.
- **Re-running QA per graph type** — there are 6+ graph types in scope; lead with Caitlyn-led iteration, with Darrell as final sign-off, and bundle his sign-off across the umbrella to be efficient with his time.
- **Math-utility growth** in `useGraphAnnouncer` callers — keep the routing-rule canary in mind: utility functions belong in `screenreader-text.ts` or a per-graph helper, not in the announcer module.

---

## Cross-Cutting Concerns

### Feature Flag Strategy (Detail)

| Flag (proposed) | Phase(s) | Default | Flip criteria | Rollback |
|-----------------|----------|---------|---------------|----------|
| `interactive-graphs-sr-phase-2` | 2, 3, 5 | off | (1) Full SR matrix pass; (2) no axe-core regressions; (3) Darrell sign-off on copy and entry/exit experience; (4) no Sentry spikes from new keyboard handlers. | Flag off. Phase 1 changes are unflagged and remain in effect. |
| `perseus-editor-point-labels` | 4 (editor side only) | off | (1) Editor integration tests pass; (2) authoring team trained on when to use the field. | Flag off; authors revert to default labels. |

Final flag names confirmed with platform team during Phase 2 implementation. Cadence per environment: dev (immediate) → staging (1 week soak) → 5% prod (1 week) → 25% (1 week) → 100%.

### SR Test Matrix

Every phase that touches user-facing SR behavior runs against this matrix before its flag flips:

| SR | Browser | OS |
|----|---------|----|
| NVDA | Chrome | Windows |
| NVDA | Firefox | Windows |
| JAWS | Chrome | Windows |
| JAWS | Edge | Windows |
| VoiceOver | Safari | macOS |

**"Verified" = ** golden path *and* edge cases per phase, plus any UXR-flagged pain points; confirmed by Darrell or designated tester. A run produces a short writeup (Storybook URL + SR + verdict + any divergences) attached to the PR.

Mobile SR (TalkBack on Android, VoiceOver on iOS) is **out of scope** per the deferred section — tracked under [LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949).

### Copy Review Process

To be efficient with Darrell's time — he is a shared SR-testing resource across the org — copy iterates first with Caitlyn (designer), and Darrell is engaged for **final sign-off**, not for round-by-round wordsmithing. Hand him a finished package, not work-in-progress drafts.

- **Caitlyn (designer)** — leads. Owns initial copy drafts, iterates on tone and clarity, runs internal review with the implementation team. Most rounds happen here.
- **Darrell (SR tester)** — signs off. Engaged once per phase (or once per umbrella batch in Phase 6) on final-form copy against the integrated implementation, not per draft.
- **Cadence per phase:**
    1. Implementation team drafts initial copy from `screen-reader-research.md` and the designer's spec.
    2. Caitlyn reviews and iterates with the team until the copy reads well and matches design intent.
    3. Darrell does a single SR-pass review of the final-form copy against the implementation on the test-everything page (with the relevant feature flag on).
    4. Address any blockers from Darrell, then merge.
- **Artifacts shared with Darrell at sign-off:** test-everything page link with the relevant feature flag turned on + a short screen capture of an SR pass + the proposed string text in plain English.
- **Decision authority:** Caitlyn owns design intent and visual / sighted-user copy; Darrell signs off on whether the final copy works for SR users; product owns whether the authoring story is realistic.
- **Phase 2 specifically:** largest copy surface (instructions + warning + repeat hint + entered/exited + Action Bar label). Put Darrell's sign-off slot on the calendar early so it isn't a blocker at merge time — but do not engage him until Caitlyn has signed off.

### aria-live ↔ Announcer Paired Migration Constraint

Restated from sr-research.md OQ3, with reviewer-checklist form for Phase 1 PRs (and any later phase that introduces new Announcer call sites alongside legacy aria-live):

> **Every PR that adds an `announce(...)` call for a previously-aria-live event must, in the same change:**
>
> 1. Add the `announce(...)` (centrally or per-graph, per the OQ3 routing split).
> 2. Stop the corresponding `setXxxAriaLive("polite")` toggle that previously triggered the SR re-read.
> 3. Update tests that pinned the old aria-live behavior so they assert the new Announcer behavior instead (e.g., `expect(announceMessage).toHaveBeenCalledWith(...)`).

A reviewer who sees a new `announce(...)` call without a matching aria-live removal should treat it as a blocker — that's the invariant Phase 1 establishes.

### Localization

- **String location:** new strings go in `packages/perseus/src/strings.ts`. The corresponding TypeScript `PerseusStrings` type updates in lockstep.
- **Interpolation:** all numeric values flow through `srFormatNumber` (which handles π-multiples, locale-aware decimals, and the math-character labeling table from SRUX).
- **ICU plurals:** any string with variable cardinality (e.g., "5 vertices" vs. "1 vertex") uses ICU plural form, not English-pluralization-by-string-concat.
- **RTL:** new instructions are long; verify rendering in at least one RTL locale (Arabic) for word-order issues. Embedded code-style tokens (e.g., "Insert + I", "Shift + Enter") stay LTR even in RTL contexts.
- **Author-supplied strings** (`pointLabels` from Phase 4) are the author's responsibility to localize, same as `fullGraphAriaLabel` today. Document this in the editor UI helper text.

### `role="figure"` → `role="application"` Fallback Decision Point

This is the single in-flight decision Phase 2 owns and may need to flip during implementation.

- **Owner:** Phase 2 implementation lead.
- **Trigger:** SR-matrix testing of `role="figure"` shows that any of NVDA / JAWS / VoiceOver suppresses announcements of the interactive children when focus enters the graph.
- **Action:** change the role on the outer `mafs-graph` View from `role="figure"` to `role="application"`. Update the corresponding Phase 2 tests. Update the Decisions Log in this plan and the OQ6a entry in `screen-reader-research.md` (note the flip with date and the SR/browser combo that triggered it).
- **Side effect of flipping:** `role="application"` also nudges SRs into Forms / Focus mode, which connects to OQ2b — the mode-toggle warning in the instruction text becomes less load-bearing (but still useful for users who are already in Browse mode when they encounter the graph).
- **⚠️ Implementation cost — read before flipping.** `role="application"` is much more than a label change. It tells assistive technology to stop intercepting browser-level events and to treat the entire region as a custom widget, which means the SR stops providing the built-in HTML accessibility behaviors we currently rely on (default focus announcements, Tab / landmark / heading navigation, automatic semantic announcements for interactive controls inside the region). Falling back to `role="application"` therefore obligates us to **re-invent those affordances ourselves** in the interactive-graph widget — manually announcing focus changes, manually exposing structural navigation, and manually reproducing any role-driven behavior that today comes free from the platform. Treat the fallback as a non-trivial commitment, not a flag flip. If you reach this trigger, plan and scope follow-up work to rebuild the suppressed accessibility surface before you ship the role change. Detail in `screen-reader-research.md` OQ6a.
- **Exit ramp:** documented in the commit message and this plan; no code rollback needed if the flip happens before the flag flips.

### Documentation Updates

- `__docs__/a11y.mdx` for `interactive-graphs/` — updated each phase to describe new behavior, the Announcer module, the OQ3 routing rule, the focus trap, and the on-demand instruction shortcut.
- Storybook a11y stories — add or update one per migrated graph and one per Phase 2 flow (entry, repeat, exit). Each story includes a "How to verify in NVDA / JAWS / VoiceOver" comment.
- Cross-link from this plan back to the ticket descriptions as PRs land.
- `CLAUDE.md`: if any new file convention emerges (e.g., the `announcer/` module's pure-handler pattern is worth documenting for future widget work), add a short note under "Common Development Patterns".

---

## Deferred / Out of Scope

Restated from `screen-reader-research.md` for plan readers — the spike doc is authoritative.

- **Mobile screen reader support** ([LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949)) — VoiceOver / TalkBack on touch needs a separate spike (gesture conflicts).
- **Locked-figure focus order** (Phase 1 quality note) — separate spike; touches the locked-figures system more broadly.
- **Content-side fixes** — re-authoring questions whose meaning depends on inaccessible background images. Content team owns.
- **Removing Ctrl + Shift + Arrow** ([LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003), [LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736)) — deferred per OQ2b decision A. Revisit as a separate effort if production SR feedback shows the friction is materially worse than expected.
- **Graph-type-specific copy review beyond the items in Phase 6** — sinusoid extremum, segment slope direction, polygon translation announcement nuance. Each needs design + content sign-off; tracked under LEMS-2971.

---

## Open Implementation-time Questions

Aggregated from per-phase subsections — living list, not a roadblock to starting Phase 1.

- **Phase 1 (1.2):** Do `linear-system.tsx` and `ray.tsx` carry source-side aria-live toggles, or only test-side assertions? Decides whether they're paired-migration targets in Phase 1 or copy fixes in Phase 6.
- **Phase 1 (1.3.7):** Do graph-entered / graph-exited announcements route through reducer actions or directly via `useGraphAnnouncer` from the focus handler? Phase 2 picks at the start of implementation.
- **Phase 2 (2.7):** Final wording of all new strings, especially the mode-toggle warning sentence and whether it names specific SR toggle keys (JAWS Insert + Z, NVDA Insert + Space). Owner: Caitlyn & Darrell.
- **Phase 2 (2.7):** Whether on-entry instructions list both Insert + I and Fn + Enter + I, or only the platform-relevant one.
- **Phase 2 (2.7):** Final platform-detection signal for the Insert + I vs. Fn + Enter + I dual binding.
- **Phase 3 (3.7):** Whether static graphs get the "nothing to move" treatment. Pending design.
- **Phase 5 (5.3.4):** Whether to additionally announce the disabled-button hint on click attempt, or rely on the focus-time announcement.
- **Phase 6 (6.6):** Whether to expose sinusoid extremum / midline / max / min labels for SR users at all. Pending design.
- **Cross-cutting:** Final feature-flag names confirmed with platform team during Phase 2.

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

- **File new tickets:**
    - Phase 4 editor-UI ticket (child of LEMS-3995 if appropriate, otherwise standalone).
    - Phase 5 Add Point disable rule.
    - Phase 6 per-graph children under LEMS-2971 (one per planned PR in 6.2–6.6).
- **Schedule Caitlyn (copy lead) and Darrell (final sign-off) cadence** — get both plugged in before Phase 2 string work starts; Phase 2 has the longest copy review surface.
- **Update implementation tickets** (LEMS-3206, LEMS-3205, LEMS-3943, LEMS-3995, LEMS-2681) with links to this plan and to their respective phase sections.
- **Walk this plan through with the team** — lead engineer, designer (Caitlyn), accessibility reviewer (Darrell), PM. Capture any redirections back into the relevant section before kickoff.
