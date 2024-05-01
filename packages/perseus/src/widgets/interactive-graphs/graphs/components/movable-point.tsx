import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import * as React from "react";
import {ForwardedRef, forwardRef} from "react";

import useGraphConfig from "../../reducer/use-graph-config";
import {useTransformVectorsToPixels} from "../use-transform";

import type {vec} from "mafs";

type Props = {
    point: vec.Vector2;
    onMove?: (newPoint: vec.Vector2) => unknown; // FIXME: remove onMove
    color?: string;
    dragging?: boolean; // FIXME: make dragging required
};

// The hitbox size of 48px by 48px is preserved from the legacy interactive
// graph.
const hitboxSizePx = 48;

export const StyledMovablePoint = forwardRef((props: Props, hitboxRef: ForwardedRef<SVGGElement>) => {
    const {range, markings, showTooltips} = useGraphConfig();
    // FIXME: remove dragging default
    const {point, color = WBColor.blue, dragging = false} = props;

    // WB Tooltip requires a color name for the background color.
    // Since the color in props is a hex value, a reverse lookup is needed.
    const wbColorName = (Object.entries(WBColor).find(
        ([_, value]) => value === color,
    )?.[0] ?? "blue") as keyof typeof WBColor;

    const pointClasses = `movable-point ${dragging ? "movable-point--dragging" : ""}`;

    const [[x, y]] = useTransformVectorsToPixels(point);

    const [xMin, xMax] = range[0];
    const [yMin, yMax] = range[1];

    const [[verticalStartX]] = useTransformVectorsToPixels([xMin, 0]);
    const [[verticalEndX]] = useTransformVectorsToPixels([xMax, 0]);
    const [[_, horizontalStartY]] = useTransformVectorsToPixels([0, yMin]);
    const [[__, horizontalEndY]] = useTransformVectorsToPixels([0, yMax]);

    const showHairlines = dragging && markings !== "none";
    const hairlines = (
        <g>
            <line
                x1={verticalStartX}
                y1={y}
                x2={verticalEndX}
                y2={y}
                stroke={color}
            />
            <line
                x1={x}
                y1={horizontalStartY}
                x2={x}
                y2={horizontalEndY}
                stroke={color}
            />
        </g>
    );

    const svgForPoint = (
        <g
            ref={hitboxRef}
            className={pointClasses}
            tabIndex={0}
            style={{"--movable-point-color": color} as any}
            data-testid="movable-point"
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
                data-testid="movable-point__center"
            />
        </g>
    );

    return (
        <>
            {showHairlines && hairlines}

            {showTooltips ? (
                <Tooltip
                    autoUpdate={true}
                    backgroundColor={wbColorName}
                    content={`(${point[0]}, ${point[1]})`}
                    contentStyle={{color: "white"}}
                >
                    {svgForPoint}
                </Tooltip>
            ) : (
                svgForPoint
            )}
        </>
    );
});
