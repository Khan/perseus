// import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {useTransform} from "./graphs/use-transform";
import useGraphState from "./reducer/use-graph-state";

import type {GridProps} from "./grid";
import type {vec} from "mafs";

// import type {vec} from "mafs";

type Props = GridProps;

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

    return (
        <g className="axis-ticks" tabIndex={0} style={{} as any}>
            <YGridTick y={1} />
            <YGridTick y={2} />
            <YGridTick y={-1} />
        </g>
    );
};
