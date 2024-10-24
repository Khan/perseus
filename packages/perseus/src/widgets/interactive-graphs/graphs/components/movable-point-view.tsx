import {color as WBColor} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import * as React from "react";
import {forwardRef} from "react";

import {X, Y} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {useTransformVectorsToPixels} from "../use-transform";

import type {CSSCursor} from "./css-cursor";
import type {vec} from "mafs";
import type {ForwardedRef} from "react";

type Props = {
    point: vec.Vector2;
    color?: string | undefined;
    dragging: boolean;
    showFocusRing: boolean;
    cursor?: CSSCursor | undefined;
    onClick?: () => unknown;
};

// The hitbox size of 48px by 48px is preserved from the legacy interactive
// graph.
const hitboxSizePx = 48;

// MovablePointView is a purely presentational component (i.e. it is a pure
// function with no state or effects) that renders the SVG for a movable point
// on an interactive graph.
export const MovablePointView = forwardRef(
    (props: Props, hitboxRef: ForwardedRef<SVGGElement>) => {
        const {range, markings, showTooltips} = useGraphConfig();
        const {
            point,
            color = WBColor.blue,
            dragging,
            cursor,
            showFocusRing,
            onClick = () => {},
        } = props;

        // WB Tooltip requires a color name for the background color.
        // Since the color in props is a hex value, a reverse lookup is needed.
        const wbColorName = (Object.entries(WBColor).find(
            ([_, value]) => value === color,
        )?.[0] ?? "blue") as keyof typeof WBColor;

        const pointClasses = classNames(
            "movable-point",
            dragging && "movable-point--dragging",
            showFocusRing && "movable-point--focus",
        );

        const [[x, y]] = useTransformVectorsToPixels(point);

        const [[xMin, xMax], [yMin, yMax]] = range;

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
                style={{"--movable-point-color": color, cursor} as any}
                data-testid="movable-point"
                onClick={onClick}
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
                        content={`(${point[X]}, ${point[Y]})`}
                        contentStyle={{color: "white"}}
                    >
                        {svgForPoint}
                    </Tooltip>
                ) : (
                    svgForPoint
                )}
            </>
        );
    },
);

// TODO(benchristel): Move this to a more central location if it's reused.
// Or install the library.
function classNames(...names: Array<string | false | null | undefined>): string {
    return names.filter(Boolean).join(" ")
}
