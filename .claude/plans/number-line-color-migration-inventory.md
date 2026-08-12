# Number-Line — Color Migration Inventory (LEMS-4269)

Source-of-truth inventory of every non-token style value that flows into the
number-line widget's rendered output. Produced from a full read of
`number-line.tsx` plus a trace of the imports/CSS that carry style values into
its output. Line numbers verified against the working tree.

**Key finding:** the widget's own file contains **only colors** — no `fontSize`,
`fontWeight`, `fontFamily`, `lineHeight`, or border literals. Font conversion
(Steps 5–7) is a documented no-op for this widget.

---

## KhanColors resolution key (`packages/perseus/src/util/colors.ts`)

| Legacy adapter | Resolves to | Kind |
|---|---|---|
| `KhanColors.BLUE` | `color.blue` | WB **primitive** token (not semantic) — in scope |
| `KhanColors.GREEN` | `color.green` | WB **primitive** token (not semantic) — in scope |
| `KhanColors._BACKGROUND` | `"#FDFDFD"` | raw hex string — in scope |

The migration is *primitive/legacy → **semantic** token*, not just *hex → token*.
Only `_BACKGROUND` is a genuine raw hex.

---

## 1. `number-line.tsx` — primary migration targets (this file is yours)

`packages/perseus/src/widgets/number-line/number-line.tsx`

| Line | Code | Role | Resolves to | Target semantic token |
|---|---|---|---|---|
| 162 | `stroke: KhanColors.BLUE` | highlighted tick line | `color.blue` | _TBD_ |
| 165 | `color: KhanColors.BLUE` | highlighted tick label | `color.blue` | _TBD_ |
| 466 | `fill = KhanColors._BACKGROUND` | open-circle (hollow) point fill | `#FDFDFD` | _TBD_ |
| 468 | `fill = KhanColors.BLUE` | static-mode point fill | `color.blue` | _TBD_ |
| 470 | `fill = KhanColors.GREEN` | interactive point fill | `color.green` | _TBD_ |
| 474 | `stroke: static ? BLUE : GREEN` | point stroke (normalStyle) | `color.blue` / `color.green` | _TBD_ |
| 478 | `fill: isOpen ? _BACKGROUND : GREEN` | point highlight fill (**hover-only**) | `#FDFDFD` / `color.green` | _TBD_ |
| 484 | `stroke: KhanColors.GREEN` | mobile dot style stroke | `color.green` | _TBD_ |
| 538–540 | `stroke: isMobile ? GREEN : BLUE` | inequality ray | `color.green` / `color.blue` | _TBD_ |

### Semantic decisions to resolve before converting (Step 8 / Figma)
These are the spots where a mechanical "blue → one token" mapping would erase
meaning. Confirm each against Figma:

1. **Static (BLUE) vs. interactive (GREEN) point** — lines 468/470/474. Blue
   signifies "can't be interacted with" (see the comment at ~L462). Mapping both
   to one token loses the static/interactive distinction.
2. **Desktop (BLUE) vs. mobile (GREEN) inequality ray** — lines 538–540. Same
   collapse question across platforms.
3. **`_BACKGROUND` (#FDFDFD) hollow-dot fill** — lines 466/478. Needs a semantic
   background token, or intentional transparency, rather than a raw hex.

### Baseline coverage note
Line 478's highlight fill renders **only in the hover state** — captured by the
`PointHovered` / `OpenDotHovered` interaction stories, not by any initial-state
story.

---

## 2. Shared dependencies that flow in — SCOPE DECISION NEEDED

Not in the widget file, but they affect number-line's pixels. Converting them
touches other widgets, so decide: migrate globally (needs coordination) or leave
as shared debt and note it.

| Location | Value | Role | Shared with |
|---|---|---|---|
| `util/graphie.ts:993` | `color: "black"` | default color of every `.graphie-label` (number-line's non-highlighted tick labels) | all graphie widgets |
| `styles/perseus-renderer-part-1.css:133` | `border: 1px solid #909296` | `.number-input` (tick controller) | matrix widget, others |
| `styles/perseus-renderer-part-1.css:141` | `background-color: #ffbaba` | `.number-input.invalid-input` | shared |
| `styles/perseus-renderer-part-1.css:142` | `outline-color: red` | `.number-input.invalid-input` | shared |

The `"black"` label color is a project-level decision — every graphie widget
renders through it.

---

## 3. Already migrated — no action

- `interactive2/movable-point.tsx` — default point colors already use
  `semanticColor.*`. Number-line overrides them with its own KhanColors
  (section 1), so the work stays in the widget file.
- Clean (no style literals): `components/graphie.tsx`, `interactive2/movable.ts`,
  `interactive2/movable-point-options.ts`, `components/number-input.tsx`,
  `components/simple-keypad-input.tsx`.

---

## 4. Excluded — geometry, not style (do NOT tokenize)

SVG geometry on graphie shapes, not CSS borders:
- `number-line.tsx` — `strokeWidth`/`stroke-width` at L163, 476, 480, 542;
  `pointSize={6}` at L492.
- `util/graphie.ts` — default `"stroke-width": 2` (L111); the strokeWidth style
  transformer (L1406–1407).

---

## 5. Hover-testing note (settled)

There is **no CSS `:hover`** touching number-line anywhere: no `.simple-button`
rule and no `.perseus-widget-interactive-number-line` rule ship in
`packages/perseus/src`, and `.number-input` has no `:hover`. The point's hover
state is JS/Raphael-driven (`vmouseover` → repaint). So `userEvent.hover` in the
interaction stories triggers the real production code path — it is the correct
tool for this widget, and the CSS-pseudo-state approach would capture nothing
here. (Relevant for the team discussion on hover-snapshot methodology:
CSS-`:hover`-driven components → pseudo-states addon; JS-driven graphie widgets →
`play` + `userEvent.hover`.)