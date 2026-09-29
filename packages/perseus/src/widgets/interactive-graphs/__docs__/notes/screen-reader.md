# Screen Reader Support — Interactive Graph Widget

## Overview

The Interactive Graph widget is operable with a screen reader (SR). SR users hear how to
interact with the graph on focus, move interactive elements with the keyboard, and hear a
localized, graph-type-aware announcement describing each element and each change. This document
records **how that support works in the current code**, **which SR/browser combinations are
supported**, the **decisions** behind the architecture, and the **roadmap** of planned
improvements (IGP2, tracked under the LEMS tickets in the [Ticket Map](#ticket-map)).

The improvement work is organized into five phases and will bring Interactive Graph from Bronze
to Silver accessibility tier (confirmed with design). The [Roadmap](#roadmap-planned-work) section
summarizes those phases; the authoritative rationale for each decision lives in the companion
[`screen-reader-research.md`](./screen-reader-research.md) spike doc.

### Learner Experience (SR user)

- On focus, the graph reads a short instruction string describing how to interact (Tab to move
  between elements, Arrow keys to move a focused element). Unlimited graphs additionally describe
  Shift + Enter and the Action Bar.
- Tabbing to an interactive element and pressing an Arrow key moves it. (Step-size modifiers —
  Shift for larger, Alt/⌘ for finer — exist but are typically intercepted by the screen reader in
  forms/focus mode; see [Keyboard Commands](#keyboard-commands).)
- Each move fires a live announcement describing the element's new position, phrased for the graph
  type ("Point at 3 comma 4.", "Circle radius is 5.", "Segment length 5 units.", …).
- On graphs that support it, the learner can add points (Shift + Enter, then `a`) and remove the
  focused element (Delete / Backspace).
- Custom author-supplied point labels are announced in place of the default "Point N" labels.

### Current State (shipped vs. planned)

**Shipped today:** the Wonder Blocks Announcer pipeline, both on-focus instruction strings,
instructions-first DOM ordering, the keyboard command set below, per-graph-type announcement
strings, and custom `pointLabels`.

**Planned, NOT shipped** (do not describe these as available — see [Roadmap](#roadmap-planned-work)):
Escape-to-exit and a generalized focus trap, the Insert + I / Fn + Enter + I instruction-repeat
shortcut, the "Focus mode" warning sentence in the instruction copy, `role="figure"` /
`role="application"` on the graph container, Action Bar `role="group"` grouping, none-type
"nothing to move" messaging, the Add Point disable rule, and the Phase 5 per-graph copy rewrites.

## Supported Screen Readers

Interactive graphs are tested against this desktop matrix. "Verified" means golden path plus edge
cases per phase, confirmed by the SR tester (Darrell).

| Screen reader | Browser | OS |
|---------------|---------|----|
| NVDA | Chrome | Windows |
| NVDA | Firefox | Windows |
| JAWS | Chrome | Windows |
| JAWS | Edge | Windows |
| VoiceOver | Chrome | macOS |

Mobile screen readers (VoiceOver on iOS, TalkBack on Android) are **not supported** — gesture
conflicts need a separate spike, deferred under
[LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949).

## How It Works

### On-focus instructions

`mafs-graph.tsx` renders an sr-only instruction `<View>` (`className="mafs-sr-only"`) as the first
child of the graph figure (rendered only for non-`none` graphs — the instructions View is omitted
for `type: "none"` display-only graphs), and references it early in the container's `aria-describedby`
order (ahead of the graph description, and only when interaction is enabled) so SR users hear *how to
interact* before the content description. The string is chosen by graph capability:

- **Standard graphs — `srGraphInstructions`:** *"Enable Forms or Focus mode and use the Tab key to
  move through the interactive elements in the graph. When an interactive element has focus, use
  Arrow keys to move it."*
- **Unlimited (add/remove) graphs — `srUnlimitedGraphInstructions`:** *"Press Shift + Enter to
  interact with the graph. Enable Forms or Focus mode and use the Tab key to move through the
  interactive elements in the graph and access the graph Action Bar. When an interactive element
  has focus, use Arrow keys to move it or use the Delete key to remove it from the graph. Use the
  buttons in the Action Bar to add or adjust elements within the graph."*

A **visible** on-screen prompt (`graphKeyboardPrompt`, not sr-only) reads *"Press Shift + Enter to
interact with the graph"* on unlimited graphs (gated by `state.showKeyboardInteractionInvitation`).

### Keyboard interaction

There are two keyboard-handling sites:

1. **Graph-level handler** — `handleKeyboardEvent` in `mafs-graph.tsx`, bound via `onKeyUp` and
   active only for unlimited graph states (`isUnlimitedGraphState`). Handles Shift + Enter, the
   `a` add-point key, and Delete/Backspace (see [Keyboard Commands](#keyboard-commands)).
2. **Per-element move handler** — `use-draggable.ts` uses `@use-gesture/react`'s `useDrag` with
   keyboard support. Arrow keys are mapped to directions by `directionForKey`; `keyup` is ignored so held
   keys don't double-fire, and the handler calls `stopPropagation`/`preventDefault` to suppress
   browser scroll-on-arrow. When `constrainKeyboardMovement` is a constrained destination set, the
   arrow key selects the pre-computed valid destination for that direction.

### Live announcements

`stateful-mafs-graph.tsx` holds a `useEffect` that watches `state.stateAnnouncement`. When a
reducer sets it (a new object reference), the effect builds a localized message with
`getAnnouncementText` and passes it to `announceMessage` from
`@khanacademy/wonder-blocks-announcer`, which owns the page's single live region. Building the
string in the component (not the reducer) keeps reducers locale-free.

`getAnnouncementText` (`graphs/strings/announcement.ts`) routes each move-event type to a template:
`move-point` → `srPointAtCoordinates`; `move-radius-point` → circle radius-endpoint label +
`srCircleRadius`; `move-center` → circle center label; `move-{vector,segment,linear-system,ray,
linear}-line` → the matching `sr…GrabHandle`; `move-{exponential,logarithm}-asymptote` → the
matching asymptote string; `move-{polygon,quadratic-point,sinusoid-point,…}` → per-graph label
helpers. All numbers are localized via `srFormatNumber` (`graphs/strings/format-number.ts`).

### Per-graph description strings

Every graph type carries a graph-level `aria-label`, a full description, and per-element labels,
all defined as `sr…` keys in `packages/perseus/src/strings.ts` and assembled by per-type helpers in
`graphs/strings/*.ts`. Custom author `pointLabels` (see [Decision 5](#5-optional-pointlabels-with-per-index-fallback))
take precedence over the default localized labels; the `…WithLabel` string variants carry the
author label. Examples of shipped copy:

- **Point:** "Point %(pointLabel)s at %(x)s comma %(y)s." (`srPointAtCoordinates`)
- **Line:** grab-handle plus slope/intercept sentences, e.g. "Line going through point −1 comma 2
  and point 3 comma 5.", "Its slope increases from left to right.", "The line crosses the Y-axis at
  0 comma 2." (`srLinearGrabHandle`, `srLinearGraphSlope*`, `srLinearGraph*Intercept`)
- **Circle:** "Circle radius is %(radius)s.", "Right radius endpoint at %(x)s comma %(y)s." (`srCircle*`)
- **Segment:** "Endpoint 1 at … Endpoint 2 at … Segment length %(length)s units." (`srSegment*`)
- **Vector:** "Vector from %(tailX)s comma %(tailY)s to %(headX)s comma %(headY)s." + magnitude/direction (`srVector*`)
- **Polygon:** point count, per-vertex coordinates, side lengths, interior angles (`srPolygon*`)
- **Parabola / exponential / logarithm / sinusoid / absolute value / tangent:** shape summary
  (opens up/down, asymptotes, intercepts, extrema/inflection) plus each draggable point (`srQuadratic*`,
  `srExponential*`, `srLogarithm*`, `srSinusoid*`, `srAbsoluteValue*`, `srTangent*`).

## Keyboard Commands

| Command | Scope | Effect | Source |
|---------|-------|--------|--------|
| **Tab** | all graphs | Move between interactive elements (requires the SR's Forms/Focus mode) | native |
| **Arrow keys** (← → ↑ ↓) | focused element | Move the focused element (default step = span/50) | `use-draggable.ts` |
| **Shift + Arrow** | focused element | Move in **larger** steps (span/10) | `use-draggable.ts` |
| **Alt / Meta (⌘) + Arrow** | focused element | Move in **finer** steps (span/200) | `use-draggable.ts` |
| **Shift + Enter** | unlimited graphs | Enter keyboard interaction mode (`changeInteractionMode("keyboard")`) | `mafs-graph.tsx` |
| **A** | unlimited graphs, keyboard mode only | Add a point at the origin `(0, 0)` (`addPoint([0, 0])`) | `mafs-graph.tsx` |
| **Delete / Backspace** | unlimited graphs | Remove the focused point / open-polygon vertex (`deleteIntent()`), then blur the handle | `mafs-graph.tsx` |

There is **no** shipped handler for Escape, Insert + I, Fn + Enter + I, or Ctrl + Shift + Arrow;
the arrow-move handler does not treat Ctrl specially, and there is no `navigator.platform`
detection. All of those are [Roadmap](#roadmap-planned-work) items. The move actions dispatched by
the handlers are defined in `reducer/interactive-graph-action.ts` (`MOVE_POINT`,
`MOVE_POINT_IN_FIGURE`, `MOVE_LINE`, `MOVE_ALL`, `MOVE_CENTER`, `MOVE_RADIUS_POINT`, `REMOVE_POINT`).

## Key Files

| File | Role |
|------|------|
| `mafs-graph.tsx` | Renders the graph figure, sr-only instructions (first child, early in `aria-describedby`), and the visible keyboard prompt; hosts the graph-level keyboard handler (`handleKeyboardEvent`, Shift + Enter / `a` / Delete) for unlimited graphs |
| `stateful-mafs-graph.tsx` | `useEffect` watching `state.stateAnnouncement`; builds the localized message and calls `announceMessage` (WB Announcer) |
| `graphs/use-draggable.ts` | Per-element keyboard move handler — arrow-to-direction mapping (`directionForKey`), step-size modifiers, constrained-destination handling |
| `graphs/strings/announcement.ts` | `getAnnouncementText` — maps each move-event type to its per-graph announcement string |
| `graphs/strings/format-number.ts` | `srFormatNumber` — locale-aware number/π formatting for all SR copy |
| `graphs/strings/*.ts` | Per-graph label/description assembly (`circle.ts`, `polygon.ts`, `quadratic.ts`, `vector.ts`, …), including `pointLabels` precedence |
| `packages/perseus/src/strings.ts` | The `sr…` string catalog (instructions + every per-graph label/description) |
| `types.ts` | `InteractiveGraphStateAnnouncement` union; `stateAnnouncement?` on `InteractiveGraphStateCommon` |
| `reducer/interactive-graph-reducer.ts` | Sets `stateAnnouncement` on move/add/remove actions |
| `reducer/interactive-graph-action.ts` | Move/add/remove action creators the keyboard handlers dispatch |
| `packages/perseus-core/src/data-schema.ts` | `pointLabels?: string[]` on the point/polygon (and most other) graph types |
| `__docs__/a11y.mdx` | User-facing a11y summary story (keep in sync with this doc) |

## Decision Record

Decisions embodied in the current architecture. One-line restatements of the full decision log in
[`screen-reader-research.md`](./screen-reader-research.md) (referenced there as OQ1–OQ7); consult
that doc for the complete rationale and options considered.

### 1. Central Announcer pipeline (raw data in reducers, localization in the component)  — OQ3

**Context:** SR change-announcements were previously driven by toggling `aria-live="polite"` on
elements, which is fragile (double-reads, timing) and scattered per graph. A single mechanism was
needed, but some announcements are generic (point moved) while others are math-heavy (slope,
intercept, radius).

**Decision:** Route announcements through `state.stateAnnouncement` → a `useEffect` in
`stateful-mafs-graph.tsx` → WB Announcer (`announceMessage`). Reducers set a typed object
(`InteractiveGraphStateAnnouncement`) carrying **raw** event data only; the component localizes it
via `getAnnouncementText`, which dispatches by event type to per-graph label helpers
(`srQuadraticPointLabel`, `srPolygonLabel`, etc.). Routing is **fully centralized** — there is one
handler and no per-graph escape hatch. (The `screen-reader-research.md` OQ3 write-up proposed a
*hybrid* with a `useGraphAnnouncer` per-graph escape hatch; the shipped implementation is the
simpler fully-central form and `useGraphAnnouncer` does not exist.)

**Consequences:** Reducers stay locale-free and pure; there is one live region for the page.
Migrating a graph off `aria-live` and onto `stateAnnouncement` must be a **paired change** — add
the announcement and remove the old `aria-live` toggle in the same PR — or announcements double
(see [Paired-Migration Constraint](#paired-migration-constraint)). The `useEffect` fires on
reference change, so reducers must always produce a **new** `stateAnnouncement` object.

---

### 2. Two instruction strings (standard vs. unlimited)  — OQ2a

**Context:** Unlimited graphs (add/remove elements, Action Bar) need more guidance than standard
graphs, but a single combined string would be long and partly irrelevant for standard graphs.

**Decision:** Ship two strings — `srGraphInstructions` and `srUnlimitedGraphInstructions` — chosen
in `mafs-graph.tsx` by graph capability.

**Consequences:** Standard-graph users don't hear add/remove/Action-Bar language. The planned
"Focus mode" warning sentence and the Insert + I repeat hint (Phase 2) attach to these two strings
when they land.

---

### 3. Instructions rendered first  — OQ4

**Context:** SR users encountered the content description before learning how to interact, so they
didn't know the graph was interactive until after hearing a long description.

**Decision:** Render the instructions `<View>` as the first sr-only child and place it early in the
graph container's `aria-describedby` order.

**Consequences:** "How to interact" is the first thing an SR user hears on focus. DOM order and
`aria-describedby` order must stay in sync if either is refactored.

---

### 4. Localized numbers via `srFormatNumber`  — cross-cutting

**Context:** Coordinates, radii, angles, and intercepts appear throughout SR copy and must read
naturally per locale (decimals, π-multiples, math-character labeling) and screen-reader-friendly
("3 comma 4", not "3, 4").

**Decision:** All numeric values in SR strings flow through `srFormatNumber`
(`graphs/strings/format-number.ts`). Strings with variable cardinality use separate singular/plural
string keys (e.g. `srPolygonGraphPointsOne` / `srPolygonGraphPointsNum`) via Khan's i18n `num`
special-variable plurality convention — not ICU plural syntax.

**Consequences:** One place owns number formatting for SR. New announcement copy must route numbers
through it rather than string-concatenating raw values, and needs an explicit `…One`/`…Num` key
pair for any count-dependent phrasing.

---

### 5. Optional `pointLabels` with per-index fallback  — OQ5

**Context:** Authors sometimes name points in prose ("Point T"), but the graph announced generic
"Point N" labels, creating a mismatch for SR users.

**Decision:** An optional `pointLabels?: string[]` field on the graph types (present on the point
and polygon types and, in practice, most interactive graph types). Each handle uses `pointLabels[i]`
when present (via the `…WithLabel` string variants), otherwise falls back to the default localized
label — **per index**, not all-or-nothing. Labels are author-supplied plain text and are the
author's responsibility to localize.

**Consequences:** Authors can align SR labels with question prose. Auto-derivation from question
text was rejected as too brittle. The editor UI for authoring labels ships behind a flag while
authors are trained (Phase 3).

---

### 6. Keep Ctrl + Shift + Arrow (do not remap)  — OQ2b

**Context:** Ctrl + Shift + Arrow can be intercepted by JAWS/NVDA in Browse/Virtual Cursor mode
([LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003)). Remapping was considered.

**Decision:** Keep the existing binding; address the conflict with an on-entry mode-toggle warning
in the instruction copy (Phase 2) plus a user-facing support article
([LEMS-4424](https://khanacademy.atlassian.net/browse/LEMS-4424)) rather than remapping.
Removing the binding ([LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736)) is deferred.

**Consequences:** No behavior change to the shortcut. The instruction copy carries the burden of
telling users to switch to Focus/Forms mode; the support article carries the detail so in-app copy
stays brief.

## Paired-Migration Constraint

Any PR that adds an `announce(...)` for a previously-`aria-live` event must, in the same change:
(1) add the announcement, (2) remove the corresponding `setXxxAriaLive("polite")` toggle, and
(3) update tests that pinned the old `aria-live` behavior. A new announce call without a matching
`aria-live` removal is a review blocker — it doubles announcements. This is the invariant Phase 1
established and it applies to any later phase that adds announcer call sites alongside legacy
`aria-live`.

## Roadmap (Planned Work)

Five phases carry Interactive Graph from Bronze to Silver tier. Phase 1 (Announcer foundation) and
the structural pieces of Phases 2–3 are largely reflected in the shipped behavior above; the
remaining items are not yet in the code. Each row's rationale and detailed step breakdown live in
[`screen-reader-research.md`](./screen-reader-research.md) and this doc's git history.

| # | Phase | Focus | Key remaining (not shipped) items |
|---|-------|-------|-----------------------------------|
| 1 | WB Announcer Foundation | `stateAnnouncement` pipeline; migrate graphs off `aria-live` | Audit any remaining `aria-live` toggles |
| 2 | Graph Instructions & Structure | Instruction copy, container role, DOM order | `role="figure"` (fallback `role="application"`); "Focus mode" warning sentence; **Insert + I / Fn + Enter + I** repeat shortcut; none-type "nothing to move" + locked-figure traversability copy |
| 3 | Editor & Linter | `pointLabels`; authoring guardrails | Editor UI behind `perseus-editor-point-labels` flag; linter rule requiring a graph description when locked figures are present |
| 4 | Trap Focus | Enter/exit + Action Bar (behind a proposed flag, `interactive-graphs-sr-phase-4`) | **Escape** to exit + generalized Shift + Enter entry on all graphs; graph-entered/exited announcements; Action Bar `role="group"`; Add Point disable rule (`lastAddedPointIndex`) |
| 5 | Per-Graph Copy | UXR-derived per-type wording | Type-aware "moved" copy (linear slope/intercept, segment length, circle center vs. radius); circle drag-handle vs. boundary-point; linear-system intersection phrasing; polygon group-focus summary; sinusoid extremum/midline labels (pending design) |

### Feature flags

Both flag names below are **proposed** — they do not exist in the codebase yet; final names are
confirmed with the platform team when the phase is implemented.

| Flag (proposed) | Phase | Default | Purpose |
|------|-------|---------|---------|
| `interactive-graphs-sr-phase-4` | 4 | off | Focus trap + graph enter/exit announcements + Action Bar grouping + Add Point disable ship together |
| `perseus-editor-point-labels` | 3 (editor only) | off | Author-facing `pointLabels` UI while authors are trained; renderer side is unflagged and backwards-compatible |

### Copy review process

SR copy iterates first with the designer (Caitlyn), then gets a single final SR-pass sign-off from
the SR tester (Darrell) per phase (or per umbrella batch in Phase 5) — he is a shared org resource,
so he signs off on final-form copy against the integrated build rather than round-by-round.

## Ticket Map

| Ticket | Scope | Phase |
|--------|-------|-------|
| [LEMS-3946](https://khanacademy.atlassian.net/browse/LEMS-3946) | Spike / research (companion `screen-reader-research.md`) | — |
| [LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943) | WB Announcer integration ([#3619](https://github.com/Khan/perseus/pull/3619)) | 1 |
| [LEMS-4119](https://khanacademy.atlassian.net/browse/LEMS-4119) | `role="figure"` on graph | 2 |
| [LEMS-4120](https://khanacademy.atlassian.net/browse/LEMS-4120) | Instruction copy + Insert + I repeat shortcut | 2 |
| [LEMS-4121](https://khanacademy.atlassian.net/browse/LEMS-4121) | Reorder instructions first in DOM | 2 |
| [LEMS-3205](https://khanacademy.atlassian.net/browse/LEMS-3205) | None-type / locked-figure messaging | 2 |
| [LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003) | Keyboard-command conflict guidance | 2 |
| [LEMS-4122](https://khanacademy.atlassian.net/browse/LEMS-4122) / [LEMS-4123](https://khanacademy.atlassian.net/browse/LEMS-4123) / [LEMS-4124](https://khanacademy.atlassian.net/browse/LEMS-4124) | Per-graph instruction polish (Exponent / Logarithm / Vector) | 2 |
| [LEMS-4424](https://khanacademy.atlassian.net/browse/LEMS-4424) | User-facing SR support article | 2 (docs) |
| [LEMS-4125](https://khanacademy.atlassian.net/browse/LEMS-4125) | Locked-figure description linter rule | 3 |
| [LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995) | `pointLabels` editor feature | 3 |
| [LEMS-3206](https://khanacademy.atlassian.net/browse/LEMS-3206) | Focus trap + Action Bar grouping | 4 |
| [LEMS-2681](https://khanacademy.atlassian.net/browse/LEMS-2681) | Focus jump on Shift + Enter (unlimited polygon) | 4 |
| [LEMS-4097](https://khanacademy.atlassian.net/browse/LEMS-4097) | Add Point disable rule | 4 |
| [LEMS-2971](https://khanacademy.atlassian.net/browse/LEMS-2971) | Umbrella (UXR per-graph copy); impl in LEMS-4092–4096 | 5 |
| [LEMS-4092](https://khanacademy.atlassian.net/browse/LEMS-4092)–[LEMS-4096](https://khanacademy.atlassian.net/browse/LEMS-4096) | Per-graph "moved"/label copy (linear/segment/circle, circle handles, linear-system, polygon, sinusoid) | 5 |

## Deferred / Out of Scope

- **Mobile screen reader support** ([LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949)) — VoiceOver / TalkBack on touch; gesture conflicts need a separate spike.
- **Locked-figure focus order** — separate spike; touches the locked-figures system more broadly.
- **Content-side fixes** — re-authoring questions whose meaning depends on inaccessible background images (Content team owns).
- **Removing Ctrl + Shift + Arrow** ([LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736)) — deferred per [Decision 6](#6-keep-ctrl--shift--arrow-do-not-remap).

## Related Docs

- [`screen-reader-research.md`](./screen-reader-research.md) — spike: open questions, options, and the authoritative decision log (OQ1–OQ7).
- [`__docs__/a11y.mdx`](../a11y.mdx) — user-facing a11y summary story; keep aligned with this doc.
- [`mafs-workarounds.md`](./mafs-workarounds.md) — Safari touch-action / hitbox interaction relevant to graph input.
- Per-graph-type notes ([`absolute-value.md`](./absolute-value.md), [`exponential.md`](./exponential.md), [`logarithm.md`](./logarithm.md), [`tangent.md`](./tangent.md), [`vector.md`](./vector.md)) — each describes its own SR description strings.
