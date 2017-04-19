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

type SingleHighlightRendererProps = {
    // The DOMHighlight to render.
    highlight: DOMHighlight,

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

class SingleHighlightRenderer extends React.PureComponent {
    props: SingleHighlightRendererProps

    /**
     * Compute the set of rectangles that cover the highlighted content, with
     * coordinates relative to the offset parent. That way, we can use them
     * for CSS positioning.
     */
    _getRects() {
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
        //     case the user scrolls at unexpected times. Instead, if you need
        //     to cache something, you should cache the derived rectangles
        //     that this function returns, because those will be stable
        //     regardless of viewport scrolling.
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

    // TODO(mdr): Remove this once we have a "Remove Highlight" tooltip.
    _handleClick = () => {
        this.props.onClick(this.props.highlight.key);
    }

    render() {
        const rects = this._getRects();

        return <div className={css(styles.highlight)}>
            {rects.map((rect, index) =>
                <div
                    key={index}
                    className={css(styles.highlightRect)}
                    onClick={this._handleClick}
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

class HighlightsRenderer extends React.PureComponent {
    /* eslint-disable react/sort-comp */
    props: HighlightsRendererProps
    _container: ?HTMLElement = null
    /* eslint-enable react/sort-comp */

    componentDidMount() {
        // This component renders twice on mount; see `render` for details.
        this.forceUpdate();
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
                offsetParent={container.offsetParent}
                onClick={this.props.onRemoveHighlight}
            />
        );
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

    highlightRect: {
        background: "#4c00ff", // testPrepBlue
        position: "absolute",
    },
});


module.exports = HighlightsRenderer;
