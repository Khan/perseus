# ColorSync Widget Migration Progress Report — table

Widget: `table` (shared stylesheet `packages/perseus/src/styles/widgets/table.css`)
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: identified during a status check on other widgets' CSS files; user directed this be folded
into the current work stream rather than filed as a separate Jira ticket.

## Step 1 — Audit the Widget

### Bash commands used
```bash
grep -nE "#[0-9a-fA-F]{3,6}|rgba?\(|font-size|font-weight|line-height|font-family|border-radius|border-width|border:" packages/perseus/src/styles/widgets/table.css
```
Confirmed `table.css` is live (not dead code) via:
```bash
grep -rn "widgets/table" packages/perseus/src/styles/*.css
```
— imported by both `perseus-renderer.css` and `perseus-renderer.new.css` as `@import
"widgets/table.css" layer(perseus-legacy);`, and consumed by `packages/perseus/src/widgets/table/table.tsx`.

### Colors to be Tokenized:
- Line 11: `border: 2px solid black;` — hardcoded `black`.
- Line 35: `border-bottom: 2px solid black;` — hardcoded `black`.

No legacy `color.*` token was ever used here (plain literal `black`), so per
`color-conversion-rules.md`'s "Widgets with raw hex / never-tokenized colors" guidance, matched
by context + closest resolved value rather than a legacy-token lookup:
- Context: `border`/`border-bottom` → `border` family (per the CSS-property → context table).
- The border family's darkest available tier is `core.border.neutral.strong` (`#5f6167`). This
  also matches the established shorthand mapping for the closest legacy analog,
  `color.offBlack` → `core.border.neutral.strong` (offBlack was the standard "black-ish"
  divider/border token before literal `black` was phased out elsewhere in the codebase).
- Chose **`semanticColor.core.border.neutral.strong`** for both occurrences.

### Fonts to be Tokenized:
- Line 31: `font-weight: normal;` → `font.weight.regular` (400 — exact semantic match, "normal"
  is the CSS-keyword form of 400).

### Border Width:
- Line 11: `border: 2px solid black` and line 12: `border-width: 0 2px` — `2px` → `border.width.medium`
  (exact match). The `0` component of the shorthand → `border.width.none` (exact match, `0px`).
- Line 35: `border-bottom: 2px solid black` — same, `2px` → `border.width.medium`.
- Lines 20, 28: `border-left: 0;` / `border-right: 0;` — `0` → `border.width.none` (exact match).
  These already render no visible border regardless (no `border-style` set, defaults to `none`),
  so this is a token-completeness change with no visual effect.

### Summary
All hardcoded values in this file have exact or well-established token matches — no gaps, no
value required the "nearest token" fallback.

## Step 5 — Font/Border/Color Conversion

This is a plain (non-module) global CSS file loaded via `@import ... layer(perseus-legacy)`, so
conversions use the `var(--wb-*)` CSS-variable forms directly, matching the existing convention
in `sortable.css` (`font-size: var(--wb-font-body-size-small)`).

### Change made
```diff
 .framework-perseus table.perseus-widget-table-of-values.non-markdown th,
 .framework-perseus table.perseus-widget-table-of-values.non-markdown td {
-    border: 2px solid black;
-    border-width: 0 2px;
+    border: var(--wb-border-width-medium) solid
+        var(--wb-semanticColor-core-border-neutral-strong);
+    border-width: 0 var(--wb-border-width-medium);
 }
 ...
     td:first-child {
-    border-left: 0;
+    border-left: var(--wb-border-width-none);
 }
 ...
     td:last-child {
-    border-right: 0;
+    border-right: var(--wb-border-width-none);
 }
 .framework-perseus table.perseus-widget-table-of-values.non-markdown th {
-    font-weight: normal;
+    font-weight: var(--wb-font-weight-regular);
     padding: 5px;
     width: 80px;
     text-align: left;
-    border-bottom: 2px solid black;
+    border-bottom: var(--wb-border-width-medium) solid
+        var(--wb-semanticColor-core-border-neutral-strong);
 }
```

### Tokens requiring manual/judgment handling
- `black` → `core.border.neutral.strong`: no legacy token existed for this literal keyword: this
  is a judgment call based on family semantics (border context) and precedent (offBlack →
  border.neutral.strong), not a simple hex-distance match, since no border-family token is
  literally close to `#000000` (the darkest is `#5f6167`). Flagging as the one non-mechanical
  decision in this file.

## Step 6 — Pre-Push Quality Checks
Ran together with the `interactive-graph` and `label-image` changes in the same session:
- **Lint** (eslint on the changed `.tsx`/`.js` files): clean.
- **Prettier `--check`** on `table.css`: clean.
- **Typecheck** (`tsc --noEmit`): clean.
- **Tests**: `jest label-image table interactive-graph` — 123 test suites, 2464 passed / 28
  skipped, 0 failed, 25 snapshots all passed with no updates needed (this file has no snapshot
  tests capturing its literal CSS values).

No user action pending — no new interaction stories were added.
