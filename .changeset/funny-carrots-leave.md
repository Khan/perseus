---
"@khanacademy/math-input": major
"@khanacademy/perseus": major
---

We've removed the deprecated `useV2Keypad` prop from the MobileKeypad component.

The V2 keypad is now the default, and the old keypad has been removed.

Additionally, the mobile keypad no longer accepts the `keypadActive` or
`setKeypadActive` props. It now gets those values itself from the `KeypadContext`.
