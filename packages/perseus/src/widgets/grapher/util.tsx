/* eslint-disable one-var */
import {point as kpoint} from "@khanacademy/kmath";
import * as React from "react";
import _ from "underscore";

import Graphie from "../../components/graphie";
import {getDependencies} from "../../dependencies";
import Util from "../../util";

import type {
    Coords,
    LinearType,
    QuadraticType,
    SinusoidType,
    TangentType,
    ExponentialType,
    LogarithmType,
    AbsoluteValueType,
} from "./grapher-types";
import type {Coord} from "../../interactive2/types";

// @ts-expect-error - TS2339 - Property 'Plot' does not exist on type 'typeof Graphie'.
const Plot = Graphie.Plot;

export const DEFAULT_BACKGROUND_IMAGE = {
    url: null,
} as const;

// TODO(charlie): These really need to go into a utility file as they're being
// used by both interactive-graph and now grapher.
function canonicalSineCoefficients(coeffs: any) {
    // For a curve of the form f(x) = a * Sin(b * x - c) + d,
    // this function ensures that a, b > 0, and c is its
    // smallest possible positive value.
    let amplitude = coeffs[0];
    let angularFrequency = coeffs[1];
    let phase = coeffs[2];
    const verticalOffset = coeffs[3];

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

function canonicalTangentCoefficients(coeffs: any) {
    // For a curve of the form f(x) = a * Tan(b * x - c) + d,
    // this function ensures that a, b > 0, and c is its
    // smallest possible positive value.
    let amplitude = coeffs[0];
    let angularFrequency = coeffs[1];
    let phase = coeffs[2];
    const verticalOffset = coeffs[3];

    // Guarantee a > 0
    if (amplitude < 0) {
        amplitude *= -1;
        angularFrequency *= -1;
        phase *= -1;
    }

    const period = Math.PI;
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

const PlotDefaults = {
    areEqual: function (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ): boolean {
        return Util.deepEq(coeffs1, coeffs2);
    },
    Movable: Plot,
    getPropsForCoeffs: function (coeffs: ReadonlyArray<number>): {fn: any} {
        return {
            // @ts-expect-error - TS2339 - Property 'getFunctionForCoeffs' does not exist on type '{ readonly areEqual: (coeffs1: any, coeffs2: any) => boolean; readonly Movable: any; readonly getPropsForCoeffs: (coeffs: any) => any; }'.
            fn: _.partial(this.getFunctionForCoeffs, coeffs),
        };
    },
} as const;

const Linear: LinearType = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/67aaf581e6d9ef9038c10558a1f70ac21c11c9f8.png",

    defaultCoords: [
        [0.25, 0.75],
        [0.75, 0.75],
    ],

    getCoefficients: function (
        coords: Coords,
    ): ReadonlyArray<number> | undefined {
        const p1 = coords[0];
        const p2 = coords[1];

        const denom = p2[0] - p1[0];
        const num = p2[1] - p1[1];

        if (denom === 0) {
            return;
        }

        const m = num / denom;
        const b = p2[1] - m * p2[0];
        return [m, b];
    },

    getFunctionForCoeffs: function (coeffs: ReadonlyArray<number>, x: number) {
        const m = coeffs[0],
            b = coeffs[1];
        return m * x + b;
    },

    getEquationString: function (coords: Coords) {
        const coeffs: ReadonlyArray<number> = this.getCoefficients(coords);
        const m: number = coeffs[0],
            b: number = coeffs[1];
        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
    },
});

const Quadratic: QuadraticType = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/e23d36e6fc29ee37174e92c9daba2a66677128ab.png",

    defaultCoords: [
        [0.5, 0.5],
        [0.75, 0.75],
    ],
    // @ts-expect-error - TS2339 - Property 'Parabola' does not exist on type 'typeof Graphie'.
    Movable: Graphie.Parabola,

    getCoefficients: function (coords: Coords): ReadonlyArray<number> {
        const p1 = coords[0];
        const p2 = coords[1];

        // Parabola with vertex (h, k) has form: y = a * (h - k)^2 + k
        const h = p1[0];
        const k = p1[1];

        // Use these to calculate familiar a, b, c
        const a = (p2[1] - k) / ((p2[0] - h) * (p2[0] - h));
        const b = -2 * h * a;
        const c = a * h * h + k;

        return [a, b, c];
    },

    getFunctionForCoeffs: function (
        coeffs: ReadonlyArray<number>,
        x: number,
    ): number {
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2];
        return (a * x + b) * x + c;
    },

    getPropsForCoeffs: function (coeffs: ReadonlyArray<number>): {
        a: number;
        b: number;
        c: number;
    } {
        return {
            a: coeffs[0],
            b: coeffs[1],
            c: coeffs[2],
        };
    },

    getEquationString: function (coords: Coords) {
        const coeffs = this.getCoefficients(coords);
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2];
        return (
            "y = " +
            a.toFixed(3) +
            "x^2 + " +
            b.toFixed(3) +
            "x + " +
            c.toFixed(3)
        );
    },
});

const Sinusoid: SinusoidType = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/3d68e7718498475f53b206c2ab285626baf8857e.png",

    defaultCoords: [
        [0.5, 0.5],
        [0.6, 0.6],
    ],
    // @ts-expect-error - TS2339 - Property 'Sinusoid' does not exist on type 'typeof Graphie'.
    Movable: Graphie.Sinusoid,

    getCoefficients: function (coords: Coords) {
        const p1 = coords[0];
        const p2 = coords[1];

        const a = p2[1] - p1[1];
        const b = Math.PI / (2 * (p2[0] - p1[0]));
        const c = p1[0] * b;
        const d = p1[1];

        return [a, b, c, d];
    },

    getFunctionForCoeffs: function (coeffs: ReadonlyArray<number>, x: number) {
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2],
            d = coeffs[3];
        return a * Math.sin(b * x - c) + d;
    },

    getPropsForCoeffs: function (coeffs: ReadonlyArray<number>) {
        return {
            a: coeffs[0],
            b: coeffs[1],
            c: coeffs[2],
            d: coeffs[3],
        };
    },

    getEquationString: function (coords: Coords) {
        const coeffs = this.getCoefficients(coords);
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2],
            d = coeffs[3];
        return (
            "y = " +
            a.toFixed(3) +
            " sin(" +
            b.toFixed(3) +
            "x - " +
            c.toFixed(3) +
            ") + " +
            d.toFixed(3)
        );
    },

    areEqual: function (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) {
        return Util.deepEq(
            canonicalSineCoefficients(coeffs1),
            canonicalSineCoefficients(coeffs2),
        );
    },
});

const Tangent: TangentType = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/7db80d23c35214f98659fe1cf0765811c1bbfbba.png",

    defaultCoords: [
        [0.5, 0.5],
        [0.75, 0.75],
    ],

    getCoefficients: function (coords: Coords) {
        const p1 = coords[0];
        const p2 = coords[1];

        const a = p2[1] - p1[1];
        const b = Math.PI / (4 * (p2[0] - p1[0]));
        const c = p1[0] * b;
        const d = p1[1];

        return [a, b, c, d];
    },

    getFunctionForCoeffs: function (coeffs: ReadonlyArray<number>, x: number) {
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2],
            d = coeffs[3];
        return a * Math.tan(b * x - c) + d;
    },

    getEquationString: function (coords: Coords) {
        const coeffs = this.getCoefficients(coords);
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2],
            d = coeffs[3];
        return (
            "y = " +
            a.toFixed(3) +
            " sin(" +
            b.toFixed(3) +
            "x - " +
            c.toFixed(3) +
            ") + " +
            d.toFixed(3)
        );
    },

    areEqual: function (
        coeffs1: ReadonlyArray<number>,
        coeffs2: ReadonlyArray<number>,
    ) {
        return Util.deepEq(
            canonicalTangentCoefficients(coeffs1),
            canonicalTangentCoefficients(coeffs2),
        );
    },
});

const Exponential: ExponentialType = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/9cbfad55525e3ce755a31a631b074670a5dad611.png",

    defaultCoords: [
        [0.5, 0.55],
        [0.75, 0.75],
    ],

    defaultAsymptote: [
        [0, 0.5],
        [1.0, 0.5],
    ],

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
    extraCoordConstraint: function (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coords,
        asymptote: Coords,
        graph,
    ) {
        const y: number = asymptote[0][1];
        return _.all(coords, (coord) => coord[1] !== y);
    },

    extraAsymptoteConstraint: function (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coords,
        asymptote: Coords,
        graph,
    ): Coord {
        const y = newCoord[1];
        const isValid =
            _.all(coords, (coord) => coord[1] > y) ||
            _.all(coords, (coord) => coord[1] < y);

        if (isValid) {
            return [oldCoord[0], y];
        }
        // Snap the asymptote as close as possible, i.e., if the user moves
        // the mouse really quickly into an invalid region
        const oldY = oldCoord[1];
        const wasBelow = _.all(coords, (coord) => coord[1] > oldY);
        if (wasBelow) {
            const bottomMost = _.min(_.map(coords, (coord) => coord[1]));
            return [oldCoord[0], bottomMost - graph.snapStep[1]];
        }
        const topMost = _.max(_.map(coords, (coord) => coord[1]));
        return [oldCoord[0], topMost + graph.snapStep[1]];
    },

    allowReflectOverAsymptote: true,

    getCoefficients: function (
        coords: Coords,
        asymptote: Coords,
    ): ReadonlyArray<number> {
        const p1 = coords[0];
        const p2 = coords[1];

        const c = asymptote[0][1];
        const b = Math.log((p1[1] - c) / (p2[1] - c)) / (p1[0] - p2[0]);
        const a = (p1[1] - c) / Math.exp(b * p1[0]);
        return [a, b, c];
    },

    getFunctionForCoeffs: function (
        coeffs: ReadonlyArray<number>,
        x: number,
    ): number {
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2];
        return a * Math.exp(b * x) + c;
    },

    getEquationString: function (coords: Coords, asymptote: Coords) {
        if (!asymptote) {
            return null;
        }
        const coeffs = this.getCoefficients(coords, asymptote);
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2];
        return (
            "y = " +
            a.toFixed(3) +
            "e^(" +
            b.toFixed(3) +
            "x) + " +
            c.toFixed(3)
        );
    },
});

const Logarithm: LogarithmType = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/f6491e99d34af34d924bfe0231728ad912068dc3.png",

    defaultCoords: [
        [0.55, 0.5],
        [0.75, 0.75],
    ],

    defaultAsymptote: [
        [0.5, 0],
        [0.5, 1.0],
    ],

    extraCoordConstraint: function (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coord,
        asymptote: Coords,
        graph,
    ) {
        const x = asymptote[0][0];
        return (
            _.all(coords, (coord) => coord[0] !== x) &&
            coords[0][1] !== coords[1][1]
        );
    },

    extraAsymptoteConstraint: function (
        newCoord: Coord,
        oldCoord: Coord,
        coords: Coords,
        asymptote: Coords,
        graph,
    ): ReadonlyArray<number> {
        const x = newCoord[0];
        const isValid =
            _.all(coords, (coord) => coord[0] > x) ||
            _.all(coords, (coord) => coord[0] < x);

        if (isValid) {
            return [x, oldCoord[1]];
        }
        // Snap the asymptote as close as possible, i.e., if the user moves
        // the mouse really quickly into an invalid region
        const oldX = oldCoord[0];
        const wasLeft = _.all(coords, (coord) => coord[0] > oldX);
        if (wasLeft) {
            const leftMost = _.min(_.map(coords, (coord) => coord[0]));
            return [leftMost - graph.snapStep[0], oldCoord[1]];
        }
        const rightMost = _.max(_.map(coords, (coord) => coord[0]));
        return [rightMost + graph.snapStep[0], oldCoord[1]];
    },

    allowReflectOverAsymptote: true,

    getCoefficients: function (
        coords: Coords,
        asymptote: Coords,
    ): ReadonlyArray<number> | undefined {
        // It's easiest to calculate the logarithm's coefficients by thinking
        // about it as the inverse of the exponential, so we flip x and y and
        // perform some algebra on the coefficients. This also unifies the
        // logic between the two 'models'.
        const flip = (coord: Coord): Coord => [coord[1], coord[0]];
        const inverseCoeffs = Exponential.getCoefficients(
            _.map(coords, flip) as Coords,
            _.map(asymptote, flip) as Coords,
        );
        if (inverseCoeffs) {
            const c = -inverseCoeffs[2] / inverseCoeffs[0];
            const b = 1 / inverseCoeffs[0];
            const a = 1 / inverseCoeffs[1];
            return [a, b, c];
        }
    },

    getFunctionForCoeffs: function (
        coeffs: ReadonlyArray<number>,
        x: number,
        asymptote: Coords,
    ) {
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2];
        return a * Math.log(b * x + c);
    },

    getEquationString: function (coords: Coords, asymptote: Coords) {
        if (!asymptote) {
            return null;
        }
        const coeffs: ReadonlyArray<number> = this.getCoefficients(
            coords,
            asymptote,
        );
        const a = coeffs[0],
            b = coeffs[1],
            c = coeffs[2];
        return (
            "y = ln(" +
            a.toFixed(3) +
            "x + " +
            b.toFixed(3) +
            ") + " +
            c.toFixed(3)
        );
    },
});

const AbsoluteValue: AbsoluteValueType = _.extend({}, PlotDefaults, {
    url: "https://ka-perseus-graphie.s3.amazonaws.com/8256a630175a0cb1d11de223d6de0266daf98721.png",

    defaultCoords: [
        [0.5, 0.5],
        [0.75, 0.75],
    ],

    getCoefficients: function (
        coords: Coords,
    ): ReadonlyArray<number> | undefined {
        const p1 = coords[0];
        const p2 = coords[1];

        const denom = p2[0] - p1[0];
        const num = p2[1] - p1[1];

        if (denom === 0) {
            return;
        }

        let m = Math.abs(num / denom);
        if (p2[1] < p1[1]) {
            m *= -1;
        }
        const horizontalOffset = p1[0];
        const verticalOffset = p1[1];

        return [m, horizontalOffset, verticalOffset];
    },

    getFunctionForCoeffs: function (coeffs: ReadonlyArray<number>, x: number) {
        const m = coeffs[0],
            horizontalOffset = coeffs[1],
            verticalOffset = coeffs[2];
        return m * Math.abs(x - horizontalOffset) + verticalOffset;
    },

    getEquationString: function (coords: Coords) {
        const coeffs: ReadonlyArray<number> = this.getCoefficients(coords);
        const m = coeffs[0],
            horizontalOffset = coeffs[1],
            verticalOffset = coeffs[2];
        return (
            "y = " +
            m.toFixed(3) +
            "| x - " +
            horizontalOffset.toFixed(3) +
            "| + " +
            verticalOffset.toFixed(3)
        );
    },
});

/* Utility functions for dealing with graphing interfaces. */
const functionTypeMapping = {
    linear: Linear,
    quadratic: Quadratic,
    sinusoid: Sinusoid,
    tangent: Tangent,
    exponential: Exponential,
    logarithm: Logarithm,
    absolute_value: AbsoluteValue,
} as const;

export const allTypes: any = _.keys(functionTypeMapping);

type FunctionTypeMappingKeys = keyof typeof functionTypeMapping;

type ConditionalGraderType<T extends FunctionTypeMappingKeys> =
    // biome-ignore format: keep these on the same line
    T extends "linear" ? LinearType
    : T extends "quadratic" ? QuadraticType
    : T extends "sinusoid" ? SinusoidType
    : T extends "tangent" ? TangentType
    : T extends "exponential" ? ExponentialType
    : T extends "logarithm" ? LogarithmType
    : T extends "absolute_value" ? AbsoluteValueType
    : never;

export function functionForType<T extends FunctionTypeMappingKeys>(
    type: T,
): ConditionalGraderType<T> {
    // @ts-expect-error: TypeScript doesn't know how to use deal with generics
    // and conditional types in this way.
    return functionTypeMapping[type];
}

export const getEquationString = (props: any): string => {
    const plot = props.plot;
    if (plot.type && plot.coords) {
        const handler = functionForType(plot.type);
        const result = handler.getEquationString(plot.coords, plot.asymptote);
        return result || "";
    }
    return "";
};

export const pointsFromNormalized = (
    coordsList: ReadonlyArray<Coord>,
    range: [Coord, Coord],
    step: [number, number],
    snapStep: [number, number],
): ReadonlyArray<Coord> => {
    const numSteps = function (range: Coord, step: number) {
        return Math.floor((range[1] - range[0]) / step);
    };

    // @ts-expect-error - TS2322 - Type 'number[][]' is not assignable to type 'readonly Coord[]'.
    return coordsList.map((coords) => {
        const unsnappedPoint = coords.map((coord, i) => {
            const currRange = range[i];
            const currStep = step[i];
            const nSteps = numSteps(currRange, currStep);
            const tick = Math.round(coord * nSteps);
            return currRange[0] + currStep * tick;
        });
        // In some graphing widgets, e.g. interactive-graph, you can rely
        // on the Graphie to handle snapping. Here, we need the points
        // returned to already be snapped so that the plot that goes
        // through them is correct.
        return kpoint.roundTo(unsnappedPoint, snapStep);
    });
};

export const maybePointsFromNormalized = (
    coordsList: ReadonlyArray<Coord> | null | undefined,
    range: [Coord, Coord],
    step: [number, number],
    snapStep: [number, number],
): ReadonlyArray<Coord> | null | undefined => {
    if (coordsList) {
        return pointsFromNormalized(coordsList, range, step, snapStep);
    }
    return coordsList;
};

/* Given a plot type, return the appropriate default value for a grapher
 * widget's plot props: type, default coords, default asymptote. */
export const defaultPlotProps = (
    type: FunctionTypeMappingKeys,
    graph: any,
): any => {
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
    const model = functionForType(type);
    const defaultAsymptote =
        "defaultAsymptote" in model ? model.defaultAsymptote : null;
    const gridStep = [1, 1];
    // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type '[number, number]'.
    const snapStep = Util.snapStepFromGridStep(gridStep);
    return {
        type,
        asymptote: maybePointsFromNormalized(
            defaultAsymptote,
            graph.range,
            graph.step,
            snapStep,
        ),
        coords: null,
    };
};

/* Given a list of available types, choose which to use. */
export const chooseType: <T>(list: ReadonlyArray<T>) => T | undefined = _.first;

export const getGridAndSnapSteps = (
    options: any,
    boxSize: number,
): {
    gridStep: [number, number];
    snapStep: [number, number];
} => {
    const gridStep =
        options.gridStep ||
        Util.getGridStep(options.range, options.step, boxSize);
    const snapStep = options.snapStep || Util.snapStepFromGridStep(gridStep);
    return {
        gridStep: gridStep,
        snapStep: snapStep,
    };
};

const defaultGraph: {
    labels: ReadonlyArray<string>;
    range: [Coord, Coord];
    step: [number, number];
    backgroundImage: any;
    markings: string;
    rulerLabel: string;
    rulerTicks: number;
    valid: boolean;
    showTooltips: boolean;
} = {
    labels: ["x", "y"],
    range: [
        [-10, 10],
        [-10, 10],
    ],
    step: [1, 1],
    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
    markings: "graph",
    rulerLabel: "",
    rulerTicks: 10,
    valid: true,
    showTooltips: false,
};
const defaultPlot = defaultPlotProps("linear", defaultGraph);

export const DEFAULT_GRAPHER_PROPS: any = {
    graph: defaultGraph,
    plot: defaultPlot,
    availableTypes: [defaultPlot.type],
};

export const typeToButton = (type: FunctionTypeMappingKeys): any => {
    const capitalized = type.charAt(0).toUpperCase() + type.substring(1);
    const staticUrl = getDependencies().staticUrl;

    return {
        value: type,
        title: capitalized,
        content: (
            <img src={staticUrl(functionForType(type).url)} alt={capitalized} />
        ),
    };
};
