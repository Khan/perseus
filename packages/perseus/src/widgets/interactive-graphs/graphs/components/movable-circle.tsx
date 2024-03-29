import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import {vec, useMovable, Circle} from "mafs";
import {useRef} from "react";
import * as React from "react";

import {useTransform} from "../use-transform";

export const MovableCircle = (props: {
    center: vec.Vector2;
    radius: number;
    onMove: (delta: vec.Vector2) => unknown;
    onResize: (proposedRadius: number) => unknown;
    stroke?: string;
}) => {
    const {onMove, onResize} = props;
    const {center, radius} = props;
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

    const radiusAdjustment = useRef<SVGAElement>(null);
    const radiusAdjustmentLocation: vec.Vector2 = [
        center[0] + radius,
        center[1],
    ];

    useMovable({
        gestureTarget: radiusAdjustment,
        point: radiusAdjustmentLocation,
        onMove: (newPoint) => {
            const delta = vec.sub(newPoint, center);
            const proposedRadius = delta[0] + delta[1];
            onResize(proposedRadius);
        },
        constrain: (p) => p,
    });

    const [[centerX, centerY]] = useTransform(center);
    const [[radiusAdjustmentX, radiusAdjustmentY]] = useTransform(
        radiusAdjustmentLocation,
    );

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
            <g
                ref={radiusAdjustment}
                tabIndex={0}
                className="movable-radius-adjustment"
                style={{
                    cursor: "ew-resize",
                    touchAction: "none",
                    outline: "none",
                }}
            >
                <circle
                    cx={radiusAdjustmentX}
                    cy={radiusAdjustmentY}
                    r="3"
                    style={{
                        stroke: color,
                        strokeWidth: 2,
                        fill: color,
                    }}
                />
            </g>
        </>
    );
};
