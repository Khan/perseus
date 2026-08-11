import type {PerseusBlankWidgetOptions} from "../../data-schema";

export type BlankPublicWidgetOptions = Pick<
    PerseusBlankWidgetOptions,
    "displayType"
>;

/**
 * Given a PerseusBlankWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
export function getBlankPublicWidgetOptions(
    options: PerseusBlankWidgetOptions,
): BlankPublicWidgetOptions {
    const {correctId: _, ...publicWidgetOptions} = options;
    return publicWidgetOptions;
}
