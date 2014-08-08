var Widgets = require("./widgets.js");

_.each([
    require("./widgets/categorizer.jsx"),
    require("./widgets/dropdown.jsx"),
    require("./widgets/example-widget.jsx"),
    require("./widgets/example-graphie-widget.jsx"),
    require("./widgets/expression.jsx"),
    require("./widgets/grapher.jsx"),
    require("./widgets/iframe.jsx"),
    require("./widgets/image.jsx"),
    require("./widgets/input-number.jsx"),
    require("./widgets/interaction.jsx"),
    require("./widgets/interactive-graph.jsx"),
    require("./widgets/interactive-number-line.jsx"),
    require("./widgets/lights-puzzle.jsx"),
    require("./widgets/matcher.jsx"),
    require("./widgets/measurer.jsx"),
    require("./widgets/number-line.jsx"),
    require("./widgets/numeric-input.jsx"),
    require("./widgets/orderer.jsx"),
    require("./widgets/passage.jsx"),
    require("./widgets/passage-ref.jsx"),
    require("./widgets/passage-ref-target.jsx"),
    require("./widgets/plotter.jsx"),
    require("./widgets/radio.jsx"),
    require("./widgets/simulator.jsx"),
    require("./widgets/sorter.jsx"),
    require("./widgets/table.jsx"),
    require("./widgets/transformer.jsx")
], function(widget) {
    Widgets.register(widget.name, _.omit(widget, "name"));
});
