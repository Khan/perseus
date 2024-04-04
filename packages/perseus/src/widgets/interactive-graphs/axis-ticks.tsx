import * as React from "react";

import "@khanacademy/mathjax-renderer/src/css/mathjax.css";
import "@khanacademy/mathjax-renderer/src/css/safari-hacks.css";
import {getDependencies} from "../../dependencies";

import {useTransform} from "./graphs/use-transform";

import type {vec} from "mafs";

const tickSize = 10;

const tickStyle: React.CSSProperties = {
    stroke: "black",
    strokeWidth: 1,
};

const YGridTick = ({y}: {y: number}) => {
    const {TeX} = getDependencies();
    const pointOnAxis: vec.Vector2 = [0, y];
    const [[xPosition, yPosition]] = useTransform(pointOnAxis);

    const labelString = y < 0 ? `\\llap{-}` + Math.abs(y) : y.toString();

    if (y === -1) {
        return (
            <g className="x-axis-ticks">
                <line
                    x1={startPtPx[0]}
                    y1={startPtPx[1]}
                    x2={endPtPx[0]}
                    y2={endPtPx[1]}
                    style={tickStyle}
                />
            </g>
        );
    }

    return (
        <g className="y-axis-ticks">
            <line
                x1={xPosition - tickSize / 2}
                y1={yPosition}
                x2={xPosition + tickSize / 2}
                y2={yPosition}
                style={tickStyle}
            />
            <foreignObject
                height={20}
                width={50}
                x={startPtPx[0] - 15}
                y={startPtPx[1] - 10}
            >
                <TeX>{labelString}</TeX>
            </foreignObject>
        </g>
    );
};

const XGridTick = ({x}: {x: number}) => {
    const {TeX} = getDependencies();
    const pointOnAxis: vec.Vector2 = [x, 0];
    const [[xPosition, yPosition]] = useTransform(pointOnAxis);

    if (x === -1) {
        return (
            <g className="x-axis-ticks">
                <line
                    x1={startPtPx[0]}
                    y1={startPtPx[1]}
                    x2={endPtPx[0]}
                    y2={endPtPx[1]}
                    style={tickStyle}
                />
            </g>
        );
    }

    const labelString = x < 0 ? `\\llap{-}` + Math.abs(x) : x.toString();

    return (
        <g className="x-axis-ticks">
            <line
                x1={xPosition}
                y1={yPosition + tickSize / 2}
                x2={xPosition}
                y2={yPosition - tickSize / 2}
                style={tickStyle}
            />
            <foreignObject
                height={20}
                width={50}
                x={startPtPx[0] - 8}
                y={startPtPx[1] + 10}
            >
                <TeX>{labelString}</TeX>
            </foreignObject>
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
