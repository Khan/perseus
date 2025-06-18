import {constrainedShuffle, seededRNG} from "../../utils/random-util";

import type {PerseusMatcherWidgetOptions} from "../../data-schema";
import type {RNG} from "../../utils/random-util";
import type {PerseusMatcherUserInput} from "../../validation.types";

export const shuffleMatcher = (
    options: Pick<
        MatcherPublicWidgetOptions,
        "left" | "right" | "orderMatters"
    >,
    problemNum: number,
): PerseusMatcherUserInput => {
    // Use the same random() function to shuffle both columns sequentially
    const rng = seededRNG(problemNum);

    return {
        // If the order of rows doesn't matter, don't shuffle the left column
        left: !options.orderMatters
            ? options.left
            : shuffleDisplacingFirst(options.left, rng),
        right: shuffleDisplacingFirst(options.right, rng),
    };
};

/**
 * For details on the individual options, see the
 * PerseusMatcherWidgetOptions type
 */
export type MatcherPublicWidgetOptions = {
    labels: PerseusMatcherWidgetOptions["labels"];
    left: PerseusMatcherWidgetOptions["left"];
    right: PerseusMatcherWidgetOptions["right"];
    orderMatters: PerseusMatcherWidgetOptions["orderMatters"];
    padding: PerseusMatcherWidgetOptions["padding"];
};

/**
 * Given a PerseusMatcherWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getMatcherPublicWidgetOptions(
    options: PerseusMatcherWidgetOptions,
): MatcherPublicWidgetOptions {
    return {
        ...options,
        left: options.orderMatters
            ? sortAllButFirst(options.left)
            : options.left,
        right: sortAllButFirst(options.right),
    };
}

function sortAllButFirst([first, ...rest]: readonly string[]): string[] {
    return [first, ...rest.sort()];
}

function shuffleDisplacingFirst<T>(array: readonly T[], rng: RNG): T[] {
    function isFirstElementDisplaced(shuffled: readonly T[]) {
        return shuffled[0] !== array[0];
    }

    return constrainedShuffle(array, rng, isFirstElementDisplaced);
}

export default getMatcherPublicWidgetOptions;
