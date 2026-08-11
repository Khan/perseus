# ColorSync Widget Migration Progress Report — explanation

Widget: `explanation`
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: found during a full sweep of every CSS file under `../../../packages/perseus/src/widgets` (plus
the shared `../../../packages/perseus/src/styles/widgets` stylesheets), requested after the `table`/
`interactive-graph`/`label-image` follow-up work. Folded into the current work stream per user
direction, no new ticket filed.

## Step 1 — Audit the Widget
Colors were already fully tokenized. Two border-width gaps in `explanation.module.css`:
- `.content { border-left: 0px solid var(--wb-semanticColor-core-border-neutral-subtle); }` —
  color already tokenized, but the `0px` width was a literal rather than
  `var(--wb-border-width-none)`.
- `.content-expanded { border-left-width: 5px; }` — the visible accent bar shown when the
  explanation is expanded. `5px` has no exact `border.width.*` token (scale is `0/1/2/4`).
  Nearest is `thick` (4px, distance 1, no tie — there's no larger token to compare against).
  This is a themed border stroke (matches the `border-neutral-subtle` color on the collapsed
  state), not shape geometry, so the "nearest token" rule applies cleanly — a 1px-thinner accent
  bar is a low-risk cosmetic change.

## Step 5 — Border Conversion
```diff
 .content {
-    border-left: 0px solid var(--wb-semanticColor-core-border-neutral-subtle);
+    border-left: var(--wb-border-width-none) solid
+        var(--wb-semanticColor-core-border-neutral-subtle);
     display: inline-grid;
     position: relative;
 }
 ...
 .content-expanded {
-    border-left-width: 5px;
+    /* 5px has no exact border-width token; border.width.thick (4px) is the
+       nearest available value. */
+    border-left-width: var(--wb-border-width-thick);
```

## Step 6 — Pre-Push Quality Checks
Ran together with the rest of this sweep's changes: Prettier `--check` clean; full-repo `jest`
run (531 suites) — 0 failures attributable to this file; `tsc --noEmit` clean.

## Note on pre-existing `_legacy-styles.js` drift
While investigating the `numeric-input` ticket (LEMS-4267) earlier this session, running
`pnpm sync-legacy-styles` revealed that `explanation.module.css` and its generated
`explanation_legacy-styles.js` counterpart had already drifted apart (a stale generated file, out
of scope for that ticket and unrelated to the changes above — flagged there, not fixed here
either). Worth a follow-up ticket to re-sync.
