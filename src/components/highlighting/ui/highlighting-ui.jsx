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

const HighlightSetRenderer = require("./highlight-set-renderer.jsx");
const HighlightTooltip = require("./highlight-tooltip.jsx");
const SelectionTracker = require("./selection-tracker.jsx");

import type {DOMHighlight, DOMHighlightSet, DOMRange, ZIndexes}
    from "./types.js";

/* global i18n */

type HighlightingUIProps = {
    // A function that builds a DOMHighlight from the given DOMRange, if
    // possible. If it would not currently be valid to add a highlight over the
    // given DOMRange, returns null.
    buildHighlight: (range: DOMRange) => ?DOMHighlight,

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

class HighlightingUI extends React.PureComponent {
    props: HighlightingUIProps

    _handleAddHighlight(highlightToAdd: DOMHighlight) {
        this.props.onAddHighlight(highlightToAdd);

        // Deselect the newly-highlighted text, by collapsing the selection
        // to the end of the range.
        const selection = document.getSelection();
        if (selection) {
            selection.collapseToEnd();
        }
    }

    render() {
        return <SelectionTracker
            buildHighlight={this.props.buildHighlight}
            enabled={this.props.editable}
        >
            {(trackedSelection, userIsMouseSelecting) =>
                <div>
                    <HighlightSetRenderer
                        editable={
                            /* An existing highlight is editable when the
                             * component is in editable mode, and there's
                             * not a selection and "Add highlight" tooltip
                             * taking precedence over it. */
                            this.props.editable && !trackedSelection}
                        highlights={this.props.highlights}
                        offsetParent={this.props.offsetParent}
                        onRemoveHighlight={this.props.onRemoveHighlight}
                        zIndexes={this.props.zIndexes}
                    />
                    {trackedSelection && !userIsMouseSelecting &&
                        <HighlightTooltip
                            label={i18n._("Add highlight")}
                            onClick={() => this._handleAddHighlight(
                                trackedSelection.proposedHighlight)}

                            focusNode={trackedSelection.focusNode}
                            focusOffset={trackedSelection.focusOffset}
                            offsetParent={this.props.offsetParent}
                            zIndex={this.props.zIndexes.aboveContent}
                        />
                    }
                </div>
            }
        </SelectionTracker>;
    }
}

module.exports = HighlightingUI;
