// @flow
/**
 * Render a set of highlights. See HighlightRenderer for more details about how
 * each highlight is rendered.
 */
const React = require("react");

const HighlightRenderer = require("./highlight-renderer.jsx");

import type {DOMHighlightSet, Position, ZIndexes} from "./types.js";

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
};

class HighlightSetRenderer extends React.Component {
    props: HighlightSetRendererProps
    state: HighlightSetRendererState = {
        mouseClientPosition: null,
    }

    componentDidMount() {
        this._updateEditListeners(false, this.props.editable);
    }

    componentWillReceiveProps(nextProps: HighlightSetRendererProps) {
        this._updateEditListeners(this.props.editable, nextProps.editable);
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

    render() {
        return <div>
            {Object.keys(this.props.highlights).map(key =>
                <HighlightRenderer
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
        </div>;
    }
}

module.exports = HighlightSetRenderer;
