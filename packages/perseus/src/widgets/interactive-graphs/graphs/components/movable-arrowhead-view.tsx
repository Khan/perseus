import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import * as React from "react";
import {forwardRef} from "react";

import {pathBuilder} from "../../../../util/svg";
import {countSignificantDecimals} from "../../backgrounds/utils";
import {X, Y} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {useTransformVectorsToPixels} from "../use-transform";

import type {CSSCursor} from "./css-cursor";
import type {vec} from "mafs";
import type {ForwardedRef} from "react";

type Props = {
    point: vec.Vector2;
    angle: number; // degrees counterclockwise from the positive x-axis
    dragging: boolean;
    focused: boolean;
    showFocusRing: boolean;
    cursor?: CSSCursor | undefined;
    onClick?: () => unknown;
};

// The hitbox size of 48px by 48px matches the movable point.
const hitboxSizePx = 48;

// Straight-line chevron arrowhead: two lines meeting at the tip.
// Wings at (-5, ±5) give exactly 45° per side (90° total opening).
// Tip at (0, 0) so it sits at the actual graph coordinate.
// The 1.5x scale converts from the design grid to pixel size.
const ARROW_SCALE = 1.5;
const arrowPath = pathBuilder()
    .move(-5, 5)
    .line(0, 0)
    .line(-5, -5)
    .scale(ARROW_SCALE)
    .build();

// Focus outline: a rounded triangle enclosing the arrowhead.
// Each corner has an explicit arc (R=3 at back, R=4 at tip).
// Coordinates are in unscaled space (before the 1.5x scale).
const arrowPathFocus = pathBuilder()
    .move(3.5, 3) // top of rounded tip
    .line(-4.5, 9) // top arm
    .circularArc(3, -8.5, 7, {sweep: true}) // rounded back-top corner
    .line(-8.5, -7) // straight back
    .circularArc(3, -4.5, -9, {sweep: true}) // rounded back-bottom corner
    .line(3.5, -3) // bottom arm
    .circularArc(4, 3.5, 3, {sweep: true}) // rounded tip
    .scale(ARROW_SCALE)
    .build();

// Shared SVG attributes for the main arrowhead path layers
// (centre, ring, halo — all use the same chevron path).
const pathAttrs = {
    d: arrowPath,
    fill: "none",
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
};

// MovableArrowheadView is a presentational component that renders the SVG
// for a draggable arrowhead.  The centre chevron, white ring, and halo are
// the same path at increasing stroke widths.  The focus outline is a
// separate rounded-triangle path that encloses the arrowhead.
export const MovableArrowheadView = forwardRef(
    function MovableArrowheadViewWithRef(
        props: Props,
        hitboxRef: ForwardedRef<SVGGElement>,
    ) {
        const {
            showTooltips,
            interactiveColor,
            disableKeyboardInteraction,
            snapStep,
        } = useGraphConfig();
        const {
            point,
            angle,
            dragging,
            cursor,
            showFocusRing,
            onClick = () => {},
        } = props;

        const wbColorName = disableKeyboardInteraction
            ? "fadedOffBlack64"
            : "blue";

        const classes = classNames(
            "movable-arrowhead",
            dragging && "movable-arrowhead--dragging",
            showFocusRing && "movable-arrowhead--focus",
        );

        const [[x, y]] = useTransformVectorsToPixels(point);

        const xSigFigs = countSignificantDecimals(snapStep[X]);
        const ySigFigs = countSignificantDecimals(snapStep[Y]);
        const xTickLabel = point[X].toFixed(xSigFigs);
        const yTickLabel = point[Y].toFixed(ySigFigs);
        const tooltipContent = `(${xTickLabel}, ${yTickLabel})`;

        const svgForArrowhead = (
            <g
                aria-hidden={true}
                ref={hitboxRef}
                className={classes}
                style={
                    {
                        "--movable-arrowhead-color": interactiveColor,
                        cursor,
                    } as React.CSSProperties
                }
                data-testid="movable-arrowhead"
                onClick={onClick}
            >
                {/* Transparent circular hit target (48 × 48 px) */}
                <circle
                    className="movable-arrowhead-hitbox"
                    r={hitboxSizePx / 2}
                    cx={x}
                    cy={y}
                />

                {/* All path layers share the same rotation / position.
                    The inner translate(-3) nudges the chevron behind
                    the graph coordinate so the tip doesn't overshoot
                    the point. */}
                <g transform={`translate(${x} ${y}) rotate(${angle})`}>
                    <g transform="translate(-3)">
                        {/* Focus outline — expands on hover via CSS scale */}
                        <path
                            d={arrowPathFocus}
                            fill="none"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            className="movable-arrowhead-focus-outline"
                        />
                        {/* Halo — semi-transparent colour with drop-shadow */}
                        <path
                            {...pathAttrs}
                            className="movable-arrowhead-halo"
                        />
                        {/* Ring — white background */}
                        <path
                            {...pathAttrs}
                            className="movable-arrowhead-ring"
                        />
                        {/* Centre — the visible arrowhead stroke */}
                        <path
                            {...pathAttrs}
                            className="movable-arrowhead-center"
                        />
                    </g>
                </g>
            </g>
        );

        return (
            <>
                {showTooltips ? (
                    <Tooltip
                        autoUpdate={true}
                        opened={true}
                        backgroundColor={wbColorName}
                        content={tooltipContent}
                        contentStyle={{color: "white"}}
                    >
                        {svgForArrowhead}
                    </Tooltip>
                ) : (
                    svgForArrowhead
                )}
            </>
        );
    },
);

function classNames(
    ...names: Array<string | false | null | undefined>
): string {
    return names.filter(Boolean).join(" ");
}
