import {angles, coefficients, geometry} from "@khanacademy/kmath";
import {
    approximateEqual,
    Errors,
    PerseusError,
} from "@khanacademy/perseus-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import _ from "underscore";

import {getAbsoluteValueCoefficients} from "./graphs/utils";

import type {Props} from "./interactive-graph";
import type {QuadraticGraphState} from "./types";
import type {Coord} from "../../interactive2/types";
import type {
    QuadraticCoefficient,
    SineCoefficient,
    TangentCoefficient,
    Range,
} from "@khanacademy/kmath";
import type {
    PerseusGraphType,
    PerseusGraphTypeAngle,
    PerseusGraphTypePoint,
    PerseusGraphTypeSegment,
} from "@khanacademy/perseus-core";

const {getClockwiseAngle} = angles;

const {
    getSinusoidCoefficients,
    getTangentCoefficients,
    getQuadraticCoefficients,
    getExponentialCoefficients,
    getLogarithmCoefficients,
} = coefficients;

const {getLineEquation, getLineIntersectionString, magnitude, vector} =
    geometry;

const UNLIMITED = "unlimited" as const;

function numSteps(range: Range, step: number) {
    return Math.floor((range[1] - range[0]) / step);
}

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

/**
 * @param {object} graph Like props.graph or props.correct
 * @param {object} props of an InteractiveGraph instance
 */
function getLineCoords(graph: PerseusGraphType, props: Props): Coord[] {
    return (
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        graph.coords ||
        pointsFromNormalized(props, [
            [0.25, 0.75],
            [0.75, 0.75],
        ])
    );
}

/**
 * @param {object} graph Like props.graph or props.correct
 * @param {object} props of an InteractiveGraph instance
 */
function getPointCoords(graph: PerseusGraphTypePoint, props: Props): Coord[] {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
    // @ts-expect-error - TS2345 - Argument of type 'readonly Coord[] | undefined' is not assignable to parameter of type 'readonly Coord[]'.
    const newCoords = normalizeCoords(coords, range);

    return pointsFromNormalized(props, newCoords);
}

/**
 * @param {object} graph Like props.graph or props.correct
 * @param {object} props of an InteractiveGraph instance
 */
function getLinearSystemCoords(
    graph: PerseusGraphType,
    props: Props,
): [Coord, Coord][] {
    return (
        // The callers assume that we're return an array of points
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        graph.coords ||
        _.map(
            // eslint-disable-next-line no-restricted-syntax
            [
                [
                    [0.25, 0.75],
                    [0.75, 0.75],
                ],
                [
                    [0.25, 0.25],
                    [0.75, 0.25],
                ],
            ] as Coord[][],
            (coords) => {
                return pointsFromNormalized(props, coords);
            },
        )
    );
}

/**
 * @param {object} graph Like props.graph or props.correct
 * @param {object} props of an InteractiveGraph instance
 */
function getPolygonCoords(graph: PerseusGraphType, props: Props): Coord[] {
    if (graph.type !== "polygon") {
        throw makeInvalidTypeError("toggleShowSides", "polygon");
    }

    let coords = graph.coords;
    if (coords) {
        return coords;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const n = graph.numSides || 3;

    if (n === UNLIMITED) {
        coords = [];
    } else {
        const angle = (2 * Math.PI) / n;
        const offset = (1 / n - 1 / 2) * Math.PI;

        const radius = graph.snapTo === "sides" ? (Math.sqrt(3) / 3) * 7 : 4;

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
    coords = normalizeCoords(coords, ranges);

    const snapToGrid = !_.contains(["angles", "sides"], graph.snapTo);
    coords = pointsFromNormalized(props, coords, /* noSnap */ !snapToGrid);

    return coords;
}

/**
 * @param {object} graph Like props.graph or props.correct
 * @param {object} props of an InteractiveGraph instance
 */
function getSegmentCoords(
    graph: PerseusGraphTypeSegment,
    props: Props,
): Coord[][] {
    const coords = graph.coords;
    if (coords) {
        return coords;
    }

    const n = graph.numSegments || 1;
    // @ts-expect-error - TS2322 - Type 'number[] | undefined' is not assignable to type 'number[]'.
    const ys: number[] = {
        1: [5],
        2: [5, -5],
        3: [5, 0, -5],
        4: [6, 2, -2, -6],
        5: [6, 3, 0, -3, -6],
        6: [5, 3, 1, -1, -3, -5],
    }[n];
    const range = [
        [-10, 10],
        [-10, 10],
    ];

    // @ts-expect-error - TS2322 - Type 'number[][][]' is not assignable to type 'readonly (readonly Coord[])[]'.
    return ys.map(function (y) {
        let segment = [
            [-5, y],
            [5, y],
        ];
        // @ts-expect-error - TS4104 - The type 'readonly Coord[]' is 'readonly' and cannot be assigned to the mutable type 'number[][]'. | TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
        segment = normalizeCoords(segment, range);
        // @ts-expect-error - TS4104 - The type 'readonly Coord[]' is 'readonly' and cannot be assigned to the mutable type 'number[][]'. | TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
        segment = pointsFromNormalized(props, segment);
        return segment;
    });
}

/**
 * @param {object} graph Like props.graph or props.correct
 * @param {object} props of an InteractiveGraph instance
 */
function getAngleCoords(
    graph: PerseusGraphTypeAngle,
    props: Props,
): [Coord, Coord, Coord] {
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

    // eslint-disable-next-line no-restricted-syntax
    coords = pointsFromNormalized(props, [
        [0.85, 0.5],
        [0.5, 0.5],
    ]) as [Coord, Coord, Coord];

    // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'. | TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
    const radius = magnitude(vector(...coords));

    // Adjust the lower point by angleOffsetDeg degrees
    coords[0] = [
        coords[1][0] + radius * Math.cos(offset),
        coords[1][1] + radius * Math.sin(offset),
    ];
    // Position the upper point angle radians from the
    // lower point
    coords[2] = [
        coords[1][0] + radius * Math.cos(angle + offset),
        coords[1][1] + radius * Math.sin(angle + offset),
    ];

    return coords;
}

function normalizeCoords(coordsList: Coord[], ranges: [Range, Range]): Coord[] {
    // @ts-expect-error - TS2322 - Type 'number[][]' is not assignable to type 'readonly Coord[]'.
    return _.map(coordsList, function (coords) {
        return _.map(coords, function (coord, i) {
            const extent = ranges[i][1] - ranges[i][0];
            return (coord + ranges[i][1]) / extent;
        });
    });
}

function pointsFromNormalized(
    props: Props,
    coordsList: Coord[],
    noSnap?: boolean,
): Coord[] {
    // @ts-expect-error - TS2322 - Type 'number[][]' is not assignable to type 'readonly Coord[]'.
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

function getNoneEquationString(): string {
    return "";
}

function getLinearEquationString(props: Props): string {
    const coords = getLineCoords(props.userInput, props);
    if (approximateEqual(coords[0][0], coords[1][0])) {
        return "x = " + coords[0][0].toFixed(3);
    }
    const m = (coords[1][1] - coords[0][1]) / (coords[1][0] - coords[0][0]);
    const b = coords[0][1] - m * coords[0][0];
    if (approximateEqual(m, 0)) {
        return "y = " + b.toFixed(3);
    }
    return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
}

function getCurrentQuadraticCoefficients(props: Props): QuadraticCoefficient {
    const coords =
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        props.userInput.coords || defaultQuadraticCoords(props);
    return getQuadraticCoefficients(coords);
}

function defaultQuadraticCoords(props: Props): QuadraticGraphState["coords"] {
    const coords = [
        [0.25, 0.75],
        [0.5, 0.25],
        [0.75, 0.75],
    ];
    // @ts-expect-error - TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
    return pointsFromNormalized(props, coords);
}

function getQuadraticEquationString(props: Props): string {
    const coeffs = getCurrentQuadraticCoefficients(props);
    return (
        "y = " +
        coeffs[0].toFixed(3) +
        "x^2 + " +
        coeffs[1].toFixed(3) +
        "x + " +
        coeffs[2].toFixed(3)
    );
}

function getCurrentSinusoidCoefficients(props: Props): SineCoefficient {
    const coords =
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        props.userInput.coords || defaultSinusoidCoords(props);
    return getSinusoidCoefficients(coords);
}

function defaultSinusoidCoords(props: Props): Coord[] {
    const coords = [
        [0.5, 0.5],
        [0.65, 0.6],
    ];
    // @ts-expect-error - TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
    return pointsFromNormalized(props, coords);
}

function getSinusoidEquationString(props: Props): string {
    const coeffs = getCurrentSinusoidCoefficients(props);
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

function defaultExponentialCoords(props: Props): Coord[] {
    const coords = [
        [0.5, 0.55],
        [0.75, 0.75],
    ];
    // @ts-expect-error - TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
    return pointsFromNormalized(props, coords, true);
}

function getExponentialEquationString(props: Props): string {
    const coords =
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        props.userInput.coords || defaultExponentialCoords(props);
    const asymptote =
        // @ts-expect-error - TS2339 - Property 'asymptote' does not exist on type 'PerseusGraphType'.
        props.userInput.asymptote ?? 0;
    const coeffs = getExponentialCoefficients(coords, asymptote);
    if (coeffs == null) {
        return "y = e^x";
    }
    return (
        "y = " +
        coeffs.a.toFixed(3) +
        "e^(" +
        coeffs.b.toFixed(3) +
        "x) + " +
        coeffs.c.toFixed(3)
    );
}

function defaultLogarithmCoords(props: Props): Coord[] {
    const coords: Coord[] = [
        [0.55, 0.55],
        [0.75, 0.75],
    ];
    return pointsFromNormalized(props, coords, true);
}

function getLogarithmEquationString(props: Props): string {
    const coords =
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        props.userInput.coords || defaultLogarithmCoords(props);
    const asymptote =
        // @ts-expect-error - TS2339 - Property 'asymptote' does not exist on type 'PerseusGraphType'.
        props.userInput.asymptote ?? 0;
    const coeffs = getLogarithmCoefficients(coords, asymptote);
    if (coeffs == null) {
        return "y = ln(x)";
    }
    const cStr =
        coeffs.c === 0
            ? "x"
            : coeffs.c < 0
              ? "x - " + Math.abs(coeffs.c).toFixed(3)
              : "x + " + coeffs.c.toFixed(3);
    return (
        "y = " + coeffs.a.toFixed(3) + "ln(" + coeffs.b.toFixed(3) + cStr + ")"
    );
}

function getAbsoluteValueEquationString(props: Props): string {
    const userInput = props.userInput;
    if (userInput.type !== "absolute-value" || !userInput.coords) {
        return "";
    }
    const coeffs = getAbsoluteValueCoefficients(userInput.coords);
    if (coeffs === undefined) {
        return "";
    }
    const {m, h, v} = coeffs;
    return (
        "y = " + m.toFixed(3) + "|x - " + h.toFixed(3) + "| + " + v.toFixed(3)
    );
}

function getCurrentTangentCoefficients(props: Props): TangentCoefficient {
    const coords =
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        props.userInput.coords || defaultTangentCoords(props);
    return getTangentCoefficients(coords);
}

function defaultTangentCoords(props: Props): Coord[] {
    const coords = [
        [0.5, 0.5],
        [0.75, 0.75],
    ];
    // @ts-expect-error - TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
    return pointsFromNormalized(props, coords);
}

function getTangentEquationString(props: Props): string {
    const coeffs = getCurrentTangentCoefficients(props);
    return (
        "y = " +
        coeffs[0].toFixed(3) +
        "tan(" +
        coeffs[1].toFixed(3) +
        "x - " +
        coeffs[2].toFixed(3) +
        ") + " +
        coeffs[3].toFixed(3)
    );
}

function getCircleEquationString(props: Props): string {
    const graph = props.userInput;
    // @ts-expect-error - TS2339 - Property 'center' does not exist on type 'PerseusGraphType'.
    const center = graph.center || [0, 0];
    // @ts-expect-error - TS2339 - Property 'radius' does not exist on type 'PerseusGraphType'.
    const radius = graph.radius || 2;
    return "center (" + center[0] + ", " + center[1] + "), radius " + radius;
}

function getLinearSystemEquationString(props: Props): string {
    const coords = getLinearSystemCoords(props.userInput, props);

    return (
        "\n" +
        getLineEquation(coords[0][0], coords[0][1]) +
        "\n" +
        getLineEquation(coords[1][0], coords[1][1]) +
        "\n" +
        getLineIntersectionString(coords[0], coords[1])
    );
}

function getPointEquationString(props: Props): string {
    if (props.userInput.type !== "point") {
        throw makeInvalidTypeError("getPointEquationString", "point");
    }

    const coords = getPointCoords(props.userInput, props);
    return coords
        .map(function (coord) {
            return "(" + coord[0] + ", " + coord[1] + ")";
        })
        .join(", ");
}

function getSegmentEquationString(props: Props): string {
    if (props.userInput.type !== "segment") {
        throw makeInvalidTypeError("getSegmentEquationString", "segment");
    }

    const segments = getSegmentCoords(props.userInput, props);
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

function getRayEquationString(props: Props): string {
    if (props.userInput.type !== "ray") {
        throw makeInvalidTypeError("createPointForPolygonType", "ray");
    }

    const coords = getLineCoords(props.userInput, props);
    const a = coords[0];
    const b = coords[1];
    let eq = getLinearEquationString(props);

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

function getPolygonEquationString(props: Props): string {
    if (props.userInput.type !== "polygon") {
        throw makeInvalidTypeError("getPolygonEquationString", "polygon");
    }
    const coords = getPolygonCoords(props.userInput, props);
    return _.map(coords, function (coord) {
        return "(" + coord.join(", ") + ")";
    }).join(" ");
}

function getAngleEquationString(props: Props): string {
    if (props.userInput.type !== "angle") {
        throw makeInvalidTypeError("getAngleEquationString", "angle");
    }
    const coords = getAngleCoords(props.userInput, props);
    const allowReflexAngles = props.userInput.allowReflexAngles;
    const angle = getClockwiseAngle(coords, allowReflexAngles);
    return (
        angle.toFixed(0) + "\u00B0 angle" + " at (" + coords[1].join(", ") + ")"
    );
}

function getVectorEquationString(props: Props): string {
    if (props.userInput.type !== "vector") {
        throw makeInvalidTypeError("getVectorEquationString", "vector");
    }
    const coords = props.userInput.coords;
    if (!coords) {
        return "";
    }
    const [tail, tip] = coords;
    const dx = tip[0] - tail[0];
    const dy = tip[1] - tail[1];
    return `\u27E8${dx.toFixed(3)}, ${dy.toFixed(3)}\u27E9`;
}

export function getEquationString(props: Props): string {
    const type = props.userInput.type;
    switch (type) {
        case "none":
            return getNoneEquationString();
        case "linear":
            return getLinearEquationString(props);
        case "quadratic":
            return getQuadraticEquationString(props);
        case "sinusoid":
            return getSinusoidEquationString(props);
        case "circle":
            return getCircleEquationString(props);
        case "linear-system":
            return getLinearSystemEquationString(props);
        case "point":
            return getPointEquationString(props);
        case "segment":
            return getSegmentEquationString(props);
        case "ray":
            return getRayEquationString(props);
        case "polygon":
            return getPolygonEquationString(props);
        case "angle":
            return getAngleEquationString(props);
        case "absolute-value":
            return getAbsoluteValueEquationString(props);
        case "exponential":
            return getExponentialEquationString(props);
        case "tangent":
            return getTangentEquationString(props);
        case "logarithm":
            return getLogarithmEquationString(props);
        case "vector":
            return getVectorEquationString(props);
        default:
            throw new UnreachableCaseError(type);
    }
}
