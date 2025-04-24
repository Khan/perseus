import type {PerseusOrdererWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusOrdererWidgetOptions type
 */
type OrdererPublicWidgetOptions = {
    options: PerseusOrdererWidgetOptions["options"];
    height: PerseusOrdererWidgetOptions["height"];
    layout: PerseusOrdererWidgetOptions["layout"];
};

/**
 * Given a PerseusOrdererWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getOrdererPublicWidgetOptions(
    options: PerseusOrdererWidgetOptions,
): OrdererPublicWidgetOptions {
    return {
        options: options.options,
        height: options.height,
        layout: options.layout,
    };
}

export default getOrdererPublicWidgetOptions;
