// @flow
/**
 * Tracks the user's current selection, and displays an Add Highlight tooltip
 * at the focus.
 */
const React = require("react");

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

class SelectionTracker extends React.Component {
    /* eslint-disable react/sort-comp */
    props: SelectionTrackerProps
    /* eslint-enable react/sort-comp */

    componentDidMount() {
        document.addEventListener("selectionchange",
            this._handleSelectionChange);
    }

    componentWillUnmount() {
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
    }

    _handleSelectionChange = () => {
        // TODO(mdr): Instead of immediately adding the highlight, show an Add
        //     Highlight tooltip at the focus, and add the highlight on click.
        this._handleAddSelectionAsHighlight();
    }

    render() {
        // TODO(mdr): Show an Add Highlight tooltip at the focus, and add the
        //     highlight on click.
        return null;
    }
}

module.exports = SelectionTracker;
