import * as React from "react";

import {pathBuilder} from "../../../../util/svg";
import {useTransform} from "../use-transform";

type Props = {
    x: number;
    y: number;
    angle: number; // degrees counterclockwise from the positive x-axis
};

// We use the pathBuilder here to scale up the SVG path coordinates used
// elsewhere for arrowheads. We scale in the path itself instead of using a CSS
// transform because a transform would also scale up the stroke weight, and we
// don't want that.
const arrowPath = pathBuilder()
    .move(-3, 4)
    .curve(-2.75, 2.5, 0, 0.25, 0.75, 0)
    .curve(0, -0.25, -2.75, -2.5, -3, -4)
    .scale(1.4)
    .build();

export function Arrowhead(props: Props) {
    const [point] = useTransform([props.x, props.y]);

    return (
        <g
            transform={`translate(${point[0]} ${point[1]}) rotate(${-props.angle})`}
        >
            <g transform="translate(-1.5)">
                <path
                    d={arrowPath}
                    fill="none"
                    style={{stroke: "inherit"}}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </g>
        </g>
    );
}
