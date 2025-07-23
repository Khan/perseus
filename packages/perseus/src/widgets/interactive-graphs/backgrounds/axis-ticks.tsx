import * as React from "react";

import {useTransformVectorsToPixels} from "../graphs/use-transform";
import {MAX, MIN, X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";

import {
    countSignificantDecimals,
    divideByAndShowPi,
    generateTickLocations,
    shouldShowLabel,
} from "./utils";

import type {Interval, vec} from "mafs";

// The size of the ticks and labels in pixels
const tickSize = 10;
const tickLabelSize = 14;

const YGridTick = ({
    y,
    range,
    tickStep,
    showPi,
}: {
    y: number;
    range: [Interval, Interval];
    tickStep: number;
    // Whether to show the tick label as a multiple of pi
    showPi: boolean;
}) => {
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
        range[X][MAX] <= 0 ? tickLabelSize * 1.5 : -tickLabelSize * 1.1;
    const xPositionText = xPosition + xAdjustment;
    const yPositionText = yPosition + tickLabelSize * 0.25; // Center the text vertically on the tick

    // If the graph displays both the y and x axis lines within the graph, we want
    // to hide the label at -1 on the y-axis to prevent overlap with the x-axis label
    const showLabel = shouldShowLabel(y, range, tickStep);
    const ySigfigs = countSignificantDecimals(tickStep);

    const yLabel = showPi ? divideByAndShowPi(y) : y.toFixed(ySigfigs);

    return (
        <g className="tick" aria-hidden={true}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="axis-tick" />
            {showLabel && (
                <text
                    className="axis-tick-label"
                    style={{fontSize: tickLabelSize}}
                    textAnchor={"end"}
                    x={xPositionText}
                    y={yPositionText}
                >
                    {yLabel}
                </text>
            )}
        </g>
    );
};

const XGridTick = ({
    x,
    range,
    tickStep,
    showPi,
}: {
    x: number;
    range: [Interval, Interval];
    tickStep: number;
    // Whether to show the tick label as a multiple of pi
    showPi: boolean;
}) => {
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
        range[Y][MAX] < 0 ? -tickLabelSize : tickLabelSize * 1.75;

    // Adjust the X position of the x-axis labels based on
    // whether the label is positive or negative, in order to
    // account for the width of the negative sign
    const xAdjustment = x < 0 ? -2 : 0;

    // Apply the adjustments to the x and y positions for the text
    const xPositionText = xPosition + xAdjustment;
    const yPositionText = yPosition + yAdjustment;

    const xSigfigs = countSignificantDecimals(tickStep);

    const xLabel = showPi ? divideByAndShowPi(x) : x.toFixed(xSigfigs);

    return (
        <g className="tick" aria-hidden={true}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="axis-tick" />
            {
                <text
                    className="axis-tick-label"
                    style={{fontSize: tickLabelSize}}
                    textAnchor="middle"
                    x={xPositionText}
                    y={yPositionText}
                >
                    {xLabel}
                </text>
            }
        </g>
    );
};

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
                            tickStep={tickStep[Y]}
                            // Show the tick labels as multiples of pi
                            // if the tick step is a multiple of pi.
                            showPi={tickStep[Y] % Math.PI === 0}
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
                            tickStep={tickStep[X]}
                            // Show the tick labels as multiples of pi
                            // if the tick step is a multiple of pi.
                            showPi={tickStep[X] % Math.PI === 0}
                        />
                    );
                })}
            </g>
        </g>
    );
};
