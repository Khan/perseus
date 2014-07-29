var GraphieClasses = require("./graphie-classes.jsx");
var Interactive2 = require("../interactive2.js");
var InteractiveUtil = require("../interactive2/interactive-util.js");

var assert = InteractiveUtil.assert;

var MovablePoint = GraphieClasses.createClass({
    displayName: "MovablePoint",

    movableProps: ["children"],

    add: function(graphie) {
        this.point = Interactive2.addMovablePoint(graphie, this.props);
    },

    modify: function() {
        this.point.modify(this.props);
    },

    remove: function() {
        this.point.remove();
    },

    toFront: function() {
        this.point.toFront();
    },

    grab: function(coord) {
        this.point.grab(coord);
    }
});

// Include helper methods, such as MovablePoint.constrain.snap()
_.extend(MovablePoint, Interactive2.MovablePoint);

var MovableLine = GraphieClasses.createClass({
    displayName: "MovableLine",

    movableProps: ["children"],

    add: function(graphie) {
        // Add MovablePoint children
        var points = _.pluck(this.props.children, "point");
        var props = _.extend({}, this.props, {
            points: points
        });
        this.line = Interactive2.addMovableLine(graphie, props);
    },

    modify: function() {
        // Add MovablePoint children
        var points = _.pluck(this.props.children, "point");
        var props = _.extend({}, this.props, {
            points: points
        });
        this.line.modify(props);
    },

    remove: function() {
        this.line.remove();
    },

    toFront: function() {
        this.line.toFront();
    }
});

// Include helper methods, such as MovableLine.constrain.snap()
_.extend(MovableLine, Interactive2.MovableLine);

var Label = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.label(
        props.coord,
        props.text,
        props.direction,
        props.tex
    );
});

var Line = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.line(props.start, props.end, props.style);
});

var Plot = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.plot(props.fn, props.range, props.style);
});

var PlotParametric = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.plotParametric(props.fn, props.range, props.style);
});

var Point = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.ellipse(props.coord, graphie.unscaleVector([4, 4]), {
        fill: props.color || KhanUtil.BLACK,
        stroke: props.color || KhanUtil.BLACK,
    });
});

module.exports = {
    Label: Label,
    Line: Line,
    MovableLine: MovableLine,
    MovablePoint: MovablePoint,
    Plot: Plot,
    PlotParametric: PlotParametric,
    Point: Point
};
