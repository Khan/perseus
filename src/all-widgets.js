var Widgets = require("./widgets.js");

_.each([
    require("./widgets/categorizer.jsx"),
    require("./widgets/dropdown.jsx"),
    require("./widgets/example-widget.jsx"),
    require("./widgets/example-graphie-widget.jsx"),
    require("./widgets/expression.jsx"),
    require("./widgets/iframe.jsx"),
    require("./widgets/input-number.jsx"),
    require("./widgets/interactive-graph.jsx"),
    require("./widgets/interactive-number-line.jsx"),
    require("./widgets/lights-puzzle.jsx"),
    require("./widgets/matcher.jsx"),
    require("./widgets/matrix.jsx"),
    require("./widgets/measurer.jsx"),
    require("./widgets/number-line.jsx"),
    require("./widgets/numeric-input.jsx"),
    require("./widgets/orderer.jsx"),
    require("./widgets/plotter.jsx"),
    require("./widgets/radio.jsx"),
    require("./widgets/sorter.jsx"),
    require("./widgets/table.jsx"),
    require("./widgets/transformer.jsx"),
    require("./widgets/image.jsx"),
    require("./widgets/speaking-text-input.jsx"),
    require("./widgets/speaking-voice.jsx")
], function({name, editor, ...widget}) {
    Widgets.register(name, widget, editor);
});
