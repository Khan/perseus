---
"@khanacademy/math-input": patch
---

Fix "Unable to find node on an unmounted component" error from the mobile keypad: `MobileKeypad.getDOMNode` now returns a container ref instead of calling the deprecated `ReactDOM.findDOMNode`, and the keypad notifies consumers via `onElementMounted(null)` when it unmounts so they don't retain a stale reference.
