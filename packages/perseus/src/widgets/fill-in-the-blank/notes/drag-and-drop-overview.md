# Drag and Drop Widgets — Shared Context

> Reusable context for anyone working on Khan Academy's Drag-and-Drop (DnD)
> widget family ("Operation Dragon Drop"). Load this at the start of a Claude
> session working on any DnD widget or shared component, alongside the
> widget-specific doc.
>
> **Source of truth for behavior is the Confluence
> [Overview](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711973105/Overview).**
> This file summarizes it and adds repo-specific grounding. When they disagree,
> Confluence + Figma win; update this file.

## Keeping this current

This doc is only useful if it stays true. When editing it:

- **Defer to live sources** — link Confluence/Figma/Jira for anything that
  changes (behavior, status, tickets) rather than restating it here.
- **Date volatile claims** — tag point-in-time facts with `(snapshot — <month
  year>)` so readers know they may have moved.
- **Separate durable from time-sensitive** — keep stable conventions apart from
  phase/status, so one stale line doesn't make the whole doc read as stale.
- **Update it in the PR that changes reality** — e.g. when the first @dnd-kit
  wiring lands, refresh the affected notes as part of that change, like tests.

## What this project is

A new family of accessible drag-and-drop exercise widgets that share a common
foundation (layout, components, interaction + a11y model). The widgets:

| Widget                                | Answer-zone format | Confluence | Epic |
|---------------------------------------| --- | --- | --- |
| **Fill in the Blank**                 | Inline blanks within content | [FITB](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711972976/Fill+in+the+Blank) | [LEMS-4311](https://khanacademy.atlassian.net/browse/LEMS-4311) |
| **Sorter** _(existing — to refactor)_ | Column(s) + optional legend | [Sorter](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4712005818/Sorter) | [LEMS-4312](https://khanacademy.atlassian.net/browse/LEMS-4312) |
| **Categorizer**                       | Columns | [Categorizer](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4710040591/Categorizer) | TBD |
| **Composer**                          | Columns | [Composer](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711186826/Composer) | TBD |

## Shared building blocks (built first, before wiring drag-and-drop)

The strategy is to build the shared pieces first, then wire them to the DnD
engine holistically once they all exist. The set isn't only components — it also
includes reusable **logic**.

| Piece | Type | What it is | Ticket |
| --- | --- | --- | --- |
| **Choice Bank** | Component | The container/drop-zone holding the available Answer Tiles | [LEMS-4365](https://khanacademy.atlassian.net/browse/LEMS-4365) |
| **Answer Tile** | Component | The individual draggable item | [LEMS-4363](https://khanacademy.atlassian.net/browse/LEMS-4363) |
| **Actions Menu** | Component | Per-tile control giving keyboard/SR users a way to move tiles | [LEMS-4362](https://khanacademy.atlassian.net/browse/LEMS-4362) |
| **Choice Bank randomization** | Logic | Reusable logic to randomize tile order in the Choice Bank | [LEMS-4388](https://khanacademy.atlassian.net/browse/LEMS-4388) |

The shared **components** (Choice Bank, Answer Tile, Actions Menu) live in
**`packages/perseus/src/components/drag-and-drop/`**. **Choice Bank**
([LEMS-4365](https://khanacademy.atlassian.net/browse/LEMS-4365)) is the first
built there — use it as the reference for structure and the conventions below.

**The `blank` widget is _not_ one of these.** It's built alongside them under the
same prework epic
([LEMS-4364](https://khanacademy.atlassian.net/browse/LEMS-4364)), but it's the
bay for FITB's inline blanks — the other widgets drop into columns. Treat it as
FITB-specific.

## Where things live in the repo

- **Shared DnD components:** `packages/perseus/src/components/drag-and-drop/`
- **`blank` widget (FITB-specific, not shared):**
  `packages/perseus/src/widgets/blank/`
- **@dnd-kit reference:** `@dnd-kit/react@^0.5.0` is installed in
  `packages/perseus`. Working demo:
  `packages/perseus/src/__docs__/dnd-kit-demo.stories.tsx` — it renders the
  draggable as a native `<button>` (the a11y pattern to follow). Demo cleanup is
  tracked by LEMS-4369.
- **Do NOT model new work on legacy DnD** (`sorter`, `orderer`, `matcher`) —
  they use the hand-rolled jQuery `components/sortable.tsx` with no keyboard
  support. Useful only as prior art — except `sorter`, which is the live widget
  being refactored onto the new components, so it's the starting point for that
  work rather than a pattern to copy.

## Tech & conventions

- **New widgets are functional components** conforming to `WidgetExports<T>`.
  See `packages/perseus/src/widgets/CLAUDE.md` for the full new-widget checklist
  (files, registration, scoring, editor, schema, linter).
- **Component props:** prefer required props over optional-with-defaults; pass
  user-facing labels as translatable strings (no hardcoded English default); and
  represent an empty collection as an empty array (`[]`), not `null`.
- **Styling:** CSS modules with Wonder Blocks CSS custom properties
  (`var(--wb-*)`), not Aphrodite. Tokens come from
  `@khanacademy/wonder-blocks-tokens`.
- **Storybook stories:** group DnD component stories under the title
  `Components/Drag and Drop/<Name>` (e.g. `Components/Drag and Drop/Choice Bank`)
  so they nest consistently in the sidebar.
- **Designs:** before building any UI, ask the engineer whether they're working
  from a design. If so, ask for the design link or offer to connect to the Figma
  MCP to pull it.
- **Accessibility is first-class.** Follow the repo `accessibility-instructions.md`
  (native element → modified native → ARIA last). RTL support is required — avoid
  hardcoded physical directions in CSS (use flow-relative properties / logical
  properties so layout reverses automatically).
- **User input** must flow through `handleUserInput` / the `userInput` prop, not
  local state (see widgets/CLAUDE.md).

## Shared behavior (highlights — see Overview for the authoritative detail)

- **Information hierarchy:** Exercise Stimulus → Answer Zone → Choice Bank (bank
  renders last).
- **Choice Bank:** tiles live in an **unordered list**, display inline and wrap
  to multiple lines; the bank is 100% of its parent's width with height hugging
  its contents; tiles stack when the container is too narrow.
- **Answer Tiles:** content types are Text / TeX / Image / Empty (not mixed,
  except Empty). Max **content** width 200px (the content inside a tile, not the
  tile itself); images use one of seven height presets
  (24/36/48/60/72/84/96). Multi-use tiles show an SR-only "N remaining" count
  and disappear when exhausted. Single- and multi-use tiles can't be mixed.
- **Actions Menu:** because pointer drag isn't available to keyboard/SR users,
  every tile has an Actions Menu button (also available to pointer users) to
  move/clear tiles. It's the first focusable element in a tile, labeled by the
  tile value with SR-only descriptive context ("Penny. 5 remaining. Actions
  Menu."). Menu actions name their target ("Move to Blank 1" / "Clear Blank 1").
- **Announcements:** tile moves are announced via the **Wonder Blocks Announcer**
  (aria-live), e.g. "[Tile] moved to Blank 1" (and swap feedback when a blank was
  already filled).
- **Scored state (per Overview):** correct tiles switch to their correct state
  (no Actions Menu); unused tiles become disabled; the Choice Bank drops its
  dashed border, subdues the "Choices" label color, and collapses toward a single
  line when empty — putting visual weight on the answer zone's correctness.

## Boundaries / gotchas

- **Build phase, FITB only _(snapshot — Aug 2026; verify against the epic
  below)_:** the shared pieces and Fill in the Blank are being built
  **presentational-first**, before the drag-and-drop engine is wired up (that
  happens holistically once they exist). While this holds, a ticket to "build
  component X" usually does **not** include hooking it to @dnd-kit. Once wiring
  begins this no longer applies — treat the prework epic
  [LEMS-4314](https://khanacademy.atlassian.net/browse/LEMS-4314) as the live
  source of truth and update or drop this note.
- **Sorter is different: it already ships.** It gets **refactored live**, in
  place, onto the new components rather than built up presentationally and wired
  at the end. Confirm the approach per widget rather than assuming the FITB plan
  applies.
- Future changes to these components are expected as the parent widgets mature —
  they're a starting foundation, not a frozen contract.

## Key links

- Overview (shared spec): https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711973105/Overview
- Figma (Drag and Drop Widgets): https://www.figma.com/design/kVVUz62ZEMflR7cJVuVBUS/Drag-and-Drop-Widgets
- Overall epic (Drag and Drop): https://khanacademy.atlassian.net/browse/LEMS-4310
- Prework epic (shared components / common building blocks): https://khanacademy.atlassian.net/browse/LEMS-4314
