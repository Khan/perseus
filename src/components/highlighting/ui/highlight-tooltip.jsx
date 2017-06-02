// @flow
/**
 * A tooltip to point to the focus of a highlight.
 */
const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const {getRelativePosition} = require("./util.js");

import type {Position} from "./types.js";

type HighlightTooltipProps = {
    label: string,
    onClick: () => mixed,
    onMouseEnter?: ?(() => mixed),
    onMouseLeave?: ?(() => mixed),

    focusNode: Node,
    focusOffset: number,
    offsetParent: Element,
    zIndex: number,
};

class HighlightTooltip extends React.PureComponent {
    props: HighlightTooltipProps

    _getPosition(): Position {
        const {focusNode, focusOffset, offsetParent} = this.props;

        // Get a range of *just* the focus point of the selection.
        const focusRange = document.createRange();
        focusRange.setStart(focusNode, focusOffset);
        focusRange.setEnd(focusNode, focusOffset);

        // Then, get the bounding box of the collapsed range. This will be a
        // zero-width rectangle, but still have positioning information, which
        // we can use the position the tooltip.
        //
        // NOTE(mdr): If we used getClientBoundingRect here instead, Safari
        //     would return an unpositioned rect. But all tested browsers at
        //     time of writing (latest Chrome, Firefox, Safari) return at least
        //     one rectangle from getClientRects, and it's well-positioned.
        const focusRect = focusRange.getClientRects()[0];

        // Compute the desired position of the tooltip relative to the offset
        // parent.
        const offsetParentRect = offsetParent.getBoundingClientRect();
        const focusPosition =
            getRelativePosition(focusRect, offsetParentRect);

        return focusPosition;
    }

    render() {
        const position = this._getPosition();

        return <div
            className={css(styles.tooltip)}
            onClick={this.props.onClick}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
            style={{
                left: position.left,
                top: position.top,
                zIndex: this.props.zIndex,
            }}
        >
            <div className={css(styles.label)}>
                {this.props.label}
            </div>
            <div className={css(styles.arrow)} />
        </div>;
    }
}

const styles = StyleSheet.create({
    tooltip: {
        // Positioning.
        //
        // Position the tooltip's *center-bottom* point at the left/top
        // coordinates, instead of the tooltip's top-left point, by translating
        // left by half the tooltip's width and up by the tooltip's full
        // height.
        //
        // `left`, `top`, and `zIndex` are specified via the `style` attribute.
        position: "absolute",
        transform: "translate(-50%, -100%)",

        // Cursor interaction.
        cursor: "pointer",
        userSelect: "none",
    },

    label: {
        // Box appearance.
        background: "#314453",
        borderRadius: 2,
        boxShadow: "0 1px 4px 0 rgba(97, 101, 105, 0.42)",
        padding: "8px 11px",

        // Text appearance.
        color: "white",
        fontSize: 12,
        lineHeight: 1.5,
        textAlign: "center",
    },

    // A 12px-width, 6px-height downward-facing arrow.
    //
    // Implemented by creating a box whose only content is its top, left, and
    // right borders. The joints between two borders are a diagonal line, so
    // the arrow element renders divided into these three areas:
    //
    // +-------+
    // |\ top /|
    // | \   / |
    // |  \ /  |
    // |L  v  R|
    // +-------+
    //
    // Therefore, if we color the top border, and make the left and right
    // borders transparent, we end up with a triangle!
    //
    // https://css-tricks.com/snippets/css/css-triangle/
    arrow: {
        // Make the inner dimensions of the box 0x0, so that its only content
        // is its top, left, and right borders.
        height: 0,
        width: 0,

        // The sum of our left and right border widths will be the width of our
        // triangle, so set them to 6px + 6px = 12px.
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",

        // The top border height will be the height of our triangle, so set it
        // to 6px.
        borderTop: "6px solid #314453",

        // Center the arrow within the tooltip container.
        margin: "0 auto",
    },
});

module.exports = HighlightTooltip;
