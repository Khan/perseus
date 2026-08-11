# ColorSync Widget Migration — `sortable` — Progress Report

This is a historical record of the ColorSync migration workflow for the `sortable` widget. Entries are appended as each step completes; earlier entries are not edited.

## Step 1 — Audit the Widget

### Scope note
`../../../packages/perseus/src/styles/widgets/sortable.css` contains rules for two unrelated consumers:
- Lines 1–52 (`.draggy-boxy-thing .card`, `.cards-area`, `.drag-hint`, `.stack`, etc.) are applied by the **`orderer`** widget via the classname built at `packages/perseus/src/widgets/orderer/orderer.tsx:737` (`"draggy-boxy-thing orderer " + ...`). All the hardcoded hex colors in the file live here.
- Lines 54–71 (`.perseus-sortable ...`) style the shared `Sortable` component (`../../../packages/perseus/src/components/sortable.tsx`), consumed by the `matcher` and `sorter` widgets.

Per user decision: keep this migration named "sortable" (scoped to `sortable.css`), and also verify `orderer.tsx` itself (the widget that actually renders the `.draggy-boxy-thing` markup) has no hardcoded values of its own, since it was expected to already be migrated.

### Bash commands used
```bash
grep -n "color\." packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -n "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "rgba?\([^)]+\)" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "fontSize|fontWeight|lineHeight|fontFamily|font-size|font-weight|line-height|font-family" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "borderWidth|borderTopWidth|borderBottomWidth|borderLeftWidth|borderRightWidth|border-width" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -nE "borderRadius|border-radius" packages/perseus/src/components/sortable.tsx packages/perseus/src/styles/widgets/sortable.css
grep -n "color:" packages/perseus/src/components/sortable.tsx
grep -nE "border" packages/perseus/src/components/sortable.tsx

# Verification pass on orderer.tsx (expected to already be migrated)
grep -n "color:" packages/perseus/src/widgets/orderer/orderer.tsx
grep -n "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "rgba?\([^)]+\)" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "borderWidth|borderTopWidth|borderBottomWidth|borderLeftWidth|borderRightWidth|border-width" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "borderRadius|border-radius" packages/perseus/src/widgets/orderer/orderer.tsx
grep -nE "\bborder\b" packages/perseus/src/widgets/orderer/orderer.tsx
grep -n "wonder-blocks-tokens" packages/perseus/src/widgets/orderer/orderer.tsx
```

### Colors to be Tokenized:
- **Files with color token usage:**
  - `../../../packages/perseus/src/components/sortable.tsx` — imports `border`, `semanticColor` from `@khanacademy/wonder-blocks-tokens` (line 5); uses them in inline styles at lines 922, 937, 960, 966 (`semanticColor.core.border.neutral.subtle`, `semanticColor.core.border.instructive.default`, `semanticColor.core.border.disabled.subtle`). No hardcoded colors present — this file does not need color conversion.
- **Files with hardcoded hex/rgb(a) color values (need changing):**
  - `../../../packages/perseus/src/styles/widgets/sortable.css`:
    - Line 3: `background: #eee;`
    - Line 4: `border: 1px solid #ccc;`
    - Line 5: `border-bottom: 1px solid #aaa;`
    - Line 6: `box-shadow: 0 1px 2px #ccc;`
    - Line 9: `background-color: #fff;`
    - Line 10: `border: 1px solid #b9b9b9;`
    - Line 11: `border-bottom-color: #939393;`
    - Line 17: `background: #ddd;`
    - Line 18: `border: 1px solid #ccc;`
    - Line 22: `border: 1px dashed #aaa;`
    - Line 26: `border-color: #aaa;`
    - Line 30: `background-color: #ffedcd;`
    - Line 39: `background-color: #fff;`
    - Line 40: `border: 1px solid #b9b9b9;`
    - Line 41: `border-bottom-color: #939393;`
    - Line 51: `border-color: #ffa500;`
    - Line 52: `box-shadow: 0 0 4px #c78100;`
  - `../../../packages/perseus/src/widgets/orderer/orderer.tsx`: **none found.** No hex/rgb(a) values, no `color:` style props, no `border` usage of any kind, no `wonder-blocks-tokens` import. Confirms the widget itself carries no hardcoded values — all color/border styling for its rendered markup lives in `sortable.css`.

### Fonts to be Tokenized:
- **Files with font attributes:**
  - `../../../packages/perseus/src/styles/widgets/sortable.css` line 65: `font-size: var(--wb-font-body-size-small);` — already using a WB token, no change needed.
  - No other font attributes (`fontSize`/`fontWeight`/`lineHeight`/`fontFamily`) found in `sortable.css`, `components/sortable.tsx`, or `orderer.tsx`.
- **Files with border width attributes:**
  - No standalone `border-width`/`borderWidth`-family properties found. Border widths appear only inside shorthand `border: <width> <style> <color>` declarations (lines 4, 5, 10, 18, 22, 40 of `sortable.css`, all `1px`) — these will be evaluated against `border.width.*` tokens (e.g. `border.width.thin`) during Step 5, alongside the color conversion in Step 9, since they're bundled with the hardcoded colors.
- **Files with border radius attributes:**
  - `../../../packages/perseus/src/styles/widgets/sortable.css` line 12: `border-radius: 4px;`
  - `../../../packages/perseus/src/styles/widgets/sortable.css` line 42: `border-radius: 4px;`
  - `../../../packages/perseus/src/components/sortable.tsx` line 923: `borderRadius: 4,` (unitless, Aphrodite style — belongs to the `.perseus-sortable` / shared component side, already otherwise token-based; flagging for radius-token check even though it has no color problem)

### Summary
- **In scope for this migration:** the 17 hardcoded hex-color declarations in `sortable.css` lines 1–52 (the `.draggy-boxy-thing` rules rendered by the `orderer` widget), plus the two `border-radius: 4px` declarations in that same block.
- **Confirmed already migrated / no action needed:** `orderer.tsx` (no hardcoded values of any kind) and `components/sortable.tsx` (already uses `border`/`semanticColor` tokens; only the unitless `borderRadius: 4` is worth a token check, no color issue).

## Step 10 — Semantic Color Check

Widget: `orderer` (rendered via the `.draggy-boxy-thing` rules in `sortable.css`). Colors only — the border-width/border-radius conversions in the same file are geometry, not semantics, and are out of scope for this step.

For each of the four questions in `semantic-check.md` — element/state, category fit, intensity fit, namespace fit — evaluated against the token actually landed on in the diff (all in `../../../packages/perseus/src/styles/widgets/sortable.css`):

1. **`background.neutral.subtle`** (`#ededee`) — `.draggable-box`, `.cards-area` background
   - Element: the outer drop-area container. No status is being communicated — it's a plain resting backdrop.
   - Category: `neutral` fits — decorative/default, not a state.
   - Intensity: `subtle` fits — a light wash, not a filled surface.
   - Namespace: `background` property → `background` namespace. ✅
   - Confidence: **High.**

2. **`border.neutral.subtle`** (`#dbdcdd`) — container `border`, container `box-shadow` tint, `.placeholder` `border`
   - Element: the container's structural edge and its soft depth shadow; reused for the placeholder slot's edge.
   - Category: `neutral` fits — plain structural delineation, no state.
   - Intensity: `subtle` fits — thin, low-contrast.
   - Namespace: `border` property → `border` namespace. ✅ for the two `border` uses. The `box-shadow` use is the one namespace question in this set: `color-conversion-rules.md`'s CSS-property table doesn't list `box-shadow` under any of the three namespaces. Using a `border`-family token for it is defensible by intent — the shadow functions as an edge/depth cue, the same reasoning the rules apply to the "1px divider using `backgroundColor`" special case — but it's not literally covered by the table. Flagging as a minor documentation gap, not a likely error.
   - Confidence: **High** for the border uses, **Medium** (flagged) for the shadow-tint use.

3. **`border.neutral.default`** (`#909296`) — container `border-bottom`, `.drag-hint` `border` (dashed), `.drag-hint:hover` `border-color`
   - Element: the container's bottom depth-line, and the dashed outline of the drag-hint template.
   - Category: `neutral` fits for the container border-bottom. For `.drag-hint`, `instructive` ("user is being guided") is a plausible alternate reading, since the hint's whole purpose is to show the user where a card can go. But the element has `cursor: auto` (not `pointer`) and its `:hover` state doesn't change color — only removes the shadow — so it reads as a static template rather than a live interactive affordance. `neutral` holds up.
   - Intensity: `default` fits — a mid-strength grey, stronger than the container's own `subtle` border, preserving the original depth contrast.
   - Namespace: `border`/`border-color` → `border`. ✅
   - Confidence: **High**, with a **minor noted alternate** for the drag-hint category (not acted on).

4. **`background.base.default`** (`#ffffff`) — `.card`, `.card.stack:after` `background-color`
   - Element: the plain white face of a resting draggable card.
   - Category: this is the one place the four listed categories (`instructive`/`success`/`critical`/`neutral`/`disabled`/`knockout`) don't quite have a slot — `base` is a separate foundational-surface family, not a state semantic. That absence of a state *is* the fit here: the card face isn't communicating anything, it's just the base surface a card is drawn on. Worth flagging as a gap in the category list rather than a problem with the choice.
   - Intensity: `default` fits — the standard/primary surface value.
   - Namespace: `background-color` → `background`. ✅
   - Confidence: **High** (byte-exact hex match reinforces it).

5. **`border.neutral.subtle`** (`#dbdcdd`) — `.card`, `.card.stack:after` `border`
   - Element: the card's outer edge.
   - Category: `neutral` fits — structural, no state.
   - Intensity: `subtle` fits.
   - Namespace: `border` → `border`. ✅
   - Confidence: **High.**

6. **`border.neutral.default`** (`#909296`) — `.card`, `.card.stack:after` `border-bottom-color`
   - Element: the card's bottom edge, darker than its side border to read as a raised/3-D card.
   - Category: `neutral` fits.
   - Intensity: `default` fits — correctly stepped up from the side border's `subtle`, preserving the original depth contrast (`#939393` was darker than `#b9b9b9`).
   - Namespace: `border-bottom-color` → `border`. ✅
   - Confidence: **High.**

7. **`background.neutral.subtle`** (`#ededee`) — `.card.placeholder` `background`
   - Element: the ghost slot left behind at a card's original position while it's being dragged elsewhere.
   - Category: the real judgment call in this set. `disabled` ("element is not interactable") is a legitimate alternate reading — a placeholder slot can't be clicked or dragged itself. That was in fact the *first* pick (`disabled.strong`, chosen by hex distance), before a follow-up commit revised it to `neutral.subtle` to match the sibling `Sortable` component's precedent for the same visual state. On the semantic questions alone, `neutral` still holds up: the slot isn't communicating "this is turned off," it's just an empty gap — closer to "nothing here right now" than to a disabled control.
   - Intensity: `subtle` fits either way.
   - Namespace: `background` → `background`. ✅
   - Confidence: **Medium** (flagged, but resolved) — the category was settled by cross-widget consistency rather than a semantic argument alone; recorded here since the instructions ask for it regardless of confidence.

8. **`background.instructive.subtle`** (`#edf3fe`) — `.card.dragging` `background-color`
   - Element: the fill of the card currently being actively dragged by the user.
   - Category: `instructive` — "user is... in an interactive selection state" — is a strong, confident fit here: the user is mid-manipulation of this exact element. This is the clearest case in the whole set of the semantic check *overruling* a pure color-distance pick: the nearest hex by distance was `warning.subtle` (`#fff9eb`, still warm/cream), which would have been a **category mismatch** — a card being dragged isn't "something wrong," so `warning` would have been the wrong semantic even though it was numerically closer.
   - Intensity: `subtle` fits — a light, transient highlight appropriate for a momentary state.
   - Namespace: `background-color` → `background`. ✅
   - Confidence: **High** — the strongest, most confident match in this set, specifically because it wasn't chosen by distance alone.

9. **`border.warning.default`** (`#ffb100`) `border-color`, **`border.warning.strong`** (`#b8840e`) `box-shadow` tint — `.card:hover`
   - Element: the border and matching glow shown on mouse-hover over a normal, fully-functional card — a "you can pick this up" affordance.
   - Category: **this is the one place I'd flag as a likely mismatch, not just a judgment call.** `warning` is defined as "something is wrong or needs attention." A plain hover state on a healthy, interactive card isn't a warning — it's the same "user is in an interactive state" situation as item 8, which pointed to `instructive`. The only reason this landed on `warning` is that the original raw hex (`#ffa500`, a bright orange) happens to sit closest, by pure distance, to the design system's orange-toned family — and `warning` is the only semantic category with orange swatches. This is exactly the failure mode `color-conversion-rules.md` calls out by name for never-tokenized widgets: "closest-by-distance doesn't always look right once rendered... verify the family semantics, not just the resolved hex." Recommend revisiting this pair against `border.instructive.default`/`border.instructive.strong` (or similar) rather than keeping the `warning` family, even though the hex distance is excellent.
   - Intensity: the `default` → `strong` stepping from border to shadow is internally consistent regardless of which family is used.
   - Namespace: `border-color` → `border`. ✅ for the border; the `box-shadow` tint carries the same minor namespace note as item 2 (not literally covered by the property table, but the closest conceptual fit).
   - Confidence: **Low** — flagged as the one conversion in this widget that a semantic-fit review, rather than a color-distance review, would change.

### Updated Token Mapping Table (colors only)

| Old hex | New token | Resolved hex (light) | Property | Semantic confidence |
|---|---|---|---|---|
| `#eee` | `background.neutral.subtle` | `#ededee` | `background` | High |
| `#ccc` | `border.neutral.subtle` | `#dbdcdd` | `border` / `box-shadow` | High / Medium (shadow namespace) |
| `#aaa` | `border.neutral.default` | `#909296` | `border`, `border-color` | High |
| `#fff` | `background.base.default` | `#ffffff` | `background-color` | High |
| `#b9b9b9` | `border.neutral.subtle` | `#dbdcdd` | `border` | High |
| `#939393` | `border.neutral.default` | `#909296` | `border-bottom-color` | High |
| `#ddd` | `background.neutral.subtle` | `#ededee` | `background` | Medium (flagged, resolved) |
| `#ffedcd` | `background.instructive.subtle` | `#edf3fe` | `background-color` | High |
| `#ffa500` | `border.warning.default` | `#ffb100` | `border-color` | **Low (flagged)** |
| `#c78100` | `border.warning.strong` | `#b8840e` | `box-shadow` tint | **Low (flagged)** |

### Gate check
8 of 10 conversions have a high-confidence documented semantic justification; 2 are explicitly flagged with reasoning (`.card.placeholder` background — medium, resolved by precedent; `.card:hover` border/shadow — low, recommend reconsidering the `warning` family for an `instructive` one). Per `semantic-check.md`, flagging is the completion criterion for this step regardless of confidence level — no token conversion was left undocumented. No code changes were made in this step; the `.card:hover` finding is a recommendation for follow-up, not yet applied.
