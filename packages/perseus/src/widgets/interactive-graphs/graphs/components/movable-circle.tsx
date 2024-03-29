import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import {vec, useMovable, Circle} from "mafs";
import {useRef} from "react";
import * as React from "react";

import {useTransform} from "../use-transform";

const defaultStroke = "var(--movable-line-stroke-color)";

export const MovableCircle = (props: {
    center: vec.Vector2;
    radius: number;
    onMove: (delta: vec.Vector2) => unknown;
    stroke?: string;
}) => {
    const {center, radius, onMove, stroke = defaultStroke} = props;
    const color = WBColor.blue;

    const circle = useRef<SVGGElement>(null);
    const {dragging} = useMovable({
        gestureTarget: circle,
        point: center,
        onMove: (newPoint) => {
            onMove(vec.sub(newPoint, center));
        },
        constrain: (p) => p,
    });

    const [[centerX, centerY]] = useTransform(center);

    return (
        <>
            <g
                ref={circle}
                tabIndex={0}
                className="movable-circle"
                style={{
                    cursor: dragging ? "grabbing" : "grab",
                    touchAction: "none",
                    outline: "none",
                }}
            >
                <circle
                    cx={centerX}
                    cy={centerY}
                    r="5"
                    style={{
                        stroke: color,
                        strokeWidth: 2,
                        fill: color,
                    }}
                />

                <Circle
                    center={center}
                    radius={radius}
                    color={color}
                    fillOpacity={0}
                />
            </g>
        </>
    );
};
