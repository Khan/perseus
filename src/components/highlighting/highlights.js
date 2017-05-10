// @flow
/**
 * Utility functions for manipulating highlights.
 */
const {findFirstAndLastWordIndexes, mergeRanges, spanRanges} = require("./ranges.js");

import type {DOMHighlight, SerializedHighlight, DOMRange} from "./types.js";

/**
 * Given a list of DOMHighlights, return a new list that also includes the
 * given DOMRange as a new DOMHighlight. If the DOMHighlight intersects
 * existing DOMHighlights, the other Highlights are removed and their ranges
 * are merged into the new DOMHighlight.
 */
function addHighlight(
    existingHighlights: DOMHighlight[],
    newHighlight: DOMHighlight,
): DOMHighlight[] {
    // Merge the new highlight with any existing highlights that intersect it.
    let mergedDomRange = newHighlight.domRange;
    let mergedFirstWordIndex = newHighlight.firstWordIndex;
    let mergedLastWordIndex = newHighlight.lastWordIndex;
    const highlightsThatWereNotMerged = existingHighlights.filter(h => {
        const newMergedDomRange = mergeRanges(h.domRange, mergedDomRange);
        if (newMergedDomRange) {
            // This highlight's range was successfully merged into the new
            // highlight. Update `mergedDomRange`, and return `false` to *not*
            // add this to the list of not-merged highlights.
            mergedDomRange = newMergedDomRange;
            mergedFirstWordIndex =
                Math.min(h.firstWordIndex, mergedFirstWordIndex);
            mergedLastWordIndex =
                Math.max(h.lastWordIndex, mergedLastWordIndex);
            return false;
        } else {
            // This highlight's range can't be merged into the new highlight.
            // Return `true` to add this to the list of not-merged highlights.
            return true;
        }
    });

    const existingKeys = highlightsThatWereNotMerged.map(h => h.key);
    const newMergedHighlight = {
        key: createNewUniqueKey(existingKeys), // TODO(mdr): remove
        firstWordIndex: mergedFirstWordIndex,
        lastWordIndex: mergedLastWordIndex,
        domRange: mergedDomRange,
    };

    return [...highlightsThatWereNotMerged, newMergedHighlight];
}

/**
 * Given a DOMRange and a list of word ranges, build a corresponding
 * DOMHighlight.
 *
 * If the DOMRange is not a valid highlight given the word ranges, return null.
 */
function buildHighlight(
    highlightRange: DOMRange, wordRanges: DOMRange[],
): ?DOMHighlight {
    const indexes = findFirstAndLastWordIndexes(highlightRange, wordRanges);
    if (!indexes) {
        return null;
    }

    const [firstWordIndex, lastWordIndex] = indexes;
    const firstWord = wordRanges[firstWordIndex];
    const lastWord = wordRanges[lastWordIndex];
    return {
        key: "TODO(mdr)" + Math.random(),

        firstWordIndex,
        lastWordIndex,
        domRange: spanRanges(firstWord, lastWord),
    };
}

/**
 * Given a list of keys, return a new unique key that is not in the list.
 */
function createNewUniqueKey(existingKeys: string[]): string {
    // The base of the key is the current time, in milliseconds since epoch.
    const base = `${new Date().getTime()}`;
    if (!existingKeys.includes(base)) {
        return base;
    }

    // But, if the user is a fast-clicker or time-traveler or something, and
    // already has a highlight from this millisecond, then let's attach a
    // suffix and keep incrementing it until we find an unused suffix.
    let suffix = 0;
    let key;
    do {
        key = `${base}-${suffix}`;
        suffix++;
    } while (existingKeys.includes(key));

    return key;
}

/**
 * Given a SerializedHightlight and the current set of word ranges, return a
 * DOMHighlight representing the SerializedHighlight.
 *
 * If the SerializedHighlight is not valid given the list of word ranges, throw
 * an error.
 */
function deserializeHighlight(
    serializedHighlight: SerializedHighlight,
    wordRanges: DOMRange[],
): DOMHighlight {
    const {firstWordIndex, lastWordIndex} = serializedHighlight.range;

    const firstWord = wordRanges[firstWordIndex];
    if (!firstWord) {
        throw new Error(
            `first word index ${firstWord} is out of bounds: ` +
            `must be 0–${wordRanges.length - 1} inclusive`);
    }

    const lastWord = wordRanges[lastWordIndex];
    if (!lastWord) {
        throw new Error(
            `last word index ${lastWord} is out of bounds: ` +
            `must be 0–${wordRanges.length - 1} inclusive`);
    }

    return {
        key: serializedHighlight.key, // TODO(mdr): remove
        firstWordIndex,
        lastWordIndex,
        domRange: spanRanges(firstWord, lastWord),
    };
}

/**
 * Return a SerializedHighlight representing the given DOMHighlight.
 */
function serializeHighlight(highlight: DOMHighlight): SerializedHighlight {
    const {firstWordIndex, lastWordIndex} = highlight;

    return {
        key: highlight.key, // TODO(mdr): remove
        range: {
            type: "word-indexes",
            firstWordIndex,
            lastWordIndex,
        },
    };
}

module.exports = {
    addHighlight,
    buildHighlight,
    deserializeHighlight,
    serializeHighlight,
};
