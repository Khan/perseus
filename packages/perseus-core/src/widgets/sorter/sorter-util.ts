import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusSorterWidgetOptions type
 */
type SorterPublicWidgetOptions = {
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
        padding: options.padding,
        layout: options.layout,
    };
}

export default getSorterPublicWidgetOptions;
