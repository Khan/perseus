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

// Builds a rounded triangle path used by the halo and focus outline.
// All coordinates are in unscaled design-grid space.
function buildRoundedTriangle(
    tipX: number,
    tipY: number,
    armX: number,
    armY: number,
    backX: number,
    backY: number,
    backR: number,
    tipR: number,
): string {
    return pathBuilder()
        .move(tipX, tipY)
        .line(armX, armY)
        .circularArc(backR, backX, backY, {sweep: true})
        .line(backX, -backY)
        .circularArc(backR, armX, -armY, {sweep: true})
        .line(tipX, -tipY)
        .circularArc(tipR, tipX, tipY, {sweep: true})
        .scale(ARROW_SCALE)
        .build();
}

// Halo: a filled rounded triangle that matches the outline of the
// closed chevron stroked at 15px with round joins.  The offset from
// the chevron is 5 unscaled units (half of 15px / ARROW_SCALE).
// On focus, a 2px stroke is added for the focus ring — matching the
// Figma SVG which uses fill + stroke on one path.
const arrowPathHalo = buildRoundedTriangle(
    2.8, 2.8, -2.2, 7.8, -9, 5, 4, 4,
);

// Shared SVG attributes for the chevron centre and ring paths.
const chevronPathAttrs = {
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
                        {/* Halo — filled rounded triangle.  On focus,
                            a 2px stroke is added for the focus ring. */}
                        <path
                            d={arrowPathHalo}
                            className="movable-arrowhead-halo"
                        />
                        {/* Ring — white stroke on the chevron */}
                        <path
                            {...chevronPathAttrs}
                            className="movable-arrowhead-ring"
                        />
                        {/* Centre — the visible arrowhead chevron stroke */}
                        <path
                            {...chevronPathAttrs}
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
