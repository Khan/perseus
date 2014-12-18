Perseus Mobile API
------------------

Perseus widgets which have input boxes need to implement an API so that the
mobile app can correctly interact with them.

The current widgets which have input boxes are:
 - expression
 - input-number
 - numeric-input
 - table
 - matrix
 - number-line
 - transformer
 - simulator
 - unit

The main data used is the "input path", which is a list of strings uniquely
identifying the specific input box. A path might look like

    ["matrix 3", "0", "2"]

Where `"matrix-3"` is the name of the top-level widget, and `"0"` and `"2"` are
paths internal to the `matrix` widget which identify one of the cells inside it
(in this case, the `"0"` refers to the row in the matrix, and `"2"` refers to
the column).

### API Functions to Implement

```js
function getInputPaths()
  // -> List of input paths inside the widget
```
Returns a list of all inputs found within the widget. The paths are relative to
the widget, so returning a `[]` path indicates that the widget itself is the
input box, or the matrix widget returns a list like:
```js
[
  ["0", "0"],
  ["0", "1"],
  ...
]
```
As of this writing, there are no widgets which contain other widgets, but when
that does happen, this should include the paths of the inner widgets as well.

```js
function focus()
  // -> true if an input was focused, false otherwise
```
This API is mainly used to focus elements at the beginning of the exercise (it's
not actually called from mobile, but it's very related to the rest of the stuff
here). It should either focus one of its inputs and return true, or not focus
anything and return false. The return value is used by widgets (e.g. expression)
which we don't want to focus at the beginning of the exercise.

```js
function focusInputPath(inputPath)
```
Given an input path relative to the widget, focus that input. For example, if
the path `["0", "1"]` was passed to the matrix widget, it should focus the cell
corresponding to that path.

```js
function blurInputPath(inputPath)
```
Given an input path relative to the widget, blur that input. The opposite of
`focusInputPath`.

```js
function setInputValue(inputPath, value, callback)
```
Set the value at the input path to the specified value, then call the callback.
The callback should probably be passed as the callback to `this.props.onChange`,
and not called directly.

```js
function getDOMNodeForPath(inputPath)
```
Given a path, return the DOM node for that input path. As a special case, if the
single DOM node that a widget contains is the input, this function can be left
un-implemented and the widget's DOM node will be used instead. (For example,
input-number only has the input in it, so it doesn't need to implement this).

```js
function getGrammarTypeForPath(inputPath)
```
Given a path, return the kind of grammar that should be used when taking input
from the user (this should be a string). As of writing, possible values are:
 - `"number"`
 - `"expression"`

```js
this.props.onFocus(inputPath)
```
Should be called whenever one of the inputs is focused with the input path of
the input.

```js
this.props.onBlur(inputPath)
```
Should be called whenever one of the inputs is blurred with the input path of
the input.

### API options props

Your widget should allow the `APIOptions` props, which can easily be done by
adding
```js
getDefaultProps: function() {
    return {
        ...
        apiOptions: ApiOptions.defaults,
        ...
    };
}
```

The input component that you use must be one that interacts correctly with
mobile. Currently, the main component to use is a `MathOutput`, which will
correctly render the LaTeX that the mobile API sends down, and will display
correctly on mobile.

When the API option `apiOptions.staticRender` is set to true, you should use the
`MathOutput` inputs instead of whatever else you were using. Alternatively, you
can pass the string `"tex"` as the type to an `InputWithExamples` and it will
automatically do the right thing.
