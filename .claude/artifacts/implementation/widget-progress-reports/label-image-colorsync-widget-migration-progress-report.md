# ColorSync Widget Migration Progress Report — label-image (border-width follow-up)

Widget: `label-image`
Workflow: colorsync-widget-migration
Started: 2026-08-07
Note: colors were already fully tokenized in a prior pass (LEMS-3994/4290, both Done — confirmed
via audit below, no color changes made here). This report covers a border-width/radius gap found
during a status check, folded into the current work stream per user direction rather than filed
as a separate ticket.

## Step 1 — Audit the Widget

### Bash commands used
```bash
grep -nE "#[0-9a-fA-F]{3,6}|rgba?\(|font-size|font-weight|line-height|font-family|border-radius|border-width|fontSize|fontWeight|lineHeight|fontFamily|borderRadius|borderWidth|color\.|semanticColor" packages/perseus/src/widgets/label-image/*.tsx
```

### Colors to be Tokenized:
None — `answer-pill.tsx`, `label-image.tsx`, and `marker.tsx` all already use `semanticColor.*`
exclusively for every color value. Confirmed already-complete.

### Fonts to be Tokenized:
None found in this widget's files.

### Border Width:
`marker.tsx` has five hardcoded pixel border/outline widths that were never converted to
`border.width.*` tokens, despite the colors alongside them already being tokenized:
- Line 213 (`markerIcon`): `border: \`2px solid ${...}\`` → `2px` = exact match, `border.width.medium`.
- Line 252 (`markerActive`): `outline: \`2px solid ${...}\`` → same, `border.width.medium`
  (`outline` is included in the `border` context per `color-conversion-rules.md`'s CSS-property
  table).
- Line 260 (`markerSelected`): `border: \`solid 4px ${...}\`` → `4px` = exact match, `border.width.thick`.
- Line 269 (`markerFilled`): `border: \`4px solid ${...}\`` → `border.width.thick`.
- Line 278 (`markerGraded`): `border: \`2px solid ${...}\`` → `border.width.medium`.

### Border Radius:
- `label-image.tsx` line 871 — a decorative separator dot between answer choices (`width: 2,
  height: 2`) had `borderRadius: 2`. This is **not** a corner-rounding value to match by nearest
  pixel magnitude — it's forcing a 2×2px square into a circle (radius ≥ half the box dimension
  always yields a full circle). Nearest-by-magnitude would suggest `radius_010` (1px), but that
  would be the wrong semantic pick: the design intent here is "circle," matching the exact same
  pattern already used in this file's sibling `marker.tsx` (`borderRadius: MARKER_SIZE`, radius
  set equal to the element's own size specifically to force a circle regardless of literal
  pixel value). Chose **`border.radius.radius_full`** (`50%`) instead — same rendered circle,
  correct semantics.
- `marker.tsx`'s three `borderRadius: MARKER_SIZE` usages (lines 190, 214, 262) were **not**
  touched — `MARKER_SIZE` is a size constant, not a magic pixel value; the radius is already
  computed relative to the element's own dimensions to force a circle, which is the geometrically
  correct approach and has no direct token equivalent (it isn't a fixed value to look up).

## Step 5 — Border Conversion

### Changes made
`packages/perseus/src/widgets/label-image/marker.tsx`:
- Added `border` to the `@khanacademy/wonder-blocks-tokens` import.
- `markerIcon.border`: `2px` → `${border.width.medium}`
- `markerActive.outline`: `2px` → `${border.width.medium}`
- `markerSelected.border`: `4px` → `${border.width.thick}`
- `markerFilled.border`: `4px` → `${border.width.thick}`
- `markerGraded.border`: `2px` → `${border.width.medium}`

`packages/perseus/src/widgets/label-image/label-image.tsx`:
- Added `border` to the `@khanacademy/wonder-blocks-tokens` import.
- Separator-dot `borderRadius`: `2` → `border.radius.radius_full`

### Tokens requiring manual/judgment handling
- `borderRadius: 2` → `radius_full`: flagged above — the one non-mechanical decision in this
  file, since nearest-by-magnitude (`radius_010`) would have been semantically wrong for a
  circle-forming radius.

## Step 6 — Pre-Push Quality Checks
Ran together with the `table` and `interactive-graph` changes in the same session:
- **Lint** (eslint on `label-image.tsx`, `marker.tsx`): clean.
- **Prettier `--check`**: clean.
- **Typecheck** (`tsc --noEmit`): clean.
- **Tests**: `jest label-image table interactive-graph` — 123 test suites, 2464 passed / 28
  skipped, 0 failed, including `answer-pill.test.tsx` and the label-image-editor suites; no
  snapshot updates were needed (no test captures the Aphrodite-generated class hashes for
  `marker.tsx`'s styles).

No user action pending — no new interaction stories were added.
