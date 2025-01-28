import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";

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
    return {
        // Note(Tamara): This does not provide correct answer information any longer.
        // To maintain compatibility with the original widget options, we are
        // keeping the key the same. Represents initial state of the cards here.
        correct: options.correct.slice().sort(),
        padding: options.padding,
        layout: options.layout,
    };
}

export default getSorterPublicWidgetOptions;
