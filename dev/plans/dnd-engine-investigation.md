# Drag-and-Drop Engine Investigation (Operation Dragon Drop)

> **Status:** investigation / decision-pending. Choosing the drag-and-drop engine
> for the Operation Dragon Drop (ODD) widget family — Fill in the Blank first, then
> Categorizer / Composer / Sorter. No engine adopted yet.

## At a glance

**Where we landed:** the field is narrowed to **two finalists**. Provisional lean
is **`@dnd-kit/core` + `@dnd-kit/sortable`**; the final pick comes from a
timeboxed spike (§9) scored against the rubric in §9.2.

| Standing | Option | One-line reason |
| --- | --- | --- |
| ⭐ **Finalist** (front-runner) | **`@dnd-kit/core` + `@dnd-kit/sortable`** | Covers the whole family — incl. ordering + animations — in a small, self-contained, scoped dependency. |
| ⭐ **Finalist** (leanest) | **`@use-gesture/react` + ~600–1,100 LOC** | Already in Perseus (**+0 deps**); but we build drop-targets, ordering, and animations ourselves. |
| ▽ Weak third | `react-dnd` | Frontend already ships it, but on old **v14**, **HTML5-only (no touch)**, with no shared provider — see §6. |
| ✘ Ruled out | Pragmatic · React Aria · hello-pangea · SortableJS · native HTML5 · legacy jQuery · react-beautiful-dnd | Touch, footprint, a11y, or deprecation — see §3.3. |

**Settled** (no spike needed): the requirements (§2), the candidate field (§3),
and the dependency/browser/SR/test facts (§10).
**Still to resolve:** real-device touch (the **hard gate**, §9.1), the
menu-driven-keyboard assumption (design/a11y, §2), and measured bundle size (CI).

---

## 1. Constraints

- **Free / OSS only.** No paid packages.
- **Perseus is deliberately lean** — 5 external runtime deps today
  (`@use-gesture/react`, `gifuct-js`, `mafs`, `tiny-invariant`, `uuid`). A DnD
  dependency should add drag-and-drop and little else; packages that pull in redux
  stores or whole component/a11y frameworks are a poor fit.
- **Perseus uses a peer-dependency model** — React, all of Wonder Blocks, jQuery,
  aphrodite, etc. are `peerDependencies` provided by the consumer (webapp). A DnD
  library webapp already ships could be consumed the same way (see §6).
- **Mobile-first** — reliable **touch** drag is a hard requirement.
- **Supported browsers:** Chrome ≥ **v132**, Safari ≥ **v16.6** (per the
  [Browser Support](https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/103612417/Browser+Support)
  page). Both fully support Pointer Events, `touch-action`, and `elementFromPoint`,
  so a Pointer-Events-based engine needs **no legacy fallback**.
- **Accessibility *behaviors* are specified by the design docs** — the ODD
  Overview explicitly requires an **Actions Menu** on each tile for keyboard /
  screen-reader users ("drag and drop interactions are not available to
  keyboard-only or screen reader users"), plus aria-live announcements,
  focus-return, SR labels, and ordered-list semantics. **Screen readers are tested
  manually** per
  [ADR #514](https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/1849524239/ADR+514+Update+screen+reader+browser+combinations+to+test+web+user-facing+changes)
  (VoiceOver+Safari prioritized; JAWS+Chrome, NVDA+Chrome, JAWS+Edge).
  - *Inference, not a verbatim constraint:* because those moves go through our own
    Actions Menu + aria-live, we'd implement a11y ourselves and an engine's
    built-in keyboard sensor is largely moot (§2). This is the "menu-driven
    reframe" still to be confirmed with design/a11y (§9).

## 2. The key reframe: what the engine must do vs. what we own

The design docs specify a **menu-driven** keyboard / screen-reader UX (the
Overview mandates an **Actions Menu** — "Move to Blank N" / "Clear" — because drag
isn't available to those users), with moves announced via an **aria-live region**.

> **On the announcer:** the design docs *propose / recommend* the Wonder Blocks
> Announcer (`@khanacademy/wonder-blocks-announcer`) for this — the FITB page
> "proposes" it for read-aloud and the Overview says the announcer "should"
> announce moves. It is **not a hard mandate**: the requirement is an aria-live
> announcement, and WB Announcer is simply the convenient option already in the
> tree (used by interactive-graphs / radio / free-response / graded-group). Any
> aria-live mechanism satisfies it. **This is engine-independent either way.**

**Consequence (our inference, pending design/a11y sign-off):** if the Actions Menu
fully covers keyboard/SR needs, a library's built-in keyboard sensor and drag
announcements — the headline feature of dnd-kit and React Aria — are **largely
irrelevant to us**, and the engine's real job is just the pointer/touch side.

**The engine must cover the needs of the whole ODD family** (FITB, Categorizer,
Composer, Sorter — Scale / Timeline / Sentence variants). "Req #" maps to the
originally-listed needs; "Source" notes specs that add a requirement.

| ID | Requirement | Widget(s) | Req # / Source |
| --- | --- | --- | --- |
| N1 | Pointer / mouse drag | all | baseline |
| N2 | **Touch drag (mobile)** | all | #7 |
| N3 | Single-card drop zone; replacing a card returns the old one to the bank (**swap → bank**) | FITB, Sorter Scale/Timeline | #4 |
| N4 | Drop zone that accepts **multiple cards** | Composer, Sorter Sentence, Categorizer | #5 |
| N5 | **Ordered positional insertion** — drop *between* cards at a specific index (others separate to accept it) | Composer, Sorter Sentence, Categorizer | #2 |
| N6 | **Reorder cards within a zone** (up / down / to start / to end) and within the bank | Composer, Sorter Sentence, Categorizer | #3 |
| N7 | **Action-menu move** — a button on the card sends it to a specific zone/position with no drag | all | #1 |
| N8 | **Displacement on occupied slot** — tiles shift down a column; if full, the last returns to the bank (distinct from N3 swap) | Categorizer | spec |
| N9 | **Per-zone capacity limits** (Composer 4 rows; Categorizer auto blank count) | Composer, Categorizer | spec |
| N10 | **Multi-use / clone tiles** — one source placed N times with a remaining-count; removing a placement replenishes it | FITB, Composer, Sorter Sentence | spec |
| N11 | Drag-over / active state on a target | all | #6 |
| N12 | Cancel/abort (Escape) + return-to-source on invalid drop | all | spec |
| N13 | Drop detection robust to **reflow** (504px breakpoint, legend reorientation, timeline stagger) | all (esp. FITB, Sorter) | spec |
| N14 | Arbitrary card content — **Text, TeX, Images, empty** | all | #8 |
| N15 | **A11y** — SR labels, aria-live announcements (move/swap/read-aloud), focus-return, ordered-list semantics | all | #6 |
| N16 | Responsive layout / orientation — *our concern, not the engine's*, but drop-detection must survive it | all | spec |

**We own regardless of engine:** keyboard moves (N7), aria-live announcements
(N15), focus management, multi-use bookkeeping (N10), and responsive layout (N16).
The engine's job is the pointer/touch mechanics (N1–N6, N8–N9, N11–N13).

### 2.1 FITB alone vs. the full family — the bar moves

**FITB only** is modest: single-card blanks + swap-to-bank (N3), no ordering.
Hand-rolling on `@use-gesture` is very attractive at that scope.

**The full family** adds ordered positional insertion (N5), reorder (N6),
displacement (N8), capacity limits (N9), and multi-use (N10) — i.e.
*sortable-list-within-a-drop-zone* semantics, including index-from-pointer math
and FLIP "tiles separate to make room" animations. Those are tedious and
bug-prone to hand-roll, and exactly what `@dnd-kit/sortable` provides. **So the
build-vs-adopt calculus flips with scope:** FITB-only favors build; the full
family favors adopt. The spike must evaluate against the *full family*.

## 3. Candidate landscape (free/OSS)

### 3.1 Finalists

| Option | License | Footprint | Touch | Why it's a finalist |
| --- | --- | --- | --- | --- |
| **[`@dnd-kit/core`](https://dndkit.com/)** + [`@dnd-kit/sortable`](https://github.com/clauderic/dnd-kit) | MIT | Small: `tslib`, `@dnd-kit/accessibility`, `@dnd-kit/utilities` (+ sortable) | ✅ `Pointer`/`TouchSensor` (stable 6.x) | Covers the full family incl. ordering/animations; scoped context (no app-root provider). **Front-runner.** Pin to stable 6.x; single-maintainer governance. |
| **[`@use-gesture/react`](https://use-gesture.netlify.app/)** + custom | MIT | **+0 — already a Perseus dep** | ✅ pointer events | Leanest; cleanest reflow handling; proven in-repo test pattern (§10). But we build drop-targets/ordering/animations (~600–1,100 LOC, §5). |

### 3.2 Weak third

| Option | License | Why only "weak" |
| --- | --- | --- |
| **[`react-dnd`](https://react-dnd.github.io/react-dnd/)** | MIT | Frontend already ships it (peer-dep alignment), **but** it's on old **v14**, **HTML5-backend only → no touch**, and there's **no shared provider** to reuse (§6). Touch + provider coupling outweigh the alignment. |

### 3.3 Ruled out (one line each)

| Option | License | Reason |
| --- | --- | --- |
| **[Pragmatic drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/)** | Apache-2.0 | **Tiny (~5KB, not a huge package)** — but built on native HTML5 DnD, which is **unreliable on touch** (§7). Ruled out on **touch**, not size. |
| **[React Aria DnD](https://react-spectrum.adobe.com/react-aria/dnd.html)** (Adobe) | Apache-2.0 | `@react-aria/dnd` pulls the **whole `react-aria` suite**, and introduces a parallel a11y framework overlapping Wonder Blocks. |
| **[`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)** | BSD-3 | Bundles its own **redux + react-redux** store (~30KB+); list-reorder model, wrong shape for inline blanks. |
| **[SortableJS](https://github.com/SortableJS/Sortable)** / [react-sortablejs](https://github.com/SortableJS/react-sortablejs) | MIT | **Poor a11y** — mouse/touch only. |
| **[Native HTML5 DnD](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)** | n/a | **No touch**; none of the ergonomics. |
| Legacy jQuery `sortable.tsx` (in-repo) | in-repo | Dated, reorder-only — and **we're trying to reduce jQuery, not add to it**. |
| [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) | ~~Apache-2.0~~ | **Deprecated & archived.** Use Pragmatic (successor) or hello-pangea (fork) instead. |

## 4. Finalist coverage (full family)

| Requirement | `@dnd-kit/core` (+ `sortable`) | `@use-gesture` + our code |
| --- | --- | --- |
| N1 pointer · N2 touch | ✅ (touch edge cases to tune) | ✅ |
| N3 single-card + swap→bank | ✅ `useDroppable` | ❌ we build |
| N4 multi-card zone | ✅ | ❌ we build |
| **N5 ordered positional insertion** | ✅ `@dnd-kit/sortable` | ❌ **we build index math + FLIP** |
| **N6 reorder within zone** | ✅ `arrayMove` | ❌ we build |
| N8 displacement on occupied slot | ✅ (sortable shift) | ❌ we build |
| N9 capacity · N10 multi-use | we enforce/orchestrate in state | we enforce/orchestrate in state |
| N11 over-state | ✅ `isOver` | ❌ we build |
| N12 cancel/return | ✅ `onDragCancel` | ⚠️ we build |
| N13 reflow-robust detection | ✅ (`pointerWithin` + remeasure) | ✅ `elementFromPoint` (live DOM) |
| N14 React content (Text/TeX/Image/empty) | ✅ | ✅ |
| Reorder/shift animations (FLIP) | ✅ built in | ❌ we build (or add a dep) |
| App-root provider required? | No (scoped `DndContext`) | No |

**Decisive rows: N5 / N6 / N8 + FLIP animations.** dnd-kit+sortable provides
ordered-list semantics; the `@use-gesture` route means hand-building
index-from-pointer math and the shift animations for Composer / Sorter Sentence /
Categorizer.

## 5. `@use-gesture` build estimate

`@use-gesture/react` provides pointer+touch (with activation `delay`/`threshold`
+ tap filtering). The rest we build:

| Piece | What it does | Rough size |
| --- | --- | --- |
| `DragProvider` / context | Tracks active item, pointer position, current droppable | ~80–150 LOC |
| `useDraggable` wrapper | Wraps `useDrag`; emits start/move/end | ~60–100 LOC |
| `useDroppable` | Registers a blank's element + id | ~30–50 LOC |
| Hit-testing | `elementFromPoint` → `closest('[data-droppable]')` on move | ~30 LOC |
| Drag preview | Positioned clone following the pointer | ~50–80 LOC |
| Cancel/return | Escape listener + return-to-source | ~30 LOC |
| Touch hardening | `touch-action: none`, scroll suppression, activation tuning | scattered + **real-device QA** |

**≈ 350–600 LOC for FITB only.** The full family adds **+200–400 LOC** for N5/N6/N8
(index math + FLIP) plus ~50–100 LOC for N10 multi-use → **~600–1,100 LOC** at
family scope. The real cost is owning cross-device touch QA *and* the
sortable/animation surface.

**Animation caveat:** Perseus has **no animation library** (no
react-spring/framer-motion). `@dnd-kit/sortable` ships the FLIP animations built
in; the `@use-gesture` route needs a **hand-rolled FLIP or another new dependency**
— cutting against its "+0 deps" pitch. A real point in dnd-kit's favor for the
family.

## 6. The webapp / `react-dnd` consideration

webapp already depends on `react-dnd`, and Perseus's `peerDeps`/`devDeps` catalogs
are **generated from khan/frontend's** `pnpm-workspace.yaml` (via
`utils/sync-dependencies.ts`), so a peer dep there is architecturally aligned with
Perseus — appealing on paper. **But pulling the actual frontend config undercuts
it:**

- Frontend is on **`react-dnd@14.0.3`** + **`react-dnd-html5-backend@14.0.1` only**
  — an old major (current is 16.x), and **HTML5 backend = no touch**. Adding a
  touch/multi-backend means new packages **not** in frontend's catalog — breaking
  the very alignment that was the advantage.
- `DndProvider` is mounted in **~14 feature-local spots, almost all in
  `apps/devadmin`** (editors) plus a couple of upload modals. **No shared app-root
  provider** on the learner-facing surface where Perseus renders — so Perseus would
  mount its own anyway, and `perseus-editor` (running inside devadmin) risks a
  "two HTML5 backends" conflict.

**Verdict:** react-dnd is a **weak third** for learner-facing widgets — old major,
touch-less backend, no shared provider. The peer-dep alignment is real but doesn't
outweigh those.

## 7. Bug / limitation references

**Pragmatic — touch is a structural weakness** (native HTML5 DnD); architectural,
not "will-be-fixed":

- [Discussion #93 — Mobile/Touch support?](https://github.com/atlassian/pragmatic-drag-and-drop/discussions/93)
- [#204 — draggable isn't working on touchscreen](https://github.com/atlassian/pragmatic-drag-and-drop/issues/204)
- [#112 — Android + Chrome 128 not working](https://github.com/atlassian/pragmatic-drag-and-drop/issues/112)
- [#124 — manually trigger iOS touch drag start](https://github.com/atlassian/pragmatic-drag-and-drop/issues/124)
- [#12 — Windows touch screen](https://github.com/atlassian/pragmatic-drag-and-drop/issues/12)
- [#52 — doesn't work in Chrome DevTools device mode](https://github.com/atlassian/pragmatic-drag-and-drop/issues/52)

**dnd-kit — touch works but has tunable edge cases** (not disqualifying):

- [#435 — PointerSensor on touch devices](https://github.com/clauderic/dnd-kit/issues/435)
- [#1955 — drag doesn't start on some Android (Samsung); works on iOS](https://github.com/clauderic/dnd-kit/issues/1955)
- [#272 — mobile loses scroll inside scrollable container](https://github.com/clauderic/dnd-kit/issues/272)
- [#453 — touch + delay activation + `touch-action: auto` conflict](https://github.com/clauderic/dnd-kit/issues/453)
- [#1723 — experimental `@dnd-kit/react` rewrite dropped the TouchSensor](https://github.com/clauderic/dnd-kit/issues/1723)
- [#1194 — future of library & maintenance (single-maintainer governance)](https://github.com/clauderic/dnd-kit/issues/1194)

## 8. Action Menu on draggable cards (drag-handle pattern)

The designs put an Actions Menu button **inside** each draggable tile; the classic
failure mode is the button swallowing clicks as drags. Both finalists avoid it by
separating "what drags" from "where you grab":

- **dnd-kit:** spread `useDraggable`'s `listeners` on **only the grip handle**
  (the `⠿` icon); the rest of the card — including the Actions Menu button —
  receives normal clicks/taps/keyboard.
  ([drag-handle docs](https://docs.dndkit.com/api-documentation/draggable/usedraggable#drag-handle))
- **`@use-gesture`:** bind the gesture to the grip ref only — same result.

Keyboard/SR moves go through the Actions Menu (not a drag keyboard sensor), so
there's no conflict for keyboard users. The "menu appears on hover/focus, hidden
when placed" behavior is plain CSS/conditional rendering. **This requirement does
not separate the finalists.**

## 9. How we'll decide

1. **Confirm the menu-driven keyboard reframe** (§2) with design/a11y.
2. **Throwaway spike** of the two finalists against the §9.1 scenarios — full
   family, not just FITB. Same engineer, timeboxed. (dnd-kit arm needs
   `@dnd-kit/sortable`.)
3. **KA-specific checks:** Wonder Blocks / design-systems input; new-prod-dep
   process; RTL + mobile-webview smoke test.
4. **Output: an ADR** recommending one engine, with the §9.2 scorecard filled in.

### 9.1 Spike scenario pass/fail criteria

Each scenario is **pass / partial / fail** per engine; capture a one-line note.

| # | Scenario | Pass criterion |
| --- | --- | --- |
| S1 | Inline blank in wrapping text across 504px (N13) | Drop lands in the correct blank after reflow. |
| S2 | Swap on an occupied single-card blank (N3) | New card placed; old returns to bank; one announcement. |
| S3 | Ordered positional insertion between cards (N5) | Lands at the pointer's index; neighbors animate apart. |
| S4 | Reorder within a zone (N6) | Drag *and* Actions Menu moves agree. |
| S5 | Displacement in a full Categorizer column (N8/N9) | Others shift down; last returns to bank; capacity enforced. |
| S6 | Multi-use tile placed twice (N10) | Source decrements; removing a placement replenishes it. |
| S7 | TeX tile + image tile (N14) | Render correctly while dragging and placed. |
| S8 | **Touch drag on a real device** (N2) | Reliable drag+drop on iOS Safari **and** Android Chrome; no scroll/long-press conflict. |
| S9 | Actions Menu button inside the card (N7) | Click/keyboard works; never triggers a drag. |
| S10 | Focus-return + announcement after a move (N15) | Focus returns per spec; correct SR announcement. |

**Hard gate:** an engine that only reaches "partial" on **S8 (real-device touch)**
is disqualified for learner-facing widgets, regardless of other scores.

### 9.2 Weighted scorecard

Score each finalist 1–5 per criterion × weight; sum; apply the S8 gate.

| Criterion | Weight |
| --- | --- |
| Real-device touch reliability (S8) | 5 (gating) |
| Full-family fit (S3–S6) | 4 |
| Footprint / lean fit (deps, bundle, no app-root provider) | 4 |
| Reflow-robust hit-testing (S1) | 3 |
| Testability in jsdom + Storybook | 3 |
| Integrates with our a11y layer (Actions Menu + aria-live; S9/S10) | 3 |
| Maintenance / governance (longevity, license) | 2 |
| Animation support (FLIP, S3) | 2 |
| Implementation/maintenance cost (LOC we own) | 2 |

Decision rule: highest weighted total **after** the S8 gate; record the filled
scorecard in the ADR.

### 9.3 Fallback / exit

- **`@dnd-kit`** fails the S8 gate after tuning → fall back to **`@use-gesture` +
  custom** (proven touch + in-repo test pattern), accepting the higher LOC.
- **`@use-gesture`** proves too costly on N5/N8 → fall back to
  **`@dnd-kit` + `@dnd-kit/sortable`**.
- **`react-dnd`** is revisited only if both fail *and* webapp's provider/touch
  story turns out clean (§6) — unlikely given v14 / HTML5-only / no provider.

## 10. Desk-confirmed facts (no spike needed)

- **dnd-kit versions:** stable **`@dnd-kit/core` 6.3.1** + **`@dnd-kit/sortable`
  10.0.0** (self-contained). The rewrite **`@dnd-kit/react` is still `0.5.0`**
  (pre-1.0, churning beta) → pin to stable core+sortable, avoid the rewrite.
- **`@use-gesture/react` already a Perseus prod dep** (`^10.2.27`) → the
  build-on-`@use-gesture` route adds **zero** new dependency.
- **Dependency mechanism:** `peerDeps`/`devDeps` catalogs are generated from
  khan/frontend; bundled prod deps go directly in `package.json`;
  `minimumReleaseAge` = 3 days. → react-dnd would be a frontend-synced peer dep;
  dnd-kit/`@use-gesture` are self-contained prod deps (no frontend coordination).
- **Clean slate:** no dnd/gesture/sortable in any Perseus catalog; **zero Adobe /
  react-aria deps**; **WB Announcer already available** (but optional, §2).
- **khan/frontend's react-dnd:** **`react-dnd@14.0.3`** + **html5-backend only**;
  `DndProvider` in ~14 feature-local spots (mostly devadmin), **no shared
  learner-app provider** (§6).
- **In-repo precedents:** drag is **already testable in jsdom**
  (`use-draggable.test.tsx`, `fireEvent.mouseDown/mouseMove` + `userEvent`); **RTL
  infra exists** (`rtlDecorator`, `:dir(rtl)`); **legacy `sortable` used only by
  `sorter.tsx` + `matcher.tsx`** (bounded migration).

## 11. Gaps & next steps

**Resolved** — browser baseline (Chrome 132 / Safari 16.6, no fallback needed);
SR validation is manual per ADR #514.

**Open — high value:**
- **Testing strategy.** jsdom pattern exists (`use-draggable.test.tsx`); open parts
  are replicating it for dnd-kit's `PointerSensor` and deciding Storybook
  play/visual-regression coverage. (The old jQuery Sorter has *no* drag test, so
  this is net-new rigor.)
- **Animation approach.** No animation lib in Perseus; the `@use-gesture` route
  needs hand-rolled FLIP or a new dep (§5). Confirm in the spike.
- **Spike DoD** — owner + timebox; results recorded against §9.2.

**Open — medium value:**
- **Mobile native-webview specifics** — iOS long-press → text-selection/callout
  during drag; `apiOptions.isMobileApp` / `file://`. Spike + mobile team.
- **Legacy-jQuery migration** — bounded to `sorter.tsx` + `matcher.tsx`; define the
  coexistence/migration path.
- **RTL** — reuse existing `rtlDecorator`/`dir` infra; verify drag direction,
  keyboard, announcer (spike smoke test).

**Open — low value:**
- **Measured bundle size** — npmjs + bundlephobia were network-blocked here; measure
  locally / via a CI size-limit check.
- **SSR / hydration** smoke check — no self-SSR in `packages/perseus/src`; confirm
  no `window`/`document` at module load. Low risk.
