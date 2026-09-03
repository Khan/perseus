import {splitWidgetsMap} from "../../utils/split-perseus-renderer";

import type {PerseusFillInTheBlankWidgetOptions} from "../../data-schema";

export type FillInTheBlankPublicWidgetOptions =
    PerseusFillInTheBlankWidgetOptions;

/**
 * Given a PerseusFillInTheBlankWidgetOptions object, return a new object with
 * only the public options that should be exposed to the client.
 */
export function getFillInTheBlankPublicWidgetOptions(
    options: PerseusFillInTheBlankWidgetOptions,
): FillInTheBlankPublicWidgetOptions {
    return {...options, widgets: splitWidgetsMap(options.widgets)};
}
