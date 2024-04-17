import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import {useMovable} from "mafs";
import * as React from "react";
import {useRef} from "react";

import useGraphModel from "../../reducer/use-graph-model";
import {snap} from "../../utils";
import {useTransform} from "../use-transform";

import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    onMove: (newPoint: vec.Vector2) => unknown;
    color?: string;
};

// The hitbox size of 48px by 48px is preserved from the legacy interactive
// graph.
const hitboxSizePx = 48;

export const StyledMovablePoint = (props: Props) => {
    const {state} = useGraphModel();
    const hitboxRef = useRef<SVGCircleElement>(null);
    const {point, onMove, color = WBColor.blue} = props;

    const {dragging} = useMovable({
        gestureTarget: hitboxRef,
        point,
        onMove,
        constrain: (p) => snap(state.snapStep, p),
    });
    const pointClasses = `movable-point ${dragging ? "movable-point--dragging" : ""}`;

    const [[x, y]] = useTransform(point);

    const [xMin, xMax] = state.range[0];
    const [yMin, yMax] = state.range[1];

    const [[verticalStartX]] = useTransform([xMin, 0]);
    const [[verticalEndX]] = useTransform([xMax, 0]);
    const [[_, horizontalStartY]] = useTransform([0, yMin]);
    const [[__, horizontalEndY]] = useTransform([0, yMax]);

    const showHairlines = dragging && state.markings !== "none";

    return (
        <>
            {showHairlines && (
                <g>
                    <line
                        x1={verticalStartX}
                        y1={y}
                        x2={verticalEndX}
                        y2={y}
                        stroke={WBColor.green}
                    />
                    <line
                        x1={x}
                        y1={horizontalStartY}
                        x2={x}
                        y2={horizontalEndY}
                        stroke={WBColor.green}
                    />
                </g>
            )}

            <g
                ref={hitboxRef}
                className={pointClasses}
                tabIndex={0}
                style={{"--movable-point-color": color} as any}
                data-test-id="movable-point"
            >
                <circle
                    className="movable-point-hitbox"
                    r={hitboxSizePx / 2}
                    cx={x}
                    cy={y}
                />
                <circle className="movable-point-halo" cx={x} cy={y} />
                <circle className="movable-point-ring" cx={x} cy={y} />
                <circle className="movable-point-focus-outline" cx={x} cy={y} />
                <circle
                    className="movable-point-center"
                    cx={x}
                    cy={y}
                    style={{fill: color}}
                    data-test-id="movable-point__center"
                />
            </g>
        </>
    );
};
