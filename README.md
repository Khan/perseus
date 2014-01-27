# Perseus

Perseus is Khan Academy's new exercise question editor and renderer. It allows
you to create and display interactive questions.

## Getting started

After cloning the repo, you'll want to open test.html, which is the main page.

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

## Questions?

This was written rather hastily, and is probably not in-depth enough to
be super useful (yet). If you have questions or would like to contribute,
please stop by our [public chat room](http://www.hipchat.com/gBuXeXUWH)!

## Styles

* `stylesheets/perseus-admin-package` has the styles for the Perseus item
    editor and the rest of the admin pages.
* `stylesheets/exercise-content-package` has styles that are shared with
    exercises.
