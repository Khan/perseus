# Drag-and-Drop Engine Investigation (Operation Dragon Drop)

> Status: investigation / decision-pending. Purpose: choose the drag-and-drop
> engine for the new Operation Dragon Drop (ODD) widget family — Fill in the Blank
> first, then Categorizer / Composer / Sorter. No engine has been adopted yet;
> this doc frames the decision and the spike that resolves it.

## 1. Constraints

- **Free / OSS only.** No paid packages.
- **Perseus is deliberately lean** — 5 external runtime deps today
  (`@use-gesture/react`, `gifuct-js`, `mafs`, `tiny-invariant`, `uuid`). A DnD
  dependency should add drag-and-drop and little else; packages that pull in
  redux stores or whole component/a11y frameworks are a poor fit.
- **Perseus uses a peer-dependency model** — React, all of Wonder Blocks, jQuery,
  aphrodite, etc. are `peerDependencies` provided by the consumer (webapp). A DnD
  library webapp already ships could be consumed the same way (see §6).
- **Mobile-first** — reliable **touch** drag is a hard requirement.
- **Accessibility is owned by us, not the engine** (see §2).

## 2. The key reframe: what the engine must do vs. what we own

ODD's keyboard / screen-reader UX is **menu-driven**, not arrow-key dragging.
Keyboard and SR users move tiles via the **Actions Menu** ("Move to Blank N" /
"Clear"), and results are announced via the **Wonder Blocks Announcer**
(`@khanacademy/wonder-blocks-announcer`, already a Perseus dep, already used by
interactive-graphs / radio / free-response / graded-group).

**Consequence:** a library's built-in keyboard sensor and drag announcements —
the headline feature of dnd-kit and React Aria — are **largely irrelevant to us**.
We will not use them. The engine's real job is the pointer/touch side.

**The engine must cover the needs of the whole ODD family** (Fill in the Blank,
Categorizer, Composer, Sorter — Scale / Timeline / Sentence variants). The table
below consolidates the explicitly-requested needs and the ones derived from the
widget specs. "Req #" maps to the originally-listed needs; "Source" notes specs
that add a requirement.

| ID | Requirement | Widget(s) | Req # / Source |
| --- | --- | --- | --- |
| N1 | Pointer / mouse drag | all | baseline |
| N2 | **Touch drag (mobile)** | all | #7 |
| N3 | Single-card drop zone; replacing a card returns the old one to the bank (**swap → bank**) | FITB, Sorter Scale/Timeline | #4 |
| N4 | Drop zone that accepts **multiple cards** | Composer, Sorter Sentence, Categorizer | #5 |
| N5 | **Ordered positional insertion** — drop *between* existing cards at a specific index (others separate to accept it) | Composer, Sorter Sentence, Categorizer | #2 (Composer/Sentence specs) |
| N6 | **Reorder cards within a zone** (move up / down / to start / to end) and within the bank | Composer, Sorter Sentence, Categorizer | #3 |
| N7 | **Action-menu move** — a button on the card sends it to a specific zone/position with no drag | all | #1 |
| N8 | **Displacement on occupied slot** — existing tiles shift down a column; if all blanks full, the last returns to the bank (distinct from N3 swap) | Categorizer | Categorizer spec |
| N9 | **Per-zone capacity limits** — reject/overflow beyond a max (Composer 4 rows; Categorizer auto blank count) | Composer, Categorizer | Composer/Categorizer specs |
| N10 | **Multi-use / clone tiles** — one source tile placed N times with a remaining-count; removing a placement replenishes the source | FITB, Composer, Sorter Sentence | Overview / Composer specs |
| N11 | Drag-over / active state on a target | all | #6 area |
| N12 | Cancel/abort (Escape) + return-to-source on invalid drop | all | spec |
| N13 | Drop detection robust to **reflow** (504px breakpoint, legend reorientation, staggered timeline) | all (esp. FITB, Sorter) | specs |
| N14 | Arbitrary card content — **Text, TeX, Images, empty** | all | #8 (+ specs add TeX/empty) |
| N15 | **A11y** — SR labels, WB Announcer (move/swap/read-aloud), focus-return after a move, ordered-list semantics, column-header announce | all | #6 |
| N16 | Responsive layout / orientation (legend H↔V, timeline stagger, column stacking) — *our concern, not the engine's*, but engine drop-detection must survive it | all | specs |

**We own regardless of engine:** keyboard moves (Actions Menu, N7), SR
announcements (WB Announcer, N15), focus management, multi-use bookkeeping (N10),
and all responsive layout (N16). The engine's job is the pointer/touch mechanics
(N1–N6, N8–N9, N11–N13).

### 2.1 FITB alone vs. the full family — the bar moves

If we only had to ship **Fill in the Blank**, the requirements are modest:
single-card blanks + swap-to-bank (N3), no ordering, no reorder. Hand-rolling on
`@use-gesture` is very attractive at that scope.

But the family adds **ordered positional insertion (N5)**, **reorder within a zone
(N6)**, **displacement (N8)**, **capacity limits (N9)**, and **multi-use/clone
(N10)** — i.e. *sortable-list-within-a-drop-zone* semantics, including
index-from-pointer math and FLIP-style "tiles separate to make room" animations.
Those are exactly the parts that are tedious and bug-prone to hand-roll, and
exactly what `@dnd-kit/sortable` and `react-dnd`'s sortable model provide out of
the box. **So the build-vs-adopt calculus flips with scope:** FITB-only favors
build; the full family favors adopt. The spike should evaluate against the *full
family*, not FITB alone — otherwise we under-cost the hardest widgets.

## 3. Candidate landscape (free/OSS)

Dependency trees are from the latest published versions. Footprint matters
because of the lean-repo constraint (§1).

| Option | License | Footprint (runtime deps) | Touch | Discrete drop targets | Verdict |
| --- | --- | --- | --- | --- | --- |
| **[`@use-gesture/react`](https://use-gesture.netlify.app/)** ([repo](https://github.com/pmndrs/use-gesture)) | MIT | **+0 — already a Perseus dep** | ✅ pointer events | ❌ we build it | **Finalist.** Gesture layer only; we build R3–R7 (~350–600 LOC, §5). Leanest; cleanest reflow handling. |
| **[`@dnd-kit/core`](https://dndkit.com/)** ([repo](https://github.com/clauderic/dnd-kit)) | MIT | Small: `tslib`, `@dnd-kit/accessibility`, `@dnd-kit/utilities` | ✅ `TouchSensor` / `PointerSensor` (stable 6.x) | ✅ `useDroppable` | **Finalist.** Covers the full set, ~10KB, modular, scoped context (no app-root provider). Pin to stable 6.x; single-maintainer governance. |
| **[`react-dnd`](https://react-dnd.github.io/react-dnd/)** ([repo](https://github.com/react-dnd/react-dnd)) | MIT | `dnd-core` (bundles redux) + `@react-dnd/*` + a backend pkg | HTML5 backend lacks touch; needs touch/multi-backend | ✅ | **Finalist (conditional).** Reconsidered because **webapp already ships it** — as a peer dep, ~0 net webapp weight (§6). Cost: root `DndProvider`/backend coupling + touch-backend setup. |
| **[Atlassian Pragmatic drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/)** | Apache-2.0 | Tiny: `@babel/runtime`, `bind-event-listener`, `raf-schd` | ❌ **structural — native HTML5 DnD doesn't do touch** | ✅ | **Ruled out** on touch (see §7 bug refs). Smallest engine, but touch is a deal-breaker for mobile-first Perseus. |
| **[React Aria DnD](https://react-spectrum.adobe.com/react-aria/dnd.html)** (Adobe) | Apache-2.0 | **Large + conflict:** `@react-aria/dnd` → whole `react-aria` suite | ✅ | ✅ | **Ruled out.** Huge transitive tree, and introduces a parallel interaction/a11y framework overlapping Wonder Blocks (Perseus has zero Adobe deps; WB is not built on React Aria). |
| **[`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)** | BSD-3 | Heavy: `redux` + `react-redux` + `css-box-model` + … | ✅ | List-reorder model | **Ruled out.** Ships its own redux store (~30KB+); list-centric, wrong shape for inline blanks. |
| **[SortableJS](https://github.com/SortableJS/Sortable)** / [`react-sortablejs`](https://github.com/SortableJS/react-sortablejs) | MIT | No deps, ~640KB unpacked | ✅ | Swap/multi-drag plugins | **Ruled out.** Poor a11y — mouse/touch only. |
| **[Native HTML5 DnD](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)** | n/a | None | ❌ no touch | Manual | **Ruled out.** Same touch limitation as Pragmatic, none of the ergonomics. |
| Legacy jQuery `sortable.tsx` (in-repo) | in-repo | n/a | Partial | No (reorder-only) | **Ruled out.** Dated; removing jQuery is a longer-term goal. |
| [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) | ~~Apache-2.0~~ | — | — | — | **Excluded — deprecated & archived.** Use Pragmatic (successor) or `@hello-pangea/dnd` (fork). |

## 4. Finalist coverage

Evaluated against the **full family** (§2), not FITB alone.

| Requirement | `@dnd-kit/core` (+ `sortable`) | `@use-gesture` + our code | `react-dnd` (peer dep) |
| --- | --- | --- | --- |
| N1 pointer | ✅ | ✅ | ✅ |
| **N2 touch** | ✅ (own edge cases to tune) | ✅ | ⚠️ needs touch / multi-backend |
| N3 single-card + swap→bank | ✅ `useDroppable` | ❌ we build | ✅ |
| N4 multi-card zone | ✅ | ❌ we build | ✅ |
| **N5 ordered positional insertion** | ✅ `@dnd-kit/sortable` | ❌ **we build index math + FLIP** | ✅ (we write hover-index logic) |
| **N6 reorder within zone** | ✅ `@dnd-kit/sortable` (`arrayMove`) | ❌ we build | ✅ |
| N8 displacement on occupied slot | ✅ (sortable shift) | ❌ we build | ✅ |
| N9 capacity limits | we enforce in state | we enforce in state | we enforce in state |
| N10 multi-use / clone | we orchestrate in state (engine-agnostic) | we orchestrate | we orchestrate |
| N11 over-state | ✅ `isOver` | ❌ we build | ✅ |
| N12 cancel/return | ✅ `onDragCancel` | ⚠️ we build | ✅ |
| N13 reflow-robust detection | ✅ (`pointerWithin` + remeasure) | ✅ `elementFromPoint` (live DOM) | ✅ |
| N14 React content (Text/TeX/Image/empty) | ✅ | ✅ | ✅ |
| Reorder/shift animations (FLIP) | ✅ built in | ❌ we build | ⚠️ partial / we add |
| App-root provider required? | No (scoped `DndContext`) | No | **Yes (`DndProvider` + backend)** |
| Net bundle add to webapp | ~10KB (+small `sortable`) | 0 | ~0 (already shipped) |

The decisive rows are **N5 / N6 / N8 + FLIP animations**: dnd-kit (with
`@dnd-kit/sortable`) and react-dnd provide ordered-list semantics; the
`@use-gesture` route means hand-building index-from-pointer math and the
"tiles separate to make room" animations for Composer, Sorter Sentence, and
Categorizer.

## 5. `@use-gesture` build estimate (R3–R7)

`@use-gesture/react` provides R1/R2 (pointer + touch, with activation
`delay`/`threshold` + tap filtering). The rest we build:

| Piece | What it does | Rough size |
| --- | --- | --- |
| `DragProvider` / context | Tracks active item, pointer position, current droppable | ~80–150 LOC |
| `useDraggable` wrapper | Wraps `useDrag`; emits start/move/end, sets active item | ~60–100 LOC |
| `useDroppable` | Registers a blank's element + id into the context | ~30–50 LOC |
| Hit-testing | `elementFromPoint(x,y)` → `closest('[data-droppable]')` on move | ~30 LOC |
| Drag preview | Positioned clone following the pointer (`pointer-events: none`) | ~50–80 LOC |
| Cancel/return (R6) | Escape listener + return-to-source on invalid drop | ~30 LOC |
| Touch hardening | `touch-action: none`, scroll suppression, activation tuning | scattered + **real-device QA** |

**Total ≈ 350–600 LOC we fully own** (plus tests) — **for FITB only** (N3 swap
blanks). Tractable; for N13, `elementFromPoint` hit-tests the live DOM, so it is
inherently reflow-proof.

**The full family adds materially to this estimate.** N5 (ordered positional
insertion), N6 (reorder), and N8 (displacement) require index-from-pointer
computation among siblings plus FLIP-style shift animations — roughly **another
+200–400 LOC** of fiddly, animation-heavy code, which is precisely what
`@dnd-kit/sortable` / react-dnd give for free. Plus N10 multi-use bookkeeping
(engine-agnostic, ~50–100 LOC) regardless of choice. So the build route lands
nearer **~600–1,100 LOC** at family scope. **The real cost is owning cross-device
touch QA *and* the sortable/animation surface** — not the FITB line count.

## 6. The webapp / `react-dnd` consideration

webapp already depends on `react-dnd`. Because Perseus uses a peer-dependency
model (§1), Perseus could declare it as a peer dep and let webapp provide its
existing copy — **~0 net bundle weight for the primary consumer**, plus team
familiarity. Our a11y reframe (§2) also removes react-dnd's "manual a11y" demerit,
since we build a11y ourselves regardless.

It does **not** escape:

- **Touch:** HTML5 backend has no touch; needs `react-dnd-touch-backend` or a
  multi-backend — extra setup, dependent on webapp's backend choice.
- **Provider/backend coupling (the real issue for a library):** react-dnd needs a
  single root `DndProvider` + backend, and can't mount two backends of the same
  type. Perseus would either lean on webapp's root provider (coupling Perseus to
  the consumer's DnD setup/version) or nest its own (conflict risk). dnd-kit and
  `@use-gesture` impose nothing at the app root.
- **Other consumers** (Perseus Storybook, non-webapp consumers) must each provide
  it + a provider.
- **Maintenance posture:** mature but low-activity (~2022-era).

**Confirmed (desk check):** Perseus's `peerDeps`/`devDeps` catalogs are
*generated from khan/frontend's* `pnpm-workspace.yaml` (via
`utils/sync-dependencies.ts`) — Perseus deliberately mirrors frontend's versions.
So **react-dnd as a peer dep is architecturally aligned** (it would flow in
through the existing sync), whereas a bundled engine like dnd-kit/`@use-gesture`
is a self-contained Perseus prod dep added directly to `package.json` (no frontend
coordination).

**Confirmed from khan/frontend itself** (pulled via the GitHub token) — and it
undercuts the react-dnd case:

- Frontend is on **`react-dnd@14.0.3`** + **`react-dnd-html5-backend@14.0.1`
  only** — an old major (current is 16.x), and **HTML5 backend = no touch**.
  Getting mobile touch means adding `react-dnd-touch-backend`/multi-backend, which
  are **not** in frontend's catalog — breaking the "just sync from frontend"
  alignment that was react-dnd's main advantage.
- `DndProvider` is mounted in **~14 feature-local spots, almost all in
  `apps/devadmin`** (content/exercise/course/graphie editors) plus a couple of
  file-upload modals. **There is no shared app-root provider** on the
  learner-facing surface where Perseus renders, so Perseus would have to mount its
  own provider anyway — and `perseus-editor` (which runs inside devadmin) risks a
  "two HTML5 backends" nesting conflict.

**Verdict:** react-dnd drops from "close second" to a **weak option** for the
learner-facing ODD widgets — old major, touch-less backend, and no shared provider
to reuse. The peer-dep alignment is real but doesn't outweigh those.

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

- [#435 — PointerSensor doesn't work well on touch devices](https://github.com/clauderic/dnd-kit/issues/435)
- [#1955 — drag doesn't start on some Android (Samsung); works on iOS](https://github.com/clauderic/dnd-kit/issues/1955)
- [#272 — mobile loses scroll inside scrollable container](https://github.com/clauderic/dnd-kit/issues/272)
- [#453 — touch + delay activation + `touch-action: auto` conflict](https://github.com/clauderic/dnd-kit/issues/453)
- [#1723 — experimental `@dnd-kit/react` rewrite dropped the TouchSensor](https://github.com/clauderic/dnd-kit/issues/1723)
- [#1194 — future of library & maintenance (single-maintainer governance)](https://github.com/clauderic/dnd-kit/issues/1194)

## 8. Action Menu on draggable cards (drag-handle pattern)

The designs put an Actions Menu icon button **inside** each draggable tile. The
classic failure mode is a button inside a draggable swallowing clicks as drags.
Both finalists avoid it by separating "what drags" from "where you grab":

- **dnd-kit:** `useDraggable` returns `setNodeRef` (whole card, the thing that
  moves), `listeners` (drag activators), and `attributes`. Spread `listeners` on
  **only the grip handle** (the `⠿` icon), so the rest of the card — including the
  Actions Menu button — receives normal clicks/taps/keyboard.
  ([drag-handle docs](https://docs.dndkit.com/api-documentation/draggable/usedraggable#drag-handle))
- **`@use-gesture`:** bind the gesture to the grip ref only — same result.

Because keyboard/SR moves go through the Actions Menu (not dnd-kit's keyboard
sensor), there is no conflict between "drag" and "menu button" for keyboard users.
The "menu button appears on hover/focus, hidden when placed in a blank" behavior
is plain conditional rendering/CSS, independent of the engine. This requirement
does **not** separate the finalists.

## 9. How we'll decide

1. **Confirm the menu-driven keyboard reframe** (§2) with design/a11y. If true,
   engine keyboard/announcer features are not a differentiator.
2. **Throwaway spike** of the finalists against the hardest scenarios — chosen to
   cover the *full family*, not just FITB:
   - inline blank in wrapping text across the 504px breakpoint (FITB, N13);
   - **swap** on an occupied single-card blank → old card to bank (N3);
   - **ordered positional insertion** — drop a card *between* two others in a
     multi-card zone, with the "tiles separate to make room" animation
     (Composer / Sorter Sentence, N5/N6);
   - **displacement** — drop into a full Categorizer column, others shift down,
     last returns to bank (N8/N9);
   - **multi-use** tile placed twice with a decrementing remaining-count (N10);
   - a TeX tile and an image tile (N14);
   - **touch drag on a real device** (N2);
   - Actions Menu button inside the draggable card → move to a target (N7);
   - focus-return after a move + one WB Announcer call on drop (N15).

   Same engineer, timeboxed. Note the spike now needs `@dnd-kit/sortable` (for the
   dnd-kit arm) and a touch/multi-backend (for the react-dnd arm).
3. **Verify the webapp `react-dnd` setup** (§6) if it stays in contention.
4. **KA-specific checks:** Wonder Blocks / design-systems input; the process for
   adding a new prod dependency to Perseus; RTL + mobile-webview smoke test.
5. **Output: an ADR** recommending one engine.

**Framing for the decision:** because we bypass the engine's keyboard/SR
machinery, the value gap between adopting a library and building on the
`@use-gesture` we already ship is narrower than adoption stats suggest — **at FITB
scope**. But the full family's sortable-list semantics (N5/N6/N8 + animations)
widen that gap again, since those are the parts most worth *not* hand-rolling. The
choice reduces to a scope-aware build-vs-adopt trade among three shapes:

- **`@use-gesture` + ~600–1,100 LOC** — leanest deps (+0), but we own touch QA
  *and* the sortable/animation surface for Composer/Categorizer/Sentence.
- **`@dnd-kit/core` + `@dnd-kit/sortable`** — ~10KB + a small sortable package;
  covers the full family incl. ordering/animations; scoped context (no app-root
  provider); single-maintainer governance.
- **`react-dnd` (peer dep)** — ~0 net webapp weight + team familiarity + sortable
  model, but root `DndProvider`/backend coupling and touch-backend setup.

**Provisional lean:** at family scope, `@dnd-kit/core` + `@dnd-kit/sortable` is
the front-runner (covers the hard ordering/animation needs with a small,
self-contained, scoped dependency); pure `@use-gesture` is the lean alternative,
best if scope narrows back toward FITB-like single-card blanks. **react-dnd has
dropped to a weak third** after confirming frontend runs an old, touch-less
major with no shared provider (§6). So the real choice is **`@dnd-kit` (+sortable)
vs. `@use-gesture` + custom**. The spike confirms.

## 10. Desk-confirmed facts (no spike needed)

Verified now, without building anything:

- **dnd-kit versioning / maintenance:** stable line is **`@dnd-kit/core` 6.3.1**
  + **`@dnd-kit/sortable` 10.0.0** (current, self-contained). The rewrite
  **`@dnd-kit/react` is still `0.5.0`** — pre-1.0, with an actively-churning beta.
  → Confirms the guidance to pin to stable core + sortable and avoid the rewrite
  for now.
- **`@use-gesture/react` is already a Perseus prod dep** (`^10.2.27`, direct in
  `packages/perseus/package.json`). The build-on-`@use-gesture` route adds **zero**
  new dependency.
- **Dependency mechanism** (`pnpm-workspace.yaml`): `peerDeps`/`devDeps` catalogs
  are **generated from khan/frontend's** workspace via `utils/sync-dependencies.ts`
  (Perseus mirrors frontend's versions); bundled prod deps are listed directly in
  `package.json`; `minimumReleaseAge` = **3 days**.
  - **react-dnd** → naturally a peer dep synced from frontend (already there) —
    aligned with the plumbing.
  - **dnd-kit / `@use-gesture`** → self-contained Perseus prod deps, added
    directly, no frontend coordination.
- **Clean slate:** no dnd/gesture/sortable library is in any Perseus catalog
  today; Perseus has **zero Adobe / react-aria** deps; **WB Announcer is already
  available**.
- **khan/frontend's react-dnd setup** (pulled via the GitHub token):
  **`react-dnd@14.0.3`** + **`react-dnd-html5-backend@14.0.1` only** (old major;
  no touch backend), and `DndProvider` mounted in ~14 feature-local spots (mostly
  `apps/devadmin`), **no shared learner-app root provider**. → react-dnd is a weak
  option for learner-facing widgets (see §6).

**Still needs others (not desk-confirmable here):**

- the **menu-driven keyboard reframe** (§2) — design/a11y confirmation.
- **real-device touch** behavior — the spike.
