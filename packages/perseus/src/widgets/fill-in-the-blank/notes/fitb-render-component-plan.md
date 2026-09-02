# FITB Render Component — Plan (POC)

> **Status: DRAFT — reviewed with Sarah (Aug 2026), awaiting explicit
> approval to start building.** Plan for extracting the
> `perseus-dnd-provider.stories.tsx` playground into a Fill in the Blank
> render component. This is a **temporary proof of concept** to demo the
> design constraints with the designers (out of office in ~2 weeks) and to
> let the schema evolve while we discover things. The real widget comes
> later; scoring is out of scope.
>
> Companion docs: [`drag-and-drop-overview.md`](./drag-and-drop-overview.md)
> (shared context) and [`fill-in-the-blank.md`](./fill-in-the-blank.md)
> (FITB spec summary). Behavior source of truth:
> [Overview](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711973105/Overview) +
> [Fill in the Blank](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711972976/Fill+in+the+Blank)
> in Confluence, and the internal Drag-and-Drop Widgets Figma file.
>
> Scope note: this plan considers **FITB and Sorter** only. Categorizer /
> Composer are out of scope for now; revisit the placement transitions when
> Categorizer's model (stacking vs single-occupancy) is actually designed.

## Decisions settled in review (Aug 2026, Sarah + Claude)

| # | Decision | Rationale |
| --- | --- | --- |
| 1 | **FITB is a parent widget embedding the `blank` *widget*** (not just the component) via in-content markers. | Translators/content editors must be able to move `[[☃ blank n]]` tags within the content string (translation pipeline + future editor UX). The `group` widget is the precedent: options embed `content` + `widgets`. The Renderer path keeps rendering/translation realistic. |
| 2 | **Content model: markdown string with `[[☃ blank n]]` markers**, not a structured segments array. | Same reason — the marker-in-string form is what translation tooling operates on. |
| 3 | **The parent owns all placement/drag/list state**, flowing through the modern controlled-widget contract. | `WidgetProps` gives every widget `userInput` + `handleUserInput` (types.ts); the widget guide prohibits storing user input locally (`useState`/`useReducer` are for UI-only state). Placements *are* the user input, so the widget computes transitions and pushes them up — no local copy. Interactive-graph's `useReducer` hybrid is the cautionary precedent: it keeps internal state *and* reports via `handleUserInput`, and its own comments acknowledge the dual-source-of-truth awkwardness. The POC mirrors the contract with `placements`/`onPlacementsChange` props. |
| 4 | **Placement transitions live in a shared pure-functions module** (`components/drag-and-drop/tile-placements.ts`), consumed by the component's event handlers. | Drag-end and the actions menu are two input paths that must produce identical transitions; pure functions keep them in one testable place, and fit the controlled contract directly (handler → `placeTile(...)` → push result up). Shared level because FITB and Sorter both use the single-occupancy + swap-to-bank model. |
| 5 | **No image dimensions in the schema.** Tiles carry only a per-tile `imageHeight` preset. | Storing width/height is messy and unprecedented (the group `images` map is deprecated; the image widget's `backgroundImage` is a different case). Height presets fix the vertical; width settles on load through the same completion-signal path TeX needs. Revisit (editor-computed dims) only if the demo shows the settle being jarring. |
| 6 | **Blank sizing measurement: measure once, at mount + async completion signals — no ResizeObserver.** | The widest-tile width only changes at initial-load moments: mount (the only measurement text tiles ever need), TeX `onRender`, image `onload` (and `document.fonts.ready` if needed). After settle nothing can change tile widths (content caps at 200px; nothing is viewport-relative), so continuous observation invites reflow risk for no benefit. Hook name: `useWidestTileWidth`. A grow-vs-gate Storybook toggle demos both reveal modes for the designers. |
| 7 | **Placed-tile menu hiding: a semantic prop on `AnswerTile`, mapped to the tile's own CSS-module class.** | Radio is the precedent: the parent tells `Choice` about state via a prop (`showCorrectness`) and Choice maps it to its own classes (`choice.tsx:34-36`) — no cross-component class reach-ins, no global hooks, no data attributes (no precedent in the package). Reserved-slot behavior: the tile keeps one width; the menu slot collapses and equal space moves to the content's end, so only content nudges inside the tile, never the line. Spec-literal grow/shrink stays as a cheap comparison toggle. Overlay rejected (covers content). |
| 8 | **Reflow breakpoint: pure-CSS container query at 504px** on the answer zone (Figma-confirmed: 503px content = stacked, 504px = inline). | Matches viewport behavior when the widget spans the viewport, stays correct in Storybook/editor/columns. First `@container` in Perseus. Narrow mode makes blanks full-width, so mobile needs no live measurement. |
| 9 | **Whole tile is draggable — the grip button included — and a still click on the grip opens the actions menu** (updated Aug 2026). | Press-and-move anywhere on the tile drags. The pointer sensor allows presses on the tile's button (`preventActivation` off; a dnd-kit `handle` would instead become the only drag origin) and gives button presses a distance-only activation, so a click of any duration opens the menu; dnd-kit suppresses the click after a real drag. All four gestures verified in-browser. |
| 10 | **POC location: `packages/perseus/src/components/drag-and-drop/fill-in-the-blank/`.** | Temporary home for the demo; migrates into `widgets/fill-in-the-blank/` when the widget is built. Using the real `blank` widget requires only an additive context hookup in `blank.tsx` — no throwaway workarounds. |
| 11 | **TeX never wraps.** Wrapping inside a TeX run would change an equation's meaning. | Reflow only ever happens *between* authored standalone blocks (operator blocks, formula chunks) — that falls out of authoring granularity and normal inline flow; nothing special to build. The tile CSS already asserts TeX no-wrap. |
| 12 | **First/last-word reflow exceptions: dropped outright** (not deferred). | Judged unreasonable/not feasible; becomes a designer conversation item since the mockups show it. |

## Draft schema the POC props mirror

Local component props for now — nothing lands in `perseus-core` until the
shape survives the demo.

```ts
// Eventually PerseusFillInTheBlankWidgetOptions
type FillInTheBlankOptions = {
    /** Answer zone: Perseus markdown containing [[☃ blank n]] markers.
     *  Translators receive this string and can move the blank tags. */
    content: string;
    /** The embedded blank widgets, keyed by marker name ("blank 1"). */
    widgets: {[name: string]: BlankWidget};

    /** Choice bank. Duplicate contents are allowed (Figma "Choice
     *  Configuration"), hence stable ids. */
    tiles: Array<{
        id: string;
        /** Perseus markdown: text, TeX, or ![alt](url). "" = empty tile. */
        content: string;
        /** Image tiles only; the 7 design height presets. */
        imageHeight?: 24 | 36 | 48 | 60 | 72 | 84 | 96;
    }>;
    tileUsage: "single" | "multi";
    /** Multi-use only; omitted = unlimited. */
    maxUsesPerTile?: number;
    randomizeTiles: boolean; // not implemented in the POC
};
```

The blank widget keeps its existing `{displayType, correctId}` options:

- `displayType` stays **explicit** (can't be derived from position: widget
  markers are markdown-level and can't sit inside `$...$` TeX, so equations
  are TeX segments interleaved with blank tags — which also enforces the
  spec's standalone-blocks authoring rule).
- `correctId` stays on the blank (stripped by `getPublicWidgetOptions`);
  scoring out of scope.
- Blank labels ("Blank 1"…) derive from marker order in `content`.

**Open (flagged, not blocking the POC):** user-input ownership in the widget
era. The POC's controlled `placements` shape (`{[blankWidgetId]: tileId}`)
implies parent-owned input; the existing per-blank
`PerseusBlankUserInput.selected` implies blank-owned. Decide before the real
widget.

## The swap-to-bank rule (for reference)

A FITB blank holds exactly one tile. Dropping a tile onto an *occupied*
blank places the new tile and returns the old occupant **to the choice
bank** — never to the source blank (so it's not a true two-way swap).
Confluence Overview + Design Plan Q5. Sorter's columns follow the
single-occupancy-per-slot model too; stacking models are out of scope
(see scope note above).

## Architecture

```
components/drag-and-drop/
├── tile-placements.ts               shared pure logic: placeTile
│                                    (swap-to-bank), clearBlank,
│                                    remainingUses, isTileInBank (+ tests)
└── fill-in-the-blank/               temporary POC home
    ├── fill-in-the-blank.tsx        component: PerseusDndProvider ▸ answer
    │                                zone (Renderer w/ content+widgets) ▸
    │                                ChoiceBank; translates dnd-kit drag-end
    │                                into placement calls; announcements +
    │                                focus management
    ├── fill-in-the-blank-context.ts context the blank widget consumes:
    │                                getBlankRenderInfo(blankId) → placed
    │                                tile node, placed drag id, widest width
    ├── use-widest-tile-width.ts     measure-once widest-tile width: mount
    │                                pass + TeX onRender + image onload,
    │                                then stop (no ResizeObserver)
    ├── fill-in-the-blank.module.css answer-zone container (@container
    │                                name), measurement block, zone↔bank
    │                                gap (64px)
    └── __docs__/fill-in-the-blank.stories.tsx
```

Why the context exists: FITB doesn't render the blank widgets — `Renderer`
does, from the markers — so FITB can't hand them props. Context is the
standard React mechanism for a parent to reach components it doesn't
directly render, and everything it carries is runtime interaction state
that by definition can't be in the schema: the placed tile, the wired
move/clear callbacks, the measured widest width, and "my tile is mid-drag".
Shape: FITB builds the fully-wired `AnswerTile` node; the blank widget just
slots it (blank stays maximally dumb).

Other mechanics:

- **Drag ids are instance-scoped** (`bank__<tileId>`,
  `placed__<blankId>__<tileId>`) because a multi-use tile renders in the
  bank and in blanks simultaneously; ids are internal to the component.
- **Both input paths** (drag, actions menu) drive the same pure placement
  functions — the contract the playground story established.
- **Small-value exception** (all tile values ≤3 chars stay inline when
  narrow): the component drops the answer zone's container-name when it
  applies, so the narrow container-query rules simply never match.

## Blank sizing: the three-job split

1. **Measure** the widest tile — needs the full tile list, so it lives in
   the FITB parent (`useWidestTileWidth`).
2. **Decide** which blanks use that width (empty + `displayType: "normal"`
   only) — FITB policy, lives in the FITB-specific `blank` widget, reading
   the measured value from context.
3. **Apply** a min-width — `BlankComponent` grows an optional, inert
   `minWidth` prop. Static-blank widgets (Sorter etc.) simply never pass
   it; nothing in the shared component assumes FITB's sizing.

## Shared component changes (all additive)

| File | Change |
| --- | --- |
| `widgets/blank/blank.tsx` | Consume `FillInTheBlankContext` (render placed tile; pass widest-tile min width for `displayType: "normal"`). No context → current behavior (Sorter unaffected). |
| `blank-component` | Min-width via CSS var (so narrow-mode CSS can override it); drag-enter restyle per Figma variant (instructive dashed border + subtle bg, radius 8); `vertical-align` for super/subscript; named-container narrow rules (full-width own-line slot); basic hug/shrink width transition with a `prefers-reduced-motion` guard (timing polish later). |
| `answer-tile` | Semantic placed prop (name TBD: `inBlank`?) → reserved-slot menu hiding, per decision 7; hover/grabbed styles per Figma (elevated shadow; grabbed radius 8→12, no tilt/opacity — variant); optional `imageHeight`; narrow-mode content left-align. |
| `temp-strings.ts` | Choices label, blank labels, move/return announcements (copy still non-final per LEMS-4368). |

## Demo (Storybook) scope — mirrors the Figma frames 1:1

| Story | Figma frame |
| --- | --- |
| Paragraph (sentence + blanks) | "Fill in the Blank Default" |
| Chemical equation w/ sub/superscript blanks | "Chemical Equation Subscript" |
| Image pattern tiles | "Image Content (Pattern)" |
| Narrow viewport / reflow | the small-viewport and breakpoint frames |
| Multi-use tiles (capped, replenishing bank, SR-only "N remaining") | visual treatment open; best guess |
| Sizing modes toggle (grow vs gate) | decision demo |
| Small-value exception | spec text |

Interactions in scope: swap-to-bank on drop into a full blank; escape-cancel
and return-on-missed-drop (dnd-kit built-ins); WB Announcer move/swap
announcements; focus to first bank tile's menu after menu moves; hidden menu
on placed tiles with hover/focus reveal (reserved slot); basic hug/shrink
transition.

## Not in the POC

- **Dropped outright:** first/last-word reflow exceptions (decision 12);
  wrapping inside TeX (decision 11 — never supported).
- **Deferred:** hug/shrink *timing* polish (basic transition is in scope);
  super/subscript sizing × hidden-menu interaction (known unresolved —
  handle after the initial POC); hover-restore of super/subscript sizing;
  tile randomization; the read-aloud button; scored states (already exist
  on the components); real schema/parser/linter work in perseus-core;
  Categorizer/Composer considerations.

## Questions to bring to the designers

1. Grow vs gate for blank sizing — or a fixed blank width (their mockups
   use a constant 140px, which would delete the measurement problem)?
2. Reserved-slot placed-tile behavior vs the spec-literal grow/shrink.
3. Multi-use "N remaining" visual treatment (not in mockups).
4. Reflow between the 343px mobile frames and 504px (currently: one
   breakpoint, continuous behavior on either side).
5. First/last-word reflow exceptions are dropped as infeasible — confirm,
   since the mockups show them.
