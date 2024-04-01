import {useTransformContext, vec} from "mafs";
import React from "react";

import useGraphState from "./reducer/use-graph-state";

type ArrowProps = {
    x: number;
    y: number;
    rotate: number;
};

function Arrow(props: ArrowProps) {
    const {userTransform, viewTransform} = useTransformContext();

    const point: vec.Vector2 = [props.x, props.y];
    const userTransformedPoint = vec.transform(point, userTransform);
    const viewTransformedPoint = vec.transform(
        userTransformedPoint,
        viewTransform,
    );

    return (
        <g
            transform={`translate(${viewTransformedPoint[0]} ${viewTransformedPoint[1]}) rotate(${props.rotate}) scale(1.25)`}
        >
            <g transform="translate(-1)">
                <path
                    d="M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4"
                    fill="none"
                />
            </g>
        </g>
    );
}

export default function AxisArrows() {
    const {state} = useGraphState();

    const range = state.range;
    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    return (
        <>
            <Arrow x={xMax} y={0} rotate={0} />
            <Arrow x={0} y={yMin} rotate={90} />
            <Arrow x={xMin} y={0} rotate={180} />
            <Arrow x={0} y={yMax} rotate={270} />
        </>
    );
}
