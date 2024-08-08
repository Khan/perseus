import {usePaneContext} from "mafs";
import * as React from "react";

import {useTransformVectorsToPixels} from "../graphs/use-transform";
import {MAX, MIN, X, Y} from "../math";
import useGraphConfig from "../reducer/use-graph-config";

import type {GraphDimensions} from "../types";
import type {vec} from "mafs";

const tickSize = 10;

const tickStyle: React.CSSProperties = {
    stroke: "black",
    strokeWidth: 1,
};

const YGridTick = ({y, graphInfo}: {y: number; graphInfo: GraphDimensions}) => {
    let xPointOnAxis = 0;

    // If the graph is zoomed in, we want to make sure the ticks are still visible
    // even if they are outside the graph's range.
    if (graphInfo.range[X][MIN] > 0) {
        // If the graph is on the positive side of the x-axis, lock the ticks to the left side of the graph
        xPointOnAxis = graphInfo.range[X][MIN];
    }
    if (graphInfo.range[X][MAX] < 0) {
        // If the graph is on the negative side of the x-axis, lock the ticks to the right side of the graph
        xPointOnAxis = graphInfo.range[X][MAX];
    }

    const pointOnAxis: vec.Vector2 = [xPointOnAxis, y];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    // If the tick is on the edge of the graph's range, don't render it
    if (
        yPosition === -graphInfo.height ||
        yPosition === graphInfo.height + 20
    ) {
        return null;
    }

    // Position of the start of the tick
    const x1 = xPosition - tickSize / 2;
    const y1 = yPosition;

    // Position of the end of the tick
    const x2 = xPosition + tickSize / 2;
    const y2 = yPosition;

    // Adjust the y position of the x-axis labels based on
    // whether the x-axis is above, within, or below the graph
    const xAdjustment = xPosition >= graphInfo.width ? -10 : 25;
    const xPositionText = xPosition + xAdjustment;
    const yPositionText = yPosition + 3;

    return (
        <g className="y-axis-ticks">
            <line x1={x1} y1={y1} x2={x2} y2={y2} style={tickStyle} />
            {y !== -1 && (
                <text
                    height={20}
                    width={50}
                    textAnchor="end"
                    x={xPositionText}
                    y={yPositionText}
                >
                    {y.toString()}
                </text>
            )}
        </g>
    );
};

const XGridTick = ({x, graphInfo}: {x: number; graphInfo: GraphDimensions}) => {
    let yPointOnAxis = 0;
    // If the graph is zoomed in, we want to make sure the ticks are still visible
    // even if they are outside the graph's range.
    if (graphInfo.range[Y][MIN] > 0) {
        // If the graph is on the positive side of the y-axis, lock the ticks to the top of the graph
        yPointOnAxis = graphInfo.range[Y][MIN];
    }
    if (graphInfo.range[Y][MAX] < 0) {
        // If the graph is on the negative side of the x-axis, lock the ticks to the bottom of the graph
        yPointOnAxis = graphInfo.range[Y][MAX];
    }

    const pointOnAxis: vec.Vector2 = [x, yPointOnAxis];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    // If the tick is on the edge of the graph's range, don't render it
    if (xPosition === -graphInfo.width / 2 || xPosition === graphInfo.width) {
        return null;
    }

    // Position of the start of the tick
    const x1 = xPosition;
    const y1 = yPosition + tickSize / 2;

    // Position of the end of the tick
    const x2 = xPosition;
    const y2 = yPosition - tickSize / 2;

    // Adjust the y position of the x-axis labels based on
    // whether the x-axis is above, within, or below the graph
    const yAdjustment = yPosition >= graphInfo.height ? -10 : 20;
    const xPositionText = xPosition;
    const yPositionText = yPosition + yAdjustment;

    return (
        <g className="x-axis-ticks">
            <line x1={x1} y1={y1} x2={x2} y2={y2} style={tickStyle} />
            {
                <text
                    height={20}
                    width={50}
                    textAnchor="middle"
                    x={xPositionText}
                    y={yPositionText}
                >
                    {x.toString()}
                </text>
            }
        </g>
    );
};

export function generateTickLocations(
    tickStep: number,
    min: number,
    max: number,
): number[] {
    const ticks: number[] = [];

    // Add ticks in the positive direction
    for (let i = 0 + tickStep; i < max; i += tickStep) {
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
    const {tickStep, range, width, height} = useGraphConfig();

    const graphInfo = {
        range,
        width,
        height,
    };

    const [[xMin, xMax], [yMin, yMax]] = range;
    const [xTickStep, yTickStep] = tickStep;

    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);

    const cool = usePaneContext();

    return (
        <g className="axis-ticks">
            {yGridTicks.map((y) => {
                return (
                    <YGridTick
                        y={y}
                        key={`y-grid-tick-${y}`}
                        graphInfo={graphInfo}
                    />
                );
            })}
            {xGridTicks.map((x) => {
                return (
                    <XGridTick
                        x={x}
                        key={`x-grid-tick-${x}`}
                        graphInfo={graphInfo}
                    />
                );
            })}
        </g>
    );
};
