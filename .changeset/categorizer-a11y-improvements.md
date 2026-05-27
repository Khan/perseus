---
"@khanacademy/perseus": minor
---

Improve categorizer widget accessibility to meet WCAG 2.2 A/AA standards.

Replaces the custom div/span radio button implementation with native `<input type="radio">` elements, adds a circular focus ring using Wonder Blocks tokens, corrects table semantics (`scope`, `<caption>`), adds visually-hidden labels with full item–category context, and switches all styles to logical CSS properties for RTL support. Also removes unused `iconCircle` and `iconCircleThin` exports from `icon-paths.ts`.
