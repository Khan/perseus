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

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var InteractiveGraph = React.createClass({
    getDefaultProps: function() {
        return {
            range: [[-10, 10], [-10, 10]],
            box: [400, 400],
            step: [2, 2],
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
        if (this.shouldSetupGraphie) {
            this.setupGraphie();
        }
    },

    pointsFromNormalized: function (coordsList) {
        var self = this;
        return _.map(coordsList, function(coords) {
            return _.map(coords, function (coord, i) {
                var range = self.props.range[i];
                var step = self.props.step[i];
                var nSteps = numSteps(range, step);
                var tick = Math.round(coord * nSteps);
                return range[0] + step * tick;
            });
        });
    },

    render: function() {
        var typeSelect;
        var extraOptions;
        if (this.props.flexibleType) {
            typeSelect = <select
                    value={this.props.graph.type}
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
                        value={this.props.graph.numPoints || 1}
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
        this.setupGraphie();
    },

    getStepConfig: function() {
        var self = this;
        return _.map(self.props.step, function(step, i) {
            var extent = self.props.range[i];
            var scale = Perseus.Util.scaleFromExtent(extent, self.props.box[i]);
            var constraint = self.props.box[i];
            var gridStep = Perseus.Util.gridStepFromTickStep(step, scale);
            return {
                scale: scale,
                gridStep: gridStep,
                snap: gridStep / 2,
                tickStep: step / gridStep
            };
        });
    },

    setupGraphie: function() {
        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var range = this.props.range;
        var graphie = this.graphie = KhanUtil.createGraphie(
                this.refs.graphieDiv.getDOMNode());
        this.shouldSetupGraphie = false;

        var stepConfig = this.getStepConfig();
        graphie.snap = _.pluck(stepConfig, "snap");
        graphie.graphInit({
            range: range,
            scale: _.pluck(stepConfig, "scale"),
            axisArrows: "<->",
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            gridStep: _.pluck(stepConfig, "gridStep"),
            tickStep: _.pluck(stepConfig, "tickStep"),
            labelStep: 1,
            unityLabels: true
        });
        graphie.label([0, range[1][1]], "y", "above");
        graphie.label([range[0][1], 0], "x", "right");
        graphie.addMouseLayer();

        var type = this.props.graph.type;
        this["add" + capitalize(type) + "Controls"]();
    },

    componentWillReceiveProps: function (nextProps) {
        if (!_.isEqual(this.props.range, nextProps.range)) {
            this.shouldSetupGraphie = true;
        }
        if (!_.isEqual(this.props.step, nextProps.step)) {
            this.shouldSetupGraphie = true;
        }
    },

    getEquationString: function() {
        var type = this.props.graph.type;
        return this["get" + capitalize(type) + "EquationString"]();
    },

    addLinearControls: function() {
        var self = this;
        var graphie = self.graphie;
        var coords = self.props.graph.coords;
        if (!coords) {
            coords = self.pointsFromNormalized([[0.25, 0.75], [0.75, 0.75]]);
        }

        var pointA = self.pointA = graphie.addMovablePoint({
            coord: coords[0],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = self.pointB = graphie.addMovablePoint({
            coord: coords[1],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var line = self.line = graphie.addMovableLineSegment({
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
            var graph = _.extend({}, self.props.graph, {
                coords: [pointA.coord, pointB.coord]
            });
            self.props.onChange({graph: graph});
        });
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

    defaultQuadraticCoords: function() {
        var coords = [[0.25, 0.75], [0.5, 0.25], [0.75, 0.75]];
        return this.pointsFromNormalized(coords);
    },

    addQuadraticControls: function() {
        var graphie = this.graphie;
        var coords = this.props.graph.coords;
        if (!coords) {
            coords = this.defaultQuadraticCoords();
        }

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: coords[0],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: coords[1],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointC = this.pointC = graphie.addMovablePoint({
            coord: coords[2],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
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
        var coords = this.props.graph.coords || this.defaultQuadraticCoords();
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
        }, this.props.range[0]).attr({
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
            radius: this.props.graph.radius || _.min(this.props.step)
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
        var coords = this.props.graph.coords;
        if (!coords) {
            coords = [
                [[0.25, 0.75], [0.75, 0.75]],
                [[0.25, 0.25], [0.75, 0.25]]
            ];
            coords = _.map(coords, this.pointsFromNormalized, this);
        }

        var firstPoints = this.firstPoints = [
            graphie.addMovablePoint({
                coord: coords[0][0],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
                }
            }),
            graphie.addMovablePoint({
                coord: coords[0][1],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
                }
            })
        ];

        var secondPoints = this.secondPoints = [
            graphie.addMovablePoint({
                coord: coords[1][0],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                normalStyle: {
                    stroke: KhanUtil.GREEN,
                    fill: KhanUtil.GREEN
                }
            }),
            graphie.addMovablePoint({
                coord: coords[1][1],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
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

        var coords = InteractiveGraph.getPointCoords(this.props.graph, this);
        this.points = _.map(coords, function(coord, i) {
            var point = graphie.addMovablePoint({
                coord: coord,
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
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
        var coords = InteractiveGraph.getPointCoords(this.props.graph, this);
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
        return InteractiveGraph.validate(this.toJSON(), rubric, this);
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
    getPointCoords: function(graph, component) {
        var numPoints = graph.numPoints || 1;
        var coords = graph.coords;

        if (coords) {
            return coords;
        } else {
            switch (numPoints) {
                case 1:
                    // Back in the day, one point's coords were in graph.coord
                    coords = [graph.coord || [0, 0]];
                    break;
                case 2:
                    coords = [[-5, 0], [5, 0]];
                    break;
                case 3:
                    coords = [[-5, 0], [0, 0], [5, 0]];
                    break;
                case 4:
                    coords = [[-6, 0], [-2, 0], [2, 0], [6, 0]];
                    break;
                case 5:
                    coords = [[-6, 0], [-3, 0], [0, 0], [3, 0], [6, 0]];
                    break;
                case 6:
                    coords = [[-5, 0], [-3, 0], [-1, 0], [1, 0], [3, 0], [5, 0]];
                    break;
            }
            // Transform coords from their -10 to 10 space to 0 to 1
            // because of the old graph.coord, and also it's easier.
            coords = _.map(coords, function (coords) {
                return _.map(coords, function (coord) {
                    return ((coord + 10) / 20);
                });
            });
            var coords = component.pointsFromNormalized(coords);
            return coords;
        }
    },

    validate: function(state, rubric, component) {
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
                var correct = InteractiveGraph.getPointCoords(
                        rubric.correct, component);
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
        var range = this.props.range || [[-10, 10], [-10, 10]];
        var step = this.props.step || [2, 2];
        return {
            box: [340, 340],
            range: range,
            rangeTextbox: range,
            step: step,
            stepTextbox: step,
            valid: true,
            correct: {
                type: "linear",
                coords: null
            }
        };
    },

    getInitialState: function() {
        return {
            equationString: ""
        };
    },

    render: function() {
        if (this.props.valid === true) {
            var graph = <InteractiveGraph
                ref="graph"
                box={this.props.box}
                range={this.props.range}
                step={this.props.step}
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
        } else {
            var graph = <div>{this.props.valid}</div>;
        }
        return <div className="perseus-widget-interactive-graph">
            <div>Correct answer: {this.state.equationString}</div>
            <div>
                <div>x range:
                    <input  type="text"
                            ref="range-0-0"
                            onInput={_.bind(this.changeRange, this, 0, 0)}
                            value={this.props.rangeTextbox[0][0]} />
                    <input  type="text"
                            ref="range-0-1"
                            onInput={_.bind(this.changeRange, this, 0, 1)}
                            value={this.props.rangeTextbox[0][1]} />
                </div>
                <div>
                    y range:
                    <input  type="text"
                            ref="range-1-0"
                            onInput={_.bind(this.changeRange, this, 1, 0)}
                            value={this.props.rangeTextbox[1][0]} />
                    <input  type="text"
                            ref="range-1-1"
                            onInput={_.bind(this.changeRange, this, 1, 1)}
                            value={this.props.rangeTextbox[1][1]} />
                </div>
                <div>
                    step:
                    <input  type="text"
                            ref="step-0"
                            onInput={_.bind(this.changeStep, this, 0)}
                            value={this.props.stepTextbox[0]} />
                    <input  type="text"
                            ref="step-1"
                            onInput={_.bind(this.changeStep, this, 1)}
                            value={this.props.stepTextbox[1]} />
                </div>
            </div>
            {graph}
        </div>;
    },

    validRange: function (range) {
        var numbers = _.every(range, function (num) {
            return _.isFinite(num);
        });
        if (! numbers) {
            return "Range must be a valid number";
        }
        if (range[0] >= range[1]) {
            return "Range must have a higher number on the right";
        }
        return true;
    },

    validStep: function (step, range) {
        if (! _.isFinite(step)) {
            return "Step must be a valid number";
        }
        var nSteps = numSteps(range, step);
        if (nSteps < 3) {
            return "Step must be smaller to have at least 3 ticks";
        }
        if (nSteps > 20) {
            return "Step must be larger to have at most 20 ticks";
        }
        return true;
    },

    valid: function (range, step) {
        var self = this;
        var msg;
        var goodRange = _.every(range, function (range) {
            msg = self.validRange(range);
            return msg === true;
        });
        if (!goodRange) {
            return msg;
        }
        var goodStep = _.every(step, function (step, i) {
            msg = self.validStep(step, range[i]);
            return msg === true;
        });
        if (!goodStep) {
            return msg;
        }
        return true;
    },

    changeRange: function (i, j, e) {
        var val = this.refs["range-" + i + "-" + j].getDOMNode().value;
        var ranges = this.props.rangeTextbox.slice();
        var range = ranges[i] = ranges[i].slice();
        range[j] = val;
        var step = this.props.stepTextbox.slice();
        if (this.validRange(range) === true) {
            step[i] = Perseus.Util.tickStepFromExtent(
                    range, this.props.box[i]);
        }
        this.props.onChange({ rangeTextbox: ranges, stepTextbox: step },
                this.changeGraph);
    },

    changeStep: function (i, e) {
        var val = this.refs["step-" + i].getDOMNode().value;
        var step = this.props.stepTextbox.slice();
        step[i] = val;
        this.props.onChange({ stepTextbox: step },
                this.changeGraph);
    },

    changeGraph: function () {
        var range = this.props.rangeTextbox;
        var step = this.props.stepTextbox;
        var range = _.map(this.props.rangeTextbox, function (range) {
            return _.map(range, Number);
        });
        var step = _.map(this.props.stepTextbox, Number);
        var valid = this.valid(range, step);
        if (valid === true) {
            this.props.onChange({
                valid: true,
                range: range,
                step: step,
                correct: {
                    type: "linear",
                    coords: null
                }
            });
        } else {
            this.props.onChange({
                valid: valid
            });
        }
    },

    componentDidMount: function() {
        var changeGraph = this.changeGraph;
        this.changeGraph = _.debounce(_.bind(changeGraph, this), 300);
        // TODO(alpert): Remove setTimeout after facebook/react#77 lands
        setTimeout(this.updateEquationString.bind(this), 0);
    },

    updateEquationString: function() {
        this.setState({
            equationString: this.refs.graph.getEquationString()
        });
    },

    toJSON: function() {
        var json = {
            step: this.props.step,
            range: this.props.range
        };
        var graph = this.refs.graph;
        if (graph) {
            var correct = graph && graph.toJSON();
            _.extend(json, {
                // TODO(alpert): Allow specifying flexibleType (whether the
                // graph type should be a choice or not)
                graph: correct.numPoints ?
                    {type: correct.type, numPoints: correct.numPoints} :
                    {type: correct.type},
                correct: correct
            });
        }
        return json;
    }
});

Perseus.Widgets.register("interactive-graph", InteractiveGraph);
Perseus.Widgets.register("interactive-graph-editor", InteractiveGraphEditor);

})(Perseus);
