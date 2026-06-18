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

**The engine must cover:**

| # | Capability | Why |
| --- | --- | --- |
| R1 | Pointer/mouse drag | Baseline. |
| R2 | **Touch drag (mobile)** | Hard requirement — Perseus is mobile-first. |
| R3 | Discrete drop targets (blanks) + drop back into the choice bank | ODD is drop-zones, not list reorder. |
| R4 | Drag-over / active state on a target | Blank highlights when a tile is over it. |
| R5 | Drop detection robust to **reflowing inline targets** | Blanks wrap / change at the 504px breakpoint. |
| R6 | Cancel/abort (Escape) + return-to-source on invalid drop | Spec requirement. |
| R7 | Reports the resolved drop target (so we orchestrate **swap**) | We move state; engine reports where it landed. |
| R8 | Arbitrary React content in draggables (TeX / images) | Tiles aren't plain text. |

**We own regardless of engine:** keyboard moves (Actions Menu), SR announcements
(WB Announcer), focus management (incl. focus-return after a move), multi-use tile
counting.

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

| Capability | `@dnd-kit/core` (6.x) | `@use-gesture` + our code | `react-dnd` (peer dep) |
| --- | --- | --- | --- |
| R1 pointer | ✅ | ✅ | ✅ |
| **R2 touch** | ✅ (own edge cases to tune) | ✅ | ⚠️ needs touch/multi-backend |
| R3 drop targets | ✅ `useDroppable` | ❌ we build | ✅ |
| R4 over-state | ✅ `isOver` | ❌ we build | ✅ |
| R5 reflow-robust detection | ✅ (`pointerWithin` + remeasure) | ✅ `elementFromPoint` (live DOM) | ✅ |
| R6 cancel/return | ✅ `onDragCancel` | ⚠️ we build | ✅ |
| R7 reports target | ✅ | n/a — we compute it | ✅ |
| R8 React content | ✅ | ✅ | ✅ |
| App-root provider required? | No (scoped `DndContext`) | No | **Yes (`DndProvider` + backend)** |
| Net bundle add to webapp | ~10KB | 0 | ~0 (already shipped) |

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

**Total ≈ 350–600 LOC we fully own** (plus tests). Tractable — not a fragile
collision reimplementation. For R5, `elementFromPoint` hit-tests the live DOM, so
it is inherently reflow-proof (arguably cleaner than measured-rect collision for
wrapping inline blanks). **The real cost is owning cross-device touch QA**, not the
line count.

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

**Verify before weighting heavily:** which react-dnd **version** webapp uses and
whether it's app-wide or isolated; which **backend** (HTML5 / touch / multi) and
whether the root `DndProvider` is shareable; whether non-webapp consumers need it.

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
2. **Throwaway spike** of the finalists against the hardest scenarios only:
   inline blank in wrapping text across the 504px breakpoint; swap on an occupied
   blank; a TeX tile and an image tile; **touch drag on a real device**; Actions
   Menu button inside the draggable card; focus-return after a move; one WB
   Announcer call on drop. Same engineer, timeboxed (~1–2 days each).
3. **Verify the webapp `react-dnd` setup** (§6) if it stays in contention.
4. **KA-specific checks:** Wonder Blocks / design-systems input; the process for
   adding a new prod dependency to Perseus; RTL + mobile-webview smoke test.
5. **Output: an ADR** recommending one engine.

**Framing for the decision:** because we bypass the engine's keyboard/SR
machinery, the value gap between adopting a library and building on the
`@use-gesture` we already ship is narrower than adoption stats suggest. The choice
reduces to a build-vs-adopt trade among three shapes: **own ~400 LOC + touch QA
(`@use-gesture`)**, **take a ~10KB self-contained dependency and tune its touch
(`@dnd-kit`)**, or **reuse webapp's `react-dnd` as a peer dep and accept
root-provider/backend coupling**.
