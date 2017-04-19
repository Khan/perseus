// @flow
/**
 * Utility functions for manipulating highlights.
 */
const {findFirstAndLastWordIndexes} = require("./ranges.js");

import type {DOMHighlight, SerializedHighlight, DOMRange} from "./types.js";

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
    const firstWord = wordRanges[serializedHighlight.range.firstWordIndex];
    if (!firstWord) {
        throw new Error(
            `first word index ${firstWord} is out of bounds: ` +
            `must be 0–${wordRanges.length - 1} inclusive`);
    }

    const lastWord = wordRanges[serializedHighlight.range.lastWordIndex];
    if (!lastWord) {
        throw new Error(
            `last word index ${lastWord} is out of bounds: ` +
            `must be 0–${wordRanges.length - 1} inclusive`);
    }

    // Clone the first word's range, which sets the start position correctly.
    const range = firstWord.cloneRange();

    // Then, copy the end position into the new range.
    range.setEnd(lastWord.endContainer, lastWord.endOffset);

    return {
        key: serializedHighlight.key,
        range,
    };
}

/**
 * Given a DOMHighlight and the current set of word ranges, return a
 * SerializedHighlight representing the given DOMHighlight.
 *
 * If the given DOMHighlight contains none of the given words, and therefore
 * can't be serialized, return null.
 */
function serializeHighlight(
    highlight: DOMHighlight, wordRanges: DOMRange[]
): ?SerializedHighlight {
    const indexes = findFirstAndLastWordIndexes(highlight.range, wordRanges);
    if (!indexes) {
        return null;
    }

    const [firstWordIndex, lastWordIndex] = indexes;

    return {
        key: highlight.key,
        range: {
            type: "word-indexes",
            firstWordIndex,
            lastWordIndex,
        },
    };
}

module.exports = {
    createNewUniqueKey,
    deserializeHighlight,
    serializeHighlight,
};
