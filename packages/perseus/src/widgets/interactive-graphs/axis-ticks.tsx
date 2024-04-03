import * as React from "react";

import {useTransform} from "./graphs/use-transform";

import type {vec} from "mafs";

const tickSize = 10;

const tickStyle: React.CSSProperties = {
    stroke: "black",
    strokeWidth: 1,
};

const YGridTick = ({y}: {y: number}) => {
    const startingPoint: vec.Vector2 = [0, y];
    let [startPtPx] = useTransform(startingPoint);

    const endPtPx = [startPtPx[0] + tickSize / 2, startPtPx[1]];
    startPtPx = [startPtPx[0] - tickSize / 2, startPtPx[1]];

    return (
        <g className="y-axis-ticks" tabIndex={0} style={{} as any}>
            <line
                x1={startPtPx[0]}
                y1={startPtPx[1]}
                x2={endPtPx[0]}
                y2={endPtPx[1]}
                style={tickStyle}
            />
        </g>
    );
};

const XGridTick = ({x}: {x: number}) => {
    const startingPoint: vec.Vector2 = [x, 0];
    let [startPtPx] = useTransform(startingPoint);

    const endPtPx = [startPtPx[0], startPtPx[1] + tickSize / 2];
    startPtPx = [startPtPx[0], startPtPx[1] - tickSize / 2];

    return (
        <g className="x-axis-ticks" tabIndex={0} style={{} as any}>
            <line
                x1={startPtPx[0]}
                y1={startPtPx[1]}
                x2={endPtPx[0]}
                y2={endPtPx[1]}
                style={tickStyle}
            />
        </g>
    );
};

export function generateTickLocations(
    tickStep: number,
    min: number,
    max: number,
): number[] {
    const ticks: number[] = [];
    for (let i = 0 + tickStep; i < max; i += tickStep) {
        ticks.push(i);
    }
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
        <g className="axis-ticks" tabIndex={0} style={{} as any}>
            {yGridTicks.map((y) => {
                return <YGridTick y={y} key={`y-grid-tick-${y}`} />;
            })}
            {xGridTicks.map((x) => {
                return <XGridTick x={x} key={`x-grid-tick-${x}`} />;
            })}
        </g>
    );
};
