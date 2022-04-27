// @flow
/**
 * This is TooltipArrow, part of NewTooltip.
 *
 * This component manages the visuals for the tooltip "arrow" UI element, which
 * is visually attached to the TooltipBubble, and points to the target element.
 *
 * This component and TooltipBubble both count as part of the tooltip, and
 * trigger mouse events like `onClick`, `onMouseEnter`, and `onMouseLeave`.
 */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {Errors} from "../../logging/log.js";
import {PerseusError} from "../../perseus-error.js";

import {
    arrowHeight,
    arrowWidth,
    dropShadowOpacity,
    dropShadowRadius,
    dropShadowXOffset,
    dropShadowYOffset,
} from "./style-constants.js";
import {getTooltipColors} from "./util.js";

import type {NewTooltipProps} from "./types.js";

type TooltipArrowProps = {|
    tooltipProps: {
        side: NewTooltipProps["side"],
        color: NewTooltipProps["color"],
        inverted: NewTooltipProps["inverted"],

        onClick?: NewTooltipProps["onClick"],
        onMouseEnter?: NewTooltipProps["onMouseEnter"],
        onMouseLeave?: NewTooltipProps["onMouseLeave"],
        ...
    },
|};

export default class TooltipArrow extends React.PureComponent<TooltipArrowProps> {
    render(): React.Element<"svg"> {
        const {onClick, onMouseEnter, onMouseLeave, side} =
            this.props.tooltipProps;
        const {backgroundColor} = getTooltipColors(this.props.tooltipProps);

        // Draw the three points of the arrow. Depending on the arrow's
        // direction (i.e., the tooltip's "side"), we choose different points,
        // and set our SVG's bounds differently.
        //
        // Note that `arrowWidth` and `arrowHeight` refer to the
        // downward-pointing arrow (i.e. side="top"). When the arrow points to
        // the left or right instead, the width/height are inverted.
        let points;
        let svgWidth;
        let svgHeight;
        if (side === "top") {
            points = [
                "0,0",
                `${arrowWidth / 2},${arrowHeight}`,
                `${arrowWidth},0`,
            ];
            svgWidth = arrowWidth;
            svgHeight = arrowHeight;
        } else if (side === "right") {
            points = [
                `${arrowHeight},0`,
                `0,${arrowWidth / 2}`,
                `${arrowHeight},${arrowWidth}`,
            ];
            svgWidth = arrowHeight;
            svgHeight = arrowWidth;
        } else if (side === "bottom") {
            points = [
                `0,${arrowHeight}`,
                `${arrowWidth / 2},0`,
                `${arrowWidth},${arrowHeight}`,
            ];
            svgWidth = arrowWidth;
            svgHeight = arrowHeight;
        } else if (side === "left") {
            points = [
                "0,0",
                `${arrowHeight},${arrowWidth / 2}`,
                `0,${arrowWidth}`,
            ];
            svgWidth = arrowHeight;
            svgHeight = arrowWidth;
        } else {
            throw new PerseusError(
                `unexpected side ${side}`,
                Errors.InvalidInput,
            );
        }

        // This SVG is copied from tooltip-package/tooltip.jsx - with some minor
        // modifications, because styling is handled differently.
        return (
            <svg
                width={svgWidth}
                height={svgHeight}
                className={css(styles.tooltipArrow)}
            >
                {/* Create an SVG filter that applies a blur to an element.
                 * We'll apply it to a dark shape outlining the tooltip, which
                 * will produce the overall effect of a drop-shadow.
                 *
                 * Also, scope its ID by side, so that tooltips with other
                 * "side" values don't end up using the wrong filter from
                 * elsewhere in the document. (The `height` value depends on
                 * which way the arrow is turned!)
                 *
                 * In general, it's not *great* that multiple tooltips of the
                 * same side will yield ID conflicts... but at least they'll
                 * be the same filter, so it doesn't matter which one we
                 * reference, so long as it's for the correct side. */}
                <filter id={`tooltip-dropshadow-${side}`} height="150%">
                    <feOffset
                        dx={dropShadowXOffset}
                        dy={dropShadowYOffset}
                        result="offsetblur"
                    />
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation={dropShadowRadius / 2}
                    />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope={dropShadowOpacity} />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Draw the background of the tooltip arrow. */}
                <polyline
                    fill={backgroundColor}
                    stroke={backgroundColor}
                    points={points.join(" ")}
                    // We attach our mouse event styles and handlers to this
                    // element, instead of the root SVG element. That way, our
                    // target area will only include the actual _arrow_ shape,
                    // rather than the entire bounding rectangle.
                    className={css(
                        onClick && styles.tooltipArrowShapeWithOnClick,
                    )}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />

                {/* Draw an outline around the tooltip arrow, and apply the
                 * blur filter we created above, to produce a drop shadow
                 * effect. */}
                <polyline
                    // Redraw the stroke on top of the background color,
                    // so that the ends aren't extra dark where they meet
                    // the border of the tooltip.
                    fill={backgroundColor}
                    points={points.join(" ")}
                    stroke="rgba(0, 0, 0, 0.1)"
                    filter={`url(#tooltip-dropshadow-${side})`}
                />
            </svg>
        );
    }
}

const styles = StyleSheet.create({
    tooltipArrow: {
        display: "block",

        // Ensure that clicking on the tooltip's empty space doesn't clear the
        // user's text selection elsewhere in the page.
        userSelect: "none",
    },

    tooltipArrowShapeWithOnClick: {
        pointerEvents: "auto",
        cursor: "pointer",
    },
});
