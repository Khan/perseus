import {Coordinates} from "mafs";
import * as React from "react";

import AxisArrows from "./axis-arrows";
import {AxisTicks} from "./axis-ticks";
import {useTransformVectorToPixel} from "./graphs/use-transform";
import useGraphConfig from "./reducer/use-graph-config";

import type {GraphRange} from "../../perseus-types";
import type {SizeClass} from "../../util/sizing-utils";
import type {vec} from "mafs";

interface GridProps {
    tickStep: vec.Vector2;
    gridStep: vec.Vector2;
    range: GraphRange;
    containerSizeClass: SizeClass;
    markings: "graph" | "grid" | "none";
    step: number[];
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
    const {width, height} = useGraphConfig();
    const xRange = useTransformVectorToPixel(props.range[0]);
    const yRange = useTransformVectorToPixel(props.range[1]);

    // The clip definition starts from the top left of the shape
    // so the below values make use of the minimum x and maximum y of the range
    const clipStartX = String(xRange[0][0]); // x min
    const clipStartY = String(yRange[0][1]); // y max

    const clipWidth = width;
    const clipHeight = height;
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
            </g>
            {
                // Only render the axis ticks and arrows if the markings are set to a full "graph"
                props.markings === "graph" && (
                    <>
                        <AxisTicks
                            range={props.range}
                            tickStep={props.tickStep}
                            gridStep={props.gridStep}
                        />
                        <AxisArrows />
                    </>
                )
            }
        </>
    );
};
