---
"@khanacademy/perseus": patch
---

Categorizer: replace `role="button"` shim and SVG fake-radios with native `<input type="radio">`. Item and category headers now use `<th scope="row">` and `<th scope="col">` with stable IDs, and each radio takes its accessible name from the visible row + column headers via `aria-labelledby`. Visual style of the radio control changes (now a single native radio in both desktop and mobile); no widget API change.
