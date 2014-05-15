# Perseus

Perseus is Khan Academy's new exercise question editor and renderer. It allows
you to create and display interactive questions.

## Live demo

Our test page isn't much yet, but you can check out a
[live demo of it here](http://khan.github.io/perseus/)!

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

Also, within your editor, write the function 
```
toJSON: function() => {return _(this.props).omit("onChange");}
```
This is the function that Perseus uses to communicate the editor’s information to the renderer. Thus, `this.props` should be a fully accurate and minimal representation of that editor. Note that we’re only communicating the information in `this.props` (as opposed to those within `this.state`), so try to remain `state`-less or use as little state as possible. One appropriate way to use state is to achieve some transient effect (i.e. TextListEditor uses state to prevent the immediate removal of an empty input text box, but if the editor was rerendered, the empty input boxes would be gone). (Also, if you’re wondering why we omit the onChange function, it's complicted, but if interested, keep reading below).

If you're confused by what this `_(notation).is()`, see [underscorejs.org](http://underscorejs.org). We also have some features of ecmascript 6 enabled, so if you see `x => x * this.multiplier`, that's an [arrow function](http://www.nczonline.net/blog/2013/09/10/understanding-ecmascript-6-arrow-functions/). We also have [rest parameters](http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html) and [templates](http://www.nczonline.net/blog/2012/08/01/a-critical-review-of-ecmascript-6-quasi-literals/), only in .jsx files.


### Behind the Curtains
In order to get the information from the editor to the renderer, there is big chain of calls of `toJSON` calls with the following hierarchy: 
```
TOP: StatefulEditorPage -> EditorPage -> ItemEditor -> Editor -> WidgetEditor -> (widget’s editor) : BOTTOM
```
It’s at the `EditorPage` level that `updateRenderer` takes `EditorPage.toJSON` and passes it to `ItemRenderer`, which (on mounting) passes that information to three additional components: `Renderer`, `AnswerAreaRenderer`, and `HintsRenderer`. Each of those in turn identifies the widget type and inserts the information. (In the future, we may streamline this process, delete the toJSON function at the widget’s editor level, and simply extract the props of the widget directly.)

But you might be wondering, "how does it know to update?" That's why we use a heirarchical paradigm of calling 
```
this.props.onChange({updatedParam: newValue}, callbackFunction)
```
for every update-worthy instance. Similar to toJSON, it goes all the way up the hierarchy above and then comes all the way back down, rerendering everything. And this happens on: every. single. user. interaction. Good thing Javascript is fast.

Also, FYI, there is nothing particularly special about the function name `onChange`; it’s just the one we’re using (it could just as equally be `onUpdate` or `propogateChangesUpwards`). We’re mentioning that expliciting because syntax highlighting may think that it’s the `onChange` event, which its not.


## Mini-Projects

Want to help out? Here are some well-scoped improvements we could use:
- **Show messages on user input in test.html**: In production, there is a message box
  that shows various clues to the user ("You didn't simplify" or "You used x instead of *").
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

## Questions?

This was written rather hastily, and is probably not in-depth enough to
be super useful (yet). If you have questions or would like to contribute,
please stop by our [public chat room](http://www.hipchat.com/gBuXeXUWH)!

## Styles

* `stylesheets/perseus-admin-package` has the styles for the Perseus item
    editor and the rest of the admin pages.
* `stylesheets/exercise-content-package` has styles that are shared with
    exercises.

## License

[MIT License](http://opensource.org/licenses/MIT)
