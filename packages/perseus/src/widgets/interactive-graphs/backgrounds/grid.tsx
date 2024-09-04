import {Coordinates} from "mafs";
import * as React from "react";

import {X, Y} from "../math";

import type {GraphRange} from "../../../perseus-types";
import type {SizeClass} from "../../../util/sizing-utils";
import type {vec} from "mafs";

interface GridProps {
    tickStep: vec.Vector2;
    gridStep: vec.Vector2;
    range: GraphRange;
    containerSizeClass: SizeClass;
    markings: "graph" | "grid" | "none";
    width: number;
    height: number;
}

/**
 * axisOptions determine axis options for Mafs
 *
 * axisIndex is for grabbing data in an array that contains
 * data for multiple axes. For example range: [[-10, 10], [-10, 10]]
 * range[0] is data for the x axis and range[1] is data for the y axis
 *
 * @param {GridProps} props
 * @param {number} axisIndex which axis we're getting options for
 */
const axisOptions = (
    props: Omit<GridProps, "containerSizeClass">,
    axisIndex: number,
) => {
    return {
        axis: props.markings === "graph",
        lines: props.gridStep[axisIndex],
        labels: false as const,
    };
};

export const Grid = (props: GridProps) => {
    return props.markings === "none" ? null : (
        <Coordinates.Cartesian
            xAxis={axisOptions(props, X)}
            yAxis={axisOptions(props, Y)}
        />
    );
};
