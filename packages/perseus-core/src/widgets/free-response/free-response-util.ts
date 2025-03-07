import type {PerseusFreeResponseWidgetOptions} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusFreeResponseWidgetOptions type
 */
export type FreeResponsePublicWidgetOptions = {
    question: PerseusFreeResponseWidgetOptions["question"];
};

/**
 * Given a FreeResponsePublicWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getFreeResponsePublicWidgetOptions(
    options: PerseusFreeResponseWidgetOptions,
): FreeResponsePublicWidgetOptions {
    return {
        question: options.question,
    };
}

export default getFreeResponsePublicWidgetOptions;
