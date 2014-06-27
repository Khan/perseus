## Getting started locally

    git clone git@github.com:Khan/perseus.git
    git submodule init
    git submodule update

After cloning the repo and initializing the submodule, you'll want to open
test.html, which is the main page.

You'll need to serve the files from some sort of a server. You can't just open
the files directly in a browser.

We recommend installing `npm` and `make`, and running 'make server'

    cd perseus
    make server PORT=9000

Now if you open your browser to `http://localhost:9000/test.html`
(or `http://127.0.0.1:9000/test.html`) you should see the Perseus
question editor.


## Fundamental technologies

Here are some technologies that will be important to be familiar with to work with
the Perseus source code:
 * We create all Perseus components, including widgets, with
   [React.js](http://facebook.github.io/react/).
 * We use [underscore](http://underscorejs.org/) for various collection utility
   functions.
 * We are using several features of ECMAScript 6; most notably
   [arrow functions](http://www.nczonline.net/blog/2013/09/10/understanding-ecmascript-6-arrow-functions/).
   (All es6 features are compiled to es5 when building Perseus using `make`.)
 * We compile our CSS with [Less](http://lesscss.org/).
 * Some parts of question rendering, answer checking, and hint display are handled
   by [khan-excercises](https://github.com/Khan/khan-exercises), our legacy
   exercise framework. We also make heavy use of
   [Graphie](https://github.com/Khan/khan-exercises/blob/master/utils/graphie.js),
   which exists within khan-exercises.

And here are some other technologies we use, which are only used by specific
parts of the code (and aren't necessary to understand to work with Perseus code):
 * We render math text with [KaTeX](https://github.com/Khan/KaTeX) and
   [MathJax](http://www.mathjax.org/).
 * We render Markdown with [marked-react](https://github.com/spicyj/marked-react),
   a port of the [marked](https://github.com/chjj/marked) Markdown renderer to
   React.js
 * We use [jQuery](http://jquery.com/) for low-level dom manipulation for things
   that are not possible with React.js
 * We use [Browserify](http://browserify.org/) to provide Node.js style `require`
   dependencies.


## Adding widgets

Most of the interactive parts of perseus questions are widgets, such
as number-input or transformer. To add more interaction to questions,
you probably want to create a new widget or modify an existing widget.

Widgets are all defined in the `src/widgets/` directory, and loaded in src/all-widgets.js.

Each widget consists of the following parts:
 * A `name` which is a unique id slug, such as `number-input` or `example-widget`
    * *Note: This id should only contain lowercase alphabetic characters and dashes.*
 * A `displayName` which is shown to the user in the "Add widget" menu
 * A `widget` or "widget renderer", such as NumberInput or ExampleWidget
 * An `editor` or "widget editor", such as NumberInputEditor or ExampleWidgetEditor
 * An options `transform` transformation function, which converts the result of
   `widgetEditor.toJSON()` (generally the editor's props) to the widget renderer's
   props
 * An options `hidden` flag, which, if `true`, will prevent the widget from being
   available in the widget menu

These are exported in an object at the bottom of every widget file:

Widgets are a combination of two [React](http://facebook.github.io/react/)
components: a renderer (i.e. ExampleWidget), and an editor (i.e ExampleWidgetEditor).
These are defined in `src/widgets/example-widget.jsx`, and registered at the
bottom of that file.

    module.exports = {
        name: "example-widget",
        displayName: "Example Widget",
        hidden: true,   // Hides this widget from the Perseus.Editor widget select
        widget: ExampleWidget,
        editor: ExampleWidgetEditor
    };


Then `src/all-widgets.js` `require`s this widget to register it:


### The relationship between Editors and Widgets

In order to write a functioning widget, it will be important to manage the relationship between the widget's editor, the widget's renderer (aka the widget), and the datastore.

The datastore is the canonical representation of the question. Here's an example of what a simple question looks like:

    item = {
        "question": {
            "content": "What is $1 + 1$? [[☃ input-number 1]]",
            "images": {},
            "widgets": {
                "input-number 1": {
                    "type": "input-number",
                    "graded": true,
                    "options": {
                        "value": 2,
                        "simplify": "required",
                        "size": "small",
                        "inexact": false,
                        "maxError": 0.1,
                        "answerType": "number"
                    }
                }
            }
        },
        "answerArea": {
            "type": "multiple",
            "options": {
                "content": "Enter the answer in the blank to the left.",
                "images": {},
                "widgets": {}
            },
            "calculator": false
        },
        "hints": []
    }

The relevant portion of this for a widget is inside `item.question.widgets["input-number 1"]`,
which is the JSON representation of an `input-number` widget:

    "input-number 1": {
        "type": "input-number",
        "graded": true,
        "options": {
            "value": 2,
            "simplify": "required",
            "size": "small",
            "inexact": false,
            "maxError": 0.1,
            "answerType": "number"
        }
    }

This is the representation of an `input-number` that is stored in the datastore.
The `options` field represents the props that are sent to the editor for
`input-number` (`InputNumberEditor`).
**The JSON in the datastore is sent as the props to the widget editor.**

However, this is not the end of the story of the editor's props. This json
version of the props may end up being modified by the editor itself. The most
common way this happens is through `getDefaultProps()`, where a widget editor
might expand upon the props sent to it from the datastore with other values
that it considers to be missing from these.

As the widget editor is modified (for example, the question writer changes
the correct value of the input number to 3), the widget editor will call

    this.props.onChange({
        value: 3
    });

The `props.onChange` function is passed into the widget editor by the Perseus
`Editor` component, and allows a widget editor to tell the `Editor` to send it
different props. This pattern is so common that it has been made into a
mixin, `Changeable`, which provides `this.change`:

    var Changeable = require("../mixins/changeable");
    
    var ExampleWidgetEditor = React.createClass({
        // ...
        mixins: [Changeable]
        
        // ...
        handleAnswerChange(event) {
            this.change({
                correct: event.target.value
            })
        }
        // ...
    });
    
After this change, the following props will be sent down to the
`ExampleWidgetEditor` by the `Editor`:

    "options": {
        "value": 3,
        "simplify": "required",
        "size": "small",
        "inexact": false,
        "maxError": 0.1,
        "answerType": "number"
    }
    
At this point, the question writer probably would like to save the item.
When they save the item, the widget editor's `toJSON()` function is called,
and the result is set as the `options` field for that widget and stored in
the datastore. **The result of `toJSON()` is stored in the datastore.**
It is important to note that when the question is loaded again, that
result of `toJSON()` that has been stored in the datastore will be sent
as the props of the widget editor. For that reason,
**it is important for toJSON to return an object compatible with the editor's props**.

While it is possible to return things other than the editor's props from
`toJSON()`, this is not recommended, and all future widgets should return a
strict subset of their editor's props in `toJSON()`. Since this pattern is
quite common, we have a mixin to create a correct `toJSON()` function:
`JsonifyProps`. Adding `JsonifyProps` to the mixins of the widget editor
gives the widget editor a `toJSON()` function that returns the widget
editor's props minus special props used by React or Perseus.

From here, it is important to understand how these editor props relate to
the widget renderer's props. The widget renderer's props are created by
calling the `transform` function exported by the widget on the result
of the widget editor's `toJSON()` function (or equivalently on the props
from the datastore). If no `transform` function is registered, the
identity function is used in its place. For this reason, many legacy
widgets have the same format for their editor props and renderer props,
however, this conflation is no longer necessary, and in most cases
an explicit `transform` function can make prop logic clearer.


### Between the widgets

In order to get the information from the editor to the renderer, there is big chain of calls of `toJSON` calls with the following hierarchy: 

    TOP: StatefulEditorPage -> EditorPage -> ItemEditor -> Editor -> WidgetEditor -> (widget’s editor) : BOTTOM

It’s at the `EditorPage` level that `updateRenderer` takes `EditorPage.toJSON` and passes it to `ItemRenderer`, which (on mounting) passes that information to three additional components: `Renderer`, `AnswerAreaRenderer`, and `HintsRenderer`. Each of those in turn identifies the widget type and inserts the information. (In the future, we may streamline this process, delete the toJSON function at the widget’s editor level, and simply extract the props of the widget directly.)

But you might be wondering, "how does it know to update?" That's why we use a heirarchical paradigm of calling 

    this.props.onChange({updatedParam: newValue}, callbackFunction)

for every update-worthy instance. Similar to toJSON, it goes all the way up the hierarchy above and then comes all the way back down, rerendering everything. The results of these renders are then diffed by React, preventing them from causing unnecessary DOM manipulation (and keeping this whole process fast).

Note that there is nothing special about the function `onChange`--that name
is just a convention, and not related to the DOM's `onChange` event, except
in as much as the default React objects use onChange in a way similarly to
ours because of the DOM event.


## Mini-Projects

Want to help out? Here are some well-scoped improvements we could use:
- **Show messages on user input in test.html**: In production, there is a message box
  that shows various clues to the user ("You didn't simplify" or "You used x instead of \*").
  But those clues don't show up in Perseus for whatever reason. Essentially onClick of 
  the score button or (if the above mini-project is done) the green button, there should be
  a message that appears. This is becoming more important as these little clues are now going
  mainstream, with content creators able to add their own custom-tailored hints.
- **Improve the way the above clues are shown for in-line widgets**: It depends on the widget, but
  for non-answer-area widgets, it would be nice if they showed up somewhere close to the
  widget in some obvious and perhaps playful way (I'm thinking error-buddy). That way, the
  user knows which part they got wrong in a multi-part question, and potentially why too!
- **Add angle-snapping to rays in src/widgets/interactive-graph:** Both points on a ray
  currently snap to the graphie grid. However, for many questions, we care about the angle
  of the ray, and would rather snap to degree multiples, say 5, 10, 15, degrees....
  To change this, take a look at how angle snapping works in the interactive-graph
  angle. Specifically, we would probably want to add a new dropdown for snap mode, set
  to maybe "grid" or "angle", and when set to angle, there would be additional
  snapDegrees and snapOffset props (the same ones used by the angle shape).
- **Add a coefficient type:** Add a type to input-number for use as a coeffient in
  polynomials. It would accept "" to mean 1 (an empty box in front of `x` means `1x`),
  and "-" as "-1", in addition to decimals and fractions.


## Styles

* `stylesheets/perseus-admin-package` has the styles for the Perseus item
    editor and the rest of the admin pages.
* `stylesheets/exercise-content-package` has styles that are shared with
    exercises.

## License

[MIT License](http://opensource.org/licenses/MIT)
