import * as React from "react";

import {useTransformVectorsToPixels} from "../graphs/use-transform";
import {MAX, MIN, X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";

import type {Interval, vec} from "mafs";

const tickSize = 10;
const tickLabelSize = 14;

const tickStyle: React.CSSProperties = {
    stroke: "black",
    strokeWidth: 1,
};

const YGridTick = ({y, range}: {y: number; range: [Interval, Interval]}) => {
    // If the graph requires out-of-bounds labels, we want to make sure to set the
    // coordinates to the edge of the visible range of the graph. Otherwise,
    // the ticks and labels would render outside of the clipping-mask.
    let xPointOnAxis = 0;
    if (range[X][MIN] > 0) {
        // If the graph is on the positive side of the x-axis, lock the ticks to the left side of the graph
        xPointOnAxis = range[X][MIN];
    }
    if (range[X][MAX] < 0) {
        // If the graph is on the negative side of the x-axis, lock the ticks to the right side of the graph
        xPointOnAxis = range[X][MAX];
    }

    // Convert the Vector2 coordinates to pixel coordinates
    const pointOnAxis: vec.Vector2 = [xPointOnAxis, y];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    // Position of the start of the tick
    const x1 = xPosition - tickSize / 2;
    const y1 = yPosition;

    // Position of the end of the tick
    const x2 = xPosition + tickSize / 2;
    const y2 = yPosition;

    // Adjust the y position of the x-axis labels based on
    // whether the x-axis is above, within, or below the graph
    const xAdjustment =
        range[X][MAX] <= 0 ? tickLabelSize * 1.5 : -tickLabelSize;
    const xPositionText = xPosition + xAdjustment;
    const yPositionText = yPosition + tickLabelSize * 0.25; // Center the text vertically on the tick

    // If the graph displays both the y and x axis lines within the graph, we want
    // to hide the label at -1 on the y-axis to prevent overlap with the x-axis label
    const showLabel = shouldShowLabel(y, range);

    return (
        <g className="tick">
            <line x1={x1} y1={y1} x2={x2} y2={y2} style={tickStyle} />
            {showLabel && (
                <text
                    height={20}
                    width={50}
                    style={{
                        fontSize: `${tickLabelSize}px`,
                        fontFamily: "Mafs-MJXTEX",
                    }}
                    textAnchor={"end"}
                    stroke="white"
                    strokeWidth={5}
                    paintOrder="stroke"
                    x={xPositionText}
                    y={yPositionText}
                >
                    {y.toString()}
                </text>
            )}
        </g>
    );
};

const XGridTick = ({x, range}: {x: number; range: [Interval, Interval]}) => {
    // If the graph requires out-of-bounds labels, we want to make sure to set the
    // coordinates to the edge of the visible range of the graph. Otherwise,
    // the ticks and labels would render outside of the clipping-mask.
    let yPointOnAxis = 0;
    if (range[Y][MIN] > 0) {
        // If the graph is on the positive side of the y-axis, lock the ticks to the top of the graph
        yPointOnAxis = range[Y][MIN];
    }
    if (range[Y][MAX] < 0) {
        // If the graph is on the negative side of the x-axis, lock the ticks to the bottom of the graph
        yPointOnAxis = range[Y][MAX];
    }

    // Convert the Vector2 coordinates to pixel coordinates
    const pointOnAxis: vec.Vector2 = [x, yPointOnAxis];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    // Position of the start of the tick
    const x1 = xPosition;
    const y1 = yPosition + tickSize / 2;

    // Position of the end of the tick
    const x2 = xPosition;
    const y2 = yPosition - tickSize / 2;

    // Adjust the Y position of the x-axis labels based on
    // whether the x-axis is above, within, or below the graph
    const yAdjustment =
        range[Y][MAX] < 0 ? -tickLabelSize : tickLabelSize * 1.5;

    // Adjust the X position of the x-axis labels based on
    // whether the label is positive or negative, in order to
    // account for the width of the negative sign
    const xAdjustment = x < 0 ? -2 : 0;

    // Apply the adjustments to the x and y positions for the text
    const xPositionText = xPosition + xAdjustment;
    const yPositionText = yPosition + yAdjustment;

    return (
        <g className="tick">
            <line x1={x1} y1={y1} x2={x2} y2={y2} style={tickStyle} />
            {
                <text
                    height={20}
                    width={50}
                    style={{
                        fontSize: `${tickLabelSize}px`,
                        fontFamily: "Mafs-MJXTEX",
                    }}
                    textAnchor="middle"
                    stroke="white"
                    strokeWidth={5}
                    paintOrder="stroke"
                    x={xPositionText}
                    y={yPositionText}
                >
                    {x.toString()}
                </text>
            }
        </g>
    );
};

// Determines whether to show the label for the given tick
// Currently, the only condition is to hide the label at -1
// on the y-axis when the x-axis is within the graph
const shouldShowLabel = (number: number, range: [Interval, Interval]) => {
    let showLabel = true;

    // If the x-axis is within the graph and the y-axis is at -1, hide the label
    if (range[X][MIN] < 0 && range[X][MAX] > -1 && number === -1) {
        showLabel = false;
    }

    return showLabel;
};

export function generateTickLocations(
    tickStep: number,
    min: number,
    max: number,
): number[] {
    const ticks: number[] = [];

    // Add ticks in the positive direction
    const start = Math.max(min, 0);
    for (let i = start + tickStep; i < max; i += tickStep) {
        ticks.push(i);
    }

    // Add ticks in the negative direction
    // Start at the first tick after 0 or the maximum value if it is negative
    let i = Math.min(max, 0) - tickStep;
    for (i; i > min; i -= tickStep) {
        ticks.push(i);
    }
    return ticks;
}

export const AxisTicks = () => {
    const {tickStep, range} = useGraphConfig();
    const [[xMin, xMax], [yMin, yMax]] = range;
    const [xTickStep, yTickStep] = tickStep;

    // Generate the tick locations & labels for the x and y axes
    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);

    return (
        <g className="axis-ticks" role="presentation">
            <g className="y-axis-ticks">
                {yGridTicks.map((y) => {
                    return (
                        <YGridTick
                            y={y}
                            key={`y-grid-tick-${y}`}
                            range={range}
                        />
                    );
                })}
            </g>
            <g className="x-axis-ticks">
                {xGridTicks.map((x) => {
                    return (
                        <XGridTick
                            x={x}
                            key={`x-grid-tick-${x}`}
                            range={range}
                        />
                    );
                })}
            </g>
        </g>
    );
};
