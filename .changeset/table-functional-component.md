---
"@khanacademy/perseus": patch
---

Internal: the Table widget is now a functional component. `getDOMNodeForPath()`
returns the cell's `<input>` element directly instead of going through
`ReactDOM.findDOMNode()`, except on mobile where the cell is a keypad input.
