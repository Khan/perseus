const _ = require("underscore");
const GraphieClasses = require("./graphie-classes.jsx");
const Interactive2 = require("../interactive2.js");

const KhanColors = require("../util/colors.js");

const MovablePoint = GraphieClasses.createClass({
    displayName: "MovablePoint",

    movableProps: ["children"],

    _getProps: function() {
        if (this.props.isMobile) {
            const isMobile = this.props.isMobile;

            // TODO(kevinb) precompute commonStyle and commonMobileStyle
            /* eslint-disable indent */
            const commonStyle = isMobile
                ? {
                      stroke: "#ffffff",
                      "stroke-width": 3,
                      fill: KhanColors.INTERACTIVE,
                  }
                : {
                      stroke: KhanColors.INTERACTIVE,
                      fill: KhanColors.INTERACTIVE,
                  };

            // TODO(kevinb) precompute normalStyle and normalMobileStyle
            const normalStyle = isMobile
                ? Object.assign(
                      commonStyle,
                      this.props.mobileStyleOverride || {}
                  )
                : Object.assign(commonStyle, this.props.normalStyle);

            // TODO(kevinb) precompute highlightStyle and highlightMobileStyle
            const highlightStyle = isMobile
                ? {
                      ...commonStyle,
                      "stroke-width": 0,
                      scale: 0.75,
                  }
                : this.props.highlightStyle;
            /* eslint-enable indent */

            const addedProps = Object.assign(
                {
                    normalStyle: normalStyle,
                    highlightStyle: highlightStyle,
                    shadow: isMobile,
                    tooltip: isMobile && this.props.showTooltips,
                },
                isMobile ? {pointSize: 7} : {}
            );

            return Object.assign(this.props, addedProps);
        } else {
            return this.props;
        }
    },

    add: function(graphie) {
        this.point = Interactive2.addMovablePoint(graphie, this._getProps());
    },

    modify: function() {
        this.point.modify(this._getProps());
    },

    remove: function() {
        this.point.remove();
    },

    toFront: function() {
        this.point.toFront();
    },

    grab: function(coord) {
        this.point.grab(coord);
    },
});

// Include helper methods, such as MovablePoint.constrain.snap()
_.extend(MovablePoint, Interactive2.MovablePoint);

const MovableLine = GraphieClasses.createClass({
    displayName: "MovableLine",

    movableProps: ["children"],

    add: function(graphie) {
        // Add MovablePoint children
        const points = _.pluck(this.props.children, "point");
        const props = _.extend({}, this.props, {
            points: points,
        });
        this.line = Interactive2.addMovableLine(graphie, props);
    },

    modify: function() {
        // Add MovablePoint children
        const points = _.pluck(this.props.children, "point");
        const props = _.extend({}, this.props, {
            points: points,
        });
        this.line.modify(props);
    },

    remove: function() {
        this.line.remove();
    },

    toFront: function() {
        this.line.toFront();
    },
});

// Include helper methods, such as MovableLine.constrain.snap()
_.extend(MovableLine, Interactive2.MovableLine);

const Label = GraphieClasses.createSimpleClass((graphie, props) => {
    let coord = props.coord;
    if (props.unscaled) {
        coord = graphie.unscalePoint(coord);
    }

    return graphie.label(
        coord,
        props.text,
        props.direction,
        props.tex,
        props.style
    );
});

const Line = GraphieClasses.createClass({
    displayName: "Line",

    movableProps: ["children"],

    add: function(graphie) {
        const props = this.props;
        this.graphie = graphie;
        this.line = this.graphie.line(props.start, props.end, props.style);
    },

    modify: function() {
        const props = this.props;
        const path = this.graphie.svgPath([props.start, props.end]);
        this.line.attr(_.extend({}, props.style, {path: path}));
    },

    remove: function() {
        this.line.remove();
    },

    toFront: function() {
        this.line.toFront();
    },
});

const Parabola = GraphieClasses.createClass({
    displayName: "Parabola",

    movableProps: ["children"],

    add: function(graphie) {
        const props = this.props;
        this.graphie = graphie;
        this.parabola = this.graphie.parabola(
            props.a,
            props.b,
            props.c,
            props.style
        );
    },

    modify: function() {
        const props = this.props;
        const path = this.graphie.svgParabolaPath(props.a, props.b, props.c);
        this.parabola.attr(_.extend({}, props.style, {path: path}));
    },

    remove: function() {
        this.parabola.remove();
    },

    toFront: function() {
        this.parabola.toFront();
    },
});

const Sinusoid = GraphieClasses.createClass({
    displayName: "Sinusoid",

    movableProps: ["children"],

    add: function(graphie) {
        const props = this.props;
        this.graphie = graphie;
        this.sinusoid = this.graphie.sinusoid(
            props.a,
            props.b,
            props.c,
            props.d,
            props.style
        );
    },

    modify: function() {
        const props = this.props;
        const path = this.graphie.svgSinusoidPath(
            props.a,
            props.b,
            props.c,
            props.d
        );
        this.sinusoid.attr(_.extend({}, props.style, {path: path}));
    },

    remove: function() {
        this.sinusoid.remove();
    },

    toFront: function() {
        this.sinusoid.toFront();
    },
});

const Plot = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.plot(props.fn, props.range, props.style);
});

const PlotParametric = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.plotParametric(props.fn, props.range, props.style);
});

const Point = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.ellipse(props.coord, graphie.unscaleVector([4, 4]), {
        fill: props.color || KhanColors.BLACK,
        stroke: props.color || KhanColors.BLACK,
    });
});

const Path = GraphieClasses.createClass({
    displayName: "Path",

    movableProps: ["children"],

    add: function(graphie) {
        const props = this.props;
        this.graphie = graphie;
        this.path = this.graphie.path(props.coords, props.style);
    },

    modify: function() {
        const props = this.props;
        const path = this.graphie.svgPath(props.coords);
        this.path.attr({path: path});
    },

    remove: function() {
        this.path.remove();
    },

    toFront: function() {
        this.path.toFront();
    },
});

const Arc = GraphieClasses.createSimpleClass((graphie, props) => {
    let center = props.center;
    let radius = props.radius;
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

const Circle = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.circle(props.center, props.radius, props.style);
});

const Rect = GraphieClasses.createSimpleClass((graphie, props) => {
    return graphie.rect(
        props.x,
        props.y,
        props.width,
        props.height,
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
    Sinusoid: Sinusoid,
    Rect: Rect,
};
