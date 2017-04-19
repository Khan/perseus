// @flow
/**
 * This component, given a set of DOMHighlights, draws highlight rectangles in
 * the same absolute position as the highlighted content, as computed by the
 * range's `getClientRects` method.
 *
 * This file contains two tightly-coupled components:
 *   - `SingleHighlightRenderer`, which renders just one highlight.
 *   - `HighlightsRenderer`, which renders many highlights.
 *
 * `HighlightsRenderer` is exported, whereas `SingleHighlightRenderer` is local
 * to this file.
 *
 * TODO(mdr): Many things can affect the correct positioning of highlighting,
 *     and this component does not attempt to anticipate them. If we start
 *     using this highlighting library on content with a more dynamic layout,
 *     we should add a hook to allow the parent to `forceUpdate` the
 *     `HighlightsRenderer`.
 */
const React = require("react");
const {StyleSheet, css} = require("aphrodite");

import type {DOMHighlight} from "./types.js";

type Position = {
    left: number,
    top: number,
};

type Rect = Position & {
    width: number,
    height: number,
};

type SingleHighlightRendererProps = {
    // The DOMHighlight to render.
    highlight: DOMHighlight,

    // The mouse's current position, relative to the viewport.
    mouseClientPosition: ?Position,

    // This component's `offsetParent` element, which is the nearest ancestor
    // with `position: relative`. This will enable us to choose the correct
    // CSS coordinates to align this component with the target content.
    //
    // Provided by the parent as an optimization, since all
    // SingleHighlightRenderers will have the same `offsetParent`.
    offsetParent: Element,

    // When this highlight is clicked, it calls this callback with the given
    // DOMHighlight's key as a parameter.
    // TODO(mdr): Remove this once we have a "Remove Highlight" tooltip.
    onClick: (key: string) => mixed,
};

type SingleHighlightRendererState = {
    // The set of rectangles that cover this highlight's content, relative to
    // the offset parent. This cache is updated on mount and on changes to
    // the `highlight` and `offsetParent` props.
    cachedHighlightRects: Rect[],
};

class SingleHighlightRenderer extends React.PureComponent {
    /* eslint-disable react/sort-comp */
    props: SingleHighlightRendererProps
    state: SingleHighlightRendererState
    /* eslint-enable react/sort-comp */

    constructor(props: SingleHighlightRendererProps) {
        super(props);

        this.state = {cachedHighlightRects: this._getRects(props)};
    }

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

    componentWillReceiveProps(nextProps: SingleHighlightRendererProps) {
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
            width: domRect.width,
            height: domRect.height,
            left: domRect.left - offsetParentRect.left,
            top: domRect.top - offsetParentRect.top,
        }));

        return rects;
    }

    _handleGlobalClick = (e) => {
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
        const {offsetParent} = this.props;
        const {cachedHighlightRects} = this.state;

        if (!mouseClientPosition) {
            return false;
        }

        // Convert the client-relative mouse coordinates to be relative to the
        // offset parent. That way, we can compare them to the cached highlight
        // rectangles.
        const offsetParentRect = offsetParent.getBoundingClientRect();
        const mouseOffsetPosition = {
            left: mouseClientPosition.left - offsetParentRect.left,
            top: mouseClientPosition.top - offsetParentRect.top,
        };

        return cachedHighlightRects.some(rect =>
            this._rectIsHovered(rect, mouseOffsetPosition));
    }

    /**
     * Return whether the given mouse position (coordinates relative to this
     * component's offset parent) is hovering over the given rectangle
     * (coordinates also relative to this component's offset parent).
     */
    _rectIsHovered(rect: Rect, mouseOffsetPosition: Position): boolean {
        const PositionWithinRect = {
            left: mouseOffsetPosition.left - rect.left,
            top: mouseOffsetPosition.top - rect.top,
        };

        return 0 <= PositionWithinRect.left &&
            PositionWithinRect.left < rect.width &&
            0 <= PositionWithinRect.top &&
            PositionWithinRect.top < rect.height;
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
                    }}
                />
            )}
        </div>;
    }
}


type HighlightsRendererProps = {
    highlights: DOMHighlight[],
    onRemoveHighlight: (highlightKey: string) => mixed,
};

type HighlightsRendererState = {
    // The mouse's position relative to the viewport, as of the most recent
    // global `mousemove` event. Passed to each `SingleHighlightRenderer` that
    // this component renders.
    mouseClientPosition: ?Position,
};

class HighlightsRenderer extends React.PureComponent {
    /* eslint-disable react/sort-comp */
    props: HighlightsRendererProps
    state: HighlightsRendererState = {mouseClientPosition: null}
    _container: ?HTMLElement = null
    /* eslint-enable react/sort-comp */

    componentDidMount() {
        window.addEventListener("mousemove", this._handleMouseMove);

        // This component renders twice on mount; see `render` for details.
        this.forceUpdate();
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this._handleMouseMove);
    }

    /**
     * Render a `SingleHighlightRenderer` for each of the given highlights.
     *
     * Accepts `this._container` as an argument, to prove to Flow that this
     * function is only called when `this._container` is available.
     */
    renderHighlights(container: HTMLElement) {
        return this.props.highlights.map(highlight =>
            <SingleHighlightRenderer
                key={highlight.key}
                highlight={highlight}
                mouseClientPosition={this.state.mouseClientPosition}
                offsetParent={container.offsetParent}
                onClick={this.props.onRemoveHighlight}
            />
        );
    }

    /**
     * Update our state to track the mouse's new position.
     */
    _handleMouseMove = (e: MouseEvent) => {
        this.setState({
            mouseClientPosition: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    }

    render() {
        // When this component mounts, it actually renders twice: once on
        // mount, then immediately again after mount. (We test whether we've
        // mounted yet by testing our reference to `this._container`)
        if (!this._container) {
            // On mount, we just render the container, because we can't
            // actually know the correct position for the highlights until we
            // have a reference to the container element. This ref will be
            // assigned after mount, and before our second update.
            return <div
                ref={container => this._container = container}
            />;
        } else {
            // On the second render, and all subsequent updates, render the
            // container *and* the given highlights, now that we have enough
            // information to position them.
            return <div
                ref={container => this._container = container}
            >
                {this.renderHighlights(this._container)}
            </div>;
        }
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
    //     duplicate rects, and I don't know why - but, by doing this clever
    //     robustness trick, it doesn't matter!
    highlight: {
        opacity: 0.4,
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


module.exports = HighlightsRenderer;
