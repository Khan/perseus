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

import {Errors, PerseusError} from "@khanacademy/perseus-core";
import * as React from "react";

import type {DOMRange} from "./types";

type Props = {
    // The content to display and traverse in search of words.
    children?: React.ReactElement<any>;
    // After each mount and update, this callback is called with the list of
    // word ranges in `children`'s DOM, sorted in document order.
    onWordsUpdate: (wordRanges: ReadonlyArray<DOMRange>) => unknown;
};

class WordIndexer extends React.PureComponent<Props> {
    _container: HTMLElement | null | undefined;

    componentDidMount() {
        this._sendWordsUpdate();
    }

    componentDidUpdate() {
        this._sendWordsUpdate();
    }

    _sendWordsUpdate() {
        this.props.onWordsUpdate(this._getWordRanges());
    }

    _getWordRanges(): ReadonlyArray<DOMRange> {
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
            // @ts-expect-error - TS2554 - Expected 1-3 arguments, but got 4.
            false,
        );

        // Traverse the container's descendant text nodes in DOM order,
        // indexing the words we find.
        const index: Array<Range> = [];
        let trailingWordRange = null;
        while (treeWalker.nextNode()) {
            const node = treeWalker.currentNode;

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element: Element = node as any;
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
                // @ts-expect-error - TS2345 - Argument of type 'string | null' is not assignable to parameter of type 'string'.
                while ((wordMatch = wordPattern.exec(text)) !== null) {
                    const startOffset = wordMatch.index;
                    const endOffset = wordMatch.index + wordMatch[0].length;

                    let range;
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                        // @ts-expect-error - TS2531 - Object is possibly 'null'.
                        range = node.ownerDocument.createRange();
                        range.setStart(node, startOffset);
                        range.setEnd(node, endOffset);
                        index.push(range);
                    }

                    // @ts-expect-error - TS2531 - Object is possibly 'null'.
                    if (endOffset === text.length) {
                        newTrailingWordRange = range;
                    }
                }
                trailingWordRange = newTrailingWordRange;
            }
        }

        return index;
    }

    render(): React.ReactNode {
        return (
            <div ref={(container) => (this._container = container)}>
                {this.props.children}
            </div>
        );
    }
}

export default WordIndexer;
