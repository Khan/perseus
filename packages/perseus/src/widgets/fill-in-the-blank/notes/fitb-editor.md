# FITB Editor — Technical Note

> The authoring side of Fill in the Blank: what the content editor produces,
> how it is built, and what still has to land. Companion to
> [`fitb-render-component-plan.md`](./fitb-render-component-plan.md) (the render
> side) and [`fill-in-the-blank.md`](./fill-in-the-blank.md) (the spec summary).
>
> **Status: proof of concept** ([LEMS-4371](https://khanacademy.atlassian.net/browse/LEMS-4371)),
> on branch **`LEMS-4371/fitb-editor-poc`** *(snapshot — Sep 2026)*, which is
> stacked on the render POC's branch rather than on `main`.
>
> The editor works end to end in Storybook but is registered from its stories,
> not from `all-editors.ts`, because its options shape has not landed in
> `perseus-core`. Follow-up work is marked in the code with
> `TODO(LEMS-4371)` — grep for it.

## What the editor produces

The render component's props, minus the runtime-only placement state:

```ts
{
    content: string,                    // markdown with [[☃ blank n]] markers
    widgets: PerseusWidgetsMap,         // the blank widgets: {displayType, correctId}
    tiles: [{id, content, label, imageHeight?}],
    tileUsage: "single" | "multi",
    maxUsesPerTile?: number,
    randomizeTiles: boolean,
}
```

Two levels of `content`: the item's markdown holds
`[[☃ fill-in-the-blank 1]]`, and the widget's own `content` holds the
`[[☃ blank n]]` markers. That nesting follows the `group` widget, and exists so
translators receive a string whose blank tags they can move
(`fitb-render-component-plan.md`, decisions 1–2).

## Layout

```
Usage   [ Single use | Multi use ]      configuration first — usage changes
                                        what the choices below it mean
┌──────────────────────────────────┐
│ The [[☃ blank 1]] drum is …      │    nested Perseus `Editor`
└──────────────────────────────────┘
 [+ Insert blank]                       replaces the widget/template dropdowns
 ▾ blank 1                              a panel per blank, under its text
   Display [ ▾ ]  Correct answer [ ▾ ]
Choices                                 the radio editor's per-choice card
 ┌────────────────────────────────┐
 │ Choice 1                       │
 │ Content ⓘ           [        ] │   text choices only —
 │ Screen reader text ⓘ [        ] │   an image replaces both
 │ [+ Add image]                  │
 │ [🗑 Remove]        ⌃⌃ ⌃ ⌄ ⌄⌄  │
 └────────────────────────────────┘
 [+ Add a choice]
```

## Key decisions

| # | Decision | Why |
| --- | --- | --- |
| 1 | The answer zone is the **nested Perseus `Editor`**, as `group-editor` does. | Keeps real markdown/TeX/image tooling and the real translation-facing marker string. |
| 2 | **`correctId` and `displayType` are authored in each blank's own panel**, reached through `FillInTheBlankEditorContext`. | `correctId` names a tile in the *parent's* choice bank, and the nested `Editor` renders the blank editors, so FITB cannot pass them props. Mirrors how the render side solves the same problem with `FillInTheBlankContext`. |
| 3 | **`blank` gets a registered editor**, with only those two controls. | `Editor` treats a widget with no registered editor as an *error*: the marker gets `.error` and renders on a red background, the same red a duplicate widget id gets. Registering an editor also gives each blank the standard delete button. |
| 4 | **`Editor` grew an optional `widgetToolbar` prop**, which replaces its widget/template dropdown row. | Puts "Insert blank" between the textarea and the blank panels — the only slot the layout allows — *and* removes the "Add a widget…" dropdown, which otherwise offers every public widget inside a FITB answer zone. |
| 5 | Insert-blank **does not use `Editor._addWidget`**. | So a new blank can start with `correctId: ""`, which the save warning looks for, rather than the generator's placeholder id. It sets `Editor`'s `lastUserValue` and `_pendingCursorPos` to keep the edit in the browser's undo stack and restore the cursor — the same contract `_addWidget` uses. |
| 6 | Choice ids are `tile-N`, **one past the highest in use**, so deleting the last choice frees its number. | Safe *only* because deleting a choice clears every `correctId` naming it. The two must not be separated; a test pins the pairing. |
| 7 | The choices list follows the **radio editor's per-choice card**, including its add-image flow. | Two widgets whose editors both present a list of authored choices should not look like different products. |
| 8 | Blank numbering comes from the render component's **`parseBlankIds`**. | The editor must number blanks exactly as the learner meets them; one function means the two can never disagree. Note the labels are positional while widget keys are not — delete a marker mid-paragraph and "Blank 3" becomes "Blank 2" while the key stays `blank 3`. |

## Image choices

Source: the Drag-and-Drop
[Overview](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4711973105/Overview).

- **A choice holds text or an image, never both.** Text means a plain string or
  TeX. The editor enforces this by *replacing*: the image editor takes the
  place of **both** text fields, and "Add image" confirms first when there is
  text to lose (house wording — state the consequence, then "Do you want to
  continue?", as `decorative-toggle.tsx` does). The schema needs nothing for
  this: an image choice's `content` is whole-string image markdown,
  `![alt](url)`, so "both" is not representable.
- **An image choice's alt text is its screen reader text.** There is no
  separate field — typing alt text also writes the tile's `label`, which is
  what the render component announces. Two fields describing one image is two
  places for them to disagree.
- **Seven fixed display heights** — 24, 36, 48, 60, 72, 84, 96. Fixing the
  height is what lets the system scale predictably: the displayed width falls
  out of the aspect ratio.
- **Square is preferred**; non-square is allowed only in **landscape**.
- **The displayed width must never exceed the tile**, with no scrolling.
- **Never images of text** — use Text or TeX. Images earn their place for
  visual skills like pattern recognition, or where the picture *is* the concept
  (currency, say).

The UI follows the radio editor's add-image flow: an "Add image" button, then
an accordion holding Preview → Image URL → Image alt text, with the same
dimension fetch keyed on the URL and the same "Delete this image" button. The
height select sits in that accordion, since it applies to nothing else.

### Where each rule is checked, and why

| Rule | Checked in | Why there |
| --- | --- | --- |
| text and an image in one choice | `perseus-linter`'s `fill-in-the-blank-widget-error` → the **issues panel** | The UI cannot produce a mixed choice, but options also arrive as hand-edited or pasted JSON, and nothing on that path is checked. A linter rule covers both routes. |
| alt text present; a height is chosen | `validation.ts` (save warnings) | Decidable from the authored options alone. |
| portrait rejected; displayed width fits the tile | `tile-image-editor.tsx` (live, beside the fields) | Both need the image's **natural dimensions**, which the render plan's decision 5 deliberately keeps *out* of the schema. The editor already fetches them for the preview, so it is the only place that can decide. |
| no images of text | nowhere | A judgement call no check can make; it belongs in authoring guidance. |

That split is worth preserving: save warnings must stay a pure function of the
options so they can move into a `perseus-linter` rule, and dimensions are not
in the options.

### Why the mixing check is a linter rule, not a save warning

The editor enforces text-or-image by construction, so the *only* way to author
a mixed choice is JSON — and a mixed choice slips past the other checks:
`"$2$![a](u)"` reads as TeX so the single-word rule exempts it, and
`"![a](u)![b](v)"` has no whitespace so it passes too. The rule also catches a
second image in one choice, which the mixing test alone would miss.

`perseus-linter` is the right home because its output is what
`gather-linter-issues.ts` feeds to the **issues panel**, so the author sees it
in the editor rather than only on save. It reads the options defensively —
`tiles` may not be an array, a tile may be `null`, `content` may not be a
string — because policing malformed JSON is the whole point.

## Save warnings

Pure functions in `validation.ts`, deliberately separate from the component so
they can move to a `perseus-linter` rule without a rewrite.

- **Structural:** no blanks; fewer than two choices; a blank with no correct
  answer; a `correctId` naming a deleted choice; more blanks than single-use
  choices; `maxUsesPerTile` below 1.
- **Spec:** a text choice holding more than one word; choices mixing
  Text/TeX/Image (Empty may be mixed); a choice with no screen reader text; an
  image choice with no alt text or no chosen height.

**The width cap is only approximated for text.** For an **image** it is
computed exactly, in `tile-image-editor.tsx`: the height is a fixed preset, so
the displayed width follows from the natural dimensions the preview already
fetched. For **text and TeX** it cannot be — text width is font-dependent and
TeX width is unknown until KaTeX typesets — so the editor substitutes a
documented 20-character budget for text choices. `useWidestTileWidth` measures
every tile at runtime, so the honest fix for those two is reporting that
measurement back to the editor.

---

## Plan

Ordering is forced by one constraint: **the editor cannot be registered until
the widget exists, and the widget cannot exist until the options shape is in
`perseus-core`.** A–C are a chain; D, E and G are independent once C lands.

Most of A, B and B2 belong to sibling tickets, not to the editor ticket:
LEMS-4316 owns the DnD data-schema (in progress, and it covers every DnD
widget), LEMS-4321 the widget scaffolding, LEMS-4323 the Go schema in webapp,
LEMS-4370 the scoring. The editor ticket owns C–H. LEMS-4321 additionally
requires the widget be hidden behind the `dnd-widget-fitb` feature flag, and
the *Creating a New Perseus Widget* doc adds three steps not listed below: a
JSON parser in `perseus-core/src/parse-perseus-json/`, entries in
`perseus/src/util/widget-enum-utils.ts`, and a `FILL_IN_THE_BLANK` entry in the
`event-schemas` repo.

| PR | Scope |
| --- | --- |
| **A** | `PerseusFillInTheBlankWidgetOptions` + `PerseusFillInTheBlankUserInput` in `perseus-core`, the `WidgetLogic` (version, `defaultAlignment: "block"`, `getPublicWidgetOptions` stripping `correctId`, `traverseChildWidgets` like `group`'s), registry entry, generators. |
| **B** | The widget. `fill-in-the-blank-widget.tsx` and its `index.ts` are already in this folder; what remains is registering it in `extra-widgets.ts` and folding in the render component as it migrates out of `components/drag-and-drop/` — at which point this file becomes plain `fill-in-the-blank.tsx`. |
| **B2** | Scoring in `perseus-score`. Until this exists `correctId` is authored but never read. |
| **C** | Editor scaffold — the shell and Usage only — plus `index.ts` and the `all-editors.ts` entry. |
| **D** | The answer zone: the `widgetToolbar` prop on `Editor`, the nested editor, insert-blank. Review alone; `editor.tsx` is used by every container editor. |
| **E** | The choices list, **including image choices**: the radio add-image flow, the seven height presets, `tile-image-editor.tsx` / `tile-image-utils.ts`, and the live shape checks. |
| **F** | Save warnings. `fill-in-the-blank-widget-error.ts` **already exists** in `perseus-linter`, carrying the one check the editor cannot enforce (text and an image in one choice). **F2** moves the remaining save warnings into that same rule. |
| **G** | The blank editor and its context. |
| **H** | Delete the POC-only registration scaffolding (`register-poc.ts`, the extra preview story, and the `previewStoryId` / `usePreviewUrl(storyId)` plumbing) — all of it exists only because the widget is not registered globally. |

### How this lands

Per *Creating a New Perseus Widget*, a new widget goes out through a **feature
branch**: the PRs above land into it, then it lands into Perseus with
`git pull-request --feature-branch` / `git land --feature-branch`. The feature
branch's first land takes a **major** changeset bump — adding a widget does not
break compatibility, but older Perseus versions cannot render content using it.
The PRs inside are patches or minors.

The widget ships `hidden` (and, for this one, behind the `dnd-widget-fitb`
feature flag from LEMS-4322) until it has been exercised on a **Test Everything
page**, which is built by pasting item JSON in the editor's JSON mode — the
widget is not in the dropdown yet. The `WithInvalidJson` and
`WithChemicalEquation` stories are usable starting points for that JSON.

Release-time follow-ups the doc lists: a translation ticket for any new
user-facing strings, a heads-up to Content Platform so the publish worker
handles the new widget, and adding it to the widget documentation page.

### Decisions PR A must settle

These are open, and the render and editor sides must not answer them
differently.

LEMS-4316 is meant to design the DnD data-schema, but it had produced no shape
as of Sep 2026 — so the render POC's props and this editor's options **are**
the working proposal, not an implementation of someone else's. Treat the list
below as findings to take to that ticket (LEMS-4321's acceptance criteria asks
for exactly that), not as questions blocking work:

1. **Who owns the learner's input.** The POC picks parent-owned
   `{placements: {blankId → tileId}}`, matching the render component's
   controlled `placements` and `tile-placements.ts`. The existing per-blank
   `PerseusBlankUserInput.selected` implies blank-owned.
   `fitb-render-component-plan.md` flags this as "decide before the real
   widget"; it is now due.
2. **Whether a tile carries an authored `label`.** The render plan's draft
   schema omits it; the render component reads it for screen reader text and
   the editor authors it with a save warning. See the correction below — it is
   *not* also the source for the small-value exception, though a stale note
   says so.
3. **Whether `randomizeTiles` and `maxUsesPerTile` stay.** Both are in the
   options; neither has a control, because the agreed design shows Usage alone
   in the settings row. Either they get controls in PR E or they leave the
   schema for now.
3b. **Whether `imageHeight` stays a per-tile field.** It is the only tile
   property the render plan's draft schema already anticipated, and the seven
   presets are what make an image's displayed width predictable. Nothing
   contentious — but it needs to land in the schema with the rest.
4. **Whether `TilePlacements` survives the other DnD widgets.** One tile per
   blank with swap-to-bank is proven for Fill in the Blank and Sorter, and
   deliberately untested against Categorizer's stacking model — the render
   plan scopes Categorizer and Composer out. Since the schema ticket is
   explicitly cross-widget, this is the part most likely to force a migration
   if it is frozen too early.
5. **Where the component lives.** The render plan's decision 10 calls
   `components/drag-and-drop/fill-in-the-blank/` a temporary POC home that
   migrates to this folder. PR B is that migration, so it should be the render
   author's call when it happens, or done jointly.

### Overlap with the render POC

| File | Owner | Overlap |
| --- | --- | --- |
| `components/drag-and-drop/fill-in-the-blank/fill-in-the-blank.tsx` | render POC | Its private `parseBlankIds` was exported for the editor. Keep it shared — the editor must not grow a copy. |
| `components/drag-and-drop/fill-in-the-blank/index.ts` | render POC | Re-exports; trivial but certain conflicts. |
| `perseus/src/index.ts` | shared | A POC export block exists only because `perseus-editor` cannot deep-import (the package exposes `.` and `./strings` only). Delete it once both sides live here. |
| `widgets/blank/blank.tsx` | render POC | They wired it to `FillInTheBlankContext`; we add its *editor*. No file overlap, but both must agree on what `correctId` means. |
| `widgets/fill-in-the-blank/fill-in-the-blank-widget.tsx` + `index.ts` | **ours** | Already in its final folder. Becomes `fill-in-the-blank.tsx` when the render component migrates in. |
| `perseus-linter/src/rules/all-rules.ts` | shared | One added import and one added entry for `fill-in-the-blank-widget-error`. |
| `perseus-editor/src/components/segmented-control.tsx` | shared | Gained an `aria-labelledby` prop; it declared only `aria-label` and silently dropped anything else. |
| `perseus-editor/src/editor.tsx` | shared | Gained the optional `widgetToolbar` prop (PR D). |

## Corrections to the sibling notes

- **`fitb-reflow-edge-cases.md` §7 is stale.** It says the small-value
  exception is "keyed on the POC's `label` field". The component actually keys
  it on `content` with TeX delimiters stripped, and its comment says
  explicitly *not* the label — because a label is screen reader text and can be
  longer than what the tile shows (an empty tile displays `""` but is labelled
  "empty"). Worth correcting there, since it otherwise makes `label` look
  load-bearing for layout and skews the schema decision above.
- **`fitb-reflow-edge-cases.md` §12 is a requirement on this editor**, not just
  a render note: spacing between TeX and an adjacent blank is *authored*
  (a `\,` thin space before the marker), because no programmatic fix is
  reliable. That is authoring guidance the editor should surface, and a
  candidate linter suggestion. Not yet built — the answer zone offers no such
  hint.

## Known issues

**From a code review; none of these block the POC.** `getTileContentKind` treats any content
containing `$` as TeX, so a plain-text `$5` is misclassified and triggers a
spurious mixing warning; an image URL containing `)` breaks the anchored image
regexes and silently turns the choice back into text; `insertBlank` writes
`content`/`widgets` directly, so replacing a selection that spans a marker
leaves an orphaned widgets entry in the saved JSON; and `widgetToolbar`
replaces the whole selector row, so a caller using it alongside
`showWordCount` loses the word count.

## Known bug

The choice card's info tips render their popover at the top of the page instead
of beside the icon. **Not the shared component's fault:** the image widget's
"Alignment" row uses the same `components/info-tip` module (as do ~28 files)
and positions correctly, with block children too. So it is something about the
placement in `tile-row-editor.tsx`. Cheapest hypotheses first: the flex
`.field-header` wrapper; the tip sitting after a `<label>` rather than after a
control (Alignment puts it after the select); the `<code>` elements in the tip
body; the card being inside `<ol>`/`<li>`. Also worth ruling out: two copies of
`wonder-blocks-tooltip` are installed against different `@popperjs/core`
versions.
