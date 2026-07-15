import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
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
    // Ref for the HTML hitbox that captures pointer/touch drags. See the
    // `foreignObject` note below for why the hitbox is HTML rather than SVG.
    hitboxDivRef?: React.Ref<HTMLDivElement>;
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
        hitboxDivRef,
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
            {/*
             * The drag hitbox is an HTML <div> inside a <foreignObject>, not an
             * SVG element. WebKit (Safari) does not reliably honor
             * `touch-action` on SVG, so an SVG hitbox with `touch-action: none`
             * lets a vertical point-drag scroll the page (the container is
             * `touch-action: pan-y` so page scroll can pass over the graph). An
             * HTML element's `touch-action` *is* honored, so the compositor
             * blocks scrolling the instant the touch lands on the point — no
             * first-frame race, no JS `preventDefault` fallback needed. Rendered
             * last so it sits on top and wins hit-testing; it's transparent so
             * the visuals above show through.
             *
             * UPSTREAM (Mafs): this HTML-hitbox technique, plus relaxing
             * `.MafsView { touch-action: none }` in mafs/core.css, is the fix to
             * contribute to Mafs' own `MovablePoint`/`useMovable` so any library
             * consumer gets scroll-over-graph with working drags. Perseus forked
             * these components, so the upstream change won't flow back here
             * automatically — keep the two in sync if/when the Mafs PR lands.
             */}
            <foreignObject
                x={x - hitboxSizePx / 2}
                y={y - hitboxSizePx / 2}
                width={hitboxSizePx}
                height={hitboxSizePx}
            >
                <div
                    ref={hitboxDivRef}
                    className="movable-point-hitbox"
                    style={{width: "100%", height: "100%", touchAction: "none"}}
                />
            </foreignObject>
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
                    contentStyle={{
                        color: semanticColor.core.foreground.knockout.default,
                    }}
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
