# ColorSync Widget Migration Progress Report — group

Widget: `group` (shared stylesheet `../../../packages/perseus/src/styles/widgets/group.css`)
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: found during a full sweep of every CSS file under `../../../packages/perseus/src/widgets` (plus
the shared `../../../packages/perseus/src/styles/widgets` stylesheets), requested after the `table`/
`interactive-graph`/`label-image` follow-up work. Folded into the current work stream per user
direction, no new ticket filed.

## Correction to an earlier session claim
An earlier pass in this session concluded the `group` widget was "fully migrated" based on
`group.tsx` having no inline styles at all. That check missed `group.css` — a separate,
still-live legacy stylesheet imported via `@import "widgets/group.css" layer(perseus-legacy);` in
`perseus-renderer.css`/`perseus-renderer.new.css`. Correcting that here: `group.css` had one
untokenized rule.

## Step 1 — Audit the Widget
- `.perseus-group .group-icon { font-size: 14px; }` — `.group-icon` isn't actually rendered by
  `group.tsx`; it's rendered by `graded-group.tsx` (`<div className="group-icon">{icon}</div>`,
  see the companion `graded-group` report), wrapping an `<InlineIcon>` component. Since
  `InlineIcon` scales via em-relative `font-size` rather than rendering text, this is icon sizing,
  not text sizing — per the font-token mapping guidance, non-text sizing uses `sizing.*`, not
  `font.*`. `14px` exact-matches `sizing.size_140`.

## Step 5 — Conversion
```diff
 .framework-perseus .perseus-group .group-icon {
-    font-size: 14px;
+    /* This sizes an InlineIcon via em-relative font-size, not text — use
+       sizing.* rather than a font.* token. */
+    font-size: var(--wb-sizing-size_140);
```

## Step 6 — Pre-Push Quality Checks
Ran together with the rest of this sweep's changes: Prettier `--check` clean; full-repo `jest`
run (531 suites) — 0 failures attributable to this file; `tsc --noEmit` clean.
