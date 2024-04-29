import * as React from "react";

import {useTransformVectorsToPixels} from "./graphs/use-transform";
import useGraphConfig from "./reducer/use-graph-config";

import type {vec} from "mafs";

const tickSize = 10;

const tickStyle: React.CSSProperties = {
    stroke: "black",
    strokeWidth: 1,
};

// We only want to show the initial negative tick labels (e.g. -1) on each
// axis if the tickStep > gridStep, to ensure that these labels do not overlap.
// e.g. If gridStep = 1 and tickStep = 2, there are 2 grid lines for every 1 tick,
// which allows enough room for both these tick labels to render.
export const showTickLabel = (
    gridStep: number,
    tickStep: number,
    label: number,
): boolean => {
    const showLabel = tickStep > gridStep ? true : label !== -tickStep;
    return showLabel;
};

const YGridTick = ({
    y,
    gridStep,
    tickStep,
    graphInfo,
}: {
    y: number;
    gridStep: number;
    tickStep: number;
    graphInfo: any; //STOPSHIP FIX LATER
}) => {
    let xPointOnAxis = 0;

    // If the graph is zoomed in, we want to make sure the ticks are still visible
    // even if they are outside the graph's range.
    if (graphInfo.range[0][0] > 0) {
        // If the graph is on the positive side of the x-axis, lock the ticks to the left side of the graph
        xPointOnAxis = graphInfo.range[0][0];
    }
    if (graphInfo.range[0][1] < 0) {
        // If the graph is on the negative side of the x-axis, lock the ticks to the right side of the graph
        xPointOnAxis = graphInfo.range[0][1];
    }

    const pointOnAxis: vec.Vector2 = [xPointOnAxis, y];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    // If the tick is on the edge of the graph's range, don't render it
    if (yPosition === -graphInfo.height || yPosition === graphInfo.height) {
        return null;
    }

    // Position of the start of the tick
    const x1 = xPosition - tickSize / 2;
    const y1 = yPosition;

    // Position of the end of the tick
    const x2 = xPosition + tickSize / 2;
    const y2 = yPosition;

    return (
        <g className="y-axis-ticks">
            <line x1={x1} y1={y1} x2={x2} y2={y2} style={tickStyle} />
        </g>
    );
};

const XGridTick = ({
    x,
    gridStep,
    tickStep,
    graphInfo,
}: {
    x: number;
    gridStep: number;
    tickStep: number;
    graphInfo: any; //STOPSHIP FIX LATER
}) => {
    let yPointOnAxis = 0;
    // If the graph is zoomed in, we want to make sure the ticks are still visible
    // even if they are outside the graph's range.
    if (graphInfo.range[1][0] > 0) {
        // If the graph is on the positive side of the x-axis, lock the ticks to the left side of the graph
        yPointOnAxis = graphInfo.range[1][0];
    }
    if (graphInfo.range[1][1] < 0) {
        // If the graph is on the negative side of the x-axis, lock the ticks to the right side of the graph
        yPointOnAxis = graphInfo.range[1][1];
    }

    const pointOnAxis: vec.Vector2 = [x, yPointOnAxis];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    // If the tick is on the edge of the graph's range, don't render it
    if (xPosition === -graphInfo.width || xPosition === graphInfo.width) {
        return null;
    }

    // Position of the start of the tick
    const x1 = xPosition;
    const y1 = yPosition + tickSize / 2;

    // Position of the end of the tick
    const x2 = xPosition;
    const y2 = yPosition - tickSize / 2;

    return (
        <g className="x-axis-ticks">
            <line x1={x1} y1={y1} x2={x2} y2={y2} style={tickStyle} />
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
    for (let i = 0 - tickStep; i > min; i -= tickStep) {
        ticks.push(i);
    }
    return ticks;
}

export const AxisTicks = () => {
    const {tickStep, range, gridStep, width, height} = useGraphConfig();

    const graphInfo = {
        range,
        width,
        height,
    };

    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    const yTickStep = tickStep[1];
    const xTickStep = tickStep[0];

    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);

    return (
        <g className="axis-ticks">
            {yGridTicks.map((y) => {
                return (
                    <YGridTick
                        y={y}
                        key={`y-grid-tick-${y}`}
                        gridStep={gridStep[0]}
                        tickStep={yTickStep}
                        graphInfo={graphInfo}
                    />
                );
            })}
            {xGridTicks.map((x) => {
                return (
                    <XGridTick
                        x={x}
                        key={`x-grid-tick-${x}`}
                        gridStep={gridStep[1]}
                        tickStep={xTickStep}
                        graphInfo={graphInfo}
                    />
                );
            })}
        </g>
    );
};
