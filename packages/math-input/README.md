# @khanacademy/math-input

Khan Academy's expression editor for the mobile web. Used in the [Perseus](https://github.com/khan/perseus) exercise framework to power math input and expression editing on small screens.

Built with [React](https://github.com/facebook/react), [MathQuill](https://github.com/mathquill/mathquill), [Aphrodite](https://github.com/khan/aphrodite), and more.

![](https://cloud.githubusercontent.com/assets/1309177/15994911/d1acd29e-30c5-11e6-9707-6bef8e69114f.gif)

Try it yourself on [Khan Academy](https://www.khanacademy.org/math/algebra-basics/alg-basics-algebraic-expressions/alg-basics-distributive-property/e/distributive-property-with-variables). (Note: you'll need to enable mobile emulation, if you're accessing the site from a desktop browser.)

## Getting started

- Clone the project: `git clone git@github.com:Khan/math-input.git`
- Install dependencies: `yarn`
- Start the development server: `yarn start`

When you start the project you'll need to be on a device that supports touch or touch emulation to see the keyboard. The easiest way to get started is open the developer tools on Google Chrome.

## Supported Features

- Multiple keypad configurations, so as to accommodate a range of input types (i.e., fractions/mixed numbers, algebraic expressions).
- Multi-page keypads, with swipeable page navigation.
- Touch-and-drag interactions (as supported by the stock iOS and Android keypads).
- A draggable cursor with a detached handle, for fine-grained control on touch devices.
- Custom state transitions for the editing experience, to streamline expression entry.

![](https://cloud.githubusercontent.com/assets/1309177/15994912/d2b60cdc-30c5-11e6-8eb4-9086d76f327c.gif)

## License

[MIT License](http://opensource.org/licenses/MIT)
