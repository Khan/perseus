import * as React from "react";

import {useTransformVectorToPixel} from "./graphs/use-transform";

import type {vec} from "mafs";

const tickSize = 10;

const tickStyle: React.CSSProperties = {
    stroke: "black",
    strokeWidth: 1,
};

const YGridTick = ({y}: {y: number}) => {
    const pointOnAxis: vec.Vector2 = [0, y];
    const [[xPosition, yPosition]] = useTransformVectorToPixel(pointOnAxis);

    return (
        <g className="y-axis-ticks">
            <line
                x1={xPosition - tickSize / 2}
                y1={yPosition}
                x2={xPosition + tickSize / 2}
                y2={yPosition}
                style={tickStyle}
            />
            {
                // TODO (LEMS-1891): Negative one is a special case as the labels can
                // overlap with the axis line. We should handle this case more gracefully.
            }
            {y !== -1 && (
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

const XGridTick = ({x}: {x: number}) => {
    const pointOnAxis: vec.Vector2 = [x, 0];
    const [[xPosition, yPosition]] = useTransformVectorToPixel(pointOnAxis);

    return (
        <g className="x-axis-ticks">
            <line
                x1={xPosition}
                y1={yPosition + tickSize / 2}
                x2={xPosition}
                y2={yPosition - tickSize / 2}
                style={tickStyle}
            />
            {
                // TODO (LEMS-1891): Negative one is a special case as the labels can
                // overlap with the axis line. We should handle this case more gracefully.
            }
            {x !== -1 && (
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
                return <YGridTick y={y} key={`y-grid-tick-${y}`} />;
            })}
            {xGridTicks.map((x) => {
                return <XGridTick x={x} key={`x-grid-tick-${x}`} />;
            })}
        </g>
    );
};
