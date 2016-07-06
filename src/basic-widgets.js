/* globals __EDITOR__ */

// As new widgets get added here, please also make sure they get added in
// webapp perseus/traversal.py so they can be properly translated.
module.exports = [
    [require("./widgets/radio.jsx"),
     __EDITOR__ && require("./widgets/radio/editor.jsx")],
    [require("./widgets/input-number.jsx"),
     __EDITOR__ && require("./widgets/input-number-editor.jsx")],
    [require("./widgets/numeric-input.jsx"),
     __EDITOR__ && require("./widgets/numeric-input-editor.jsx")],
    [require("./widgets/expression.jsx"),
     __EDITOR__ && require("./widgets/expression-editor.jsx")],
];

