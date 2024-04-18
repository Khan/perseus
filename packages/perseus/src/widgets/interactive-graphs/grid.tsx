import {Coordinates} from "mafs";
import * as React from "react";

import AxisArrows from "./axis-arrows";
import AxisLabels from "./axis-labels";
import {AxisTicks} from "./axis-ticks";
import {useTransform} from "./graphs/use-transform";
import {useTransformVectorToPixel} from "./graphs/use-transform";

import type {GraphRange} from "../../perseus-types";
import type {SizeClass} from "../../util/sizing-utils";
import type {vec} from "mafs";

interface GridProps {
    tickStep: vec.Vector2;
    gridStep: vec.Vector2;
    range: GraphRange;
    containerSizeClass: SizeClass;
    markings: "graph" | "grid" | "none";
    width: number;
    height: number;
    step: number[];
    labels: readonly string[];
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
    const xRange = useTransform(props.range[0]);
    const yRange = useTransform(props.range[1]);
    const xRange = useTransformVectorToPixel(props.range[0]);
    const yRange = useTransformVectorToPixel(props.range[1]);

    // The clip definition starts from the top left of the shape
    // so the below values make use of the minimum x and maximum y of the range
    const clipStartX = String(xRange[0][0]); // x min
    const clipStartY = String(yRange[0][1]); // y max

    // const xPadding = 67 * props.step[0]; // subtract from clip width
    // const yPadding = 67 * props.step[1]; // subtract from clup height
    // These were meant to multiply the number of pixels in a step by the step
    // value for each axis. This is to be able to remove the padding width and
    // height from the clipPath

    const clipWidth = props.width;
    const clipHeight = props.height;
    return props.markings === "none" ? null : (
        <>
            <clipPath id="myClip">
                <rect
                    x={clipStartX}
                    y={clipStartY}
                    width={clipWidth}
                    height={clipHeight}
                />
            </clipPath>
            <g clipPath={"url(#myClip)"}>
                <Coordinates.Cartesian
                    xAxis={axisOptions(props, 0)}
                    yAxis={axisOptions(props, 1)}
                />
                <AxisTicks range={props.range} tickStep={props.tickStep} />
                {props.markings === "graph" && <AxisArrows />}
            </g>
            {props.markings === "graph" && <AxisLabels labels={props.labels} />}
        </>
    );
};
