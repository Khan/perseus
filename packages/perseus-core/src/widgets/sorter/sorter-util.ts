import {constrainedShuffle, type RNG, seededRNG} from "../../utils/random-util";

import type {PerseusSorterWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusSorterWidgetOptions type
 */
export type SorterPublicWidgetOptions = {
    layout: PerseusSorterWidgetOptions["layout"];
    /**
     * `correct` is the wrong term, because it's not
     * in the correct order when in SorterPublicWidgetOptions
     *
     * TODO(LEMS-4535): rename this
     */
    correct: PerseusSorterWidgetOptions["correct"];
    /**
     * @deprecated
     *
     * TODO(LEMS-4538): remove padding from Sorter
     */
    padding: PerseusSorterWidgetOptions["padding"];
};

/**
 * Given a PerseusSorterWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
export function getSorterPublicWidgetOptions(
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

function sortAllButFirst(cards: readonly string[]): string[] {
    // An author can delete every card, so `correct` can be empty. Destructuring
    // a first card off an empty array would hand the client `[undefined]` — a
    // phantom card — instead of no cards at all.
    if (cards.length === 0) {
        return [];
    }
    const [first, ...rest] = cards;
    return [first, ...rest.sort()];
}

function shuffleDisplacingFirst<T>(array: readonly T[], rng: RNG): T[] {
    function isFirstElementDisplaced(shuffled: readonly T[]) {
        return shuffled[0] !== array[0];
    }

    return constrainedShuffle(array, rng, isFirstElementDisplaced);
}
