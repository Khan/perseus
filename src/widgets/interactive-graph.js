/** @jsx React.DOM */
(function(Perseus) {

function eq(x, y) {
    return Math.abs(x - y) < 1e-9;
}

function ccw(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

function collinear(a, b, c) {
    return eq(ccw(a, b, c), 0);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var InteractiveGraph = React.createClass({
    defaultState: {
        // TODO(alpert): Configurable graph range
        snap: 0.5,
        scale: 20,
        graph: {
            type: "linear"
        }
    },

    graphDefaults: {
        linear: {
            coords: [[-5, 5], [5, 5]]
        },
        quadratic: {
            coords: [[-5, 5], [0, 5], [5, 5]]
        },
        circle: {
            center: [0, 0],
            radius: 2
        },
        point: {
            coord: [0, 0]
        }
    },

    // Don't mix in PropsToState directly since we're adding to all three like
    // this:

    componentWillReceiveProps: function(nextProps) {
        // TODO(alpert): Switch to using props more as it's much cleaner here
        _.defaults(nextProps.graph, this.graphDefaults[nextProps.graph.type]);
        Perseus.Util.PropsToState.componentWillReceiveProps.call(
                this, nextProps);
    },

    getInitialState: function() {
        var state = Perseus.Util.PropsToState.getInitialState.call(this);
        _.defaults(state.graph, this.graphDefaults[state.graph.type]);
        return state;
    },

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        Perseus.Util.PropsToState.componentDidUpdate.call(
                this, prevProps, prevState, rootNode);
        var oldType = prevState.graph.type;
        var newType = this.state.graph.type;
        if (oldType !== newType) {
            this["remove" + capitalize(oldType) + "Controls"]();
            this["add" + capitalize(newType) + "Controls"]();
        }
    },

    render: function() {
        var typeSelect;
        if (this.props.flexibleType) {
            typeSelect = <select
                    ref="typeSelect"
                    onChange={function(e) {
                        var type = e.target.value
                        //debugger;
                        this.setState({
                            graph: _.extend({type: type},
                                    this.graphDefaults[type])
                        });
                    }.bind(this)}>
                <option value="linear">Linear function</option>
                <option value="quadratic">Quadratic function</option>
                <option value="circle">Circle</option>
                <option value="point">Point</option>
            </select>;
        }

        return <span className={"perseus-widget " +
                    "perseus-widget-interactive-graph"}
                style={{padding: "25px 25px 0 0"}}>
            <span className="graphie" ref="graphieDiv" />
            {typeSelect}
        </span>;
    },

    componentDidMount: function() {
        var graphie = this.graphie = KhanUtil.createGraphie(
                this.refs.graphieDiv.getDOMNode());
        graphie.graphInit({
            range: 10,
            scale: this.state.scale,
            axisArrows: "<->",
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            tickStep: 1,
            labelStep: 1
        });
        graphie.label([0, 10], "y", "above");
        graphie.label([10, 0], "x", "right");
        graphie.addMouseLayer();

        var type = this.state.graph.type;
        this["add" + capitalize(type) + "Controls"]();

        // TODO(alpert): How to do this at initialization instead of here?
        if (this.refs.typeSelect) {
            this.refs.typeSelect.getDOMNode().value = type;
        }
    },

    getEquationString: function() {
        var type = this.state.graph.type;
        return this["get" + capitalize(type) + "EquationString"]();
    },

    addLinearControls: function() {
        var graphie = this.graphie;

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: this.state.graph.coords[0],
            snapX: this.state.snap,
            snapY: this.state.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: this.state.graph.coords[1],
            snapX: this.state.snap,
            snapY: this.state.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var line = this.line = graphie.addMovableLineSegment({
            pointA: pointA,
            pointZ: pointB,
            fixed: true,
            extendLine: true
        });

        // A and B can't be in the same place
        pointA.onMove = function(x, y) {
            return !_.isEqual([x, y], pointB.coord);
        };
        pointB.onMove = function(x, y) {
            return !_.isEqual([x, y], pointA.coord);
        };

        $([pointA, pointB]).on("move", function() {
            var graph = _.extend({}, this.state.graph, {
                coords: [pointA.coord, pointB.coord]
            });
            this.setState({graph: graph});
        }.bind(this));
    },

    getLinearEquationString: function() {
        var coords = [this.pointA.coord, this.pointB.coord];
        if (eq(coords[0][0], coords[1][0])) {
            return "x = " + coords[0][0].toFixed(3);
        } else {
            var m = (coords[1][1] - coords[0][1]) /
                    (coords[1][0] - coords[0][0]);
            var b = coords[0][1] - m * coords[0][0];
            return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
        }
    },

    removeLinearControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        this.line.remove();
    },

    addQuadraticControls: function() {
        //debugger;
        var graphie = this.graphie;

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: this.state.graph.coords[0],
            snapX: this.state.snap,
            snapY: this.state.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: this.state.graph.coords[1],
            snapX: this.state.snap,
            snapY: this.state.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointC = this.pointC = graphie.addMovablePoint({
            coord: this.state.graph.coords[2],
            snapX: this.state.snap,
            snapY: this.state.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        // A, B, and C can't be in the same place
        pointA.onMove = function(x, y) {
            return x !== pointB.coord[0] && x !== pointC.coord[0];
        };
        pointB.onMove = function(x, y) {
            return x !== pointA.coord[0] && x !== pointC.coord[0];
        };
        pointC.onMove = function(x, y) {
            return x !== pointA.coord[0] && x !== pointB.coord[0];
        };

        this.updateQuadratic();

        $([pointA, pointB, pointC]).on("move", function() {
            var graph = _.extend({}, this.state.graph, {
                coords: [pointA.coord, pointB.coord, pointC.coord]
            });
            this.setState({graph: graph});
            this.updateQuadratic();
        }.bind(this));
    },

    getQuadraticCoefficients: function() {
        return InteractiveGraph.quadraticCoefficients(this.state.graph.coords);
    },

    getQuadraticEquationString: function() {
        var coeffs = this.getQuadraticCoefficients();
        return "y = " + coeffs[0].toFixed(3) + "x^2 + " +
                        coeffs[1].toFixed(3) + "x + " +
                        coeffs[2].toFixed(3);
    },

    updateQuadratic: function() {
        if (this.parabola) {
            this.parabola.remove();
        }

        var coeffs = this.getQuadraticCoefficients();
        if (!coeffs) {
            return;
        }

        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        this.parabola = this.graphie.plot(function(x) {
            return (a * x + b) * x + c;
        }, [-10, 10]).attr({
            stroke: KhanUtil.BLUE
        });
        this.parabola.toBack();
    },

    removeQuadraticControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        this.pointC.remove();
        if (this.parabola) {
            this.parabola.remove();
        }
    },

    addCircleControls: function() {
        var graphie = this.graphie;

        var circle = this.circle = graphie.addCircleGraph({
            center: this.state.graph.center,
            radius: this.state.graph.radius
            // TODO(alpert): addCircleGraph doesn't take snap yet
        });

        $(circle).on("move", function() {
            var graph = _.extend({}, this.state.graph, {
                center: circle.center,
                radius: circle.radius
            });
            this.setState({graph: graph});
        }.bind(this));
    },

    getCircleEquationString: function() {
        var graph = this.state.graph;
        var center = graph.center;
        return "center (" + center[0] + ", " + center[1] + "), radius " +
                graph.radius;
    },

    removeCircleControls: function() {
        this.circle.remove();
    },

    addPointControls: function() {
        var graphie = this.graphie;

        var point = this.point = graphie.addMovablePoint({
            coord: this.state.graph.coord,
            snapX: this.state.snap,
            snapY: this.state.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        $(point).on("move", function() {
            var graph = _.extend({}, this.state.graph, {
                coord: point.coord
            });
            this.setState({graph: graph});
        }.bind(this));
    },

    getPointEquationString: function() {
        var graph = this.state.graph;
        return "(" + graph.coord[0] + ", " + graph.coord[1] + ")";
    },

    removePointControls: function() {
        this.point.remove();
    },

    toJSON: function() {
        return this.state.graph;
    },

    simpleValidate: function(rubric) {
        return InteractiveGraph.validate(this.toJSON(), rubric);
    },

    focus: $.noop
});


_.extend(InteractiveGraph, {
    quadraticCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];
        var p3 = coords[2];

        var denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
        if (denom === 0) {
            return;
        }
        var a = (p3[0] * (p2[1] - p1[1]) +
                 p2[0] * (p1[1] - p3[1]) +
                 p1[0] * (p3[1] - p2[1])) / denom;
        var b = ((p3[0] * p3[0]) * (p1[1] - p2[1]) +
                 (p2[0] * p2[0]) * (p3[1] - p1[1]) +
                 (p1[0] * p1[0]) * (p2[1] - p3[1])) / denom;
        var c = (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
                 p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
                 p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) / denom;
        return [a, b, c];
    },

    validate: function(state, rubric) {
        if (state.type === rubric.correct.type) {
            if (state.type === "linear") {
                var guess = state.coords;
                var correct = rubric.correct.coords;
                // If both of the guess points are on the correct line, it's
                // correct.
                if (collinear(correct[0], correct[1], guess[0]) &&
                        collinear(correct[0], correct[1], guess[1])) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "quadratic") {
                // If the parabola coefficients match, it's correct.
                var guessCoeffs = this.quadraticCoefficients(state.coords);
                var correctCoeffs = this.quadraticCoefficients(
                        rubric.correct.coords);
                if (eq(guessCoeffs[0], correctCoeffs[0]) &&
                        eq(guessCoeffs[1], correctCoeffs[1]) &&
                        eq(guessCoeffs[2], correctCoeffs[2])) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "circle") {
                if (eq(state.center[0], rubric.correct.center[0]) &&
                        eq(state.center[1], rubric.correct.center[1]) &&
                        eq(state.radius, rubric.correct.radius)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "point") {
                console.log(state);
                console.log(rubric);
                if (state.coord[0] === rubric.correct.coord[0] &&
                        state.coord[1] === rubric.correct.coord[1]) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            }
        }

        // The input wasn't correct, so check if it's a blank input or if it's
        // actually just wrong
        if (_.isEqual(state, rubric.graph)) {
            // We're where we started.
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


var InteractiveGraphEditor = React.createClass({
    className: "perseus-widget-interactive-graph",

    defaultState: {
        correct: {
            type: "linear",
            coords: [[-5, 5], [5, 5]]
        }
    },

    mixins: [Perseus.Util.PropsToState],

    render: function() {
        return <div className="perseus-widget-interactive-graph">
            <div>Correct answer: {this.state.equationString}</div>
            <InteractiveGraph
                ref="graph"
                scale={18}
                graph={this.state.correct}
                flexibleType={true}
                onChange={this.updateEquationString} />
        </div>;
    },

    componentDidMount: function() {
        setTimeout(this.updateEquationString.bind(this), 0);
    },

    updateEquationString: React.autoBind(function() {
        setTimeout(function() {
            this.setState({
                correct: this.refs.graph.toJSON(),
                equationString: this.refs.graph.getEquationString()
            });
        }.bind(this), 0);
    }),

    toJSON: function() {
        var correct = this.refs.graph.toJSON();
        return {
            // TODO(alpert): Allow specifying flexibleType (whether the graph
            // type should be a choice or not)
            graph: {type: correct.type},
            correct: correct
        };
    }
});

Perseus.Widgets.register("interactive-graph", InteractiveGraph);
Perseus.Widgets.register("interactive-graph-editor", InteractiveGraphEditor);

})(Perseus);
