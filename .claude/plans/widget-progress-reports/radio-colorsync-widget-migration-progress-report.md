# ColorSync Widget Migration Progress Report — radio

Widget: `radio` (`choice.module.css`, `choice-indicator.module.css`, `radio-component.module.css`)
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: found during a full sweep of every CSS file under `../../../packages/perseus/src/widgets` (plus
the shared `../../../packages/perseus/src/styles/widgets` stylesheets), requested after the `table`/
`interactive-graph`/`label-image` follow-up work. Folded into the current work stream per user
direction, no new ticket filed.

## Step 1 — Audit the Widget
The radio widget's CSS was almost entirely already tokenized from prior passes — colors, most
border-widths, `font.body.*`/`font.heading.*` sizes, and even a themed CSS custom property
(`--perseus-multiple-choice-indicator-font-size`) all already used `var(--wb-*)`. Four small gaps
remained:

- `choice.module.css`: `.choice table { border: 1px solid ...; }` — `1px` hardcoded next to an
  already-tokenized color. Exact match: `border.width.thin`.
- `choice-indicator.module.css`: `.base { outline: 0 solid ...; }` — the resting (non-hover/focus)
  outline state; `:hover`/`:focus` already toggle it to `border.width.medium` (line 46-47), so the
  `0` here is the same toggle's other state. Exact match: `border.width.none`.
- `choice-indicator.module.css`: `.base[aria-pressed="true"] { border-width: 0; }` — exact match:
  `border.width.none`.
- `radio-component.module.css`: `.instructions { font-size: 1.8rem; }` — no exact token; 18px
  sits equidistant between `font.body.size.medium` (16px) and `font.heading.size.medium` (20px).
  Unlike the numeric-input tie (resolved to body via "lean smaller"), this one has a semantic
  signal pointing the other way: `.instructions` uses `font-weight: var(--wb-font-weight-bold)`,
  matching this file's own `.rationale` vs. bold-label pattern (`.rationale` uses
  `font-weight: medium` and is body-family; bold weight elsewhere in this widget marks
  label/heading-role text). Chose `font.heading.size.medium`, overriding the default "lean
  smaller" tie-break in favor of the semantic match — flagging clearly here since it's a judgment
  call, not a mechanical pick.

### Not converted (left as-is, documented)
- `choice-indicator.module.css`: `.base:has(...) { border-radius: 100vh; }` — this file already
  carries its own explanatory comment for why 100vh is used (a robustness hack so the circular
  indicator stays a circle regardless of content size); not a magic pixel value, not touched.
- `radio-component.module.css`: `.instructions { line-height: 1.25; }` — a unitless line-height
  *ratio*, not an absolute px/rem value. No conversion rule covers unitless multipliers (they're
  a different, arguably more robust pattern than fixed-value tokens since they scale with
  font-size automatically); left unchanged.
- `font-family: inherit` (multiple places) — intentional cascade, not a hardcoded font choice.

## Step 5 — Border/Font Conversion
```diff
 .choice table {
-    border: 1px solid var(--wb-semanticColor-core-border-neutral-subtle);
+    border: var(--wb-border-width-thin) solid
+        var(--wb-semanticColor-core-border-neutral-subtle);
 }
```
```diff
-    outline: 0 solid var(--wb-semanticColor-core-background-instructive-default);
+    outline: var(--wb-border-width-none) solid
+        var(--wb-semanticColor-core-background-instructive-default);
```
```diff
-    border-width: 0;
+    border-width: var(--wb-border-width-none);
```
```diff
+    /* 18px has no exact font-size token. Sits equidistant between
+       font.body.size.medium (16px) and font.heading.size.medium (20px);
+       chose the heading token since this is bold instructional label
+       text (matching this file's .choice-text pattern), not body prose. */
-    font-size: 1.8rem;
+    font-size: var(--wb-font-heading-size-medium);
```

## Step 6 — Pre-Push Quality Checks
Ran together with the rest of this sweep's changes: full-repo `jest` run (531 suites) — 0
failures attributable to these files; `tsc --noEmit` clean. Prettier `--check` reports
pre-existing formatting warnings in `choice.module.css` and `radio-component.module.css` (unusual
`calc()`/`:has()` selector wrapping) — confirmed present on `HEAD` before any of these edits, so
left as-is rather than reformatting unrelated code in this diff.
