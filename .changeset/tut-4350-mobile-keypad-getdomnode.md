---
"@khanacademy/math-input": major
---

Fix "Unable to find node on an unmounted component" error from the mobile keypad: `MobileKeypad.getDOMNode` now returns a container ref instead of calling the deprecated `ReactDOM.findDOMNode`, and the keypad notifies consumers via `onElementMounted(null)` when it unmounts so they don't retain a stale reference.

Breaking changes:

- `KeypadAPI.getDOMNode` now returns `HTMLElement | null` (was `Element | Text | null`).
- `MobileKeypad`'s `onElementMounted` is now typed `(api: KeypadAPI | null) => void` and is called with `null` on unmount, so callbacks must accept `null`.
