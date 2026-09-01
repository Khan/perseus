# FITB Reflow & Motion Edge Cases

> Running log of the layout/reflow complications discovered while
> building the FITB render POC — the cases that make this widget hard,
> what we chose, and what moves on screen as a result. Companion to
> [`fitb-render-component-plan.md`](./fitb-render-component-plan.md).
> Overall concern (Sarah, Aug 2026): the reflow model as designed
> produces a lot of on-screen motion for learners; several items below
> exist only to contain that.

## 1. Empty-blank width depends on async content

Spec: empty blanks are as wide as the widest tile, so size doesn't
reveal the answer. But TeX typesets after mount and images load late,
so that width isn't knowable at first paint.

- **Chosen:** measure a hidden render of all tiles once at mount, then
  re-measure only on completion signals (TeX `onRender`, image
  `onload`) and stop. No continuous observation.
- **Motion:** blanks step wider once or twice during initial load. The
  `blankSizing` Storybook control compares **grow** (visible steps) vs
  **gate** (answer zone hidden until measured) for the designers.
- **Escape hatch:** the mockups use a constant 140px blank; a fixed
  width would delete this problem entirely (designer question).

## 2. Blanks hug the placed tile

Spec: on placement the blank shrinks from widest-tile width to hug its
tile. Inherently reflows the line.

- **Chosen:** implemented with a basic 150ms width transition
  (`prefers-reduced-motion` disables it); timing polish deferred.
- **Motion:** the whole line slides on every placement/clear. This is
  spec-mandated, not incidental.

## 3. Placed-tile menu hides until hover/focus

Spec: the menu button disappears on placed tiles for readability and
reappears on hover/focus. Read literally, the tile grows/shrinks on
every hover → mid-sentence text reflow.

- **Chosen (spec-literal, Sarah, Aug 2026):** the placed tile rests as
  a value-only card hugging its content (no width minimum), exactly as
  the answered mockups draw it. Hover or focus reveals the menu and the
  tile and blank simply grow; the blank's width transition eases the
  motion.
- **History:** a reserved-slot compromise (constant tile width, menu
  space always held) was built first to avoid the hover reflow; it was
  rejected — it read wrong against the mockups and the internal content
  nudge wasn't better, just different. Both are now seen; the demo
  shows the spec-literal motion for the designers to judge.
- **Motion:** the line reflows on every hover/focus of a placed tile.

## 4. Sub/superscript slots have no room for a menu

The 26×28 slot and its ~40×28 placed chip physically cannot hold the
24px menu button.

- **Chosen (per design plan Q3, designer's own model):** the placed
  tile rests as a compact value chip with no menu space; hover or
  focus restores the full 48px tile (and the blank's normal inline
  position), which makes room for the menu. The hidden menu button
  stays focusable, so keyboard/SR users trigger the same restore.
- **Motion:** the equation nudges horizontally every time a
  sub/superscript tile is hovered or focused — the exact hover-reflow
  we eliminated for normal tiles, reintroduced here by design. The
  48px line rhythm (below) absorbs the vertical component.

## 5. The 504px reflow breakpoint

Below 504px content width, blanks leave the inline flow and fill their
own line; at ≥504px they are inline and fixed-width.

- **Chosen:** pure-CSS container query on the answer zone (first
  `@container` in Perseus). Wrinkle: the Renderer wraps every widget in
  a shrink-wrapping inline-block, which silently collapsed the blank's
  100% width — worked around with a `:has()` rule on the wrapper,
  keyed on the blank's testid (TODO LEMS-4448: needs a better hook).
- **Motion:** crossing the breakpoint restructures the whole answer
  zone (inline ↔ stacked). Between 343px (mobile frames) and 504px the
  designs are vague; we implement one breakpoint, continuous behavior
  on both sides.

## 6. First/last-word exceptions: dropped

The mockups keep a sentence's first/last word inline with a full-width
blank at narrow widths. Requires text-adjacency analysis of rendered
markdown; judged unreasonable/not feasible.

- **Chosen:** not implemented, deliberately — a full-width blank takes
  its own line and the last word wraps below it. Designers must
  confirm, since their frames show the exception.

## 7. Small-value exception

Spec: when every tile value is ≤3 characters, keep inline layout at
all widths (full-width blanks for tiny values are disruptive).

- **Chosen:** computed from tile labels; the component drops the
  answer zone's container-name so the narrow rules never match.
- **Edge:** keyed on the POC's `label` field; the real widget needs a
  defined source for "value length" (TeX and images have no obvious
  character count).

## 8. Drag-over highlight must not change layout

The Figma drag-enter state is a 2px dashed border (rest is 1px). A
real border-width change grows a filled blank's box, so lines jumped
while dragging over swap targets.

- **Chosen:** the highlight is an inset `outline` — zero layout size.

## 9. Line-height rhythm

48px content (blanks/tiles) entering a 24px text line grows the line
box, so lines jumped as tiles moved.

- **Chosen (matches the frames):** every paragraph containing a blank
  gets a 48px line-height; text centers on the line and blanks center
  with it. Line heights are constant through drag/place/clear.
- **Cost:** blank-holding paragraphs read airier than Perseus's
  default text; paragraphs without blanks keep normal rhythm, so
  mixed content has two visible rhythms.

## 10. Swap-to-bank and bank reflow

Dropping onto a full blank returns the occupant to the bank; single-use
placements remove tiles from the bank and clears return them.

- **Motion:** the bank re-wraps every time its tile set changes, and
  the whole page below it shifts when the bank row count changes.
  Inherent to the model; no mitigation chosen yet (a min-height on the
  bank could pin the common cases — designer question).

## 11. TeX never wraps

Wrapping inside a TeX run would change an equation's meaning.

- **Chosen:** never supported. Reflow happens only *between* authored
  standalone blocks, which puts the burden on authoring granularity
  (operators and formula chunks as separate blocks).

## 12. Spacing between TeX and blanks is authored

MathJax's rendered glyphs can end flush against an adjacent blank
(e.g. a subscript slot touching the Cl glyph). There is no reliable
programmatic fix — the gap depends on the specific glyph.

- **Chosen:** content authors add the spacing themselves (a TeX thin
  space `\,` before the marker works well). This becomes authoring
  guidance for the content editor, and possibly a linter suggestion
  later.

## 13. Sub vs superscript position is per-slot authored

The answered chemical-equation frame draws the Cl slot as a subscript
and the Br slot as a superscript — the position is a deliberate
per-blank authoring choice (`displayType`), not derived from the
chemistry. The demo matches the frame. The offsets are single CSS
values, tunable with design.

## Open with design

1. Grow vs gate (or fixed 140px width) for empty blanks — §1.
2. Hug/shrink timing and whether the motion is acceptable — §2.
3. Reserved slot vs mockup-exact placed tiles — §3.
4. Hover-restore motion on sub/superscript tiles — §4.
5. Reflow behavior between 343px and 504px — §5.
6. Confirm dropping the first/last-word exceptions — §6.
7. Bank reflow on tile count changes — §10.
