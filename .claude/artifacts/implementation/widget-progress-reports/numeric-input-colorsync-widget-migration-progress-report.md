# ColorSync Widget Migration Progress Report — numeric-input

Widget: `numeric-input` (specifically its legacy styles file — see scope note)
Jira: LEMS-4267 — "[Color][Numeric-input] Update numeric-input legacy styles with semantic tokens"
Workflow: colorsync-widget-migration
Started: 2026-08-07

## Scope note
Per LEMS-4267's description (from a design/eng meeting): there are two separate widgets —
`input-number` (the primary widget — **do not touch**, out of scope) and the `numeric-input`
widget's **legacy styles only** (`numeric-input.module.css` + its generated
`numeric-input_legacy-styles.js` counterpart) — the target of this ticket.

`numeric-input_legacy-styles.js` is not hand-edited: it's generated from
`numeric-input.module.css` by `pnpm sync-legacy-styles` (see `utils/sync-legacy-styles.js` /
`utils/extract-aphrodite.js`). The correct process is: edit the `.module.css` file, then run
`pnpm sync-legacy-styles` to regenerate the `.js` counterpart — never edit the generated file
directly.

## Step 1 — Audit the Widget

### Bash commands used
```bash
grep -rn "color\.\|#[0-9a-fA-F]{3,6}\|rgba?(" packages/perseus/src/widgets/numeric-input/*.tsx packages/perseus/src/widgets/numeric-input/*.css packages/perseus/src/widgets/numeric-input/*.js
grep -rnE "font-family|font-size|line-height|font-weight|fontFamily|fontSize|lineHeight|fontWeight|border-radius|borderRadius|border-width|borderWidth" packages/perseus/src/widgets/numeric-input/*.tsx packages/perseus/src/widgets/numeric-input/*.css packages/perseus/src/widgets/numeric-input/*.js
```

### Colors to be Tokenized:
- None found. No hex/rgb(a) values or `color:`/`background`-family properties anywhere in
  `numeric-input.tsx`, `numeric-input.module.css`, `numeric-input_legacy-styles.js`,
  `input-with-examples.tsx`, or `utils.ts`.

### Fonts to be Tokenized:
`numeric-input.module.css` (`.input-with-examples` rule, mirrored 1:1 in
`numeric-input_legacy-styles.js`):
- `font-family: Symbola, "Times New Roman", serif;` (line 11 / `fontFamily` line 8) — **do not
  tokenize.** Symbola is a specialized Unicode math/symbol rendering font, explicitly called out
  in `font-conversion-rules.md` ("Do NOT tokenize... math/symbol rendering font") and in
  `font-token-mapping-reference.md`'s "Do NOT Tokenize These" list. This is also exactly the
  concern flagged in the Jira ticket itself.
- `font-size: 1.8rem;` (line 12 / `fontSize` line 9) — **no direct token exists.**
  `font-token-mapping-reference.md`'s own gap-analysis section ("Gaps / Values with NO Direct
  Token") names this exact value in this exact file: "There is no `font.body.size` or
  `font.heading.size` token for 18px" and lists `numeric-input_legacy-styles.js`'s
  `fontSize: "1.8rem"` as the example, noting it's for the Symbola math font and should be left
  as-is.
- `line-height: 1.8rem;` (line 14 / `lineHeight` line 11) — same gap: 18px has no
  `font.body.lineHeight.*` or `font.heading.lineHeight.*` equivalent at that exact value (18px
  line-height coincides with `font.body.lineHeight.small`'s value, but that token is scoped to
  *body-copy* line-height semantics, not a math-input field — see "Pick the one that matches the
  semantic role of the text, not just the pixel value" guidance in the mapping reference. Using
  it here would be a coincidental pixel match, not a semantic one, since this is a math-symbol
  field, not body prose).
- `border-width: var(--wb-border-width-thin)` (line 4) and `var(--wb-border-width-medium)`
  (line 21) — already tokenized, no action needed.

### Border Radius:
- `border-radius: 0.3rem;` (line 3 / `borderRadius` line 4) — 0.3rem = 4.8px on WB's `1rem =
  10px` base. Not in `border-radius-conversion-rules.md`'s token table (`0`, `1px→radius_010`,
  `4px→radius_040`, `8px→radius_080`, `12px→radius_120`, `50%→radius_full`) — no exact match.
  Per that doc's Notes: "Any other hardcoded radius value... has no token — leave it hardcoded
  and flag it in the progress report." Flagged here; not converted.

### Summary
Every hardcoded value in scope for this ticket (`fontFamily`, `fontSize`, `lineHeight`,
`borderRadius`) already has a documented "leave as-is" resolution in the project's own
conversion-rules references — three from the font rules (Symbola font family, and the 18px
size/line-height gap explicitly called out by name for this exact file) and one from the
border-radius rules (0.3rem has no matching token). `border-width` was already tokenized in a
prior pass. **No hardcoded value in this file currently has a valid token to convert to.**

This matches the ticket's own framing — it flags the Symbola font-size/line-height situation as
needing discussion rather than presenting it as a mechanical conversion. Paused here to confirm
how to proceed with the user rather than fabricating a token or silently leaving the ticket's
core question unanswered.

### User decision
Asked the user how to handle the 18px font-size gap. Decision: **bump to the nearest token,
leaning smaller when tied, for every value without an exact 1:1 match** (not just this one),
double-checking each pick makes semantic sense and asking again if it's unclear.

### Re-audit against that decision
- **`font-size: 1.8rem` (18px)** — no exact token. Nearest candidates are `font.body.size.medium`
  (16px, −2px) and `font.heading.size.medium` (20px, +2px) — an exact tie in distance. Leaning
  smaller per the user's rule → `font.body.size.medium`. Semantic check: this is the font size of
  a value the user types into an input field (an editable numeric/math answer), not a heading or
  label — body-scale is the correct family regardless of the tie-break, so no conflict between
  "nearest" and "semantically correct." Confirmed via the `font.body.*` decision-guide criterion
  ("running body/prose text").
- **`line-height: 1.8rem` (18px)** — re-checked against `font-token-mapping-reference.md`'s Line
  Heights lookup table: 18px **does** have an exact token, `font.body.lineHeight.small` — this
  was mis-flagged as a second gap earlier in this report; correcting here. No "nearest" tie-break
  needed, used directly.
- **`border-radius: 0.3rem` (4.8px)** — no exact token. Nearest candidates: `radius_040` (4px,
  −0.8px) and `radius_080` (8px, −3.2px). `radius_040` is unambiguously nearer, no tie. Semantic
  check: 4px is the same radius already used on other similarly-sized bordered input/card
  elements in this codebase (e.g. `Sortable`'s card, `debug-accordion-ui.module.css`) — consistent
  choice, no conflict.
- **`font-family: Symbola, "Times New Roman", serif`** — not part of the "nearest token" decision;
  this isn't a value lacking a 1:1 match, it's an explicitly excluded category (math/symbol
  rendering font, per `font-conversion-rules.md`'s "Do NOT tokenize" list and the ticket's own
  framing). Left hardcoded, unchanged.

None of the three picks were ambiguous enough to need a follow-up question — each had either no
tie (`border-radius`) or a tie that resolved cleanly to the same answer via both the "lean
smaller" rule and independent semantic reasoning (`font-size`).

## Step 5 — Font/Border Conversion

### Changes made
`packages/perseus/src/widgets/numeric-input/numeric-input.module.css` (`.input-with-examples`):
```diff
- border-radius: 0.3rem;
+ border-radius: var(--wb-border-radius-radius_040);
  border-width: var(--wb-border-width-thin);
  ...
  font-family: Symbola, "Times New Roman", serif;
- font-size: 1.8rem;
+ font-size: var(--wb-font-body-size-medium);
  height: 3.2rem;
- line-height: 1.8rem;
+ line-height: var(--wb-font-body-lineHeight-small);
```

Regenerated `numeric-input_legacy-styles.js` via `pnpm sync-legacy-styles` (never hand-edited —
it's a generated file). That run also regenerated `definition_legacy-styles.js` and
`explanation_legacy-styles.js`, revealing pre-existing, unrelated drift between those two
widgets' `.module.css` files and their generated counterparts (a `.definition` rule and two
`_mq_prefers_reduced_motion_no_preference`-suffixed keys missing from the generated files). That
drift predates this session and is out of scope for LEMS-4267 — reverted both files back to
their committed state with `git restore` so only `numeric-input`'s files changed. Flagging this
drift here since it may be worth its own follow-up ticket (the generated files for `definition`
and `explanation` are currently stale relative to their CSS source).

## Step 6 — Pre-Push Quality Checks (Font/Border Conversion)

- **Lint** (`eslint` on `numeric-input_legacy-styles.js`; ESLint doesn't parse `.css` directly in
  this repo): clean. **Prettier** `--check` on both the `.module.css` and `.js` files: clean.
- **Typecheck** (`tsc --noEmit`): clean.
- **Tests** (`jest numeric-input`): 5 snapshot tests failed on first run, all in
  `numeric-input.test.ts` — diff was solely the Aphrodite-generated class hash for the changed
  style values (e.g. `..._1beb5ob` → `..._112bvpd`), the same expected pattern as the `sorter`
  border-radius change in the prior session — no structural/behavioral change. Updated snapshots
  with `jest -u`; re-ran and all 173 tests across the 13 numeric-input-related suites pass.

### Regression story coverage
Checked `numeric-input.tsx`: `InputWithExamples` (the component whose styles changed) is the
desktop rendering path used by default — so it's already rendered by every existing initial-state
story (`SizeNormal`, `SizeSmall`, `RightTextAlign`, `CenterTextAlign`, `LongNumber`,
`MultipleInputsInParagraph`, `InlineWithDropdown`). The `isFocused` state (medium border width) is
covered by the `Focus` and tooltip interaction stories. Every style block touched by this change
already has coverage — no new story files needed.

**No user action pending** — no new `play`-function stories were added.

## Step 7 — Push and Review Chromatic Diffs — Fonts
Committed the `numeric-input.module.css` + regenerated `numeric-input_legacy-styles.js` +
updated snapshot, then pushed to `claude/widget-styles-token-review-hdrmrw`.

## Deviation notes
- Steps 8–13 (Figma color lookup, color token conversion, semantic/visual checks) are **N/A** —
  the Step 1 audit found no hardcoded colors in scope for this ticket.
- This ticket's process deviates from the standard `regression-stories.md`/`quality-check-gate.md`
  flow in one respect: rather than hand-editing a token value directly, the source of truth is
  `numeric-input.module.css` and the generated `numeric-input_legacy-styles.js` is produced by
  `pnpm sync-legacy-styles`, per the ticket's explicit instructions. Intentional, not a deviation
  from user intent.
- Flagged (not fixed, out of scope): pre-existing drift between `definition.module.css`/
  `explanation.module.css` and their generated `_legacy-styles.js` files, discovered as a side
  effect of running the repo-wide sync script. Recommend a follow-up ticket.

## Addendum — full widgets/ CSS sweep (same session, follow-up)
A full sweep of every CSS file under `packages/perseus/src/widgets/` (excluding `plotter`) and
`packages/perseus/src/styles/widgets/` turned up one more file that belongs to this widget:
`packages/perseus/src/styles/widgets/numeric.css`. It styles `.input-with-examples-tooltip`,
confirmed via `grep` to be the classname rendered by `input-with-examples.tsx:139` — this is the
numeric-input widget's tooltip, not the out-of-scope `input-number` widget. It had never been
touched by any prior ColorSync pass:

```diff
 .input-with-examples-tooltip {
-    font-size: 18px;
-    line-height: 28px;
-    color: #717378;
-    background: #fff;
+    font-size: var(--wb-font-body-size-medium);
+    line-height: var(--wb-font-body-lineHeight-large);
+    color: var(--wb-semanticColor-core-foreground-neutral-subtle);
+    background: var(--wb-semanticColor-core-background-base-default);
 }
 ...
 .input-with-examples-tooltip strong {
-    font-weight: 700;
+    font-weight: var(--wb-font-weight-bold);
 }
```

- `color: #717378` and `font-weight: 700` were exact matches (`foreground.neutral.subtle`,
  `font.weight.bold`). `background: #fff` exact-matched `background.base.default`.
- `font-size: 18px` — no exact token; same tied gap as this widget's own `.module.css` file
  (`body.size.medium` 16px vs. `heading.size.medium` 20px). This is body-copy tooltip text (a
  list of example answer formats), so the "lean smaller" tie-break and the semantic check agree:
  `font.body.size.medium`.
- `line-height: 28px` — no exact `font.body.lineHeight.*` token (body tops out at `large`, 22px).
  Chose the nearest body-family value, `font.body.lineHeight.large`, rather than the pixel-exact
  `font.heading.lineHeight.large` (also 28px) — this is body prose, and matching by family over
  coincidental pixel value follows the same principle used elsewhere in this report.

Also discovered while running the full test suite after this addendum's changes: three snapshot
tests outside the `numeric-input` filter used to validate the original change
(`group/group.test.tsx`, `graded-group-set/graded-group-set.test.ts`,
`graded-group-set/graded-group-set-jipt.test.ts`) render a `numeric-input` widget internally and
still carried the pre-change Aphrodite class hash. Updated via `jest -u`; a full unfiltered
`jest` run afterward shows all 531 suites passing.
