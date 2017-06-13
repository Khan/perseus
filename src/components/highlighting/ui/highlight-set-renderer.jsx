// @flow
/**
 * Render a set of highlights. See HighlightRenderer for more details about how
 * each highlight is rendered.
 *
 * This component manages the state of the "Remove highlight" tooltip. To
 * determine the currently-hovered highlight, it calls the `isHovered` method
 * on each HighlightRenderer.
 */
const React = require("react");

const HighlightRenderer = require("./highlight-renderer.jsx");
const HighlightTooltip = require("./highlight-tooltip.jsx");

import type {DOMHighlightSet, Position, ZIndexes} from "./types.js";

/* global i18n */

type HighlightSetRendererProps = {
    // Whether the highlights are user-editable. If false, highlights are
    // read-only.
    editable: boolean,

    // A set of highlights to render.
    highlights: DOMHighlightSet,

    // This component's `offsetParent` element, which is the nearest ancestor
    // with `position: relative`. This will enable us to choose the correct
    // CSS coordinates to align highlights and tooltips with the target
    // content.
    offsetParent: Element,

    // A callback indicating that the user would like to remove the highlight
    // with the given key.
    onRemoveHighlight: (highlightKey: string) => mixed,

    // The z-indexes to use when rendering tooltips above content, and
    // highlights below content.
    zIndexes: ZIndexes,
};
type HighlightSetRendererState = {
    // The mouse's position relative to the viewport, as of the most recent
    // global `mousemove` event. Passed to each `SingleHighlightRenderer` that
    // this component renders.
    mouseClientPosition: ?Position,

    // If the user is currently hovering over the "Remove highlight" tooltip,
    // this field contains the key of the corresponding highlight.
    hoveringTooltipFor: ?string,
};

class HighlightSetRenderer extends React.PureComponent {
    props: HighlightSetRendererProps
    state: HighlightSetRendererState = {
        mouseClientPosition: null,
        hoveringTooltipFor: null,
    }

    // eslint-disable-next-line react/sort-comp
    _highlightRenderers: {[highlightKey: string]: HighlightRenderer} = {}

    componentDidMount() {
        this._updateEditListeners(false, this.props.editable);
    }

    componentWillReceiveProps(nextProps: HighlightSetRendererProps) {
        this._updateEditListeners(this.props.editable, nextProps.editable);

        // If we were previously hovering over the tooltip for a highlight that
        // has since been removed, reset the hover state accordingly.
        if (
            typeof this.state.hoveringTooltipFor === "string" &&
            !(this.state.hoveringTooltipFor in nextProps.highlights)
        ) {
            this.setState({hoveringTooltipFor: null});
        }
    }

    componentWillUnmount() {
        this._updateEditListeners(this.props.editable, false);
    }

    /**
     * Given whether we were previously listening to mousemove events, and
     * whether we will now listen to mousemove events, add or remove the
     * listener accordingly.
     */
    _updateEditListeners(wasListening: boolean, willListen: boolean) {
        if (!wasListening && willListen) {
            window.addEventListener("mousemove", this._handleMouseMove);
        } else if (wasListening && !willListen) {
            window.removeEventListener("mousemove", this._handleMouseMove);

            // Additionally, reset the mouse position. Our child components
            // won't be checking `mouseClientPosition` when we're not
            // listening, anyway, but this guards against errors where we
            // re-enter listening mode and have stale coordinates stored in
            // state.
            this.setState({
                mouseClientPosition: null,
            });
        }
    }

    _handleMouseMove = (e: MouseEvent) => {
        this.setState({
            mouseClientPosition: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    }

    _getHoveredHighlightKey(): ?string {
        // If we're hovering over the tooltip, the hovered highlight is the
        // highlight that the tooltip is pointing to.
        const {hoveringTooltipFor} = this.state;
        if (typeof hoveringTooltipFor === "string") {
            return hoveringTooltipFor;
        }

        // Otherwise, check each highlight renderer to see whether the current
        // mouse position intersects any of the highlight rectangles.
        const highlightKeys = Object.keys(this.props.highlights);
        return highlightKeys.find(key => {
            const highlightRenderer = this._highlightRenderers[key];
            return highlightRenderer &&
                highlightRenderer.isHovered(this.state.mouseClientPosition);
        });
    }

    _renderTooltip() {
        const hoveredHighlightKey = this._getHoveredHighlightKey();
        if (typeof hoveredHighlightKey !== "string") {
            return null;
        }

        const hoveredHighlight = this.props.highlights[hoveredHighlightKey];

        return <HighlightTooltip
            label={i18n._("Remove highlight")}

            focusNode={hoveredHighlight.domRange.endContainer}
            focusOffset={hoveredHighlight.domRange.endOffset}
            offsetParent={this.props.offsetParent}
            zIndex={this.props.zIndexes.aboveContent}

            onClick={
                () => this.props.onRemoveHighlight(hoveredHighlightKey)}
            onMouseEnter={
                () => this.setState({hoveringTooltipFor: hoveredHighlightKey})}
            onMouseLeave={
                () => this.setState({hoveringTooltipFor: null})}
        />;
    }

    render() {
        return <div>
            {Object.keys(this.props.highlights).map(key =>
                <HighlightRenderer
                    ref={r => {
                        if (r) {
                            this._highlightRenderers[key] = r;
                        } else {
                            delete this._highlightRenderers[key];
                        }
                    }}
                    editable={this.props.editable}
                    key={key}
                    highlight={this.props.highlights[key]}
                    highlightKey={key}
                    mouseClientPosition={this.state.mouseClientPosition}
                    offsetParent={this.props.offsetParent}
                    onRemoveHighlight={this.props.onRemoveHighlight}
                    zIndexes={this.props.zIndexes}
                />
            )}
            {this.props.editable && this._renderTooltip()}
        </div>;
    }
}

module.exports = HighlightSetRenderer;
