import {constrainedShuffle, type RNG, seededRNG} from "../../utils/random-util";

import type {PerseusSorterWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusSorterWidgetOptions type
 */
export type SorterPublicWidgetOptions = {
    // TODO(benchristel): rename to `cards`; the whole point of public widget
    // options is that this isn't the correct order!
    correct: PerseusSorterWidgetOptions["correct"];
    padding: PerseusSorterWidgetOptions["padding"];
    layout: PerseusSorterWidgetOptions["layout"];
};

/**
 * Given a PerseusSorterWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getSorterPublicWidgetOptions(
    options: PerseusSorterWidgetOptions,
): SorterPublicWidgetOptions {
    return {
        ...options,
        // To remove information about the correct answer, we sort the cards.
        // However, we leave the first card in place so the client can avoid
        // showing the correct answer to the learner in the initial state of
        // the widget (since that could be confusing).
        correct: sortAllButFirst(options.correct),
    };
}

export function shuffleSorter(
    options: Pick<SorterPublicWidgetOptions, "correct">,
    problemNum: number,
): string[] {
    const {correct} = options;
    const rng = seededRNG(problemNum ?? 0);
    // See getSorterPublicWidgetOptions for an explanation of why we need to
    // displace the first card.
    return shuffleDisplacingFirst(correct, rng);
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

export default getSorterPublicWidgetOptions;
