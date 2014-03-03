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

Want to help out? Here are some well-scoped improvements we could use:
- **Allow validation of user input for the item-renderer in test.html:** At the moment, we have
  a file, test.html, which has an editor on the left and a renderer on the right.
  On the top-left is a "Score" button which allows you to see in the console what
  is returned `{correct: true, empty: false, message: "hi"}` given the input on the
  renderer. Essentially you'd be moving the logic behind that "Score" button to the
  big, currently disabled, green "Check Answer" button. On checking, it should show
  the smiley (if correct), shake (if wrong) and show a message (if there is one, 
  whether it is right, wrong, or ungraded). Then rather than go to the next problem,
  if clicked again, it should reset the page to what it originally was before user input.
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
