import type {PerseusBlankWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusNumericInputWidgetOptions type
 */
export type BlankPublicWidgetOptions = PerseusBlankWidgetOptions;

/**
 * Given a PerseusNumericInputWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
export function getBlankPublicWidgetOptions(
    options: PerseusBlankWidgetOptions,
): BlankPublicWidgetOptions {
    const {correct: _, ...publicWidgetOptions} = options;
    return publicWidgetOptions;
}
