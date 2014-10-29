var _ = require("underscore");
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
    var coord = props.coord;
    if (props.unscaled) {
        coord = graphie.unscalePoint(coord);
    }

    return graphie.label(
        coord,
        props.text,
        props.direction,
        props.tex
    );
});

var Line = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.line(props.start, props.end, props.style);
});

var Parabola = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.parabola(props.a, props.b, props.c, props.style);
});

var Sinusoid = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.sinusoid(props.a, props.b, props.c, props.d, props.style);
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

var Path = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.path(
        props.coords,
        props.style
    );
});

var Arc = GraphieClasses.createSimpleClass((graphie, props) => {
    var center = props.center;
    var radius = props.radius;
    if (props.unscaled) {
        center = graphie.unscalePoint(center);
        radius = graphie.unscaleVector(radius);
    }

    return graphie.arc(
        center,
        radius,
        props.startAngle,
        props.endAngle,
        props.sector,
        props.style
    );
});

var Circle = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.circle(
        props.center,
        props.radius,
        props.style
    );
});

module.exports = {
    Arc: Arc,
    Circle: Circle,
    Label: Label,
    Line: Line,
    MovableLine: MovableLine,
    MovablePoint: MovablePoint,
    Parabola: Parabola,
    Path: Path,
    Plot: Plot,
    PlotParametric: PlotParametric,
    Point: Point,
    Sinusoid: Sinusoid
};
