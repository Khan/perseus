# Fill in the Blank — Content-Editor Prototype Plan

**Status:** 🟡 Draft for review · **Owner:** Sarah Third · **Epic:** [LEMS-4311](https://khanacademy.atlassian.net/browse/LEMS-4311) (Fill in the Blank)

**Companion doc:** [Drag and Drop — Fill in the Blank: Initial Work Plan](https://khanacademy.atlassian.net/wiki/spaces/~6171d6f6327da40069d145e9/pages/4839243887) (schema §11, editor §11.1). This doc supersedes the marker-string approach sketched there — see [Rejected alternatives](#9-rejected-alternatives).

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

Instead of one editable content string with embedded blank markers, **content is an ordered list of typed "cards"**: `Plain Text`, `TeX`, `Image`, and `Blank`. This is a *lite, purpose-built* WYSIWYG — not a general rich-text editor. Each card renders its own small UI; a card's settings live in a **tooltip/action menu** on the same trigger.

The editor has **three zones fed by one shared palette:**

```
┌─────────────── Content ───────────────┐   ← accepts all card types (incl. Blank)
│  [Text] [Blank] [Text] [Blank] [Text]  │
└────────────────────────────────────────┘
              ▲
┌───────────── Card Types ──────────────┐   ← the shared palette (source of new cards)
│   Plain Text   TeX   Image   Blank      │
└────────────────────────────────────────┘
              ▼
┌─────────────── Choices ───────────────┐   ← accepts all card types EXCEPT Blank
│   [Text: Pineapple] [Image] [Text: Sea] │
└────────────────────────────────────────┘
```

- A card from the palette can be placed **up into Content** or **down into Choices**.
- **`Blank` is content-only** — it has no meaning as a draggable answer, so it can't go into Choices. This is the single, intentional asymmetry.
- A `Blank` card's **Correct dropdown is auto-populated from the Choices zone** (a blank stores which choice is correct, by id).

This model unifies the UI around one primitive, mirrors the student render model (everything is a card/tile), auto-numbers blanks by document position, and — see §4 — needs essentially no parsing.

### Why this over a content string + markers

Every earlier approach tried to encode structure inside one editable markdown string. That created three problems the card model removes outright:

| Problem with a content string | Why the card model removes it |
| --- | --- |
| **Blank identity is fragile** — an id baked into editable text (`{{1}}`, `[[☃ blank 1]]`) can be duplicated, renumbered, or orphaned by hand-editing. | A blank is an **object** in a managed array. Its id lives on the object, never in editable text, so it is stable and moves with the card. **The card model is exactly what makes stable ids safe again.** |
| **TeX escaping is gibberish** — a blank inside math forces authors to terminate TeX on both sides: `$12+$ {{1}} $=16$`. | A blank is a **sibling card** between two TeX cards. It is never inside a TeX string, so there is nothing to escape or terminate. |
| **Author has to mentally map** an anonymous marker in prose to a row in a settings panel below. | The blank card **is** the settings entry point (shows its correct answer inline; its action menu holds its settings). No mapping to hunt for. |

Bonus: content reflows naturally, blanks renumber by position (nothing stored), and it seeds a reusable content-builder for the later DnD widgets (see §2.1).

### 2.1 Reuse framing — build for FITB, factor for the family

The card builder is ~90% of a general content composer, and the family (Sorter, Categorizer, Composer) will want something like it. To capture that value without scope-creep:

- **Do:** build the FITB builder as a cleanly-factored, reusable shell (card-type registry, pluggable per-card settings, the palette/zones). This is the "design for the family" the Initial Work Plan already asks for.
- **Don't:** build the actual **Composer widget's** feature set (multi-zone, arbitrary ordered insertion, per-zone capacity, displacement) now — that project hasn't defined its requirements, and it would slow the FITB feedback loop.
- **Naming:** "Composer" is a future *widget* in this family. Call the reusable editor piece something neutral (e.g. `ContentBuilder`) to avoid collision.

---

## 3. Data schema

Content stops being a `string`. Both zones hold **cards**; a **choice is simply any non-blank card**, so the two zones share one card type. Every card carries a stable, editor-generated `id` (safe because it lives on the object, never in editable text).

```ts
// ── perseus-core/src/data-schema.ts ──────────────────────────────
export type PerseusFillInTheBlankWidgetOptions = {
    // CONTENT zone — ordered cards; may include blanks.
    cards: ReadonlyArray<FITBCard>;

    // CHOICES zone — the answer bank. Same cards as content, minus Blank.
    choices: ReadonlyArray<FITBChoiceCard>;

    // Tile reuse policy.
    tileUsage: "single" | "multi";
    maxUsesPerTile?: number; // multi only; omit = unlimited

    // ONE image height for the whole set (Overview's 7 presets). Width scales from it.
    imageHeight?: 24 | 36 | 48 | 60 | 72 | 84 | 96;
};

// The non-blank card types — usable in EITHER zone.
export type FITBTextCard  = {type: "text";  id: string; content: string};   // markdown/plain-text run
export type FITBTexCard   = {type: "tex";   id: string; tex: string};        // raw TeX; rendered in preview, no escaping
export type FITBImageCard = {type: "image"; id: string; url: string; alt: string; longDescription: string};

// Content-only card.
export type FITBBlankCard = {
    type: "blank";
    id: string;                                        // stable, editor-generated; NOT in editable text
    correct: string;                                   // choiceId (stripped from public options)
    displayType: "normal" | "superscript" | "subscript";
    ariaLabel?: string;                                // custom SR label; defaults to "Blank N" (by doc order)
};

export type FITBChoiceCard = FITBTextCard | FITBTexCard | FITBImageCard;      // choices zone (no Blank)
export type FITBCard       = FITBChoiceCard | FITBBlankCard;                  // content zone (all types)
```

Notes:
- **A choice IS a non-blank card.** The unified palette falls straight out of the schema: placing a card up creates a `FITBCard` in `cards`; placing it down creates a `FITBChoiceCard` in `choices`; `Blank` is simply absent from `FITBChoiceCard`.
- **Blank ids are safe here.** Generated on card creation, carried on the object, never hand-typed — this is the whole point of the pivot.
- **Correct answer references a choice by id.** `blank.correct` = a `choices[].id`; the action-menu Correct dropdown lists the current choices. Deleting/removing a choice a blank points at clears/prunes that reference (label-image already does this for markers).
- **`displayType` on the blank** (normal / super / subscript) — declared by the author; can't be reliably inferred from plaintext-TeX/mixed content. Editor captures intent; render positioning is a later concern.
- **Image cards and image choices** both carry `alt` + `longDescription` (the long description was missing from §11 and is required for SR support).
- **Blanks auto-number by position** — "Blank N" is the ordinal among blank cards in document order, recomputed on render. Nothing stored, nothing to sync.
- **Public options / scoring** (out of scope for the prototype, noted for completeness): strip `blank.correct` in `getPublicWidgetOptions`; userInput maps `blankId → placed choiceId | null`; score per blank.

---

## 4. Feasibility

### Editor UI — feasible now (minus drag)
The builder decomposes into standard Perseus/Wonder Blocks pieces:
- **Shared `Card Types` palette** — Plain Text / TeX / Image / Blank; places a card of that type into a zone.
- **`Content` zone** — renders `cards` as inline, reflowing card chips; accepts all types.
- **`Choices` zone** — renders `choices` as card chips; accepts all types except Blank.
- **Per-card editing** — Text/TeX cards are edited **directly in place** (typing into a narrow action-menu tooltip would be too cramped); Blank and Image cards use the **action menu** for their settings (Blank: Correct dropdown, Display Type, Alt Text, Remove; Image: URL, Description, Alt Text, Remove).

**Placement without drag (first-class requirement — see §4.1).** Reordering and cross-zone placement via drag needs dnd-kit (unapproved) and must have a keyboard/SR equivalent regardless (a11y-first family). For the Perseus prototype we ship the **non-drag** path — "Add to Content" / "Add to Choices" from the palette (Blank offers only "Add to Content"), plus per-card move/remove actions — which fully exercises the model. The drag layer is prototyped in the external repo alongside the student side and ported once dnd-kit (leading candidate: `core`) is approved.

### Data schema — feasible, and cleaner
One card union, two zones, stable ids on objects. No new markdown syntax, no widget-registry entry for "blank," no palette pollution. The unified-palette UI requires **no schema change** beyond what's above.

### Parsing / render — feasible, and *simpler than the string approach*
**There is essentially no parsing.** Content is already structured JSON. Render is a `.map` over `cards`: `text`→inline markdown, `tex`→rendered TeX, `image`→`<img>`, `blank`→the `Blank` component. No marker regex, no markdown-rule change, no TeX-escape collisions.

### 4.1 Accessibility & the no-drag path
The DnD family is a11y-first: movement must work for keyboard/SR users without drag. That makes the **add-to-zone / move-card menu actions a requirement, not a fallback** — and conveniently it is exactly how we demo the model in Perseus before dnd-kit lands. Type restrictions must be conveyed accessibly too (a Blank offers no "Add to Choices" action; dragging a Blank over Choices shows no drop target).

### Caveats to record (not blockers)
- **Long text in a card** — see §6.
- **i18n extraction.** Perseus generally extracts translatable strings from a markdown content string. FITB's translatable strings live in structured fields (`text.content`, `image.alt`/`longDescription`, `choice.*`, `blank.ariaLabel`). Nested-translatable options have precedent (radio choices, label-image alt), but the extraction pipeline must reach these fields. **Verify before productionizing; irrelevant to the prototype.**
- **Tooling that assumes a content string** (linter, some traversal) — FITB opts out by owning structured content, similar to container widgets. Acceptable; note it.
- **dnd-kit** unapproved → drag interaction lives in the external prototype for now.

---

## 5. Editor UI breakdown (build references)

| Piece | Model it on | Notes |
| --- | --- | --- |
| Content & Choices zones (card lists) | interactive-graph `LockedFiguresSection` | Ordered lists; non-drag reorder for now; each card is a chip. |
| Shared Card Types palette | label-image `AnswerChoices` add row / a small button group | Places a card of the chosen type into a zone (Add to Content / Add to Choices). |
| Blank card action menu | interactive-graph locked-figure settings + WB `Popover`/`Dropdown` | Correct (choice dropdown) · Display Type (segmented/select) · Alt Text (field, with Auto-generate) · Remove. |
| Image card action menu | label-image structured image editing (`ImagePreview`) | URL · Description (long) · Alt Text · Remove. Global `imageHeight` governs size. |
| Text / TeX card editors | `form-wrapped-text-field` / inline textarea | Edited in place; TeX stores raw TeX, rendered in preview. See §6 for overflow. |
| Live preview | `<Renderer inline>` / direct card→node mapping | Shows rendered TeX/images + boxed blanks. |

---

## 6. UI constraint — long text in a card

A long Text/TeX run before the next card needs an overflow story; the card can't just grow without hurting the canvas rhythm and drag ergonomics.

- **dnd-kit supports variable-size items**, so this is a UX constraint, not a hard technical limit.
- **Recommended:** clamp an idle card to a short preview (2–3 lines) and **expand into a full editor on focus** — tidy arranged view, comfortable editing.
- **Avoid** scaling text down (WCAG resize/readability; inconsistent canvas). Internal scroll is a weaker fallback.
- Splitting a long run into multiple Text cards is allowed but not required.

---

## 7. Minimal wiring (files)

- `perseus-core/src/data-schema.ts` — add the types above; register `"fill-in-the-blank"`; `defaultWidgetOptions`.
- `perseus/src/widgets/fill-in-the-blank/` — placeholder renderer (maps `cards` → inline nodes, static boxes for blanks) + `WidgetExports`; register in `widgets.ts`.
- `perseus-editor/src/widgets/fill-in-the-blank-editor/` — the builder + subcomponents (`card-types-palette`, `content-zone`, `choices-zone`, `card-editors/*`, `blank-action-menu`, `image-action-menu`, `global-settings`). Register in `all-editors.ts`. Factor the palette/zones as a reusable shell (§2.1).
- `perseus-editor/src/widgets/__docs__/…stories.tsx` — one story with a prose example (SpongeBob/drum) and an equation example (the chemical one) to demo both modes.
- Score/validation: **stubbed or omitted.**

---

## 8. Sequencing

1. Schema types + defaults + placeholder renderer registered (thin slice that renders in Storybook).
2. Card Types palette + Content zone + Choices zone + add-to-zone/move/remove (non-drag) + live preview — **the novel core; prove it first.**
3. Card editors: Text/TeX (in-place, with clamp+expand), then Image (URL + alt + longDescription).
4. Blank card action menu (Correct dropdown from choices + Display Type + Alt).
5. Global settings (reuse, image height).
6. Story polish for the demo.

---

## 9. Open questions

- **Palette stamps new cards vs. moving existing ones.** Prototype scope: palette → zone *creates* a card. Dragging an *existing* card between zones (e.g. promote a content Text card into a choice) is a nice-to-have deferred to avoid "same card in two places" ambiguity.
- **Correct-dropdown disambiguation** when two choices share display text (safe by id; may want a visual hint).
- **Insert-at-position UX** without drag — click-to-insert between cards vs. add-at-end-then-move. Prototype can start with add-at-end + move.
- **i18n extraction** from structured content — confirm the pipeline reaches nested fields (productionization, not prototype).
- **dnd-kit** approval + the drag/cross-zone placement layer (external prototype).

*(Resolved: **where choices come from** — authored explicitly in the Choices zone via the shared palette; distractors are choices no blank references. See §2 / §3.)*

---

## 10. Rejected alternatives

- **Content string + numbered marker `{{N}}`** — blank identity baked into editable text is fragile (duplicate/renumber/orphan on hand-edit); still forces TeX-escaping gibberish for math blanks. Rejected once the card model showed it removes both.
- **Content string + `[[☃ blank N]]` as a hidden registered widget** (`hidden: true` keeps it out of the "Add a widget" palette — mechanism confirmed at `packages/perseus/src/types.ts:415` / `widgets.ts:133`). Technically works, but makes blanks *nested widgets riding a widgets map*, contradicting "blanks are FITB components, not widgets," and keeps the fragile-marker + TeX-escape problems.
- **Full WYSIWYG rich-text editor** (ProseMirror / Lexical / TipTap) — would mean rethinking KA's "author markdown/TeX as source" standard; TeX-in-rich-text + inline images are the hard parts (custom node views, MathJax, serialization). The card builder gets ~90% of the WYSIWYG feel at a fraction of the lift and doesn't change how TeX is authored. Recorded as considered; revisit only if the card model proves too clunky for prose.

### Markdown / syntax facts that informed the above (from a codebase conflict audit)
- The snowman widget rule hard-requires `☃` (U+2603); type names are `[a-z-]+` (`packages/pure-markdown/src/index.ts:13`).
- A custom non-snowman token (`{{1}}`, `[[blank 1]]`) collides with no existing markdown rule — but we no longer need one.
- `___` is a *bad* marker: `_`/`__`/`___` are markdown emphasis delimiters and a lone `___` is a thematic break.
- The `Renderer` has an `inline` prop (`parseInline`) and inline widgets already render next to `$…$` TeX — the mechanism the card renderer's inline mapping relies on.
