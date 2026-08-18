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

### Semantic check (Step 10) — passed, with two documented namespace deviations
Every conversion has a category/intensity justification (instructive =
interactive, disabled = non-interactive, neutral = default text, all `default`/
`strong` intensities fit). Two tokens intentionally break the mechanical
"`fill`/`stroke` → foreground namespace" rule, both purpose-driven with precedent:
- **Point edge → `border.knockout.default`** (a `border` token on a `stroke`): it
  *is* a knockout ring/separator; Figma names it that; interactive-graph uses the
  identical token on its `.movable-point-ring`. Confident.
- **Hollow-dot center → `background.base.default`** (a `background` token on a
  `fill`): the center is meant to read as the canvas showing through. Reasonable
  but has **no direct precedent** (interactive-graph has no hollow point) — the one
  value to eyeball in a Chromatic/webapp diff.

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

## 6. Theme resolution investigation (graphie + tokens) — UNRESOLVED

> ⚠️ This section supersedes an earlier, **incorrect** note that claimed the
> tokens resolve correctly on fresh load / are "Chromatic-safe" / "work in
> prod." Later testing disproved all of that. Current findings below.

### The core finding
In **Storybook** (local and the published/"live" build), **none** of
number-line's graphie token colors actually switch between themes — they all
resolve the **light/default** value regardless of the active theme. The
non-endpoint tick labels are what exposed it: they render **black in syl-dark**
(should be white).

### Why it was hidden on everything except the labels
- The point / endpoint labels / ray use `foreground.instructive.default`, a
  **blue in both themes** (light `#1865f2` vs syl-dark blue). Blue-on-dark looks
  fine either way, so "stuck on the light value" is visually invisible.
- The graphie default label uses `foreground.neutral.strong`, which is
  **near-black in light (`#21242c`) vs near-white in syl-dark (`#EDEDEE`)**. When
  it's stuck on the light value it's black-on-black — impossible to miss.
- So the point does **not** actually theme in Storybook either; it only looked
  like it did. (This corrects the earlier "point matches interactive-graph"
  claim.) The label was simply the first probe with a stark enough light/dark
  delta to reveal the truth.

### Root cause (Storybook)
`tokenValue(...)` resolves a token by reading
`getComputedStyle(rootEl).getPropertyValue(var)`. In Storybook the graphie
subtree's cascade does **not** carry the syl-dark vars at draw time. The
`.storybook/preview.tsx` `withThemeSwitcher` decorator sets `data-wb-theme` on
`document.body` in a **`useEffect`** (runs *after* graphie has already drawn) and
scopes the theme via a nested `<ThemeSwitcher>`. Mafs/interactive-graph (React
SVG) sits in a cascade that *does* get the vars — which is why its axis text
(same `neutral.strong` token) is correctly white in syl-dark, while graphie's
jQuery-appended label span is not.

### Approaches tried for the graphie label — ALL render black in syl-dark
1. `tokenValue(neutral.strong)` (reads `document.body`) → black
2. `color: "var(--wb-…-neutral-strong)"` via jQuery `.css()` → black (jsdom also
   dropped it; jQuery mangles `var()` values)
3. `tokenValue(neutral.strong, this.el)` (anchored to graphie container) → black
4. native `el.style.setProperty("color", "var(--wb-…-neutral-strong)")` (live var,
   bypasses jQuery) → black

All four fail the same way ⇒ it is **not** a token/element/jQuery choice; the
theme vars simply are not in the graphie label's cascade in Storybook.

### CRITICAL open question — real webapp is UNVERIFIED
All testing so far is **Storybook only** (local + published). The actual Khan
Academy **website** has NOT been tested. The earlier "white in prod" observation
was a *published Storybook*, not the site. So we do **not** know whether the
number-line token colors (point, ticks, ray — not just labels) theme correctly in
the real app's dark mode. Reason for hope but not certainty: the webapp applies
the WB theme at the app root (wrapping everything), so graphie's DOM would be
inside the themed cascade — unlike Storybook's late/scoped application. Number-line
may be among the **first graphie widgets** in ColorSync, so "do WB theme vars
reach graphie's imperative DOM" may be an unanswered project-wide question.

### Current code state
- `graphie.ts` label color: **reverted to hardcoded `"black"`** (the shared
  experiment is fully backed out; labels were black in dark before our work too —
  making them white is a *desired improvement*, not a regression fix, and it's
  blocked by the theme-scope issue).
- `number-line.tsx` token conversion: **intact** (point/ticks/ray/hover/static/
  knockout/hollow → semantic tokens). tsc/lint/tests green.

### Next step (blocking "done")
Test the perseus changes in the **real webapp** dark mode. That is the only thing
that determines whether the conversion themes correctly in production, or whether
graphie widgets have a deeper theming gap the team needs to solve.