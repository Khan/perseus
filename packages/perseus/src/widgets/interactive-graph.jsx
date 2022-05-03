/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
// @flow
import {number as knumber, point as kpoint} from "@khanacademy/kmath";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import $ from "jquery";
import debounce from "lodash.debounce";
import * as React from "react";
import _ from "underscore";

import Graph from "../components/graph.jsx";
import Interactive2 from "../interactive2.js";
import WrappedLine from "../interactive2/wrapped-line.js";
import {Errors} from "../logging/log.js";
import {PerseusError} from "../perseus-error.js";
import Util from "../util.js";
import KhanColors from "../util/colors.js";
import GraphUtils from "../util/graph-utils.js";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils.js";

import type {Coord, Line} from "../interactive2/types.js";
import type {
    PerseusGraphType,
    PerseusGraphTypeAngle,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeSegment,
    PerseusInteractiveGraphWidgetOptions,
} from "../perseus-types.js";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types.js";

type Range = $ReadOnlyArray<number>; // This should really be a readonly tuple of [number, number]
type SineCoefficient = [
    /* amplitude */ number,
    /* angularFrequency */ number,
    /* phase */ number,
    /* verticalOffset */ number,
];
type QuadraticCoefficient = [/* a */ number, /* b */ number, /* c */ number];

const {DeprecationMixin} = Util;

const TRASH_ICON_URI =
    "https://ka-perseus-graphie.s3.amazonaws.com/b1452c0d79fd0f7ff4c3af9488474a0a0decb361.png";

const defaultBackgroundImage = {
    url: null,
};

const eq = Util.eq;
const deepEq = Util.deepEq;

const UNLIMITED = ("unlimited": "unlimited");

// Sample background image:
// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png

function ccw(a: Coord, b: Coord, c: Coord): number {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

function collinear(a: Coord, b: Coord, c: Coord): boolean {
    return eq(ccw(a, b, c), 0);
}

function sign(val: number): 0 | 1 | -1 {
    if (eq(val, 0)) {
        return 0;
    }
    return val > 0 ? 1 : -1;
}

// default to defaultValue if actual is null or undefined
function defaultVal<T>(actual: ?T, defaultValue: T): T {
    return actual == null ? defaultValue : actual;
}

// Given rect bounding points A and B, whether point C is inside the rect
function pointInRect(a: Coord, b: Coord, c: Coord): boolean {
    return (
        c[0] <= Math.max(a[0], b[0]) &&
        c[0] >= Math.min(a[0], b[0]) &&
        c[1] <= Math.max(a[1], b[1]) &&
        c[1] >= Math.min(a[1], b[1])
    );
}

// Whether line segment AB intersects line segment CD
// http://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
function intersects(ab: Line, cd: Line): boolean {
    const triplets = [
        [ab[0], ab[1], cd[0]],
        [ab[0], ab[1], cd[1]],
        [cd[0], cd[1], ab[0]],
        [cd[0], cd[1], ab[1]],
    ];

    const orientations = _.map(triplets, function (triplet) {
        return sign(ccw(...triplet));
    });

    if (
        orientations[0] !== orientations[1] &&
        orientations[2] !== orientations[3]
    ) {
        return true;
    }

    for (let i = 0; i < 4; i++) {
        if (orientations[i] === 0 && pointInRect(...triplets[i])) {
            return true;
        }
    }

    return false;
}

function vector(a, b) {
    return _.map(_.zip(a, b), function (pair) {
        return pair[0] - pair[1];
    });
}

function magnitude(v: $ReadOnlyArray<Coord>): number {
    return Math.sqrt(
        _.reduce(
            v,
            function (memo, el) {
                return memo + Math.pow(el, 2);
            },
            0,
        ),
    );
}

function dotProduct(a: Coord, b: Coord): number {
    return _.reduce(
        _.zip(a, b),
        function (memo, pair) {
            return memo + pair[0] * pair[1];
        },
        0,
    );
}

function sideLengths(coords: $ReadOnlyArray<Coord>): $ReadOnlyArray<number> {
    const segments = _.zip(coords, rotate(coords));
    return segments.map(function (segment) {
        return magnitude(vector(...segment));
    });
}

// Based on http://math.stackexchange.com/a/151149
function angleMeasures(coords: $ReadOnlyArray<Coord>): $ReadOnlyArray<number> {
    const triplets = _.zip(rotate(coords, -1), coords, rotate(coords, 1));

    const offsets = _.map(triplets, function (triplet) {
        const p = vector(triplet[1], triplet[0]);
        const q = vector(triplet[2], triplet[1]);
        const raw = Math.acos(dotProduct(p, q) / (magnitude(p) * magnitude(q)));
        return sign(ccw(...triplet)) > 0 ? raw : -raw;
    });

    const sum = _.reduce(
        offsets,
        function (memo, arg) {
            return memo + arg;
        },
        0,
    );

    return _.map(offsets, function (offset) {
        return sum > 0 ? Math.PI - offset : Math.PI + offset;
    });
}

// Whether two polygons are similar (or if specified, congruent)
function similar(
    coords1: $ReadOnlyArray<Coord>,
    coords2: $ReadOnlyArray<Coord>,
    tolerance: number,
): boolean {
    if (coords1.length !== coords2.length) {
        return false;
    }

    const n = coords1.length;

    const angles1 = angleMeasures(coords1);
    const angles2 = angleMeasures(coords2);

    const sides1 = sideLengths(coords1);
    const sides2 = sideLengths(coords2);

    for (let i = 0; i < 2 * n; i++) {
        let angles = angles2.slice();
        let sides = sides2.slice();

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
            const sidePairs = _.zip(sides1, sides);

            const factors = _.map(sidePairs, function (pair) {
                return pair[0] / pair[1];
            });

            const same = _.all(factors, function (factor) {
                return eq(factors[0], factor);
            });

            const congruentEnough = _.all(sidePairs, function (pair) {
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
function lawOfCosines(a: number, b: number, c: number): number {
    return (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI;
}

function canonicalSineCoefficients([
    amplitude,
    angularFrequency,
    phase,
    verticalOffset,
]: SineCoefficient) {
    // For a curve of the form f(x) = a * Sin(b * x - c) + d,
    // this function ensures that a, b > 0, and c is its
    // smallest possible positive value.

    // Guarantee a > 0
    if (amplitude < 0) {
        amplitude *= -1;
        angularFrequency *= -1;
        phase *= -1;
    }

    const period = 2 * Math.PI;
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
function rotate<T>(array: $ReadOnlyArray<T>, n?: number): $ReadOnlyArray<T> {
    n = typeof n === "undefined" ? 1 : n % array.length;
    return array.slice(n).concat(array.slice(0, n));
}

function capitalize(str) {
    return str.replace(/(?:^|-)(.)/g, function (match, letter) {
        return letter.toUpperCase();
    });
}

function getLineEquation(first: Coord, second: Coord): string {
    if (eq(first[0], second[0])) {
        return "x = " + first[0].toFixed(3);
    }
    const m = (second[1] - first[1]) / (second[0] - first[0]);
    const b = first[1] - m * first[0];
    return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
}

// Stolen from the wikipedia article
// http://en.wikipedia.org/wiki/Line-line_intersection
function getLineIntersection(
    // TODO(LP-10725): update these to be 2-tuples
    firstPoints: $ReadOnlyArray<Coord>,
    secondPoints: $ReadOnlyArray<Coord>,
): string {
    const x1 = firstPoints[0][0];
    const y1 = firstPoints[0][1];
    const x2 = firstPoints[1][0];
    const y2 = firstPoints[1][1];
    const x3 = secondPoints[0][0];
    const y3 = secondPoints[0][1];
    const x4 = secondPoints[1][0];
    const y4 = secondPoints[1][1];

    const determinant = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (Math.abs(determinant) < 1e-9) {
        return "Lines are parallel";
    }
    const x =
        ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
        determinant;
    const y =
        ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
        determinant;
    return "Intersection: (" + x.toFixed(3) + ", " + y.toFixed(3) + ")";
}

function numSteps(range: Range, step: number) {
    return Math.floor((range[1] - range[0]) / step);
}

const deprecatedProps = {
    showGraph: function (props) {
        return {markings: props.showGraph ? "graph" : "none"};
    },
};

const _getShouldShowInstructions: (Props) => boolean = (props) => {
    return (
        _isClickToAddPoints(props) &&
        (props.graph.coords == null || props.graph.coords.length === 0)
    );
};

const _isClickToAddPoints: (Props) => boolean = (props) => {
    return (
        (props.graph.type === "point" && props.graph.numPoints === UNLIMITED) ||
        (props.graph.type === "polygon" && props.graph.numSides === UNLIMITED)
    );
};

const makeInvalidTypeError = (
    functionName: string,
    graphType: string,
): PerseusError => {
    return new PerseusError(
        `${functionName} called but current graph type is not a '${graphType}'`,
        Errors.NotAllowed,
        {metadata: {graphType}},
    );
};

type RenderProps = PerseusInteractiveGraphWidgetOptions; // There's no transform function in exports
type Rubric = PerseusInteractiveGraphWidgetOptions;
type Props = WidgetProps<RenderProps, Rubric>;
type State = $FlowFixMe;
type DefaultProps = {|
    labels: Props["labels"],
    range: Props["range"],
    step: Props["step"],
    backgroundImage: Props["backgroundImage"],
    markings: Props["markings"],
    showTooltips: Props["showTooltips"],
    showProtractor: Props["showProtractor"],
    showRuler: Props["showRuler"],
    rulerLabel: Props["rulerLabel"],
    rulerTicks: Props["rulerTicks"],
    graph: Props["graph"],
|};

class InteractiveGraph extends React.Component<Props, State> {
    angle: ?$FlowFixMe;
    circle: ?$FlowFixMe;
    graphie: ?$FlowFixMe;
    horizHairline: ?$FlowFixMe;
    line: ?$FlowFixMe;
    lines: ?$ReadOnlyArray<$ReadOnlyArray<Coord>>;
    parabola: ?$FlowFixMe;
    pointA: ?$FlowFixMe;
    pointB: ?$FlowFixMe;
    pointC: ?$FlowFixMe;
    // eslint-disable-next-line flowtype/no-mutable-array
    points: Array<$FlowFixMe>;
    polygon: ?$FlowFixMe;
    shouldResetGraphie: boolean;
    sinusoid: ?$FlowFixMe;
    trashCan: ?$FlowFixMe;
    vertHairline: ?$FlowFixMe;

    static defaultProps: DefaultProps = {
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        // $FlowFixMe[prop-missing]
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        showTooltips: false,
        showProtractor: false,
        showRuler: false,
        rulerLabel: "",
        rulerTicks: 10,
        graph: {
            type: "linear",
        },
    };

    state: State = {
        shouldShowInstructions: _getShouldShowInstructions(this.props),
    };

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        DeprecationMixin.UNSAFE_componentWillMount.call(this);
    }

    componentDidMount() {
        // eslint-disable-next-line react/no-string-refs
        this.setGraphie(this.refs.graph.graphie());
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.isClickToAddPoints() !== this.isClickToAddPoints(nextProps)) {
            this.shouldResetGraphie = true;
            this.setState({
                shouldShowInstructions: _getShouldShowInstructions(nextProps),
            });
        }

        if (
            this.props.backgroundImage?.url !==
                nextProps.backgroundImage?.url ||
            this.props.backgroundImage !== nextProps.backgroundImage ||
            this.props.containerSizeClass !== nextProps.containerSizeClass
        ) {
            this.shouldResetGraphie = true;
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // TODO(jeremy): This feels underspecified. For example, if the props
        // change the coords of a segment graph, but not the numSegments, we'd
        // not count that as an update.
        const oldType = prevProps.graph.type;
        const newType = this.props.graph.type;
        if (
            oldType !== newType ||
            (prevProps.graph.type === "angle" &&
                this.props.graph.type === "angle" &&
                this.areAngleGraphsEqual(prevProps.graph, this.props.graph)) ||
            (prevProps.graph.type === "point" &&
                this.props.graph.type === "point" &&
                this.arePointGraphsEqual(prevProps.graph, this.props.graph)) ||
            (prevProps.graph.type === "polygon" &&
                this.props.graph.type === "polygon" &&
                this.arePolygonGraphsEqual(
                    prevProps.graph,
                    this.props.graph,
                )) ||
            (prevProps.graph.type === "segment" &&
                this.props.graph.type === "segment" &&
                this.areSegmentGraphsEqual(prevProps.graph, this.props.graph))
        ) {
            // $FlowFixMe[incompatible-use]
            this["remove" + capitalize(oldType) + "Controls"]();
            // $FlowFixMe[incompatible-use]
            this["add" + capitalize(newType) + "Controls"]();
        }
        if (this.shouldResetGraphie) {
            this.resetGraphie();
        }
    }

    _getShouldShowInstructions: (?Props) => boolean = (props) => {
        props = props || this.props;
        return (
            this.isClickToAddPoints(props) &&
            (props.graph.coords == null || props.graph.coords.length === 0)
        );
    };

    deprecatedProps: $FlowFixMe = deprecatedProps;

    setGraphie: ($FlowFixMe) => void = (newGraphie) => {
        this.graphie = newGraphie;
        this.setupGraphie();
    };

    handleAddPointsMouseDown: (Coord) => void = (coord) => {
        // This function should only be called when this.isClickToAddPoints()
        // is true
        if (!this.isClickToAddPoints()) {
            throw new PerseusError(
                "handleAddPointsClick should not be registered" +
                    "when isClickToAddPoints() is false",
                Errors.NotAllowed,
            );
        }
        if (!this.isCoordInTrash(coord)) {
            let point;

            if (this.props.graph.type === "point") {
                point = this.createPointForPointsType(
                    coord,
                    this.points.length,
                );
                if (!point.constrain()) {
                    point.remove();
                    return;
                }
                this.points.push(point);

                // interactive2 allows us to grab the point
                const idx = this.points.length - 1;
                this.points[idx].grab(coord);

                this.updateCoordsFromPoints();
            } else if (this.props.graph.type === "polygon") {
                if (this.polygon?.closed()) {
                    return;
                }
                point = this.createPointForPolygonType(
                    coord,
                    this.points.length,
                );
                this.points.push(point);

                const idx = this.points.length - 1;
                this.points[idx].grab(coord);

                // We don't call updateCoordsFromPoints for
                // polygons, since the polygon won't be
                // closed yet.
                this.updatePolygon();
            }

            this.setState({
                shouldShowInstructions: false,
            });
        }
    };

    resetGraphie: () => void = () => {
        this.shouldResetGraphie = false;
        this.parabola = null;
        this.sinusoid = null;
        // eslint-disable-next-line react/no-string-refs
        this.refs.graph.reset();
    };

    setupGraphie: () => void = () => {
        this.setTrashCanVisibility(0);
        if (this.isClickToAddPoints()) {
            this.setTrashCanVisibility(0.5);
        }

        if (this.props.apiOptions.isMobile) {
            // $FlowFixMe[invalid-constructor]
            this.horizHairline = new WrappedLine(this.graphie, [0, 0], [0, 0], {
                normalStyle: {
                    strokeWidth: 1,
                },
            });
            this.horizHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.horizHairline?.hide();

            // $FlowFixMe[invalid-constructor]
            this.vertHairline = new WrappedLine(this.graphie, [0, 0], [0, 0], {
                normalStyle: {
                    strokeWidth: 1,
                },
            });
            this.vertHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.vertHairline?.hide();
        }

        const type = this.props.graph.type;
        // $FlowFixMe[incompatible-use]
        this["add" + capitalize(type) + "Controls"]();
    };

    showHairlines: (Coord) => void = (point) => {
        if (this.props.apiOptions.isMobile && this.props.markings !== "none") {
            // Hairlines are already initialized when the graph is loaded, so
            // here we just move them to the updated location and make them
            // visible.
            this.horizHairline?.moveTo(
                [this.props.range[0][0], point[1]],
                [this.props.range[0][1], point[1]],
            );

            this.horizHairline?.show();

            this.vertHairline?.moveTo(
                [point[0], this.props.range[1][0]],
                [point[0], this.props.range[1][1]],
            );

            this.vertHairline?.show();
        }
    };

    hideHairlines: () => void = () => {
        if (this.props.apiOptions.isMobile) {
            this.horizHairline?.hide();
            this.vertHairline?.hide();
        }
    };

    setTrashCanVisibility: (number) => void = (opacity) => {
        const graphie = this.graphie;

        if (knumber.equal(opacity, 0)) {
            if (this.trashCan) {
                this.trashCan.remove();
                this.trashCan = null;
            }
        } else if (!this.props.apiOptions.isMobile) {
            // Only if trash tooltips are not being used, we initialize the old
            // trash can area.
            if (!this.trashCan) {
                this.trashCan = graphie?.raphael?.image(
                    TRASH_ICON_URI,
                    graphie.xpixels - 40,
                    graphie.ypixels - 40,
                    40,
                    40,
                );
            }
            this.trashCan?.attr({
                opacity: opacity,
            });
        }
    };

    isClickToAddPoints: (?Props) => boolean = (props) => {
        props = props || this.props;
        return _isClickToAddPoints(props);
    };

    areAngleGraphsEqual(
        prevGraph: PerseusGraphTypeAngle,
        currentGraph: PerseusGraphTypeAngle,
    ): boolean {
        return (
            prevGraph.allowReflexAngles !== currentGraph.allowReflexAngles ||
            prevGraph.angleOffsetDeg !== currentGraph.angleOffsetDeg ||
            prevGraph.snapDegrees !== currentGraph.snapDegrees
        );
    }

    arePointGraphsEqual(
        prevGraph: PerseusGraphTypePoint,
        currentGraph: PerseusGraphTypePoint,
    ): boolean {
        return prevGraph.numPoints !== currentGraph.numPoints;
    }

    arePolygonGraphsEqual(
        prevGraph: PerseusGraphTypePolygon,
        currentGraph: PerseusGraphTypePolygon,
    ): boolean {
        return (
            prevGraph.numSides !== currentGraph.numSides ||
            prevGraph.showAngles !== currentGraph.showAngles ||
            prevGraph.showSides !== currentGraph.showSides ||
            prevGraph.snapTo !== currentGraph.snapTo
        );
    }

    areSegmentGraphsEqual(
        prevGraph: PerseusGraphTypeSegment,
        currentGraph: PerseusGraphTypeSegment,
    ): boolean {
        return prevGraph.numSegments !== currentGraph.numSegments;
    }

    _lineStroke: () => {|"stroke-width"?: number|} = () => {
        // This should probably use: this.props.apiOptions.isMobile
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-exact]
        return this.props.isMobile ? {"stroke-width": 3} : {};
    };

    addLine: (string) => void = (type) => {
        const self = this;
        const graphie = self.graphie;
        const coords = InteractiveGraph.getLineCoords(
            self.props.graph,
            self.props,
        );

        const points = (self.points = _.map(coords, (coord) => {
            return Interactive2.addMaybeMobileMovablePoint(this, {
                coord: coord,
                constraints: [
                    // $FlowFixMe[prop-missing]
                    Interactive2.MovablePoint.constraints.bound(),
                    // $FlowFixMe[prop-missing]
                    Interactive2.MovablePoint.constraints.snap(),
                ],
                onMove: () => {
                    const graph = _.extend({}, self.props.graph, {
                        coords: _.invoke(points, "coord"),
                    });
                    self.onChange({graph: graph});
                },
            });
        }));

        const lineConfig = {
            points: points,
            static: true,
            normalStyle: {
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.BLUE_C
                    : KhanColors.INTERACTIVE,
                ...this._lineStroke(),
            },
        };

        if (type === "line") {
            // $FlowFixMe[prop-missing]
            lineConfig.extendLine = true;
        } else if (type === "ray") {
            // $FlowFixMe[prop-missing]
            lineConfig.extendRay = true;
        }

        self.line = Interactive2.addMovableLine(graphie, lineConfig);

        // A and B can't be in the same place
        points[0].listen("constraints", "isLine", (coord) => {
            return !kpoint.equal(coord, points[1].coord());
        });
        points[1].listen("constraints", "isLine", (coord) => {
            return !kpoint.equal(coord, points[0].coord());
        });
    };

    removeLine: () => void = () => {
        _.invoke(this.points, "remove");
        this.line?.remove();
    };

    addLinearControls: () => void = () => {
        this.addLine("line");
    };

    removeLinearControls: () => void = () => {
        this.removeLine();
    };

    addQuadraticControls: () => void = () => {
        if (this.props.graph.type !== "quadratic") {
            throw makeInvalidTypeError("addQuadraticControls", "quadratic");
        }

        let coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultQuadraticCoords(this.props);
        }

        const onMoveHandler = () => {
            const graph = _.extend({}, this.props.graph, {
                // $FlowFixMe[incompatible-use]
                coords: [pointA.coord(), pointB.coord(), pointC.coord()],
            });
            this.onChange({graph});
            this.updateQuadratic();
        };

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointA = null;
        pointA = this.pointA = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[0],
            constraints: [
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.bound(),
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return (
                        !pointA ||
                        // $FlowFixMe[incompatible-use]
                        (coord[0] !== pointB.coord()[0] &&
                            // $FlowFixMe[incompatible-use]
                            coord[0] !== pointC.coord()[0])
                    );
                },
            ],
            onMove: onMoveHandler,
        });

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointB = null;
        pointB = this.pointB = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[1],
            constraints: [
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.bound(),
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return (
                        !pointB ||
                        // $FlowFixMe[incompatible-use]
                        (coord[0] !== pointA.coord()[0] &&
                            // $FlowFixMe[incompatible-use]
                            coord[0] !== pointC.coord()[0])
                    );
                },
            ],
            onMove: onMoveHandler,
        });

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointC = null;
        pointC = this.pointC = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[2],
            constraints: [
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.bound(),
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return (
                        !pointC ||
                        // $FlowFixMe[incompatible-use]
                        (coord[0] !== pointA.coord()[0] &&
                            // $FlowFixMe[incompatible-use]
                            coord[0] !== pointB.coord()[0])
                    );
                },
            ],
            onMove: onMoveHandler,
        });

        this.updateQuadratic();
    };

    updateQuadratic: () => void = () => {
        const coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(
            this.props,
        );
        if (!coeffs) {
            return;
        }

        // Extract coefficients the parabola
        const a = coeffs[0];
        const b = coeffs[1];
        const c = coeffs[2];

        // Plot and style
        if (this.parabola) {
            const path = this.graphie?.svgParabolaPath(a, b, c);
            this.parabola?.attr({path: path});
        } else {
            this.parabola = this.graphie?.parabola(a, b, c);
            this.parabola?.attr({
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.BLUE_C
                    : KhanColors.DYNAMIC,
                ...this._lineStroke(),
            });
            this.parabola?.toBack();
        }
    };

    removeQuadraticControls: () => void = () => {
        this.pointA?.remove();
        this.pointB?.remove();
        this.pointC?.remove();
        if (this.parabola) {
            this.parabola.remove();
            this.parabola = null;
        }
    };

    addSinusoidControls: () => void = () => {
        if (this.props.graph.type !== "sinusoid") {
            throw makeInvalidTypeError("addSinusoidControls", "sinusoid");
        }
        let coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultSinusoidCoords(this.props);
        }

        const onMoveHandler = () => {
            const graph = _.extend({}, this.props.graph, {
                // $FlowFixMe[incompatible-use]
                coords: [pointA.coord(), pointB.coord()],
            });
            this.onChange({graph: graph});
            this.updateSinusoid();
        };

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointA = null;
        pointA = this.pointA = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[0],
            constraints: [
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.bound(),
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return !pointA || coord[0] !== pointB.coord()[0];
                },
            ],
            onMove: onMoveHandler,
        });

        const pointB = (this.pointB = Interactive2.addMaybeMobileMovablePoint(
            this,
            {
                coord: coords[1],
                constraints: [
                    // $FlowFixMe[prop-missing]
                    Interactive2.MovablePoint.constraints.bound(),
                    // $FlowFixMe[prop-missing]
                    Interactive2.MovablePoint.constraints.snap(),
                    (coord) => {
                        return !pointA || coord[0] !== pointA.coord()[0];
                    },
                ],
                onMove: onMoveHandler,
            },
        ));

        this.updateSinusoid();
    };

    updateSinusoid: () => void = () => {
        const coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(
            this.props,
        );
        if (!coeffs) {
            return;
        }

        const a = coeffs[0];
        const b = coeffs[1];
        const c = coeffs[2];
        const d = coeffs[3];

        // Plot and style
        if (this.sinusoid) {
            const path = this.graphie?.svgSinusoidPath(a, b, c, d);
            this.sinusoid?.attr({path: path});
        } else {
            this.sinusoid = this.graphie?.sinusoid(a, b, c, d);
            this.sinusoid?.attr({
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.BLUE_C
                    : KhanColors.DYNAMIC,
                ...this._lineStroke(),
            });
            this.sinusoid?.toBack();
        }
    };

    removeSinusoidControls: () => void = () => {
        this.pointA?.remove();
        this.pointB?.remove();
        if (this.sinusoid) {
            this.sinusoid.remove();
            this.sinusoid = null;
        }
    };

    addCircleControls: () => void = () => {
        const graphie = this.graphie;
        // $FlowFixMe[incompatible-use]
        const minSnap = _.min(graphie.snap);

        const circle = (this.circle = graphie?.addCircleGraph({
            center: this.props.graph.center || [0, 0],
            radius: this.props.graph.radius || _.min(this.props.step),
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            minRadius: minSnap,
            snapRadius: minSnap,
        }));

        $(circle).on("move", () => {
            const graph = _.extend({}, this.props.graph, {
                // $FlowFixMe[incompatible-use]
                center: circle.center,
                // $FlowFixMe[incompatible-use]
                radius: circle.radius,
            });
            this.onChange({graph: graph});
        });
    };

    removeCircleControls: () => void = () => {
        this.circle?.remove();
    };

    addLinearSystemControls: () => void = () => {
        const graphie = this.graphie;
        const coords = InteractiveGraph.getLinearSystemCoords(
            this.props.graph,
            this.props,
        );

        const segmentColors = [KhanColors.INTERACTIVE, KhanColors.GREEN];
        const points = (this.points = _.map(
            coords,
            (segmentCoords, segmentIndex) => {
                // NOTE(jeresig): This code attempts to access the variable
                // while it's still being defined, it should be refactored!
                // The callbacks appear to be executed synchronously, which
                // causes this issue.
                const segmentPoints = [];

                for (let i = 0; i < segmentCoords.length; i += 1) {
                    const coord = segmentCoords[i];
                    segmentPoints.push(
                        Interactive2.addMaybeMobileMovablePoint(this, {
                            coord: coord,
                            constraints: [
                                // $FlowFixMe[prop-missing]
                                Interactive2.MovablePoint.constraints.bound(),
                                // $FlowFixMe[prop-missing]
                                Interactive2.MovablePoint.constraints.snap(),
                                (coord) => {
                                    const otherSegment = segmentPoints[1 - i];
                                    if (!otherSegment) {
                                        // segment hasn't been defined yet
                                        // because we're still creating them
                                        return;
                                    }
                                    return !kpoint.equal(
                                        coord,
                                        otherSegment.coord(),
                                    );
                                },
                            ],
                            onMove: () => {
                                const graph = _.extend({}, this.props.graph, {
                                    coords: _.map(this.points, (segment) =>
                                        _.invoke(segment, "coord"),
                                    ),
                                });
                                this.onChange({graph: graph});
                            },
                            normalStyle: {
                                fill: segmentColors[segmentIndex],
                            },
                            highlightStyle: {
                                fill: segmentColors[segmentIndex],
                            },
                        }),
                    );
                }

                return segmentPoints;
            },
        ));

        this.lines = _.map(points, (segmentPoints, segmentIndex) => {
            return Interactive2.addMovableLine(graphie, {
                points: segmentPoints,
                static: true,
                extendLine: true,
                normalStyle: {
                    stroke: segmentColors[segmentIndex],
                },
            });
        });
    };

    removeLinearSystemControls: () => void = () => {
        _.invoke(this.lines, "remove");
        _.map(this.points, (segment) => _.invoke(segment, "remove"));
    };

    isCoordInTrash: (Coord) => boolean = (coord) => {
        if (this.props.apiOptions.isMobile) {
            return false;
        }

        const graphie = this.graphie;
        const screenPoint = graphie?.scalePoint(coord);
        return (
            // $FlowFixMe[incompatible-use]
            screenPoint[0] >= graphie.xpixels - 40 &&
            // $FlowFixMe[incompatible-use]
            screenPoint[1] >= graphie.ypixels - 40
        );
    };

    createPointForPointsType: (Coord, number) => $FlowFixMe = (coord, i) => {
        const self = this;

        const remove = () => {
            self.points = _.filter(self.points, function (pt) {
                return pt !== point;
            });
            // update the correct answer box
            self.updateCoordsFromPoints();

            // remove this movablePoint from graphie.
            // we wait to do this until we're not inside of
            // said point's onMoveEnd method so its state is
            // consistent throughout this method call
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // $FlowFixMe[incompatible-use]
            setTimeout(point.remove.bind(point), 0); // eslint-disable-line no-restricted-syntax
        };

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let point = null;
        point = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coord,
            constraints: [
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.bound(),
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.snap(),
                function (coord) {
                    // TODO(jack): There ought to be a
                    // MovablePoint.constraints.avoid
                    // default that lets you do things like this
                    return _.all(self.points, function (pt) {
                        return point === pt || !kpoint.equal(coord, pt.coord());
                    });
                },
            ],
            onMoveStart: function () {
                if (self.isClickToAddPoints()) {
                    self.setTrashCanVisibility(1);
                }
            },
            onMove: self.updateCoordsFromPoints,
            onMoveEnd: function (coord) {
                if (self.isClickToAddPoints()) {
                    if (self.isCoordInTrash(coord)) {
                        remove();
                    }
                    // In case we mouseup'd off the graphie and that
                    // stopped the move (in which case, we might not
                    // be in isCoordInTrash()
                    self.setTrashCanVisibility(0.5);
                }
            },
            ...(this.props.apiOptions.isMobile && self.isClickToAddPoints()
                ? {onRemove: remove}
                : {}),
        });

        return point;
    };

    removePoint: (Coord) => ?number = (point) => {
        let index = null;
        this.points = _.filter(this.points, function (pt, i) {
            if (pt === point) {
                index = i;
                return false;
            }
            return true;
        });
        return index;
    };

    createPointForPolygonType: (Coord, number) => $FlowFixMe = (coord, i) => {
        if (this.props.graph.type !== "polygon") {
            throw makeInvalidTypeError("createPointForPolygonType", "polygon");
        }

        // TODO(alex): check against "grid" instead, use constants
        const snapToGrid = !_.contains(
            ["angles", "sides"],
            this.props.graph.snapTo,
        );

        // Index relative to current point -> absolute index
        // NOTE: This does not work when isClickToAddPoints() == true,
        // as `i` can be changed by dragging a point to the trash
        // Currently this function is only called when !isClickToAddPoints()
        const rel = (j) => {
            return (i + j + this.points.length) % this.points.length;
        };

        const remove = () => {
            // remove this point from points
            const index = this.removePoint(point);
            if (this.polygon?.closed()) {
                // We should be checking if this.points is defined before rotating them.
                // $FlowFixMe[incompatible-call]
                // $FlowFixMe[incompatible-type]
                this.points = rotate(this.points, index);
                this.polygon?.update({closed: false});
            }
            this.updatePolygon();
            // the polygon is now unclosed, so we need to
            // remove any points props
            this.clearCoords();

            // remove this movablePoint from graphie.
            // wait to do this until we're not inside of
            // said point's onMoveEnd method so state is
            // consistent throughout the method call
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(point.remove.bind(point), 0);
        };

        const setInitialMove = debounce((point, bool) => {
            point.state.isInitialMove = bool;
        }, 1000);

        const onMoveEndHandler = (coord) => {
            // If the user clicked and dragged a point over endpoint,
            // join the them
            const overlappedPoints =
                this.points.length > 1 &&
                ((point === this.points[0] &&
                    kpoint.equal(coord, _.last(this.points).coord())) ||
                    (point === _.last(this.points) &&
                        kpoint.equal(coord, this.points[0].coord())));

            if (this.isClickToAddPoints()) {
                if (this.isCoordInTrash(coord)) {
                    remove();
                } else if (overlappedPoints) {
                    const pointToRemove = this.points.pop();

                    if (this.points.length > 2) {
                        this.polygon?.update({closed: true});
                        this.updateCoordsFromPoints();
                    } else {
                        this.polygon?.update({closed: false});
                        this.clearCoords();
                    }

                    this.updatePolygon();
                    // remove this movablePoint from graphie.
                    // wait to do this until we're not inside of
                    // said point's onMoveEnd method so state is
                    // consistent throughout the method call
                    // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
                    // eslint-disable-next-line no-restricted-syntax
                    setTimeout(pointToRemove.remove.bind(pointToRemove), 0);
                } else {
                    // If the user clicked and dragged a point over any other
                    // existing point, fix shape
                    const shouldRemove = _.any(this.points, function (pt) {
                        return pt !== point && kpoint.equal(pt.coord(), coord);
                    });

                    if (shouldRemove) {
                        this.removePoint(point);

                        if (this.points.length < 3) {
                            this.polygon?.update({closed: false});
                            this.clearCoords();
                        } else if (this.polygon?.closed()) {
                            this.updateCoordsFromPoints();
                        }

                        this.updatePolygon();
                        // remove this movablePoint from graphie.
                        // wait to do this until we're not inside
                        // said point's onMoveEnd method so state
                        // is consistent throughout the method call
                        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
                        // eslint-disable-next-line no-restricted-syntax
                        setTimeout(point.remove.bind(point), 0);
                    } else {
                        // If this was
                        //  * a click on the first or last point
                        //  * and not a deletion
                        //  * and not a drag,
                        //  * and not a creation of a new point
                        //    (see !point.state.isInitialMove, below),
                        //  * and our polygon is not closed,
                        //  * and we can close it (we need at least the same
                        //    number of points as coordinates asked for in the
                        //    question),
                        // then close it
                        const isFirstOrLastPoint =
                            point === _.head(this.points) ||
                            point === _.last(this.points);
                        const pointNotMoved = !point.hasMoved();
                        // NOTE (jsatk): Currently different on mobile versus
                        // destkop
                        const notANewPoint = !point.state.isInitialMove;
                        const polygonNotClosed = !this.polygon?.closed();
                        const allPointsPlotted = this.points.length > 2;

                        const canCloseUnclosedPolygon =
                            isFirstOrLastPoint &&
                            pointNotMoved &&
                            notANewPoint &&
                            polygonNotClosed &&
                            allPointsPlotted;

                        if (canCloseUnclosedPolygon) {
                            this.polygon?.update({closed: true});
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

            setInitialMove(point, false);
        };

        const graphConstraint = (coord) => {
            // These constraints are all relative to the other points, so if
            // we're creating the initial points and haven't added any others
            // to the graph, we can't enforce them.
            if (this.points == null || this.points.length === 0) {
                return true;
            }

            // eslint-disable-next-line flowtype/no-mutable-array
            const coords: Array<Coord> = _.invoke(this.points, "coord");
            coords[i] = coord;

            // Check for invalid positioning, but only if we aren't adding
            // points one click at a time, since those added points could
            // have already violated these constraints
            if (!this.isClickToAddPoints()) {
                // Polygons can't have consecutive collinear points
                if (
                    collinear(coords[rel(-2)], coords[rel(-1)], coords[i]) ||
                    collinear(coords[rel(-1)], coords[i], coords[rel(1)]) ||
                    collinear(coords[i], coords[rel(1)], coords[rel(2)])
                ) {
                    return false;
                }

                const segments = _.zip(coords, rotate(coords));

                if (this.points.length > 3) {
                    // Constrain to simple (non self-intersecting) polygon by
                    // testing whether adjacent segments intersect any others
                    for (let j = -1; j <= 0; j++) {
                        const segment = segments[rel(j)];
                        const others = _.without(
                            segments,
                            segment,
                            segments[rel(j - 1)],
                            segments[rel(j + 1)],
                        );

                        for (let k = 0; k < others.length; k++) {
                            const other = others[k];
                            if (intersects(segment, other)) {
                                return false;
                            }
                        }
                    }
                }
            }

            if (
                this.props.graph.snapTo === "angles" &&
                this.points.length > 2
            ) {
                // Snap to whole degree interior angles

                const angles = _.map(angleMeasures(coords), function (rad) {
                    return (rad * 180) / Math.PI;
                });

                _.each([-1, 1], function (j) {
                    angles[rel(j)] = Math.round(angles[rel(j)]);
                });

                const getAngle = function (a, vertex, b) {
                    const angle = GraphUtils.findAngle(
                        coords[rel(a)],
                        coords[rel(b)],
                        coords[rel(vertex)],
                    );
                    return (angle + 360) % 360;
                };

                const innerAngles = [
                    angles[rel(-1)] - getAngle(-2, -1, 1),
                    angles[rel(1)] - getAngle(-1, 1, 2),
                ];
                innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);

                // Avoid degenerate triangles
                if (
                    _.any(innerAngles, function (angle) {
                        return leq(angle, 1);
                    })
                ) {
                    return false;
                }

                const knownSide = magnitude(
                    vector(coords[rel(-1)], coords[rel(1)]),
                );

                const onLeft =
                    sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i])) === 1;

                // Solve for side by using the law of sines
                const side =
                    (Math.sin((innerAngles[1] * Math.PI) / 180) /
                        Math.sin((innerAngles[2] * Math.PI) / 180)) *
                    knownSide;

                const outerAngle = GraphUtils.findAngle(
                    coords[rel(1)],
                    coords[rel(-1)],
                );

                const offset = this.graphie?.polar(
                    side,
                    outerAngle + (onLeft ? 1 : -1) * innerAngles[0],
                );

                return this.graphie?.addPoints(coords[rel(-1)], offset);
            }
            if (this.props.graph.snapTo === "sides" && this.points.length > 1) {
                // Snap to whole unit side measures

                const sides = _.map(
                    [
                        [coords[rel(-1)], coords[i]],
                        [coords[i], coords[rel(1)]],
                        [coords[rel(-1)], coords[rel(1)]],
                    ],
                    function (coords) {
                        return magnitude(vector(...coords));
                    },
                );

                _.each([0, 1], function (j) {
                    sides[j] = Math.round(sides[j]);
                });

                // Avoid degenerate triangles
                if (
                    leq(sides[1] + sides[2], sides[0]) ||
                    leq(sides[0] + sides[2], sides[1]) ||
                    leq(sides[0] + sides[1], sides[2])
                ) {
                    return false;
                }

                // Solve for angle by using the law of cosines
                const innerAngle = lawOfCosines(sides[0], sides[2], sides[1]);

                const outerAngle = GraphUtils.findAngle(
                    coords[rel(1)],
                    coords[rel(-1)],
                );

                const onLeft =
                    sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i])) === 1;

                const offset = this.graphie?.polar(
                    sides[0],
                    outerAngle + (onLeft ? 1 : -1) * innerAngle,
                );

                return this.graphie?.addPoints(coords[rel(-1)], offset);
            }
            // Snap to grid (already done)
            return true;
        };

        const point = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coord,
            constraints: [
                // $FlowFixMe[prop-missing]
                Interactive2.MovablePoint.constraints.bound(),
                snapToGrid
                    ? // $FlowFixMe[prop-missing]
                      Interactive2.MovablePoint.constraints.snap()
                    : null,
                graphConstraint,
            ],
            onMoveStart: () => {
                if (this.isClickToAddPoints()) {
                    this.setTrashCanVisibility(1);
                }
            },
            onMove: () => {
                if (this.polygon?.closed()) {
                    this.updateCoordsFromPoints();
                }
            },
            onMoveEnd: onMoveEndHandler,
            ...(this.props.apiOptions.isMobile && this.isClickToAddPoints()
                ? {onRemove: remove}
                : {}),
        });

        point.state.isInitialMove = true;

        return point;
    };

    updateCoordsFromPoints: () => void = () => {
        const graph = _.extend({}, this.props.graph, {
            // Handle old movable points with .coord, or
            // Interactive2.MovablePoint's with .coord()
            coords: _.map(this.points, function (point) {
                return _.result(point, "coord");
            }),
        });
        this.onChange({graph: graph});
    };

    clearCoords: () => void = () => {
        const graph = _.extend({}, this.props.graph, {
            coords: null,
        });
        this.onChange({graph: graph});
    };

    onChange: ($FlowFixMe) => void = (data) => {
        this.props.onChange(data);
        this.props.trackInteraction();
    };

    addPointControls: () => void = () => {
        if (this.props.graph.type !== "point") {
            throw makeInvalidTypeError("addPointControls", "point");
        }

        const coords = InteractiveGraph.getPointCoords(
            this.props.graph,
            this.props,
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
    };

    removePointControls: () => void = () => {
        _.invoke(this.points, "remove");
    };

    addSegmentControls: () => void = () => {
        if (this.props.graph.type !== "segment") {
            throw makeInvalidTypeError("addSegmentControls", "segment");
        }

        const self = this;
        const graphie = this.graphie;

        const coords = InteractiveGraph.getSegmentCoords(
            this.props.graph,
            this.props,
        );

        const createPoint = (options) =>
            Interactive2.addMaybeMobileMovablePoint(this, options);

        this.points = [];
        this.lines = _.map(
            coords,
            function (segment, i) {
                const updateCoordProps = function () {
                    const graph = _.extend({}, self.props.graph, {
                        coords: _.invoke(self.lines, "coords"),
                    });
                    self.onChange({graph: graph});
                };

                // NOTE(jeresig): This code attempts to access the variable
                // while it's still being defined, it should be refactored!
                // The callbacks appear to be executed synchronously, which
                // causes this issue.
                const points = [];

                for (let i = 0; i < segment.length; i += 1) {
                    const coord = segment[i];
                    points.push(
                        createPoint({
                            coord: coord,
                            constraints: [
                                // $FlowFixMe[prop-missing]
                                Interactive2.MovablePoint.constraints.bound(),
                                // $FlowFixMe[prop-missing]
                                Interactive2.MovablePoint.constraints.snap(),
                                (coord) => {
                                    const otherPoint = points[1 - i];
                                    if (!otherPoint) {
                                        // point hasn't been defined yet
                                        // because we're still creating them
                                        // We return false as the points aren't
                                        // going to be in the same position at
                                        // this point.
                                        return false;
                                    }
                                    return !kpoint.equal(
                                        coord,
                                        otherPoint.coord(),
                                    );
                                },
                            ],
                            onMove: updateCoordProps,
                        }),
                    );
                }

                self.points = self.points.concat(points);
                const line = Interactive2.addMovableLine(graphie, {
                    points: points,
                    static: false,
                    constraints: [
                        // $FlowFixMe[prop-missing]
                        Interactive2.MovableLine.constraints.bound(),
                        // $FlowFixMe[prop-missing]
                        Interactive2.MovableLine.constraints.snap(),
                    ],
                    onMove: [
                        // $FlowFixMe[prop-missing]
                        Interactive2.MovableLine.onMove.updatePoints,
                        updateCoordProps,
                    ],
                    normalStyle: {
                        stroke: this.props.apiOptions.isMobile
                            ? KhanColors.BLUE_C
                            : KhanColors.INTERACTIVE,
                        ...this._lineStroke(),
                    },
                    highlightStyle: {
                        stroke: this.props.apiOptions.isMobile
                            ? KhanColors.BLUE_C
                            : KhanColors.INTERACTING,
                        ...this._lineStroke(),
                    },
                });
                _.invoke(points, "toFront");

                return line;
            },
            this,
        );
    };

    removeSegmentControls: () => void = () => {
        _.invoke(this.points, "remove");
        _.invoke(this.lines, "remove");
    };

    addRayControls: () => void = () => {
        this.addLine("ray");
    };

    removeRayControls: () => void = () => {
        this.removeLine();
    };

    addPolygonControls: () => void = () => {
        this.polygon = null;
        const coords = InteractiveGraph.getPolygonCoords(
            this.props.graph,
            this.props,
        );
        // Clear out our old points so that newly added points don't
        // "collide", as in `addPointControls`
        this.points = [];
        this.points = _.map(coords, this.createPointForPolygonType, this);
        this.updatePolygon();
    };

    updatePolygon: () => void = () => {
        if (this.props.graph.type !== "polygon") {
            throw makeInvalidTypeError("updatePolygon", "polygon");
        }

        let closed;
        if (this.polygon) {
            closed = this.polygon.closed();
        } else if (this.points.length >= 3) {
            closed = true;
        } else {
            // There will only be fewer than 3 points in click-to-add-vertices
            // mode, so we don't need to explicitly check for that here.
            closed = false;
        }

        const graphie = this.graphie;
        const n = this.points.length;

        // TODO(alex): check against "grid" instead, use constants
        const snapToGrid = !_.contains(
            ["angles", "sides"],
            this.props.graph.snapTo,
        );

        const angleLabels = _.times(
            n,
            function (i) {
                if (
                    !this.props.graph.showAngles ||
                    (!closed && (i === 0 || i === n - 1))
                ) {
                    return "";
                }
                if (this.props.graph.snapTo === "angles") {
                    return "$deg0";
                }
                return "$deg1";
            },
            this,
        );

        const showRightAngleMarkers = _.times(
            n,
            function (i) {
                return closed || (i !== 0 && i !== n - 1);
            },
            this,
        );

        const numArcs = _.times(
            n,
            function (i) {
                if (
                    this.props.graph.showAngles &&
                    (closed || (i !== 0 && i !== n - 1))
                ) {
                    return 1;
                }
                return 0;
            },
            this,
        );

        const sideLabels = _.times(
            n,
            function (i) {
                if (!this.props.graph.showSides || (!closed && i === n - 1)) {
                    return "";
                }
                if (this.props.graph.snapTo === "sides") {
                    return "$len0";
                }
                return "$len1";
            },
            this,
        );

        if (this.polygon == null) {
            const self = this;
            self.polygon = Interactive2.addMovablePolygon(graphie, {
                constraints: [
                    // $FlowFixMe[prop-missing]
                    Interactive2.MovablePolygon.constraints.bound(),
                    snapToGrid
                        ? // $FlowFixMe[prop-missing]
                          Interactive2.MovablePolygon.constraints.snap()
                        : null,
                ],
                closed: closed,
                points: self.points,
                angleLabels: angleLabels,
                showRightAngleMarkers: showRightAngleMarkers,
                numArcs: numArcs,
                sideLabels: sideLabels,
                onMove: [
                    // $FlowFixMe[prop-missing]
                    Interactive2.MovablePolygon.onMove.updatePoints,
                    function () {
                        if (this.closed()) {
                            self.updateCoordsFromPoints();
                        }
                    },
                ],
                normalStyle: {
                    stroke: this.props.apiOptions.isMobile
                        ? KhanColors.BLUE_C
                        : KhanColors.INTERACTIVE,
                    ...this._lineStroke(),
                },
            });
        } else {
            // We only need to pass in the properties that might've changed
            this.polygon.update({
                closed: closed,
                points: this.points,
                angleLabels: angleLabels,
                showRightAngleMarkers: showRightAngleMarkers,
                numArcs: numArcs,
                sideLabels: sideLabels,
            });
        }
    };

    removePolygonControls: () => void = () => {
        _.invoke(this.points, "remove");
        this.polygon?.remove();
    };

    addAngleControls: () => void = () => {
        if (this.props.graph.type !== "angle") {
            throw makeInvalidTypeError("addAngleControls", "angle");
        }

        const graph = this.props.graph;
        const graphie = this.graphie;

        const coords = InteractiveGraph.getAngleCoords(
            this.props.graph,
            this.props,
        );

        // The vertex snaps to the grid, but the rays don't...
        this.points = coords.map(function (coord, i) {
            return graphie?.addMovablePoint(
                _.extend(
                    {
                        coord: coord,
                        normalStyle: {
                            stroke: KhanColors.INTERACTIVE,
                            fill: KhanColors.INTERACTIVE,
                        },
                    },
                    i === 1
                        ? {
                              snapX: graphie.snap[0],
                              snapY: graphie.snap[1],
                          }
                        : {},
                ),
            );
        });

        // ...they snap to whole-degree angles from the vertex.
        this.angle = graphie?.addMovableAngle({
            points: this.points,
            snapDegrees: graph.snapDegrees || 1,
            snapOffsetDeg: graph.angleOffsetDeg || 0,
            angleLabel: graph.showAngles ? "$deg0" : "",
            pushOut: 2,
            allowReflex: defaultVal(graph.allowReflexAngles, true),
        });

        $(this.angle).on("move", () => {
            this.onChange({
                graph: {...graph, coords: this.angle?.getClockwiseCoords()},
            });
        });
    };

    removeAngleControls: () => void = () => {
        _.invoke(this.points, "remove");
        this.angle?.remove();
    };

    toggleShowAngles: () => void = () => {
        if (this.props.graph.type !== "polygon") {
            throw makeInvalidTypeError("toggleShowAngles", "polygon");
        }
        const graph = _.extend({}, this.props.graph, {
            showAngles: !this.props.graph.showAngles,
        });
        this.onChange({graph: graph});
    };

    toggleShowSides: () => void = () => {
        if (this.props.graph.type !== "polygon") {
            throw makeInvalidTypeError("toggleShowSides", "polygon");
        }
        const graph = _.extend({}, this.props.graph, {
            showSides: !this.props.graph.showSides,
        });
        this.onChange({graph: graph});
    };

    getUserInput: () => PerseusGraphType = () => {
        return InteractiveGraph.getUserInputFromProps(this.props);
    };

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        return InteractiveGraph.validate(this.getUserInput(), rubric, this);
    };

    focus: () => void = $.noop;

    render(): React.Node {
        const box = getInteractiveBoxFromSizeClass(
            this.props.containerSizeClass,
        );

        let instructions;
        if (this.isClickToAddPoints() && this.state.shouldShowInstructions) {
            if (this.props.graph.type === "point") {
                instructions = i18n._("Click to add points");
            } else if (this.props.graph.type === "polygon") {
                instructions = i18n._("Click to add vertices");
            }
        } else {
            instructions = undefined;
        }

        const onMouseDown = this.isClickToAddPoints()
            ? this.handleAddPointsMouseDown
            : null;

        const gridStep =
            this.props.gridStep ||
            Util.getGridStep(this.props.range, this.props.step, box[0]);
        const snapStep =
            this.props.snapStep || Util.snapStepFromGridStep(gridStep);

        const isMobile = this.props.apiOptions.isMobile;

        return (
            <div
                className={
                    "perseus-widget " + "perseus-widget-interactive-graph"
                }
                style={{
                    width: box[0],
                    height: box[1],
                }}
            >
                <Graph
                    instructions={instructions}
                    // eslint-disable-next-line react/no-string-refs
                    ref="graph"
                    box={box}
                    labels={this.props.labels}
                    range={this.props.range}
                    step={
                        isMobile
                            ? Util.constrainedTickStepsFromTickSteps(
                                  this.props.step,
                                  this.props.range,
                              )
                            : this.props.step
                    }
                    gridStep={gridStep}
                    snapStep={snapStep}
                    markings={this.props.markings}
                    backgroundImage={this.props.backgroundImage}
                    showProtractor={this.props.showProtractor}
                    showRuler={this.props.showRuler}
                    rulerLabel={this.props.rulerLabel}
                    rulerTicks={this.props.rulerTicks}
                    onMouseDown={onMouseDown}
                    onGraphieUpdated={this.setGraphie}
                    setDrawingAreaAvailable={
                        this.props.apiOptions.setDrawingAreaAvailable
                    }
                    isMobile={isMobile}
                />
            </div>
        );
    }

    static getQuadraticCoefficients(
        coords: $ReadOnlyArray<Coord>,
    ): QuadraticCoefficient {
        const p1 = coords[0];
        const p2 = coords[1];
        const p3 = coords[2];

        const denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
        if (denom === 0) {
            // Many of the callers assume that the return value is always defined.
            // $FlowFixMe[incompatible-return]
            return;
        }
        const a =
            (p3[0] * (p2[1] - p1[1]) +
                p2[0] * (p1[1] - p3[1]) +
                p1[0] * (p3[1] - p2[1])) /
            denom;
        const b =
            (p3[0] * p3[0] * (p1[1] - p2[1]) +
                p2[0] * p2[0] * (p3[1] - p1[1]) +
                p1[0] * p1[0] * (p2[1] - p3[1])) /
            denom;
        const c =
            (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
                p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
                p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) /
            denom;
        return [a, b, c];
    }

    static getSinusoidCoefficients(
        coords: $ReadOnlyArray<Coord>,
    ): SineCoefficient {
        // It's assumed that p1 is the root and p2 is the first peak
        const p1 = coords[0];
        const p2 = coords[1];

        // Resulting coefficients are canonical for this sine curve
        const amplitude = p2[1] - p1[1];
        const angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
        const phase = p1[0] * angularFrequency;
        const verticalOffset = p1[1];

        return [amplitude, angularFrequency, phase, verticalOffset];
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getLineCoords(
        graph: PerseusGraphType,
        props: Props,
    ): $ReadOnlyArray<Coord> {
        return (
            // $FlowFixMe[incompatible-return]
            graph.coords ||
            InteractiveGraph.pointsFromNormalized(props, [
                [0.25, 0.75],
                [0.75, 0.75],
            ])
        );
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getPointCoords(
        graph: PerseusGraphTypePoint,
        props: Props,
    ): $ReadOnlyArray<Coord> {
        const numPoints = graph.numPoints || 1;
        let coords = graph.coords;

        if (coords) {
            return coords;
        }
        switch (numPoints) {
            case 1:
                // Back in the day, one point's coords were in graph.coord
                coords = [graph.coord || [0, 0]];
                break;
            case 2:
                coords = [
                    [-5, 0],
                    [5, 0],
                ];
                break;
            case 3:
                coords = [
                    [-5, 0],
                    [0, 0],
                    [5, 0],
                ];
                break;
            case 4:
                coords = [
                    [-6, 0],
                    [-2, 0],
                    [2, 0],
                    [6, 0],
                ];
                break;
            case 5:
                coords = [
                    [-6, 0],
                    [-3, 0],
                    [0, 0],
                    [3, 0],
                    [6, 0],
                ];
                break;
            case 6:
                coords = [
                    [-5, 0],
                    [-3, 0],
                    [-1, 0],
                    [1, 0],
                    [3, 0],
                    [5, 0],
                ];
                break;
            case UNLIMITED:
                coords = [];
                break;
        }
        // Transform coords from their -10 to 10 space to 0 to 1
        // because of the old graph.coord, and also it's easier.
        const range = [
            [-10, 10],
            [-10, 10],
        ];
        // $FlowFixMe[incompatible-call]
        const newCoords = InteractiveGraph.normalizeCoords(coords, range);

        return InteractiveGraph.pointsFromNormalized(props, newCoords);
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getLinearSystemCoords(
        graph: PerseusGraphType,
        props: Props,
    ): $ReadOnlyArray<$ReadOnlyArray<Coord>> {
        return (
            // The callers assume that we're return an array of points
            // $FlowFixMe[incompatible-return]
            graph.coords ||
            _.map(
                [
                    [
                        [0.25, 0.75],
                        [0.75, 0.75],
                    ],
                    [
                        [0.25, 0.25],
                        [0.75, 0.25],
                    ],
                ],
                (coords) => {
                    return InteractiveGraph.pointsFromNormalized(props, coords);
                },
            )
        );
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getPolygonCoords(
        graph: PerseusGraphType,
        props: Props,
    ): $ReadOnlyArray<Coord> {
        if (graph.type !== "polygon") {
            throw makeInvalidTypeError("toggleShowSides", "polygon");
        }

        let coords = graph.coords;
        if (coords) {
            return coords;
        }

        const n = graph.numSides || 3;

        if (n === UNLIMITED) {
            coords = [];
        } else {
            // $FlowFixMe[unsafe-addition]
            const angle = (2 * Math.PI) / n;
            // $FlowFixMe[unsafe-addition]
            const offset = (1 / n - 1 / 2) * Math.PI;

            // TODO(alex): Generalize this to more than just triangles so that
            // all polygons have whole number side lengths if snapping to sides
            const radius =
                graph.snapTo === "sides" ? (Math.sqrt(3) / 3) * 7 : 4;

            // Generate coords of a regular polygon with n sides
            coords = _.times(n, function (i) {
                return [
                    radius * Math.cos(i * angle + offset),
                    radius * Math.sin(i * angle + offset),
                ];
            });
        }

        const ranges: [Range, Range] = [
            [-10, 10],
            [-10, 10],
        ];
        coords = InteractiveGraph.normalizeCoords(coords, ranges);

        const snapToGrid = !_.contains(["angles", "sides"], graph.snapTo);
        coords = InteractiveGraph.pointsFromNormalized(
            props,
            coords,
            /* noSnap */ !snapToGrid,
        );

        return coords;
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getSegmentCoords(
        graph: PerseusGraphTypeSegment,
        props: Props,
    ): $ReadOnlyArray<$ReadOnlyArray<Coord>> {
        const coords = graph.coords;
        if (coords) {
            return coords;
        }

        const n = graph.numSegments || 1;
        const ys: $ReadOnlyArray<number> = {
            // $FlowFixMe[unsupported-syntax]
            1: [5],
            // $FlowFixMe[unsupported-syntax]
            2: [5, -5],
            // $FlowFixMe[unsupported-syntax]
            3: [5, 0, -5],
            // $FlowFixMe[unsupported-syntax]
            4: [6, 2, -2, -6],
            // $FlowFixMe[unsupported-syntax]
            5: [6, 3, 0, -3, -6],
            // $FlowFixMe[unsupported-syntax]
            6: [5, 3, 1, -1, -3, -5],
        }[n];
        const range = [
            [-10, 10],
            [-10, 10],
        ];

        return ys.map(function (y) {
            let segment = [
                [-5, y],
                [5, y],
            ];
            segment = InteractiveGraph.normalizeCoords(segment, range);
            segment = InteractiveGraph.pointsFromNormalized(props, segment);
            return segment;
        });
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getAngleCoords(
        graph: PerseusGraphTypeAngle,
        props: Props,
    ): $ReadOnlyArray<Coord> {
        let coords = graph.coords;
        if (coords) {
            return coords;
        }

        const snap = graph.snapDegrees || 1;
        let angle = snap;
        while (angle < 20) {
            angle += snap;
        }
        angle = (angle * Math.PI) / 180;
        const offset = ((graph.angleOffsetDeg || 0) * Math.PI) / 180;

        coords = InteractiveGraph.pointsFromNormalized(props, [
            [0.85, 0.5],
            [0.5, 0.5],
        ]);

        const radius = magnitude(vector(...coords));

        // Adjust the lower point by angleOffsetDeg degrees
        // $FlowFixMe[cannot-write]
        coords[0] = [
            coords[1][0] + radius * Math.cos(offset),
            coords[1][1] + radius * Math.sin(offset),
        ];
        // Position the upper point angle radians from the
        // lower point
        // $FlowFixMe[cannot-write]
        coords[2] = [
            coords[1][0] + radius * Math.cos(angle + offset),
            coords[1][1] + radius * Math.sin(angle + offset),
        ];

        return coords;
    }

    static normalizeCoords(
        coordsList: $ReadOnlyArray<Coord>,
        ranges: [Range, Range],
    ): $ReadOnlyArray<Coord> {
        return _.map(coordsList, function (coords) {
            return _.map(coords, function (coord, i) {
                const extent = ranges[i][1] - ranges[i][0];
                return (coord + ranges[i][1]) / extent;
            });
        });
    }

    static getEquationString(props: Props): string {
        const type = props.graph.type;
        const funcName = "get" + capitalize(type) + "EquationString";
        // $FlowFixMe[incompatible-use]
        return InteractiveGraph[funcName](props);
    }

    static pointsFromNormalized(
        props: Props,
        coordsList: $ReadOnlyArray<Coord>,
        noSnap?: boolean,
    ): $ReadOnlyArray<Coord> {
        return _.map(coordsList, function (coords) {
            return _.map(coords, function (coord, i) {
                const range: Range = props.range[i];
                if (noSnap) {
                    return range[0] + (range[1] - range[0]) * coord;
                }
                const step = props.step[i];
                const nSteps = numSteps(range, step);
                const tick = Math.round(coord * nSteps);
                return range[0] + step * tick;
            });
        });
    }

    static getLinearEquationString(props: Props): string {
        const coords = InteractiveGraph.getLineCoords(props.graph, props);
        if (eq(coords[0][0], coords[1][0])) {
            return "x = " + coords[0][0].toFixed(3);
        }
        const m = (coords[1][1] - coords[0][1]) / (coords[1][0] - coords[0][0]);
        const b = coords[0][1] - m * coords[0][0];
        if (eq(m, 0)) {
            return "y = " + b.toFixed(3);
        }
        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
    }

    static getCurrentQuadraticCoefficients(props: Props): QuadraticCoefficient {
        // TODO(alpert): Don't duplicate
        const coords =
            props.graph.coords ||
            InteractiveGraph.defaultQuadraticCoords(props);
        // $FlowFixMe[incompatible-call]
        return InteractiveGraph.getQuadraticCoefficients(coords);
    }

    static defaultQuadraticCoords(props: Props): $ReadOnlyArray<Coord> {
        const coords = [
            [0.25, 0.75],
            [0.5, 0.25],
            [0.75, 0.75],
        ];
        return InteractiveGraph.pointsFromNormalized(props, coords);
    }

    static getQuadraticEquationString(props: Props): string {
        const coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(props);
        return (
            "y = " +
            coeffs[0].toFixed(3) +
            "x^2 + " +
            coeffs[1].toFixed(3) +
            "x + " +
            coeffs[2].toFixed(3)
        );
    }

    static getCurrentSinusoidCoefficients(props: Props): SineCoefficient {
        const coords =
            props.graph.coords || InteractiveGraph.defaultSinusoidCoords(props);
        // $FlowFixMe[incompatible-call]
        return InteractiveGraph.getSinusoidCoefficients(coords);
    }

    static defaultSinusoidCoords(props: Props): $ReadOnlyArray<Coord> {
        const coords = [
            [0.5, 0.5],
            [0.65, 0.6],
        ];
        return InteractiveGraph.pointsFromNormalized(props, coords);
    }

    static getSinusoidEquationString(props: Props): string {
        const coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(props);
        return (
            "y = " +
            coeffs[0].toFixed(3) +
            "sin(" +
            coeffs[1].toFixed(3) +
            "x - " +
            coeffs[2].toFixed(3) +
            ") + " +
            coeffs[3].toFixed(3)
        );
    }

    static getCircleEquationString(props: Props): string {
        const graph = props.graph;
        // TODO(alpert): Don't duplicate
        const center = graph.center || [0, 0];
        const radius = graph.radius || 2;
        return (
            "center (" + center[0] + ", " + center[1] + "), radius " + radius
        );
    }

    static getLinearSystemEquationString(props: Props): string {
        const coords = InteractiveGraph.getLinearSystemCoords(
            props.graph,
            props,
        );

        return (
            "\n" +
            getLineEquation(coords[0][0], coords[0][1]) +
            "\n" +
            getLineEquation(coords[1][0], coords[1][1]) +
            "\n" +
            getLineIntersection(coords[0], coords[1])
        );
    }

    static getPointEquationString(props: Props): string {
        if (props.graph.type !== "point") {
            throw makeInvalidTypeError("getPointEquationString", "point");
        }

        const coords = InteractiveGraph.getPointCoords(props.graph, props);
        return coords
            .map(function (coord) {
                return "(" + coord[0] + ", " + coord[1] + ")";
            })
            .join(", ");
    }

    static getSegmentEquationString(props: Props): string {
        if (props.graph.type !== "segment") {
            throw makeInvalidTypeError("getSegmentEquationString", "segment");
        }

        const segments = InteractiveGraph.getSegmentCoords(props.graph, props);
        return _.map(segments, function (segment) {
            return (
                "[" +
                _.map(segment, function (coord) {
                    return "(" + coord.join(", ") + ")";
                }).join(" ") +
                "]"
            );
        }).join(" ");
    }

    static getRayEquationString(props: Props): string {
        if (props.graph.type !== "ray") {
            throw makeInvalidTypeError("createPointForPolygonType", "ray");
        }

        const coords = InteractiveGraph.getLineCoords(props.graph, props);
        const a = coords[0];
        const b = coords[1];
        let eq = InteractiveGraph.getLinearEquationString(props);

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
    }

    static getPolygonEquationString(props: Props): string {
        if (props.graph.type !== "polygon") {
            throw makeInvalidTypeError("getPolygonEquationString", "polygon");
        }
        const coords = InteractiveGraph.getPolygonCoords(props.graph, props);
        return _.map(coords, function (coord) {
            return "(" + coord.join(", ") + ")";
        }).join(" ");
    }

    static getAngleEquationString(props: Props): string {
        if (props.graph.type !== "angle") {
            throw makeInvalidTypeError("getAngleEquationString", "angle");
        }
        const coords = InteractiveGraph.getAngleCoords(props.graph, props);
        const angle = GraphUtils.findAngle(coords[2], coords[0], coords[1]);
        return (
            angle.toFixed(0) +
            "\u00B0 angle" +
            " at (" +
            coords[1].join(", ") +
            ")"
        );
    }

    static validate(
        // TODO(kevinb): rename state to userInput
        state: PerseusGraphType, // state === userInput
        rubric: Rubric,
        component: $FlowFixMe,
    ): PerseusScore {
        // When nothing has moved, there will neither be coords nor the
        // circle's center/radius fields. When those fields are absent, skip
        // all these checks; just go mark the answer as empty.
        const hasValue = !!(state.coords || (state.center && state.radius));

        if (state.type === rubric.correct.type && hasValue) {
            if (
                state.type === "linear" &&
                rubric.correct.type === "linear" &&
                state.coords != null
            ) {
                const guess = state.coords;
                const correct = rubric.correct.coords;

                // If both of the guess points are on the correct line, it's
                // correct.
                if (
                    // $FlowFixMe[incompatible-use] - Fix type so coords can't be omitted
                    collinear(correct[0], correct[1], guess[0]) &&
                    collinear(correct[0], correct[1], guess[1])
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "linear-system" &&
                rubric.correct.type === "linear-system" &&
                state.coords != null
            ) {
                const guess = state.coords;
                // $FlowFixMe[incompatible-cast] - Fix type so this can't be undefined
                const correct = (rubric.correct.coords: $ReadOnlyArray<
                    $ReadOnlyArray<Coord>,
                >);

                if (
                    (collinear(correct[0][0], correct[0][1], guess[0][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[0][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][1])) ||
                    (collinear(correct[0][0], correct[0][1], guess[1][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[1][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][1]))
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "quadratic" &&
                rubric.correct.type === "quadratic" &&
                state.coords != null
            ) {
                // If the parabola coefficients match, it's correct.
                const guessCoeffs = this.getQuadraticCoefficients(state.coords);
                const correctCoeffs = this.getQuadraticCoefficients(
                    // $FlowFixMe[incompatible-call]
                    // $FlowFixMe[prop-missing]
                    rubric.correct.coords,
                );
                if (deepEq(guessCoeffs, correctCoeffs)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "sinusoid" &&
                rubric.correct.type === "sinusoid" &&
                state.coords != null
            ) {
                const guessCoeffs = this.getSinusoidCoefficients(state.coords);
                const correctCoeffs = this.getSinusoidCoefficients(
                    // $FlowFixMe[incompatible-call]
                    // $FlowFixMe[prop-missing]
                    rubric.correct.coords,
                );

                const canonicalGuessCoeffs =
                    canonicalSineCoefficients(guessCoeffs);
                const canonicalCorrectCoeffs =
                    canonicalSineCoefficients(correctCoeffs);
                // If the canonical coefficients match, it's correct.
                if (deepEq(canonicalGuessCoeffs, canonicalCorrectCoeffs)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "circle" &&
                rubric.correct.type === "circle"
            ) {
                if (
                    deepEq(state.center, rubric.correct.center) &&
                    // $FlowFixMe[prop-missing]
                    eq(state.radius, rubric.correct.radius)
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "point" &&
                rubric.correct.type === "point" &&
                state.coords != null
            ) {
                let correct = InteractiveGraph.getPointCoords(
                    rubric.correct,
                    component,
                );
                const guess = state.coords?.slice();
                correct = correct.slice();
                // Everything's already rounded so we shouldn't need to do an
                // eq() comparison but _.isEqual(0, -0) is false, so we'll use
                // eq() anyway. The sort should be fine because it'll stringify
                // it and -0 converted to a string is "0"
                guess?.sort();
                correct.sort();
                if (deepEq(guess, correct)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "polygon" &&
                rubric.correct.type === "polygon" &&
                state.coords != null
            ) {
                const guess: Array<Coord> = state.coords?.slice(); // eslint-disable-line flowtype/no-mutable-array
                // $FlowFixMe[incompatible-type]
                // $FlowFixMe[prop-missing]
                const correct: Array<Coord> = rubric.correct.coords?.slice(); // eslint-disable-line flowtype/no-mutable-array

                let match;
                if (rubric.correct.match === "similar") {
                    match = similar(guess, correct, Number.POSITIVE_INFINITY);
                } else if (rubric.correct.match === "congruent") {
                    match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
                } else if (rubric.correct.match === "approx") {
                    match = similar(guess, correct, 0.1);
                } else {
                    /* exact */
                    guess.sort();
                    correct.sort();
                    match = deepEq(guess, correct);
                }

                if (match) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "segment" &&
                rubric.correct.type === "segment" &&
                state.coords != null
            ) {
                let guess = state.coords.slice();
                // $FlowFixMe[prop-missing]
                let correct = rubric.correct.coords?.slice();
                guess = _.invoke(guess, "sort").sort();
                correct = _.invoke(correct, "sort").sort();
                if (deepEq(guess, correct)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "ray" &&
                rubric.correct.type === "ray" &&
                state.coords != null
            ) {
                const guess = state.coords;
                const correct = rubric.correct.coords;
                if (
                    // $FlowFixMe[incompatible-use]
                    deepEq(guess[0], correct[0]) &&
                    // $FlowFixMe[incompatible-use]
                    collinear(correct[0], correct[1], guess[1])
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                state.type === "angle" &&
                rubric.correct.type === "angle"
            ) {
                const guess = state.coords;
                const correct = rubric.correct.coords;

                let match;
                if (rubric.correct.match === "congruent") {
                    const angles = _.map([guess, correct], function (coords) {
                        const angle = GraphUtils.findAngle(
                            coords[2],
                            coords[0],
                            coords[1],
                        );
                        return (angle + 360) % 360;
                    });
                    match = eq(...angles);
                } else {
                    /* exact */
                    match =
                        // $FlowFixMe[incompatible-use]
                        deepEq(guess[1], correct[1]) &&
                        // $FlowFixMe[incompatible-use]
                        collinear(correct[1], correct[0], guess[0]) &&
                        // $FlowFixMe[incompatible-use]
                        collinear(correct[1], correct[2], guess[2]);
                }

                if (match) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            }
        }

        // The input wasn't correct, so check if it's a blank input or if it's
        // actually just wrong
        if (!hasValue || _.isEqual(state, rubric.graph)) {
            // We're where we started.
            return {
                type: "invalid",
                message: null,
            };
        }
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }

    static getUserInputFromProps(props: Props): PerseusGraphType {
        return props.graph;
    }
}

export default ({
    name: "interactive-graph",
    displayName: "Interactive graph",
    widget: InteractiveGraph,
}: WidgetExports<typeof InteractiveGraph>);
