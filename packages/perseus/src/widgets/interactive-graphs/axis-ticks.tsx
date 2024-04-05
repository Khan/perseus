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

    // We want to make sure to use the llap command to ensure that the negative
    // sign is not included in the width of the label. This is important for
    // ensuring that the labels are correctly positioned.
    const labelString = y < 0 ? `\\llap{-}` + Math.abs(y) : y.toString();

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
                <foreignObject
                    height={20}
                    width={50}
                    x={xPosition - 20}
                    y={yPosition - 10}
                >
                    <TeX>{labelString}</TeX>
                </foreignObject>
            )}
        </g>
    );
};

const XGridTick = ({x}: {x: number}) => {
    const {TeX} = getDependencies();
    const pointOnAxis: vec.Vector2 = [x, 0];
    const [[xPosition, yPosition]] = useTransform(pointOnAxis);

    // We want to make sure to use the llap command to ensure that the negative
    // sign is not included in the width of the label. This is important for
    // ensuring that the labels are correctly positioned.
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
            {
                // TODO (LEMS-1891): Negative one is a special case as the labels can
                // overlap with the axis line. We should handle this case more gracefully.
            }
            {x !== -1 && (
                <foreignObject
                    height={20}
                    width={50}
                    x={xPosition - 8}
                    y={yPosition + 10}
                >
                    <TeX>{labelString}</TeX>
                </foreignObject>
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
