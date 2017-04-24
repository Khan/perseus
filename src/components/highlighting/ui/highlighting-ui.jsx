// @flow
/**
 * This component, given a set of DOMHighlights, draws highlight rectangles in
 * the same absolute position as the highlighted content, as computed by the
 * range's `getClientRects` method.
 *
 * TODO(mdr): Many things can affect the correct positioning of highlighting,
 *     and this component does not attempt to anticipate them. If we start
 *     using this highlighting library on content with a more dynamic layout,
 *     we should add a hook to allow the parent to `forceUpdate` the
 *     `HighlightingUI`.
 */
const React = require("react");

const HighlightRenderer = require("./highlight-renderer.jsx");
const SelectionTracker = require("./selection-tracker.jsx");

import type {DOMHighlight, DOMRange, Position, ZIndexes} from "./types.js";

type HighlightingUIProps = {
    // A set of highlights to render.
    highlights: DOMHighlight[],

    // This component's `offsetParent` element, which is the nearest ancestor
    // with `position: relative`. This will enable us to choose the correct
    // CSS coordinates to align highlights and tooltips with the target
    // content.
    offsetParent: Element,

    // A callback indicating that the user would like to add a highlight over
    // the given DOMRange.
    onAddHighlight: (range: DOMRange) => mixed,

    // A callback indicating that the user would like to remove the highlight
    // with the given key.
    onRemoveHighlight: (highlightKey: string) => mixed,

    // The z-indexes to use when rendering tooltips above content, and
    // highlights below content.
    zIndexes: ZIndexes,
};

type HighlightingUIState = {
    // The mouse's position relative to the viewport, as of the most recent
    // global `mousemove` event. Passed to each `SingleHighlightRenderer` that
    // this component renders.
    mouseClientPosition: ?Position,
};

class HighlightingUI extends React.PureComponent {
    /* eslint-disable react/sort-comp */
    props: HighlightingUIProps
    state: HighlightingUIState = {
        mouseClientPosition: null,
    }
    /* eslint-enable react/sort-comp */

    componentDidMount() {
        window.addEventListener("mousemove", this._handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this._handleMouseMove);
    }

    _handleMouseMove = (e: MouseEvent) => {
        this.setState({
            mouseClientPosition: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    }

    render() {
        return <div>
            {this.props.highlights.map(highlight =>
                <HighlightRenderer
                    key={highlight.key}
                    highlight={highlight}
                    mouseClientPosition={this.state.mouseClientPosition}
                    offsetParent={this.props.offsetParent}
                    onRemoveHighlight={this.props.onRemoveHighlight}
                    zIndexes={this.props.zIndexes}
                />
            )}
            <SelectionTracker
                offsetParent={this.props.offsetParent}
                onAddHighlight={this.props.onAddHighlight}
                zIndexes={this.props.zIndexes}
            />
        </div>;
    }
}


module.exports = HighlightingUI;
