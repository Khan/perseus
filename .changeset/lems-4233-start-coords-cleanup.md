---
"@khanacademy/perseus-editor": patch
---

[Interactive Graph][Editor]: internal cleanup of the start-coords components — no behavior change. Converts `StartCoordsPoint`'s props to a named interface, removes a dead CSS class, and migrates `CoordinatePairInput` off the deprecated `labelStyle` (Aphrodite `StyleType`) prop to a `labelClassName` prop.
