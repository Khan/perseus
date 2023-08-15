---
"@khanacademy/perseus": major
"@khanacademy/perseus-editor": patch
---

# Update MathInput

- `buttonSets` is now deprecated in favor of `keypadButtonSets`, but currently maps to the new prop for backwards compatability.
- `buttonsVisible` is now a bit misleading: "focused" is the default state with a toggle-able keypad and "always" shows the keypad by default.
