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
    }
});

// Include helper methods, such as MovablePoint.constrain.snap()
_.extend(MovablePoint, Interactive2.MovablePoint);

var Line = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.line(props.start, props.end, props.style);
});

var Label = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.label(
        props.coord,
        props.text,
        props.direction,
        props.tex
    );
});

module.exports = {
    Line: Line,
    Label: Label,
    MovablePoint: MovablePoint
};
