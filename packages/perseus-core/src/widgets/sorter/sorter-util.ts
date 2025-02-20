import {shuffle} from "@khanacademy/perseus-core";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusSorterWidgetOptions type
 */
type SorterPublicWidgetOptions = {
    correct: PerseusSorterWidgetOptions["correct"];
    padding: PerseusSorterWidgetOptions["padding"];
    layout: PerseusSorterWidgetOptions["layout"];
    isCorrectShuffled: boolean;
};

/**
 * Given a PerseusSorterWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getSorterPublicWidgetOptions(
    options: PerseusSorterWidgetOptions,
): SorterPublicWidgetOptions {
    const shuffledCorrect = shuffle(
        options.correct,
        Math.random,
        /* ensurePermuted */ true,
    );

    return {
        ...options,
        // Note(Tamara): This does not provide correct answer information any longer.
        // To maintain compatibility with the original widget options, we are
        // keeping the key the same. Represents initial state of the cards here.
        correct: shuffledCorrect,
        // Note(Tamara): This new key is only added here with "true". There isn't
        // a place where it is set to false. It indicates that the correct field
        // has been shuffled and no longer contains correct answer info.
        isCorrectShuffled: true,
    };
}

export default getSorterPublicWidgetOptions;
