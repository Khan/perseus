# Fill in the Blank — Content-Editor Prototype Plan

**Status:** 🟡 Draft for review · **Owner:** Sarah Third · **Epic:** [LEMS-4311](https://khanacademy.atlassian.net/browse/LEMS-4311) (Fill in the Blank)

**Companion doc:** [Drag and Drop — Fill in the Blank: Initial Work Plan](https://khanacademy.atlassian.net/wiki/spaces/~6171d6f6327da40069d145e9/pages/4839243887) (schema §11, editor §11.1). This doc supersedes the marker-string approach sketched there — see [Rejected alternatives](#rejected-alternatives).

---

## 1. Goal & scope

Prototype the **content-editor (authoring) experience** for the new Fill in the Blank (FITB) widget — the part the team judges hardest to get right and for which we have no designs. The deliverable is a demo-able editor for content-creator feedback and an engineering feasibility read.

**In scope**
- The FITB editor UI in `perseus-editor`.
- Enough of the widget to render a live preview and appear in Storybook.

**Explicitly out of scope (throwaway / stubbed)**
- Real drag-and-drop on the student side (a separate prototype repo owns that; needs dnd-kit, not yet security-approved — **do not install**).
- Scoring, validation, i18n extraction, RTL, mobile hardening.
- Exact sub/superscript render positioning (editor captures author *intent*; render just shows a box).

---

## 2. Chosen direction — a lite, card-based content builder

Instead of one editable content string with embedded blank markers, **the content is an ordered list of typed "cards"**: `Plain Text`, `TeX`, `Image`, and `Blank`. The author assembles content by adding cards from a palette and arranging them; each card owns its own settings. (Matches Sarah's mockup: a `Content` canvas of cards, a `Card Types` palette, and a per-card action menu.)

This is a *lite, purpose-built* WYSIWYG — not a general rich-text editor. Each card renders its own small UI; a `Blank` card's action menu holds Correct / Display Type / Alt / Remove; a `TeX` card still stores a raw TeX string (rendered in preview).

### Why this over a content string + markers

Every earlier approach tried to encode structure inside one editable markdown string. That created three problems the card model removes outright:

| Problem with a content string | Why the card model removes it |
| --- | --- |
| **Blank identity is fragile** — an id baked into editable text (`{{1}}`, `[[☃ blank 1]]`) can be duplicated, renumbered, or orphaned by hand-editing. | A blank is an **object** in a managed array. Its id lives on the object, never in editable text, so it is stable and moves with the card. **The card model is exactly what makes stable ids safe again.** |
| **TeX escaping is gibberish** — a blank inside math forces authors to terminate TeX on both sides: `$12+$ {{1}} $=16$`. | A blank is a **sibling card** between two TeX cards. It is never inside a TeX string, so there is nothing to escape or terminate. |
| **Author has to mentally map** an anonymous marker in prose to a row in a settings panel below. | The blank card **is** the settings entry point (shows its correct answer inline; its action menu holds its settings). No mapping to hunt for. |

Bonus: content reflows naturally (every piece is a card), it mirrors the student render model (everything is a tile) and the Sorter sentence-builder, and — see §4 — **there is essentially no parsing**, which is a big feasibility win.

---

## 3. Data schema

Content stops being a `string` and becomes a discriminated-union array. Choices (the student's answer bank) stay a separate list, referenced by blank cards.

```ts
// ── perseus-core/src/data-schema.ts ──────────────────────────────
export type PerseusFillInTheBlankWidgetOptions = {
    // The ordered content. Replaces graded-group's `content: string` + `widgets` map.
    cards: ReadonlyArray<FITBCard>;

    // The answer bank (tiles the student drags). Authored in their own list UI.
    choices: ReadonlyArray<FITBChoice>;

    // Tile reuse policy.
    tileUsage: "single" | "multi";
    maxUsesPerTile?: number; // multi only; omit = unlimited

    // ONE image height for the whole set (Overview's 7 presets). Width scales from it.
    imageHeight?: 24 | 36 | 48 | 60 | 72 | 84 | 96;
};

export type FITBCard =
    | {type: "text"; content: string}                 // markdown/plain-text run (can be a whole sentence)
    | {type: "tex"; tex: string}                       // raw TeX; rendered in preview, no escaping needed
    | {type: "image"; url: string; alt: string; longDescription: string}
    | FITBBlankCard;

export type FITBBlankCard = {
    type: "blank";
    id: string;                                        // stable, editor-generated; NOT in editable text
    correct: string;                                   // choiceId (stripped from public options)
    displayType: "normal" | "superscript" | "subscript";
    ariaLabel?: string;                                // custom SR label; defaults to "Blank N" (by doc order)
};

export type FITBChoice = {
    id: string;                                        // stable; referenced by blank.correct + userInput
    content: string;                                   // markdown/TeX; "" for image-only choices
    image?: {url: string; alt: string; longDescription: string};
};
```

Notes:
- **Blank ids are safe here.** Generated on card creation, carried on the object, never hand-typed. This is the whole point of the pivot — it resolves the identity concern that sank the marker approaches.
- **`displayType` on the blank** (normal / superscript / subscript). The Confluence §11 "no display field" note assumed position-in-content could infer this; it can't (plaintext-TeX / mixed content give no reliable signal), so the author declares it. Editor captures intent; render positioning is a later concern.
- **Image cards and image choices** both carry `alt` + `longDescription` (the long description was missing from the §11 schema and is required for SR support).
- **Public options / scoring:** strip `blank.correct` in `getPublicWidgetOptions` (mirrors label-image dropping `marker.answers`). userInput maps `blankId → placed choiceId | null`; scoring compares per blank. (Out of scope for the prototype, listed for completeness.)

**Open question — where choices come from.** Two options: (a) author them in a dedicated Choices bank section, blank `correct` picks from that list (distractors = choices no blank uses); or (b) seed a choice automatically when a blank's correct answer is typed, plus a small UI for distractors. The mockup shows correct answers as first-class on the blank, which leans (b)+auto-seed, but we still need somewhere to author distractors, image alt/longDescription, and the global size. **Recommendation:** keep a Choices bank section (a), with optional auto-seed on blank creation for speed. Flagged for the feedback session.

---

## 4. Feasibility

### Editor UI — feasible now (minus drag)
The card builder decomposes into standard Perseus/Wonder Blocks pieces:
- **`Content` canvas** — renders the `cards` array as inline, reflowing card chips.
- **`Card Types` palette** — Plain Text / TeX / Image / Blank; adds a card of that type.
- **Per-card editing** — Text/TeX/Image cards edit inline or via a small popover; the Blank card's **action menu** (Correct dropdown, Display Type dropdown, Alt Text field, Remove) is modeled on interactive-graph's locked-figure settings + a Wonder Blocks popover/dropdown.
- **Choices bank** — label-image `AnswerChoices`-style add/edit/remove list, extended for text/TeX/image + global height preset.

Reordering: **the drag-to-reorder + action-menu placement needs dnd-kit** (unapproved). For the Perseus prototype we ship **non-drag reordering** (move up/down, add-at-position, remove) so the model is fully exercised without the dependency. The drag layer is prototyped in the external repo alongside the student side and ported once dnd-kit is approved. dnd-kit `core` is the leading candidate.

### Data schema — feasible, and cleaner
Structured union + a choices list. Stable ids on objects. No new markdown syntax, no widget-registry entry for "blank," no palette pollution.

### Parsing / render — feasible, and *simpler than the string approach*
**There is essentially no parsing.** Content is already structured JSON. Render is a `.map` over `cards`:
- `text` → inline markdown (or plain text for the prototype)
- `tex` → rendered TeX (MathJax)
- `image` → `<img>`
- `blank` → the `Blank` component

No marker regex, no markdown-rule change, no TeX-escape collisions, no `parseInline` gymnastics. Complexity moves from *parsing/escaping* (fragile, author-facing) to *editor tooling* (robust, hidden from authors) — exactly where we want it.

### Caveats to record (not blockers)
- **i18n extraction.** Perseus generally extracts translatable strings from a markdown content string. FITB's translatable strings live in structured fields (`text.content`, `image.alt`/`longDescription`, `choice.content`/`image.*`, `blank.ariaLabel`). Nested-translatable widget options have precedent (radio choices, label-image alt), but the extraction pipeline must reach these fields. **Verify before productionizing; irrelevant to the prototype.**
- **Tooling that assumes a content string** (linter, some traversal) — FITB opts out by owning structured content, similar to how container widgets differ. Acceptable; note it.
- **dnd-kit** unapproved → drag interaction lives in the external prototype for now.

---

## 5. Editor UI breakdown (build references)

| Piece | Model it on | Notes |
| --- | --- | --- |
| Content canvas (card list) | interactive-graph `LockedFiguresSection` | Ordered list; non-drag reorder for now; each card is a chip. |
| Card Types palette | label-image `AnswerChoices` add row / a small button group | Adds a card of the chosen type at the end (or at a chosen insert point). |
| Blank card action menu | interactive-graph locked-figure settings + WB `Popover`/`Dropdown` | Correct (choice dropdown) · Display Type (segmented/select) · Alt Text (field, with Auto-generate affordance) · Remove. |
| Text / TeX / Image card editors | `form-wrapped-text-field`; label-image structured image editing (`ImagePreview`) | TeX card stores raw TeX, rendered in preview. Image card: url + alt + longDescription. |
| Choices bank | label-image `AnswerChoices` + `Behavior` | Text/TeX/image choices; global `imageHeight` preset; distractors are unreferenced choices. |
| Live preview | `<Renderer inline>` / direct card→node mapping | Shows rendered TeX/images + boxed blanks. |

---

## 6. Minimal wiring (files)

- `perseus-core/src/data-schema.ts` — add the types above; register `"fill-in-the-blank"`; `defaultWidgetOptions`.
- `perseus/src/widgets/fill-in-the-blank/` — placeholder renderer (maps `cards` → inline nodes, static boxes for blanks) + `WidgetExports`; register in `widgets.ts`.
- `perseus-editor/src/widgets/fill-in-the-blank-editor/` — the editor + subcomponents (`content-canvas`, `card-types-palette`, `card-editors/*`, `blank-action-menu`, `choice-bank`, `global-settings`). Register in `all-editors.ts`.
- `perseus-editor/src/widgets/__docs__/…stories.tsx` — one story with a prose example (SpongeBob/drum) and an equation example (the chemical one) to demo both modes.
- Score/validation: **stubbed or omitted.**

---

## 7. Sequencing

1. Schema types + defaults + placeholder renderer registered (thin slice that renders in Storybook).
2. Content canvas + Card Types palette + add/remove/reorder (non-drag) + live preview — **the novel core; prove it first.**
3. Card editors: Text/TeX, then Image (alt + longDescription).
4. Blank card action menu (Correct + Display Type + Alt).
5. Choices bank + global settings (reuse, image height).
6. Story polish for the demo.

---

## 8. Open questions

- **Choices authoring** — dedicated bank vs. auto-seed from blanks + distractor UI (§3). *Recommendation: bank + optional auto-seed.*
- **Insert-at-position UX** without drag — click-to-insert between cards vs. add-at-end-then-move. Prototype can start with add-at-end + move.
- **Card editing surface** — inline edit vs. per-card popover for Text/TeX/Image (Blank is already a popover/action-menu). Lean inline for text.
- **i18n extraction** from structured content — confirm the pipeline reaches nested fields (productionization, not prototype).
- **dnd-kit** approval + the drag/action-menu placement layer (external prototype).

---

## 9. Rejected alternatives

- **Content string + numbered marker `{{N}}`** — blank identity baked into editable text is fragile (duplicate/renumber/orphan on hand-edit); still forces TeX-escaping gibberish for math blanks. Rejected once the card model showed it removes both.
- **Content string + `[[☃ blank N]]` as a hidden registered widget** (`hidden: true` keeps it out of the "Add a widget" palette — mechanism confirmed at `packages/perseus/src/types.ts:415` / `widgets.ts:133`). Technically works, but makes blanks *nested widgets riding a widgets map*, contradicting "blanks are FITB components, not widgets," and keeps the fragile-marker + TeX-escape problems.
- **Full WYSIWYG rich-text editor** (ProseMirror / Lexical / TipTap) — would mean rethinking KA's "author markdown/TeX as source" standard; TeX-in-rich-text + inline images are the hard parts (custom node views, MathJax, serialization). The card builder gets ~90% of the WYSIWYG feel at a fraction of the lift and doesn't change how TeX is authored. Recorded as considered; revisit only if the card model proves too clunky for prose.

### Markdown / syntax facts that informed the above (from a codebase conflict audit)
- The snowman widget rule hard-requires `☃` (U+2603); type names are `[a-z-]+` (`packages/pure-markdown/src/index.ts:13`).
- A custom non-snowman token (`{{1}}`, `[[blank 1]]`) collides with no existing markdown rule — but we no longer need one.
- `___` is a *bad* marker: `_`/`__`/`___` are markdown emphasis delimiters and a lone `___` is a thematic break.
- The `Renderer` has an `inline` prop (`parseInline`) and inline widgets already render next to `$…$` TeX — the mechanism the card renderer's inline mapping relies on.
