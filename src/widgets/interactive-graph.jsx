/** @jsx React.DOM */
(function(Perseus) {

var InfoTip = Perseus.InfoTip;
var DeprecationMixin = Perseus.Util.DeprecationMixin;

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0,
};

function eq(x, y) {
    return Math.abs(x - y) < 1e-9;
}

// Sample background image:
// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png


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

function sign(val) {
    if (eq(val, 0)) {
        return 0;
    } else {
        return val > 0 ? 1 : -1;
    }    
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
        [cd[0], cd[1], ab[1]],
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
    var triplets = _.zip(coords, rotate(coords, 1), rotate(coords, 2));

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
function similar(coords1, coords2, congruent) {
    if (coords1.length !== coords2.length) {
        return false;
    }

    var n = coords1.length;

    var angles1 = angleMeasures(coords1);
    var angles2 = angleMeasures(coords2);

    var sides1 = sideLengths(coords1);
    var sides2 = sideLengths(coords2);

    for (var i = 0; i < 2 * n; i++) {
        var angles = rotate(angles2, i);
        var sides = rotate(sides2, i);

        if (i >= n) {
            angles.reverse();
            sides.reverse();
        }

        if (deepEq(angles1, angles)) {
            var factors = _.map(_.zip(sides1, sides),  function(pair) {
                return pair[0] / pair[1];
            });

            var same = _.all(factors, function(factor) {
                return eq(factors[0], factor);
            });

            if ((congruent && same && eq(factors[0], 1)) ||
                (!congruent && same)) {
                return true;
            }
        }
    }

    return false;
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
    getDefaultProps: function() {
        return {
            range: [[-10, 10], [-10, 10]],
            box: [defaultBoxSize, defaultBoxSize],
            step: [1, 1],
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            graph: {
                type: "linear"
            }
        };
    },

    mixins: [DeprecationMixin],
    deprecatedProps: deprecatedProps,

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        var oldType = prevProps.graph.type;
        var newType = this.props.graph.type;
        if (oldType !== newType ||
                prevProps.graph.numPoints !== this.props.graph.numPoints ||
                prevProps.graph.numSides !== this.props.graph.numSides ||
                prevProps.graph.numSegments !== this.props.graph.numSegments ||
                prevProps.graph.showAngles !== this.props.graph.showAngles ||
                prevProps.graph.showSides !== this.props.graph.showSides ||
                prevProps.graph.snapDegrees !== this.props.graph.snapDegrees) {
            this["remove" + capitalize(oldType) + "Controls"]();
            this["add" + capitalize(newType) + "Controls"]();
        }
        if (this.shouldSetupGraphie) {
            this.setupGraphie();
        }
    },

    pointsFromNormalized: function(coordsList) {
        var self = this;
        return _.map(coordsList, function(coords) {
            return _.map(coords, function(coord, i) {
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
                        var type = e.target.value;
                        this.props.onChange({
                            graph: {type: type}
                        });
                    }.bind(this)}>
                <option value="linear">Linear function</option>
                <option value="quadratic">Quadratic function</option>
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
                        onChange={function(e) {
                            var num = +e.target.value;
                            this.props.onChange({
                                graph: {
                                    type: "point",
                                    numPoints: num,
                                    coords: null
                                }
                            });
                        }.bind(this)}>
                    {_.map(_.range(1, 7), function(n) {
                        return <option value={n}>
                            {n} point{n > 1 && "s"}
                        </option>;
                    })}
                </select>;
            } else if (this.props.graph.type === "polygon") {
                extraOptions = <div>
                    <div>
                        <select
                            key="polygon-select"
                            value={this.props.graph.numSides || 3}
                            onChange={function(e) {
                                var num = +e.target.value;
                                var graph = _.extend({}, this.props.graph, {
                                    numSides: num,
                                    coords: null
                                });
                                this.props.onChange({graph: graph});
                            }.bind(this)}>
                            {_.map(_.range(3, 13), function(n) {
                                return <option value={n}>{n} sides</option>;
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Show angle measures:
                            <input type="checkbox"
                                checked={this.props.graph.showAngles}
                                onClick={this.toggleShowAngles} />
                        </label>
                    </div>
                    <div>
                        <label>Show side measures:
                            <input type="checkbox"
                                checked={this.props.graph.showSides}
                                onClick={this.toggleShowSides} />
                        </label>
                    </div>
                </div>;
            } else if (this.props.graph.type === "segment") {
                extraOptions = <select
                        key="segment-select"
                        value={this.props.graph.numSegments || 1}
                        onChange={function(e) {
                            var num = +e.target.value;
                            this.props.onChange({
                                graph: {
                                    type: "segment",
                                    numSegments: num,
                                    coords: null
                                }
                            });
                        }.bind(this)}>
                    {_.map(_.range(1, 7), function(n) {
                        return <option value={n}>
                            {n} segment{n > 1 && "s"}
                        </option>;
                    })}
                </select>;
            } else if (this.props.graph.type === "angle") {
                extraOptions = <div>
                    <div>
                        <label>Show angle measure:
                            <input type="checkbox"
                                checked={this.props.graph.showAngles}
                                onClick={this.toggleShowAngles} />
                        </label>
                    </div>
                    <div>
                        <label>Snap to increments of:
                            <select key="degree-select"
                                value={this.props.graph.snapDegrees || 1}
                                onChange={function(e) {
                                    this.props.onChange({
                                        graph: _.extend({}, this.props.graph, {
                                            snapDegrees: +e.target.value,
                                            coords: null
                                        })
                                    });
                                }.bind(this)}>
                                {_.map([1, 5, 10], function(n) {
                                    return <option value={n}>
                                        {n} degree{n > 1 && "s"}
                                    </option>;
                                })}
                            </select>
                        </label>
                    </div>
                </div>;
            }
        }

        var box = this.props.box;

        var image = this.props.backgroundImage;
        if (image.url) {
            var preScale = box[0] / defaultBoxSize;
            var scale = image.scale * preScale;
            var style = {
                bottom: (preScale * image.bottom) + "px",
                left: (preScale * image.left) + "px",
                width: (scale * image.width) + "px",
                height: (scale * image.height) + "px"
            };
            image = <img style={style} src={image.url} />;
        } else {
            image = null;
        }

        return <div className={"perseus-widget " +
                    "perseus-widget-interactive-graph"}
                    style={{
                        width: box[0],
                        height: this.props.flexibleType ? "auto" : box[1]
                    }}>
            {image}
            <div className="graphie" ref="graphieDiv" />
            {typeSelect}{extraOptions}
        </div>;
    },

    componentDidMount: function() {
        this.setupGraphie();
    },

    getGridConfig: function() {
        var self = this;
        return _.map(self.props.step, function(step, i) {
            return Perseus.Util.gridDimensionConfig(
                    step,
                    self.props.range[i],
                    self.props.box[i]);
        });
    },

    setupGraphie: function() {
        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var range = this.props.range;
        var graphie = this.graphie = KhanUtil.createGraphie(graphieDiv);
        this.shouldSetupGraphie = false;

        var gridConfig = this.getGridConfig();
        graphie.snap = _.pluck(gridConfig, "snap");

        if (this.props.markings === "graph") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                axisArrows: "<->",
                labelFormat: function(s) { return "\\small{" + s + "}"; },
                gridStep: _.pluck(gridConfig, "gridStep"),
                tickStep: _.pluck(gridConfig, "tickStep"),
                labelStep: 1,
                unityLabels: _.pluck(gridConfig, "unityLabel")
            });
            graphie.label([0, range[1][1]], "y", "above");
            graphie.label([range[0][1], 0], "x", "right");
        } else if (this.props.markings === "grid") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                gridStep: _.pluck(gridConfig, "gridStep"),
                axes: false,
                ticks: false,
                labels: false
            });
        } else if (this.props.markings === "none") {
            graphie.init({
                range: range,
                scale: _.pluck(gridConfig, "scale")
            });
        }
        graphie.addMouseLayer();

        var type = this.props.graph.type;
        this["add" + capitalize(type) + "Controls"]();
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.range, nextProps.range)) {
            this.shouldSetupGraphie = true;
        }
        if (!_.isEqual(this.props.step, nextProps.step)) {
            this.shouldSetupGraphie = true;
        }
        if (!_.isEqual(this.props.markings, nextProps.markings)) {
            this.shouldSetupGraphie = true;
        }
    },

    getEquationString: function() {
        var type = this.props.graph.type;
        return this["get" + capitalize(type) + "EquationString"]();
    },

    addLine: function(type) {
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

        var lineConfig = {
            pointA: pointA,
            pointZ: pointB,
            fixed: true
        };

        if (type === "line") {
            lineConfig.extendLine = true;
        } else if (type === "ray") {
            lineConfig.extendRay = true;
        }

        var line = self.line = graphie.addMovableLineSegment(lineConfig);

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

    removeLine: function() {
        this.pointA.remove();
        this.pointB.remove();
        this.line.remove();
    },

    addLinearControls: function() {
        this.addLine("line");
    },

    getLinearEquationString: function() {
        var coords = [this.pointA.coord, this.pointB.coord];
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

    removeLinearControls: function() {
        this.removeLine();
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
            return "(" + coord[0] + ", " + coord[1] + ")";
        }).join(", ");
    },

    removePointControls: function() {
        _.invoke(this.points, "remove");
    },

    addSegmentControls: function() {
        var graphie = this.graphie;

        var coords = InteractiveGraph.getSegmentCoords(this.props.graph, this);

        this.points = [];
        this.lines = _.map(coords, function(segment, i) {
            var pointA = graphie.addMovablePoint({
                coord: segment[0],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
                }
            });
            this.points.push(pointA);

            var pointB = graphie.addMovablePoint({
                coord: segment[1],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
                }
            });
            this.points.push(pointB);

            var line = graphie.addMovableLineSegment({
                pointA: pointA,
                pointZ: pointB,
                fixed: true
            });

            // A and B can't be in the same place
            pointA.onMove = function(x, y) {
                return !_.isEqual([x, y], pointB.coord);
            };
            pointB.onMove = function(x, y) {
                return !_.isEqual([x, y], pointA.coord);
            };

            $([pointA, pointB]).on("move", function() {
                var segments = _.map(this.lines, function(line) {
                    return [line.pointA.coord, line.pointZ.coord];
                });
                var graph = _.extend({}, this.props.graph, {
                    coords: segments
                });
                this.props.onChange({graph: graph});
            }.bind(this));

            return line;
        }, this);
    },

    removeSegmentControls: function() {
        _.invoke(this.points, "remove");
        _.invoke(this.lines, "remove");
    },

    getSegmentEquationString: function() {
        var segments = this.props.graph.coords;
        return _.map(segments, function(segment) {
            return "[" +
                _.map(segment, function(coord) {
                    return "(" + coord.join(", ") + ")";
                }).join(" ") +
            "]";
        }).join(" ");
    },

    addRayControls: function() {
        this.addLine("ray");
    },

    removeRayControls: function() {
        this.removeLine();
    },

    getRayEquationString: function() {
        var a = this.pointA.coord;
        var b = this.pointB.coord;
        var eq = this.getLinearEquationString();

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

    addPolygonControls: function() {
        var graphie = this.graphie;

        var coords = InteractiveGraph.getPolygonCoords(this.props.graph, this);
        var n = coords.length;

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

            // Index relative to current point -> absolute index
            function rel(j) {
                return (i + j + n) % n;
            }

            point.onMove = function(x, y) {
                var coords = _.pluck(this.points, "coord");
                coords[i] = [x, y];

                // Polygons can't have consecutive collinear points
                if (collinear(coords[rel(-2)], coords[rel(-1)], coords[i]) ||
                    collinear(coords[rel(-1)], coords[i],  coords[rel(1)]) ||
                    collinear(coords[i],  coords[rel(1)],  coords[rel(2)])) {
                    return false;
                }

                var segments = _.zip(coords, rotate(coords));

                if (n > 3) {
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

        var angleLabels = _.times(n, function() {
            return this.props.graph.showAngles ? "$deg1" : "";
        }, this);

        var numArcs = _.times(n, function() {
            return this.props.graph.showAngles ? 1 : 0;
        }, this);

        var sideLabels = _.times(n, function() {
            return this.props.graph.showSides ? "$len1" : "";
        }, this);

        this.polygon = graphie.addMovablePolygon({
            points: this.points,
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            angleLabels: angleLabels,
            numArcs: numArcs,
            sideLabels: sideLabels
        });

        $(this.polygon).on("move", function() {
            var graph = _.extend({}, this.props.graph, {
                coords: _.pluck(this.points, "coord")
            });
            this.props.onChange({graph: graph});
        }.bind(this));
    },

    removePolygonControls: function() {
        _.invoke(this.points, "remove");
        this.polygon.remove();
    },

    getPolygonEquationString: function() {
        var coords = this.props.graph.coords;
        return _.map(coords, function(coord) {
            return "(" + coord.join(", ") + ")";
        }).join(" ");
    },

    addAngleControls: function() {
        var graphie = this.graphie;

        var coords = InteractiveGraph.getAngleCoords(this.props.graph, this);

        // The vertex snaps to the grid, but the rays don't...
        this.points = _.map(coords, function(coord, i) {
            return graphie.addMovablePoint(_.extend({
                coord: coord,
                normalStyle: {
                    stroke: KhanUtil.BLUE,
                    fill: KhanUtil.BLUE
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
            angleLabel: this.props.graph.showAngles ? "$deg0" : "",
            pushOut: 2
        });

        $(this.angle).on("move", function() {
            var graph = _.extend({}, this.props.graph, {
                coords: this.angle.coords
            });
            this.props.onChange({graph: graph});
        }.bind(this));
    },

    removeAngleControls: function() {
        _.invoke(this.points, "remove");
        this.angle.remove();
    },

    getAngleEquationString: function() {
        var coords = this.angle.coords;
        var angle = KhanUtil.findAngle(coords[2], coords[0], coords[1]);
        return angle.toFixed(0) + "\u00B0 angle" +
                " at (" + coords[1].join(", ") + ")";
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
                    coords = [[-5, 0], [-3, 0], [-1, 0], [1, 0], [3, 0],
                              [5, 0]];
                    break;
            }
            // Transform coords from their -10 to 10 space to 0 to 1
            // because of the old graph.coord, and also it's easier.
            var range = [[-10, 10], [-10, 10]];
            coords = InteractiveGraph.normalizeCoords(coords, range);

            var coords = component.pointsFromNormalized(coords);
            return coords;
        }
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     */
    getPolygonCoords: function(graph, component) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var n = graph.numSides || 3;
        var angle = 2 * Math.PI / n;
        var offset = (1 / n - 1 / 2) * Math.PI;
        var radius = 4;

        // Generate coords of a regular polygon with n sides
        coords = _.times(n, function(i) {
            return [
                radius * Math.cos(i * angle + offset),
                radius * Math.sin(i * angle + offset)
            ];
        });

        var range = [[-10, 10], [-10, 10]];
        coords = InteractiveGraph.normalizeCoords(coords, range);

        coords = component.pointsFromNormalized(coords);
        return coords;
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     */
    getSegmentCoords: function(graph, component) {
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
            6: [5, 3, 1, -1, -3, -5],
        }[n];
        var range = [[-10, 10], [-10, 10]];

        return _.map(ys, function(y) {
            var segment = [[-5, y], [5, y]];
            segment = InteractiveGraph.normalizeCoords(segment, range);
            segment = component.pointsFromNormalized(segment);
            return segment;
        });
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     */
    getAngleCoords: function(graph, component) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var snap = graph.snapDegrees || 1;
        var angle = {
            1: 23,
            5: 25,
            10: 20
        }[snap] * Math.PI / 180;

        coords = component.pointsFromNormalized([
            [0.75, 0.50],
            [0.25, 0.50]
        ]);

        var radius = magnitude(vector.apply(null, coords));

        coords[2] = [
            coords[1][0] + radius * Math.cos(angle),
            coords[1][1] + radius * Math.sin(angle)
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
            } else if (state.type === "polygon") {
                var guess = state.coords.slice();
                var correct = rubric.correct.coords.slice();

                var match;
                if (rubric.correct.match === "similar") {
                    match = similar(guess, correct);
                } else if (rubric.correct.match === "congruent") {
                    match = similar(guess, correct, /* congruent */ true);
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
        var step = this.props.step || [1, 1];
        return {
            box: [340, 340],
            range: range,
            rangeTextbox: range,
            step: step,
            stepTextbox: step,
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
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

    mixins: [DeprecationMixin],
    deprecatedProps: deprecatedProps,

    render: function() {
        var graph;
        if (this.props.valid === true) {
            graph = <InteractiveGraph
                ref="graph"
                box={this.props.box}
                range={this.props.range}
                step={this.props.step}
                graph={this.props.correct}
                backgroundImage={this.props.backgroundImage}
                markings={this.props.markings}
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
                }.bind(this)} />;
        } else {
            graph = <div>{this.props.valid}</div>;
        }
        return <div className="perseus-widget-interactive-graph">
            <div>Correct answer: {this.state.equationString}</div>
            <div className="graph-settings">
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
                    Step:
                    <input  type="text"
                            ref="step-0"
                            onInput={_.bind(this.changeStep, this, 0)}
                            value={this.props.stepTextbox[0]} />
                    <input  type="text"
                            ref="step-1"
                            onInput={_.bind(this.changeStep, this, 1)}
                            value={this.props.stepTextbox[1]} />
                </div>
                <div>
                    <label>Markings:
                        <select value={this.props.markings}
                                onChange={this.changeMarkings}>
                            <option value="graph">Graph (axes + grid)</option>
                            <option value="grid">Grid only</option>
                            <option value="none">None</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="image-settings">
                <div>Background image:</div>
                <div>Url:
                    <input type="text"
                            className="graph-settings-background-url"
                            ref="bg-url"
                            defaultValue={this.props.backgroundImage.url}
                            onKeyPress={this.changeBackgroundUrl}
                            onBlur={this.changeBackgroundUrl} />
                </div>
                {this.props.backgroundImage.url && <div>
                    <div>Pixels from left:
                        <input type="text"
                                ref="bg-left"
                                value={this.props.backgroundImage.left}
                                onInput={
                        _.partial(this.changeBackgroundSetting, "left")} />
                    </div>
                    <div>Pixels from bottom:
                        <input type="text"
                                ref="bg-bottom"
                                value={this.props.backgroundImage.bottom}
                                onInput={
                        _.partial(this.changeBackgroundSetting, "bottom")} />
                    </div>
                    <div>Image scale:
                        <input type="text"
                                ref="bg-scale"
                                value={this.props.backgroundImage.scale}
                                onInput={
                        _.partial(this.changeBackgroundSetting, "scale")} />
                    </div>
                </div>}
            </div>
            {this.props.correct.type === "polygon" &&
            <div className="type-settings">
                Student answer must
                <select
                        value={this.props.correct.match}
                        onChange={this.changeMatchType}>
                    <option value="exact">match exactly</option>
                    <option value="congruent">be congruent</option>
                    <option value="similar">be similar</option>
                </select>
            </div>}
            {this.props.correct.type === "angle" &&
            <div className="type-settings">
                <div>
                    Student answer must
                    <select
                            value={this.props.correct.match}
                            onChange={this.changeMatchType}>
                        <option value="exact">match exactly</option>
                        <option value="congruent">be congruent</option>
                    </select>
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

    validRange: function(range) {
        var numbers = _.every(range, function(num) {
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

    validStep: function(step, range) {
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

    valid: function(range, step) {
        var self = this;
        var msg;
        var goodRange = _.every(range, function(range) {
            msg = self.validRange(range);
            return msg === true;
        });
        if (!goodRange) {
            return msg;
        }
        var goodStep = _.every(step, function(step, i) {
            msg = self.validStep(step, range[i]);
            return msg === true;
        });
        if (!goodStep) {
            return msg;
        }
        return true;
    },

    changeRange: function(i, j, e) {
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

    changeStep: function(i, e) {
        var val = this.refs["step-" + i].getDOMNode().value;
        var step = this.props.stepTextbox.slice();
        step[i] = val;
        this.props.onChange({ stepTextbox: step },
                this.changeGraph);
    },

    changeMarkings: function(e) {
        this.props.onChange({markings: e.target.value});
    },

    changeGraph: function() {
        var range = this.props.rangeTextbox;
        var step = this.props.stepTextbox;
        var range = _.map(this.props.rangeTextbox, function(range) {
            return _.map(range, Number);
        });
        var step = _.map(this.props.stepTextbox, Number);
        var valid = this.valid(range, step);
        if (valid === true) {
            this.props.onChange({
                valid: true,
                range: range,
                step: step
            });
        } else {
            this.props.onChange({
                valid: valid
            });
        }
    },

    changeBackgroundUrl: function(e) {
        var self = this;

        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        var url = self.refs["bg-url"].getDOMNode().value;
        var setUrl = function() {
            var image = _.clone(self.props.backgroundImage);
            image.url = url;
            image.width = img.width;
            image.height = img.height;
            self.props.onChange({
                backgroundImage: image,
                markings: url ? "none" : "graph"
            });
        };
        if (url) {
            var img = new Image();
            img.onload = setUrl;
            img.src = url;
        } else {
            var img = {
                url: url,
                width: 0,
                height: 0
            };
            setUrl();
        }
    },

    changeBackgroundSetting: function(type, e) {
        var image = _.clone(this.props.backgroundImage);
        image[type] = e.target.value;
        this.props.onChange({ backgroundImage: image });
    },

    changeMatchType: function(e) {
        var correct = _.extend({}, this.props.correct, {
            match: e.target.value
        });
        this.props.onChange({correct: correct});
    },

    componentDidMount: function() {
        var changeGraph = this.changeGraph;
        this.changeGraph = _.debounce(_.bind(changeGraph, this), 300);
        this.updateEquationString();
    },

    updateEquationString: function() {
        this.setState({
            equationString: this.refs.graph.getEquationString()
        });
    },

    toJSON: function() {
        var json = {
            step: this.props.step,
            backgroundImage: this.props.backgroundImage,
            markings: this.props.markings,
            range: this.props.range
        };
        var graph = this.refs.graph;
        if (graph) {
            var correct = graph && graph.toJSON();
            _.extend(json, {
                // TODO(alpert): Allow specifying flexibleType (whether the
                // graph type should be a choice or not)
                graph: {type: correct.type},
                correct: correct
            });

            _.each(["numPoints", "numSides", "numSegments",
                    "showAngles", "showSides", "snapDegrees"],
                    function(key) {
                        if (_.has(correct, key)) {
                            json.graph[key] = correct[key];
                        }
                    });
        }
        return json;
    }
});

Perseus.Widgets.register("interactive-graph", InteractiveGraph);
Perseus.Widgets.register("interactive-graph-editor", InteractiveGraphEditor);

})(Perseus);
