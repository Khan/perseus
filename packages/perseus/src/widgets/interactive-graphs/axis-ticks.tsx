// import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {useTransform} from "./graphs/use-transform";

import type {vec} from "mafs";

// import type {vec} from "mafs";

type Props = {
    tickStep: [number, number];
    range: [[number, number], [number, number]];
};

//      -
const YGridTick = ({y}: {y: number}) => {
    const tickSize = 0.3;
    const startingPoint: vec.Vector2 = [-tickSize, y];
    const endingPoint: vec.Vector2 = [tickSize, y];

    const [startPtPx, endPtPx] = useTransform(startingPoint, endingPoint);

    return (
        <g className="axis-ticks" tabIndex={0} style={{} as any}>
            <line
                x1={startPtPx[0]}
                y1={startPtPx[1]}
                x2={endPtPx[0]}
                y2={endPtPx[1]}
                style={{
                    stroke: "red",
                    strokeWidth: 2,
                }}
            />
        </g>
    );
};

export const AxisTicks = (props: Props) => {
    // from (0 + gridStep) to (max y - gridStep) stepping by gridstep

    // We want to loop through y grids and create one at each grid step + -
    const range = props.range;
    // const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    const yTickStep = props.tickStep[1];

    const yGridTicks: number[] = [];
    for (let i = 0 + yTickStep; i < yMax; i += yTickStep) {
        yGridTicks.push(i);
    }
    for (let i = 0 - yTickStep; i > yMin; i -= yTickStep) {
        yGridTicks.push(i);
    }

    console.log(yGridTicks);

    return (
        <g className="axis-ticks" tabIndex={0} style={{} as any}>
            {yGridTicks.map((y) => {
                return <YGridTick y={y} key={`y-grid-tick-${y}`} />;
            })}
        </g>
    );
};
