import type {PerseusOrdererWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusOrdererWidgetOptions type
 */
export type OrdererPublicWidgetOptions = Pick<
    PerseusOrdererWidgetOptions,
    "options" | "height" | "layout"
>;

/**
 * Given a PerseusOrdererWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getOrdererPublicWidgetOptions(
    fullOptions: PerseusOrdererWidgetOptions,
): OrdererPublicWidgetOptions {
    const {options, height, layout} = fullOptions;
    return {options, height, layout};
}

export default getOrdererPublicWidgetOptions;
