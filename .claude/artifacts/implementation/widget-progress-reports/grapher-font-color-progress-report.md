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
