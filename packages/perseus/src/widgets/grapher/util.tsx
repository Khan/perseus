import {GrapherUtil} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Graphie from "../../components/graphie";
import {getDependencies} from "../../dependencies";
import Util from "../../util";

import type {FunctionTypeMappingKeys} from "@khanacademy/perseus-core";

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

export const getEquationString = (props: any): string => {
    const plot = props.plot;
    if (plot.type && plot.coords) {
        const handler = GrapherUtil.functionForType(plot.type);
        const result = handler.getEquationString(plot.coords, plot.asymptote);
        return result || "";
    }
    return "";
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
    const snapStep =
        options.snapStep || GrapherUtil.snapStepFromGridStep(gridStep);
    return {
        gridStep: gridStep,
        snapStep: snapStep,
    };
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
