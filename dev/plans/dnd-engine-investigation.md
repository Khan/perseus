# Drag-and-Drop Engine Investigation (Operation Dragon Drop)

> **Status:** investigation / decision-pending. Choosing the drag-and-drop engine
> for the Operation Dragon Drop (ODD) widget family — Fill in the Blank first, then
> Categorizer / Composer / Sorter. No engine adopted yet.

## At a glance

**Where we landed:** three engines are in genuine comparison. Provisional lean is
**`@dnd-kit/core` + `@dnd-kit/sortable`**, but **`@use-gesture` + custom** and
**`react-dnd`** are both live contenders. The final pick comes from a timeboxed
spike (§9) scored against the rubric in §9.2.

| Standing | Option | One-line summary |
| --- | --- | --- |
| ⭐ **Finalist** (front-runner) | **`@dnd-kit/core` + `@dnd-kit/sortable`** | Covers the whole family — incl. ordering + animations — in a small, self-contained, per-instance dependency. |
| ⭐ **Finalist** (leanest) | **`@use-gesture/react` + ~600–1,100 LOC** | Already in Perseus (**+0 deps**); but we build drop-targets, ordering, and animations ourselves. |
| ⭐ **Finalist** (familiar) | **`react-dnd`** (+ touch backend) | Already used in Frontend (peer-dep alignment + team familiarity); supports touch via a touch/multi-backend. Watch: provider/backend model with **multiple widgets per page** (§6). |
| ✘ Ruled out | Pragmatic · React Aria · hello-pangea · SortableJS · native HTML5 · legacy jQuery · react-beautiful-dnd | Touch, footprint, a11y, or deprecation — see §3.2. |

**Settled** (no spike needed): requirements (§2), the candidate field (§3),
dependency/browser/SR/test facts (§10).
**Still to resolve:** real-device touch (the **hard gate**, §9.1), the
menu-driven-keyboard assumption (design/a11y, §2), multiple-widgets-per-page
behavior (§6), and measured bundle size (CI).

---

## 1. Constraints

- **Free / OSS only.** No paid packages.
- **Perseus is deliberately lean** — 5 external runtime deps today
  (`@use-gesture/react`, `gifuct-js`, `mafs`, `tiny-invariant`, `uuid`). A DnD
  dependency should add drag-and-drop and little else.
- **Perseus owns the interaction logic.** Widgets hold their own state and expose
  it upward via `getUserInput`; Perseus does **not** rely on the consumer
  (Frontend) for DnD context or wiring. So the engine's footprint and provider
  model are Perseus's concern, not Frontend's.
- **Peer-dependency model** — React, all of Wonder Blocks, jQuery, aphrodite, etc.
  are `peerDependencies` provided by the consumer (**Frontend** — khan/frontend; *not*
  webapp, which is backend). A DnD library Frontend already ships can be consumed
  the same way (see §6).
- **Multiple DnD widgets may appear on one page / exercise** — several at once,
  some the same type, some different. Each instance must work **independently**
  (this matters for engines with a single global provider/backend — see §6).
- **Mobile-first** — reliable **touch** drag is a hard requirement.
- **Supported browsers:** Chrome ≥ **v132**, Safari ≥ **v16.6** (per the
  [Browser Support](https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/103612417/Browser+Support)
  page). Both fully support Pointer Events, `touch-action`, and `elementFromPoint`,
  so a Pointer-Events-based engine needs **no legacy fallback**.
- **Accessibility *behaviors* are specified by the design docs** — the ODD Overview
  requires an **Actions Menu** on each tile for keyboard / screen-reader users
  ("drag and drop interactions are not available to keyboard-only or screen reader
  users"), plus aria-live announcements, focus-return, SR labels, and ordered-list
  semantics. **Screen readers are tested manually** per
  [ADR #514](https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/1849524239/ADR+514+Update+screen+reader+browser+combinations+to+test+web+user-facing+changes).
  - *Inference, not a verbatim constraint:* because moves go through our own
    Actions Menu + aria-live, we'd implement a11y ourselves and an engine's
    built-in keyboard sensor is largely moot (§2). This is the "menu-driven
    reframe" still to confirm with design/a11y (§9).

## 2. The key reframe: what the engine must do vs. what we own

The design docs specify a **menu-driven** keyboard / screen-reader UX (the
Overview mandates an **Actions Menu** — "Move to Blank N" / "Clear" — because drag
isn't available to those users), with moves announced via an **aria-live region**.

> **On the announcer:** the design docs *propose / recommend* the Wonder Blocks
> Announcer for this, but it's **not a hard mandate** — the requirement is an
> aria-live announcement; WB Announcer is just the convenient option already in
> the tree. Engine-independent either way.

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
| N5 | **Ordered positional insertion** — drop *between* cards at a specific index | Composer, Sorter Sentence, Categorizer | #2 |
| N6 | **Reorder cards within a zone** (up / down / to start / to end) and within the bank | Composer, Sorter Sentence, Categorizer | #3 |
| N7 | **Action-menu move** — a button on the card moves it with no drag | all | #1 |
| N8 | **Displacement on occupied slot** — tiles shift down a column; if full, the last returns to the bank | Categorizer | spec |
| N9 | **Per-zone capacity limits** | Composer, Categorizer | spec |
| N10 | **Multi-use / clone tiles** — placed N times with a remaining-count; removing replenishes | FITB, Composer, Sorter Sentence | spec |
| N11 | Drag-over / active state on a target | all | #6 |
| N12 | Cancel/abort (Escape) + return-to-source | all | spec |
| N13 | Drop detection robust to **reflow** (504px breakpoint, legend reorientation, timeline stagger) | all | spec |
| N14 | Arbitrary card content — **Text, TeX, Images, empty** | all | #8 |
| N15 | **A11y** — SR labels, aria-live announcements, focus-return, ordered-list semantics | all | #6 |
| N16 | Responsive layout / orientation — *our concern*, but drop-detection must survive it | all | spec |
| N17 | **Multiple independent DnD instances per page** — several widgets, same or different types | all | §1 |

**We own regardless of engine:** keyboard moves (N7), aria-live announcements
(N15), focus management, multi-use bookkeeping (N10), responsive layout (N16), and
the per-widget state surfaced via `getUserInput`.

### 2.1 FITB alone vs. the full family — the bar moves

**FITB only** is modest: single-card blanks + swap-to-bank (N3), no ordering.
Hand-rolling on `@use-gesture` is very attractive at that scope. **The full family**
adds ordered positional insertion (N5), reorder (N6), displacement (N8), capacity
(N9), and multi-use (N10) — *sortable-list-within-a-drop-zone* semantics, including
index-from-pointer math and FLIP animations. Those are tedious to hand-roll and are
exactly what `@dnd-kit/sortable` / react-dnd provide. **The build-vs-adopt calculus
flips with scope:** FITB-only favors build; the full family favors adopt. The spike
must evaluate against the *full family*.

## 3. Candidate landscape (free/OSS)

### 3.1 Finalists

| Option | License | Footprint | Touch | Multiple-per-page (N17) | Notes |
| --- | --- | --- | --- | --- | --- |
| **[`@dnd-kit/core`](https://dndkit.com/)** + [`@dnd-kit/sortable`](https://github.com/clauderic/dnd-kit) | MIT | Small: `tslib`, `@dnd-kit/accessibility`, `@dnd-kit/utilities` (+ sortable) | ✅ `Pointer`/`TouchSensor` (stable 6.x) | ✅ per-instance `DndContext`, no global backend | Covers the full family incl. ordering/animations. **Front-runner.** Pin to stable 6.x. Governance: small-maintainer, roadmap clarified (§7). |
| **[`@use-gesture/react`](https://use-gesture.netlify.app/)** + custom | MIT | **+0 — already a Perseus dep** | ✅ pointer events | ✅ fully independent | Leanest; cleanest reflow handling; proven in-repo test pattern (§10). We build drop-targets/ordering/animations (~600–1,100 LOC, §5). |
| **[`react-dnd`](https://react-dnd.github.io/react-dnd/)** (+ touch backend) | MIT | `dnd-core` (bundles redux) + `@react-dnd/*` + backend pkg | ✅ via `react-dnd-touch-backend` / multi-backend | ⚠️ single-provider/backend model — **needs care with N17** (§6) | Already in Frontend (peer-dep alignment + familiarity). Heaviest of the three; touch + multi-instance need design. |

### 3.2 Ruled out (one line each)

| Option | License | Reason |
| --- | --- | --- |
| **[Pragmatic drag-and-drop](https://atlassian.design/components/pragmatic-drag-and-drop/)** | Apache-2.0 | **Tiny (~5KB, not huge)** — but native HTML5 DnD has **current, open touch issues** (§7). Ruled out on **touch**, not size. |
| **[React Aria DnD](https://react-spectrum.adobe.com/react-aria/dnd.html)** (Adobe) | Apache-2.0 | `@react-aria/dnd` pulls the **whole `react-aria` suite** + a parallel a11y framework overlapping Wonder Blocks. |
| **[`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd)** | BSD-3 | Bundles **redux + react-redux** (~30KB+); list-reorder model, wrong shape. |
| **[SortableJS](https://github.com/SortableJS/Sortable)** / [react-sortablejs](https://github.com/SortableJS/react-sortablejs) | MIT | **Poor a11y** — mouse/touch only. |
| **[Native HTML5 DnD](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)** | n/a | **No touch**; none of the ergonomics. |
| Legacy jQuery `sortable.tsx` (in-repo) | in-repo | Dated, reorder-only — **we're reducing jQuery, not adding to it**. |
| [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) | ~~Apache-2.0~~ | **Deprecated & archived.** |

## 4. Finalist coverage (full family)

| Requirement | `@dnd-kit/core` (+ `sortable`) | `@use-gesture` + our code | `react-dnd` (+ touch backend) |
| --- | --- | --- | --- |
| N1 pointer · N2 touch | ✅ (touch tuning) | ✅ | ✅ touch needs a touch/multi-backend |
| N3 single-card + swap→bank | ✅ `useDroppable` | ❌ we build | ✅ |
| N4 multi-card zone | ✅ | ❌ we build | ✅ |
| **N5 ordered positional insertion** | ✅ `@dnd-kit/sortable` | ❌ **we build index math + FLIP** | ✅ (we write hover-index logic) |
| **N6 reorder within zone** | ✅ `arrayMove` | ❌ we build | ✅ |
| N8 displacement on occupied slot | ✅ (sortable shift) | ❌ we build | ✅ |
| N9 capacity · N10 multi-use | we enforce/orchestrate in state | we enforce/orchestrate | we enforce/orchestrate |
| N11 over-state | ✅ `isOver` | ❌ we build | ✅ |
| N12 cancel/return | ✅ `onDragCancel` | ⚠️ we build | ✅ |
| N13 reflow-robust detection | ✅ (`pointerWithin` + remeasure) | ✅ `elementFromPoint` (live DOM) | ✅ |
| N14 React content (Text/TeX/Image/empty) | ✅ | ✅ | ✅ |
| **N17 multiple instances per page** | ✅ per-instance context | ✅ fully independent | ⚠️ single global backend — **needs design/workaround** |
| Reorder/shift animations (FLIP) | ✅ built in | ❌ we build (or add a dep) | ⚠️ partial / we add |
| Provider model | scoped `DndContext` per widget | none | `DndProvider` + backend (global by default) |

**Decisive rows: N5/N6/N8 + animations** (favor dnd-kit/react-dnd over the
build route) and **N17 multiple-per-page** (favors dnd-kit/`@use-gesture`'s
per-instance model over react-dnd's global provider/backend).

## 5. `@use-gesture` build estimate

`@use-gesture/react` provides pointer+touch (with activation `delay`/`threshold`
+ tap filtering). The rest we build: a `DragProvider`/context (~80–150),
`useDraggable` wrapper (~60–100), `useDroppable` (~30–50), `elementFromPoint`
hit-testing (~30), drag preview (~50–80), cancel/return (~30), plus touch
hardening (`touch-action`, scroll suppression) + real-device QA.

**≈ 350–600 LOC for FITB only**; **~600–1,100 LOC at family scope** once N5/N6/N8
(index math + FLIP) and N10 multi-use are included. **No animation library exists
in Perseus** (no react-spring/framer-motion), so the FLIP "tiles separate to make
room" animations are **hand-rolled or a new dep** — a real point in dnd-kit's favor
(`@dnd-kit/sortable` ships them).

## 6. Frontend / `react-dnd` consideration

Frontend already depends on `react-dnd`, and Perseus's `peerDeps`/`devDeps`
catalogs are **generated from khan/frontend's** `pnpm-workspace.yaml` (via
`utils/sync-dependencies.ts`). So a react-dnd peer dep is **architecturally aligned**
with Perseus, plus there's team familiarity. That keeps it a genuine finalist.

**Touch is *not* a react-dnd limitation** (correcting an earlier overstatement).
Frontend ships only `react-dnd-html5-backend@14.0.x` because **its DnD is all
desktop tooling** — verified: every usage is in `apps/devadmin` (course / exercise
/ graphie / program / content-site editors), video/image upload, and khanmigo/guide
file-drop. None is a touch/mobile learner surface. react-dnd **does** support touch
via `react-dnd-touch-backend` (or a multi-backend); we'd add that.

**What Perseus's architecture changes:** Perseus owns the interaction logic and
surfaces state via `getUserInput`, so it would mount its **own** DnD wiring — it
does *not* lean on Frontend's provider, and there's no coupling to Frontend's
setup/version. That removes the "provider coupling" concern I raised earlier.

**The real react-dnd question is N17 — multiple widgets per page.** react-dnd uses
a `DndProvider` + a backend, and the HTML5 backend throws if two are mounted
("Cannot have two HTML5 backends at the same time"). With several independent
Perseus DnD widgets on a page, the options are:

- **One shared provider** mounted by the Perseus renderer around all widgets —
  idiomatic for react-dnd and handles multiple widgets, but introduces exactly the
  kind of shared context we'd otherwise avoid, and forces the renderer to always
  wrap DnD widgets; or
- **Per-widget providers** with the backend's `context`/`rootElement` option to
  avoid the duplicate-backend error — workable but fiddlier.

By contrast, **dnd-kit's `DndContext` and `@use-gesture` are per-instance** and need
no shared ancestor — a cleaner fit for "self-contained widgets, multiple per page."
So react-dnd stays a top contender (familiarity + alignment), but N17 is its
distinctive risk and a key spike item. Other Perseus consumers (Storybook) would
also need the provider set up.

## 7. Bug / limitation references (status checked 2026-06-18)

**Pragmatic — touch weakness is *current*** (still-open issues; native HTML5 DnD):

- [Discussion #93 — Mobile/Touch support?](https://github.com/atlassian/pragmatic-drag-and-drop/discussions/93)
- [#204 — draggable isn't working on touchscreen](https://github.com/atlassian/pragmatic-drag-and-drop/issues/204) — **open**, updated 2026-01
- [#124 — manually trigger iOS touch drag start](https://github.com/atlassian/pragmatic-drag-and-drop/issues/124) — **open** (2024)
- [#12 — Windows touch screen](https://github.com/atlassian/pragmatic-drag-and-drop/issues/12) — **open** (2024, stale)
- (Closed/not-representative, dropped from evidence: #112 Android closed 2024-11; #52 was a DevTools-device-mode artifact, closed in 2 days.)

**dnd-kit — touch has largely stabilized:**

- [#1955 — drag doesn't start on some Android (Samsung); works on iOS](https://github.com/clauderic/dnd-kit/issues/1955) — **open**, 2026 (the one current touch edge case)
- The older touch complaints I'd cited (#435, #272, #453) are all **2021 and long closed** — not current evidence.
- [#1723 — experimental `@dnd-kit/react` rewrite dropped the TouchSensor](https://github.com/clauderic/dnd-kit/issues/1723) — **open**; reinforces "use stable 6.x, not the rewrite."
- [#1194 — future of library & maintenance](https://github.com/clauderic/dnd-kit/issues/1194) — **closed "completed" Feb 2026**; the maintainer addressed the roadmap (the rewrite is the stated future). Governance concern is **reduced** but it's still effectively a small-maintainer project.

**react-dnd:** mature/low-churn (last major era ~2022); no active touch bug of note
because it's used in desktop contexts — touch support comes from the touch backend,
which the spike must validate on a real device.

## 8. Action Menu on draggable cards (drag-handle pattern)

The designs put an Actions Menu button **inside** each draggable tile; the classic
failure mode is the button swallowing clicks as drags. All finalists avoid it by
separating "what drags" from "where you grab" — spread the drag activators on
**only the grip handle** (`⠿`), leaving the Actions Menu button to receive normal
clicks/taps/keyboard. (dnd-kit:
[drag-handle docs](https://docs.dndkit.com/api-documentation/draggable/usedraggable#drag-handle);
`@use-gesture`/react-dnd: bind to the grip ref/handle.) Keyboard/SR moves go through
the Actions Menu, so there's no conflict. **This requirement does not separate the
finalists.**

## 9. How we'll decide

1. **Confirm the menu-driven keyboard reframe** (§2) with design/a11y.
2. **Throwaway spike** of the three finalists against the §9.1 scenarios — full
   family, not just FITB. Same engineer, timeboxed. (dnd-kit arm needs
   `@dnd-kit/sortable`; react-dnd arm needs a touch/multi-backend.)
3. **KA-specific checks:** Wonder Blocks / design-systems input; new-prod-dep
   process; RTL + mobile-webview smoke test.
4. **Output: an ADR** with the §9.2 scorecard filled in.

### 9.1 Spike scenario pass/fail criteria

Each scenario is **pass / partial / fail** per engine; capture a one-line note.

| # | Scenario | Pass criterion |
| --- | --- | --- |
| S1 | Inline blank in wrapping text across 504px (N13) | Drop lands in the correct blank after reflow. |
| S2 | Swap on an occupied single-card blank (N3) | New card placed; old returns to bank; one announcement. |
| S3 | Ordered positional insertion between cards (N5) | Lands at the pointer's index; neighbors animate apart. |
| S4 | Reorder within a zone (N6) | Drag *and* Actions Menu moves agree. |
| S5 | Displacement in a full Categorizer column (N8/N9) | Others shift down; last returns to bank; capacity enforced. |
| S6 | Multi-use tile placed twice (N10) | Source decrements; removing replenishes. |
| S7 | TeX tile + image tile (N14) | Render correctly while dragging and placed. |
| S8 | **Touch drag on a real device** (N2) | Reliable drag+drop on iOS Safari **and** Android Chrome; no scroll/long-press conflict. |
| S9 | Actions Menu button inside the card (N7) | Click/keyboard works; never triggers a drag. |
| S10 | Focus-return + announcement after a move (N15) | Focus returns per spec; correct SR announcement. |
| S11 | **Two+ DnD widgets on one page** (N17) | Independent drags; no provider/backend conflict; correct per-widget `getUserInput`. |

**Hard gate:** an engine that only reaches "partial" on **S8 (real-device touch)**
is disqualified for learner-facing widgets, regardless of other scores.

### 9.2 Weighted scorecard

Score each finalist 1–5 per criterion × weight; sum; apply the S8 gate.

| Criterion | Weight |
| --- | --- |
| Real-device touch reliability (S8) | 5 (gating) |
| Full-family fit (S3–S6) | 4 |
| Footprint / lean fit (deps, bundle) | 4 |
| Multiple widgets per page (S11/N17) | 3 |
| Reflow-robust hit-testing (S1) | 3 |
| Testability in jsdom + Storybook | 3 |
| Integrates with our a11y layer (Actions Menu + aria-live; S9/S10) | 3 |
| Maintenance / governance (longevity, license) | 2 |
| Animation support (FLIP, S3) | 2 |
| Implementation/maintenance cost (LOC we own) | 2 |

Decision rule: highest weighted total **after** the S8 gate; record the filled
scorecard in the ADR.

### 9.3 Fallback / exit

- **`@dnd-kit`** fails S8 after tuning → **`@use-gesture` + custom** (proven touch +
  in-repo test pattern).
- **`@use-gesture`** proves too costly on N5/N8 → **`@dnd-kit` + `@dnd-kit/sortable`**.
- **`react-dnd`** wins only if the spike shows clean touch (via touch backend) *and*
  a workable multiple-per-page story (§6), with familiarity/alignment as the
  tiebreaker.

## 10. Desk-confirmed facts (no spike needed)

- **dnd-kit versions:** stable **`@dnd-kit/core` 6.3.1** + **`@dnd-kit/sortable`
  10.0.0** (self-contained). The rewrite **`@dnd-kit/react` is still `0.5.0`**
  (pre-1.0) → pin to stable core+sortable.
- **`@use-gesture/react` already a Perseus prod dep** (`^10.2.27`) → that route adds
  **zero** new dependency.
- **Dependency mechanism:** `peerDeps`/`devDeps` catalogs are generated from
  khan/frontend; bundled prod deps go directly in `package.json`;
  `minimumReleaseAge` = 3 days. → react-dnd would be a Frontend-synced peer dep;
  dnd-kit/`@use-gesture` are self-contained prod deps.
- **Frontend's react-dnd** is **`react-dnd@14.0.3` + html5-backend only**, used
  **entirely in desktop admin/authoring tooling** (devadmin editors, video/image
  upload, khanmigo/guide file-drop) — *no learner/touch surface*, so html5-only
  reflects "didn't need touch," not a react-dnd limitation. Touch is available via
  `react-dnd-touch-backend`.
- **Bug currency (checked 2026-06-18):** Pragmatic has *open* touch issues
  (#204/#124/#12); dnd-kit's old touch issues are closed, only #1955 is current; the
  dnd-kit governance issue #1194 is **closed-completed** (§7).
- **Clean slate:** no dnd/gesture/sortable in any Perseus catalog; **zero Adobe /
  react-aria deps**; **WB Announcer already available** (but optional, §2).
- **In-repo precedents:** drag is **already testable in jsdom**
  (`use-draggable.test.tsx`); **RTL infra exists** (`rtlDecorator`, `:dir(rtl)`);
  **legacy `sortable` used only by `sorter.tsx` + `matcher.tsx`**.

## 11. Gaps & next steps

**Resolved** — browser baseline (Chrome 132 / Safari 16.6, no fallback); SR
validation is manual per ADR #514; Frontend react-dnd usage characterized (§6).

**Open — high value:**
- **Testing strategy.** jsdom pattern exists (`use-draggable.test.tsx`); replicate
  for dnd-kit's `PointerSensor` + react-dnd; decide Storybook play/visual-regression
  coverage. (The old jQuery Sorter has *no* drag test — net-new rigor.)
- **Animation approach.** No animation lib in Perseus; the `@use-gesture` route needs
  hand-rolled FLIP or a new dep (§5).
- **Multiple-widgets-per-page (N17).** Especially the react-dnd provider/backend
  story (§6) — spike it (S11).
- **Spike DoD** — owner + timebox; results recorded against §9.2.

**Open — medium value:**
- **Mobile native-webview specifics** — iOS long-press → text-selection/callout;
  `apiOptions.isMobileApp` / `file://`. Spike + mobile team.
- **Legacy-jQuery migration** — bounded to `sorter.tsx` + `matcher.tsx`.
- **RTL** — reuse existing `rtlDecorator`/`dir` infra; verify drag/keyboard/announcer.

**Open — low value:**
- **Measured bundle size** — npmjs + bundlephobia were network-blocked here; measure
  locally / via a CI size-limit check.
- **SSR / hydration** smoke check — no self-SSR in `packages/perseus/src`; low risk.
