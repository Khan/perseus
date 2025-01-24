import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusMatcherWidgetOptions type
 */
type MatcherPublicWidgetOptions = {
    labels: PerseusMatcherWidgetOptions["labels"];
    left: PerseusMatcherWidgetOptions["left"]; // First column that is usually static, but could be movable
    right: PerseusMatcherWidgetOptions["right"]; // Second column that appears to be always movable
    orderMatters: PerseusMatcherWidgetOptions["orderMatters"]; // when this is on, both columns are dynamic and the order of the pairs in the list matters
    padding: PerseusMatcherWidgetOptions["padding"];
};

/**
 * Given a PerseusMatcherWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getMatcherPublicWidgetOptions(
    options: PerseusMatcherWidgetOptions,
): MatcherPublicWidgetOptions {
    return {
        labels: options.labels,
        left: options.left,
        right: options.right,
        orderMatters: options.orderMatters,
        padding: options.padding,
    };
}

export default getMatcherPublicWidgetOptions;
