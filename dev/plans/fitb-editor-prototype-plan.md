# Fill in the Blank — Content-Editor Prototype Plan

**Status:** 🟡 Draft for review · **Owner:** Sarah Third · **Epic:** [LEMS-4311](https://khanacademy.atlassian.net/browse/LEMS-4311) (Fill in the Blank)

**Companion doc:** [Drag and Drop — Fill in the Blank: Initial Work Plan](https://khanacademy.atlassian.net/wiki/spaces/~6171d6f6327da40069d145e9/pages/4839243887) (schema §11, editor §11.1). This doc supersedes the marker-string approach sketched there — see [Rejected alternatives](#11-rejected-alternatives).

---

## 1. Goal & scope

Prototype the **content-editor (authoring) experience** for the new Fill in the Blank (FITB) widget — the part the team judges hardest to get right and for which we have no designs. The deliverable is a demo-able editor for content-creator feedback and an engineering feasibility read.

**In scope**
- The FITB editor UI in `perseus-editor`.
- Enough of the widget to render a live preview and appear in Storybook.

**Explicitly out of scope (throwaway / stubbed)**
- Real drag-and-drop on the student side (a separate prototype repo owns that; needs dnd-kit, not yet security-approved — **do not install**).
- Full scoring, validation, i18n extraction, RTL, mobile hardening.
- Exact sub/superscript render positioning (editor captures author *intent*; render just shows a box).

---

## 2. Chosen direction — a lite, card-based content builder

Instead of one editable content string with embedded blank markers, **content is an ordered list of typed *segments***: `markdown`, `image`, and `blank`. This is a *lite, purpose-built* WYSIWYG — not a general rich-text editor.

**Why `markdown` and not separate text/TeX:** MathJax renders through the same markdown pipeline, so a single markdown segment (rendered via the inline parser) already handles plain text, inline `$…$` TeX, and inline formatting (bold/italic/links) — no separate TeX rendering path and one fewer segment type. Authors type `$…$` themselves (the existing KA convention everywhere else). We deliberately do **not** add custom rules to restrict markdown (brittle); block-level markdown (lists, headings, multi-paragraph) simply won't render as blocks in the inline context — authors put that kind of content in the normal content areas around the widget.

**"Card" vs "segment":** the stored data is a list of **segments**. A **card** is just the *editor's on-screen rendering* of a segment (border, grip, label, action menu). The student never sees cards — the same segments render as one flowing piece of content with only the blanks styled specially. Same data, two renderers.

The editor has **three zones fed by one shared palette:**

```
┌──────────────────── Content ───────────────────┐   ← accepts all segment types (incl. Blank)
│  [Markdown] [Blank] [Markdown] [Blank] [Markdown]│
└──────────────────────────────────────────────────┘
              ▲
┌────────────────── Card Types ──────────────────┐   ← the shared palette (source of new segments)
│        Markdown        Image        Blank        │
└──────────────────────────────────────────────────┘
              ▼
┌──────────────────── Choices ───────────────────┐   ← accepts all segment types EXCEPT Blank
│   [Markdown: Pineapple]  [Image]  [Markdown: Sea]│
└──────────────────────────────────────────────────┘
```

- A segment from the palette can be placed **up into Content** or **down into Choices**.
- **`Blank` is content-only** — it has no meaning as a draggable answer, so it can't go into Choices. This is the single, intentional asymmetry.
- A `Blank`'s **Correct dropdown is auto-populated from the Choices zone** (a blank stores which choice is correct, by id).

This unifies the UI around one primitive, mirrors the student render model (everything is a tile), auto-numbers blanks by document position, and — see §4 — needs essentially no parsing.

### Why this over a content string + markers

Every earlier approach tried to encode structure inside one editable markdown string. That created three problems the segment model removes outright:

| Problem with a content string | Why the segment model removes it |
| --- | --- |
| **Blank identity is fragile** — an id baked into editable text (`{{1}}`, `[[☃ blank 1]]`) can be duplicated, renumbered, or orphaned by hand-editing. | A blank is an **object** in a managed array. Its id lives on the object, never in editable text, so it is stable and moves with the segment. **This is exactly what makes stable ids safe again.** |
| **TeX escaping is gibberish** — a blank inside math forces authors to terminate TeX on both sides: `$12+$ {{1}} $=16$`. | A blank is a **sibling segment** between two markdown segments (each holding its own TeX). It is never inside a TeX string, so there is nothing to escape or terminate. |
| **Author has to mentally map** an anonymous marker in prose to a row in a settings panel below. | The blank **is** the settings entry point (shows its correct answer inline; its action menu holds its settings). No mapping to hunt for. |

Bonus: content reflows naturally, blanks renumber by position (nothing stored), round-trips with no parsing (§5), and it seeds a reusable content-builder for the later DnD widgets (§2.1).

### 2.1 Reuse framing — build for FITB, factor for the family

The builder is ~90% of a general content composer, and the family (Sorter, Categorizer, Composer) will want something like it. To capture that without scope-creep:

- **Do:** build the FITB builder as a cleanly-factored, reusable shell (segment-type registry, pluggable per-segment settings, the palette/zones). This is the "design for the family" the Initial Work Plan already asks for.
- **Don't:** build the actual **Composer widget's** feature set (multi-zone, arbitrary ordered insertion, per-zone capacity, displacement) now — that project hasn't defined its requirements, and it would slow the FITB feedback loop.
- **Naming:** "Composer" is a future *widget* in this family. Call the reusable editor piece something neutral (e.g. `ContentBuilder`) to avoid collision.

---

## 3. Data schema

Content stops being a `string`. Both zones hold **segments**; a **choice is simply any non-blank segment**, so the two zones share one segment type. Every segment carries a stable, editor-generated `id` (safe because it lives on the object, never in editable text). A blank carries its own `correct` answer, **nested in `content`** — the same shape radio/dropdown use (see §5).

```ts
// ── perseus-core/src/data-schema.ts ──────────────────────────────

// The whole widget, in the standard WidgetOptions envelope.
export type FillInTheBlankWidget = WidgetOptions<
    "fill-in-the-blank",
    PerseusFillInTheBlankWidgetOptions
>;

export type PerseusFillInTheBlankWidgetOptions = {
    // CONTENT zone — ordered segments; may include blanks. Rendered as cards in
    // the editor, as one flowing piece of content for the student.
    content: ReadonlyArray<FITBSegment>;

    // CHOICES zone — the answer bank. Same segments as content, minus Blank.
    choices: ReadonlyArray<FITBChoiceSegment>;

    // Tile reuse policy.
    tileUsage: "single" | "multi";
    maxUsesPerTile?: number; // multi only; omit = unlimited

    // ONE image height for the whole set (Overview's 7 presets). Width scales from it.
    imageHeight?: 24 | 36 | 48 | 60 | 72 | 84 | 96;

    // Shuffle the choice bank on render (radio-style).
    randomizeChoices?: boolean;
};

// Non-blank segment types — usable in EITHER zone.
// One markdown segment covers plain text, inline TeX ($…$), and inline formatting
// (rendered via the inline markdown pipeline, which includes MathJax).
export type FITBMarkdownSegment = {type: "markdown"; id: string; markdown: string};
export type FITBImageSegment    = {type: "image"; id: string; url: string; alt: string; longDescription: string};

// Content-only segment. `correct` is the answer; STRIPPED for the client.
export type FITBBlankSegment = {
    type: "blank";
    id: string;                                        // stable, editor-generated; NOT in editable text
    displayType: "normal" | "superscript" | "subscript";
    correct: string | null;                            // choiceId, or null when unassigned
    ariaLabel?: string;                                // custom SR label; defaults to "Blank N" (by doc order)
};

export type FITBChoiceSegment = FITBMarkdownSegment | FITBImageSegment;  // choices zone (no Blank)
export type FITBSegment       = FITBChoiceSegment | FITBBlankSegment;    // content zone (all types)
```

Notes:
- **A choice IS a non-blank segment.** The unified palette falls straight out of the schema: placing a segment up creates a `FITBSegment` in `content`; placing it down creates a `FITBChoiceSegment` in `choices`; `Blank` is simply absent from `FITBChoiceSegment`.
- **One `markdown` segment, not separate text/TeX.** MathJax comes through the same markdown pipeline, so a markdown segment handles text + inline TeX + formatting via the inline parser (§2). No custom rules; block-level markdown belongs outside the widget.
- **Blank ids are safe here.** Generated on segment creation (via `crypto.randomUUID()`, the same approach radio uses — `radio/editor.tsx:250`), carried on the object, never hand-typed. Ids must be unique across the whole widget (content + choices), since `correct` references a choice id.
- **`correct` is `string | null`** — `null` is the explicit "unassigned" state (no quiet default), flagged by a linter rule (§5.1). It references a choice by id (`choices[].id`); the action-menu Correct dropdown lists the current choices and **greys out unavailable ones** (label-image style — e.g. under `single-use`, a choice already used as another blank's answer), which prevents authoring an unsolvable question. Deleting a referenced choice clears/prunes that reference.
- **`displayType`** (normal / super / subscript) is declared by the author — it can't be reliably inferred from plaintext-TeX/mixed content. Editor captures intent; render positioning is a later concern.
- **Image segments and image choices** both carry `alt` + `longDescription` (the long description was missing from §11 and is required for SR support).
- **Blanks auto-number by position** — "Blank N" is the ordinal among blank segments in document order, recomputed on render. Nothing stored.

---

## 4. Feasibility

### Editor UI — feasible now (minus drag)
The builder decomposes into standard Perseus/Wonder Blocks pieces:
- **Shared `Card Types` palette** — Markdown / Image / Blank; places a segment of that type into a zone.
- **`Content` zone** — renders `content` as inline, reflowing cards; accepts all types.
- **`Choices` zone** — renders `choices` as cards; accepts all types except Blank.
- **Per-segment editing** — Markdown segments are edited **directly in place** (typing into a narrow action-menu tooltip would be too cramped); Blank and Image segments use the **action menu** for their settings (Blank: Correct dropdown, Display Type, Alt Text, Remove; Image: URL, Description, Alt Text, Remove).

**Placement without drag (first-class requirement — see §4.1).** Reordering and cross-zone placement via drag needs dnd-kit (unapproved) and must have a keyboard/SR equivalent regardless. For the Perseus prototype we ship the **non-drag** path — "Add to Content" / "Add to Choices" from the palette (Blank offers only "Add to Content"), plus per-segment move/remove actions — which fully exercises the model. The drag layer is prototyped in the external repo alongside the student side and ported once dnd-kit (leading candidate: `core`) is approved.

### Data schema — feasible, and cleaner
One segment union, two zones, stable ids on objects. No new markdown syntax, no widget-registry entry for "blank," no palette pollution. The unified-palette UI requires **no schema change** beyond §3.

### Parsing / render — feasible, and *simpler than the string approach*
**There is essentially no parsing** of a content string. Render is a `.map` over `content`: `markdown`→**inline markdown pipeline** (`PerseusMarkdown.parseInline` → React output; keeps bold/italic/links/inline `$…$` TeX/MathJax for free — the "we don't lose automatic markdown rendering" concern), `image`→Perseus's image component (keeps web+graphie handling, not a bare `<img>`), `blank`→the `Blank` component. No marker regex, no markdown-rule change, no TeX-escape collisions. Limitation: markdown can't span segment boundaries, and block-level markdown isn't available inline (§2) — both fine for a fill-in-the-blank sentence/equation.

### 4.1 Accessibility & the no-drag path
The DnD family is a11y-first: movement must work for keyboard/SR users without drag. That makes the **add-to-zone / move-segment menu actions a requirement, not a fallback** — and conveniently it is exactly how we demo the model in Perseus before dnd-kit lands. Type restrictions must be conveyed accessibly too (a Blank offers no "Add to Choices" action; dragging a Blank over Choices shows no drop target).

### Caveats to record (not blockers)
- **Long text in a card** — see §7.
- **i18n / translation.** FITB translation is **hand work in any representation** — languages differ in word order, so blanks *relocate* (e.g. "the `[red]` car" → "la voiture `[rouge]`"; "have `[fun]`" → "veulent juste `[s'amuser]`"). That's inherent, not a cost of this schema. The real open question is *tooling*: KA's pipeline must (a) reach the nested translatable fields (`markdown.markdown`, `image.alt`/`longDescription`, `blank.ariaLabel`), and (b) let translators **reorder/restructure the segments** per locale, not just translate strings in place — because a blank moving position means reordering the segment array. Upside of this model: because blanks reference choices by **stable id**, the Blank→correct-choice mapping survives reordering intact (a marker-in-string can break it when the marker moves). **Confirm the pipeline supports per-locale structural edits; not a prototype blocker.**
- **Tooling that assumes a content string** (linter, some traversal) — FITB opts out by owning structured content, similar to container widgets. Acceptable; note it.
- **dnd-kit** unapproved → drag interaction lives in the external prototype for now.

---

## 5. Serialization, answerful/answerless & scoring

**One canonical schema, not three.** The editor edits `PerseusFillInTheBlankWidgetOptions`, the renderer renders it, and the only transform is stripping the answer key. There is no separate "editor format vs. student format."

- **Round-trip is free.** The saved JSON is exactly what the editor produced, so loading needs **no parsing** (unlike a marker-string, which would need a lossy serialize→string / parse→string round-trip). Editor state = saved = render input.
- **Answerful vs. answerless (a core Perseus safety property).** Answerful options (with each blank's `correct`) stay server-side and are the rubric the `perseus-score` functions run against. The **answerless** options — produced by `getFillInTheBlankPublicWidgetOptions` — are what's serialized to the student's browser. This mirrors how the whole platform keeps answers off the client; scoring runs server-side (in webapp/frontend).
- **Stripping follows the radio/dropdown pattern — nested is fine, and use an allowlist.** Radio (`radio-util.ts:32–76`) and dropdown (`dropdown-util.ts:19–29`) both carry `correct` **nested on each choice** and strip it with a `.map()` that `Pick`s only the safe fields — an *allowlist*, so a future secret field is excluded by default. FITB does the same over its (heterogeneous) `content` array:

```ts
// ── perseus-core/src/widgets/fill-in-the-blank/fill-in-the-blank-util.ts ──
function getBlankPublicData(b: FITBBlankSegment) {
    const {type, id, displayType, ariaLabel} = b;   // allowlist — `correct` is never copied
    return {type, id, displayType, ariaLabel};
}

export function getFillInTheBlankPublicWidgetOptions(
    options: PerseusFillInTheBlankWidgetOptions,
): FillInTheBlankPublicWidgetOptions {
    return {
        ...options,
        content: options.content.map((seg) =>
            seg.type === "blank" ? getBlankPublicData(seg) : seg,  // markdown/image have no secrets → pass through
        ),
        // choices are NOT stripped — students must see the full bank to pick from it.
    };
}
```

- **Choices are fully public.** The secret is only *which choice is correct per blank*; the bank itself must reach the student.
- **userInput runs parallel** to the blanks: `{blanks: [{id, tileId | null}]}` (same idea as label-image's `{markers: […]}`). Bank contents are derived (choices minus placed, respecting multi-use counts).
- **Scoring** reads the answerful blanks (a small `getBlanks(content)` filter), and for each blank compares its parallel userInput `tileId` against `correct` by id. Multi-use tiles don't complicate it (each blank scores independently). **Partial vs. all-or-nothing** is a scoring *policy* layered on top — flag as a design decision, not a schema question.
- **Shared source of truth.** Define this schema once in `perseus-core`'s data-schema; both this editor prototype and the student prototype target it, so content authored in one loads in the other.

**Whitespace convention.** Since the student flows adjacent segments together, inter-segment spacing lives **inside the markdown segments** (a segment is `"The "` with a trailing space; a period segment is `". "` with no leading space). The renderer just concatenates. This is consistent with the trailing-space quirks authors already manage in today's content renderers. See the worked example in [Appendix A](#appendix-a--worked-example).

### 5.1 Validation (linter rules)

Perseus has a linter system (`perseus-linter`, `all-rules.ts`), so authoring validation is a set of rules rather than bespoke save-warning code:

- **Required:** a blank with `correct: null` (unassigned); no blanks at all; no choices; an image segment/choice with no URL.
- **Solvability:** under `single-use`, two blanks sharing the same `correct` choice (unsolvable — also prevented in the UI by greying out used choices in the Correct dropdown).
- **Optional:** duplicate-content choices (usually the author's call — repeated values should be one multi-use choice instead; a rule is nice-to-have, not required).

---

## 6. Editor UI breakdown (build references)

| Piece | Model it on | Notes |
| --- | --- | --- |
| Content & Choices zones (segment lists) | interactive-graph `LockedFiguresSection` | Ordered lists; non-drag reorder for now; each segment renders as a card. |
| Shared Card Types palette | label-image `AnswerChoices` add row / a small button group | Places a segment of the chosen type into a zone (Add to Content / Add to Choices). |
| Blank action menu | interactive-graph locked-figure settings + WB `Popover`/`Dropdown` | Correct (choice dropdown, **greys out unavailable choices** label-image style) · Display Type (segmented/select) · Alt Text (field, with Auto-generate) · Remove. |
| Image action menu | label-image structured image editing (`ImagePreview`) | URL · Description (long) · Alt Text · Remove. Global `imageHeight` governs size. |
| Markdown segment editor | `form-wrapped-text-field` / inline textarea | Edited in place; holds text + inline `$…$` TeX + formatting, rendered via the inline markdown pipeline in the preview. See §7 for overflow. |
| Live preview | direct segment→node mapping (inline) | Shows rendered TeX/images + boxed blanks. |

---

## 7. UI constraint — long text in a card

A long Text/TeX run before the next segment needs an overflow story; the card can't just grow without hurting the canvas rhythm and drag ergonomics.

- **dnd-kit supports variable-size items**, so this is a UX constraint, not a hard technical limit.
- **Recommended:** clamp an idle card to a short preview (2–3 lines) and **expand into a full editor on focus** — tidy arranged view, comfortable editing.
- **Avoid** scaling text down (WCAG resize/readability; inconsistent canvas). Internal scroll is a weaker fallback.
- Splitting a long run into multiple Text segments is allowed but not required.

---

## 8. Minimal wiring (files)

- `perseus-core/src/data-schema.ts` — add the types in §3; register `"fill-in-the-blank"`; `defaultWidgetOptions`.
- `perseus-core/src/widgets/fill-in-the-blank/fill-in-the-blank-util.ts` — `getFillInTheBlankPublicWidgetOptions` (§5) + a `getBlanks(content)` helper.
- `perseus/src/widgets/fill-in-the-blank/` — placeholder renderer (maps `content` → inline nodes, static boxes for blanks) + `WidgetExports`; register in `widgets.ts`.
- `perseus-editor/src/widgets/fill-in-the-blank-editor/` — the builder + subcomponents (`card-types-palette`, `content-zone`, `choices-zone`, `segment-editors/*`, `blank-action-menu`, `image-action-menu`, `global-settings`). Register in `all-editors.ts`. Factor the palette/zones as a reusable shell (§2.1).
- `perseus-editor/src/widgets/__docs__/…stories.tsx` — one story with a prose example (SpongeBob) and an equation example (the chemical one) to demo both modes.
- Full score/validation: **stubbed or omitted** for the prototype.

---

## 9. Sequencing

1. Schema types + defaults + placeholder renderer registered (thin slice that renders in Storybook).
2. Card Types palette + Content zone + Choices zone + add-to-zone/move/remove (non-drag) + live preview — **the novel core; prove it first.**
3. Segment editors: Text/TeX (in-place, with clamp+expand), then Image (URL + alt + longDescription).
4. Blank action menu (Correct dropdown from choices + Display Type + Alt).
5. Global settings (reuse, image height).
6. Story polish for the demo.

---

## 10. Open questions

- **Palette stamps new segments vs. moving existing ones.** Prototype scope: palette → zone *creates* a segment. Dragging an *existing* segment between zones (e.g. promote a content Text segment into a choice) is a nice-to-have deferred to avoid "same segment in two places" ambiguity.
- **Correct-dropdown disambiguation** when two choices share display text (safe by id; may want a visual hint).
- **Partial credit vs. all-or-nothing** scoring policy (§5) — a scoring decision, not a schema one.
- **Insert-at-position UX** without drag — click-to-insert between segments vs. add-at-end-then-move. Prototype can start with add-at-end + move.
- **i18n extraction** from structured content — confirm the pipeline reaches nested fields (productionization, not prototype).
- **dnd-kit** approval + the drag/cross-zone placement layer (external prototype).

*(Resolved: **where choices come from** — authored in the Choices zone via the shared palette; distractors are choices no blank references. **Blank storage** — nested in `content`, radio/dropdown-style, stripped via allowlist. See §2 / §3 / §5.)*

---

## 11. Rejected alternatives

- **Content string + numbered marker `{{N}}`** — blank identity baked into editable text is fragile (duplicate/renumber/orphan on hand-edit); still forces TeX-escaping gibberish for math blanks. Rejected once the segment model showed it removes both.
- **Content string + `[[☃ blank N]]` as a hidden registered widget** (`hidden: true` keeps it out of the "Add a widget" palette — mechanism confirmed at `packages/perseus/src/types.ts:415` / `widgets.ts:133`). Technically works, but makes blanks *nested widgets riding a widgets map*, contradicting "blanks are FITB components, not widgets," and keeps the fragile-marker + TeX-escape problems.
- **Top-level `blanks[]` array (separate from content)** — considered for an "answer-free content by construction" guarantee, but radio/dropdown prove that stripping a `correct` field **nested** in a list is clean and idiomatic (allowlist `.map`), so the isolation buys little and adds a content↔blanks sync. Went with nested (§5).
- **Full WYSIWYG rich-text editor** (ProseMirror / Lexical / TipTap) — would mean rethinking KA's "author markdown/TeX as source" standard; TeX-in-rich-text + inline images are the hard parts (custom node views, MathJax, serialization). The segment builder gets ~90% of the WYSIWYG feel at a fraction of the lift and doesn't change how TeX is authored. Recorded as considered; revisit only if the segment model proves too clunky for prose.

### Markdown / syntax facts that informed the above (from a codebase conflict audit)
- The snowman widget rule hard-requires `☃` (U+2603); type names are `[a-z-]+` (`packages/pure-markdown/src/index.ts:13`).
- A custom non-snowman token (`{{1}}`, `[[blank 1]]`) collides with no existing markdown rule — but we no longer need one.
- `___` is a *bad* marker: `_`/`__`/`___` are markdown emphasis delimiters and a lone `___` is a thematic break.
- The `Renderer` has an `inline` prop (`parseInline`) and inline widgets already render next to `$…$` TeX — the mechanism the segment renderer's inline mapping relies on.

---

## Appendix A — worked example

Sarah's sample question: *"My name is Spongebob and I live in a `[Pineapple]` under the `[Sea]`. `[🍍house image]`"* — three markdown segments, three blanks, and a choice bank of two markdown (text) choices + one image (Spongebob's pineapple house). Blank 1 → `Pineapple`, Blank 2 → `Sea`, Blank 3 → the house image.

### A.1 Answerful — full widget, as stored/edited

```json
{
  "content": "[[☃ fill-in-the-blank 1]]\n\n",
  "images": {},
  "widgets": {
    "fill-in-the-blank 1": {
      "type": "fill-in-the-blank",
      "alignment": "default",
      "static": false,
      "graded": true,
      "version": { "major": 0, "minor": 0 },
      "options": {
        "content": [
          { "type": "markdown", "id": "seg-1",   "markdown": "My name is Spongebob and I live in a " },
          { "type": "blank",    "id": "blank-1", "displayType": "normal", "correct": "choice-pineapple" },
          { "type": "markdown", "id": "seg-2",   "markdown": " under the " },
          { "type": "blank",    "id": "blank-2", "displayType": "normal", "correct": "choice-sea" },
          { "type": "markdown", "id": "seg-3",   "markdown": ". " },
          { "type": "blank",    "id": "blank-3", "displayType": "normal", "correct": "choice-house" }
        ],
        "choices": [
          { "type": "markdown", "id": "choice-pineapple", "markdown": "Pineapple" },
          { "type": "markdown", "id": "choice-sea",       "markdown": "Sea" },
          { "type": "image", "id": "choice-house",
            "url": "https://cdn.kastatic.org/images/spongebob-house.png",
            "alt": "Spongebob's pineapple house",
            "longDescription": "A pineapple with carved windows and a round door, resting on the ocean floor." }
        ],
        "tileUsage": "single",
        "imageHeight": 48,
        "randomizeChoices": true
      }
    }
  }
}
```

### A.2 Answerless — `options` sent to the client

Only each blank's `correct` is removed; choices are untouched.

```json
{
  "content": [
    { "type": "markdown", "id": "seg-1",   "markdown": "My name is Spongebob and I live in a " },
    { "type": "blank",    "id": "blank-1", "displayType": "normal" },
    { "type": "markdown", "id": "seg-2",   "markdown": " under the " },
    { "type": "blank",    "id": "blank-2", "displayType": "normal" },
    { "type": "markdown", "id": "seg-3",   "markdown": ". " },
    { "type": "blank",    "id": "blank-3", "displayType": "normal" }
  ],
  "choices": [
    { "type": "markdown", "id": "choice-pineapple", "markdown": "Pineapple" },
    { "type": "markdown", "id": "choice-sea",       "markdown": "Sea" },
    { "type": "image", "id": "choice-house", "url": "…", "alt": "…", "longDescription": "…" }
  ],
  "tileUsage": "single",
  "imageHeight": 48,
  "randomizeChoices": true
}
```

### A.3 Sample userInput (Pineapple + house placed, Blank 2 left empty)

```json
{
  "blanks": [
    { "id": "blank-1", "tileId": "choice-pineapple" },
    { "id": "blank-2", "tileId": null },
    { "id": "blank-3", "tileId": "choice-house" }
  ]
}
```

Scoring: Blank 1 ✓, Blank 2 ✗ (empty), Blank 3 ✓.
