import {
    functionForType,
    maybePointsFromNormalized,
    snapStepFromGridStep,
    type FunctionTypeMappingKeys,
} from "./grapher-util";

import type {Coord} from "../data-schema";

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
    const snapStep = snapStepFromGridStep(gridStep);
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
    backgroundImage: {
        url: null,
    },
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
