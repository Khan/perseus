var _ = require("underscore");

var ButtonGroup      = require("react-components/button-group.jsx");
var GraphSettings    = require("../components/graph-settings.jsx");
var InfoTip          = require("react-components/info-tip.jsx");
var Interactive2     = require("../interactive2.js");
var MultiButtonGroup = require("react-components/multi-button-group.jsx");
var SvgImage         = require("../components/svg-image.jsx");
var Util             = require("../util.js");

/* Graphie and relevant components. */
var Graphie      = require("../components/graphie.jsx");
var MovablePoint = Graphie.MovablePoint;
var Plot         = Graphie.Plot;
var MovableLine  = Graphie.MovableLine;

var knumber = require("kmath").number;
var kvector = require("kmath").vector;
var kpoint = require("kmath").point;

/* Mixins. */
var Changeable   = require("../mixins/changeable.jsx");

/* Utility objects and functions. */
var defaultBoxSize = 400;
var defaultEditorBoxSize = 340;
var defaultBackgroundImage = {
    url: null
};
var defaultType = "linear";

function typeToButton(type) {
    var capitalized = type.charAt(0).toUpperCase() + type.substring(1);
    return {
        value: type,
        title: capitalized,
        content: <img src={functionForType(type).url} alt={capitalized} />
    };
}

function isFlipped(newCoord, oldCoord, line) {
    var CCW = (a, b, c) => {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
    };
    return (CCW(line[0], line[1], oldCoord) > 0) !==
        (CCW(line[0], line[1], newCoord) > 0);
}

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

/* Styles */
var typeSelectorStyle = {
    padding: "5px 5px"
};

/* Graphing interface. */
var FunctionGrapher = React.createClass({
    mixins: [Changeable],

    _coords: function(props) {
        // Coords are usually based on props, but should fall back to the
        // model's default whenever they're not provided (if there's a model)
        props = props || this.props;
        var defaultModelCoords = props.model && props.model.defaultCoords &&
            Grapher.pointsFromNormalized(props.graph.range, props.graph.step,
                props.graph.snapStep, props.model.defaultCoords);
        return props.coords || defaultModelCoords || null;
    },

    _asymptote: function(props) {
        // Coords are usually based on props, but should fall back to the
        // model's default whenever they're not provided (if there's a model)
        props = props || this.props;
        var defaultModelAsymptote = props.model &&
            props.model.defaultAsymptote &&
            Grapher.pointsFromNormalized(props.graph.range, props.graph.step,
                props.graph.snapStep, props.model.defaultAsymptote);
        return props.asymptote || defaultModelAsymptote || null;
    },

    getDefaultProps: function() {
        return {
            graph: {
                range: [[-10, 10], [-10, 10]],
                step: [1, 1]
            },
            coords: null,
            asymptote: null
        };
    },

    render: function() {
        var pointForCoord = (coord, i) => {
            return <MovablePoint
                key={i}
                coord={coord}
                constraints={[
                    Interactive2.MovablePoint.constraints.bound(),
                    Interactive2.MovablePoint.constraints.snap(),
                    (coord) => {
                        // Always enforce that this is a function
                        var isFunction = _.all(this._coords(),
                            (otherCoord, j) => {
                                return i === j  || !otherCoord ||
                                    !knumber.equal(coord[0], otherCoord[0]);
                            });

                        // Evaluate this criteria before per-point constraints
                        if (!isFunction) {
                            return false;
                        }

                        // Specific functions have extra per-point constraints
                        if (this.props.model &&
                                this.props.model.extraCoordConstraint) {
                            var extraConstraint =
                                this.props.model.extraCoordConstraint;
                            // Calculat resulting coords and verify that
                            // they're valid for this graph
                            var proposedCoords = _.clone(this._coords());
                            var oldCoord = _.clone(proposedCoords[i]);
                            proposedCoords[i] = coord;
                            return extraConstraint(coord, oldCoord,
                                proposedCoords, this._asymptote(),
                                this.props.graph);
                        }

                        return isFunction;
                    }
                ]}
                onMove={(newCoord, oldCoord) => {
                    var coords;
                    // Reflect over asymptote, if allowed
                    var asymptote = this._asymptote();
                    if (asymptote &&
                            this.props.model.allowReflectOverAsymptote &&
                            isFlipped(newCoord, oldCoord, asymptote)) {
                        coords = _.map(this._coords(), (coord) => {
                            return kpoint.reflectOverLine(coord, asymptote);
                        });
                    } else {
                        coords = _.clone(this._coords());
                    }
                    coords[i] = newCoord;
                    this.props.onChange({
                        coords: coords
                    });
                }} />;
        };
        var points = _.map(this._coords(), pointForCoord);
        var box = this.props.graph.box;

        var imageDescription = this.props.graph.backgroundImage;
        var image = null;
        if (imageDescription.url) {
            var scale = box[0] / defaultBoxSize;
            image = <SvgImage src={imageDescription.url}
                              width={imageDescription.width}
                              height={imageDescription.height}
                              scale={scale} />;
        }

        return <div
                    className={"perseus-widget " + "perseus-widget-grapher"}
                    style={{
                        width: box[0],
                        height: this.props.flexibleType ? "auto" : box[1]
                    }}>
                <div
                    className="graphie-container above-scratchpad"
                    style={{
                        width: box[0],
                        height: box[1]
                    }}>
                {image}
                <Graphie {...this.props.graph}>
                    {this.props.model && this.renderPlot()}
                    {this.props.model && this.renderAsymptote()}
                    {this.props.model && points}
                </Graphie>
            </div>
        </div>;
    },

    renderPlot: function() {
        var model = this.props.model;
        var xRange = this.props.graph.range[0];
        var style = { stroke: KhanUtil.DYNAMIC };

        var coeffs = model.getCoefficients(this._coords(), this._asymptote());
        if (!coeffs) {
            return;
        }

        var functionProps = model.getPropsForCoeffs(coeffs, xRange);
        return <model.Movable
                    {...functionProps}
                    key={this.props.model.url}
                    range={xRange}
                    style={style} />;
    },

    renderAsymptote: function() {
        var model = this.props.model;
        var graph = this.props.graph;
        var asymptote = this._asymptote();
        var dashed = {
            strokeDasharray: "- "
        };
        return asymptote &&
            <MovableLine onMove={(newCoord, oldCoord) => {
                // Calculate and apply displacement
                var delta = kvector.subtract(newCoord, oldCoord);
                var newAsymptote = _.map(this._asymptote(), (coord) =>
                    kvector.add(coord, delta));
                this.props.onChange({
                    asymptote: newAsymptote
                });
            }} constraints={[
                Interactive2.MovableLine.constraints.bound(),
                Interactive2.MovableLine.constraints.snap(),
                (newCoord, oldCoord) => {
                    // Calculate and apply proposed displacement
                    var delta = kvector.subtract(newCoord, oldCoord);
                    var proposedAsymptote = _.map(this._asymptote(), (coord) =>
                        kvector.add(coord, delta));
                    // Verify that resulting asymptote is valid for graph
                    if (model.extraAsymptoteConstraint) {
                        return model.extraAsymptoteConstraint(newCoord,
                            oldCoord, this._coords(), proposedAsymptote,
                            graph);
                    }
                    return true;
            }]} normalStyle={dashed}
                highlightStyle={dashed}>
                {_.map(asymptote, (coord) =>
                    <MovablePoint coord={coord}
                        static={true}
                        draw={null}
                        extendLine={true} />
                )}
        </MovableLine>;
    }
});

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

/* Widget and editor. */
var Grapher = React.createClass({
    getDefaultProps: function() {
        return {
            plot: {
                type: defaultType,
                coords: null,
                asymptote: null
            },
            graph: {
                box: [defaultBoxSize, defaultBoxSize],
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
                backgroundImage: defaultBackgroundImage,
                markings: "graph",
                rulerLabel: "",
                rulerTicks: 10,
                valid: true
            },
            availableTypes: [defaultType],
        };
    },

    render: function() {
        var type = this.props.plot.type;
        var coords = this.props.plot.coords;
        var asymptote = this.props.plot.asymptote;

        var typeSelector = <div style={typeSelectorStyle}
                className="above-scratchpad">
            <ButtonGroup
                value={type}
                allowEmpty={true}
                buttons={_.map(this.props.availableTypes, typeToButton)}
                onChange={this.handleActiveTypeChange} />
        </div>;

        var box = this.props.graph.box;

        // Calculate additional graph properties so that the same values are
        // passed in to both FunctionGrapher and Graphie.
        var options = _.extend({}, this.props.graph,
            this._getGridAndSnapSteps(this.props.graph));
        _.extend(options, {
            gridConfig: this._getGridConfig(options)
        });

        // The `graph` prop will eventually be passed to the <Graphie>
        // component. In fact, if model is `null`, this is functionalliy
        // identical to a <Graphie>. Otherwise, some points and a plot will be
        // overlayed.
        var grapherProps = {
            graph: {
                box: box,
                range: options.range,
                step: options.step,
                snapStep: options.snapStep,
                backgroundImage: options.backgroundImage,
                options: options,
                setup: this._setupGraphie
            },
            onChange: this.handlePlotChanges,
            model: type && functionForType(type),
            coords: coords,
            asymptote: asymptote
        };

        return <div>
            <FunctionGrapher {...grapherProps} />
            {this.props.availableTypes.length > 1 && typeSelector}
        </div>;
    },

    handlePlotChanges: function(newPlot) {
        var plot = _.extend({}, this.props.plot, newPlot);
        this.props.onChange({
            plot: plot
        });
    },

    handleActiveTypeChange: function(newType) {
        var plot = _.extend({}, this.props.plot, {
            type: newType,
            coords: null,
            asymptote: null
        });
        this.props.onChange({
            plot: plot
        });
    },

    _getGridAndSnapSteps: function(options) {
        var gridStep = options.gridStep ||
                Util.getGridStep(options.range, options.step, defaultBoxSize);
        var snapStep = options.snapStep ||
                Util.snapStepFromGridStep(gridStep);
        return {
            gridStep: gridStep,
            snapStep: snapStep
        };
    },

    _getGridConfig: function(options) {
        return _.map(options.step, function(step, i) {
            return Util.gridDimensionConfig(
                    step,
                    options.range[i],
                    options.box[i],
                    options.gridStep[i]);
        });
    },

    _setupGraphie: function(graphie, options) {
        if (options.markings === "graph") {
            graphie.graphInit({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale"),
                axisArrows: "<->",
                labelFormat: function(s) { return "\\small{" + s + "}"; },
                gridStep: options.gridStep,
                snapStep: options.snapStep,
                tickStep: _.pluck(options.gridConfig, "tickStep"),
                labelStep: 1,
                unityLabels: _.pluck(options.gridConfig, "unityLabel")
            });
            graphie.label([0, options.range[1][1]], options.labels[1],
                "above");
            graphie.label([options.range[0][1], 0], options.labels[0],
                "right");
        } else if (options.markings === "grid") {
            graphie.graphInit({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale"),
                gridStep: options.gridStep,
                axes: false,
                ticks: false,
                labels: false
            });
        } else if (options.markings === "none") {
            graphie.init({
                range: options.range,
                scale: _.pluck(options.gridConfig, "scale")
            });
        }
    },

    simpleValidate: function(rubric) {
        return Grapher.validate(this.getUserInput(), rubric);
    },

    getUserInput: function() {
        return this.props.plot;
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});

_.extend(Grapher, {
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

    pointsFromNormalized: function(range, step, snapStep, coordsList) {
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
    }
});

var GrapherEditor = React.createClass({
    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            correct: {
                type: defaultType,
                coords: null,
                asymptote: null
            },
            graph: {
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
                backgroundImage: defaultBackgroundImage,
                markings: "graph",
                rulerLabel: "",
                rulerTicks: 10,
                valid: true
            },
            availableTypes: [defaultType]
        };
    },

    render: function() {
        var graph;
        var equationString;
        var graph = _.extend(this.props.graph, {
            box: [defaultEditorBoxSize, defaultEditorBoxSize]
        });

        if (this.props.graph.valid === true) {
            var graphProps = {
                graph: this.props.graph,
                plot: this.props.correct,
                availableTypes: this.props.availableTypes,
                onChange: (newProps, cb) => {
                    var correct = this.props.correct;
                    if (correct.type === newProps.plot.type) {
                        correct = _.extend({}, correct, newProps.plot);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.plot;
                    }
                    this.props.onChange({correct: correct}, cb);
                }
            };

            graph = <Grapher {...graphProps} />;
            equationString = Grapher.getEquationString(graphProps);
        } else {
            graph = <div className="perseus-error">
                        {this.props.graph.valid}
                    </div>;
        }

        return <div>
            <div>Correct answer{' '}
                <InfoTip>
                    <p>Graph the correct answer in the graph below and ensure
                    the equation or point coordinates displayed represent the
                    correct answer.</p>
                </InfoTip>
                {' '}: {equationString}</div>

            <GraphSettings
                editableSettings={["graph", "snap", "image"]}
                box={this.props.graph.box}
                range={this.props.graph.range}
                labels={this.props.graph.labels}
                step={this.props.graph.step}
                gridStep={this.props.graph.gridStep}
                snapStep={this.props.graph.snapStep}
                valid={this.props.graph.valid}
                backgroundImage={this.props.graph.backgroundImage}
                markings={this.props.graph.markings}
                rulerLabel={this.props.graph.rulerLabel}
                rulerTicks={this.props.graph.rulerTicks}
                onChange={this.change("graph")} />
            <div className="perseus-widget-row">
                <label>Available functions:{' '} </label>
                <MultiButtonGroup
                    allowEmpty={false}
                    values={this.props.availableTypes}
                    buttons={_.map(allTypes, typeToButton)}
                    onChange={this.handleAvailableTypesChange} />
            </div>
            {graph}
        </div>;
    },

    handleAvailableTypesChange: function(newAvailableTypes) {
        var correct = this.props.correct;

        // If the currently 'correct' type is removed from the list of types,
        // we need to change it to avoid impossible questions.
        if (!_.contains(newAvailableTypes, this.props.correct.type)) {
            var correct = {
                type: _.first(newAvailableTypes),
                coords: null,
                asymptote: null
            };
        }
        this.props.onChange({
            availableTypes: newAvailableTypes,
            correct: correct
        });
    },

    serialize: function() {
        return _.chain(this.props)
                .pick("correct", "availableTypes")
                .extend({ graph: _.omit(this.props.graph, "box") })
                .value();
    }
});

var propTransform = (editorProps) => {
    var widgetProps = _.pick(editorProps, "availableTypes");
    widgetProps.graph = _.extend(editorProps.graph, {
        box: [defaultBoxSize, defaultBoxSize]
    });

    // If there's only one type, the graph type is deterministic
    if (widgetProps.availableTypes.length === 1) {
        var plot = {
            type: _.first(widgetProps.availableTypes),
            coords: null,
            asymptote: null
        };
        widgetProps.plot = plot;
    }

    return widgetProps;
};

module.exports = {
    name: "grapher",
    displayName: "Grapher",
    widget: Grapher,
    editor: GrapherEditor,
    transform: propTransform
};
