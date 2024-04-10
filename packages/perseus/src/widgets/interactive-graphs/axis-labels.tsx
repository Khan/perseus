import React from "react";

import {useTransform} from "./graphs/use-transform";
import useGraphState from "./reducer/use-graph-state";

import type {vec} from "mafs";

export default function AxisLabels(props) {
    const {state} = useGraphState();

    const point: vec.Vector2 = [0, state.range[1][1]];

    const [[x, y]] = useTransform(point);
    return (
        // Find the length of the label, divide in half, then move the x and y over by that much!
        // can do this with CSS with transform by moving it left 50%
        <text x={x - 5} y={y - 10}>
            Points
        </text>
    );
}
