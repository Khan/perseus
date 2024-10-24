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
    focusBehavior: FocusBehaviorConfig;
    cursor?: CSSCursor | undefined;
    onClick?: () => unknown;
};

type FocusBehaviorConfig = ControlledFocusBehavior | UncontrolledFocusBehavior;

// FIXME: remove uncontrolled focus behavior
type ControlledFocusBehavior = {type: "controlled"; showFocusRing: boolean};
type UncontrolledFocusBehavior = {
    type: "uncontrolled";
    tabIndex: number;
    onFocusChange?: (event: React.FocusEvent, isFocused: boolean) => unknown;
};

// The hitbox size of 48px by 48px is preserved from the legacy interactive
// graph.
const hitboxSizePx = 48;

// MovablePointView is a purely presentational component (i.e. it is a pure
// function with no state or effects) that renders the SVG for a movable point
// on an interactive graph.
//
// It has two modes for managing tabbing / focus: "controlled" (where the caller
// manages the display of the focus ring, and the point itself cannot be
// focused) and "uncontrolled" (where the point is focusable, and the browser
// manages the focus state and styling). For context on why we did this, see
// the description of https://github.com/Khan/perseus/pull/1240
export const MovablePointView = forwardRef(
    (props: Props, hitboxRef: ForwardedRef<SVGGElement>) => {
        const {range, markings, showTooltips, disableKeyboardInteraction} =
            useGraphConfig();
        const {
            point,
            color = WBColor.blue,
            dragging,
            focusBehavior,
            cursor,
            onClick = () => {},
        } = props;

        // WB Tooltip requires a color name for the background color.
        // Since the color in props is a hex value, a reverse lookup is needed.
        const wbColorName = (Object.entries(WBColor).find(
            ([_, value]) => value === color,
        )?.[0] ?? "blue") as keyof typeof WBColor;

        const pointClasses = `movable-point ${dragging ? "movable-point--dragging" : ""} ${focusClass(focusBehavior)}`;

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
                tabIndex={
                    disableKeyboardInteraction ? -1 : tabIndex(focusBehavior)
                }
                onFocus={(event) => {
                    const callback = getOnFocusChangeCallback(focusBehavior);
                    callback && callback(event, true);
                }}
                onBlur={(event) => {
                    const callback = getOnFocusChangeCallback(focusBehavior);
                    callback && callback(event, false);
                }}
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

function focusClass(config: FocusBehaviorConfig) {
    if (config.type === "controlled" && config.showFocusRing) {
        return "movable-point--focus";
    }
    return "";
}

function tabIndex(config: FocusBehaviorConfig) {
    if (config.type === "uncontrolled") {
        return config.tabIndex;
    }
    return undefined;
}

function getOnFocusChangeCallback(config: FocusBehaviorConfig) {
    if (config.type === "uncontrolled") {
        return config.onFocusChange;
    }
    return () => {};
}
