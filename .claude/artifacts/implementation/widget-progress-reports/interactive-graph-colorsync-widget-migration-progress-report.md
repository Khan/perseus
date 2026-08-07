# ColorSync Widget Migration Progress Report — interactive-graph (shared CSS)

Widget: `interactive-graphs` (shared stylesheet `packages/perseus/src/styles/widgets/interactive-graph.css`)
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: identified during a status check on other widgets' CSS files; user directed this be folded
into the current work stream rather than filed as a separate Jira ticket. This file is distinct
from the widget's own already-tokenized `.tsx` sources (LEMS-3494/4219/4268, all Done) — it's a
legacy global stylesheet the prior ColorSync passes missed.

## Step 1 — Audit the Widget

### Bash commands used
```bash
grep -nE "#[0-9a-fA-F]{3,6}|rgba?\(|font-size|font-weight|line-height|font-family|border-radius|border-width|border:" packages/perseus/src/styles/widgets/interactive-graph.css
```
Confirmed live via `@import "widgets/interactive-graph.css" layer(perseus-legacy);` in both
`perseus-renderer.css` and `perseus-renderer.new.css`.

### Colors to be Tokenized:
- Line 31: `background-color: #ffffff;` (mobile tooltip background) — exact match:
  `semanticColor.core.background.base.default` (`#ffffff`).
- Line 17: `border-color: white transparent;` (tooltip-arrow triangle, see Border Width note) —
  the visible half maps to `core.border.knockout.default` (`#ffffff`), matching the legacy
  shorthand table's `color.white` → border → `core.border.knockout.default`. The `transparent`
  half needs no token (not a themed color).
- Line 43: `color: #71b307 !important;` (MathJax-rendered math text color inside the visible
  tooltip) — no legacy `color.*` token was ever assigned (raw hex, never tokenized). Matched by
  closest resolved-value distance among foreground-family tokens (context: `color` property →
  `foreground`, per the CSS-property → context table):
  - `core.foreground.success.default` (`#00a60e`) — distance ≈114 (closest)
  - `core.foreground.success.strong` (`#0b7c18`) — distance ≈117
  - all warning/critical/instructive tokens were substantially farther (≥140)
  Chose **`semanticColor.core.foreground.success.default`**. This is a best-guess pending a
  visual check (per `color-conversion-rules.md`'s guidance to treat hex-distance matches as a
  hypothesis, not the answer) — flagging for Storybook/Figma comparison before this is
  considered final.

### Border Radius:
- Line 32: `border-radius: 5px;` (tooltip bubble corner) — no exact token. Nearest candidates:
  `radius_040` (4px, −1) vs `radius_080` (8px, +3). `radius_040` is unambiguously nearer (no
  tie), and a 1px-smaller tooltip corner is a low-risk cosmetic change. Chose
  **`border.radius.radius_040`**.

### Border Width:
- Line 18: `border-width: 10px 10px 0 10px;` — this is **not a themed border**; it's a
  CSS-triangle hack (paired with `border-color: white transparent` and `border: solid`) that
  draws the tooltip's pointer arrow. The `border.width.*` scale tops out at `thick` (4px) — a
  6px/60% reduction from the current 10px, which would visibly and substantially shrink the
  arrow.
  - **Asked the user how to handle this** (nearest-token vs. leave-hardcoded vs. visual check
    first), since blindly applying "nearest token" here would conflate a themed border-stroke
    concern with shape geometry that the token scale was never meant to cover.
  - **Decision: leave `10px 10px 0 10px` hardcoded.** Added an inline CSS comment explaining why
    (`border.width.*`'s max value is 4px and doesn't apply to shape geometry), and documenting
    the decision here per the user's request.

### Fonts to be Tokenized:
None found in this file.

## Step 5 — Font/Border/Color Conversion

Plain global CSS file (`@import ... layer(perseus-legacy)`) — used `var(--wb-*)` CSS-variable
forms directly, matching `sortable.css`'s existing convention.

### Change made
```diff
 .perseus-mobile .tooltip.visible .tooltip-content:before {
     border: solid;
-    border-color: white transparent;
+    border-color: var(--wb-semanticColor-core-border-knockout-default)
+        transparent;
+    /* This is a CSS-triangle arrow shape, not a themed border stroke —
+       border-width tokens (max 4px) don't apply to shape geometry. */
     border-width: 10px 10px 0 10px;
     bottom: -10px;
     ...
 }
 ...
 .perseus-mobile .tooltip.visible .tooltip-content {
     display: inline-block;
-    background-color: #ffffff;
-    border-radius: 5px;
+    background-color: var(--wb-semanticColor-core-background-base-default);
+    border-radius: var(--wb-border-radius-radius_040);
     ...
 }
 .perseus-mobile .tooltip.visible .tooltip-content mjx-container {
-    color: #71b307 !important;
+    color: var(--wb-semanticColor-core-foreground-success-default) !important;
 }
```

### Tokens requiring manual/judgment handling
1. **`#71b307` → `core.foreground.success.default`** — best-guess by hex distance; no exact or
   legacy-token match existed. Needs visual confirmation (Storybook render of the mobile tooltip
   vs. Figma, if a design reference exists) before treating as final.
2. **`border-width: 10px 10px 0 10px` left un-tokenized** — user-directed exception; this is
   shape geometry (a CSS-triangle arrow), not a themed border stroke, so the `border.width.*`
   scale doesn't semantically apply. Documented inline and here per the user's explicit request.

## Step 6 — Pre-Push Quality Checks
Ran together with the `table` and `label-image` changes in the same session:
- **Prettier `--check`** on `interactive-graph.css`: clean.
- **Typecheck** (`tsc --noEmit`): clean.
- **Tests**: `jest label-image table interactive-graph` — 123 test suites, 2464 passed / 28
  skipped, 0 failed. No snapshot tests capture this file's literal CSS values, so nothing needed
  updating.

No user action pending — no new interaction stories were added. The `#71b307` → `success.default`
color pick is a best-guess flagged for a future visual check (per the note in Step 1); it isn't
blocking on tests, which don't render this stylesheet's visual output.

## Addendum — full widgets/ CSS sweep (same session, follow-up)
A full sweep of every CSS file under `packages/perseus/src/widgets/` (excluding `plotter`) and
`packages/perseus/src/styles/widgets/` turned up one more file in this widget's scope:
`packages/perseus/src/widgets/interactive-graphs/protractor.css`.

- `mafs-styles.css`'s `drop-shadow(...)` filter colors (`#0008`, `rgba(33, 36, 44, 0.16)`) were
  re-checked and left as-is — the file already carries its own comments explaining these were a
  deliberate prior decision ("Not using a semantic token here because there's no equivalent that
  would work for the drop shadow filter"). No new information contradicts that; not re-litigated.
- `protractor.css`: `.protractor-rotation-handle-arrow-arc { stroke-width: 8; }` — no exact
  `border.width.*` token; nearest is `thick` (4px), a 50% reduction. Unlike the tooltip-arrow case
  above (pure decorative shape), this stroke is the hit-affordance for a drag handle — shrinking
  it changes interactive-control ergonomics, not just appearance. Left hardcoded with an inline
  comment, applying the same "don't tokenize geometry/affordance, only themed strokes" reasoning
  the user already established for the tooltip arrow.
- `--mafs-blue` (used for `stroke`/`fill` throughout both files) was already an alias for
  `semanticColor.core.foreground.instructive.default` — fully tokenized, no action needed.
