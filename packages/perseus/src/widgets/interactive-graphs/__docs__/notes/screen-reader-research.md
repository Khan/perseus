# Interactive Graph: Screen Reader Improvements (Phase 2 Research)

This document captures the technical research for the screen reader (SR) improvements planned in Interactive Graph Phase 2. It is the deliverable for the spike ticket [LEMS-3946](https://khanacademy.atlassian.net/browse/LEMS-3946).

**Sibling implementation tickets** (where the resolved decisions land):

- [LEMS-3205](https://khanacademy.atlassian.net/browse/LEMS-3205) — Improve the screenreader instructions for the **none-type graph** (and locked-figure traversability messaging).
- [LEMS-3206](https://khanacademy.atlassian.net/browse/LEMS-3206) — **Improve how instructions are provided** (on-demand shortcut + `role="figure"`).
- [LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943) — Use Wonder Blocks Announcer in Interactive Graph.

**Source material:**

- [Interactive Graph Phase 2 Scope](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4529881220/Interactive+Graph+Phase+2+Scope)
- [SR interaction and label changes](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4656594954/SR+interaction+and+label+changes) (designer's planned updates — Caitlyn Mayers)
- [Interactive Graph: Screen reader quality notes](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/3937763330/Interactive+Graph+Screen+reader+quality+notes) (Phase 1 audit — Sarah Proffitt)
- [Practice Screen Reader User Experience (SRUX)](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/3261071420/Practice+Screen+Reader+User+Experience+SRUX) — Khan-wide SR principles + the math-character labeling table that `srFormatNumber` already follows.

---

## Spike Outcomes

LEMS-3946 asks for two deliverables; this is where each lives:

1. **Expected behavior of the screen reader** — see [Goals & Requirements](#goals--requirements) for the cross-cutting source-grouped requirements, then each Area of Improvement section ([WB Announcer](#wb-announcer-implementation), [SR Instructions](#sr-instruction-improvements), [Focus Trap](#focus-trap--entryexit), [Graph Semantic Role](#graph-semantic-role), [None-type / Static / Locked Figure Messaging](#none-type--static--locked-figure-messaging), [Per-Question Authoring](#per-question-authoring), [Action Bar](#action-bar), [Per-Graph Copy Improvements](#per-graph-copy-improvements)) for area-specific goals and decisions.
2. **Technical notes to consider during implementation** — see [Related System Architecture](#related-system-architecture) for what must be touched, and the Open Questions inside each Area for the decisions implementers need before they start.

---

## Goals & Requirements

Phase 1 left the widget at the **Bronze** accessibility tier. Phase 2 targets **Silver**, which adds two requirements we don't yet meet:

1. Surface dynamic feedback to SR users when graph state changes (not just re-reading static labels).
2. Move focus appropriately for keyboard / SR users after input.

The work also closes the loop on the Level Access audit and on UXR feedback collected after Phase 1.

### Designer's planned updates (must-have)

From [SR interaction and label changes](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4656594954/SR+interaction+and+label+changes):

- **Focus trap.** Shift + Enter enters the graph; Escape exits.
- **Announce graph entered / exited** via the Wonder Blocks `Announcer`.
- **Move instructions inside the graph** as the first `sr-only` element so they are read on entry.
- **Insert + I** keyboard shortcut to repeat the graph instructions on demand.
- **Update instruction text** to reflect Focus mode and the Action Bar (full text below in [Open Question 2](#oq2)).
- **Announce dynamic changes** (point added, point removed, shape closed, etc.) via WB `Announcer`.
- **Action Bar semantics:** wrap the action buttons in a `role="group"` element with `aria-label="Action Bar"`.
- **Disable "Add Point"** until the previously-added point has been moved off the origin (prevents stacking).

### UXR-derived requirements (Phase 1 quality notes)

- Linear / segment / circle: announce *that the element moved*, not just its current location.
- Circle: distinguish the interactive drag handle from the non-interactive boundary points.
- Linear system: rephrase intersection so "point" (location) doesn't collide with "point" (interactive dot).
- Polygon: don't enumerate every vertex when the whole-polygon group is focused; just confirm selection.
- Sinusoid: re-evaluate exposing extremum/midline/maximum/minimum labels (sighted users don't see these).
- "None" / static graphs: make non-interactivity obvious in the description.
- Locked figures: descriptions are read *after* the instructions tell the user to tab away — they get skipped.

### Level Access audit findings

- **[LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995)** — generic "Point 1" label doesn't match the question's "Point T".
- **[LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003)** / **[LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736)** — Ctrl + Shift + Arrow conflicts with JAWS / NVDA's "select by word" command.
- **[LEMS-2681](https://khanacademy.atlassian.net/browse/LEMS-2681)** — after Shift + Enter on unlimited polygon, focus stays on the graph outline instead of jumping to "Add Point".

### None-type / static / locked-figure requirements

From [LEMS-3205](https://khanacademy.atlassian.net/browse/LEMS-3205) (UXR-derived):

- **None-type graphs need an explicit "nothing to move" label** — treat the graph the same as a non-interactive image; users currently get no signal that the graph is not interactive.
- **Locked figures must announce that they are traversable, but not via Tab.** Today they are reachable only by free SR exploration after the user has been told (by the instructions) to Tab away — so they get skipped. The fix is to mention them in the description on entry.
- **Locked figures without an `ariaLabel` are silent to SR users.** Every locked-figure type (`locked-point`, `locked-line`, `locked-polygon`, `locked-function`, `locked-vector`, `locked-ellipse`) already accepts an optional `ariaLabel` prop and renders the `aria-label` attribute only when it is set — so a content author can ship a graph whose locked figures are completely unannounced. There is no authoring-time enforcement today. Surfaced [in this comment](https://khanacademy.atlassian.net/browse/LEMS-3946?focusedCommentId=470791) on the spike ticket after the initial research landed. **Fix:** an authoring-time `perseus-linter` rule that warns when a locked figure on an interactive-graph widget has a missing or empty `ariaLabel`. This complements the runtime traversability prefix above — the prefix tells SR users locked figures *exist*; the linter ensures the labels they hear are *meaningful*.
- **Open question (from the same ticket):** does the same "nothing to move" treatment also apply to *static* graphs? Pending design.

### Underlying problem motivating the instruction changes

From [LEMS-3206](https://khanacademy.atlassian.net/browse/LEMS-3206), summarizing the Phase 1 UXR finding:

> Right now \[instructions\] are offered when you encounter the container; we should explore a custom keyboard shortcut that will read instructions to you on demand. **Problem to solve: users have to move OUT of the graph in order to understand HOW to interact with the graph.** Annoying.

This is the *why* behind both [OQ4](#oq4) (instructions-first DOM order) and [OQ2c](#oq2) (on-demand repeat shortcut) — the goal is that a user can fully understand and use the graph without ever leaving its focus boundary.

### Other related tickets

- **[LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943)** — Use WB Announcer in Interactive Graph (implementation of the dynamic-update piece).
- **[LEMS-2971](https://khanacademy.atlassian.net/browse/LEMS-2971)** — umbrella ticket for the Phase 1 quality-notes findings above.

---

## WB Announcer Implementation

This area covers the foundational Announcer infrastructure that surfaces dynamic SR feedback when graph state changes — the first of the two Silver-tier requirements above.

### Goals for this area

Duplicated from [Goals & Requirements](#goals--requirements) for area-specific reference:

- **Bronze → Silver requirement:** surface dynamic feedback to SR users when graph state changes (not just re-reading static labels).
- **Designer's planned updates:**
    - Announce graph entered / exited via the Wonder Blocks `Announcer`. *(Cross-cuts with [Focus Trap & Entry/Exit](#focus-trap--entryexit) — same handler, same announcement.)*
    - Announce dynamic changes (point added, point removed, shape closed, etc.) via WB `Announcer`.
- **UXR-derived requirements:** Linear / segment / circle should announce *that the element moved*, not just its current location. *(The "moved" announcement infrastructure lives here; the per-graph math-heavy copy lives under [Per-Graph Copy Improvements](#per-graph-copy-improvements).)*
- **Other related tickets:** [LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943) — Use WB Announcer in Interactive Graph (implementation of this area).

### OQ3 — How should the WB Announcer be integrated? <a id="oq3"></a>

[LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943) requires WB Announcer in all answer types. Where the `announce()` calls live determines maintainability.

| Option | Pros | Cons |
| --- | --- | --- |
| A. Call `announce` from each per-graph component (e.g. `LinearGraph` calls it in an effect when `coords` changes) | Each graph controls its own messaging; easy to customize per type. | 13 graph types × multiple events each = many call sites; easy to drift; hard to test centrally; copy changes touch every graph file. |
| B. Centralize via reducer middleware — emit announcement events from the reducer; one subscriber maps action → string → `announce()` | One source of truth for "what we announce when"; keeps graph components dumb; testable without React. | Action types become coupled to SR copy; math-heavy announcements (e.g. circle's `getRadius`) force one of three bad choices: shovel computed values into action payloads, recompute the math in middleware, or import React i18n context into the reducer. |
| **C. Hybrid** ✅ — central handler for the universal events (entered, exited, point added, point removed, shape closed, shape opened), per-graph for the type-specific nuance (e.g. circle resize vs. translate) | Best of both; matches the natural granularity of the UXR feedback; central core stays React-free and unit-testable; per-graph escape hatch keeps math-heavy copy where the math lives. | Needs a clear routing rule (see below) so the pattern doesn't drift toward A or B in practice. |

**Decision: C.** A working POC of this hybrid lives on the **`catjohnson/lems-3946-prototype`** branch under `packages/perseus/src/widgets/interactive-graphs/announcer/` (see `central-announcer.ts` for the pure handler and `use-announcing-reducer.ts` for the React surface). The POC validated all the pros above and surfaced the routing rule and aria-live migration constraint documented in the subsections below.

#### Routing rule: which announcements go where

**Rule:** an announcement belongs in the **central handler** if and only if it can be produced from the dispatched action plus the surrounding state, using at most `srFormatNumber` for value formatting. If it needs derived math (`getRadius`, `getSlope`, distance / area calculations), graph-specific copy that varies per type, or context that isn't on the action — it belongs in the **per-graph component** via `useGraphAnnouncer`.

**The canary:** the moment you find yourself wanting to import a math utility (e.g. `getRadius`, `getSlopeStringForLine`, `getClockwiseAngle`, `getInterceptStringForLine`) into `central-announcer.ts`, stop — that's the signal the announcement should have been per-graph. The central handler should depend only on action types, state shape, the strings bundle, and `srFormatNumber`.

**When in doubt: start central, then move to per-graph only when forced.** The cost of moving an announcement out of the central handler later is small (delete the case, add a hook call in the relevant graph). The cost of moving math into the central handler is larger (it grows graph-specific dependencies and stops being agnostic).

#### Initial routing for known events

This is a starting point — adjust as the implementation progresses and as design supplies copy for events not listed below.

| Event / action | Where | Why |
| --- | --- | --- |
| `ADD_POINT` | Central | Action carries coords; copy is the same on every graph that supports add. |
| `REMOVE_POINT` | Central | Action carries the index; "point removed" is universal. |
| `CLOSE_POLYGON` / `OPEN_POLYGON` | Central | No payload needed; copy is universal. |
| `DELETE_INTENT` | Central | Universal "point deleted" message. |
| `CHANGE_INTERACTION_MODE` | Central | "Entered keyboard mode" / "Exited keyboard mode" — universal. |
| Graph focus entered / exited (the focus-trap from [OQ1](#oq1)) | Central | "Graph entered" / "Graph exited" — universal. |
| `MOVE_ALL` (polygon translated) | Central | Generic "polygon translated" is sufficient when no math context is needed. |
| `MOVE_LINE` (linear / segment / ray, with no slope/intercept context) | Central | If copy is just "line moved", central. Slope/intercept copy → per-graph. |
| Circle resize (`MOVE_RADIUS_POINT`) — "Radius is now N" | Per-graph | Needs `getRadius`. |
| Linear graph slope / intercept changes | Per-graph | Uses `getSlopeStringForLine`, `getInterceptStringForLine`. |
| Linear-system intersection moved | Per-graph | Intersection math (point-of-intersection calculation). |
| Polygon angle / side-length changes (when `showAngles` / `showSides` is on) | Per-graph | Math-heavy and conditional on graph config. |
| Sinusoid extremum / midline / max / min copy | Per-graph | Domain-specific terminology and detection. |
| Quadratic vertex quadrant changes / intercepts | Per-graph | Quadrant detection + intercept math. |
| Exponential / logarithm asymptote crossings | Per-graph | Asymptote detection is domain-specific. |
| Angle measure changes | Per-graph | Uses `getClockwiseAngle`. |
| Tangent slope / inflection-point copy | Per-graph | Domain-specific. |

#### Implementation constraint: aria-live ↔ Announcer migration must be paired

Today, several graph types announce on-change updates via `aria-live="polite"` flips on a node whose `aria-label` mutates (circle's radius point is the canonical example: it flips `ariaLive` to `"polite"` on resize so the SR re-reads the updated label). When we move an event to WB Announcer, we **must remove the corresponding `aria-live` flip in the same change**, otherwise SR users hear the same information twice — once via the live region and once via the Announcer. This was directly observed while testing the POC on the `catjohnson/lems-3946-prototype` branch.

Concretely, every PR that adds an Announcer call for a previously-aria-live event needs to:

1. Add the `announce(...)` (centrally or per-graph, per the option C split).
2. Stop the `setXyzAriaLive("polite")` flip that previously triggered the re-read.
3. Update tests that pinned the old aria-live behavior so they instead assert the new Announcer behavior (e.g. `expect(announceMessage).toHaveBeenCalledWith(...)`).

Phase 1 audit findings ([screen reader quality notes](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/3937763330/Interactive+Graph+Screen+reader+quality+notes)) identified circle, linear, segment, and the unlimited point/polygon variants as graphs whose on-change announcements currently rely on aria-live. Each one needs the paired migration above as it adopts Announcer.

#### Implementation note: per-graph announcements debounce by default

The POC's `useGraphAnnouncer` (on the `catjohnson/lems-3946-prototype` branch) defaults to a 500ms `debounceThreshold` on every announcement so continuous motion (drag, arrow-key hold) collapses to a single trailing message rather than jamming the SR queue with one announcement per intermediate position. Callers can override per call: `announce(message, {debounceThreshold: 0})` disables debouncing for that call; any other positive number overrides the default. The central handler (`useAnnouncingReducer`) intentionally does *not* debounce — its events (`ADD_POINT`, `CLOSE_POLYGON`, etc.) are discrete user actions where dropping intermediate calls would be wrong.

**Potential footgun for future implementers:** WB Announcer mounts a single `<Announcer>` instance per page and all callers share its queue. As long as each caller passes its own `debounceThreshold`, the per-message-stream debounces are independent — a radio widget's 750ms character-count debounce and a circle's 500ms resize debounce don't fight each other. But two interactive graphs on the same page (or a graph plus another widget all calling `useGraphAnnouncer` with the default) **share the queue**. If chatter on busy pages becomes a real problem, the lever is either tuning per-call `{debounceThreshold}` overrides per graph type, or layering a higher-level dedupe inside `useGraphAnnouncer` (e.g. only announce if the message text differs from the last one within some window). Not worth pre-solving — file a follow-up if production telemetry or UXR shows the queue is thrashing.

---

## SR Instruction Improvements

This area covers the instruction text, where it lives in the DOM, and the keyboard shortcut to repeat instructions on demand — closing the loop on the LEMS-3206 problem.

### Goals for this area

Duplicated from [Goals & Requirements](#goals--requirements) for area-specific reference:

- **Designer's planned updates:**
    - Move instructions inside the graph as the first `sr-only` element so they are read on entry.
    - Insert + I keyboard shortcut to repeat the graph instructions on demand.
    - Update instruction text to reflect Focus mode and the Action Bar.
- **Level Access audit findings:**
    - [LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003) / [LEMS-2736](https://khanacademy.atlassian.net/browse/LEMS-2736) — Ctrl + Shift + Arrow conflicts with JAWS / NVDA's "select by word" command.

#### Underlying problem motivating these changes

From [LEMS-3206](https://khanacademy.atlassian.net/browse/LEMS-3206), summarizing the Phase 1 UXR finding:

> Right now \[instructions\] are offered when you encounter the container; we should explore a custom keyboard shortcut that will read instructions to you on demand. **Problem to solve: users have to move OUT of the graph in order to understand HOW to interact with the graph.** Annoying.

This is the *why* behind both [OQ4](#oq4) (instructions-first DOM order) and [OQ2c](#oq2) (on-demand repeat shortcut) — the goal is that a user can fully understand and use the graph without ever leaving its focus boundary.

### OQ2 — What should the new instruction text say? <a id="oq2"></a>

Designer's proposed text is one block applied to all graphs:

> "Set your Screen Reader to Focus mode. Use the Tab key to move through the elements in the graph and access the graph Action Bar. Buttons in the graph are interactive elements. When a button has focus, use Control + Shift + the Arrow keys to move it or use the Delete key to remove it. Use the buttons in the Action Bar to add points or close shapes within the graph. Use Insert + I to repeat these instructions."

The leading sentence ("Set your Screen Reader to Focus mode") is the **mode-toggle warning** that both [OQ2b](#oq2) (Ctrl + Shift + Arrow) and [OQ2c](#oq2) (Insert + I) depend on — without it, those chords are intercepted by JAWS Virtual Cursor / NVDA Browse mode in default SR config. We may want to expand it slightly to name the specific toggles (JAWS: Insert + Z; NVDA: Insert + Space) so users who don't know "Focus mode" by name can still find the right command; final wording is a copy decision for the team.

This raises three sub-questions.

#### OQ2a — One unified string vs. per-variant strings?

| Option | Pros | Cons |
| --- | --- | --- |
| A. Single unified string (designer's proposal) | Predictable; users hear the same instructions everywhere. | Mentions "Action Bar", "add points", "close shapes" — none of which apply to bounded graphs (linear, circle, sinusoid, etc.); risks confusing users. |
| **B. Two strings (bounded vs. unlimited)** ✅ — keeps today's split | Each user only hears relevant guidance. | Two strings to keep in sync; adds branching in code. |
| C. Compose from fragments per graph capability (e.g. always include base + conditionally include "delete", "Action Bar", "close shape") | Most accurate; scales to future graph types. | More logic; harder to translate well. |

**Decision: B.** Keep the existing `srGraphInstructions` / `srUnlimitedGraphInstructions` split. The designer's full text applies cleanly to the unlimited variant; the bounded variant gets a trimmed version that drops Action Bar / add-point / close-shape language. Sync the two when copy changes.

#### OQ2b — Should the Ctrl + Shift + Arrow shortcut change?

[LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003) is open because Ctrl + Shift + Arrow collides with JAWS/NVDA "select by word". The designer's "potential updates" list includes "Change keys for moving arrows".

| Option | Pros | Cons |
| --- | --- | --- |
| **A. Keep Ctrl + Shift + Arrow** ✅ — and warn users in the on-entry instructions to toggle off Virtual Cursor (JAWS: Insert + Z) / Browse mode (NVDA: Insert + Space) before interacting with the graph | No code change to the keybindings themselves; backwards-compatible with current users' muscle memory; the warning lives in the existing instruction string rather than as new UI. | Adds length to the instruction text. Doesn't help VoiceOver users (different mode-toggle conventions). The conflict still exists in default SR config until the user follows the warning. |
| B. Switch to Alt + Arrow | Doesn't conflict with major SRs' word-selection commands; shorter chord. | Conflicts with browser back / forward in some browsers; need to verify across Chrome / Firefox / Safari / Edge; breaks muscle memory for existing users. |
| C. Activate-then-move (designer's "potential" idea: Space activates the handle, then plain Arrow keys move it) | Avoids all chord conflicts; matches native button + Spacebar pattern; conceptually clean. | Two-step interaction is heavier per-move; need a clear "deactivate" affordance; may break muscle memory of current users. |
| D. Both: keep Ctrl + Shift + Arrow as default, add Space-to-activate as an alternate path | Backwards-compatible; gives users a working escape hatch. | Two interaction models live side-by-side, doubling test surface and docs. |

**Decision: A.** Keep Ctrl + Shift + Arrow as-is, and update the on-entry instructions to warn users to toggle off Virtual Cursor / Browse mode before interacting with the graph. The mode-toggle warning is shared with OQ2c's Insert + I shortcut — both shortcuts need the user out of Virtual Cursor / Browse mode to land, so a single sentence in the instructions covers both. The existing keys keep current users' muscle memory intact. Revisit B / C / D if production SR feedback shows the friction is materially worse than expected.

#### OQ2c — Insert + I to repeat instructions: scope?

The designer's plan reuses Insert + I, which is JAWS's "read window title" chord and uses the NVDA modifier key. The standards research below reframes the trade-offs.

**Standards & SR-mode background** (sources at the end of this section):

- **WCAG 2.1.4 (Character Key Shortcuts)** applies when a shortcut uses *only* printable characters (letters / digits / punctuation / symbols). It has three compliance paths: (1) provide a way to turn the shortcut off, (2) provide a way to remap it to include a non-printable modifier, or (3) make the shortcut **active only when the component has focus**. Path (3) costs us nothing — our key handler is already attached to the focusable graph wrapper.
- **Browse / Virtual mode vs. Focus / Forms mode.** JAWS and NVDA default to Browse mode on web pages, in which the SR intercepts most keystrokes (single letters become quick-nav, Insert chords are SR commands) before the page sees them. Forms / Focus mode passes keystrokes through. SRs auto-switch to Forms mode when focus enters a control with certain ARIA roles (e.g. `application`, `dialog`, composite widget roles like `tablist`, `combobox`, `tree`). This is the same lever discussed under [OQ6a](#oq6) — `role="application"` would force Forms mode on the graph wrapper.
- **Insert is the SR-reserved modifier key.** On JAWS, Insert is the JAWS Key. On NVDA, Insert is the default NVDA Key (Caps Lock is the alternate). Insert chords are reserved for SR commands and are typically consumed before the page handler runs, regardless of mode. Overriding them means the override silently fails for many users.
- **Discoverability principle** (W3C key-binding guidance): any custom binding "should provide an approach for user discovery in a device independent and accessible manner." Whatever we pick must be announced in the on-entry instructions, surfaced in visible UI, or both.

**What this means for our shortcut.** Two constraints emerge:

1. The chord must include a non-printable modifier *or* we must lean on the focus-scoped exception. Either way works under WCAG. Insert is non-printable, so we're fine on this axis.
2. If the chord uses Insert (the SR-reserved modifier), screen reader users will need to use the SR's existing **pass-through mechanism** to reach our handler — but that mechanism is well-known among SR users and is the standard escape hatch for exactly this kind of conflict. Specifically: JAWS supports **Insert + 3** (or Insert + F3) to pass the next keystroke through, plus a settings-level **"Allow Web Application Reserved Keystrokes"** option (since JAWS 16.0) that disables this interception per-site once enabled. NVDA supports **NVDA + F2** to pass the next keystroke through.

| Option | Pros | Cons |
| --- | --- | --- |
| **A. Implement Insert + I (Windows) / Fn + Enter + I (Mac)** ✅ — and warn users in the on-entry instructions to toggle off Virtual Cursor (JAWS: Insert + Z) / Browse mode (NVDA: Insert + Space) before interacting with the graph | Matches designer's spec. Insert + I is recognizable to JAWS / NVDA users as following the SR chord convention; Fn + Enter + I gives Mac / VoiceOver users a working alternative on Apple keyboards (which have no Insert key). Compliant with WCAG 2.1.4 because the handler is graph-focus-scoped. Sighted keyboard users hit the chord directly. The mode-toggle warning is shared with OQ2b's Ctrl + Shift + Arrow guidance — one sentence in the instructions covers both shortcuts. | Two chords to wire up (platform-detected dual binding) and document. Adds length to the instruction text. The Windows conflict still exists in default SR config until the user follows the warning; alternatively SR users can use per-keystroke pass-through (Insert + 3 in JAWS, NVDA + F2 in NVDA) without the mode toggle. |
| B. Use `?` (Shift + /) — common web-app pattern (Slack / GitHub / Gmail "show keyboard shortcuts") | Familiar; cross-platform; small chord. | Single printable character — in Browse mode SRs intercept it as quick-nav. Only works when the user is already in Forms/Focus mode. Acceptable under WCAG 2.1.4 because we'd scope it to graph focus, but in practice fragile across SRs. |
| C. Use a non-printable-modifier chord that's unreserved by the major SRs (e.g. Alt + I, Ctrl + /, or a plain function key like F1) | Avoids the SR pass-through requirement entirely; passes WCAG 2.1.4 trivially. | Diverges from designer's spec. Alt and Ctrl have their own conflicts with browser / OS chords; would need to be verified across Chrome / Firefox / Safari / Edge. F-keys have no conflicts but feel less discoverable. |
| D. Surface a visible "Repeat instructions" button | Works regardless of SR mode, browser, or OS. | Adds UI a sighted keyboard user doesn't need; clutters the Action Bar for a function that's primarily an SR convenience. |

**Decision: A.** Ship Insert + I on Windows and Fn + Enter + I on Mac (designer's call after consultation). Bind both chords to the same handler via platform detection so each platform's users hit a chord that actually exists on their keyboard. Update the on-entry instructions to warn users to toggle off Virtual Cursor / Browse mode before interacting with the graph. The mode-toggle warning is shared with OQ2b's Ctrl + Shift + Arrow guidance, so a single sentence in the instructions covers both shortcuts. The Windows chord deliberately leans on the JAWS convention, which is why it's recognizable to the target audience.

**Implementation note: confirm instruction copy with Darrell.** When the implementation lands, check with Darrell (our SR tester) on the final instruction wording. Specifically, decide whether the on-entry instructions should mention **both** chords (Insert + I and Fn + Enter + I) or just the platform-relevant one — this depends on whether the strings bundle does platform-conditional copy or ships the same text everywhere. Darrell's input on which form is least confusing to SR users should drive the call.

**Sources:**

- [W3C — Understanding WCAG SC 2.1.4 Character Key Shortcuts](https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html)
- [W3C — G217: Providing a mechanism to allow users to remap or turn off character key shortcuts](https://www.w3.org/WAI/WCAG21/Techniques/general/G217)
- [W3C — F99: Failure of SC 2.1.4 due to character key shortcuts that cannot be turned off or remapped](https://www.w3.org/WAI/WCAG21/Techniques/failures/F99)
- [Freedom Scientific — How to Bypass Navigation Quick Keys](https://support.freedomscientific.com/Training/Surfs-Up/BypassNavigationQuickKeys.htm) (Insert + 3 pass-through and "Allow Web Application Reserved Keystrokes" setting)
- [WebAIM — Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/) (Browse vs. Focus mode, NVDA + F2 pass-through)
- [WebAIM — Using JAWS to Evaluate Web Accessibility](https://webaim.org/articles/jaws/) (Virtual vs. Forms mode)
- [Freedom Scientific — JAWS treatment of `role="application"` vs. `role="document"`](https://support.freedomscientific.com/support/technicalsupport/bulletin/1665)
- [TPGi — Event handling in JAWS and NVDA](https://www.tpgi.com/event-handling-in-jaws-and-nvda/) (mode switching driven by ARIA roles)
- [WebAIM — Keyboard Accessibility / Accesskey](https://webaim.org/techniques/keyboard/accesskey) (general guidance on shortcut conflicts)
- [Smashing Magazine — UX Optimizations for Keyboard-Only and Assistive Technology Users](https://www.smashingmagazine.com/2019/06/ux-optimizations-keyboard-only-assistive-technology-users/) (discoverability of shortcuts)

### OQ4 — Where should instructions live in the DOM, and what is the announcement order? <a id="oq4"></a>

Today the order inside the graph wrapper is: `description` → `interactiveElementsDescription` → `instructions`. Designer wants `instructions` first.

| Option | Pros | Cons |
| --- | --- | --- |
| **A. Reorder to: instructions → description → interactiveElements** ✅ (designer's plan) | Users hear "how to use it" before "what's in it"; matches designer spec; resolves the LEMS-3206 problem of users having to leave the graph to learn the keys. | Current users have learned the existing order; description-first matches typical "what is this thing?" SR exploration. |
| B. Keep description first, instructions last; rely on Insert + I / button to surface them | Description-first is conventional for SR exploration of complex widgets. | Loses the on-entry teach-the-keys moment that the focus trap is supposed to provide. |
| C. Two stages: announce a brief "Interactive graph — press Insert + I or click *Help* for instructions" on focus entry, then full description; instructions only on demand | Concise on entry; non-noisy for repeat users. | Requires building the on-demand surface; harder to discover for first-time users. |

**Decision: A.** Reorder so instructions come first. Revisit C in a later iteration if user testing shows the on-entry block is too long; the on-demand shortcut from OQ2c is a partial mitigation already.

---

## Focus Trap & Entry/Exit

This area covers the focus trap (Shift + Enter to enter, Escape to exit), the announcement on entry/exit, and the LEMS-2681 focus-jump bug — closing the loop on the second Silver-tier requirement.

### Goals for this area

Duplicated from [Goals & Requirements](#goals--requirements) for area-specific reference:

- **Bronze → Silver requirement:** move focus appropriately for keyboard / SR users after input.
- **Designer's planned updates:**
    - Focus trap. Shift + Enter enters the graph; Escape exits.
    - Announce graph entered / exited via the Wonder Blocks `Announcer`. *(Cross-cuts with [WB Announcer Implementation](#wb-announcer-implementation) — the announcement infrastructure lives there; this area owns the trigger.)*
- **Level Access audit findings:**
    - [LEMS-2681](https://khanacademy.atlassian.net/browse/LEMS-2681) — after Shift + Enter on unlimited polygon, focus stays on the graph outline instead of jumping to "Add Point".

### OQ1 — How aggressive should the focus trap be? <a id="oq1"></a>

The designer's plan calls for "complete graph focus trap (Shift + Enter to enter, Escape to exit)". Today only the unlimited variants change `interactionMode` on Shift + Enter; bounded graphs are entered by Tab alone.

| Option | Pros | Cons |
| --- | --- | --- |
| **A. Trap on all graphs (bounded + unlimited)** ✅ | Consistent mental model; matches designer's plan; one set of instructions to learn. | Behavior change for every existing bounded graph — risks regressions and re-training for current SR users. |
| B. Trap only on unlimited graphs | Minimal change; matches today's Shift + Enter semantics. | Inconsistency between graph variants is the *exact* thing UXR called out as confusing in Phase 1. |
| C. Trap on all graphs but make Escape optional (Tab also exits) | Forgiving; supports SR users who instinctively Tab away. | "Optional trap" isn't a real focus trap; some assistive tech expects deterministic boundaries. |

**Decision: A.** Trap on all graphs, behind a feature flag for gradual rollout. UXR explicitly flagged inconsistency between variants as confusing, and a unified entry/exit model is what the new instruction text describes anyway.

---

## Graph Semantic Role

This area covers adding a semantic ARIA role to the graph wrapper, per the LEMS-3946 spike's explicit ask.

### Goals for this area

- **LEMS-3946 explicit ask:** add `role="figure"` to the graph wrapper (citing the [Slack thread](https://khanacademy.slack.com/archives/C0AHH9H21H7/p1773335431042999) between Caitlyn Mayers and Ivy Olamit).

### OQ6 — `role="figure"` on the graph wrapper? <a id="oq6"></a>

LEMS-3946 calls out adding `role="figure"`, citing [this Slack thread](https://khanacademy.slack.com/archives/C0AHH9H21H7/p1773335431042999) (Caitlyn Mayers ↔ Ivy Olamit, March 2026). Two things came out of that thread worth pinning down here:

1. **Confirmed current state:** the IG widget has no `role="figure"` anywhere. The only roles in use today are `role="button"` on every interactive handle (movable points / lines / asymptotes / control arrowheads / circle / vector) and `role="img"` on every locked figure (point, line, vector, function, ellipse, polygon). Axis ticks are `role="presentation"`. The outer `mafs-graph` `View` — the focusable wrapper — has **no role at all**.
2. **Explicit open question from Caitlyn:** *"I'm not sure which element's the right one to receive that attribute."* The thread punted that decision to the implementation conversation.

So OQ6 splits into two sub-questions.

#### OQ6a — Should we add `role="figure"`?

| Option | Pros | Cons |
| --- | --- | --- |
| **A. Add `role="figure"`** ✅ (primary) | Matches the semantic ("a self-contained piece of media with its own caption"); SRs announce "figure" on entry, which gives SR users a clearer mental model of the widget. | `role="figure"` on a focusable interactive element is a slight semantic mismatch — figures aren't typically widgets; some SRs may stop announcing the interactive children. |
| **B. Add `role="application"`** ⚠️ (fallback) | Tells SRs this is a custom widget where Forms/Browse mode should not intercept keys (would also help [OQ2b](#oq2)). | "application" is heavy-handed; many SR users have it bound to switch into modes that hide useful announcements. |
| C. Add `role="group"` | Lightweight grouping; stays out of the SR's way. | Doesn't tell SRs anything new beyond what `aria-label` already does. |
| D. Leave as-is | No risk. | Doesn't address the spike's explicit ask. |

**Decision: A, with B as the fallback.** Ship `role="figure"` first and verify against NVDA, JAWS, and VoiceOver. If `role="figure"` causes any SR to suppress announcement of the interactive children (the documented risk for that role on a focusable widget), fall back to `role="application"` — that also has the side benefit of nudging SR mode-switching, which connects to OQ2b. C and D are rejected because they don't move the needle on the spike's explicit ask.

**Implementation cost of falling back to B.** `role="application"` is much more than a label — it tells assistive technology to stop intercepting browser-level events and to treat the entire region as a custom widget. In practice, the screen reader stops providing the built-in HTML accessibility behaviors we currently rely on (default focus announcements, Tab/landmark/heading navigation, automatic semantic announcements for interactive controls inside the region). To preserve an equivalent SR experience, we would need to **re-invent those affordances ourselves** in the interactive-graph widget — manually announcing focus changes, manually exposing structural navigation, manually re-creating any role-driven behavior that today comes free from the platform. Treat the fallback as a non-trivial commitment, not a flag flip: ship `role="figure"` and only flip to `role="application"` if cross-SR testing leaves no other option. If we do flip, plan follow-up work to rebuild the accessibility surface that `role="application"` suppresses.

#### OQ6b — Which element gets the role?

Three plausible attachment points:

| Option | Pros | Cons |
| --- | --- | --- |
| **A. The outer focusable `mafs-graph` `View`** ✅ (the element that already has `tabIndex=0`, `aria-label`, `aria-describedby`) | One element owns name, role, description, focus, and keyboard handling — clean from an a11y-tree perspective. | Combines `role="figure"` with `tabIndex=0`; some SRs may suppress focus announcements on figures. Needs cross-SR testing. |
| B. The outer `mafs-graph-container` (the non-focusable parent that wraps the graph + Action Bar) | "Figure" includes the action bar — better caption semantics if we treat the whole assembly as one media unit. | Splits the figure boundary from the focus boundary; SRs may announce "figure" before the user even tabs in, then again on tab — possibly noisy. |
| C. The Mafs SVG itself (the inner `<svg>` produced by `<Mafs>`) | Most semantically correct — "figure" describes visual media; SVG is the visual media. | Decouples the role from the focusable wrapper; the focused element would have `tabIndex=0` but no role, weakening the "this is a widget" signal. Also, there are *two* Mafs SVGs (one for grid+locked, one for interactive) — picking one is arbitrary. |

**Decision: A.** The outer `View` is already the widget's "front door" for SR users — it owns the name, description, and focus — so making it the figure unifies that story. Validate by listening across NVDA, JAWS, and VoiceOver on the first PR before rolling out widely; if the focusable-figure combination is noisy, that's one of the signals that would push OQ6a to its fallback.

---

## None-type / Static / Locked Figure Messaging

This area covers entry-time messaging for graphs that are non-interactive (none-type), read-only (static), or contain locked figures — plus authoring-time enforcement that locked figures carry meaningful labels.

### Goals for this area

Duplicated from [Goals & Requirements](#goals--requirements) for area-specific reference:

- **UXR-derived requirements:**
    - "None" / static graphs: make non-interactivity obvious in the description.
    - Locked figures: descriptions are read *after* the instructions tell the user to tab away — they get skipped.
- **None-type / static / locked-figure requirements** (from [LEMS-3205](https://khanacademy.atlassian.net/browse/LEMS-3205)):
    - **None-type graphs need an explicit "nothing to move" label** — treat the graph the same as a non-interactive image; users currently get no signal that the graph is not interactive.
    - **Locked figures must announce that they are traversable, but not via Tab.** The fix is to mention them in the description on entry.
    - **Locked figures without an `ariaLabel` are silent to SR users.** Authoring-time `perseus-linter` rule that warns when a locked figure on an interactive-graph widget has a missing or empty `ariaLabel`. (See full rationale in the [main G&R bullet](#none-type--static--locked-figure-requirements).)
    - **Open question:** does the same "nothing to move" treatment also apply to *static* graphs? Pending design.

*(No OQs for this area — the requirements are direct asks; the only open question is the static-graph treatment, which is pending design and tracked in the bullet above.)*

---

## Per-Question Authoring

This area covers the authoring-side affordance for content authors to attach question-specific labels to interactive points.

### Goals for this area

Duplicated from [Goals & Requirements](#goals--requirements) for area-specific reference:

- **Level Access audit findings:**
    - [LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995) — generic "Point 1" label doesn't match the question's "Point T".

### OQ5 — Per-question label override (Level Access "Point T" issue)? <a id="oq5"></a>

[LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995) wants the SR label to match the question's prose ("Point T") rather than the generic "Point 1".

| Option | Pros | Cons |
| --- | --- | --- |
| **A. Add an optional authoring field** ✅ (e.g. `pointLabels?: string[]` on `PerseusGraphTypePoint`, mirrored on `PerseusGraphTypePolygon`); fall back to the current `"Point N"` string when unset or when an individual entry is missing | Authors get exact control when they need it ("Point T", "Vertex A") and pay no cost when they don't — the field is optional and existing content keeps its current SR labels with no migration. Closes the Level Access finding ([LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995)). | New schema field on a widely-used type; needs editor UI to expose it; needs the fallback wired carefully so a partially-filled array (e.g. `["T", undefined, "U"]` or `["T"]` on a 3-point graph) still produces sensible "Point 2" / "Point 3" output for the unset entries; localization story (the override is plain text and is the author's responsibility, same as `fullGraphAriaLabel`). |
| B. Auto-derive labels from the question text | Zero authoring burden if it works. | Heuristic; brittle; will mislabel as often as it helps; not localization-safe. |
| C. Improve the generic label only ("the first point", "the second point", and let the description repeat the question) | No schema change; ships fast. | Doesn't actually fix the bug — Level Access wants the prose to match. |
| D. Document and lint that authors set `fullGraphAriaLabel` / `fullGraphAriaDescription` | No code change; the prop is already in place. | Doesn't reach the per-handle label, which is what the SR reads on focus. |

**Decision: A.** Add an optional `pointLabels?: string[]` to `PerseusGraphTypePoint` and `PerseusGraphTypePolygon`. The per-handle SR label uses `pointLabels[i]` if set; otherwise falls back to the existing `srPointAtCoordinates` string ("Point %(num)s at %(x)s comma %(y)s"), so any unset entries — and all existing content — keep producing "Point 1", "Point 2", etc. Implementation note: the fallback should be per-index, not all-or-nothing, so a graph with `pointLabels: ["T"]` on a two-point graph reads "Point T at …" and "Point 2 at …".

---

## Action Bar

This area covers the Action Bar grouping and the "Add Point" disable rule that prevents stacked-at-origin points.

### Goals for this area

Duplicated from [Goals & Requirements](#goals--requirements) for area-specific reference:

- **Designer's planned updates:**
    - **Action Bar semantics:** wrap the action buttons in a `role="group"` element with `aria-label="Action Bar"`.
    - **Disable "Add Point"** until the previously-added point has been moved off the origin (prevents stacking).

### OQ7 — Action Bar grouping and "Add Point" disable rule? <a id="oq7"></a>

Designer wants `role="group"` + `aria-label="Action Bar"` and "Add Point disabled until the previously-added point has moved off the origin".

For the **role/label**: this is a small change in `renderPointGraphControls` / `renderPolygonGraphControls`. Low-risk; just do it.

For the **disable rule**: today the button always dispatches `actions.pointGraph.addPoint([0,0])`. The state already tracks `focusedPointIndex` and the points array.

| Option | Pros | Cons |
| --- | --- | --- |
| A. Disable when *any* point is at (0, 0) | Simple rule; matches the SR pain point (stacked points at origin). | Edge case: a problem may legitimately want a point at the origin; user can't add a second one until they first move the existing one. |
| **B. Disable only the *most-recently-added* point if it's still at (0, 0)** ✅ | Matches designer's wording ("newly added point is moved from the origin"). | Need to track "last added" in state; slightly more reducer surface. |
| C. Don't disable — instead, place the new point at an unused location (scan for the first empty integer cell near the origin) | No button-state changes; user always succeeds. | "Empty cell" is undefined for unbounded grids; placement may surprise users. |

**Decision: B.** Closest to the designer's spec and the actual UX problem (user adds a point, hasn't moved it yet, accidentally adds another on top). Implementation note: track "last added point index" in the unlimited point/polygon reducer state and gate the Add Point button on `lastAdded === null || coords[lastAdded] !== [0, 0]`.

---

## Per-Graph Copy Improvements

This area covers the per-graph-type SR copy refinements identified by UXR. Each item is a small independent fix; they live under the LEMS-2971 umbrella.

### Goals for this area

Duplicated from [Goals & Requirements](#goals--requirements) for area-specific reference:

- **UXR-derived requirements:**
    - Linear / segment / circle: announce *that the element moved*, not just its current location. *(The infrastructure for "moved" announcements lives in [WB Announcer Implementation](#wb-announcer-implementation); the per-graph copy lives here.)*
    - Circle: distinguish the interactive drag handle from the non-interactive boundary points.
    - Linear system: rephrase intersection so "point" (location) doesn't collide with "point" (interactive dot).
    - Polygon: don't enumerate every vertex when the whole-polygon group is focused; just confirm selection.
    - Sinusoid: re-evaluate exposing extremum/midline/maximum/minimum labels (sighted users don't see these).
- **Other related tickets:** [LEMS-2971](https://khanacademy.atlassian.net/browse/LEMS-2971) — umbrella ticket for the Phase 1 quality-notes findings above.

*(No OQs for this area — each item is a direct UXR finding; final copy decisions are tracked under LEMS-2971.)*

---

## Related System Architecture

This is the current structure that any SR change has to interoperate with. Files are relative to `packages/perseus/src/widgets/interactive-graphs/`.

### High-level DOM shape produced by `mafs-graph.tsx`

```
<View class="mafs-graph"
      tabIndex=0
      aria-label={fullGraphAriaLabel}
      aria-describedby="<descId> <interactiveElsId> <unlimitedPromptId> <instructionsId>">
    <View id={descriptionId} class="mafs-sr-only">{fullGraphAriaDescription}</View>
    <View id={interactiveElementsDescriptionId} class="mafs-sr-only">{interactiveElementsDescription}</View>
    <View id={instructionsId} class="mafs-sr-only">{srGraphInstructions | srUnlimitedGraphInstructions}</View>

    <Mafs>… grid, axes, locked figures …</Mafs>
    <Mafs>… interactive layer (per-graph React tree) …</Mafs>

    {interactionPrompt && <BodyText id={unlimitedGraphKeyboardPromptId}>graphKeyboardPrompt</BodyText>}
</View>
{renderGraphControls(...)}   {/* the future "Action Bar": Add Point / Remove / Close shape */}
```

Three things to notice:

1. The full graph is one big focusable `tabIndex=0` element. Its `aria-describedby` points at four sibling SR-only `<View>`s.
2. The instructions `<View>` lives **inside** the graph wrapper but is currently the **third** child, after the description nodes. The designer's update reorders this to be the first child.
3. The Action Bar (`renderGraphControls`) is a **sibling** of the focusable graph, not a child. It is not currently inside the graph's accessible name / focus region.

### Per-graph SR strings

Each graph type has its own renderer in `graphs/<type>.tsx` that produces an `InteractiveGraphElementSuite`:

```ts
type InteractiveGraphElementSuite = {
    graph: ReactNode;                          // the <g>/<svg> tree
    interactiveElementsDescription: string;    // the sr-only summary
};
```

Internally each renderer follows a consistent pattern (see `graphs/linear.tsx` for a clean example):

- A `describe*Graph(state, i18n)` pure function builds the strings (graph label, points list, slope, intercept, grab-handle label).
- The graph renders a wrapping `<g>` with `aria-label` + `aria-describedby` and uses `SRDescInSVG` (`graphs/components/sr-description-within-svg.tsx`) to embed the descriptions inside the SVG via `<foreignObject>` (required because some browser/SR combos can't read raw SVG text nodes through `aria-describedby`).
- Numeric values flow through `srFormatNumber` in `graphs/screenreader-text.ts`, which handles π-multiples and locale-aware formatting.
- Per-handle labels come from `useControlPoint` / `MovablePoint` / `MovableLine`, all of which accept `ariaLabel`, `ariaDescribedBy`, and `ariaLive`.

### Current instruction strings

Defined in `packages/perseus/src/strings.ts`:

- `srGraphInstructions`: *"Use the Tab key to move through the interactive elements in the graph. When an interactive element has focus, use Control + Shift + Arrows to move it."*
- `srUnlimitedGraphInstructions`: *"Press Shift + Enter to interact with the graph. Use the Tab key to move through the interactive elements in the graph and access the graph Action Bar. When an interactive element has focus, use Control + Shift + Arrows to move it or use the Delete key to remove it from the graph. Use the buttons in the Action Bar to add or adjust elements within the graph."*
- `graphKeyboardPrompt`: *"Press Shift + Enter to interact with the graph"* (visible toast inside unlimited graphs).

### Focus & keyboard handling

- `mafs-graph.tsx` wires `onFocus`, `onBlur`, and `onKeyUp` on the outer `View`. These dispatch to the reducer in `reducer/`.
- Shift + Enter currently dispatches `actions.global.changeInteractionMode("keyboard")` for unlimited graphs only.
- Backspace / Delete dispatches `actions.global.deleteIntent()` when the active element is a point handle.
- There is **no Escape handling** today — the user simply tabs away.
- "a" adds a point in keyboard mode for unlimited graphs.

### Where Wonder Blocks Announcer fits

WB ships an [`Announcer`](https://khan.github.io/wonder-blocks/?path=/docs/packages-announcer--docs) package that mounts an `aria-live` region once per page and exposes `announce(message, level)`. Phase 2 will call `announce(...)` from the reducer's effect points (move, add, remove, close, open) and from the focus enter/exit handlers. The package is not yet imported anywhere in the IG widget.

---

## Out of Scope / Deferred

Calling these out so reviewers don't expect them in this phase:

- **Mobile screen reader support** ([LEMS-2949](https://khanacademy.atlassian.net/browse/LEMS-2949)). VoiceOver / TalkBack on touch is broken at a more fundamental level (gesture conflicts) and needs its own investigation.
- **Locked-figure focus order** (Phase 1 quality note). Touches the locked-figures system; better as a separate spike.
- **Content-side fixes** (re-authoring questions whose meaning depends on inaccessible background images). Belongs to the Content team.
- **Graph-type-specific copy review** (sinusoid extremum labels, segment slope direction, polygon translation announcement). These are individually small but each needs design + content sign-off; tracked under [LEMS-2971](https://khanacademy.atlassian.net/browse/LEMS-2971).
- **Removing Ctrl+Shift+Arrow** (see OQ2b). High-risk; recommended as a separate follow-up.

---

## Decisions Recorded

The following open questions are resolved:

- **OQ1** (in [Focus Trap & Entry/Exit](#focus-trap--entryexit)) → A. Trap focus on all graphs (bounded + unlimited).
- **OQ2a** (in [SR Instruction Improvements](#sr-instruction-improvements)) → B. Two strings (bounded vs. unlimited).
- **OQ2b** (in [SR Instruction Improvements](#sr-instruction-improvements)) → A. Keep Ctrl + Shift + Arrow; warn users in the instructions to toggle off Virtual Cursor / Browse mode.
- **OQ2c** (in [SR Instruction Improvements](#sr-instruction-improvements)) → A. Implement Insert + I on Windows and Fn + Enter + I on Mac (platform-detected dual binding); same mode-toggle warning in the instructions covers both. Confirm final instruction copy with Caitlyn, with Darrell as final sign-off, during implementation.
- **OQ3** (in [WB Announcer Implementation](#wb-announcer-implementation)) → C. Hybrid: central pure-function handler for universal events; `useGraphAnnouncer` escape hatch for graph-specific math-heavy copy. Routing rule and initial event-by-event assignments live in OQ3.
- **OQ4** (in [SR Instruction Improvements](#sr-instruction-improvements)) → A. Reorder DOM so instructions come first.
- **OQ5** (in [Per-Question Authoring](#per-question-authoring)) → A. Add optional `pointLabels?: string[]` on point/polygon graph types; fall back to "Point N" per-index when unset.
- **OQ6a** (in [Graph Semantic Role](#graph-semantic-role)) → A primary (`role="figure"`), B fallback (`role="application"`) if cross-SR testing flags issues.
- **OQ6b** (in [Graph Semantic Role](#graph-semantic-role)) → A. Apply the role to the outer focusable `mafs-graph` `View`.
- **OQ7** (in [Action Bar](#action-bar)) → B. Disable Add Point only when the most-recently-added point is still at (0, 0).

**Implementation dependency:** OQ2b and OQ2c both rely on the on-entry instructions including a Virtual Cursor / Browse mode toggle warning. The designer's proposed instruction text already opens with "Set your Screen Reader to Focus mode" — the implementation should preserve that sentence (and may expand it to name the specific toggles, per [OQ2](#oq2)).

All open questions are resolved.

## Next Steps

1. Land the Announcer integration via [LEMS-3943](https://khanacademy.atlassian.net/browse/LEMS-3943) using the OQ3 hybrid topology (central handler + per-graph escape hatch). The POC on the `catjohnson/lems-3946-prototype` branch (under `packages/perseus/src/widgets/interactive-graphs/announcer/`) is the starting point — port it across and extend `central-announcer.ts` with the events listed in OQ3's "Initial routing for known events" table.
2. Update the implementation tickets with the resolved decisions and a phased rollout plan (feature flag):
    - [LEMS-3206](https://khanacademy.atlassian.net/browse/LEMS-3206) — instructions reordering (OQ4), on-demand repeat shortcut with platform-detected dual binding: Insert + I on Windows, Fn + Enter + I on Mac (OQ2c), `role="figure"` on the outer `View` (OQ6a/b), focus trap on all graphs (OQ1), bounded vs. unlimited instruction text split (OQ2a), keep Ctrl + Shift + Arrow with mode-toggle warning in instructions (OQ2b). Both OQ2b and OQ2c depend on the instructions including the Virtual Cursor / Browse mode toggle warning — implement that string change once and verify both shortcuts in the same QA pass. **Before merging:** confirm final instruction copy with Caitlyn, with Darrell as final sign-off — specifically whether the strings should mention both chords or just the platform-relevant one.
    - [LEMS-3205](https://khanacademy.atlassian.net/browse/LEMS-3205) — none-type graph label and locked-figure traversability messaging (decide whether to extend to static graphs).
    - File a new ticket for [LEMS-3995](https://khanacademy.atlassian.net/browse/LEMS-3995) — `pointLabels?: string[]` schema field + editor UI + per-index fallback to "Point N" (OQ5).
    - File a new ticket for the Add Point disable rule (OQ7).
    - File new tickets as needed for the remaining Level Access bugs ([LEMS-4003](https://khanacademy.atlassian.net/browse/LEMS-4003), [LEMS-2681](https://khanacademy.atlassian.net/browse/LEMS-2681)) and the UXR-derived per-graph copy fixes under [LEMS-2971](https://khanacademy.atlassian.net/browse/LEMS-2971).
