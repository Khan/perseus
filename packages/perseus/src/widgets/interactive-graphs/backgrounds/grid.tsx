import {Coordinates, usePaneContext, useTransformContext, vec} from "mafs";
import * as React from "react";

import GraphLockedLayer from "../graph-locked-layer";
import {X, Y} from "../math";

import AxisArrows from "./axis-arrows";
import AxisLabels from "./axis-labels";
import {AxisTicks} from "./axis-ticks";

import type {GraphRange} from "../../../perseus-types";
import type {SizeClass} from "../../../util/sizing-utils";

interface GridProps {
    tickStep: vec.Vector2;
    gridStep: vec.Vector2;
    range: GraphRange;
    containerSizeClass: SizeClass;
    markings: "graph" | "grid" | "none";
    width: number;
    height: number;
    lockedFigures?: any;
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

export const Grid = (props: GridProps) => {
    const {viewTransform} = useTransformContext();
    const {xPaneRange, yPaneRange} = usePaneContext();

    const xMin = xPaneRange[0];
    const yMax = yPaneRange[1];

    const xPad = props.range[0][0] - Math.min(0, xMin);
    const yPad = props.range[1][1] - Math.max(0, yMax);

    const pad = vec.transform([xPad, yPad], viewTransform);

    // STOPSHIP: this is hacky as all heck but this is for testing

    const horizontalAdjustment = props.range[0][0] > 0 ? 0 : 0;
    const verticalAdjustment = props.range[1][1] < 0 ? 6.6 : 0;

    const rectTop = pad[1] + verticalAdjustment - 1;
    const rectBottom = pad[1] + props.height + verticalAdjustment + 1;
    const rectLeft = pad[0] + horizontalAdjustment - 1;
    const rectRight = pad[0] + props.width + horizontalAdjustment + 2;

    return props.markings === "none" ? null : (
        <g
            style={{
                clipPath: `path('M ${rectLeft} ${rectTop} H ${rectRight} V ${rectBottom} H ${rectLeft} Z')`,
            }}
        >
            <Coordinates.Cartesian
                xAxis={axisOptions(props, X)}
                yAxis={axisOptions(props, Y)}
            />
            {props.lockedFigures && (
                <g style={{width: props.width, height: props.height}}>
                    {/* Locked layer */}

                    <GraphLockedLayer
                        lockedFigures={props.lockedFigures}
                        range={props.range}
                    />
                </g>
            )}
        </g>
    );
};