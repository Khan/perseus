// @flow
/**
 * Tracks the user's current selection, and exposes it to the subtree using the
 * function-as-children pattern.
 */
const React = require("react");

import type {DOMHighlight, DOMRange} from "./types.js";

type TrackedSelection = {
    // The focus of the current selection - that is, the boundary point of the
    // selection that the user is dragging around.
    //
    // We don't simply track the full `Selection` object, which contains all of
    // this focus and range information and more, because the browser reuses
    // the global `Selection` object and mutates it, which breaks our
    // `shouldComponentUpdate` checks.
    focusNode: Node,
    focusOffset: number,

    // If the current selection maps to a valid new highlight, we cache the
    // highlight object here.
    proposedHighlight: DOMHighlight,
};

type SelectionTrackerProps = {
    // A function that builds a DOMHighlight from the given DOMRange, if
    // possible. If it would not currently be valid to add a highlight over the
    // given DOMRange, returns null.
    buildHighlight: (domRange: DOMRange) => ?DOMHighlight,

    // The function-as-children pattern: passes the tracked selection, and
    // whether the user is currently using their mouse to select, down the
    // tree.
    children?: (
        trackedSelection: ?TrackedSelection,
        userIsMouseSelecting: boolean,
    ) => React.Element<any>,

    // If false, will not track selections.
    enabled: boolean,
};

type SelectionTrackerState = {
    // The current state of the mouse button. We distinguish between down,
    // down and the selection has changed since going down, and up.
    mouseState: "down" | "down-and-selecting" | "up",

    // The current TrackedSelection, if any.
    trackedSelection: ?TrackedSelection,
};

class SelectionTracker extends React.PureComponent {
    props: SelectionTrackerProps
    state: SelectionTrackerState = {
        mouseState: "up",
        trackedSelection: null,
    }

    componentDidMount() {
        this._updateListeners(false, this.props.enabled);
    }

    componentWillReceiveProps(nextProps: SelectionTrackerProps) {
        if (this.props.buildHighlight !== nextProps.buildHighlight) {
            // The highlight-building function changed, so the
            // proposedHighlight we built with it might be different, or no
            // longer be valid. Update accordingly.
            this._updateTrackedSelection(nextProps.buildHighlight);
        }

        this._updateListeners(this.props.enabled, nextProps.enabled);
    }

    componentWillUnmount() {
        this._updateListeners(this.props.enabled, false);
    }

    _updateListeners(wasListening: boolean, willListen: boolean) {
        if (!wasListening && willListen) {
            window.addEventListener("mousedown", this._handleMouseDown);
            window.addEventListener("mouseup", this._handleMouseUp);
            document.addEventListener("selectionchange",
                this._handleSelectionChange);
        } else if (wasListening && !willListen) {
            window.removeEventListener("mousedown", this._handleMouseDown);
            window.removeEventListener("mouseup", this._handleMouseUp);
            document.removeEventListener("selectionchange",
                this._handleSelectionChange);

            // Additionally, reset the state, to guard against errors where we
            // re-enter listening mode and have stale values stored.
            this.setState({
                mouseState: "up",
                trackedSelection: null,
            });
        }
    }

    /**
     * Get the current selection focus and range, if present and non-collapsed.
     *
     * Otherwise, if there is no current selection or it's collapsed, return
     * null.
     */
    _computeFocusAndRange(
    ): ?{focusNode: Node, focusOffset: number, range: DOMRange} {
        const selection = document.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (!range.collapsed) {
                // NOTE(mdr): The focus node is guaranteed to exist, because
                //     there's a range, but the Flow type annotations for
                //     Selection don't know that. Cast it ourselves.
                const focusNode: Node = (selection.focusNode: any);
                const focusOffset = selection.focusOffset;
                return {focusNode, focusOffset, range};
            }
        }

        return null;
    }

    /**
     * Compute the current TrackedSelection from the document state.
     */
    _computeTrackedSelection(
        buildHighlight: (domRange: DOMRange) => ?DOMHighlight,
    ): ?TrackedSelection {
        const focusAndRange = this._computeFocusAndRange();
        if (!focusAndRange) {
            return null;
        }

        const {focusNode, focusOffset, range} = focusAndRange;
        const proposedHighlight = buildHighlight(range);
        if (!proposedHighlight) {
            return null;
        }

        return {focusNode, focusOffset, proposedHighlight};
    }

    /**
     * Update the TrackedSelection to reflect the document state.
     */
    _updateTrackedSelection(
        buildHighlight: (domRange: DOMRange) => ?DOMHighlight,
    ) {
        const trackedSelection = this._computeTrackedSelection(buildHighlight);
        this.setState({trackedSelection});
    }

    _handleSelectionChange = () => {
        this._updateTrackedSelection(this.props.buildHighlight);

        if (this.state.mouseState === "down") {
            this.setState({
                mouseState: "down-and-selecting",
            });
        }
    }

    _handleMouseDown = () => {
        this.setState({mouseState: "down"});
    }

    _handleMouseUp = () => {
        this.setState({mouseState: "up"});
    }

    render() {
        const {mouseState, trackedSelection} = this.state;
        const userIsMouseSelecting = mouseState === "down-and-selecting";

        return this.props.children && <div>
            {this.props.children(trackedSelection, userIsMouseSelecting)}
        </div>;
    }
}

module.exports = SelectionTracker;
