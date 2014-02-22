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

## Adding widgets

Most of the interactive parts of perseus questions are widgets, such
as number-input or transformer. To add more interaction to questions,
you probably want to create a new widget or modify an existing widget.

Widgets are all defined in src/widgets, and loaded in src/all-widgets.js.
Widgets are a combination of two [React](http://facebook.github.io/react/)
components: a renderer (NumberInput), and an editor (NumberInputEditor).
These are defined in src/widgets/number-input.jsx, and registered at the
bottom of that file. That file is then require'd by src/all-widgets.js.

## Mini-Projects

Want to help out? Here are some well-scoped problems for you:
- **Allow validation of user input for the renderer:** At the moment, we have
  a file, test.html, which has an editor on the left and a renderer on the right.
  On the top-left is a "Score" button which allows you to see in the console what
  is returned `{correct: true, empty: false, message: "hi"}` given the input on the
  renderer. Essentially you'd be moving the logic behind that "Score" button to the
  big, currently disabled, green "Check Answer" button. On checking, it should show
  the smiley (if correct), shake (if wrong) and show a message (if there is one, 
  whether it is right, wrong, or ungraded). Then rather than go to the next problem,
  if clicked again, it should reset the page to what it originally was before user input.

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
