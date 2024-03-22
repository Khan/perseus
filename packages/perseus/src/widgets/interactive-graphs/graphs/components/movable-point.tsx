import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import {useMovable} from "mafs";
import * as React from "react";
import {useRef} from "react";

import {TARGET_SIZE} from "../../utils";
import {useTransform} from "../use-transform";

import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    onMove: (newPoint: vec.Vector2) => unknown;
    color?: string;
};

export const StyledMovablePoint = (props: Props) => {
    const hitboxRef = useRef<SVGCircleElement>(null);
    const {point, onMove, color = WBColor.blue} = props;

    const {dragging} = useMovable({
        gestureTarget: hitboxRef,
        point,
        onMove,
        constrain: (p) => p,
    });

    const [[x, y]] = useTransform(point);

    return (
        <g
            ref={hitboxRef}
            className="movable-point"
            tabIndex={0}
            style={
                {
                    cursor: dragging ? "grabbing" : "grab",
                    touchAction: "none",
                    outline: "none",
                    "--movable-point-color": color,
                } as any
            }
        >
            {/* Radius of 22 creates 44x44 click/touch target: AAA WCAG compliant */}
            <circle
                className="movable-point-hitbox"
                r={TARGET_SIZE / 2}
                cx={x}
                cy={y}
            />
            <circle className="movable-point-halo" cx={x} cy={y} />
            <circle className="movable-point-ring" cx={x} cy={y} />
            <circle
                className="movable-point-center"
                cx={x}
                cy={y}
                style={{fill: color}}
            />
        </g>
    );
};
