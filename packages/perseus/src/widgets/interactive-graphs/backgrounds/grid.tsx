import {Coordinates} from "mafs";
import * as React from "react";

import {X, Y} from "../math";

import type {SizeClass} from "../../../util/sizing-utils";
import type {GraphRange, MarkingsType} from "@khanacademy/perseus-core";
import type {vec} from "mafs";

interface GridProps {
    gridStep: vec.Vector2;
    range: GraphRange;
    containerSizeClass: SizeClass;
    markings: MarkingsType;
    width: number;
    height: number;
}

/**
 * gridLineOptions determine the grid-line options for Mafs, with the axis
 * lines disabled. The axis lines are rendered separately by `<Axes>` so that
 * they can be clipped differently from the grid lines (see `<Axes>` below).
 *
 * axisIndex is for grabbing data in an array that contains
 * data for multiple axes. For example range: [[-10, 10], [-10, 10]]
 * range[0] is data for the x axis and range[1] is data for the y axis
 *
 * @param {GridProps} props
 * @param {number} axisIndex which axis we're getting options for
 */
const gridLineOptions = (
    props: Omit<GridProps, "containerSizeClass">,
    axisIndex: number,
) => {
    const lines: number | false =
        props.markings === "axes" ? false : props.gridStep[axisIndex];
    return {
        axis: false as const,
        lines: lines,
        labels: false as const,
    };
};

/**
 * axisLineOptions determine the axis-line options for Mafs, with the grid
 * lines disabled.
 */
const axisLineOptions = (props: Omit<GridProps, "containerSizeClass">) => {
    return {
        axis: props.markings === "graph" || props.markings === "axes",
        lines: false as const,
        labels: false as const,
    };
};

/**
 * Renders the Cartesian grid lines (not the axis lines). This is intended to
 * be clipped to the graph's exact bounds so grid lines never spill past the
 * edge. The axis lines are rendered separately by `<Axes>`.
 */
export const Grid = (props: GridProps) => {
    return props.markings === "none" ? null : (
        <Coordinates.Cartesian
            xAxis={gridLineOptions(props, X)}
            yAxis={gridLineOptions(props, Y)}
        />
    );
};

/**
 * Renders the Cartesian axis lines (not the grid lines). When an axis sits on
 * the graph's edge, the outer half of its stroke would be clipped away by the
 * graph bounds, making the axis look half its intended width. To avoid that,
 * this is clipped to the graph bounds expanded outward (by half the stroke
 * width) only on the sides where an axis sits on the edge — see how this is
 * clipped in mafs-graph.tsx.
 */
export const Axes = (props: GridProps) => {
    return props.markings === "none" ? null : (
        <Coordinates.Cartesian
            xAxis={axisLineOptions(props)}
            yAxis={axisLineOptions(props)}
        />
    );
};
