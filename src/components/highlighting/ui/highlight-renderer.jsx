// @flow
/**
 * This component, given a single DOMHighlight, draws highlight rectangles in
 * the same absolute position as the highlighted content, as computed via
 * `getClientRects`.
 *
 * TODO(mdr): Many things can affect the correct positioning of highlighting,
 *     and this component does not attempt to anticipate them. If we start
 *     using this highlighting library on content with a more dynamic layout,
 *     we should add a hook to allow the parent to `forceUpdate` the
 *     `HighlightRenderer`.
 */
const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const {getRelativePosition} = require("./util.js");

import type {DOMHighlight, Position, Rect, ZIndexes} from "./types.js";

type HighlightRendererProps = {
    // The DOMHighlight to render.
    highlight: DOMHighlight,

    // The mouse's current position, relative to the viewport.
    mouseClientPosition: ?Position,

    // This component's `offsetParent` element, which is the nearest ancestor
    // with `position: relative`. This will enable us to choose the correct
    // CSS coordinates to align highlights and tooltips with the target
    // content.
    offsetParent: Element,

    // When this highlight is clicked, it calls this callback with the given
    // DOMHighlight's key as a parameter.
    // TODO(mdr): Remove this once we have a "Remove Highlight" tooltip.
    onClick: (key: string) => mixed,

    // The z-indexes to use when rendering tooltips above content, and
    // highlights below content.
    zIndexes: ZIndexes,
};

type HighlightRendererState = {
    // The set of rectangles that cover this highlight's content, relative to
    // the offset parent. This cache is updated on mount and on changes to
    // the `highlight` and `offsetParent` props.
    cachedHighlightRects: Rect[],
};

class HighlightRenderer extends React.PureComponent {
    /* eslint-disable react/sort-comp */
    props: HighlightRendererProps
    state: HighlightRendererState = {cachedHighlightRects: []}
    /* eslint-enable react/sort-comp */

    componentDidMount() {
        // HACK(mdr): We use mousedown rather than click to prevent shift-click
        //     highlights from immediately removing themselves. A full click
        //     event listener be more appropriate if we were planning to ship
        //     this behavior, but:
        // TODO(mdr): When we move to an Add/Remove Highlight tooltip instead,
        //     remove this global click listener entirely.
        window.addEventListener("mousedown", this._handleGlobalClick);
    }

    componentWillUnmount() {
        // TODO(mdr): When we move to an Add/Remove Highlight tooltip instead,
        //     remove this global click listener entirely.
        window.removeEventListener("mousedown", this._handleGlobalClick);
    }

    componentWillReceiveProps(nextProps: HighlightRendererProps) {
        if (
            this.props.highlight !== nextProps.highlight ||
            this.props.offsetParent !== nextProps.offsetParent
        ) {
            this.setState({
                cachedHighlightRects: this._getRects(nextProps),
            });
        }
    }

    /**
     * Compute the set of rectangles that cover the highlighted content, with
     * coordinates relative to the offset parent. That way, we can use them
     * for CSS positioning.
     */
    _getRects(): Rect[] {
        const {highlight, offsetParent} = this.props;

        // Get the set of rectangles that covers the range, and the rectangle
        // that covers the offset parent.
        // NOTE(mdr): The rectangles returned by `getClientRects` and
        //     `getBoundingClientRect` are relative to the *viewport*, not the
        //     document.
        //
        //     This doesn't affect our computations, because the offset between
        //     two rectangles is the same, no matter what origin the coordinate
        //     system uses.
        //
        //     But it *does* mean it's unsafe to cache these rectangles, in
        //     case the user scrolls at unexpected times. Instead, we only
        //     cache the derived rectangles that this function returns, because
        //     those will be stable regardless of viewport scrolling.
        const domRects = highlight.range.getClientRects();
        const offsetParentRect = offsetParent.getBoundingClientRect();

        // Recompute the rectangle's coordinates to be relative to the offset
        // parent, instead of relative to the viewport.
        const rects = Array.prototype.map.call(domRects, domRect => ({
            ...getRelativePosition(domRect, offsetParentRect),
            width: domRect.width,
            height: domRect.height,
        }));

        return rects;
    }

    _handleGlobalClick = (e: MouseEvent) => {
        // TODO(mdr): When we move to an Add/Remove Highlight tooltip instead,
        //     remove this global click listener entirely.
        const mouseClientPosition = {
            left: e.clientX,
            top: e.clientY,
        };

        if (this._highlightIsHovered(mouseClientPosition)) {
            this.props.onClick(this.props.highlight.key);
        }
    }

    /**
     * Return whether the given mouse position (coordinates relative to the
     * viewport) is hovering over this highlight.
     */
    _highlightIsHovered(mouseClientPosition: ?Position): boolean {
        if (!mouseClientPosition) {
            return false;
        }

        const {offsetParent} = this.props;
        const {cachedHighlightRects} = this.state;

        // Convert the client-relative mouse coordinates to be relative to the
        // offset parent. That way, we can compare them to the cached highlight
        // rectangles.
        const offsetParentRect = offsetParent.getBoundingClientRect();
        const mouseOffsetPosition =
            getRelativePosition(mouseClientPosition, offsetParentRect);

        return cachedHighlightRects.some(rect =>
            this._rectIsHovered(rect, mouseOffsetPosition));
    }

    /**
     * Return whether the given mouse position (coordinates relative to this
     * component's offset parent) is hovering over the given rectangle
     * (coordinates also relative to this component's offset parent).
     */
    _rectIsHovered(rect: Rect, mouseOffsetPosition: Position): boolean {
        const positionWithinRect =
            getRelativePosition(mouseOffsetPosition, rect);

        return 0 <= positionWithinRect.left &&
            positionWithinRect.left < rect.width &&
            0 <= positionWithinRect.top &&
            positionWithinRect.top < rect.height;
    }

    render() {
        const highlightIsHovered =
            this._highlightIsHovered(this.props.mouseClientPosition);
        const rects = this.state.cachedHighlightRects;

        return <div
            className={css(
                styles.highlight,
                highlightIsHovered && styles.hoveredHighlight,
            )}
        >
            {rects.map((rect, index) =>
                <div
                    key={index}
                    className={css(styles.highlightRect)}
                    style={{
                        width: rect.width,
                        height: rect.height,
                        top: rect.top,
                        left: rect.left,
                        zIndex: this.props.zIndexes.belowContent,
                    }}
                />
            )}
        </div>;
    }
}

const styles = StyleSheet.create({
    // NOTE(mdr): A clever trick here! Instead of assigning the opacity to the
    //     individual rects, we assign it to the highlight. That way, if there
    //     are overlapping rects, the overlapping area is the same color as the
    //     rest of the highlighted area - whereas, if we had applied the
    //     opacity to each individual rect, the overlapping areas would be
    //     darker than the rest.
    //
    //     This especially matters because getClientRects sometimes returns
    //     duplicate rects for text nodes and their wrapper elements - but,
    //     this way, the overlap doesn't affect the visuals.
    highlight: {
        opacity: 0.4,

        // NOTE(mdr): IE and Edge don't apply a non-positioned parent's opacity
        //     to a positioned child. We therefore position the highlight to
        //     be in the top left corner of the offset parent, which won't
        //     disrupt calculations, but will lead to correct opacity behavior
        //     on IE.
        position: "absolute",
        left: 0,
        top: 0,
    },

    hoveredHighlight: {
        // TODO(mdr): Just to demonstrate hovering.
        opacity: 0.6,
    },

    highlightRect: {
        background: "#4c00ff", // testPrepBlue
        position: "absolute",
    },
});

module.exports = HighlightRenderer;
