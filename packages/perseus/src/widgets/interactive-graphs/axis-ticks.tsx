import * as React from "react";

import {useTransformVectorsToPixels} from "./graphs/use-transform";

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
}: {
    y: number;
    gridStep: number;
    tickStep: number;
}) => {
    const pointOnAxis: vec.Vector2 = [0, y];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    return (
        <g className="y-axis-ticks">
            <line
                x1={xPosition - tickSize / 2}
                y1={yPosition}
                x2={xPosition + tickSize / 2}
                y2={yPosition}
                style={tickStyle}
            />
            {showTickLabel(gridStep, tickStep, y) && (
                <text
                    height={20}
                    width={50}
                    textAnchor="end"
                    x={xPosition - 10}
                    y={yPosition + 5}
                >
                    {y.toString()}
                </text>
            )}
        </g>
    );
};

const XGridTick = ({
    x,
    gridStep,
    tickStep,
}: {
    x: number;
    gridStep: number;
    tickStep: number;
}) => {
    const pointOnAxis: vec.Vector2 = [x, 0];
    const [[xPosition, yPosition]] = useTransformVectorsToPixels(pointOnAxis);

    return (
        <g className="x-axis-ticks">
            <line
                x1={xPosition}
                y1={yPosition + tickSize / 2}
                x2={xPosition}
                y2={yPosition - tickSize / 2}
                style={tickStyle}
            />
            {showTickLabel(gridStep, tickStep, x) && (
                <text
                    height={20}
                    width={50}
                    textAnchor="middle"
                    x={xPosition}
                    y={yPosition + 25}
                >
                    {x.toString()}
                </text>
            )}
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

type Props = {
    tickStep: [number, number];
    range: [[number, number], [number, number]];
    gridStep: [number, number];
};

export const AxisTicks = (props: Props) => {
    const range = props.range;

    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    const yTickStep = props.tickStep[1];
    const xTickStep = props.tickStep[0];

    const yGridTicks = generateTickLocations(yTickStep, yMin, yMax);
    const xGridTicks = generateTickLocations(xTickStep, xMin, xMax);

    return (
        <g className="axis-ticks">
            {yGridTicks.map((y) => {
                return (
                    <YGridTick
                        y={y}
                        key={`y-grid-tick-${y}`}
                        gridStep={props.gridStep[0]}
                        tickStep={yTickStep}
                    />
                );
            })}
            {xGridTicks.map((x) => {
                return (
                    <XGridTick
                        x={x}
                        key={`x-grid-tick-${x}`}
                        gridStep={props.gridStep[1]}
                        tickStep={xTickStep}
                    />
                );
            })}
        </g>
    );
};
