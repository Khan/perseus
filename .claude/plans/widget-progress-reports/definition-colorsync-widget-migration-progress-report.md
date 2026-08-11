# ColorSync Widget Migration Progress Report — definition

Widget: `definition`
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: found during a full sweep of every CSS file under `../../../packages/perseus/src/widgets` (plus
the shared `../../../packages/perseus/src/styles/widgets` stylesheets), requested after the `table`/
`interactive-graph`/`label-image` follow-up work. Folded into the current work stream per user
direction, no new ticket filed.

## Step 1 — Audit the Widget
Colors were already fully tokenized (`semanticColor.*` via CSS variables) in a prior pass. One
border-width gap remained:
- `definition.module.css`: `border-bottom: 2px solid var(--wb-semanticColor-core-border-instructive-default);`
  (the `:hover`/`:focus`/`:active` underline) — `2px` was hardcoded alongside an already-tokenized
  color. Exact match: `border.width.medium`.

## Step 5 — Border Conversion
```diff
-    border-bottom: 2px solid
+    border-bottom: var(--wb-border-width-medium) solid
         var(--wb-semanticColor-core-border-instructive-default);
```
No manual/judgment decisions — exact token match.

## Step 6 — Pre-Push Quality Checks
Ran together with the rest of this sweep's changes: Prettier `--check` clean; full-repo `jest`
run (531 suites) — 0 failures attributable to this file; `tsc --noEmit` clean.
