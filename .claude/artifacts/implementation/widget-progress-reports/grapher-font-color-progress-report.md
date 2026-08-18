# Grapher — Font & Color Conversion Progress Report

Widget: `grapher`
Workflow: font-color conversion (see `.claude/artifacts/workflow-for-font-color.md`)
Branch: `tb/LEMS-4275/convert-grapher`

This document is a historical record of the workflow. Entries are appended in
ascending step order and are never edited or removed after the fact.

---

## Step 1 — Audit the Widget

### Audit approach / note on starting state

We are restarting the grapher conversion cleanly (the prior exploratory commit
`085bfe66bf` "Make asymptote dashed and add different static color" is treated
as exploratory and will be reverted before the baseline, then re-applied in
Step 9). Therefore this audit documents the **original, pre-conversion** color
usage — i.e. `grapher.tsx` at commit `085bfe66bf~1` — so it reflects the true
starting point the baseline Chromatic snapshots will capture.

### Bash commands used

Scoped audit greps over the widget source (excluding `__snapshots__`, tests,
testdata, stories, cypress):

```bash
REPO=packages/perseus/src/widgets/grapher
FILTER='__snapshots__|\.test\.|\.testdata\.|\.cypress\.|\.stories\.'
# source files present
find $REPO -maxdepth 2 \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) | grep -vE "$FILTER"
# color token / KhanColors / semanticColor usage
grep -rnE "color\.|KhanColors|semanticColor" $REPO --include="*.tsx" --include="*.ts" --include="*.css" | grep -vE "$FILTER"
# hardcoded hex
grep -rn "#[0-9a-fA-F]\{3,6\}" $REPO --include="*.tsx" --include="*.ts" --include="*.css" | grep -vE "$FILTER"
# hardcoded rgb(a)
grep -rnE "rgba?\([^)]+\)" $REPO --include="*.tsx" --include="*.ts" --include="*.css" | grep -vE "$FILTER"
# 4 font attributes
grep -rnE "fontSize|fontWeight|lineHeight|fontFamily|font-size|font-weight|line-height|font-family" $REPO --include="*.tsx" --include="*.ts" --include="*.css" | grep -vE "$FILTER"
# border width
grep -rnE "borderWidth|border.*Width|border-width" $REPO --include="*.tsx" --include="*.ts" --include="*.css" | grep -vE "$FILTER"
# border radius
grep -rnE "borderRadius|border-radius" $REPO --include="*.tsx" --include="*.ts" --include="*.css" | grep -vE "$FILTER"

# original (pre-conversion) color usage
git show 085bfe66bf~1:packages/perseus/src/widgets/grapher/grapher.tsx | grep -nE "KhanColors\.[A-Z]"
```

Resolved `KhanColors` values (from `packages/perseus/src/util/colors.ts`, which
re-exports Wonder Blocks `color`):

| KhanColors constant | Underlying value | Hex |
|---------------------|------------------|-----|
| `KhanColors.BLUE_C` | literal | `#63D9EA` |
| `KhanColors.DYNAMIC` | `color.blue` | `#1865F2` |
| `KhanColors.INTERACTIVE` | `color.green` | `#00A60E` |

Source files in the widget: `grapher.tsx`, `util.tsx`, `index.ts`. All color
usage lives in `grapher.tsx`; `util.tsx` and `index.ts` have none.

### Colors to be Tokenized:

**Files with `color` token usage (via `KhanColors`):**

- `packages/perseus/src/widgets/grapher/grapher.tsx`
  - Line 132 — `KhanColors.BLUE_C` (`#63D9EA`) — plotted function curve stroke, **mobile**
  - Line 133 — `KhanColors.DYNAMIC` (`color.blue` = `#1865F2`) — plotted function curve stroke, **desktop / interactive**
  - Line 485 — `KhanColors.INTERACTIVE` (`color.green` = `#00A60E`) — horizontal hairline stroke (mobile crosshair guide)
  - Line 496 — `KhanColors.INTERACTIVE` (`color.green` = `#00A60E`) — vertical hairline stroke (mobile crosshair guide)

  _(Line numbers are for the original file `085bfe66bf~1`.)_

**Files with hardcoded hex values:** none in source. (`#000000` appears only in
`__snapshots__/grapher.test.ts.snap`, which is generated output, not a
conversion target.)

**Files with hardcoded rgb(a) values:** none.

### Fonts to be Tokenized:

**Files with any of the 4 font attributes (`fontSize`, `fontWeight`,
`lineHeight`, `fontFamily`):** none. The grapher renders as graphie SVG and has
no text/font styling in its source.

**Files with border width attributes:** none.
(`strokeWidth: 1` on the mobile hairlines at grapher.tsx line ~473 is an SVG
line stroke width consumed by graphie's `WrappedLine`, not a CSS `border-width`
design token — out of scope for tokenization.)

**Files with border radius attributes:** none.

### Summary

- **Colors:** 3 distinct `KhanColors` constants across 4 sites in `grapher.tsx`
  (function-curve stroke mobile/desktop, and two mobile hairline strokes).
- **Fonts / border-width / border-radius:** nothing to convert.

> Note: grapher also renders `MovablePoint` / `MovableLine` sub-widgets, but
> their colors are owned by the graphie-movables / movable-point conversion
> (LEMS-4265), not by grapher itself.

---

## Step 2 — Create Regression Stories

### Research (files examined)

**Existing story files**
- `grapher/__docs__/grapher-initial-state-regression.stories.tsx` — already
  exists (from exploratory commit). Uses `ServerItemRendererWithDebugUI` as the
  `component` with `args.item` built from `grapher.testdata.ts`. Stories:
  `Quadratic`, `ChooseYourOwnFunction`, `Static`. (Note: this uses the
  component+args pattern, not the renderer-decorator pattern in
  regression-stories.md, and imports from `grapher.testdata.ts` rather than
  inline args. Keeping the established grapher pattern for consistency; logged
  as a deviation for Step 14.)
- `grapher/__docs__/grapher.stories.tsx` — pre-existing non-regression stories.
- No `grapher-interactions-regression.stories.tsx` exists yet.

**Precedent references (this branch)**
- `components/__docs__/graphie-movables-{initial-state,interactions}-regression.stories.tsx`
  (LEMS-4265) — covers movable point/line colors incl. the highlighted (hover)
  state. Hover pattern targets the inner Raphael `<ellipse>` via
  `[data-interactive-kind-for-testing="movable-point"] ellipse`, with a
  `chromatic delay: 300` for Raphael to settle.
- `interactive-graphs/__docs__/interactive-graph-interactions-regression.stories.tsx`
  — interactions pattern (focus/hover/drag play functions).

**Test data available** (`grapher.testdata.ts`): `absoluteValueQuestion`,
`exponentialQuestion`, `linearQuestion`, `logarithmQuestion`,
`quadraticQuestion`, `sinusoidQuestion`, `multipleAvailableTypesQuestion`,
`staticExponentialQuestion`, `simpleQuestion`, `staticGrapher`.

**Mechanics verified**
- Mobile: `ServerItemRendererWithDebugUI` accepts an `apiOptions` prop
  (threaded to the renderer via `useStorybookApiOptions`), so a story can set
  `args.apiOptions = {isMobile: true}`. `mobileDecorator` exists in
  `widgets/__testutils__/story-decorators.tsx`.
- Grapher hairlines: `horizHairline`/`vertHairline` (grapher.tsx ~495–515) are
  created **only when `apiOptions.isMobile`** and start hidden; `showHairlines`
  is wired to the movable points (lines 227, 313) and fires on point
  interaction. So the green hairline color renders only on **mobile + point
  interaction**.

### Audit color → story coverage mapping

| Audit color (site) | Element / state | Covered by |
|--------------------|-----------------|------------|
| `DYNAMIC` blue — grapher.tsx:133 | curve stroke, **desktop** | `Quadratic`, `ChooseYourOwnFunction` (existing) |
| static gray (post-conv.) — grapher.tsx:140 | curve + movables, **static** | `Static` (existing) |
| `BLUE_C` — grapher.tsx:132 | curve stroke, **mobile** | **MISSING → add mobile initial-state story** |
| `INTERACTIVE` green — grapher.tsx:485/496 | horiz/vert hairlines, **mobile + interaction** | **MISSING → add mobile interactions story** |

### Plan for story files

1. **`grapher-initial-state-regression.stories.tsx`** (extend existing): add a
   **mobile** story (`apiOptions.isMobile: true`) so the mobile curve stroke
   (`BLUE_C`) is snapshotted.
2. **`grapher-interactions-regression.stories.tsx`** (new): a **mobile** story
   that interacts with a movable point (hover/grab) to show the green hairlines,
   snapshotting the hairline stroke color. Uses `chromatic delay` + Raphael
   `<ellipse>` hover pattern from the graphie-movables precedent.

TeX: grapher renders function plots (no TeX content of its own), so no TeX
stories are needed.

### Files created / changed

- **`grapher/__docs__/grapher-initial-state-regression.stories.tsx`** (extended)
  — added a `Mobile` story: `quadraticQuestion` with
  `apiOptions.isMobile: true` and `mobileDecorator`, to snapshot the mobile
  curve stroke (`BLUE_C`).
- **`grapher/__docs__/grapher-interactions-regression.stories.tsx`** (new) —
  `MobileHairlines` story: mobile grapher whose play function waits for the
  Raphael `<ellipse>` of a movable control point, then presses-and-holds
  (`[MouseLeft>]`) to grab it so the green crosshair hairlines
  (`INTERACTIVE`) render for the snapshot. `chromatic delay: 300`.

Full audit-color coverage after these additions: desktop curve (existing),
static (existing), mobile curve (new initial-state), mobile hairlines (new
interactions).

**Pending local verification (user checkpoint, Step 3):** run Storybook and
confirm the `MobileHairlines` play function actually shows the hairlines — the
grab is triggered via graphie's mouse handling, which may need iteration on the
exact `userEvent` gesture.

### Local verification & iteration (user checkpoint)

- **`Mobile` (initial state):** verified in both `default` and `thunderblocks`
  modes. Curve renders in the mobile light-blue (`#63D9EA`) at the thicker
  stroke width; only the axes differ between themes (expected — `BLUE_C` is
  still hardcoded pre-conversion). ✅
- **`MobileHairlines` (interactions):** verified the green hairlines
  (`INTERACTIVE`) render. Iteration notes:
  - A grab with no move did not reveal the hairlines; `showHairlines` needs the
    point's move handler to fire, so the gesture presses-and-holds and then
    nudges the pointer.
  - Investigated the graphie mouse path
    (`movable.ts` `vmousedown`→`grab`→`onMoveStart`/`onMove`,
    `graphie.getMousePx` = `pageX − container offset`). In grapher's mobile
    touch mode the grabbed point maps to the plot corner regardless of the
    synthetic pointer target, so the crosshairs render at the graph edge.
    Attempts to land them in the interior (auto-centered press; targeting the
    SVG's interior) did not change the landing spot — the coordinate goes
    through jQuery-Mobile's virtual-mouse layer, which the synthetic
    `userEvent` coords don't drive.
  - **Decision (with user):** accept the corner position. The story's purpose is
    to capture the hairline *color*, which it does clearly and
    deterministically; exact crosshair placement is not relevant to the color
    regression. Reverted to a simple, stable grab-and-nudge gesture.

---

## Step 3 — Pre-Push Quality Checks (Regression Stories)

Ran the `quality-check-gate.md` checks:

- **Lint:** `pnpm fixc` (lints/fixes changed files; run with `UPSTREAM=main`
  since the branch has no upstream yet). One issue — a missing trailing newline
  in the interactions story — was auto-fixed. ✅
- **Tests:** `pnpm test packages/perseus/src/widgets/grapher` → passed. ✅
- **Typecheck:** `pnpm typecheck` → exit 0. ✅
- **Play functions (user checkpoint):** verified in Storybook — see the Step 2
  local-verification notes above. ✅

Note: this repo uses `pnpm` (never `npx`); `pnpm fixc` fixes lint on changed
files.

---

## Step 4 — Set Up Baseline Chromatic Snapshots

### Environment fixes (prerequisite for pushing)

Publishing the branch was blocked by two unrelated issues, both resolved:

1. **Worktree path stale.** The worktree directory had been renamed on disk
   (`graphie-movable-color-sync` → `worktree-1`) without updating git, so git
   still had it registered at the old path (marked `prunable`). Fixed with
   `git worktree repair` from inside the worktree.
2. **GitHub Desktop auth failure.** GitHub Desktop reported an SSH
   authentication failure, but CLI SSH auth to `origin` works
   (`git ls-remote origin` succeeds). Decision: bypass GitHub Desktop and push
   from the CLI. The branch's upstream was also mis-configured (tracking the
   local, now-gone `tb/LEMS-4265/convert-graphie-movable`); `git push -u origin`
   will set it correctly.

### Baseline restructure (clean-restart split)

The exploratory commit mixed baseline-appropriate files (stories, testdata) with
color-conversion files (grapher.tsx changes + a dashed-asymptote test that only
passes *after* those changes). To baseline against the true pre-conversion
state, the commit was split:

1. Tagged the exploratory commit `colorsync/grapher-exploratory`
   (`b6ed63cbfa`) so its color changes + test are preserved for Step 9.
2. `git reset --soft` back to the LEMS-4265 base
   (`7ca90d3668 [Color] Update graphie-movables… (#3790)`).
3. Reverted `grapher.tsx` and `grapher.test.ts` to original (color changes and
   the dashed-asymptote test set aside for Step 9).
4. Committed **code-only** (`4f49a4161d`) — the 5 regression stories +
   `staticExponentialQuestion` testdata, against pristine `grapher.tsx`.
   Verified: grapher.tsx/test.ts zero-diff vs base; grapher tests pass (5).

**Split summary:**

| File | Destination |
|------|-------------|
| `grapher-initial-state-regression.stories.tsx` (5 stories) | Baseline commit |
| `grapher-interactions-regression.stories.tsx` | Baseline commit |
| `grapher.testdata.ts` (`staticExponentialQuestion`) | Baseline commit |
| `grapher.tsx` (color + dashed asymptote) | Step 9 (from tag) |
| `grapher.test.ts` (dashed-asymptote test) | Step 9 (from tag) |

**Pending (user action):** push from CLI (`git push -u origin
tb/LEMS-4275/convert-grapher`), open the PR, and approve the Chromatic
snapshots to establish the baseline.

**Update:** the baseline commit (`4f49a4161d`) and PR #3922 were pushed/opened
prior to this update. Chromatic ran and is pending approval ("7 changes must
be accepted as baselines") — not yet approved as of this entry. GitHub is
currently down, so no further pushes are happening until it's back.

Since starting Step 4, the regression stories were also reworked to match the
categorizer widget's most recent precedent: replaced `component:
ServerItemRendererWithDebugUI` (item-level renderer with debug UI chrome —
hints, scoring, JSON editor, action buttons) with a new
`grapherRendererDecorator` (`grapher-renderer-decorator.tsx`) wrapping
`QuestionRendererForStories` directly, matching `categorizerRendererDecorator`.
Rationale: the debug UI chrome added snapshot surface area unrelated to
grapher's own colors (e.g. a WonderBlocks button restyle elsewhere could
spuriously diff these stories), and `generateTestPerseusItem(...)` was only
wrapping the testdata's already-full `PerseusRenderer` questions to satisfy
`ServerItemRendererWithDebugUI`'s `item: PerseusItem` prop — not because the
stories needed item-level behavior. `apiOptions` moved from story `args` to
`parameters`, matching where categorizer's mobile stories put it. One TS/lint
wrinkle: the `Decorator` type from `@storybook/react-vite` doesn't compose with
a narrowed `args` shape against `Meta`/`StoryObj`'s untyped decorators array,
so — matching categorizer's own `args: Record<string, unknown>` typing — a
single `as` cast was needed with `// eslint-disable-next-line
no-restricted-syntax` (repo convention per `widget-type-utils.ts`). Verified
with `pnpm tsc` and `pnpm fixc` (both clean) and `pnpm test
packages/perseus/src/widgets/grapher` (5 tests passed). Tamara reviewed the
updated stories locally in Storybook and confirmed they look good. Per her
direction, these commits will stay local (not pushed) until GitHub is back up.

---

## Step 5 — Font Conversion

The Step 1 audit found no font attributes (`fontSize`, `fontWeight`,
`lineHeight`, `fontFamily`) in `grapher.tsx`, `util.tsx`, or `index.ts`. Before
treating this as a full no-op, checked every file `grapher.tsx` directly
imports for the same four attributes, in case a connected component carried
font styling into grapher's rendered output:

- Clean: `button-group.tsx`, `graphie.tsx`, `graphie-classes.ts`,
  `graphie-movables.ts`, `interactive2/wrapped-line.ts`.
- `interactive2/movable-point.tsx:237` — `fontSize: "2em"` (icon-scaling for
  the movable-point trash tooltip). Out of scope: this file was already
  converted for colors under LEMS-4265 (commit `7ca90d3668`, "Update
  graphie-movables and movable files to use color tokens") — same
  ownership boundary as the colors note in Step 1 (grapher renders
  MovablePoint/MovableLine, but their styling belongs to that ticket).
- `components/svg-image.tsx:336` — a `font-size` percentage
  (`100 * scale + "%"`) on image labels. Out of scope: shared across many
  widgets beyond grapher, and the value is a runtime scale multiplier, not a
  hardcoded design value.
- `styles/constants.ts` defines `baseFontFamily`/`boldFontFamily`, but
  `grapher.tsx` only imports `interactiveSizes` from that file — the font
  constants aren't connected to grapher at all.

**Conclusion:** Step 5 is a no-op for LEMS-4275. No font conversion needed
anywhere in grapher's own scope.

---

## Step 8 — Figma Token Lookup

### Figma page search

Checked the Perseus Widgets Figma file (`HlLQJqNeMTLenuDfkyzYzE`) for a
grapher page: `get_metadata` with no `nodeId` returned only one top-level page,
`0:1` ("Cover"), which drilling in confirmed is literally just a cover/thumbnail
frame — no widget content. `search_design_system` for "Grapher" returned zero
components, variables, or styles.

**No Figma design exists for grapher.** Per the workflow's fallback, all three
audited colors were resolved using `color-conversion-rules.md`'s mapping table
plus manual semantic reasoning, not Figma.

### Token mapping table

| Audit color | Site | Legacy token | Target token | Source / reasoning |
|---|---|---|---|---|
| `DYNAMIC` — desktop curve stroke | grapher.tsx:133 | `color.blue` | `semanticColor.core.foreground.instructive.default` | Mapping table. Exact hex match in default theme (`#1865f2` both sides). |
| `BLUE_C` — mobile curve stroke | grapher.tsx:132 | none (bespoke literal `#63D9EA`, no `color.*` alias) | `semanticColor.core.foreground.instructive.default` | User decision. Checked the instructive scale directly (`subtle` `#b5cefb`, `default` `#1865f2`, `strong` `#1b50b3`) — none are visually close to the cyan `#63D9EA`, so this isn't a value-preserving rename; it's an intentional visual change (mobile curve becomes the same blue as desktop) made per Tamara's explicit direction to align mobile with desktop. |
| `INTERACTIVE` — mobile hairlines | grapher.tsx:485/496 | `color.green` | `semanticColor.core.border.instructive.default` | User decision, verified against precedent. Mechanically, `color.green` maps to `semanticColor.core.foreground.success.default` (also an exact hex match, `#00a60e`), but `success` implies correctness/completion, which doesn't fit a live drag-crosshair. Tamara asked to match interactive-graph's own hairline color instead — checked `interactive-graphs/graphs/components/hairlines.tsx:37,44`, which uses `semanticColor.core.border.instructive.default` for both hairline strokes (`border` namespace, not `foreground`, despite being an SVG `stroke` attribute). Using that exact token for consistency across both widgets' hairline treatment. |

No design gaps to flag for design (no Figma page exists at all, so there's
nothing to compare against or ask design to extend).

**Gate check satisfied:** every audited color now has a target token and a
recorded rationale. Proceeding to Step 9 (color token conversion).

---

## Step 9 — Convert Color Tokens

### Files converted

- `packages/perseus/src/widgets/grapher/grapher.tsx` — the only file with
  color usage per the Step 1 audit. Added `import {semanticColor, tokenValue}
  from "@khanacademy/wonder-blocks-tokens";` and removed the now-fully-unused
  `import KhanColors from "../../util/colors";` (all 4 of its usages were
  converted, and nothing else in the file referenced `KhanColors`).

### Tokens converted

| Site | Before | After |
|---|---|---|
| `renderPlot` curve stroke (interactive, mobile + desktop) | `isMobile ? KhanColors.BLUE_C : KhanColors.DYNAMIC` | `tokenValue(semanticColor.core.foreground.instructive.default)` (single value, `isMobile` split removed) |
| `renderPlot` curve stroke (static) | not previously distinguished | `tokenValue(semanticColor.core.foreground.disabled.strong)` — new conditional branch |
| `renderAsymptote` hairline-adjacent dash fix | `strokeDasharray` (camelCase, silently dropped by Raphael) | `"stroke-dasharray"` (kebab-case) — bug fix carried over from the tagged exploratory commit, not a token conversion but bundled with this step since it was part of the same prior work |
| `renderAsymptote` `MovableLine` | no `static` prop passed | `static={this.props.static}` — carried over from the tag so a static grapher's asymptote renders gray/non-draggable |
| Mobile crosshair hairlines (both horiz/vert `WrappedLine.attr`) | `KhanColors.INTERACTIVE` | `tokenValue(semanticColor.core.border.instructive.default)` |

All values wrapped in `tokenValue(...)` because graphie/Raphael only accepts
raw CSS color strings, not the CSS custom properties `semanticColor.*`
resolves to by default.

### Judgment calls

- **Mobile curve color** (`BLUE_C` → `instructive.default`): not a
  value-preserving rename — `#63D9EA` (cyan) is visibly different from
  `#1865f2`. Applied per Tamara's explicit direction to align mobile with
  desktop, discussed and confirmed in Step 8.
- **Hairlines** (`INTERACTIVE`/`color.green` → `border.instructive.default`):
  the mechanical mapping-table swap would have been
  `foreground.success.default` (also an exact hex match), but that's
  semantically wrong for a live drag-crosshair. Resolved by matching
  interactive-graph's own `Hairlines` component token exactly, per Tamara's
  direction — see Step 8 for the full reasoning.
- **Static curve/asymptote color** (`disabled.strong`): not from the original
  Step 1 audit (which only covered the 3 `KhanColors` sites) — this is new
  styling behavior carried over from the tagged exploratory commit, added to
  make the curve and asymptote match the already-gray static `MovablePoint`s
  (converted under LEMS-4265) and interactive-graph's own static treatment.

### Verification

`pnpm tsc` and `pnpm fixc` clean. `pnpm test
packages/perseus/src/widgets/grapher` — one snapshot needed updating (see
below), then all 6 tests passed.

**Snapshot note:** the "multiple graph types" snapshot test failed with
`stroke="none"` where it previously had the literal hex. This isn't a
regression — it's the same `tokenValue()`-in-jsdom limitation LEMS-4265 already
hit and documented in `movable-point.test.ts`: `tokenValue()` reads CSS custom
properties, which jsdom doesn't define, so it resolves to `""` and Raphael
renders that as `stroke="none"` in the test DOM. The real hex resolves
correctly in an actual browser (Chromatic). Added the same explanatory comment
pattern used in `movable-point.test.ts` and updated the snapshot.

**Update:** Tamara approved the Step 4 Chromatic baseline in GitHub, then
committed and pushed these Step 9 color changes herself.

---

## Step 10 — Semantic Check

For each converted token: what the element is doing, whether the semantic
category/intensity/namespace fit, and confidence.

### `foreground.instructive.default` — curve stroke, interactive (mobile + desktop)

1. **What:** the SVG stroke of the plotted function curve — the primary
   interactive artifact the user works with on the graph.
2. **Category:** `instructive` fits — this is the thing actively guiding/being
   manipulated by the user, same role `DYNAMIC` already served pre-conversion.
3. **Intensity:** `default` fits — standard interactive presentation, no
   emphasis or de-emphasis called for.
4. **Namespace:** `stroke` → `foreground` per the CSS-property table. Correct.

Confident match on all four questions.

### `foreground.disabled.strong` — curve stroke, static

1. **What:** the same curve stroke, but rendered when the grapher is
   non-interactive (`static: true`) — a fixed reference/correct-answer
   display, not something the user manipulates.
2. **Category:** `disabled` fits by definition — "element is not
   interactable" describes `static: true` exactly.
3. **Intensity:** `strong` — verified directly against precedent rather than
   guessed: `mafs-styles.css:27` defines interactive-graph's own
   `--static-gray: var(--wb-semanticColor-core-foreground-disabled-strong)`,
   used for the identical "static/muted reference line" purpose. Reusing the
   same intensity interactive-graph already chose for the same use case is the
   strongest available justification.
4. **Namespace:** `stroke` → `foreground`. Correct.

Confident match, directly backed by interactive-graph precedent.

### `border.instructive.default` — mobile crosshair hairlines

1. **What:** two SVG line strokes forming a crosshair guide, shown only while
   a movable point is actively being dragged on mobile — a temporary
   reference guide, not primary content.
2. **Category:** `instructive` fits — the user is in an active
   interactive/manipulation state; the hairlines guide them to the point's
   exact position.
3. **Intensity:** `default` fits — standard use, no emphasis called for.
4. **Namespace:** this is the one deliberate exception. Mechanically, `stroke`
   would suggest `foreground` per the general CSS-property table, but the
   verified precedent (`interactive-graphs/graphs/components/hairlines.tsx`)
   uses `border`, not `foreground`, for this exact same crosshair-guide
   purpose. The reasoning: a hairline's semantic role is to mark a reference
   position/boundary, not to carry expressive foreground content the way a
   plotted curve or icon does — the same logic behind the existing "1px
   divider using `backgroundColor` → `border`" special case in
   `color-conversion-rules.md`. Treating this as a deliberate,
   precedent-justified exception to the general stroke-implies-foreground
   heuristic, not an error.

Confident match, though flagged as an intentional exception to the general
namespace-by-CSS-property rule — justified by direct cross-widget precedent
rather than the generic mapping.

**Gate check satisfied:** every converted token has a documented semantic
justification above, not just a mapping-table match.

---

## Note — Ticket Cross-Check (ad hoc, not one of the 16 workflow steps)

Fetched LEMS-4275 directly to confirm nothing called out in the ticket was
missed. The ticket lists 4 sites in `grapher.tsx`:

| Ticket line | Constant | Value |
|---|---|---|
| L124 | `KhanColors.BLUE_C` | `#63D9EA` |
| L125 | `KhanColors.DYNAMIC` | `color.blue` |
| L482 | `KhanColors.INTERACTIVE` | `color.green` |
| L493 | `KhanColors.INTERACTIVE` | `color.green` |

Line numbers differ slightly from the Step 1 audit (132/133/485/496) due to
unrelated drift in the file between when the ticket was filed and when the
audit ran — the constants and values match exactly, and `BLUE_C`/`DYNAMIC`
each only appear once in the file, so there's no ambiguity. All 4 are
converted (see Step 9). The ticket calls out no font attributes, consistent
with Step 5's finding. The static-curve-gray behavior and dashed-asymptote fix
are additive scope beyond the ticket's literal call-outs, carried over from
the tagged exploratory commit — noted here so it's visible in the PR
description rather than looking like undocumented scope creep.

---

## Step 11 — Visual Check

No Figma design exists for grapher (established in Step 8), so the
Figma-vs-Storybook screenshot comparison and Figma-gap flagging don't apply
here — there's nothing to screenshot or compare against. What's left and
actually applicable is the regression-story coverage re-check (this step's
second pass, run after color conversion to catch any newly-visible states):

| State introduced/changed by Step 9 | Covered by a story? |
|---|---|
| Curve renders `instructive.default` (desktop) | ✅ `Quadratic`, `ChooseYourOwnFunction` |
| Curve renders `instructive.default` (mobile, now matching desktop) | ✅ `Mobile` |
| Curve renders `disabled.strong` (static) | ✅ `Static` — its testdata (`staticExponentialQuestion`) sets `static: true` |
| Asymptote renders dashed + gray + non-draggable (static) | ✅ Same `Static` story — its testdata includes a real `asymptote`, and stays on the legacy grapher path (2 `availableTypes`, not 1) |
| Hairlines render `border.instructive.default` (mobile drag) | ✅ `MobileHairlines` |

No coverage gaps found — no new stories needed before the Chromatic push.
Actual pixel verification for these changes will happen via the Chromatic
diff in Step 13, not a manual screenshot comparison, since there's no Figma
reference to compare against.

---

## Step 12 — Pre-Push Quality Checks (Colors)

Ran the full `quality-check-gate.md` checks (plain, no filtering):

- **`pnpm lint`** — clean, no errors.
- **`pnpm tsc`** — clean, no errors.
- **`pnpm test`** — full suite: 543/543 test suites passed, 7692 passed / 34
  skipped / 0 failed, 413/413 snapshots passed.
- **Interaction play functions (user checkpoint):** not re-verified separately
  this step — the color/token swap doesn't change interaction mechanics (the
  `MobileHairlines` grab-and-nudge gesture), only the rendered pixel color,
  which is what Step 13's Chromatic diff exists to catch. Tamara already
  verified the play function mechanics when the decorator change was reviewed
  earlier in this workflow.

---

## Step 13 — Push and Review Chromatic Diffs (Colors)

Tamara committed (`9fdc3b5c5d` "Color and snapshot updates") and pushed the
Step 9 color changes herself, plus a changeset commit (`dbe5ab974c`) — branch
is fully in sync with `origin/tb/LEMS-4275/convert-grapher`.

**Pending (user action):** Chromatic ran against the push and is showing "12
changes must be accepted as baselines" on PR #3922 — not yet reviewed/approved
as of this entry. This is the actual color-conversion diff (distinct from the
earlier 7-change story-structure baseline) and needs Tamara's visual review
against the semantic reasoning logged in Step 10 before it's approved.

---

## Step 14 — Deviation Check

Re-read each step's instruction file and compared against what's recorded
above. Findings below; steps not listed had no deviations.

### Step 2 — Regression Stories
- **Followed as instructed:** Partially.
- **Deviations:**
  1. Story `args` import test data from `grapher.testdata.ts`
     (`quadraticQuestion`, `multipleAvailableTypesQuestion`,
     `staticExponentialQuestion`) rather than defining widget state inline as
     `args` per `regression-stories.md`'s "do NOT import testdata from test
     files — stories should be self-contained" rule. This was self-flagged in
     the original Step 2 entry as a deviation deferred to Step 14.
  2. (Resolved during this workflow) The original Step 2 entry also flagged
     using the `component: ServerItemRendererWithDebugUI` + args pattern
     instead of the documented renderer-decorator pattern. This was fixed
     later in the workflow (see the Step 4 addendum) — stories now use
     `grapherRendererDecorator` + `QuestionRendererForStories`.
- **Type:** Intentional (both — deliberate calls, not oversights).
- **Recommended Action:**
  1. Document in PR — not fixing. `grapher.testdata.ts` is shared with
     `grapher.test.ts` and `grapher.cypress.ts`; inlining equivalent fixtures
     into the stories would duplicate data already maintained elsewhere, which
     is scope creep beyond a color/font token migration.
  2. No action needed — already resolved.

### Step 9 — Convert Color Tokens
- **Followed as instructed:** Yes, with one deliberate, documented exception.
- **Deviations:**
  1. The mobile/vertical hairline strokes use
     `semanticColor.core.border.instructive.default` rather than the
     `foreground` namespace `color-conversion-rules.md`'s CSS-property table
     would suggest for a `stroke` attribute.
  2. `color-conversion-rules.md` documents two contexts for resolving a token
     to a raw value (JS token inside `StyleSheet.create()`, or a CSS variable
     inside a CSS string) — neither covers graphie/Raphael's raw-attribute
     context, which needs `tokenValue()` to resolve to a literal hex string.
- **Type:** 1: Intentional (Tamara's direction, verified against
  interactive-graph's own `Hairlines` component precedent — see Steps 8/10).
  2: N/A — a gap in the instruction doc's coverage, not a deviation from it;
  followed established LEMS-4265 precedent (`movable-point.tsx`) instead.
- **Recommended Action:**
  1. Document in PR — a reviewer spot-checking against the CSS-property table
     alone could read this as a mistake without the interactive-graph
     cross-reference.
  2. No action needed.

### Process ordering note (not tied to a single step)
- **Followed as instructed:** No.
- **Deviations:** Step 13's push happened before Step 12's formal quality gate
  was run in this conversation — Tamara committed and pushed the color changes
  herself, and the `pnpm lint`/`pnpm tsc`/`pnpm test` gate was only run
  afterward, retroactively.
- **Type:** Intentional (user-directed — Tamara pushed on her own before
  asking for the remaining steps).
- **Recommended Action:** No action needed — the retroactive gate came back
  fully clean (0 lint errors, 0 typecheck errors, 7692/7692 tests passing), so
  nothing shipped broken. Noting this for the historical record per this
  step's purpose, not because it caused a problem.

**Summary for Tamara:** two standing, intentional deviations to carry into the
PR description (testdata imports in stories; hairline `border` namespace), one
already-resolved deviation (decorator pattern), and one ordering note with no
required action. See chat for how you'd like to proceed on each. Decision:
hold off folding the "document in PR" items into the description until
Step 16.

---

## Step 15 — Add a Changeset

Already done — Tamara created this in the same push as the color changes
(commit `dbe5ab974c`, `.changeset/tame-cycles-refuse.md`):

```
---
"@khanacademy/perseus": patch
---

Add regression tests for Grapher and update styling to tokens
```

`patch` matches the workflow's guidance for color/font/styling changes. No
action needed.

---

## Post-Step-16 Additions

Work that came up while Tamara was verifying stories locally in Storybook,
after Step 16's finalize-PR checklist had already been reached. Recorded here
since it's additive scope beyond the original 16-step workflow, not a new
numbered step.

### Story restructuring (Tamara, directly)

The initial-state regression stories were restructured into an explicit
Desktop/Mobile × Quadratic/ChooseYourOwnFunction/Static matrix
(`DestktopQuadratic` [sic], `DesktopChooseYourOwnFunction`,
`MobileChooseYourOwnFunction`, `DesktopStatic`, `MobileStatic`,
`MobileQuadratic`), replacing the earlier single `Quadratic` /
`ChooseYourOwnFunction` / `Static` / `Mobile` set. This gave broader
per-platform coverage and is what surfaced the mobile-static bug below.

### Feature: hairlines on desktop, not just mobile

Tamara asked whether the crosshair hairlines could show on more than mobile.
Traced the gating: three separate `if (this.props.apiOptions.isMobile)`
checks in `grapher.tsx` (hairline init in `_setupGraphie`, `showHairlines`,
`hideHairlines`) — `showHairlines`/`hideHairlines` were already threaded to
`MovablePoint` unconditionally regardless of platform, so removing the three
gates was a small, contained change. Added `DesktopHairlines` to
`grapher-interactions-regression.stories.tsx` (same grab-and-nudge play
function as `MobileHairlines`, no `mobileDecorator`/`apiOptions.isMobile`) and
updated the stale "only on mobile" doc comment. Updated the "multiple graph
types" snapshot, since hairline elements (hidden) now exist in desktop's DOM
tree too. Verified with `pnpm tsc` (clean) and `pnpm test
packages/perseus/src/widgets/grapher` (6/6 passed).

Considered and declined in the same conversation: unifying point hover
behavior so mobile points get bigger-on-hover like desktop (currently mobile
loses its border on hover instead), and swapping desktop to interactive-graph's
own point component. Both are real component-behavior changes, not
color-token work — recommended as separate ticket scope rather than folding
into LEMS-4275. Investigating this is what surfaced the mobile-static bug
below, ahead of schedule.

### Bug fix: static points not turning gray on mobile

**Symptom:** on the new `MobileStatic` story, the curve and asymptote
correctly rendered gray (per Step 9's conversion), but movable points stayed
interactive blue. `DesktopStatic` (identical testdata) rendered correctly.

**Investigation (ruled out, in order):**
- `static` prop threading from the widget down through `FunctionGrapher` to
  `MovablePoint` — identical on both platforms, confirmed by reading every
  hop (`grapherProps.static = this.props.static` → `FunctionGrapherProps` →
  `<MovablePoint static={this.props.static} />`).
- `movable-point.tsx`'s own color computation
  (`tokenValue(state.static ? disabled.strong : instructive.default)`) — no
  mobile-awareness at all (zero matches for `isMobile` in that file).
- A hypothesized stale-style-caching bug in the `_.extend` merge chain in
  `update()`/`modify()` — traced fully; `_createDefaultState()` resets
  `normalStyle` to `null` on every `modify()` call, so this theory didn't
  hold.
- `convertGrapherOptionsToInteractiveGraph` routing to a different component
  on mobile — only checks `availableTypes.length !== 1`, no `isMobile`
  dependency.
- CSS overriding SVG fill under `.perseus-mobile` — no matching rules found.

**Root cause:** Tamara noticed grapher.tsx computes "isMobile" two different
ways (`this.props.isMobile` on `FunctionGrapher` vs
`this.props.apiOptions.isMobile` on the outer `Grapher` widget) and asked if
that was related. It pointed at the right neighborhood, though the actual bug
turned out to be one layer further down: `packages/perseus/src/components/
graphie-movables.ts`'s `_getProps()` (the bridge between the React
`<MovablePoint>` JSX and the imperative `interactive2` point). When
`this.props.isMobile` is true, it **unconditionally** builds a bigger-touch-
target `normalStyle`/`highlightStyle` (hardcoded interactive-blue fill,
`pointSize: 7`, shadow) with no check on `this.props.static` at all. Since
these get passed as explicit props before reaching `MovablePoint.update()`,
they win the `_.extend({freshlyComputedColor}, state.normalStyle)` merge
regardless of what `static` computes — desktop skips this whole branch
(`if (!this.props.isMobile) return this.props;`), which is why it was never
affected.

This same function is also why mobile points lose their border on hover
instead of getting bigger (`highlightStyle: {..., "stroke-width": 0, scale:
0.75}`) — a detail raised earlier in the same conversation as a separate
observation. Both trace back to this one hardcoded mobile override.

**Fix:** `packages/perseus/src/components/graphie-movables.ts:15` — changed
the guard to `if (!this.props.isMobile || this.props.static) { return
this.props; }`, so static mobile points skip the mobile-only override
entirely and fall through to `movable-point.tsx`'s own static-vs-interactive
computation (the same path desktop already used correctly).

**Scope note:** `graphie-movables.ts` is shared across every widget that
renders a graphie movable point, not just grapher — this is a real bug fix in
shared code. Confirmed with Tamara before making the change; she opted to fix
it here rather than route it elsewhere, since it directly blocks the
`MobileStatic` story she added to this PR.

**Verification:** `pnpm tsc` and `pnpm fixc` clean. Full `pnpm test` — 543/543
suites, 7686/7686 passing (one jest-worker segfault in an unrelated
logarithm-scoring test, confirmed flaky by re-running it in isolation — not
caused by this change). `pnpm test packages/perseus/src/widgets/grapher`
still 6/6. Tamara confirmed live in Storybook that `MobileStatic` now renders
correctly.

### Outstanding before next push

- All of the above (story restructuring, hairlines-on-desktop, the
  graphie-movables.ts fix, and this progress-report update) are currently
  **uncommitted** local changes — nothing has been committed or pushed since
  the un-revert.
- The existing changeset (`tame-cycles-refuse.md`, "Add regression tests for
  Grapher and update styling to tokens") predates both the hairlines feature
  and the bug fix — it may be worth expanding to mention them, since a bug
  fix in shared `graphie-movables.ts` code is more than "styling to tokens."
  Not yet done — needs Tamara's call on wording.
- PR #3922's Chromatic build is showing "6 changes must be accepted as
  baselines" as of this entry — from the push before this round of changes;
  will need another look once these are committed and pushed.
