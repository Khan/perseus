/**
 * A range of highlightable content, defined relative to the current DOM.
 *
 * This is actually just the built-in DOM type Range, aliased for consistency
 * with DOMHighlight and SerializedHighlight.
 * https://developer.mozilla.org/en-US/docs/Web/API/Range
 *
 * A DOMRange is inherently coupled to a particular DOM session, and must be
 * serialized into a SerializedRange before being persisted.
 */
export type DOMRange = Range;

/**
 * A range of highlightable content, serialized into a DOM-independent format
 * so that it can be restored in subsequent browser sessions.
 *
 * We currently serialize ranges by the index of the first highlighted word and
 * index of the last highlighted word, each with respect to the full body of
 * the highlightable content.
 */
type SerializedRange = {
    type: "word-indexes";
    firstWordIndex: number;
    lastWordIndex: number;
};

/**
 * A highlight, defined relative to the current DOM.
 *
 * A DOMHighlight, by depending on DOMRange, is inherently coupled to a
 * particular DOM session, and must be serialized into a SerializedRange before
 * being persisted.
 */
export type DOMHighlight = {
    // A range that specifies this highlight's target content, both in terms of
    // the first and last word, and in terms of the DOM for caching purposes.
    firstWordIndex: number;
    lastWordIndex: number;
    domRange: DOMRange;
};
export type DOMHighlightSet = {
    [key: string]: DOMHighlight;
};

/**
 * A highlight, serialized into a DOM-independent format so that it can be
 * restored in subsequent browser sessions.
 */
export type SerializedHighlight = {
    // A range that specifies this highlight's target content, in a
    // DOM-independent format.
    range: SerializedRange;
};
export type SerializedHighlightSet = {
    [key: string]: SerializedHighlight;
};
