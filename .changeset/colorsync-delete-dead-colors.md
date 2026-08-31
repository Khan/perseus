---
"@khanacademy/perseus": patch
---

Delete dead color/graphie code identified by the KhanColors removal inventory.

**Public API surface reduction** (technically breaking for the exported
`KhanColors` object, though a 14-repo sweep found zero external references):

- `KhanColors` (exported from `@khanacademy/perseus`) loses ~70 unreferenced
  palette entries (`GRAY10`–`GRAY90`, `BLUE_A`–`E`, `TEAL_A`–`E`,
  `GREEN_A`–`E`, `GOLD_A`–`E`, `RED_A`–`E`, `MAROON_A`–`E`, `PURPLE_A`–`E`,
  `MINT_A`–`C`, most `GRAY_A`–`I`, `KA_BLUE`, `KA_GREEN`, `ORANGE`,
  `LIGHT_GRAY`, `LIGHT_BLACK`, `_BACKGROUND`). The 18 keys still referenced in
  Perseus remain, and the palette is now documented as deprecated (kept only
  for interaction-editor swatches and measurer rendering).
- Removed the unreachable graphie functions `addMovablePolygon`,
  `addMovableAngle`, `addCircleGraph`, `addRotateHandle`, `addReflectButton`,
  and `MovableAngle` from `util/interactive.ts` (not part of the package's
  public exports).
- Removed the unreachable `interactive2/movable-polygon.ts` (and its options
  module) plus the `MovablePolygon`/`addMovablePolygon` members of the
  internal `Interactive2` object.

No rendered output changes: all deleted code was unreferenced, verified by
repo-wide call-site census.
