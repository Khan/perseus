# FITB Render Component — Plan (POC)

> **Status: DRAFT — under review.** Plan for extracting the
> `perseus-dnd-provider.stories.tsx` playground into a Fill in the Blank
> render component. This is a **temporary proof of concept** to demo the
> design constraints with the designers (who are out of office in ~2 weeks)
> and to let the schema evolve while we discover things. The real widget
> comes later; scoring is out of scope.
>
> Companion docs: [`drag-and-drop-overview.md`](./drag-and-drop-overview.md)
> (shared context) and [`fill-in-the-blank.md`](./fill-in-the-blank.md)
> (FITB spec summary). Behavior source of truth:
> [Overview](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711973105/Overview) +
> [Fill in the Blank](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711972976/Fill+in+the+Blank)
> in Confluence, and the
> [Drag-and-Drop Widgets Figma](https://www.figma.com/design/kVVUz62ZEMflR7cJVuVBUS/Drag-and-Drop-Widgets).

## Decisions settled in discussion (Aug 2026, Sarah + Claude)

| # | Decision | Rationale |
| --- | --- | --- |
| 1 | **FITB is a parent widget embedding the `blank` *widget*** (not just the component) via in-content markers. | Translators/content editors must be able to move `[[☃ blank n]]` tags within the content string (translation pipeline + future editor UX). The `group` widget is the precedent: options embed `content` + `widgets`. |
| 2 | **Content model: markdown string with `[[☃ blank n]]` markers**, not a structured segments array. | Same reason — the marker-in-string form is what translation tooling operates on. |
| 3 | **The parent owns all placement/drag/list state.** Blank widgets are passive slots fed through a React context; shared components stay stateless. | Keeps AnswerTile/ChoiceBank/Blank reusable across the widget family. Cross-widget logic sharing (Sorter, Categorizer, Composer) is deferred until after the prototype — the placement logic is pure functions, so it can move freely later. |
| 4 | **No image dimensions in the schema.** Tiles carry only a per-tile `imageHeight` preset. | Sarah: storing width/height is messy and no widget cleanly precedents it (the group `images` map is deprecated; the image widget's `backgroundImage` is a different case). Height presets fix the vertical; width settles on load through the same live-measurement path TeX already needs. Revisit (editor-computed dims) only if the demo shows the settle being jarring. |
| 5 | **Blank sizing: build the measurement hook once, demo both reveal modes.** | Empty blanks = width of the widest tile (spec). TeX (MathJax) typesets async, so that width isn't knowable at first paint. One hook measures a hidden render of all tiles (ResizeObserver + TeX re-measure); a Storybook toggle compares **grow** (blanks start at 64px, grow when measured) vs **gate** (answer zone hidden until measured). Designers pick from live behavior. |
| 6 | **Placed-tile menu: reserved-slot model.** | The menu hides on placed tiles, reappearing on hover/focus (FITB spec). Spec-literally the tile grows/shrinks — mid-sentence reflow on hover. Instead the tile keeps one width: the menu slot collapses and equal space moves to the content's end, so only content nudges inside the tile, never the line. The spec-literal grow/shrink is a cheap secondary Storybook toggle for comparison. Overlay was rejected (covers content). |
| 7 | **Reflow breakpoint: pure-CSS container query at 504px** on the answer zone (Figma-confirmed: 503px content = stacked, 504px = inline). | Matches viewport behavior when the widget spans the viewport, and stays correct in Storybook/editor/columns. First `@container` use in Perseus. |
| 8 | **Whole tile is draggable; the grip button opens the actions menu** (current iteration; revisit after designs finish). | Sarah's direction; matches the current `AnswerTile` implementation. |
| 9 | **POC location: `packages/perseus/src/components/drag-and-drop/fill-in-the-blank/`.** | Temporary home for the demo; it migrates into `widgets/fill-in-the-blank/` when the widget is built. Using the real `blank` widget requires only an additive context hookup in `blank.tsx` — no throwaway workarounds. |

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

**Open (flagged, not blocking the POC):** user-input ownership. The POC is a
controlled component (`placements` + `onPlacementsChange`, shaped like a
parent-owned `{[blankWidgetId]: tileId | null}`). Whether the widget era
keeps that parent-owned input or uses the existing per-blank
`PerseusBlankUserInput.selected` needs a decision before the real widget.

## Architecture

```
components/drag-and-drop/fill-in-the-blank/   (temporary POC home)
├── fill-in-the-blank.tsx        component: PerseusDndProvider ▸ answer zone
│                                (Renderer w/ content+widgets) ▸ sr-only
│                                read-aloud button ▸ ChoiceBank; translates
│                                dnd-kit drag-end into placement calls;
│                                announcements + focus management
├── fill-in-the-blank-context.ts context the blank widget consumes:
│                                getBlankRenderInfo(blankId) → placed tile
│                                node, placed drag id, widest-tile width
├── tile-placements.ts           pure logic: placeTile (swap-to-bank),
│                                clearBlank, remainingUses, isTileInBank
│                                (+ unit tests). Displacement policy noted
│                                as the future parameterization point.
├── use-max-child-width.ts       live widest-tile measurement (hidden tile
│                                render + ResizeObserver; catches async TeX
│                                and image loads)
├── fill-in-the-blank.module.css answer-zone container (@container name),
│                                measurement block, zone↔bank gap (64px)
└── __docs__/fill-in-the-blank.stories.tsx
```

Mechanics worth noting:

- **Drag ids are instance-scoped** (`bank__<tileId>`,
  `placed__<blankId>__<tileId>`) because a multi-use tile renders in the
  bank and in blanks simultaneously; ids are internal to the component.
- **Both input paths** (drag, actions menu) drive the same pure placement
  functions — the contract the playground story established.
- **Small-value exception** (all tile values ≤3 chars stay inline when
  narrow): the component drops the answer zone's container-name when it
  applies, so the narrow container-query rules simply never match.

## Shared component changes (all additive)

| File | Change |
| --- | --- |
| `widgets/blank/blank.tsx` | Consume `FillInTheBlankContext` (render placed tile, pass widest-tile min width for `displayType: "normal"`). No context → current behavior (Sorter unaffected). |
| `blank-component` | Min-width via CSS var (so narrow-mode CSS can override it); drag-enter restyle per Figma variant 2575:9054 (instructive dashed border + subtle bg, radius 8); `vertical-align` for super/subscript; named-container narrow rules (full-width own-line slot). |
| `answer-tile` | `menuVisibility: "always" \| "onHoverFocus"` (reserved-slot CSS); hover/grabbed styles per Figma (elevated shadow; grabbed radius 8→12, no tilt/opacity — variant 2575:9097); `compact` mode for super/subscript placed tiles (40×28-ish, node 2569-7790); optional `imageHeight`; narrow-mode content left-align. |
| `temp-strings.ts` | Choices label, blank labels, move/return announcements, read-aloud label (copy still non-final per LEMS-4368). |

## Demo (Storybook) scope — mirrors the Figma frames 1:1

| Story | Figma reference |
| --- | --- |
| Paragraph (sentence + blanks) | 2509-2246 / 2663-5211 |
| Chemical equation w/ subscript blanks | 2190-1853 / 2569-7790 |
| Image pattern tiles | 2237-556 |
| Narrow viewport / reflow | 2165-274, 2509-2462, 2509-2305 |
| Multi-use tiles (capped, replenishing bank, SR-only "N remaining") | (visual treatment open — best guess) |
| Sizing modes toggle (grow vs gate) | — decision demo |
| Small-value exception | (spec text) |

Interactions in scope: swap-to-bank on drop into a full blank; escape-cancel
and return-on-missed-drop (dnd-kit built-ins); WB Announcer move/swap
announcements; focus to first bank tile's menu after menu moves; hidden menu
on placed tiles with hover/focus reveal; sr-only read-aloud button between
zone and bank.

## Deferred (not in the POC)

- First/last-word reflow exceptions (needs text-adjacency analysis; can
  hand-mock one frame if useful for the designer conversation)
- Equation wrap behavior (operators leading wrapped lines, Figma 2223-2518)
- Hug-shrink animation timing (hand-tuned later per project plan)
- Hover-restore of super/subscript sizing (design plan Q3)
- Tile randomization, read-aloud final copy, scored states (exist already
  on the components), real schema/parser/linter work in perseus-core

## Questions to bring to the designers

1. Grow vs gate for blank sizing — or a fixed blank width (their mockups
   use a constant 140px, which would delete the measurement problem)?
2. Reserved-slot placed-tile behavior vs the spec-literal grow/shrink.
3. Multi-use "N remaining" visual treatment (not in mockups).
4. Reflow between the 343px mobile frames and 504px (currently: one
   breakpoint, continuous behavior on either side).
