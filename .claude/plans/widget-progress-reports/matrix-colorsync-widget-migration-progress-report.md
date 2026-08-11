# ColorSync Widget Migration Progress Report — matrix

Widget: `matrix` (shared stylesheet `../../../packages/perseus/src/styles/widgets/matrix.css`)
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: found during a full sweep of every CSS file under `../../../packages/perseus/src/widgets` (plus
the shared `../../../packages/perseus/src/styles/widgets` stylesheets), requested after the `table`/
`interactive-graph`/`label-image` follow-up work. Folded into the current work stream per user
direction, no new ticket filed.

## Step 1 — Audit the Widget
`background` and `border-color` were already tokenized (`semanticColor.core.background.base.subtle`,
`semanticColor.core.border.neutral.strong`). The `.matrix-bracket` rule (draws the `[` / `]`
bracket glyphs around the matrix input) had five hardcoded border-width literals, all exact
matches:
- `border-bottom-width: 2px` / `border-top-width: 2px` → `border.width.medium`
- `.bracket-left`: `border-left-width: 2px` → `border.width.medium`; `border-right-width: 0` →
  `border.width.none`
- `.bracket-right`: `border-left-width: 0` → `border.width.none`; `border-right-width: 2px` →
  `border.width.medium`

## Step 5 — Border Conversion
```diff
 .perseus-matrix .matrix-bracket {
     border-color: var(--wb-semanticColor-core-border-neutral-strong);
     border-style: solid;
-    border-bottom-width: 2px;
-    border-top-width: 2px;
+    border-bottom-width: var(--wb-border-width-medium);
+    border-top-width: var(--wb-border-width-medium);
     margin-top: -2px;
     position: absolute;
     width: 6px;
 }
 .perseus-matrix .matrix-bracket.bracket-left {
-    border-left-width: 2px;
-    border-right-width: 0;
+    border-left-width: var(--wb-border-width-medium);
+    border-right-width: var(--wb-border-width-none);
     left: 3px;
 }
 .perseus-matrix .matrix-bracket.bracket-right {
-    border-left-width: 0;
-    border-right-width: 2px;
+    border-left-width: var(--wb-border-width-none);
+    border-right-width: var(--wb-border-width-medium);
     margin-left: -3px;
 }
```
No manual/judgment decisions — every value was an exact token match.

## Step 6 — Pre-Push Quality Checks
Ran together with the rest of this sweep's changes: Prettier `--check` clean; full-repo `jest`
run (531 suites) — 0 failures attributable to this file; `tsc --noEmit` clean.
