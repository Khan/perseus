/* eslint-disable static-service/require-fixture */
// @flow
/**
 * This component, whenever its content updates, traverses the DOM to find
 * semantic words and send the corresponding DOMRanges to the caller via a
 * callback.
 *
 * A "word" here is a sequence of non-whitespace text characters, uninterrupted
 * by the start/end of a non-inline element. That is, a word can span across
 * text nodes and inline tags like <b>, but cannot span across block
 * paragraphs.
 *
 * The words yielded by WordIndexer are sorted in document order, which makes
 * them amenable to binary search - see `findBoundaryWordIndex` in ranges.js.
 */
import * as React from "react";

import {Errors} from "../../logging/log.js";
import {PerseusError} from "../../perseus-error.js";

import type {DOMRange} from "./types.js";

type WordIndexerProps = {|
    // The content to display and traverse in search of words.
    children?: React.Element<any>,
    // After each mount and update, this callback is called with the list of
    // word ranges in `children`'s DOM, sorted in document order.
    onWordsUpdate: (wordRanges: $ReadOnlyArray<DOMRange>) => mixed,
|};

class WordIndexer extends React.PureComponent<WordIndexerProps> {
    _container: ?HTMLElement;
    /* eslint-enable react/sort-comp */

    componentDidMount() {
        this._sendWordsUpdate();
    }

    componentDidUpdate() {
        this._sendWordsUpdate();
    }

    _sendWordsUpdate() {
        this.props.onWordsUpdate(this._getWordRanges());
    }

    _getWordRanges(): $ReadOnlyArray<DOMRange> {
        const container = this._container;

        if (!container) {
            throw new PerseusError(
                "invariant violation: `this._container` is not defined, but " +
                    "this method is only called after mount/update",
                Errors.NotAllowed,
            );
        }

        // Create a TreeWalker that visits text nodes and element nodes.
        // We select the types of nodes we're interested in by bitwise-ORing
        // the desired filters together.
        const treeWalker = container.ownerDocument.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            () => NodeFilter.FILTER_ACCEPT,
            false,
        );

        // Traverse the container's descendant text nodes in DOM order,
        // indexing the words we find.
        const index = [];
        let trailingWordRange = null;
        while (treeWalker.nextNode()) {
            const node = treeWalker.currentNode;

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element: Element = (node: any);
                if (getComputedStyle(element).display !== "inline") {
                    // Block-level elements interrupt text words, so set the
                    // current trailing word to `null`.
                    //
                    // This includes exiting one paragraph to visit another,
                    // but also includes text interrupted by inline-block
                    // elements.
                    //
                    // TODO(mdr): Is this behavior *generalizably* correct?
                    // TODO(mdr): I don't *fully* understand the performance
                    //     implications of `getComputedStyle`, but I think it's
                    //     gonna be nbd at the current call sites. If we try to
                    //     generalize to frequently-updating content, we might
                    //     want to watch this as a potential performance
                    //     bottleneck.
                    trailingWordRange = null;
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue;

                // A "word" is here simply defined as a maximal-length
                // substring of non-space characters.
                //
                // Loop over all the words in the string, by repeatedly calling
                // `wordPattern.exec(text)`.
                const wordPattern = /\S+/g;
                let wordMatch;
                let newTrailingWordRange = null;
                while ((wordMatch = wordPattern.exec(text)) !== null) {
                    // TODO(mdr): We found a new Flow error when upgrading:
                    //     "index (Cannot get `wordMatch.index` because property `index` is missing in null [1].)"
                    // $FlowFixMe[incompatible-use](0.57.3->0.75.0)
                    const startOffset = wordMatch.index;
                    // TODO(mdr): We found a new Flow error when upgrading:
                    //     "index (Cannot get `wordMatch.index` because property `index` is missing in null [1].)", "0 (Cannot get `wordMatch[0]` because an indexer property is missing in null [1].)"
                    // $FlowFixMe[incompatible-use](0.57.3->0.75.0)
                    const endOffset = wordMatch.index + wordMatch[0].length;

                    let range;
                    if (startOffset === 0 && trailingWordRange) {
                        // This word is at the start of this text node, and
                        // there's a trailing word from the previous text node,
                        // and there was no non-inline element between them.
                        // This word and the trailing word are probably
                        // intended to be two parts of the same word.
                        //
                        // So, instead of creating a new word range, we add
                        // this word to the previous range by extending it.
                        range = trailingWordRange;
                        range.setEnd(node, endOffset);
                    } else {
                        // Otherwise, start a new word range here, and add it
                        // to the list.
                        range = node.ownerDocument.createRange();
                        range.setStart(node, startOffset);
                        range.setEnd(node, endOffset);
                        index.push(range);
                    }

                    if (endOffset === text.length) {
                        newTrailingWordRange = range;
                    }
                }
                trailingWordRange = newTrailingWordRange;
            }
        }

        return index;
    }

    render(): React.Element<"div"> {
        return (
            <div ref={(container) => (this._container = container)}>
                {this.props.children}
            </div>
        );
    }
}

export default WordIndexer;
