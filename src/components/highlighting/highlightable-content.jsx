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

const HighlightingUI = require("./ui/highlighting-ui.jsx");
const WordIndexer = require("./word-indexer.jsx");
const {addHighlight, deserializeHighlight, serializeHighlight} =
    require("./highlights.js");

import type {DOMHighlight, SerializedHighlight, DOMRange} from "./types.js";

type HighlightableContentProps = {
    // The highlightable content itself. Highlights will be defined relative to
    // the content specified here.
    children?: React.Element<any>,

    // Whether the highlights are user-editable. If false, highlights are
    // read-only.
    editable: boolean,

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
    _container: ?HTMLElement
    /* eslint-enable react/sort-comp */

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
     * Add a highlight over the given DOMRange.
     */
    _handleAddHighlight = (range: DOMRange) => {
        const {wordRanges} = this.state;

        const newHighlights =
            addHighlight(this._getDOMHighlights(), {range});

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
     * When our WordIndexer sends us a new cache of word ranges, store it in
     * our component state.
     */
    _handleWordsUpdate = (wordRanges: DOMRange[]) => {
        this.setState({wordRanges});
    }

    render() {
        const highlights = this._getDOMHighlights();

        return <div
            className={css(styles.container)}
            ref={container => this._container = container}
        >
            <div>
                {this._container && <HighlightingUI
                    editable={this.props.editable}
                    highlights={highlights}
                    offsetParent={this._container}
                    zIndexes={{
                        // The content has a z-index of 1, so, to be above or
                        // below the content, use z-index of 2 or 0,
                        // respectively.
                        aboveContent: 2,
                        belowContent: 0,
                    }}

                    onAddHighlight={this._handleAddHighlight}
                    onRemoveHighlight={this._handleRemoveHighlight}
                />}
            </div>
            <div className={css(styles.content)}>
                <WordIndexer onWordsUpdate={this._handleWordsUpdate}>
                    {this.props.children}
                </WordIndexer>
            </div>
        </div>;
    }
}

const styles = StyleSheet.create({
    // We render content with z-index 1, and highlights with z-index 0, so that
    // content will receive the browser's native pointer events. (Highlights
    // have their own magic code to manage hover detection, despite being
    // behind the content.)

    container: {
        // Position the container and give it a z-index, to scope the z-indexes
        // inside by creating a stacking context.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
        //
        // This way, content's z-index of 1, and highlights' z-index of 0, and
        // tooltips' z-index of 2 don't interact with anything external;
        // external UI will see `HighlightableContent` as a single flat layer
        // with a z-index of 0. This removes the need for us to coordinate our
        // choices of z-index with external UI.
        position: "relative",
        zIndex: 0,
    },

    content: {
        // NOTE(mdr): Creating a stacking context for content of z-index 1 may
        //    be problematic if the content and external page want to
        //    interleave layers between each other, e.g., if the application UI
        //    wants to render something above some parts of our content, but
        //    below other parts. It's not relevant for the current Passage-only
        //    call site, but could be relevant someday…
        position: "relative",
        zIndex: 1,
    },
});

module.exports = HighlightableContent;
