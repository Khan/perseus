# Fill in the Blank Widget — Context

> Widget-specific context for the **Fill in the Blank (FITB)** widget. Read the
> shared [`drag-and-drop-overview.md`](./drag-and-drop-overview.md) **first** —
> this doc only covers what's specific to or extended by FITB.
>
> **Source of truth for behavior is the Confluence
> [Fill in the Blank](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711972976/Fill+in+the+Blank)
> page.** This file summarizes it and adds repo grounding; update it when they
> diverge.

## What it is

Learners complete sentences, equations/formulas, or patterns by dragging Answer
Tiles into empty **inline blanks**. Ideal for completing sentences and visual
patterns, and for balancing/completing equations and formulas.

- Figma: https://www.figma.com/design/kVVUz62ZEMflR7cJVuVBUS/Drag-and-Drop-Widgets?node-id=2663-5211
- Figma Make prototype: https://www.figma.com/make/zWHzKU7VnXZEyA1UsJhbNS/Fill-in-the-Blank-Widget

## Anatomy

- **Answer Zone** — inline **content** blocks interleaved with inline **blank(s)**
- **Choice Bank** — holds the **Answer Tiles** (shared component)

## Answer Zone (the FITB-specific part)

The answer zone is a sequence of inline elements — pre-filled **content** and
**blanks** — laid out on the same line(s) to form a complete string (e.g. a
paragraph). Allowed content types: Text, TeX, Images, Blank.

**Authoring granularity drives reflow.** Content is authored as many small
standalone blocks so line breaks/reflow can be controlled precisely:

- Sentences: each sentence is its own block; when a blank splits a sentence,
  each segment is its own block (e.g. `"The"` | `[blank]` | `"drum is a long-…"`).
- Equations/formulas: operators are standalone blocks.
- Image patterns: each piece is a standalone block.

### Inline blanks — the hard part

- A blank's default width = the **widest answer tile** (so size doesn't reveal
  the answer). When a tile is placed, the blank shrinks to hug the tile.
- **Reflow breakpoint at 504px line length:**
  - **≥ 504px:** classic inline behavior — blank has a fixed width, text wraps
    around it.
  - **< 504px:** blanks **fill the parent width** and sit on their own line
    (text no longer wraps around them). *Exception:* when only a single
    word/character precedes or follows the blank (e.g. first/last word of a
    sentence), it stays inline with the blank to reduce spacing exaggeration.
- **Small-value exception:** when tile values are **≤ 3 characters** (e.g.
  punctuation, single digits), keep the wide-viewport inline behavior even as the
  viewport narrows — the fill-width behavior would be disruptive for tiny items.

## Answer Tiles (FITB constraints on top of the shared tile spec)

- All content types allowed: Text, TeX, Images, Empty. Empty tiles may be mixed
  with others; Text/TeX/Images may **not** be mixed with each other. Avoid Empty
  tiles unless unavoidable (e.g. balancing a chemical equation).
- **Single word or standalone character only** — no multi-word tiles (readability
  + reflow).
- In the Choice Bank, tiles hug their contents; the whole **tile** should not
  exceed **256px** (the max choice-bank width at the 320px smallest viewport).
  This is the *tile* width, distinct from the family-wide **200px** max *content*
  width in the shared spec. Watch i18n — some languages have long words; the max
  may need to flex.
- When placed in a blank at narrow viewports, the tile+blank fill the parent
  width (contents stay left-aligned), yielding a placed-tile max width of ~500px
  (depends on blank sizing).
- Single- vs multi-use is configurable but can't be mixed within one exercise.

## Read-aloud for screen reader users (FITB-specific a11y)

Because the answer zone is chunked into many labeled interactive elements, SR
users can't easily hear the sentence as a whole. FITB adds a **screen-reader-only
"read aloud" button** (`.sr-only`, placed in the DOM **between the Answer Zone
and the Choice Bank**) that uses the **WB Announcer** (aria-live) to read the
entire answer-zone contents as one string.

- Maintain a separate **text-only** representation of the answer zone: the full
  text with blank labels ("Blank 1"), updated to substitute a blank's label with
  the placed tile's value as tiles are moved in.
- Button label ("read aloud") is pending finalization.

## Repo anchors

- **Widget folder:** `packages/perseus/src/widgets/fill-in-the-blank/` (this
  folder). Follow the new-widget checklist in
  `packages/perseus/src/widgets/CLAUDE.md` (component, tests, `index.ts`,
  `__docs__/` stories, registration in `extra-widgets.ts`, scoring in
  perseus-score, editor in perseus-editor, schema in perseus-core, linter rule).
- **`blank` widget stub:** `packages/perseus/src/widgets/blank/` — the dropzone
  primitive FITB builds on. Built during the shared prework
  ([LEMS-4364](https://khanacademy.atlassian.net/browse/LEMS-4364)) but **owned by
  FITB, not shared**. Functional component, `forwardRef` +
  `useImperativeHandle`, CSS modules + `var(--wb-*)`, `hidden: true`. Schema in
  perseus-core: `PerseusBlankWidgetOptions` (`src/data-schema.ts`) and
  `PerseusBlankUserInput` (`src/validation.types.ts`).
- **Choice Bank / Answer Tile:** shared components under
  `packages/perseus/src/components/drag-and-drop/` (see the shared overview doc).
  FITB composes them; it doesn't own them.

## Boundaries

- **Build order:** presentational structure and reflow first; drag wiring comes
  later. See the shared overview's **Build phase** note (dated, defers to the
  prework epic) for the current stance rather than relying on this line.
- The 504px reflow rules and the read-aloud model are the two most subtle,
  FITB-unique behaviors — treat the Confluence page as authoritative and design
  the DOM/state to accommodate them early.

## Key links

- FITB spec: https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711972976/Fill+in+the+Blank
- FITB epic: https://khanacademy.atlassian.net/browse/LEMS-4311
- Prework epic (shared components / common building blocks): https://khanacademy.atlassian.net/browse/LEMS-4314
- Shared overview doc: [`drag-and-drop-overview.md`](./drag-and-drop-overview.md)
