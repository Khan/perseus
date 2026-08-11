# ColorSync Widget Migration Progress Report — graded-group

Widget: `graded-group` (shared stylesheet `../../../packages/perseus/src/styles/widgets/group.css`, shared
with the `group` widget — see the companion `group` report for that widget's own finding in the
same file)
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: found during a full sweep of every CSS file under `../../../packages/perseus/src/widgets` (plus
the shared `../../../packages/perseus/src/styles/widgets` stylesheets), requested after the `table`/
`interactive-graph`/`label-image` follow-up work. Folded into the current work stream per user
direction, no new ticket filed.

## Step 1 — Audit the Widget
`graded-group` has its own stylesheet, `../../../packages/perseus/src/styles/widgets/graded-group.css`,
separate from (but parallel in structure to) `group.css`. Two findings:

- `.answer-correct { border-left: 3px solid ...success-default; }` and
  `.answer-incorrect { border-left: 3px solid ...critical-default; }` — the colored accent bar
  shown once a graded group is scored. `3px` has no exact `border.width.*` token; it's equidistant
  between `medium` (2px) and `thick` (4px). No stronger semantic signal either way (both are
  themed status-color accent bars, same visual role as `explanation`'s `content-expanded` border
  but on the opposite side of the tie), so the default "lean smaller" tie-break applies:
  `border.width.medium`.
- `.group-icon { font-size: 14px; }` — `graded-group.tsx` renders
  `<div className="group-icon">{icon}</div>` (the correct/wrong checkmark shown once a graded
  group is answered), wrapping an `InlineIcon`. This exact rule also exists in `group.css` for the
  `group` widget's own (undetermined-state) icon — see the `group` report for that half of the
  fix. Each file's rule was tokenized independently since they're separate stylesheets, but the
  reasoning is identical: `InlineIcon` scales via em-relative `font-size`, not text, so this is
  icon sizing and uses `sizing.*` rather than `font.*`. `14px` exact-matches `sizing.size_140`.

No other untokenized values were found in `graded-group.tsx` or its associated styles —
`graded-group-set.tsx`/`.css` were also checked as related components and had no findings.

## Step 5 — Conversion
```diff
 .framework-perseus .perseus-graded-group.answer-correct {
-    border-left: 3px solid var(--wb-semanticColor-core-border-success-default);
+    /* 3px has no exact border-width token; equidistant between medium (2px)
+       and thick (4px), so the smaller value was chosen. */
+    border-left: var(--wb-border-width-medium) solid
+        var(--wb-semanticColor-core-border-success-default);
     margin-left: 0;
 }
 .framework-perseus .perseus-graded-group.answer-incorrect {
-    border-left: 3px solid var(--wb-semanticColor-core-border-critical-default);
+    border-left: var(--wb-border-width-medium) solid
+        var(--wb-semanticColor-core-border-critical-default);
     margin-left: 0;
 }
 .framework-perseus .perseus-graded-group .group-icon {
-    font-size: 14px;
+    /* This sizes an InlineIcon via em-relative font-size, not text — use
+       sizing.* rather than a font.* token. */
+    font-size: var(--wb-sizing-size_140);
```

## Step 6 — Pre-Push Quality Checks
Ran together with the rest of this sweep's changes (single shared-file edit): Prettier `--check`
clean; full-repo `jest` run (531 suites, including `graded-group-set.test.ts` and
`graded-group-set-jipt.test.ts`, both updated for an unrelated snapshot hash change — see the
`numeric-input` report's addendum) — 0 failures; `tsc --noEmit` clean.
