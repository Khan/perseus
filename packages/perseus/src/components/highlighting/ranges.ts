/**
 * Utility functions for manipulating ranges of highlightable content.
 */

import type {DOMRange} from "./types";

/**
 * Given two DOMRange objects, and a choice of start/end point for each, compare
 * the two chosen points. Return -1 if a's comes first in the document, return
 * 1 if b's comes first in the document, or 0 if they represent the same point
 * in the document.
 *
 * NOTE(mdr): This function exists primarily to cover over some confusing parts
 *     of the DOM's `compareBoundaryPoints` API, and to cover over a Flow bug
 *     documented here: https://github.com/facebook/flow/issues/3734.
 */
function compareRangeBoundaryPoints(
    a: DOMRange,
    whichA: "start" | "end",
    b: DOMRange,
    whichB: "start" | "end",
): number {
    let mode;
    if (whichA === "start" && whichB === "start") {
        mode = Range.START_TO_START;
    } else if (whichA === "start" && whichB === "end") {
        // NOTE(mdr): Confusingly, the correct constant here is actually
        //     `END_TO_START`, which is the reverse of what you'd expect.
        mode = Range.END_TO_START;
    } else if (whichA === "end" && whichB === "start") {
        // NOTE(mdr): Confusingly, the correct constant here is actually
        //     `START_TO_END`, which is the reverse of what you'd expect.
        mode = Range.START_TO_END;
    } else {
        mode = Range.END_TO_END;
    }
    return a.compareBoundaryPoints(mode, b);
}

/**
 * Given two DOMRanges, return a DOMRange whose start point comes from A, and
 * whose end point comes from B.
 */
export function spanRanges(a: DOMRange, b: DOMRange): DOMRange {
    const range = a.cloneRange();
    range.setEnd(b.endContainer, b.endOffset);
    return range;
}

/**
 * Given two DOMRanges, return whether they overlap.
 *
 * We here treat ranges like closed intervals: the boundary points are
 * considered to be included in the range, and, if a ends exactly where b
 * starts, they are considered to overlap.
 */
export function rangesOverlap(a: DOMRange, b: DOMRange): boolean {
    // Two ranges do *not* overlap iff one ends before the other begins.
    const rangesDoNotOverlap =
        compareRangeBoundaryPoints(a, "end", b, "start") < 0 ||
        compareRangeBoundaryPoints(b, "end", a, "start") < 0;
    return !rangesDoNotOverlap;
}

/**
 * Given two DOMRanges, return whether the first includes the second: whether
 * all points that B contains are also contained by A.
 */
export function rangeIncludes(a: DOMRange, b: DOMRange): boolean {
    const rangeIsIncluded =
        compareRangeBoundaryPoints(a, "start", b, "start") <= 0 &&
        compareRangeBoundaryPoints(a, "end", b, "end") >= 0;
    return rangeIsIncluded;
}

/**
 * Given two DOMRanges, intersect them: return a range that contains all points
 * that both A contains and B contains, and contains no other points.
 *
 * If A and B do not overlap, no intersection exists; return null.
 */
export function intersectRanges(
    a: DOMRange,
    b: DOMRange,
): DOMRange | null | undefined {
    if (!rangesOverlap(a, b)) {
        return null;
    }

    // Find the range with the latest start point, and the range with the
    // earliest end point.
    const starter =
        compareRangeBoundaryPoints(a, "start", b, "start") > 0 ? a : b;
    const ender = compareRangeBoundaryPoints(a, "end", b, "end") < 0 ? a : b;

    return spanRanges(starter, ender);
}

/**
 * Given two DOMRanges, union them: return a range that contains all points
 * that either A contains or B contains, and contains no other points.
 *
 * If A and B do not overlap, no union exists; return null.
 */
export function unionRanges(
    a: DOMRange,
    b: DOMRange,
): DOMRange | null | undefined {
    if (!rangesOverlap(a, b)) {
        return null;
    }

    // Find the range with the earliest start point, and the range with the
    // latest end point.
    const starter =
        compareRangeBoundaryPoints(a, "start", b, "start") < 0 ? a : b;
    const ender = compareRangeBoundaryPoints(a, "end", b, "end") > 0 ? a : b;

    return spanRanges(starter, ender);
}

/**
 * Given a list of word ranges, and a selection range, binary search the list
 * and return the index of the goal word, or -1 if no satisfactory goal word
 * exists in the list.
 *
 * If `goal` is "first", return the index of the first word whose end point is
 * after the selection's start point.
 *
 * If `goal` is "last", return the index of the last word whose start point is
 * before the selection's end point.
 */
function findBoundaryWordIndex(
    selectionRange: DOMRange,
    wordRanges: ReadonlyArray<DOMRange>,
    goal: "first" | "last",
    initialLowerBound: number,
    initialUpperBound: number,
): number {
    let bestValidWordIndex = -1;
    let lowerBound = initialLowerBound;
    let upperBound = initialUpperBound;
    let iterationCount = 0;
    while (lowerBound <= upperBound) {
        iterationCount++;
        if (iterationCount > wordRanges.length * 2) {
            throw new Error(
                `Assertion error: Binary search isn't terminating? ` +
                    `lower=${lowerBound}, upper=${upperBound}`,
            );
        }

        const mid = Math.floor((lowerBound + upperBound) / 2);

        if (goal === "first") {
            const rangeComparison = compareRangeBoundaryPoints(
                wordRanges[mid],
                "end",
                selectionRange,
                "start",
            );
            if (rangeComparison <= 0) {
                // If this word's end point is before or equal to the
                // selection's start point, then this word is not a valid
                // candidate, nor are any of the words before it.
                //
                // Update our bounds to look for a valid word after this one.
                lowerBound = mid + 1;
            } else {
                // If this word's end point is after the selection's start
                // point, then this word is valid, and is, by nature of the
                // search, the earliest valid word we're aware of.
                //
                // Update our bounds to look for a better valid word before
                // this one.
                bestValidWordIndex = mid;
                upperBound = mid - 1;
            }
        } else {
            const rangeComparison = compareRangeBoundaryPoints(
                wordRanges[mid],
                "start",
                selectionRange,
                "end",
            );
            if (rangeComparison >= 0) {
                // If this word's start point is after or equal to the
                // selection's end point, then this word is not a valid
                // candidate, nor are any of the words after it.
                //
                // Update our bounds to look for a valid word before this one.
                upperBound = mid - 1;
            } else {
                // If this word's start point is before the selection's end
                // point, then this word is valid, and is, by nature of the
                // search, the latest valid word we're aware of.
                //
                // Update our bounds to look for a better valid word after
                // this one.
                bestValidWordIndex = mid;
                lowerBound = mid + 1;
            }
        }
    }

    return bestValidWordIndex;
}

/**
 * Given a list of word ranges, and a selection range, binary search the list
 * and return the indexes of the first and last words that the selection
 * intersects, or `null` if the range includes no words.
 */
export function findFirstAndLastWordIndexes(
    selectionRange: DOMRange,
    wordRanges: ReadonlyArray<DOMRange>,
): [number, number] | null | undefined {
    // Find the first word whose end point is after the selection's start
    // point.
    //
    // Note that this does *not* alone prove that this word is *intersected* by
    // the current range; to intersect, the first word's start point must also
    // be before the selection's end point. This is proven by the success of
    // the second search.
    //
    // (For example, imagine highlighting the space between two words. This
    // search would return the first word after the selection, despite not
    // intersecting the selection.)
    const firstWordIndex = findBoundaryWordIndex(
        selectionRange,
        wordRanges,
        "first",
        0,
        wordRanges.length - 1,
    );
    if (firstWordIndex < 0) {
        return null;
    }

    // Find the last word whose start point is before the selection's end
    // point.
    //
    // Start the search with our candidate first word, because, while we don't
    // know whether our candidate first word intersects the selection, we *do*
    // know that no *earlier* word intersects the selection, or else it would
    // have been yielded as the candidate first word instead.
    const lastWordIndex = findBoundaryWordIndex(
        selectionRange,
        wordRanges,
        "last",
        firstWordIndex,
        wordRanges.length - 1,
    );
    if (lastWordIndex < 0) {
        return null;
    }

    // Now, we have discovered a candidate first word F, and a candidate last
    // word L. Let's prove that these are indeed the first and last intersected
    // words of the selection S.
    //
    // Syntax: Let A1 and A2 represent the start and end point of range A.
    //
    // Definition: A1 <= A2 for any range A.
    //
    // Theorem 1: Two ranges A and B intersect iff A1 <= B2 and B1 <= A2.
    // Proof: See http://www.rgrjr.com/emacs/overlap.html, and extend the
    //     result to closed intervals by also accepting equality.
    //
    // Given 1: F1 <= L1 and F2 <= L2. That is, either the first and last word
    //     are the same, or the last word comes after, because we provided
    //     `firstWordIndex` as the lower bound when search for L.
    // Given 2: S1 <= F2, and no earlier word's end point is >= S1, because
    //     F was returned by `findBoundaryWordIndex` with goal "first".
    // Given 3: L1 <= S2, and no later word's start point is <= S2, because
    //     L was returned by `findBoundaryWordIndex` with goal "last".
    //
    // Conclusion 1: F intersects S.
    // Proof: By Theorem 1, we must show that F1 <= S2 and S1 <= F2.
    //     F1 <= L1 <= S2, by Given 1 and Given 3.
    //     S1 <= F2, by Given 2. QED.
    //
    // Conclusion 2: L intersects S.
    // Proof: By Theorem 1, we must show that L1 <= S2 and S1 <= L2.
    //     L1 <= S2 by Given 3.
    //     S1 <= F2 <= L2, by Given 1 and Given 2. QED.
    //
    // Conclusion 3: No word earlier than F intersects S.
    // Proof: Consider some word W earlier than F.
    //     W2 < S1, by Given 2. Therefore, it's false that S1 <= W2.
    //     Therefore, W and S do not intersect, by Theorem 1. QED.
    //
    // Conclusion 4: No word later than L intersects S.
    // Proof: Consider some word W later than L.
    //     W1 > S2, by Given 2. Therefore, it's false that W1 <= S2.
    //     Therefore, W and S do not intersect, by Theorem 1, QED.
    //
    // Therefore, while neither of these two searches alone proves that F is
    // the first intersected word of S, or that L is the last intersected word
    // of S, the implications of the two searches are sufficient proof when
    // combined. Return these two indexes with confidence, hooray!

    return [firstWordIndex, lastWordIndex];
}
