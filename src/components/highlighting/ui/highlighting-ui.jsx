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
    // A function that builds a DOMHighlight from the given DOMRange, if
    // possible. If it would not currently be valid to add a highlight over the
    // given DOMRange, returns null.
    buildHighlight: (range: DOMRange) => ?DOMHighlight,

    // Whether the highlights are user-editable. If false, highlights are
    // read-only.
    editable: boolean,

    // A set of highlights to render.
    highlights: DOMHighlight[],

    // This component's `offsetParent` element, which is the nearest ancestor
    // with `position: relative`. This will enable us to choose the correct
    // CSS coordinates to align highlights and tooltips with the target
    // content.
    offsetParent: Element,

    // A callback indicating that the user would like to add the given
    // highlight to the current set of highlights.
    onAddHighlight: (range: DOMHighlight) => mixed,

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
        const willListen = this._shouldListenToMouseMove(this.props);
        this._updateMouseMoveListener(false, willListen);
    }

    componentWillReceiveProps(nextProps: HighlightingUIProps) {
        const wasListening = this._shouldListenToMouseMove(this.props);
        const willListen = this._shouldListenToMouseMove(nextProps);
        this._updateMouseMoveListener(wasListening, willListen);
    }

    componentWillUnmount() {
        const wasListening = this._shouldListenToMouseMove(this.props);
        this._updateMouseMoveListener(wasListening, false);
    }

    _handleMouseMove = (e: MouseEvent) => {
        this.setState({
            mouseClientPosition: {
                left: e.clientX,
                top: e.clientY,
            },
        });
    }

    _shouldListenToMouseMove(props: HighlightingUIProps): boolean {
        // NOTE(mdr): As an optimization, we only listen to mousemove events in
        //     editable mode, because hover events on highlights only affect
        //     the "Remove highlight" tooltip. If our design needs change, this
        //     behavior may need to change, too.
        return props.editable;
    }

    /**
     * Given whether we were previously listening to mousemove events, and
     * whether we will now listen to mousemove events, add or remove the
     * listener accordingly.
     */
    _updateMouseMoveListener(wasListening: boolean, willListen: boolean) {
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

    render() {
        return <div>
            {this.props.highlights.map(highlight =>
                <HighlightRenderer
                    editable={this.props.editable}
                    key={highlight.key}
                    highlight={highlight}
                    mouseClientPosition={this.state.mouseClientPosition}
                    offsetParent={this.props.offsetParent}
                    onRemoveHighlight={this.props.onRemoveHighlight}
                    zIndexes={this.props.zIndexes}
                />
            )}
            {this.props.editable && <SelectionTracker
                buildHighlight={this.props.buildHighlight}
                offsetParent={this.props.offsetParent}
                onAddHighlight={this.props.onAddHighlight}
                zIndexes={this.props.zIndexes}
            />}
        </div>;
    }
}

module.exports = HighlightingUI;
