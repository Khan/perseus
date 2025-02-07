import {
    CoreUtil,
    type PerseusSorterWidgetOptions,
} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusSorterWidgetOptions type
 */
type SorterPublicWidgetOptions = {
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
    const correctToString = options.correct.join("");
    const hashes = CoreUtil.getHashes(correctToString);
    const getSeed = CoreUtil.getSeedFunctionFromHashes(...hashes);
    const seedFromCorrect = getSeed();

    const shuffledCorrect = CoreUtil.shuffle(
        options.correct,
        seedFromCorrect,
        /* ensurePermuted */ true,
    );

    return {
        ...options,
        // Note(Tamara): This does not provide correct answer information any longer.
        // To maintain compatibility with the original widget options, we are
        // keeping the key the same. Represents initial state of the cards here.
        correct: shuffledCorrect,
    };
}

export default getSorterPublicWidgetOptions;
