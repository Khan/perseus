import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import * as React from "react";
import {forwardRef} from "react";

import {countSignificantDecimals} from "../../backgrounds/utils";
import {X, Y} from "../../math";
import useGraphConfig from "../../reducer/use-graph-config";
import {useTransformVectorsToPixels} from "../use-transform";

import Hairlines from "./hairlines";

import type {CSSCursor} from "./css-cursor";
import type {vec} from "mafs";
import type {ForwardedRef} from "react";

type Props = {
    point: vec.Vector2;
    dragging: boolean;
    focused: boolean;
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
export const MovablePointView = forwardRef(function MovablePointViewWithRef(
    props: Props,
    hitboxRef: ForwardedRef<SVGGElement>,
) {
    const {
        markings,
        showTooltips,
        interactiveColor,
        disableKeyboardInteraction,
        snapStep,
    } = useGraphConfig();
    const {
        point,
        dragging,
        focused,
        cursor,
        showFocusRing,
        onClick = () => {},
    } = props;

    // WB Tooltip requires a WB color name for the background color.
    // We use the blue color when the points are interactive, and
    // offBlack64 when they are disabled.
    // Note: The disabled point color is offBlack50 to contrast with
    // the interactive blue color, but the tooltip background has to be
    // darker to contrast with its white text - using offBlack64.
    const wbColorName = disableKeyboardInteraction
        ? "fadedOffBlack64" // not see-through
        : "blue";

    const pointClasses = classNames(
        "movable-point",
        dragging && "movable-point--dragging",
        showFocusRing && "movable-point--focus",
    );

    const [[x, y]] = useTransformVectorsToPixels(point);

    const showHairlines = (dragging || focused) && markings !== "none";

    // Due to floating point errors, we need to round the point to the
    // same number of significant digits as the relevant snap step.
    const xSigFigs = countSignificantDecimals(snapStep[X]);
    const ySigFigs = countSignificantDecimals(snapStep[Y]);
    const xTickLabel = point[X].toFixed(xSigFigs);
    const yTickLabel = point[Y].toFixed(ySigFigs);
    const pointTooltipContent = `(${xTickLabel}, ${yTickLabel})`;

    const svgForPoint = (
        <g
            // Use aria-hidden to hide the line from screen readers
            // so it doesn't read as "image" with no context.
            // The elements using this should have their own aria-labels,
            // so this is okay.
            aria-hidden={true}
            ref={hitboxRef}
            className={pointClasses}
            style={{"--movable-point-color": interactiveColor, cursor} as any}
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
                style={{fill: interactiveColor}}
                data-testid="movable-point__center"
            />
        </g>
    );

    return (
        <>
            {showHairlines && <Hairlines point={point} />}
            {showTooltips ? (
                <Tooltip
                    autoUpdate={true}
                    opened={true}
                    backgroundColor={wbColorName}
                    content={pointTooltipContent}
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

function classNames(
    ...names: Array<string | false | null | undefined>
): string {
    return names.filter(Boolean).join(" ");
}
