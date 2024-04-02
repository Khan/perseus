// import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {useTransform} from "./graphs/use-transform";

import type {vec} from "mafs";

// import type {vec} from "mafs";
// import useGraphState from "./reducer/use-graph-state";

type Props = any;

export const AxisTicks = (props: Props) => {
    const tickSize = 0.3;
    const startingPoint: vec.Vector2 = [-tickSize, 2];
    const endingPoint: vec.Vector2 = [tickSize, 2];

    const [startPtPx, endPtPx] = useTransform(startingPoint, endingPoint);

    // const {state} = useGraphState();

    // const range = state.range;
    // const [xMin, xMax] = range[0];
    // const [yMin, yMax] = range[1];

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
