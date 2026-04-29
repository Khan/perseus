---
"@khanacademy/perseus": patch
---

Categorizer accessibility: replace the `role="button"` + SVG-circle radio shim with a Wonder Blocks `Choice variant="radio"` per cell, and turn the layout into proper table semantics. Item labels are now `<th scope="row">` and category headers `<th scope="col">` with stable IDs; each radio's accessible name is built from the row + column headers via `aria-labelledby`. One radio group per row gives native arrow-key navigation within a row and Tab between rows. Static (read-only) mode uses Wonder Blocks' `disabled` state. Visual style of the radio control changes (now Wonder Blocks blue in both desktop and mobile); no widget API change.
