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

**Status: ✅ APPLIED.** All colors converted to semantic tokens (wrapped in
`tokenValue(...)` since graphie needs raw hex). Tokens confirmed against the
Figma number-line design + the movable-point / interactive-graph references.
`KhanColors` import removed. Line numbers below are pre-conversion (historical).

| Role | Old (KhanColors) | New semantic token |
|---|---|---|
| highlighted tick line | `color.blue` | `foreground.instructive.default` |
| highlighted tick label | `color.blue` | `foreground.instructive.default` |
| interactive point fill | `color.green` | `foreground.instructive.default` |
| static point fill | `color.blue` | `foreground.disabled.strong` |
| point edge/stroke (filled) | `color.blue` / `color.green` | `border.knockout.default` |
| open-circle (hollow) fill | `#FDFDFD` | `background.base.default` |
| open-circle ring (stroke) | `color.blue` / `color.green` | `foreground.instructive.default` (static: `disabled.strong`) |
| hover highlight fill (filled) | `color.green` | `foreground.instructive.default` |
| mobile dot stroke | `color.green` | `foreground.instructive.default` |
| inequality ray | `color.green` (mobile) / `color.blue` (desktop) | `foreground.instructive.default` (unified) |

Key decisions baked in: interactive = instructive, static = disabled (a11y-reasoned
per interactive-graph), point edge = knockout ring, hollow center = base background,
and **all green eliminated** (mobile/desktop unified on instructive).

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

**Decision: migrate both globally.** Chromatic coverage verified before committing
to this (see below).

**Status:** `graphie.ts:993` label color ✅ APPLIED (`"black"` →
`var(--wb-semanticColor-core-foreground-neutral-strong)`; used the CSS var
directly since it's a DOM span's `color`, not a Raphael attribute). Snapshots
updated for the affected widgets (number-line, grapher, interaction). The
`.number-input` CSS change ✅ was resolved upstream (a `main` merge already
tokenized it): border → `border-neutral-default`, invalid background →
`background-critical-subtle`, invalid outline → `border-critical-default`.
Nothing left to do on `.number-input`.

### Chromatic coverage for the shared changes

**`graphie.ts:993` `color: "black"`** — only affects text drawn via
`graphie.label()` (which stamps `.graphie-label`). Blast radius and coverage:

| Widget | Renders `.graphie-label`? | Regression story shows labels? | Verdict |
|---|---|---|---|
| grapher | Yes | Yes (`markings:"graph"`) | ✅ covered |
| plotter | Yes | Yes (axis + category labels) | ✅ covered |
| number-line | Yes | Yes (`waitForNumberLine` gates on it) | ✅ covered |
| interaction | Yes (numbered axes) | No regression story | ⚠️ gap — **accepted, not covering now** |
| measurer, interactive-graphs | No (Raphael paths / Mafs SVG) | n/a | not in blast radius |

The change is verifiable via grapher/plotter/number-line (their snapshots will
diff). The `interaction` widget renders labels but has no regression story, so
the change won't independently show for it — **gap accepted**; not adding an
interaction story at this time.

**`.number-input` CSS** — the class is applied only by `components/number-input.tsx`
(`"invalid-input": !this._checkValidity(this.props.value)`), driven by the input's
own value + `checkValidity`. Only **number-line's tick controller** renders it
(matrix uses `TextInput`, not `NumberInput`; the `.perseus-matrix .number-input`
rule in `matrix.css` is dead). Coverage:
- Default border (`#909296`) — ✅ `TickController` story.
- Invalid `#ffbaba` bg + red outline — ✅ `TickControllerInvalid` story (the
  input genuinely receives `invalid-input`, not just a sibling error message).

No new stories needed for the `.number-input` change.

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

---

## 6. Theme resolution note (graphie + `tokenValue`)

Graphie needs raw hex for SVG attributes, so colors are resolved via
`tokenValue(...)`, which reads `getComputedStyle().getPropertyValue()` **once, at
draw time**, and bakes a fixed hex into the SVG attribute. Consequences:

- **On a fresh load, the color resolves to the current theme correctly** (default
  or syl-dark). Verified visually — number-line's point matches interactive-graph's
  `foreground.instructive.default` on a reloaded syl-dark story.
- **It does NOT re-resolve on a live theme toggle** — graphie doesn't redraw, so
  switching themes without reloading leaves the previously-baked (washed-out)
  color until the next reload.
- **This is Chromatic-safe:** Chromatic renders each story fresh, once per theme
  mode, so both `default` and `thunderblocks` snapshots capture the correctly
  resolved color. The live-toggle staleness is a Storybook dev-time quirk only —
  not a production or Chromatic issue.
- Contrast with Mafs/interactive-graph, which uses `var(--wb-…)` directly in CSS
  (browser re-resolves live per theme). That's why interactive-graph re-themes on
  a live toggle and graphie widgets don't.

**Same token as interactive-graph.** The point fill is
`foreground.instructive.default` in both (interactive-graph via
`--mafs-blue` → `--movable-point-color`). Any residual visual difference on a
correct render is point *structure* (Mafs's 3-layer halo + knockout ring + center
vs number-line's fill + thin knockout stroke), not the color.

Broader note for the team: every graphie widget using `tokenValue` bakes a static
hex and won't re-theme on a live toggle. Cosmetic dev-UX only; flag if a shared
graphie-theming improvement is ever scoped.