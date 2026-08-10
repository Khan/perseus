# ColorSync Widget Migration Progress Report — orderer

Widget: `orderer`
Workflow: colorsync-widget-migration
Started: 2026-08-10
Context: split out into its own branch/PR from the `sortable`/PR #4027 work. That PR converts the 17 hardcoded hex colors in `packages/perseus/src/styles/widgets/sortable.css`'s `.draggy-boxy-thing` rules — which are actually rendered by `orderer.tsx`, not the `sortable`/`sorter` widgets the filename suggests (see `sortable-colorsync-progress-report.md`, Step 1). Reviewing that PR found `orderer` has no visual regression story coverage at all, so none of the states its colors touch (`:hover`, `.dragging`, `.placeholder`, `.drag-hint`) are captured for Chromatic review. This report covers Step 2 (Create Regression Stories) only, using the existing Step 1 audit from the `sortable` report rather than re-auditing.

## Step 1 — Audit the Widget (by reference)

Not repeated here. Using the existing audit from `sortable-colorsync-progress-report.md`, Step 1, which already confirmed:
- `orderer.tsx` itself has no hardcoded colors, fonts, or border values of any kind.
- All of `orderer`'s visual styling comes from `packages/perseus/src/styles/widgets/sortable.css` lines 1–52 (the `.draggy-boxy-thing` selector block), which is the file being converted in PR #4027.

The states that block needs coverage for, and the token conversions each one shows (per the Step 10 semantic check on the `sortable` report):

| Selector | State | Token(s) |
|---|---|---|
| `.draggable-box` | resting container | `background.neutral.subtle`, `border.neutral.subtle` (×2, incl. shadow), `border.neutral.default` |
| `.card` | resting card | `background.base.default`, `border.neutral.subtle`, `border.neutral.default` |
| `.card.stack` (bank cards, `::after`) | resting stacked card | same three as `.card` |
| `.card.placeholder` | ghost slot left behind while dragging | `background.neutral.subtle` |
| `.card.dragging` | card actively being dragged | `background.instructive.subtle` |
| `.card:hover` | mouse-hover affordance | `border.warning.default`, `border.warning.strong` (flagged in the semantic check as a likely category mismatch — this is the state a reviewer would most want to actually see) |
| `.card.drag-hint` | empty-state template shown when no cards are placed yet | `border.neutral.default` |

## Step 2 — Create Regression Stories

### Research

Read `packages/perseus/src/widgets/orderer/orderer.tsx` in full to determine how each state above is actually reached:

- **Resting container/card/stack** — no interaction needed. `.card.stack` is used for every card still in the widget's `options` "bank" (`stack={true}` at line 717); cards moved into `userInput.current` render as plain `.card`. Rendering both a non-empty bank and a non-empty `current` list in one story shows all of these at once.
- **`.drag-hint`** — rendered by `DragHintCard` whenever `userInput.current` is empty (`!anySortableCards`, line 701), regardless of how many items are in the bank. This is a genuine initial state, not an interaction — reachable just by not seeding `current`.
- **`.dragging` / `.placeholder`** — both come from the same `Card`'s internal `onMouseDown` → `onMouseMove` sequence (`orderer.tsx` lines 206–236, 370–409, 495–516). Picking up a card that's already in the `current` list (`type: "current"`) sets `placeholderIndex` **synchronously on mousedown** (line 389) — so `.placeholder` appears immediately. The floating card only gets the `.dragging` class once `state.mousePos` is set (line 257–266), which requires an actual subsequent `mousemove` — so one mousedown + one mousemove captures both states together.
- **`.card:hover`** — a plain CSS `:hover`, no JS state involved. `userEvent.hover(...)` on the `.card` element is sufficient; no mousedown needed (and shouldn't be combined with it — hovering *and* holding the mouse down is a different, unneeded state).

Confirmed via `Util.extractPointerLocation` (`packages/perseus/src/util.ts:522`) that `orderer.tsx`'s mouse handling reads `event.pageX`/`event.pageY` — the **exact same utility** `components/sortable.tsx`'s `Draggable.onMouseMove` already uses. This means the drag-simulation pattern already proven in `components/__docs__/sortable-interactions-regression.stories.tsx` (`mouseDown` play-util, then `fireEvent.mouseMove(document, {clientX, clientY})` — needed because the mousemove listener is bound to `document` via jQuery, not to the card itself, so `userEvent`'s synthetic events won't reach it) transfers directly to `orderer` with no adaptation.

Also confirmed via `grep -rn "cards-area"` that `.cards-area` (grouped with `.draggable-box` in the CSS selector being converted) is dead — nothing in the codebase renders that class. Not actionable, just noted so a future reader isn't confused about why no story targets it.

### Decision: no shared widget generator exists for `orderer`

Every other widget's renderer-decorator (per `regression-stories.md`'s template) calls a `generate<Widget>Widget`/`generate<Widget>Options` pair from `@khanacademy/perseus-core`'s generators. No `orderer-widget-generator.ts` exists (confirmed against the full `packages/perseus-core/src/utils/generators/` listing). Rather than add one as a hidden prerequisite to this story-only change, the decorator builds the widget's `options`/`correctOptions`/`otherOptions`/`userInput` shape directly, matching `PerseusOrdererWidgetOptions` and `orderer.testdata.ts`'s existing raw shape. Args are still passed inline per-story and validated with `satisfies Partial<PerseusOrdererWidgetOptions>`, so this doesn't reintroduce the "import shared testdata" pattern the instructions warn against — it's a generator-shaped inline object, not a shared fixture.

### Decision: initial state vs. interactions split

- **Initial state file:** `Default` (cards in both the bank and the placed list, covering `.card`/`.card.stack`/container colors, using TeX content in one card since `orderer` renders `PerseusRenderer` content and can display math), `DragHint` (empty `current` list), and `RightToLeft` (Default args + `rtlDecorator` — `orderer`'s cards are text-driven and horizontal layout visibly mirrors under RTL).
- **Interactions file:** `HoverCard` (hover only — the state the semantic-check flag is actually about) and `DraggingCard` (mousedown + mousemove on a placed card, capturing `.dragging` and `.placeholder` together, mirroring the sibling `Sortable` component's own `DraggingCard` story).
- **Out of scope, intentionally:** vertical-layout variants and RTL interaction stories. `layout` only changes flex direction, not any of the colors in scope here, and RTL doesn't change colors either — adding either would be coverage for its own sake, not for the states this PR's audit identified. Plain-text (not TeX) content is used in the interactions file specifically because `play` functions query for cards by their rendered text, and TeX renders to MathML/SVG rather than literal text — reserving TeX content for the initial-state file, where nothing needs to query into it, avoids a fragile query.

### Files created
- `packages/perseus/src/widgets/orderer/__docs__/orderer-renderer-decorator.tsx`
- `packages/perseus/src/widgets/orderer/__docs__/orderer-initial-state-regression.stories.tsx`
- `packages/perseus/src/widgets/orderer/__docs__/orderer-interactions-regression.stories.tsx`

No changes were needed to `orderer.testdata.ts` — regression stories define their args inline per the instructions, so the existing testdata file (used by `orderer.test.ts` and the non-regression `orderer.stories.tsx`) is untouched.

### Verification against a real browser, and a correction

Built the storybook and ran the actual stories in Chromium (via `playwright-core` against the pre-installed browser, driving `iframe.html?id=...` directly — installed as a scratch dependency, not added to the project) to confirm each state actually renders, rather than trusting static code tracing:

- `Default`, `DragHint`: confirmed `.card`, `.card.stack`, `.card.drag-hint`, and the container all render with the expected classes/computed styles.
- `DraggingCard`: confirmed empirically that both `.card.placeholder` and `.card.dragging` appear after the mousedown+mousemove sequence — this was not obvious from reading `orderer.tsx` alone, since the originally-clicked card unmounts (its `componentWillUnmount` calls `unbindMouseMoveUp`) as part of the same state update that creates the placeholder, which looked on paper like it should drop the `document`-level mousemove listener before the move could ever be dispatched. It doesn't break in practice — confirmed live rather than relying on that trace.
- **`HoverCard` (removed):** the `userEvent.hover()` play function produced *no visual change at all* — before/after computed styles were byte-identical. Root cause: `:hover` only activates from OS-trusted pointer input in a real browser; anything dispatched from in-page `play` function code is untrusted, so Chromium never applies the pseudo-class from it. This is a pre-existing, documented limitation in this codebase, not something specific to `orderer` — `definition-initial-state-regression.stories.tsx` carries the identical note: *"The Definition widget also has a `hover` state, but it cannot be tested accurately with Chromatic at this time (2026)."* Removed the non-functional story (a green Chromatic check that verifies nothing is worse than no story) and replaced it with a comment documenting the limitation, matching the `definition` widget's precedent.

### Coverage result

Of the 10 unique color-token conversions in scope (see the table above and `sortable-colorsync-progress-report.md`'s Step 10):
- **8 are covered and confirmed rendering:** container background/border/border-bottom, `.card`/`.card.stack` background/border/border-bottom, `.card.drag-hint`'s own border, `.card.placeholder` background, `.card.dragging` background.
- **2 are not — and cannot be, via Chromatic, with any story:** `.card:hover` border-color and box-shadow. Same applies to `.card.drag-hint:hover` (an override of the same `.card:hover` rule, using the same token) — not worth a dedicated story for the same reason. Both need manual verification in a running Storybook instance instead.
