// @flow
/**
 * The entry point for highlighting!
 *
 * Given a content node and a set of serialized highlights, this component
 * renders the content with the given highlights applied. The content's DOM is
 * not modified by this process, so any content should be safe to pass to this
 * component.
 *
 * This component also renders controls for the user to add/remove/update
 * highlights. When the user does so, this component will update the full set
 * of highlights, serialize them, and call `onSerializedHighlightsUpdate` with
 * new set of serialized highlights, which you can then persist and send back
 * down to this component. Easy peasy!
 */
const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const HighlightsRenderer = require("./highlights-renderer.jsx");
const WordIndexer = require("./word-indexer.jsx");
const {addHighlight, deserializeHighlight, serializeHighlight} =
    require("./highlights.js");

import type {DOMHighlight, SerializedHighlight, DOMRange} from "./types.js";

type HighlightableContentProps = {
    // The highlightable content itself. Highlights will be defined relative to
    // the content specified here.
    children?: React.Element<any>,

    // When the user attempts to add/remove/update a highlight, this callback
    // will be called with a newly-updated full set of highlights that reflects
    // the user's intent.
    onSerializedHighlightsUpdate: (
        serializedHighlights: SerializedHighlight[]) => mixed,

    // The set of highlights to apply to the given content.
    serializedHighlights: SerializedHighlight[],
};

type HighlightableContentState = {
    // A cached list of DOMRanges, each representing one of the content's
    // semantic words. Sorted in document order.
    wordRanges: DOMRange[],
};

class HighlightableContent extends React.PureComponent {
    /* eslint-disable react/sort-comp */
    props: HighlightableContentProps
    state: HighlightableContentState = {
        wordRanges: [],
    }
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
     * Take the highlights from props, and deserialize them into DOMHighlights,
     * according to the latest cache of word ranges.
     */
    _getDOMHighlights(): DOMHighlight[] {
        const {serializedHighlights} = this.props;
        const {wordRanges} = this.state;

        return serializedHighlights.map(serializedHighlight =>
            deserializeHighlight(serializedHighlight, wordRanges));
    }

    /**
     * Remove the given highlight from the list, and call our callback with the
     * new set of highlights.
     */
    _handleRemoveHighlight = (keyToRemove: string) => {
        const {serializedHighlights} = this.props;
        const newSerializedHighlights =
            serializedHighlights.filter(sh => sh.key !== keyToRemove);
        this.props.onSerializedHighlightsUpdate(newSerializedHighlights);
    }

    /**
     * When the selection changes, we immediately add it as a new highlight,
     * and call our callback with the new set of highlights.
     *
     * TODO(mdr): Long-term, what we'll want to do instead is display an
     *     "Add Highlight" tooltip, and then run this highlight-adding code
     *     once it's called. This is an easy UI for testing, though - just
     *     be careful not to do click-n-drag highlighting until D35118 lands,
     *     or else you'll end up with annoying overlapping highlights :P
     */
    _handleSelectionChange = () => {
        const {wordRanges} = this.state;

        // Get the current selection's range. If none, no action required.
        const selection = document.getSelection();
        const selectionRange =
            selection && selection.rangeCount && selection.getRangeAt(0);
        if (!selectionRange) {
            return;
        }

        // Even if a range exists, it might be a zero-width range that contains
        // no content - that's actually usually what happens when you click
        // away to deselect text. But, even though a zero-width range might
        // intersect a word, we don't want to offer it as a highlight, because
        // that would be confusing. No action required.
        if (selectionRange.collapsed) {
            return;
        }

        // TODO(mdr): Existing highlights should probably be cached on the
        //     component, since they only change when the props change, but
        //     recomputing them on selection change might be expensive.
        const newHighlights = addHighlight(this._getDOMHighlights(), {
            range: selectionRange,
        });

        // Serialize the new highlights, and check for nulls. If any are found,
        // then our new highlight didn't serialize, and isn't actually valid
        // (e.g. it isn't actually over any of the content's words), so return
        // without firing any updates.
        //
        // Otherwise, since we've proven the list contains no empty values, we
        // can safely cast to `SerializedHighlight[]`.
        const maybeNewSerializedHighlights =
            newHighlights.map(h => serializeHighlight(h, wordRanges));
        if (maybeNewSerializedHighlights.some(sh => !sh)) {
            return;
        }
        const newSerializedHighlights: SerializedHighlight[] =
            (maybeNewSerializedHighlights: any[]);

        this.props.onSerializedHighlightsUpdate(newSerializedHighlights);
    }

    /**
     * When our WordIndexer sends us a new cache of word ranges, store it in
     * our component state.
     */
    _handleWordsUpdate = (wordRanges: DOMRange[]) => {
        this.setState({wordRanges});
    }

    render() {
        return <div>
            <div className={css(styles.content)}>
                <WordIndexer onWordsUpdate={this._handleWordsUpdate}>
                    {this.props.children}
                </WordIndexer>
            </div>
            <div className={css(styles.highlights)}>
                <HighlightsRenderer
                    highlights={this._getDOMHighlights()}
                    onRemoveHighlight={this._handleRemoveHighlight}
                />
            </div>
        </div>;
    }
}

const styles = StyleSheet.create({
    // We render content with z-index 1, and highlights with z-index 0, so that
    // content will receive the browser's native pointer events. (Highlights
    // have their own magic code to manage hover detection, despite being
    // behind the content.)

    content: {
        position: "relative",
        zIndex: 1,
    },

    highlights: {
        position: "relative",
        zIndex: 0,
    },
});

module.exports = HighlightableContent;
