// @flow
/**
 * Tracks the user's current selection, and displays an Add Highlight tooltip
 * at the focus.
 */
const React = require("react");

const HighlightTooltip = require("./highlight-tooltip.jsx");

/* global i18n */

import type {DOMRange, ZIndexes} from "./types.js";

type SelectionTrackerProps = {
    // This component's `offsetParent` element, which is the nearest ancestor
    // with `position: relative`. This will enable us to choose the correct
    // CSS coordinates to align tooltips with the target content.
    offsetParent: Element,

    // A callback indicating that the user would like to add a highlight over
    // the given DOMRange.
    onAddHighlight: (range: DOMRange) => mixed,

    // The z-indexes to use when rendering tooltips above content, and
    // highlights below content.
    zIndexes: ZIndexes,
};

type SelectionTrackerState = {
    // The current state of the mouse button. We distinguish between down,
    // down and the selection has changed since going down, and up.
    mouseState: "down" | "down-and-selecting" | "up",

    // The focus of the current selection - that is, the boundary point of the
    // selection that the user is dragging around.
    //
    // We don't simply track the full `Selection` object, which contains all of
    // this focus and range information and more, because the browser reuses
    // the global `Selection` object and mutates it, which breaks our
    // `shouldComponentUpdate` checks.
    selectionFocusNode: ?Node,
    selectionFocusOffset: ?number,
};

class SelectionTracker extends React.PureComponent {
    /* eslint-disable react/sort-comp */
    props: SelectionTrackerProps
    state: SelectionTrackerState = {
        mouseState: "down",
        selectionFocusNode: null,
        selectionFocusOffset: null,
    }
    /* eslint-enable react/sort-comp */

    componentDidMount() {
        window.addEventListener("mousedown", this._handleMouseDown);
        window.addEventListener("mouseup", this._handleMouseUp);
        document.addEventListener("selectionchange",
            this._handleSelectionChange);
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this._handleMouseDown);
        window.removeEventListener("mouseup", this._handleMouseUp);
        document.removeEventListener("selectionchange",
            this._handleSelectionChange);
    }

    /**
     * Get the current selection and non-collapsed range, if any.
     * Otherwise, if there is no current selection or it's collapsed, return
     * null.
     */
    _getSelectionAndRange(): ?{selection: Selection, range: DOMRange} {
        const selection = document.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (!range.collapsed) {
                return {selection, range};
            }
        }

        return null;
    }

    /**
     * Add the currently-selected DOMRange as a highlight.
     */
    _handleAddSelectionAsHighlight = () => {
        const selectionAndRange = this._getSelectionAndRange();
        if (!selectionAndRange) {
            return;
        }

        this.props.onAddHighlight(selectionAndRange.range);

        // Deselect the newly-highlighted text, by collapsing the selection
        // to the end of the range.
        selectionAndRange.selection.collapseToEnd();
    }

    _handleSelectionChange = () => {
        const selectionAndRange = this._getSelectionAndRange();
        if (selectionAndRange) {
            const {selection} = selectionAndRange;
            this.setState({
                selectionFocusNode: selection.focusNode,
                selectionFocusOffset: selection.focusOffset,
            });
        } else {
            this.setState({
                selectionFocusNode: null,
                selectionFocusOffset: null,
            });
        }

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
        const {offsetParent, zIndexes} = this.props;
        const {mouseState, selectionFocusNode, selectionFocusOffset} =
            this.state;

        // If the user is still mouse-selecting some text, we don't want our
        // tooltip getting in the way, so render nothing.
        if (mouseState === "down-and-selecting") {
            return null;
        }

        // If there's no selection focus, render nothing.
        if (!selectionFocusNode || !selectionFocusOffset) {
            return null;
        }

        return <HighlightTooltip
            label={i18n._("Add highlight")}
            onClick={this._handleAddSelectionAsHighlight}

            focusNode={selectionFocusNode}
            focusOffset={selectionFocusOffset}
            offsetParent={offsetParent}
            zIndex={zIndexes.aboveContent}
        />;
    }
}

module.exports = SelectionTracker;
