/** @jsx React.DOM */
(function(Perseus) {

function eq(x, y) {
    return Math.abs(x - y) < 1e-9;
}

/**
 * Deep approximate equality on numbers and arrays, not objects yet.
 */
function deepEq(x, y) {
    if (_.isArray(x) && _.isArray(y)) {
        if (x.length !== y.length) {
            return false;
        }
        for (var i = 0; i < x.length; i++) {
            if (!deepEq(x[i], y[i])) {
                return false;
            }
        }
        return true;
    } else if (_.isArray(x) || _.isArray(y)) {
        return false;
    } else {
        return eq(x, y);
    }
}

function ccw(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

function collinear(a, b, c) {
    return eq(ccw(a, b, c), 0);
}

function capitalize(str) {
    return str.replace(/(?:^|-)(.)/g, function(match, letter) {
        return letter.toUpperCase();
    });
}

function getLineEquation(first, second) {
    if (eq(first[0], second[0])) {
        return "x = " + first[0].toFixed(3);
    } else {
        var m = (second[1] - first[1]) /
                (second[0] - first[0]);
        var b = first[1] - m * first[0];
        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
    }
}

// Stolen from the wikipedia article
// http://en.wikipedia.org/wiki/Line-line_intersection
function getLineIntersection(firstPoints, secondPoints) {
    var x1 = firstPoints[0][0],
        y1 = firstPoints[0][1],
        x2 = firstPoints[1][0],
        y2 = firstPoints[1][1],
        x3 = secondPoints[0][0],
        y3 = secondPoints[0][1],
        x4 = secondPoints[1][0],
        y4 = secondPoints[1][1];

    var determinant = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (Math.abs(determinant) < 1e-9) {
        return "Lines are parallel"
    } else {
        var x = ((x1 * y2 - y1 * x2) * (x3 - x4) -
                 (x1 - x2) * (x3 * y4 - y3 * x4)) / determinant;
        var y = ((x1 * y2 - y1 * x2) * (y3 - y4) -
                 (y1 - y2) * (x3 * y4 - y3 * x4)) / determinant
        return "Intersection: (" + x.toFixed(3) + ", " + y.toFixed(3) + ")";
    }
}

var InteractiveGraph = React.createClass({
    getDefaultProps: function() {
        return {
            // TODO(alpert): Configurable graph range
            snap: 0.5,
            scale: 20,
            graph: {
                type: "linear"
            }
        };
    },

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        var oldType = prevProps.graph.type;
        var newType = this.props.graph.type;
        if (oldType !== newType ||
                newType === "point" &&
                prevProps.graph.numPoints !== this.props.graph.numPoints) {
            this["remove" + capitalize(oldType) + "Controls"]();
            this["add" + capitalize(newType) + "Controls"]();
        }
    },

    render: function() {
        var typeSelect;
        var extraOptions;
        if (this.props.flexibleType) {
            typeSelect = <select
                    ref="typeSelect"
                    onChange={function(e) {
                        var type = e.target.value
                        this.props.onChange({
                            graph: {type: type}
                        });
                    }.bind(this)}>
                <option value="linear">Linear function</option>
                <option value="quadratic">Quadratic function</option>
                <option value="circle">Circle</option>
                <option value="point">Point</option>
                <option value="linear-system">Linear System</option>
            </select>;

            if (this.props.graph.type === "point") {
                extraOptions = <select
                        ref="numPoints"
                        onChange={function(e) {
                            var num = +e.target.value
                            this.props.onChange({
                                graph: {
                                    type: "point",
                                    numPoints: num,
                                    coords: null
                                }
                            });
                        }.bind(this)}>
                    <option value="1">1 point</option>
                    <option value="2">2 points</option>
                    <option value="3">3 points</option>
                    <option value="4">4 points</option>
                    <option value="5">5 points</option>
                    <option value="6">6 points</option>
                </select>;
            }
        }

        return <span className={"perseus-widget " +
                    "perseus-widget-interactive-graph"}
                style={{padding: "25px 25px 0 0"}}>
            <span className="graphie" ref="graphieDiv" />
            {typeSelect}{extraOptions}
        </span>;
    },

    componentDidMount: function() {
        var graphie = this.graphie = KhanUtil.createGraphie(
                this.refs.graphieDiv.getDOMNode());
        graphie.graphInit({
            range: 10,
            scale: this.props.scale,
            axisArrows: "<->",
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            tickStep: 1,
            labelStep: 1
        });
        graphie.label([0, 10], "y", "above");
        graphie.label([10, 0], "x", "right");
        graphie.addMouseLayer();

        var type = this.props.graph.type;
        this["add" + capitalize(type) + "Controls"]();

        // TODO(alpert): How to do this at initialization instead of here?
        if (this.refs.typeSelect) {
            this.refs.typeSelect.getDOMNode().value = type;
        }
        if (this.refs.numPoints) {
            this.refs.numPoints.getDOMNode().value =
                    this.props.graph.numPoints || 1;
        }
    },

    getEquationString: function() {
        var type = this.props.graph.type;
        return this["get" + capitalize(type) + "EquationString"]();
    },

    addLinearControls: function() {
        var graphie = this.graphie;
        var coords = this.props.graph.coords || [[-5, 5], [5, 5]];

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: coords[0],
            snapX: this.props.snap,
            snapY: this.props.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: coords[1],
            snapX: this.props.snap,
            snapY: this.props.snap,
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
            var graph = _.extend({}, this.props.graph, {
                coords: [pointA.coord, pointB.coord]
            });
            this.props.onChange({graph: graph});
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
        var graphie = this.graphie;
        var coords = this.props.graph.coords || [[-5, 5], [0, 5], [5, 5]];

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: coords[0],
            snapX: this.props.snap,
            snapY: this.props.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: coords[1],
            snapX: this.props.snap,
            snapY: this.props.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointC = this.pointC = graphie.addMovablePoint({
            coord: coords[2],
            snapX: this.props.snap,
            snapY: this.props.snap,
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
            var graph = _.extend({}, this.props.graph, {
                coords: [pointA.coord, pointB.coord, pointC.coord]
            });
            this.props.onChange({graph: graph});
            this.updateQuadratic();
        }.bind(this));
    },

    getQuadraticCoefficients: function() {
        // TODO(alpert): Don't duplicate
        var coords = this.props.graph.coords || [[-5, 5], [0, 5], [5, 5]];
        return InteractiveGraph.getQuadraticCoefficients(coords);
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
            center: this.props.graph.center || [0, 0],
            radius: this.props.graph.radius || 2
            // TODO(alpert): addCircleGraph doesn't take snap yet
        });

        $(circle).on("move", function() {
            var graph = _.extend({}, this.props.graph, {
                center: circle.center,
                radius: circle.radius
            });
            this.props.onChange({graph: graph});
        }.bind(this));
    },

    getCircleEquationString: function() {
        var graph = this.props.graph;
        // TODO(alpert): Don't duplicate
        var center = graph.center || [0, 0];
        var radius = graph.radius || 2;
        return "center (" + center[0] + ", " + center[1] + "), radius " +
                radius;
    },

    removeCircleControls: function() {
        this.circle.remove();
    },

    addLinearSystemControls: function() {
        var graphie = this.graphie;
        var coords = this.props.graph.coords ||
                [[[-5, 5], [5, 5]], [[-5, -5], [5, -5]]];

        var firstPoints = this.firstPoints = [
            graphie.addMovablePoint({
                coord: coords[0][0],
                snapX: this.props.snap,
                snapY: this.props.snap,
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
                }
            }),
            graphie.addMovablePoint({
                coord: coords[0][1],
                snapX: this.props.snap,
                snapY: this.props.snap,
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
                }
            })
        ];

        var secondPoints = this.secondPoints = [
            graphie.addMovablePoint({
                coord: coords[1][0],
                snapX: this.props.snap,
                snapY: this.props.snap,
                normalStyle: {
                    stroke: KhanUtil.GREEN,
                    fill: KhanUtil.GREEN
                }
            }),
            graphie.addMovablePoint({
                coord: coords[1][1],
                snapX: this.props.snap,
                snapY: this.props.snap,
                normalStyle: {
                    stroke: KhanUtil.GREEN,
                    fill: KhanUtil.GREEN
                }
            })
        ];

        var firstLine = this.firstLine = graphie.addMovableLineSegment({
            pointA: firstPoints[0],
            pointZ: firstPoints[1],
            fixed: true,
            extendLine: true,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                "stroke-width": 2
            }
        });

        var secondLine = this.secondLine = graphie.addMovableLineSegment({
            pointA: secondPoints[0],
            pointZ: secondPoints[1],
            fixed: true,
            extendLine: true,
            normalStyle: {
                stroke: KhanUtil.GREEN,
                "stroke-width": 2
            }
        });

        _.each([firstPoints, secondPoints], function(points) {
            points[0].onMove = function(x, y) {
                return !_.isEqual([x, y], points[1].coord);
            };

            points[1].onMove = function(x, y) {
                return !_.isEqual([x, y], points[0].coord);
            };
        });

        $(firstPoints.concat(secondPoints)).on("move", function() {
            var graph = _.extend({}, this.props.graph, {
                coords: [
                    [firstPoints[0].coord, firstPoints[1].coord],
                    [secondPoints[0].coord, secondPoints[1].coord]
                ]
            });
            this.props.onChange({graph: graph});
        }.bind(this));
    },

    getLinearSystemEquationString: function() {
        return "\n" +
            getLineEquation(this.firstPoints[0].coord,
                            this.firstPoints[1].coord) +
            "\n" +
            getLineEquation(this.secondPoints[0].coord,
                            this.secondPoints[1].coord) +
            "\n" +
            getLineIntersection([
                this.firstPoints[0].coord, this.firstPoints[1].coord
            ], [
                this.secondPoints[0].coord, this.secondPoints[1].coord
            ]);
    },

    removeLinearSystemControls: function() {
        _.chain(this.firstPoints)
         .concat(this.secondPoints)
         .concat([this.firstLine, this.secondLine])
         .invoke("remove");
    },

    addPointControls: function() {
        var graphie = this.graphie;

        var coords = InteractiveGraph.getPointCoords(this.props.graph);
        this.points = _.map(coords, function(coord, i) {
            var point = graphie.addMovablePoint({
                coord: coord,
                snapX: this.props.snap,
                snapY: this.props.snap,
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
                }
            });

            point.onMove = function(x, y) {
                for (var j = 0; j < this.points.length; j++) {
                    if (i !== j && _.isEqual([x, y], this.points[j].coord)) {
                        return false;
                    }
                }
                return true;
            }.bind(this);

            $(point).on("move", function() {
                var graph = _.extend({}, this.props.graph, {
                    coords: _.pluck(this.points, "coord")
                });
                this.props.onChange({graph: graph});
            }.bind(this));

            return point;
        }, this);
    },

    getPointEquationString: function() {
        var coords = InteractiveGraph.getPointCoords(this.props.graph);
        return coords.map(function(coord) {
            return "(" + coord[0] + ", " + coord[1] + ")"
        }).join(", ");
    },

    removePointControls: function() {
        _.invoke(this.points, "remove");
    },

    toJSON: function() {
        return this.props.graph;
    },

    simpleValidate: function(rubric) {
        return InteractiveGraph.validate(this.toJSON(), rubric);
    },

    focus: $.noop
});


_.extend(InteractiveGraph, {
    getQuadraticCoefficients: function(coords) {
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

    /**
     * @param {object} graph Like props.graph or props.correct
     */
    getPointCoords: function(graph) {
        var numPoints = graph.numPoints || 1;
        var coords = graph.coords;

        if (graph.coords) {
            return graph.coords;
        } else {
            switch (numPoints) {
                case 1:
                    // Back in the day, one point's coords were in graph.coord
                    return [graph.coord || [0, 0]];
                case 2:
                    return [[-5, 0], [5, 0]];
                case 3:
                    return [[-5, 0], [0, 0], [5, 0]];
                case 4:
                    return [[-6, 0], [-2, 0], [2, 0], [6, 0]];
                case 5:
                    return [[-6, 0], [-3, 0], [0, 0], [3, 0], [6, 0]];
                case 6:
                    return [[-5, 0], [-3, 0], [-1, 0], [1, 0], [3, 0], [5, 0]];
            }
        }
    },

    validate: function(state, rubric) {
        // TODO(alpert): Because this.props.graph doesn't always have coords,
        // check that .coords exists here, which is always true when something
        // has moved
        if (state.type === rubric.correct.type && state.coords) {
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
            } else if (state.type === "linear-system") {
                var guess = state.coords;
                var correct = rubric.correct.coords;

                if ((
                        collinear(correct[0][0], correct[0][1], guess[0][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[0][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][1])
                    ) || (
                        collinear(correct[0][0], correct[0][1], guess[1][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[1][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][1])
                    )) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }

            } else if (state.type === "quadratic") {
                // If the parabola coefficients match, it's correct.
                var guessCoeffs = this.getQuadraticCoefficients(state.coords);
                var correctCoeffs = this.getQuadraticCoefficients(
                        rubric.correct.coords);
                if (deepEq(guessCoeffs, correctCoeffs)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "circle") {
                if (deepEq(state.center, rubric.correct.center) &&
                        eq(state.radius, rubric.correct.radius)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "point") {
                var guess = state.coords;
                var correct = InteractiveGraph.getPointCoords(rubric.correct);
                guess = guess.slice();
                correct = correct.slice();
                // Everything's already rounded so we shouldn't need to do an
                // eq() comparison but _.isEqual(0, -0) is false, so we'll use
                // eq() anyway. The sort should be fine because it'll stringify
                // it and -0 converted to a string is "0"
                guess.sort();
                correct.sort();
                if (deepEq(guess, correct)) {
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

    getDefaultProps: function() {
        return {
            correct: {
                type: "linear",
                coords: [[-5, 5], [5, 5]]
            }
        };
    },

    getInitialState: function() {
        return {
            equationString: ""
        };
    },

    render: function() {
        return <div className="perseus-widget-interactive-graph">
            <div>Correct answer: {this.state.equationString}</div>
            <InteractiveGraph
                ref="graph"
                scale={18}
                graph={this.props.correct}
                flexibleType={true}
                onChange={function(newProps) {
                    var correct = this.props.correct;
                    if (correct.type === newProps.graph.type) {
                        correct = _.extend({}, correct, newProps.graph);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.graph;
                    }
                    this.props.onChange({correct: correct});
                    this.updateEquationString();
                }.bind(this)} />
        </div>;
    },

    componentDidMount: function() {
        // TODO(alpert): Remove setTimeout after facebook/react#77 lands
        setTimeout(this.updateEquationString.bind(this), 0);
    },

    updateEquationString: React.autoBind(function() {
        this.setState({
            equationString: this.refs.graph.getEquationString()
        });
    }),

    toJSON: function() {
        var correct = this.refs.graph.toJSON();
        return {
            // TODO(alpert): Allow specifying flexibleType (whether the graph
            // type should be a choice or not)
            graph: correct.numPoints ?
                {type: correct.type, numPoints: correct.numPoints} :
                {type: correct.type},
            correct: correct
        };
    }
});

Perseus.Widgets.register("interactive-graph", InteractiveGraph);
Perseus.Widgets.register("interactive-graph-editor", InteractiveGraphEditor);

})(Perseus);
