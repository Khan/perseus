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
    // Hover is driven by the HTML hitbox (see useControlPoint), not CSS
    // `:hover`, because the hitbox sits on top of the SVG in a separate DOM
    // subtree and intercepts the pointer.
    hovered?: boolean;
    showFocusRing: boolean;
    cursor?: CSSCursor | undefined;
    onClick?: () => unknown;
};

// MovablePointView is a purely presentational component (i.e. it is a pure
// function with no state or effects) that renders the SVG for a movable point
// on an interactive graph. The drag hitbox is not here — it's an HTML element
// in the graph's hitbox overlay layer (see useControlPoint / HitboxLayerContext).
export const MovablePointView = forwardRef(function MovablePointViewWithRef(
    props: Props,
    hitboxRef: ForwardedRef<SVGGElement>,
) {
    const {markings, showTooltips, interactiveColor, snapStep} =
        useGraphConfig();
    const {
        point,
        dragging,
        focused,
        hovered,
        cursor,
        showFocusRing,
        onClick = () => {},
    } = props;

    const pointClasses = classNames(
        "movable-point",
        dragging && "movable-point--dragging",
        showFocusRing && "movable-point--focus",
        hovered && "movable-point--hover",
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
            // eslint-disable-next-line no-restricted-syntax
            style={{"--movable-point-color": interactiveColor, cursor} as any}
            data-testid="movable-point"
            onClick={onClick}
        >
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
                    variant="strong"
                    content={pointTooltipContent}
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
