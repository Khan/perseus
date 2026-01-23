import {point as kpoint} from "@khanacademy/kmath";
import {GrapherUtil} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Graphie from "../../components/graphie";
import {getDependencies} from "../../dependencies";
import Util from "../../util";

import type {Coord} from "../../interactive2/types";
import type {
    FunctionTypeMappingKeys,
    GrapherAnswerTypes,
} from "@khanacademy/perseus-core";

type MovableMap = {
    [K in keyof typeof GrapherUtil.MOVABLES]: any;
};
export const movableTypeToComponent: MovableMap = {
    // @ts-expect-error - TS2339 - Property 'Plot' does not exist on type 'typeof Graphie'.
    PLOT: Graphie.Plot,
    // @ts-expect-error - TS2339 - Property 'Parabola' does not exist on type 'typeof Graphie'.
    PARABOLA: Graphie.Parabola,
    // @ts-expect-error - TS2339 - Property 'Sinusoid' does not exist on type 'typeof Graphie'.
    SINUSOID: Graphie.Sinusoid,
};

const DEFAULT_BACKGROUND_IMAGE = {
    url: null,
} as const;

export const getEquationString = (plot: GrapherAnswerTypes): string => {
    if (plot.type && plot.coords) {
        const handler = GrapherUtil.functionForType(plot.type);
        const result = handler.getEquationString(
            plot.coords,
            // some graph types don't have this
            (plot as any).asymptote,
        );
        return result || "";
    }
    return "";
};

const pointsFromNormalized = (
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
    const model = GrapherUtil.functionForType(type);
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
            <img
                src={staticUrl(GrapherUtil.functionForType(type).url)}
                alt={capitalized}
            />
        ),
    };
};
