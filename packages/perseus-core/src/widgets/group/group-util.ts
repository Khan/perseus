import {splitPerseusRenderer} from "../../utils/split-perseus-item";

import type {
    PerseusGroupWidgetOptions,
    PerseusRenderer,
} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusGroupWidgetOptions type
 */
export type GroupPublicWidgetOptions = PerseusRenderer;

/**
 * Given a PerseusGroupWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getGroupPublicWidgetOptions(
    options: PerseusGroupWidgetOptions,
): GroupPublicWidgetOptions {
    return splitPerseusRenderer(options);
}

export default getGroupPublicWidgetOptions;
