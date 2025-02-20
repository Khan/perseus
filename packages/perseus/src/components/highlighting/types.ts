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
 *
 * TODO(mdr): Word index serialization is fragile in environments where the
 *     highlightable content is liable to change. Currently, our only call
 *     sites is the test prep app, which saves Perseus state against a
 *     particular *version* of a Perseus item, so it's impossible for the
 *     content to change - but, if we try to generalize further, we'll need to
 *     create new types of range serialization that are more robust to change.
 *     (Maybe some quoted text, and we scan the content for matches?)
 *
 *     Note, too, that changes to the definition of "word" are liable to break
 *     already-persisted word-index ranges, too. If we significantly change the
 *     definition, we should consider adding a versioning field here - even if
 *     we don't support *all* historical word implementations, we still might
 *     want to hide old highlights altogether if our word definition has
 *     changed sufficiently radically.
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
    // TODO(mdr): Things like color will go here, too :)
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
    // TODO(mdr): Things like color will go here, too :)
    range: SerializedRange;
};
export type SerializedHighlightSet = {
    [key: string]: SerializedHighlight;
};
