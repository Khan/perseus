---
"@khanacademy/perseus": minor
---

Categorizer: replace the `role="button"` + SVG-circle radio shim with a Wonder Blocks `Choice variant="radio"` per cell, and add proper table semantics. Item labels are now `<th scope="row">` and category headers `<th scope="col">` with stable IDs; each radio's accessible name is built from the row + column headers via `aria-labelledby`. One radio group per row gives native arrow-key navigation within a row and Tab between rows. Static (read-only) mode uses Wonder Blocks' `disabled` state. The radio control's visual style changes (now Wonder Blocks blue in both desktop and mobile); no widget API change.
