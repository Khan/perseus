import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusMatcherWidgetOptions type
 */
type MatcherPublicWidgetOptions = {
    labels: PerseusMatcherWidgetOptions["labels"];
    left: string[]; // First column that is usually static, but could be movable
    right: string[]; // Second column that appears to be always movable
    orderMatters: PerseusMatcherWidgetOptions["orderMatters"]; // when this is on, both columns are dynamic and the order of the pairs in the list matters
    padding: PerseusMatcherWidgetOptions["padding"];
};

/**
    Utility function to shuffle an array
 */
const shuffle = (array: string[]) => {
    return array
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
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
        left: shuffle(options.left.slice()),
        right: shuffle(options.right.slice()),
        orderMatters: options.orderMatters,
        padding: options.padding,
    };
}

export default getMatcherPublicWidgetOptions;
