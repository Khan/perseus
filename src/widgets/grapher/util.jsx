/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, no-var, one-var, space-unary-ops */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const _ = require("underscore");

const Util = require("../../util.js");
const Graphie = require("../../components/graphie.jsx");
const Plot = Graphie.Plot;
const kpoint = require("kmath").point;

const DEFAULT_BACKGROUND_IMAGE = {
    url: null
};

// TODO(charlie): These really need to go into a utility file as they're being
// used by both interactive-graph and now grapher.
function canonicalSineCoefficients(coeffs) {
    // For a curve of the form f(x) = a * Sin(b * x - c) + d,
    // this function ensures that a, b > 0, and c is its
    // smallest possible positive value.
    var amplitude = coeffs[0];
    var angularFrequency = coeffs[1];
    var phase = coeffs[2];
    var verticalOffset = coeffs[3];

    // Guarantee a > 0
    if (amplitude < 0) {
        amplitude *= -1;
        angularFrequency *= -1;
        phase *= -1;
    }

    var period = 2 * Math.PI;
    // Guarantee b > 0
    if (angularFrequency < 0) {
        angularFrequency *= -1;
        phase *= -1;
        phase += period / 2;
    }

    // Guarantee c is smallest possible positive value
    while (phase > 0) {
        phase -= period;
    }
    while (phase < 0) {
        phase += period;
    }

    return [amplitude, angularFrequency, phase, verticalOffset];
}

function canonicalTangentCoefficients(coeffs) {
    // For a curve of the form f(x) = a * Tan(b * x - c) + d,
    // this function ensures that a, b > 0, and c is its
    // smallest possible positive value.
    var amplitude = coeffs[0];
    var angularFrequency = coeffs[1];
    var phase = coeffs[2];
    var verticalOffset = coeffs[3];

    // Guarantee a > 0
    if (amplitude < 0) {
        amplitude *= -1;
        angularFrequency *= -1;
        phase *= -1;
    }

    var period = Math.PI;
    // Guarantee b > 0
    if (angularFrequency < 0) {
        angularFrequency *= -1;
        phase *= -1;
        phase += period / 2;
    }

    // Guarantee c is smallest possible positive value
    while (phase > 0) {
        phase -= period;
    }
    while (phase < 0) {
        phase += period;
    }

    return [amplitude, angularFrequency, phase, verticalOffset];
}

var PlotDefaults = {
    areEqual: function(coeffs1, coeffs2) {
        return Util.deepEq(coeffs1, coeffs2);
    },

    Movable: Plot,

    getPropsForCoeffs: function(coeffs) {
        return {
            fn: _.partial(this.getFunctionForCoeffs, coeffs)
        };
    }
};

var Linear = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/67aaf581e6d9ef9038c10558a1f70ac21c11c9f8.png",

    defaultCoords: [[0.25, 0.75], [0.75, 0.75]],

    getCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];

        var denom = p2[0] - p1[0];
        var num = p2[1] - p1[1];

        if (denom === 0) {
            return;
        }

        var m = num / denom;
        var b = p2[1] - m * p2[0];
        return [m, b];
    },

    getFunctionForCoeffs: function(coeffs, x) {
        var m = coeffs[0], b = coeffs[1];
        return m * x + b;
    },

    getEquationString: function(coords) {
        var coeffs = this.getCoefficients(coords);
        var m = coeffs[0], b = coeffs[1];
        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
    }
});

var Quadratic = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/e23d36e6fc29ee37174e92c9daba2a66677128ab.png",

    defaultCoords: [[0.5, 0.5], [0.75, 0.75]],

    Movable: Graphie.Parabola,

    getCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];

        // Parabola with vertex (h, k) has form: y = a * (h - k)^2 + k
        var h = p1[0];
        var k = p1[1];

        // Use these to calculate familiar a, b, c
        var a = (p2[1] - k) / ((p2[0] - h) * (p2[0] - h));
        var b = - 2 * h * a;
        var c = a * h * h + k;

        return [a, b, c];
    },

    getFunctionForCoeffs: function(coeffs, x) {
        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        return (a * x + b) * x + c;
    },

    getPropsForCoeffs: function(coeffs) {
        return {
            a: coeffs[0],
            b: coeffs[1],
            c: coeffs[2]
        };
    },

    getEquationString: function(coords) {
        var coeffs = this.getCoefficients(coords);
        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        return "y = " + a.toFixed(3) + "x^2 + " + b.toFixed(3) +
               "x + " + c.toFixed(3);
    }
});

var Sinusoid = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/3d68e7718498475f53b206c2ab285626baf8857e.png",

    defaultCoords: [[0.5, 0.5], [0.6, 0.6]],

    Movable: Graphie.Sinusoid,

    getCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];

        var a = (p2[1] - p1[1]);
        var b = Math.PI / (2 * (p2[0] - p1[0]));
        var c = p1[0] * b;
        var d = p1[1];

        return [a, b, c, d];
    },

    getFunctionForCoeffs: function(coeffs, x) {
        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
        return a * Math.sin(b * x - c) + d;
    },

    getPropsForCoeffs: function(coeffs) {
        return {
            a: coeffs[0],
            b: coeffs[1],
            c: coeffs[2],
            d: coeffs[3]
        };
    },

    getEquationString: function(coords) {
        var coeffs = this.getCoefficients(coords);
        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
        return "y = " + a.toFixed(3) + " sin(" + b.toFixed(3) +
               "x - " + c.toFixed(3) + ") + " + d.toFixed(3);
    },

    areEqual: function(coeffs1, coeffs2) {
        return Util.deepEq(canonicalSineCoefficients(coeffs1),
                canonicalSineCoefficients(coeffs2));
    }
});

var Tangent = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/7db80d23c35214f98659fe1cf0765811c1bbfbba.png",

    defaultCoords: [[0.5, 0.5], [0.75, 0.75]],

    getCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];

        var a = (p2[1] - p1[1]);
        var b = Math.PI / (4 * (p2[0] - p1[0]));
        var c = p1[0] * b;
        var d = p1[1];

        return [a, b, c, d];
    },

    getFunctionForCoeffs: function(coeffs, x) {
        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
        return a * Math.tan(b * x - c) + d;
    },

    getEquationString: function(coords) {
        var coeffs = this.getCoefficients(coords);
        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
        return "y = " + a.toFixed(3) + " sin(" + b.toFixed(3) +
               "x - " + c.toFixed(3) + ") + " + d.toFixed(3);
    },

    areEqual: function(coeffs1, coeffs2) {
        return Util.deepEq(canonicalTangentCoefficients(coeffs1),
                canonicalTangentCoefficients(coeffs2));
    }
});

var Exponential = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/9cbfad55525e3ce755a31a631b074670a5dad611.png",

    defaultCoords: [[0.5, 0.55], [0.75, 0.75]],

    defaultAsymptote: [[0, 0.5], [1.0, 0.5]],

    /**
     * Add extra constraints for movement of the points or asymptote (below):
     *   newCoord: [x, y]
     *     The end position of the point or asymptote endpoint
     *   oldCoord: [x, y]
     *     The old position of the point or asymptote endpoint
     *   coords:
     *     An array of coordinates representing the proposed end configuration
     *     of the plot coordinates.
     *   asymptote:
     *     An array of coordinates representing the proposed end configuration
     *     of the asymptote.
     *
     * Return: either a coordinate (to be used as the resulting coordinate of
     * the move) or a boolean, where `true` uses newCoord as the resulting
     * coordinate, and `false` uses oldCoord as the resulting coordinate.
     */
    extraCoordConstraint: function(newCoord, oldCoord, coords, asymptote,
            graph) {
        var y = _.head(asymptote)[1];
        return _.all(coords, (coord) => coord[1] !== y);
    },

    extraAsymptoteConstraint: function(newCoord, oldCoord, coords, asymptote,
            graph) {
        var y = newCoord[1];
        var isValid = _.all(coords, (coord) => coord[1] > y) ||
            _.all(coords, (coord) => coord[1] < y);

        if (isValid) {
            return [oldCoord[0], y];
        } else {
            // Snap the asymptote as close as possible, i.e., if the user moves
            // the mouse really quickly into an invalid region
            var oldY = oldCoord[1];
            var wasBelow = _.all(coords, (coord) => coord[1] > oldY);
            if (wasBelow) {
                var bottomMost = _.min(_.map(coords, (coord) => coord[1]));
                return [oldCoord[0], bottomMost - graph.snapStep[1]];
            } else {
                var topMost = _.max(_.map(coords, (coord) => coord[1]));
                return [oldCoord[0], topMost + graph.snapStep[1]];
            }
        }
    },

    allowReflectOverAsymptote: true,

    getCoefficients: function(coords, asymptote) {
        var p1 = coords[0];
        var p2 = coords[1];

        var c = _.head(asymptote)[1];
        var b = Math.log((p1[1] - c) / (p2[1] - c)) / (p1[0] - p2[0]);
        var a = (p1[1] - c) / Math.exp(b * p1[0]);
        return [a, b, c];
    },

    getFunctionForCoeffs: function(coeffs, x) {
        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        return a * Math.exp(b * x) + c;
    },

    getEquationString: function(coords, asymptote) {
        if (!asymptote) {
            return null;
        }
        var coeffs = this.getCoefficients(coords, asymptote);
        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        return "y = " + a.toFixed(3) + "e^(" + b.toFixed(3) + "x) + " +
            c.toFixed(3);
    }
});

var Logarithm = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/f6491e99d34af34d924bfe0231728ad912068dc3.png",

    defaultCoords: [[0.55, 0.5], [0.75, 0.75]],

    defaultAsymptote: [[0.5, 0], [0.5, 1.0]],

    extraCoordConstraint: function(newCoord, oldCoord, coords, asymptote,
            graph) {
        var x = _.head(asymptote)[0];
        return _.all(coords, (coord) => coord[0] !== x) &&
            coords[0][1] !== coords[1][1];
    },

    extraAsymptoteConstraint: function(newCoord, oldCoord, coords, asymptote,
            graph) {
        var x = newCoord[0];
        var isValid = _.all(coords, (coord) => coord[0] > x) ||
            _.all(coords, (coord) => coord[0] < x);

        if (isValid) {
            return [x, oldCoord[1]];
        } else {
            // Snap the asymptote as close as possible, i.e., if the user moves
            // the mouse really quickly into an invalid region
            var oldX = oldCoord[0];
            var wasLeft = _.all(coords, (coord) => coord[0] > oldX);
            if (wasLeft) {
                var leftMost = _.min(_.map(coords, (coord) => coord[0]));
                return [leftMost - graph.snapStep[0], oldCoord[1]];
            } else {
                var rightMost = _.max(_.map(coords, (coord) => coord[0]));
                return [rightMost + graph.snapStep[0], oldCoord[1]];
            }
        }
    },

    allowReflectOverAsymptote: true,

    getCoefficients: function(coords, asymptote) {
        // It's easiest to calculate the logarithm's coefficients by thinking
        // about it as the inverse of the exponential, so we flip x and y and
        // perform some algebra on the coefficients. This also unifies the
        // logic between the two 'models'.
        var flip = (coord) => [coord[1], coord[0]];
        var inverseCoeffs = Exponential.getCoefficients(_.map(coords, flip),
            _.map(asymptote, flip));
        var c = - inverseCoeffs[2] / inverseCoeffs[0];
        var b = 1 / inverseCoeffs[0];
        var a = 1 / inverseCoeffs[1];
        return [a, b, c];
    },

    getFunctionForCoeffs: function(coeffs, x, asymptote) {
        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        return a * Math.log(b * x + c);
    },

    getEquationString: function(coords, asymptote) {
        if (!asymptote) {
            return null;
        }
        var coeffs = this.getCoefficients(coords, asymptote);
        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        return "y = ln(" + a.toFixed(3) + "x + " + b.toFixed(3) + ") + " +
            c.toFixed(3);
    }
});

var AbsoluteValue = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/8256a630175a0cb1d11de223d6de0266daf98721.png",

    defaultCoords: [[0.5, 0.5], [0.75, 0.75]],

    getCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];

        var denom = p2[0] - p1[0];
        var num = p2[1] - p1[1];

        if (denom === 0) {
            return;
        }

        var m = Math.abs(num / denom);
        if (p2[1] < p1[1]) {
            m *= -1;
        }
        var horizontalOffset = p1[0];
        var verticalOffset = p1[1];

        return [m, horizontalOffset, verticalOffset];
    },

    getFunctionForCoeffs: function(coeffs, x) {
        var m = coeffs[0],
            horizontalOffset = coeffs[1],
            verticalOffset = coeffs[2];
        return m * Math.abs(x - horizontalOffset) + verticalOffset;
    },

    getEquationString: function(coords) {
        var coeffs = this.getCoefficients(coords);
        var m = coeffs[0],
            horizontalOffset = coeffs[1],
            verticalOffset = coeffs[2];
        return "y = " + m.toFixed(3) + "| x - " +
            horizontalOffset.toFixed(3) + "| + " +
            verticalOffset.toFixed(3);
    }
});

/* Utility functions for dealing with graphing interfaces. */
var functionTypeMapping = {
    "linear": Linear,
    "quadratic": Quadratic,
    "sinusoid": Sinusoid,
    "tangent": Tangent,
    "exponential": Exponential,
    "logarithm": Logarithm,
    "absolute_value": AbsoluteValue
};

var allTypes = _.keys(functionTypeMapping);

function functionForType(type) {
    return functionTypeMapping[type];
}

var GrapherUtil = {
    validate: function(state, rubric) {
        if (state.type !== rubric.correct.type) {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }

        // We haven't moved the coords
        if (state.coords == null) {
            return {
                type: "invalid",
                message: null
            };
        }

        // Get new function handler for grading
        var grader = functionForType(state.type);
        var guessCoeffs = grader.getCoefficients(state.coords,
            state.asymptote);
        var correctCoeffs = grader.getCoefficients(rubric.correct.coords,
            rubric.correct.asymptote);

        if (guessCoeffs == null || correctCoeffs == null) {
            return {
                type: "invalid",
                message: null
            };
        }
        else if (grader.areEqual(guessCoeffs, correctCoeffs)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
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
    },

    getEquationString: function(props) {
        var plot = props.plot;
        if (plot.type && plot.coords) {
            var handler = functionForType(plot.type);
            var result =
                handler.getEquationString(plot.coords, plot.asymptote);
            return result || "";
        } else {
            return "";
        }
    },

    pointsFromNormalized: function(coordsList, range, step, snapStep) {
        var numSteps = function(range, step) {
            return Math.floor((range[1] - range[0]) / step);
        };

        return _.map(coordsList, function(coords) {
            var unsnappedPoint = _.map(coords, function(coord, i) {
                var currRange = range[i];
                var currStep = step[i];
                var nSteps = numSteps(currRange, currStep);
                var tick = Math.round(coord * nSteps);
                return currRange[0] + currStep * tick;
            });
            // In some graphing widgets, e.g. interactive-graph, you can rely
            // on the Graphie to handle snapping. Here, we need the points
            // returned to already be snapped so that the plot that goes
            // through them is correct.
            return kpoint.roundTo(unsnappedPoint, snapStep);
        });
    },

    maybePointsFromNormalized: function(coordsList, range, step, snapStep) {
        if (coordsList) {
            return this.pointsFromNormalized(
                coordsList, range, step, snapStep);
        } else {
            return coordsList;
        }
    },

    /* Given a plot type, return the appropriate default value for a grapher
     * widget's plot props: type, default coords, default asymptote. */
    defaultPlotProps: function(type, graph) {
        // The coords are null by default, to indicate that the user has not
        // moved them from the default position, and that this widget should
        // therefore be considered empty and ineligible for grading. The user
        // *can* move the coords from the default position and then back if
        // they really want to submit the default coords as their answer, but
        // we currently don't write questions that require this.
        //
        // We *do* write questions in which the asymptote should be left in
        // the default position. For this reason, we fill in the default
        // asymptote rather than leaving it null; if the user moves the coords
        // but not the asymptote, the widget is non-empty and eligible for
        // grading.
        //
        // TODO(mattdr): Consider an updated scoring function that marks the
        // default coords as empty *unless* they're the correct coords. This
        // would remove this default-coords-are-always-wrong constraints on
        // the questions we write, while still maintaining our kind behavior
        // when users forget to update a widget... but we'd also be revealing
        // extra information. It would be valid to always submit the default
        // widget before even reading the question; you can't lose, but you
        // might get a free win.
        var model = functionForType(type);
        var gridStep = [1, 1];
        var snapStep = Util.snapStepFromGridStep(gridStep);
        return {
            type,
            asymptote: this.maybePointsFromNormalized(model.defaultAsymptote,
                graph.range, graph.step, snapStep),
            coords: null
        };
    },

    /* Given a list of available types, choose which to use. */
    chooseType: _.first,

    getGridAndSnapSteps: function(options, boxSize) {
        var gridStep = options.gridStep ||
                       Util.getGridStep(options.range, options.step, boxSize);
        var snapStep = options.snapStep ||
                       Util.snapStepFromGridStep(gridStep);
        return {
            gridStep: gridStep,
            snapStep: snapStep
        };
    },
};

var DEFAULT_GRAPHER_PROPS = {};

DEFAULT_GRAPHER_PROPS.graph = {
    labels: ["x", "y"],
    range: [[-10, 10], [-10, 10]],
    step: [1, 1],
    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
    markings: "graph",
    rulerLabel: "",
    rulerTicks: 10,
    valid: true,
    showTooltips: false,
};

DEFAULT_GRAPHER_PROPS.plot = GrapherUtil.defaultPlotProps("linear",
    DEFAULT_GRAPHER_PROPS.graph);

DEFAULT_GRAPHER_PROPS.availableTypes = [DEFAULT_GRAPHER_PROPS.plot.type];

function typeToButton(type) {
    var capitalized = type.charAt(0).toUpperCase() + type.substring(1);
    return {
        value: type,
        title: capitalized,
        content: <img src={functionForType(type).url} alt={capitalized} />
    };
}

module.exports = {
    GrapherUtil,
    allTypes,
    typeToButton,
    functionForType,
    DEFAULT_GRAPHER_PROPS,
    DEFAULT_BACKGROUND_IMAGE,
};
