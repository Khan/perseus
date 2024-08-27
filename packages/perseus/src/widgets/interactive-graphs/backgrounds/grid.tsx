import {Coordinates, usePaneContext, useTransformContext, vec} from "mafs";
import * as React from "react";

import {X, Y} from "../math";

import type {GraphRange} from "../../../perseus-types";
import type {SizeClass} from "../../../util/sizing-utils";
import type {Interval} from "mafs";

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
 * lineLabelText get the text that should
 * be displayed for a specific tick place
 *
 * @param {number} n the tick number
 * @param {number} tickStep how frequently a label should appear
 * @param {vec.Vector2} range the min/max range on the axis
 */
export const lineLabelText = (
    n: number,
    tickStep: number,
    range: vec.Vector2,
): string => {
    const [min, max] = range;
    const isOnStep = n % tickStep === 0;
    const isNegativeOne = n === -1;
    const isMin = n === min;
    const isMax = n === max;
    const shouldRender = isOnStep && !isNegativeOne && !isMin && !isMax;
    return shouldRender ? `${n}` : "";
};

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

const getVerticalAdjustment = (range: GraphRange) => {
    const yMax = range[1][1];
    // If the yMax is less than or equal to 0 and is an odd number
    // then we need to adjust the grid by 6.6 units to accomodate the
    // size of the axis arrows. Otherwise, we need to adjust by 0.5 units
    // for just the grid border.
    return yMax <= 0 && yMax % 2 !== 0 && yMax !== -1 ? 6.6 : 0.5;
};

// Generate the clip path for the grid so that the
// grid lines don't render outside the graph bounds
const getClipPath = (
    viewTransform: vec.Matrix,
    xPaneRange: Interval,
    yPaneRange: Interval,
    height: number,
    width: number,
    range: GraphRange,
) => {
    // Get the true bounds of the SVG from mafs
    const xMin = xPaneRange[0];
    const yMax = yPaneRange[1];

    // Adjust the necessary padding for the
    // clipping path by the range of the graph
    const xPad = range[0][0] - Math.min(0, xMin);
    const yPad = range[1][1] - Math.max(0, yMax);

    // Transform the padding to pixel coordinates
    const pad = vec.transform([xPad, yPad], viewTransform);

    // Adjust the grid to be centered in the graph
    // depending on the provided range.
    const horizontalAdjustment = range[0][0] > 0 ? 0 : -0.5;
    const verticalAdjustment = getVerticalAdjustment(range);

    // Create a path that is the size of the graph with a 1px
    // buffer to account for the outer grid border lines
    const rectTop = pad[1] + verticalAdjustment - 1;
    const rectBottom = pad[1] + height + verticalAdjustment;
    const rectLeft = pad[0] + horizontalAdjustment;
    const rectRight = pad[0] + width + horizontalAdjustment + 1;

    return `path('M ${rectLeft} ${rectTop} H ${rectRight} V ${rectBottom} H ${rectLeft} Z')`;
};

export const Grid = (props: GridProps) => {
    const {viewTransform} = useTransformContext();
    const {xPaneRange, yPaneRange} = usePaneContext();

    // Set up the clip path for the grid so that grid
    // lines do not render outside the graph bounds
    const clipPath = getClipPath(
        viewTransform,
        xPaneRange,
        yPaneRange,
        props.height,
        props.width,
        props.range,
    );

    return props.markings === "none" ? null : (
        <g
            style={{
                clipPath: clipPath,
            }}
        >
            <Coordinates.Cartesian
                xAxis={axisOptions(props, X)}
                yAxis={axisOptions(props, Y)}
            />
        </g>
    );
};
