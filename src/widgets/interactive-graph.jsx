var React = require('react');
var _ = require("underscore");

var Graph         = require("../components/graph.jsx");
var GraphSettings = require("../components/graph-settings.jsx");
var InfoTip       = require("react-components/info-tip.jsx");
var Interactive2  = require("../interactive2.js");
var NumberInput   = require("../components/number-input.jsx");
var Util          = require("../util.js");

var knumber = require("kmath").number;
var kpoint = require("kmath").point;

var DeprecationMixin = Util.DeprecationMixin;


var TRASH_ICON_URI = 'https://ka-perseus-graphie.s3.amazonaws.com/b1452c0d79fd0f7ff4c3af9488474a0a0decb361.png';

var defaultBoxSize = 400;
var defaultEditorBoxSize = 340;
var defaultBackgroundImage = {
    url: null
};

var eq = Util.eq;
var deepEq = Util.deepEq;

var UNLIMITED = "unlimited";

// Sample background image:
// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png

function ccw(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

function collinear(a, b, c) {
    return eq(ccw(a, b, c), 0);
}

function sign(val) {
    if (eq(val, 0)) {
        return 0;
    } else {
        return val > 0 ? 1 : -1;
    }
}

// default to defaultValue if actual is null or undefined
function defaultVal(actual, defaultValue) {
    return (actual == null) ? defaultValue : actual;
}

// Given rect bounding points A and B, whether point C is inside the rect
function pointInRect(a, b, c) {
    return (c[0] <= Math.max(a[0], b[0]) && c[0] >= Math.min(a[0], b[0]) &&
            c[1] <= Math.max(a[1], b[1]) && c[1] >= Math.min(a[1], b[1]));
}

// Whether line segment AB intersects line segment CD
// http://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
function intersects(ab, cd) {
    var triplets = [
        [ab[0], ab[1], cd[0]],
        [ab[0], ab[1], cd[1]],
        [cd[0], cd[1], ab[0]],
        [cd[0], cd[1], ab[1]]
    ];

    var orientations = _.map(triplets, function(triplet) {
        return sign(ccw.apply(null, triplet));
    });

    if (orientations[0] !== orientations[1] &&
        orientations[2] !== orientations[3]) {
        return true;
    }

    for (var i = 0; i < 4; i++) {
        if (orientations[i] === 0 && pointInRect.apply(null, triplets[i])) {
            return true;
        }
    }

    return false;
}

function vector(a, b) {
    return _.map(_.zip(a, b), function(pair) {
        return pair[0] - pair[1];
    });
}

function magnitude(v) {
    return Math.sqrt(_.reduce(v, function(memo, el) {
        return memo + Math.pow(el, 2);
    }, 0));
}

function dotProduct(a, b) {
    return _.reduce(_.zip(a, b), function(memo, pair) {
        return memo + pair[0] * pair[1];
    }, 0);
}

function sideLengths(coords) {
    var segments = _.zip(coords, rotate(coords));
    return _.map(segments, function(segment) {
        return magnitude(vector.apply(null, segment));
    });
}

// Based on http://math.stackexchange.com/a/151149
function angleMeasures(coords) {
    var triplets = _.zip(rotate(coords, -1), coords, rotate(coords, 1));

    var offsets = _.map(triplets, function(triplet) {
        var p = vector(triplet[1], triplet[0]);
        var q = vector(triplet[2], triplet[1]);
        var raw = Math.acos(dotProduct(p, q) / (magnitude(p) * magnitude(q)));
        return sign(ccw.apply(null, triplet)) > 0 ? raw : -raw;
    });

    var sum = _.reduce(offsets, function(memo, arg) { return memo + arg; }, 0);

    return _.map(offsets, function(offset) {
        return sum > 0 ? Math.PI - offset : Math.PI + offset;
    });
}

// Whether two polygons are similar (or if specified, congruent)
function similar(coords1, coords2, tolerance) {
    if (coords1.length !== coords2.length) {
        return false;
    }

    var n = coords1.length;

    var angles1 = angleMeasures(coords1);
    var angles2 = angleMeasures(coords2);

    var sides1 = sideLengths(coords1);
    var sides2 = sideLengths(coords2);

    for (var i = 0; i < 2 * n; i++) {
        var angles = angles2.slice();
        var sides = sides2.slice();

        // Reverse angles and sides to allow matching reflected polygons
        if (i >= n) {
            angles.reverse();
            sides.reverse();
            // Since sides are calculated from two coordinates,
            // simply reversing results in an off by one error
            sides = rotate(sides, 1);
        }

        angles = rotate(angles, i);
        sides = rotate(sides, i);

        if (deepEq(angles1, angles)) {
            var sidePairs = _.zip(sides1, sides);

            var factors = _.map(sidePairs, function(pair) {
                return pair[0] / pair[1];
            });

            var same = _.all(factors, function(factor) {
                return eq(factors[0], factor);
            });

            var congruentEnough = _.all(sidePairs, function(pair) {
                return knumber.equal(pair[0], pair[1], tolerance);
            });

            if (same && congruentEnough) {
                return true;
            }
        }
    }

    return false;
}

// Less than or approximately equal
function leq(a, b) {
    return a < b || eq(a, b);
}

// Given triangle with sides ABC return angle opposite side C in degrees
function lawOfCosines(a, b, c) {
    return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180 / Math.PI;
}

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

// e.g. rotate([1, 2, 3]) -> [2, 3, 1]
function rotate(array, n) {
    n = (typeof n === "undefined") ? 1 : (n % array.length);
    return array.slice(n).concat(array.slice(0, n));
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
        return "Lines are parallel";
    } else {
        var x = ((x1 * y2 - y1 * x2) * (x3 - x4) -
                 (x1 - x2) * (x3 * y4 - y3 * x4)) / determinant;
        var y = ((x1 * y2 - y1 * x2) * (y3 - y4) -
                 (y1 - y2) * (x3 * y4 - y3 * x4)) / determinant;
        return "Intersection: (" + x.toFixed(3) + ", " + y.toFixed(3) + ")";
    }
}

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var deprecatedProps = {
    showGraph: function(props) {
        return {markings: props.showGraph ? "graph" : "none"};
    }
};


var InteractiveGraph = React.createClass({

    getInitialState: function() {
        return {
            shouldShowInstructions: this._getShouldShowInstructions()
        };
    },

    getDefaultProps: function() {
        return {
            labels: ["x", "y"],
            range: [[-10, 10], [-10, 10]],
            box: [defaultBoxSize, defaultBoxSize],
            step: [1, 1],
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            graph: {
                type: "linear"
            }
        };
    },

    mixins: [DeprecationMixin],
    deprecatedProps: deprecatedProps,

    _getShouldShowInstructions: function(props) {
        props = props || this.props;
        return this.isClickToAddPoints(props) && (
            props.graph.coords == null || props.graph.coords.length === 0
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        var oldType = prevProps.graph.type;
        var newType = this.props.graph.type;
        if (oldType !== newType ||
                prevProps.graph.allowReflexAngles !==
                    this.props.graph.allowReflexAngles ||
                prevProps.graph.angleOffsetDeg !==
                    this.props.graph.angleOffsetDeg ||
                prevProps.graph.numPoints !== this.props.graph.numPoints ||
                prevProps.graph.numSides !== this.props.graph.numSides ||
                prevProps.graph.numSegments !== this.props.graph.numSegments ||
                prevProps.graph.showAngles !== this.props.graph.showAngles ||
                prevProps.graph.showSides !== this.props.graph.showSides ||
                prevProps.graph.snapTo !== this.props.graph.snapTo ||
                prevProps.graph.snapDegrees !== this.props.graph.snapDegrees) {
            this["remove" + capitalize(oldType) + "Controls"]();
            this["add" + capitalize(newType) + "Controls"]();
        }
        if (this.shouldResetGraphie) {
            this.resetGraphie();
        }
    },

    render: function() {
        var typeSelect;
        var extraOptions;
        if (this.props.flexibleType) {
            typeSelect = <select
                    value={this.props.graph.type}
                    onChange={e => {
                        var type = e.target.value;
                        this.props.onChange({
                            graph: {type: type}
                        });
                    }}>
                <option value="linear">Linear function</option>
                <option value="quadratic">Quadratic function</option>
                <option value="sinusoid">Sinusoid function</option>
                <option value="circle">Circle</option>
                <option value="point">Point(s)</option>
                <option value="linear-system">Linear System</option>
                <option value="polygon">Polygon</option>
                <option value="segment">Line Segment(s)</option>
                <option value="ray">Ray</option>
                <option value="angle">Angle</option>
            </select>;

            if (this.props.graph.type === "point") {
                extraOptions = <select
                        key="point-select"
                        value={this.props.graph.numPoints || 1}
                        onChange={e => {
                            // Convert numbers, leave UNLIMITED intact:
                            var num = +e.target.value || e.target.value;
                            this.props.onChange({
                                graph: {
                                    type: "point",
                                    numPoints: num,
                                    coords: null
                                }
                            });
                        }}>
                    {_.map(_.range(1, 7), function(n) {
                        return <option value={n}>
                            {n} point{n > 1 && "s"}
                        </option>;
                    })}
                    <option value={UNLIMITED}>unlimited</option>
                </select>;
            } else if (this.props.graph.type === "polygon") {
                extraOptions = <div>
                    <div>
                        <select
                            key="polygon-select"
                            value={this.props.graph.numSides || 3}
                            onChange={e => {
                                // Convert numbers, leave UNLIMITED intact:
                                var num = +e.target.value || e.target.value;
                                var graph = _.extend({}, this.props.graph, {
                                    numSides: num,
                                    coords: null,
                                    snapTo: "grid" // reset the snap for
                                                   // UNLIMITED, which only
                                                   // supports "grid"
                                });
                                this.props.onChange({graph: graph});
                            }}>
                            {_.map(_.range(3, 13), function(n) {
                                return <option value={n}>{n} sides</option>;
                            })}
                            <option value={UNLIMITED}>unlimited sides</option>
                        </select>
                    </div>
                    <div>
                        <label> Snap to{' '}
                            <select
                                key="polygon-snap"
                                value={this.props.graph.snapTo}
                                onChange={e => {
                                    var graph = _.extend({},
                                        this.props.graph,
                                        {
                                            snapTo: e.target.value,
                                            coords: null
                                        });
                                    this.props.onChange({graph: graph});
                                }}>
                                <option value="grid">grid</option>
                                {(this.props.graph.numSides !== UNLIMITED) && [
                                    <option value="angles">
                                        {' '}interior angles{' '}
                                    </option>,
                                    <option value="sides">
                                        {' '}side measures{' '}
                                    </option>
                                ]}
                            </select>
                        </label>
                        <InfoTip>
                            <p>These options affect the movement of the vertex
                            points. The grid option will guide the points to
                            the nearest half step along the grid.</p>

                            <p>The interior angle and side measure options
                            guide the points to the nearest whole angle or
                            side</p> measure respectively.{' '}
                        </InfoTip>
                    </div>
                    <div>
                        <label>Show angle measures:{' '}
                            <input type="checkbox"
                                checked={this.props.graph.showAngles}
                                onChange={this.toggleShowAngles} />
                        </label>
                        <InfoTip>
                            <p>Displays the interior angle measures.</p>
                        </InfoTip>
                    </div>
                    <div>
                        <label>Show side measures:{' '}
                            <input type="checkbox"
                                checked={this.props.graph.showSides}
                                onChange={this.toggleShowSides} />
                        </label>
                        <InfoTip>
                            <p>Displays the side lengths.</p>
                        </InfoTip>
                    </div>
                </div>;
            } else if (this.props.graph.type === "segment") {
                extraOptions = <select
                        key="segment-select"
                        value={this.props.graph.numSegments || 1}
                        onChange={e => {
                            var num = +e.target.value;
                            this.props.onChange({
                                graph: {
                                    type: "segment",
                                    numSegments: num,
                                    coords: null
                                }
                            });
                        }}>
                    {_.map(_.range(1, 7), function(n) {
                        return <option value={n}>
                            {n} segment{n > 1 && "s"}
                        </option>;
                    })}
                </select>;
            } else if (this.props.graph.type === "angle") {
                var allowReflexAngles = defaultVal(
                    this.props.graph.allowReflexAngles,
                    true
                );
                extraOptions = <div>
                    <div>
                        <label>Show angle measure:{' '}
                            <input type="checkbox"
                                checked={this.props.graph.showAngles}
                                onChange={this.toggleShowAngles} />
                        </label>
                    </div>
                    <div>
                        <label>Allow reflex angles:{' '}
                            <input type="checkbox"
                                checked={allowReflexAngles}
                                onChange={newVal => {
                                    this.props.onChange({
                                        graph: _.extend({}, this.props.graph, {
                                            allowReflexAngles:
                                                    !allowReflexAngles,
                                            coords: null
                                        })
                                    });
                                }} />
                        </label>
                        <InfoTip>
                            <p>
                                Reflex angles are angles with a measure
                                greater than 180 degrees.
                            </p>
                            <p>
                                By default, these should remain enabled.
                            </p>
                        </InfoTip>
                    </div>
                    <div>
                        <label>Snap to increments of{' '}
                            <NumberInput
                                key="degree-snap"
                                placeholder={1}
                                value={this.props.graph.snapDegrees}
                                onChange={newVal => {
                                    this.props.onChange({
                                        graph: _.extend({}, this.props.graph, {
                                            snapDegrees: Math.abs(newVal),
                                            coords: null
                                        })
                                    });
                                }} />
                            {' '}degrees{' '}
                        </label>
                    </div>
                    <div>
                        <label>
                            {' '}With an offset of{' '}
                            <NumberInput
                                key="angle-offset"
                                placeholder={0}
                                value={this.props.graph.angleOffsetDeg}
                                onChange={newVal => {
                                    this.props.onChange({
                                        graph: _.extend({}, this.props.graph, {
                                            angleOffsetDeg: newVal,
                                            coords: null
                                        })
                                    });
                                }} />
                            {' '}degrees{' '}
                        </label>
                    </div>
                </div>;
            }
        }

        var box = this.props.box;

        var instructions;
        if (this.isClickToAddPoints() && this.state.shouldShowInstructions) {
            if  (this.props.graph.type === "point") {
                instructions = $._("Click to add points");
            } else if (this.props.graph.type === "polygon") {
                instructions = $._("Click to add vertices");
            }
        } else {
            instructions = undefined;
        }

        var onMouseDown = this.isClickToAddPoints() ?
            this.handleAddPointsMouseDown :
            null;

        var gridStep = this.props.gridStep || Util.getGridStep(
                this.props.range,
                this.props.step,
                defaultBoxSize
        );
        var snapStep = this.props.snapStep || Util.snapStepFromGridStep(
            gridStep
        );

        return <div className={"perseus-widget " +
                    "perseus-widget-interactive-graph"}
                    style={{
                        width: box[0],
                        height: this.props.flexibleType ? "auto" : box[1]
                    }}>
            <Graph
                instructions={instructions}
                ref="graph"
                box={this.props.box}
                labels={this.props.labels}
                range={this.props.range}
                step={this.props.step}
                gridStep={gridStep}
                snapStep={snapStep}
                markings={this.props.markings}
                backgroundImage={this.props.backgroundImage}
                showProtractor={this.props.showProtractor}
                showRuler={this.props.showRuler}
                rulerLabel={this.props.rulerLabel}
                rulerTicks={this.props.rulerTicks}
                onMouseDown={onMouseDown}
                onNewGraphie={this.setGraphie} />
            {typeSelect}{extraOptions}
        </div>;
    },

    setGraphie: function(newGraphie) {
        this.graphie = newGraphie;
        this.setupGraphie();
    },

    handleAddPointsMouseDown: function(coord) {
        // This function should only be called when this.isClickToAddPoints()
        // is true
        if (!this.isClickToAddPoints()) {
            throw new Error("handleAddPointsClick should not be registered" +
                "when isClickToAddPoints() is false");
        }
        if (!this.isCoordInTrash(coord)) {
            var point;
            if (this.props.graph.type === "point") {
                point = this.createPointForPointsType(
                    coord,
                    this.points.length
                );
                if (!point.constrain()) {
                    point.remove();
                    return;
                }
                this.points.push(point);

                // interactive2 allows us to grab the point
                var idx = this.points.length - 1;
                this.points[idx].grab(coord);

                this.updateCoordsFromPoints();
            } else if (this.props.graph.type === "polygon") {
                if (this.polygon.closed()) {
                    return;
                }
                point = this.createPointForPolygonType(
                    coord,
                    this.points.length
                );
                this.points.push(point);

                var idx = this.points.length - 1;
                this.points[idx].grab(coord);

                // We don't call updateCoordsFromPoints for
                // polygons, since the polygon won't be
                // closed yet.
                this.updatePolygon();
            }

            this.setState({
                shouldShowInstructions: false
            });
        }
    },

    resetGraphie: function() {
        this.shouldResetGraphie = false;
        this.refs.graph.reset();
    },

    setupGraphie: function() {
        this.setTrashCanVisibility(0);
        if (this.isClickToAddPoints()) {
            this.setTrashCanVisibility(0.5);
        }

        var type = this.props.graph.type;
        this["add" + capitalize(type) + "Controls"]();
    },

    setTrashCanVisibility: function(opacity) {
        var graphie = this.graphie;

        if (knumber.equal(opacity, 0)) {
            if (this.trashCan) {
                this.trashCan.remove();
                this.trashCan = null;
            }
        } else {
            if (!this.trashCan) {
                this.trashCan = graphie.raphael.image(TRASH_ICON_URI,
                    graphie.xpixels - 40,
                    graphie.ypixels - 40,
                    40,
                    40
                );
            }
            this.trashCan.attr({
                opacity: opacity
            });
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isClickToAddPoints() !== this.isClickToAddPoints(nextProps)) {
            this.shouldResetGraphie = true;
            this.setState({
                shouldShowInstructions:
                        this._getShouldShowInstructions(nextProps)
            });
        }
    },

    isClickToAddPoints: function(props) {
        props = props || this.props;
        return (props.graph.type === "point" &&
                props.graph.numPoints === UNLIMITED) ||
               (props.graph.type === "polygon" &&
                props.graph.numSides === UNLIMITED);
    },

    addLine: function(type) {
        var self = this;
        var graphie = self.graphie;
        var coords = InteractiveGraph.getLineCoords(
            self.props.graph,
            self.props
        );

        var points = self.points = _.map(coords, (coord) => {
            return Interactive2.addMovablePoint(graphie, {
                coord: coord,
                constraints: [
                    Interactive2.MovablePoint.constraints.bound(),
                    Interactive2.MovablePoint.constraints.snap()
                ],
                onMove: () => {
                    var graph = _.extend({}, self.props.graph, {
                        coords: _.invoke(points, "coord")
                    });
                    self.props.onChange({graph: graph});
                },
                normalStyle: {
                    stroke: KhanUtil.INTERACTIVE,
                    fill: KhanUtil.INTERACTIVE
                }
            });
        });

        var lineConfig = {
            points: points,
            static: true
        };

        if (type === "line") {
            lineConfig.extendLine = true;
        } else if (type === "ray") {
            lineConfig.extendRay = true;
        }

        var line = self.line = Interactive2.addMovableLine(
            graphie,
            lineConfig
        );

        // A and B can't be in the same place
        points[0].listen("constraints", "isLine", (coord) => {
            return !kpoint.equal(coord, points[1].coord());
        });
        points[1].listen("constraints", "isLine", (coord) => {
            return !kpoint.equal(coord, points[0].coord());
        });
    },

    removeLine: function() {
        _.invoke(this.points, "remove");
        this.line.remove();
    },

    addLinearControls: function() {
        this.addLine("line");
    },

    removeLinearControls: function() {
        this.removeLine();
    },

    addQuadraticControls: function() {
        var graphie = this.graphie;
        var coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultQuadraticCoords(this.props);
        }

        var pointA;
        var pointB;
        var pointC;
        var onMoveHandler = () => {
            var graph = _.extend({}, this.props.graph, {
                coords: [pointA.coord(), pointB.coord(), pointC.coord()]
            });
            this.props.onChange({graph: graph});
            this.updateQuadratic();
        };

        pointA = this.pointA = Interactive2.addMovablePoint(graphie, {
            coord: coords[0],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return !pointA || (coord[0] !== pointB.coord()[0] &&
                                coord[0] !== pointC.coord()[0]);
                }
            ],
            onMove: onMoveHandler
        });

        pointB = this.pointB = Interactive2.addMovablePoint(graphie, {
            coord: coords[1],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return !pointB || (coord[0] !== pointA.coord()[0] &&
                                coord[0] !== pointC.coord()[0]);
                }
            ],
            onMove: onMoveHandler
        });

        pointC = this.pointC = Interactive2.addMovablePoint(graphie, {
            coord: coords[2],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return !pointC || (coord[0] !== pointA.coord()[0] &&
                                coord[0] !== pointB.coord()[0]);
                }
            ],
            onMove: onMoveHandler
        });

        this.updateQuadratic();
    },

    updateQuadratic: function() {
        var coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(
                this.props);
        if (!coeffs) {
            return;
        }

        // Extract coefficients the parabola
        var a = coeffs[0], b = coeffs[1], c = coeffs[2];

        // Plot and style
        if (this.parabola) {
            var path = this.graphie.svgParabolaPath(a, b, c);
            this.parabola.attr({ path: path });
        } else {
            this.parabola = this.graphie.parabola(a, b, c);
            this.parabola.attr({ stroke: KhanUtil.DYNAMIC });
            this.parabola.toBack();
        }
    },

    removeQuadraticControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        this.pointC.remove();
        if (this.parabola) {
            this.parabola.remove();
            this.parabola = null;
        }
    },

    addSinusoidControls: function() {
        var graphie = this.graphie;
        var coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultSinusoidCoords(this.props);
        }

        var pointA;
        var pointB;
        var onMoveHandler = () => {
            var graph = _.extend({}, this.props.graph, {
                coords: [pointA.coord(), pointB.coord()]
            });
            this.props.onChange({graph: graph});
            this.updateSinusoid();
        };

        pointA = this.pointA = Interactive2.addMovablePoint(graphie, {
            coord: coords[0],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return !pointA || coord[0] !== pointB.coord()[0];
                }
            ],
            onMove: onMoveHandler
        });

        pointB = this.pointB = Interactive2.addMovablePoint(graphie, {
            coord: coords[1],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return !pointA || coord[0] !== pointA.coord()[0];
                }
            ],
            onMove: onMoveHandler
        });

        this.updateSinusoid();
    },

    updateSinusoid: function() {
        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(
                this.props);
        if (!coeffs) {
            return;
        }

        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];

        // Plot and style
        if (this.sinusoid) {
            var path = this.graphie.svgSinusoidPath(a, b, c, d);
            this.sinusoid.attr({ path: path });
        } else {
            this.sinusoid = this.graphie.sinusoid(a, b, c, d);
            this.sinusoid.attr({ stroke: KhanUtil.DYNAMIC });
            this.sinusoid.toBack();
        }
    },

    removeSinusoidControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        if (this.sinusoid) {
            this.sinusoid.remove();
            this.sinusoid = null;
        }
    },

    addCircleControls: function() {
        var graphie = this.graphie;
        var minSnap = _.min(graphie.snap);

        var circle = this.circle = graphie.addCircleGraph({
            center: this.props.graph.center || [0, 0],
            radius: this.props.graph.radius || _.min(this.props.step),
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            minRadius: minSnap * 2,
            snapRadius: minSnap
        });

        $(circle).on("move", () => {
            var graph = _.extend({}, this.props.graph, {
                center: circle.center,
                radius: circle.radius
            });
            this.props.onChange({graph: graph});
        });
    },

    removeCircleControls: function() {
        this.circle.remove();
    },

    addLinearSystemControls: function() {
        var graphie = this.graphie;
        var coords = InteractiveGraph.getLinearSystemCoords(this.props.graph,
            this.props);

        var segmentColors = [KhanUtil.INTERACTIVE, KhanUtil.GREEN];
        var points = this.points = _.map(coords,
                (segmentCoords, segmentIndex) => {
            var segmentPoints = _.map(segmentCoords, (coord, i) => {
                return Interactive2.addMovablePoint(graphie, {
                    coord: coord,
                    constraints: [
                        Interactive2.MovablePoint.constraints.bound(),
                        Interactive2.MovablePoint.constraints.snap(),
                        (coord) => {
                            if (!segmentPoints) {
                                // points hasn't been defined yet because
                                // we're still creating them
                                return;
                            }
                            return !kpoint.equal(
                                coord,
                                segmentPoints[1 - i].coord()
                            );
                        }
                    ],
                    onMove: () => {
                        var graph = _.extend({}, this.props.graph, {
                            coords: _.map(
                                this.points,
                                (segment) => _.invoke(segment, "coord")
                            )
                        });
                        this.props.onChange({graph: graph});
                    },
                    normalStyle: {
                        stroke: segmentColors[segmentIndex],
                        fill: segmentColors[segmentIndex]
                    }
                });
            });
            return segmentPoints;
        });

        var lines = this.lines = _.map(points,
                (segmentPoints, segmentIndex) => {
            return Interactive2.addMovableLine(graphie, {
                points: segmentPoints,
                static: true,
                extendLine: true,
                normalStyle: {
                    stroke: segmentColors[segmentIndex]
                }
            });
        });
    },

    removeLinearSystemControls: function() {
        _.invoke(this.lines, "remove");
        _.map(this.points, (segment) => _.invoke(segment, "remove"));
    },

    isCoordInTrash: function(coord) {
        var graphie = this.graphie;
        var screenPoint = graphie.scalePoint(coord);
        return screenPoint[0] >= graphie.xpixels - 40 &&
                screenPoint[1] >= graphie.ypixels - 40;
    },

    createPointForPointsType: function(coord, i) {
        var self = this;
        var graphie = self.graphie;
        var point = Interactive2.addMovablePoint(graphie, {
            coord: coord,
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                function(coord) {
                    // TODO(jack): There ought to be a
                    // MovablePoint.constraints.avoid
                    // default that lets you do things like this
                    return _.all(self.points, function(pt) {
                        return point === pt ||
                            !kpoint.equal(coord, pt.coord());
                    });
                }
            ],
            onMoveStart: function() {
                if (self.isClickToAddPoints()) {
                    self.setTrashCanVisibility(1);
                }
            },
            onMove: self.updateCoordsFromPoints,
            onMoveEnd: function(coord) {
                if (self.isClickToAddPoints()) {
                    if (self.isCoordInTrash(coord)) {
                        // remove this point from points
                        self.points = _.filter(self.points, function(pt) {
                            return pt !== point;
                        });
                        // update the correct answer box
                        self.updateCoordsFromPoints();

                        // remove this movablePoint from graphie.
                        // we wait to do this until we're not inside of
                        // said point's onMoveEnd method so its state is
                        // consistent throughout this method call
                        setTimeout(point.remove.bind(point), 0);
                    }
                    // In case we mouseup'd off the graphie and that
                    // stopped the move (in which case, we might not
                    // be in isCoordInTrash()
                    self.setTrashCanVisibility(0.5);
                }
            },
            normalStyle: {
                stroke: KhanUtil.INTERACTIVE,
                fill: KhanUtil.INTERACTIVE
            }
        });

        return point;
    },

    removePoint: function(point) {
        var index = null;
        this.points = _.filter(this.points, function(pt, i) {
            if (pt === point) {
                index = i;
                return false;
            } else {
                return true;
            }
        });
        return index;
    },

    createPointForPolygonType: function(coord, i) {
        var graphie = this.graphie;

        // TODO(alex): check against "grid" instead, use constants
        var snapToGrid = !_.contains(["angles", "sides"],
            this.props.graph.snapTo);

        // Index relative to current point -> absolute index
        // NOTE: This does not work when isClickToAddPoints() == true,
        // as `i` can be changed by dragging a point to the trash
        // Currently this function is only called when !isClickToAddPoints()
        var rel = (j) => {
            return (i + j + this.points.length) % this.points.length;
        };

        var onMoveEndHandler = (coord) => {
            if (this.isClickToAddPoints()) {
                if (this.isCoordInTrash(coord)) {
                    // remove this point from points
                    var index = this.removePoint(point);
                    if (this.polygon.closed()) {
                        this.points = rotate(this.points, index);
                        this.polygon.update({closed: false});
                    }
                    this.updatePolygon();
                    // the polygon is now unclosed, so we need to
                    // remove any points props
                    this.clearCoords();

                    // remove this movablePoint from graphie.
                    // wait to do this until we're not inside of
                    // said point's onMoveEnd method so state is
                    // consistent throughout the method call
                    setTimeout(point.remove.bind(point), 0);
                } else if (this.points.length > 1 && ((
                            point === this.points[0] &&
                            kpoint.equal(
                                coord,
                                _.last(this.points).coord()
                            )
                        ) || (
                            point === _.last(this.points) &&
                            kpoint.equal(
                                coord,
                                this.points[0].coord()
                            )
                        ))) {
                    // If the user clicked and dragged a point over endpoint,
                    // join the them
                    var pointToRemove = this.points.pop();
                    if (this.points.length > 2) {
                        this.polygon.update({closed: true});
                        this.updateCoordsFromPoints();
                    } else {
                        this.polygon.update({closed: false});
                        this.clearCoords();
                    }
                    this.updatePolygon();
                    // remove this movablePoint from graphie.
                    // wait to do this until we're not inside of
                    // said point's onMoveEnd method so state is
                    // consistent throughout the method call
                    setTimeout(pointToRemove.remove.bind(
                        pointToRemove), 0);
                } else {
                    // If the user clicked and dragged a point over any other
                    // existing point, fix shape
                    var shouldRemove = _.any(this.points, function(pt) {
                        return pt !== point && kpoint.equal(
                            pt.coord(), coord);
                    });
                    if (shouldRemove) {
                        this.removePoint(point);

                        if (this.points.length < 3) {
                            this.polygon.update({closed: false});
                            this.clearCoords();
                        } else if (this.polygon.closed()) {
                            this.updateCoordsFromPoints();
                        }
                        this.updatePolygon();
                        // remove this movablePoint from graphie.
                        // wait to do this until we're not inside
                        // said point's onMoveEnd method so state
                        // is consistent throughout the method call
                        setTimeout(point.remove.bind(point), 0);
                    } else {
                        // If this was
                        //  * not a deletion
                        //  * and a click on the first or last point
                        //  * and not a drag,
                        //  * and not a creation of a new point
                        //    (see !point.state.isInitialMove, below),
                        //  * and our polygon is not closed,
                        //  * and we can close it (we need at least 3 points),
                        // then close it
                        if ((point === this.points[0] ||
                                point === _.last(this.points)) &&
                                !point.hasMoved() &&
                                !point.state.isInitialMove &&
                                !this.polygon.closed() &&
                                this.points.length > 2) {

                            this.polygon.update({closed: true});
                            this.updatePolygon();

                            // We finally have a closed polygon, so save our
                            // points to props
                            this.updateCoordsFromPoints();
                        }
                    }
                }

                // In case we mouseup'd off the graphie and that
                // stopped the move
                this.setTrashCanVisibility(0.5);
            }

            point.state.isInitialMove = false;
        };

        var graphConstraint = (coord) => {
            // These constraints are all relative to the other points, so if
            // we're creating the initial points and haven't added any others
            // to the graph, we can't enforce them.
            if (this.points == null || this.points.length === 0) {
                return true;
            }

            var coords = _.invoke(this.points, "coord");
            coords[i] = coord;

            // Check for invalid positioning, but only if we aren't adding
            // points one click at a time, since those added points could
            // have already violated these constraints
            if (!this.isClickToAddPoints()) {
                // Polygons can't have consecutive collinear points
                if (collinear(coords[rel(-2)], coords[rel(-1)], coords[i]) ||
                    collinear(coords[rel(-1)], coords[i],  coords[rel(1)]) ||
                    collinear(coords[i],  coords[rel(1)],  coords[rel(2)])) {
                    return false;
                }

                var segments = _.zip(coords, rotate(coords));

                if (this.points.length > 3) {
                    // Constrain to simple (non self-intersecting) polygon by
                    // testing whether adjacent segments intersect any others
                    for (var j = -1; j <= 0; j++) {
                        var segment = segments[rel(j)];
                        var others = _.without(segments,
                            segment, segments[rel(j-1)], segments[rel(j+1)]);

                        for (var k = 0; k < others.length; k++) {
                            var other = others[k];
                            if (intersects(segment, other)) {
                                return false;
                            }
                        }
                    }
                }
            }

            if (this.props.graph.snapTo === "angles" &&
                    this.points.length > 2) {
                // Snap to whole degree interior angles

                var angles = _.map(angleMeasures(coords), function(rad) {
                    return rad * 180 / Math.PI;
                });

                _.each([-1, 1], function(j) {
                    angles[rel(j)] = Math.round(angles[rel(j)]);
                });

                var getAngle = function(a, vertex, b) {
                    var angle = KhanUtil.findAngle(
                        coords[rel(a)], coords[rel(b)], coords[rel(vertex)]
                    );
                    return (angle + 360) % 360;
                };

                var innerAngles = [
                    angles[rel(-1)] - getAngle(-2, -1, 1),
                    angles[rel(1)] - getAngle(-1, 1, 2)
                ];
                innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);

                // Avoid degenerate triangles
                if (_.any(innerAngles, function(angle) {
                            return leq(angle, 1);
                        })) {
                    return false;
                }

                var knownSide = magnitude(vector(coords[rel(-1)],
                    coords[rel(1)]));

                var onLeft = sign(ccw(
                    coords[rel(-1)], coords[rel(1)], coords[i]
                )) === 1;

                // Solve for side by using the law of sines
                var side = Math.sin(innerAngles[1] * Math.PI / 180) /
                    Math.sin(innerAngles[2] * Math.PI / 180) * knownSide;

                var outerAngle = KhanUtil.findAngle(coords[rel(1)],
                    coords[rel(-1)]);

                var offset = this.graphie.polar(
                    side,
                    outerAngle + (onLeft? 1 : -1) * innerAngles[0]
                );

                return this.graphie.addPoints(coords[rel(-1)], offset);
            } else if (this.props.graph.snapTo === "sides" &&
                    this.points.length > 1) {
                // Snap to whole unit side measures

                var sides = _.map([
                    [coords[rel(-1)], coords[i]],
                    [coords[i], coords[rel(1)]],
                    [coords[rel(-1)], coords[rel(1)]]
                ], function(coords) {
                    return magnitude(vector.apply(null, coords));
                });

                _.each([0, 1], function(j) {
                    sides[j] = Math.round(sides[j]);
                });

                // Avoid degenerate triangles
                if (leq(sides[1] + sides[2], sides[0]) ||
                        leq(sides[0] + sides[2], sides[1]) ||
                        leq(sides[0] + sides[1], sides[2])) {
                    return false;
                }

                // Solve for angle by using the law of cosines
                var innerAngle = lawOfCosines(sides[0],
                    sides[2], sides[1]);

                var outerAngle = KhanUtil.findAngle(coords[rel(1)],
                    coords[rel(-1)]);

                var onLeft = sign(ccw(
                    coords[rel(-1)], coords[rel(1)], coords[i]
                )) === 1;

                var offset = this.graphie.polar(
                    sides[0],
                    outerAngle + (onLeft ? 1 : -1) * innerAngle
                );

                return this.graphie.addPoints(coords[rel(-1)], offset);
            } else {
                // Snap to grid (already done)
                return true;
            }
        };

        var point = Interactive2.addMovablePoint(graphie, {
            coord: coord,
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                snapToGrid ? Interactive2.MovablePoint.constraints.snap() :
                             null,
                graphConstraint
            ],
            onMoveStart: () => {
                if (this.isClickToAddPoints()) {
                    this.setTrashCanVisibility(1);
                }
            },
            onMove: () => {
                if (this.polygon.closed()) {
                    this.updateCoordsFromPoints();
                }
            },
            onMoveEnd: onMoveEndHandler,
            normalStyle: {
                stroke: KhanUtil.INTERACTIVE,
                fill: KhanUtil.INTERACTIVE
            }
        });
        point.state.isInitialMove = true;

        return point;
    },

    updateCoordsFromPoints: function() {
        var graph = _.extend({}, this.props.graph, {
            // Handle old movable points with .coord, or
            // Interactive2.MovablePoint's with .coord()
            coords: _.map(this.points, function(point) {
                return _.result(point, "coord");
            })
        });
        this.props.onChange({graph: graph});
    },

    clearCoords: function() {
        var graph = _.extend({}, this.props.graph, {
            coords: null
        });
        this.props.onChange({graph: graph});
    },

    addPointControls: function() {
        var coords = InteractiveGraph.getPointCoords(
            this.props.graph,
            this.props
        );
        // Clear out our old points so that newly added points don't
        // "collide" with them and reposition when being added
        // Without this, when added, each point checks whether it is on top
        // of a point in this.points, which (a) shouldn't matter since
        // we're clearing out this.points anyways, and (b) can cause problems
        // if each of this.points is a MovablePoint instead of an
        // Interactive2.MovablePoint, since one has a .coord and the other
        // has .coord()
        // TODO(jack): Figure out a better way to do this
        this.points = [];
        this.points = _.map(coords, this.createPointForPointsType, this);
    },

    removePointControls: function() {
        _.invoke(this.points, "remove");
    },

    addSegmentControls: function() {
        var self = this;
        var graphie = this.graphie;

        var coords = InteractiveGraph.getSegmentCoords(
            this.props.graph,
            this.props
        );

        this.points = [];
        this.lines = _.map(coords, function(segment, i) {
            var updateCoordProps = function() {
                var graph = _.extend({}, self.props.graph, {
                    coords: _.invoke(self.lines, "coords")
                });
                self.props.onChange({graph: graph});
            };

            var points = _.map(segment, function(coord, i) {
                return Interactive2.addMovablePoint(graphie, {
                    coord: coord,
                    normalStyle: {
                        stroke: KhanUtil.INTERACTIVE,
                        fill: KhanUtil.INTERACTIVE
                    },
                    constraints: [
                        Interactive2.MovablePoint.constraints.bound(),
                        Interactive2.MovablePoint.constraints.snap(),
                        (coord) => {
                            if (!points) {
                                // points hasn't been defined yet because
                                // we're still creating them
                                return;
                            }
                            return !kpoint.equal(coord, points[1 - i].coord());
                        }
                    ],
                    onMove: updateCoordProps
                });
            });

            self.points = self.points.concat(points);
            var line = Interactive2.addMovableLine(graphie, {
                points: points,
                static: false,
                constraints: [
                    Interactive2.MovableLine.constraints.bound(),
                    Interactive2.MovableLine.constraints.snap()
                ],
                onMove: [
                    Interactive2.MovableLine.onMove.updatePoints,
                    updateCoordProps
                ],
                normalStyle: {
                    stroke: KhanUtil.INTERACTIVE
                },
                highlightStyle: {
                    stroke: KhanUtil.INTERACTING
                }
            });
            _.invoke(points, "toFront");

            return line;
        }, this);
    },

    removeSegmentControls: function() {
        _.invoke(this.points, "remove");
        _.invoke(this.lines, "remove");
    },

    addRayControls: function() {
        this.addLine("ray");
    },

    removeRayControls: function() {
        this.removeLine();
    },

    addPolygonControls: function() {
        this.polygon = null;
        var coords = InteractiveGraph.getPolygonCoords(
            this.props.graph,
            this.props
        );
        // Clear out our old points so that newly added points don't
        // "collide", as in `addPointControls`
        this.points = [];
        this.points = _.map(coords, this.createPointForPolygonType, this);
        this.updatePolygon();
    },

    updatePolygon: function() {
        var closed;
        if (this.polygon) {
            closed = this.polygon.closed();
        } else if (this.points.length >= 3) {
            closed = true;
        } else {
            // There will only be fewer than 3 points in click-to-add-vertices
            // mode, so we don't need to explicitly check for that here.
            closed = false;
        }

        var graphie = this.graphie;
        var n = this.points.length;

        // TODO(alex): check against "grid" instead, use constants
        var snapToGrid = !_.contains(["angles", "sides"],
            this.props.graph.snapTo);

        var angleLabels = _.times(n, function(i) {
            if (!this.props.graph.showAngles ||
                    (!closed && (i === 0 || i === n - 1))) {
                return "";
            } else if (this.props.graph.snapTo === "angles") {
                return "$deg0";
            } else {
                return "$deg1";
            }
        }, this);

        var showRightAngleMarkers = _.times(n, function(i) {
            return closed || (i !== 0 && i !== n - 1);
        }, this);

        var numArcs = _.times(n, function(i) {
            if (this.props.graph.showAngles &&
                    (closed || (i !== 0 && i !== n - 1))) {
                return 1;
            } else {
                return 0;
            }
        }, this);

        var sideLabels = _.times(n, function(i) {
            if (!this.props.graph.showSides ||
                (!closed && i === n - 1)) {
                return "";
            } else if (this.props.graph.snapTo === "sides") {
                return "$len0";
            } else {
                return "$len1";
            }
        }, this);

        if (this.polygon == null) {
            var self = this;
            self.polygon = Interactive2.addMovablePolygon(graphie, {
                constraints: [
                    Interactive2.MovablePolygon.constraints.bound(),
                    snapToGrid ? Interactive2.MovablePolygon.constraints.snap()
                               : null
                ],
                closed: closed,
                points: self.points,
                angleLabels: angleLabels,
                showRightAngleMarkers: showRightAngleMarkers,
                numArcs: numArcs,
                sideLabels: sideLabels,
                onMove: [
                    Interactive2.MovablePolygon.onMove.updatePoints,
                    function() {
                        if (this.closed()) {
                            self.updateCoordsFromPoints();
                        }
                    }
                ]
            });
        } else {
            // We only need to pass in the properties that might've changed
            this.polygon.update({
                closed: closed,
                points: this.points,
                angleLabels: angleLabels,
                showRightAngleMarkers: showRightAngleMarkers,
                numArcs: numArcs,
                sideLabels: sideLabels
            });
        }
    },

    removePolygonControls: function() {
        _.invoke(this.points, "remove");
        this.polygon.remove();
    },

    addAngleControls: function() {
        var graphie = this.graphie;

        var coords = InteractiveGraph.getAngleCoords(
            this.props.graph,
            this.props
        );

        // The vertex snaps to the grid, but the rays don't...
        this.points = _.map(coords, function(coord, i) {
            return graphie.addMovablePoint(_.extend({
                coord: coord,
                normalStyle: {
                    stroke: KhanUtil.INTERACTIVE,
                    fill: KhanUtil.INTERACTIVE
                }
            }, i === 1 ? {
                snapX: graphie.snap[0],
                snapY: graphie.snap[1]
            } : {}));
        });

        // ...they snap to whole-degree angles from the vertex.
        this.angle = graphie.addMovableAngle({
            points: this.points,
            snapDegrees: this.props.graph.snapDegrees || 1,
            snapOffsetDeg: this.props.graph.angleOffsetDeg || 0,
            angleLabel: this.props.graph.showAngles ? "$deg0" : "",
            pushOut: 2,
            allowReflex: defaultVal(this.props.graph.allowReflexAngles, true)
        });

        $(this.angle).on("move", () => {
            var graph = _.extend({}, this.props.graph, {
                coords: this.angle.getClockwiseCoords()
            });
            this.props.onChange({graph: graph});
        });
    },

    removeAngleControls: function() {
        _.invoke(this.points, "remove");
        this.angle.remove();
    },

    toggleShowAngles: function() {
        var graph = _.extend({}, this.props.graph, {
            showAngles: !this.props.graph.showAngles
        });
        this.props.onChange({graph: graph});
    },

    toggleShowSides: function() {
        var graph = _.extend({}, this.props.graph, {
            showSides: !this.props.graph.showSides
        });
        this.props.onChange({graph: graph});
    },

    getUserInput: function() {
        return this.props.graph;
    },

    simpleValidate: function(rubric) {
        return InteractiveGraph.validate(this.getUserInput(), rubric, this);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
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

    getSinusoidCoefficients: function(coords) {
        // It's assumed that p1 is the root and p2 is the first peak
        var p1 = coords[0];
        var p2 = coords[1];

        // Resulting coefficients are canonical for this sine curve
        var amplitude = (p2[1] - p1[1]);
        var angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
        var phase = p1[0] * angularFrequency;
        var verticalOffset = p1[1];

        return [amplitude, angularFrequency, phase, verticalOffset];
    },


    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getLineCoords: function(graph, props) {
        return graph.coords || InteractiveGraph.pointsFromNormalized(
            props,
            [
                [0.25, 0.75],
                [0.75, 0.75]
            ]
        );
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getPointCoords: function(graph, props) {
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
                    coords = [[-5, 0], [-3, 0], [-1, 0], [1, 0], [3, 0],
                              [5, 0]];
                    break;
                case UNLIMITED:
                    coords = [];
                    break;
            }
            // Transform coords from their -10 to 10 space to 0 to 1
            // because of the old graph.coord, and also it's easier.
            var range = [[-10, 10], [-10, 10]];
            coords = InteractiveGraph.normalizeCoords(coords, range);

            var coords = InteractiveGraph.pointsFromNormalized(props, coords);
            return coords;
        }
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getLinearSystemCoords: function(graph, props) {
        return graph.coords ||
            _.map([
                [[0.25, 0.75], [0.75, 0.75]],
                [[0.25, 0.25], [0.75, 0.25]]
            ], (coords) => {
                return InteractiveGraph.pointsFromNormalized(props, coords);
            });
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getPolygonCoords: function(graph, props) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var n = graph.numSides || 3;

        if (n === UNLIMITED) {
            coords = [];
        } else {
            var angle = 2 * Math.PI / n;
            var offset = (1 / n - 1 / 2) * Math.PI;

            // TODO(alex): Generalize this to more than just triangles so that
            // all polygons have whole number side lengths if snapping to sides
            var radius = graph.snapTo === "sides" ? Math.sqrt(3) / 3 * 7: 4;

            // Generate coords of a regular polygon with n sides
            coords = _.times(n, function(i) {
                return [
                    radius * Math.cos(i * angle + offset),
                    radius * Math.sin(i * angle + offset)
                ];
            });
        }

        var range = [[-10, 10], [-10, 10]];
        coords = InteractiveGraph.normalizeCoords(coords, range);

        var snapToGrid = !_.contains(["angles", "sides"], graph.snapTo);
        coords = InteractiveGraph.pointsFromNormalized(props, coords,
            /* noSnap */ !snapToGrid);

        return coords;
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getSegmentCoords: function(graph, props) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var n = graph.numSegments || 1;
        var ys = {
            1: [5],
            2: [5, -5],
            3: [5, 0, -5],
            4: [6, 2, -2, -6],
            5: [6, 3, 0, -3, -6],
            6: [5, 3, 1, -1, -3, -5]
        }[n];
        var range = [[-10, 10], [-10, 10]];

        return _.map(ys, function(y) {
            var segment = [[-5, y], [5, y]];
            segment = InteractiveGraph.normalizeCoords(segment, range);
            segment = InteractiveGraph.pointsFromNormalized(props, segment);
            return segment;
        });
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getAngleCoords: function(graph, props) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var snap = graph.snapDegrees || 1;
        var angle = snap;
        while (angle < 20) {
            angle += snap;
        }
        angle = angle * Math.PI / 180;
        var offset = (graph.angleOffsetDeg || 0) * Math.PI / 180;

        coords = InteractiveGraph.pointsFromNormalized(props, [
            [0.85, 0.50],
            [0.5, 0.50]
        ]);

        var radius = magnitude(vector.apply(null, coords));

        // Adjust the lower point by angleOffsetDeg degrees
        coords[0] = [
            coords[1][0] + radius * Math.cos(offset),
            coords[1][1] + radius * Math.sin(offset)
        ];
        // Position the upper point angle radians from the
        // lower point
        coords[2] = [
            coords[1][0] + radius * Math.cos(angle + offset),
            coords[1][1] + radius * Math.sin(angle + offset)
        ];

        return coords;
    },

    normalizeCoords: function(coordsList, range) {
        return _.map(coordsList, function(coords) {
            return _.map(coords, function(coord, i) {
                var extent = range[i][1] - range[i][0];
                return ((coord + range[i][1]) / extent);
            });
        });
    },

    getEquationString: function(props) {
        var type = props.graph.type;
        var funcName = "get" + capitalize(type) + "EquationString";
        return InteractiveGraph[funcName](props);
    },

    pointsFromNormalized: function(props, coordsList, noSnap) {
        return _.map(coordsList, function(coords) {
            return _.map(coords, function(coord, i) {
                var range = props.range[i];
                if (noSnap) {
                    return range[0] + (range[1] - range[0]) * coord;
                } else {
                    var step = props.step[i];
                    var nSteps = numSteps(range, step);
                    var tick = Math.round(coord * nSteps);
                    return range[0] + step * tick;
                }
            });
        });
    },

    getLinearEquationString: function(props) {
        var coords = InteractiveGraph.getLineCoords(props.graph, props);
        if (eq(coords[0][0], coords[1][0])) {
            return "x = " + coords[0][0].toFixed(3);
        } else {
            var m = (coords[1][1] - coords[0][1]) /
                    (coords[1][0] - coords[0][0]);
            var b = coords[0][1] - m * coords[0][0];
            if (eq(m, 0)) {
                return "y = " + b.toFixed(3);
            } else {
                return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
            }
        }
    },

    getCurrentQuadraticCoefficients: function(props) {
        // TODO(alpert): Don't duplicate
        var coords = props.graph.coords ||
                InteractiveGraph.defaultQuadraticCoords(props);
        return InteractiveGraph.getQuadraticCoefficients(coords);
    },

    defaultQuadraticCoords: function(props) {
        var coords = [[0.25, 0.75], [0.5, 0.25], [0.75, 0.75]];
        return InteractiveGraph.pointsFromNormalized(props, coords);
    },

    getQuadraticEquationString: function(props) {
        var coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(
                props);
        return "y = " + coeffs[0].toFixed(3) + "x^2 + " +
                        coeffs[1].toFixed(3) + "x + " +
                        coeffs[2].toFixed(3);
    },

    getCurrentSinusoidCoefficients: function(props) {
        var coords = props.graph.coords ||
                InteractiveGraph.defaultSinusoidCoords(props);
        return InteractiveGraph.getSinusoidCoefficients(coords);
    },

    defaultSinusoidCoords: function(props) {
        var coords = [[0.5, 0.5], [0.65, 0.60]];
        return InteractiveGraph.pointsFromNormalized(props, coords);
    },

    getSinusoidEquationString: function(props) {
        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(
                props);
        return "y = " + coeffs[0].toFixed(3) + "sin(" +
                        coeffs[1].toFixed(3) + "x - " +
                        coeffs[2].toFixed(3) + ") + " +
                        coeffs[3].toFixed(3);
    },

    getCircleEquationString: function(props) {
        var graph = props.graph;
        // TODO(alpert): Don't duplicate
        var center = graph.center || [0, 0];
        var radius = graph.radius || 2;
        return "center (" + center[0] + ", " + center[1] + "), radius " +
                radius;
    },

    getLinearSystemEquationString: function(props) {
        var coords = InteractiveGraph.getLinearSystemCoords(
            props.graph,
            props
        );
        return "\n" +
            getLineEquation(coords[0][0], coords[0][1]) +
            "\n" +
            getLineEquation(coords[1][0], coords[1][1]) +
            "\n" +
            getLineIntersection(coords[0], coords[1]);
    },

    getPointEquationString: function(props) {
        var coords = InteractiveGraph.getPointCoords(props.graph, props);
        return coords.map(function(coord) {
            return "(" + coord[0] + ", " + coord[1] + ")";
        }).join(", ");
    },

    getSegmentEquationString: function(props) {
        var segments = InteractiveGraph.getSegmentCoords(props.graph,
            props);
        return _.map(segments, function(segment) {
            return "[" +
                _.map(segment, function(coord) {
                    return "(" + coord.join(", ") + ")";
                }).join(" ") +
            "]";
        }).join(" ");
    },

    getRayEquationString: function(props) {
        var coords = InteractiveGraph.getLineCoords(props.graph, props);
        var a = coords[0];
        var b = coords[1];
        var eq = InteractiveGraph.getLinearEquationString(props);

        if (a[0] > b[0]) {
            eq += " (for x <= " + a[0].toFixed(3) + ")";
        } else if (a[0] < b[0]) {
            eq += " (for x >= " + a[0].toFixed(3) + ")";
        } else if (a[1] > b[1]) {
            eq += " (for y <= " + a[1].toFixed(3) + ")";
        } else {
            eq += " (for y >= " + a[1].toFixed(3) + ")";
        }

        return eq;
    },

    getPolygonEquationString: function(props) {
        var coords = InteractiveGraph.getPolygonCoords(
            props.graph,
            props
        );
        return _.map(coords, function(coord) {
            return "(" + coord.join(", ") + ")";
        }).join(" ");
    },

    getAngleEquationString: function(props) {
        var coords = InteractiveGraph.getAngleCoords(props.graph, props);
        var angle = KhanUtil.findAngle(coords[2], coords[0], coords[1]);
        return angle.toFixed(0) + "\u00B0 angle" +
                " at (" + coords[1].join(", ") + ")";
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
            } else if (state.type === "sinusoid") {
                var guessCoeffs = this.getSinusoidCoefficients(
                    state.coords);
                var correctCoeffs = this.getSinusoidCoefficients(
                        rubric.correct.coords);

                var canonicalGuessCoeffs = canonicalSineCoefficients(
                                                guessCoeffs);
                var canonicalCorrectCoeffs = canonicalSineCoefficients(
                                                correctCoeffs);
                // If the canonical coefficients match, it's correct.
                if (deepEq(canonicalGuessCoeffs, canonicalCorrectCoeffs)) {
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
            } else if (state.type === "polygon") {
                var guess = state.coords.slice();
                var correct = rubric.correct.coords.slice();

                var match;
                if (rubric.correct.match === "similar") {
                    match = similar(guess, correct, Number.POSITIVE_INFINITY);
                } else if (rubric.correct.match === "congruent") {
                    match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
                } else if (rubric.correct.match === "approx") {
                    match = similar(guess, correct, 0.1);
                } else { /* exact */
                    guess.sort();
                    correct.sort();
                    match = deepEq(guess, correct);
                }

                if (match) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "segment") {
                var guess = state.coords.slice();
                var correct = rubric.correct.coords.slice();
                guess = _.invoke(guess, "sort").sort();
                correct = _.invoke(correct, "sort").sort();
                if (deepEq(guess, correct)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "ray") {
                var guess = state.coords;
                var correct = rubric.correct.coords;
                if (deepEq(guess[0], correct[0]) &&
                        collinear(correct[0], correct[1], guess[1])) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "angle") {
                var guess = state.coords;
                var correct = rubric.correct.coords;

                var match;
                if (rubric.correct.match === "congruent") {
                    var angles = _.map([guess, correct], function(coords) {
                        var angle = KhanUtil.findAngle(
                            coords[2], coords[0], coords[1]);
                        return (angle + 360) % 360;
                    });
                    match = eq.apply(null, angles);
                } else { /* exact */
                    match = deepEq(guess[1], correct[1]) &&
                            collinear(correct[1], correct[0], guess[0]) &&
                            collinear(correct[1], correct[2], guess[2]);
                }

                if (match) {
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
        if (!state.coords || _.isEqual(state, rubric.graph)) {
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
            box: [defaultEditorBoxSize, defaultEditorBoxSize],
            labels: ["x", "y"],
            range: [[-10, 10], [-10, 10]],
            step: [1, 1],
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            correct: {
                type: "linear",
                coords: null
            }
        };
    },

    // TODO(jack): Use versioning instead of DeprecationMixin
    mixins: [DeprecationMixin],
    deprecatedProps: deprecatedProps,

    render: function() {
        var graph;
        var equationString;

        var gridStep = this.props.gridStep || Util.getGridStep(
                this.props.range,
                this.props.step,
                defaultBoxSize
        );
        var snapStep = this.props.snapStep || Util.snapStepFromGridStep(
            gridStep
        );

        if (this.props.valid === true) {
            // TODO(aria): send these down all at once
            var graphProps = {
                ref: "graph",
                box: this.props.box,
                range: this.props.range,
                labels: this.props.labels,
                step: this.props.step,
                gridStep: gridStep,
                snapStep: snapStep,
                graph: this.props.correct,
                backgroundImage: this.props.backgroundImage,
                markings: this.props.markings,
                showProtractor: this.props.showProtractor,
                showRuler: this.props.showRuler,
                rulerLabel: this.props.rulerLabel,
                rulerTicks: this.props.rulerTicks,
                flexibleType: true,
                onChange: (newProps) => {
                    var correct = this.props.correct;
                    if (correct.type === newProps.graph.type) {
                        correct = _.extend({}, correct, newProps.graph);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.graph;
                    }
                    this.props.onChange({correct: correct});
                }
            };
            graph = <InteractiveGraph {...graphProps} />;
            equationString = InteractiveGraph.getEquationString(graphProps);
        } else {
            graph = <div className="perseus-error">{this.props.valid}</div>;
        }

        return <div className="perseus-widget-interactive-graph">
            <div>Correct answer{' '}
                <InfoTip>
                    <p>Graph the correct answer in the graph below and ensure
                    the equation or point coordinates displayed represent the
                    correct answer.</p>
                </InfoTip>
                {' '}: {equationString}</div>


            <GraphSettings
                box={this.props.box}
                range={this.props.range}
                labels={this.props.labels}
                step={this.props.step}
                gridStep={gridStep}
                snapStep={snapStep}
                valid={this.props.valid}
                backgroundImage={this.props.backgroundImage}
                markings={this.props.markings}
                showProtractor={this.props.showProtractor}
                showRuler={this.props.showRuler}
                rulerLabel={this.props.rulerLabel}
                rulerTicks={this.props.rulerTicks}
                onChange={this.props.onChange} />


            {this.props.correct.type === "polygon" &&
            <div className="type-settings">
                <label>
                    {' '}Student answer must{' '}
                    <select
                            value={this.props.correct.match}
                            onChange={this.changeMatchType}>
                        <option value="exact">match exactly</option>
                        <option value="congruent">be congruent</option>
                        <option value="approx">
                            be approximately congruent</option>
                        <option value="similar">be similar</option>
                    </select>
                </label>
                <InfoTip>
                    <ul>
                        <li>
                            <p><b>Match Exactly:</b> Match exactly in size,
                            orientation, and location on the grid even if it is
                            not shown in the background.</p>
                        </li>
                        <li>
                            <p><b>Be Congruent:</b> Be congruent in size and
                            shape, but can be located anywhere on the grid.</p>
                        </li>
                        <li>
                            <p>
                                <b>Be Approximately Congruent:</b> Be exactly
                                similar, and congruent in size and shape to
                                within 0.1 units, but can be located anywhere
                                on the grid. <em>Use this with snapping to
                                angle measure.</em>
                            </p>
                        </li>
                        <li>
                            <p><b>Be Similar:</b> Be similar with matching
                            interior angles, and side measures that are
                            matching or a multiple of the correct side
                            measures. The figure can be located anywhere on the
                            grid.</p>
                        </li>
                    </ul>
                </InfoTip>
            </div>}
            {this.props.correct.type === "angle" &&
            <div className="type-settings">
                <div>
                    <label>
                        {' '}Student answer must{' '}
                        <select
                                value={this.props.correct.match}
                                onChange={this.changeMatchType}>
                            <option value="exact">match exactly</option>
                            <option value="congruent">be congruent</option>
                        </select>
                    </label>
                    <InfoTip>
                        <p>Congruency requires only that the angle measures are
                        the same. An exact match implies congruency, but also
                        requires that the angles have the same orientation and
                        that the vertices are in the same position.</p>
                    </InfoTip>
                </div>
            </div>}
            {graph}
        </div>;
    },

    changeMatchType: function(e) {
        var correct = _.extend({}, this.props.correct, {
            match: e.target.value
        });
        this.props.onChange({correct: correct});
    },

    serialize: function() {
        var json = _.pick(this.props, "step", "backgroundImage", "markings",
            "labels", "showProtractor", "showRuler", "rulerLabel",
            "rulerTicks", "range", "gridStep", "snapStep");

        var graph = this.refs.graph;
        if (graph) {
            var correct = graph && graph.getUserInput();
            _.extend(json, {
                // TODO(alpert): Allow specifying flexibleType (whether the
                // graph type should be a choice or not)
                graph: {type: correct.type},
                correct: correct
            });

            _.each(["allowReflexAngles", "angleOffsetDeg", "numPoints",
                        "numSides", "numSegments", "showAngles", "showSides",
                        "snapTo", "snapDegrees"],
                    function(key) {
                        if (_.has(correct, key)) {
                            json.graph[key] = correct[key];
                        }
                    });
        }
        return json;
    }
});

module.exports = {
    name: "interactive-graph",
    displayName: "Interactive graph",
    widget: InteractiveGraph,
    editor: InteractiveGraphEditor
};
