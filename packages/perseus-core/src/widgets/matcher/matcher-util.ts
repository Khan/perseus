import {CoreUtil} from "@khanacademy/perseus-core";

import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";

// TODO(LEMS-2841): Should be able to remove once getPublicWidgetOptions is hooked up
type MatcherInfo = {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
    orderMatters: boolean;
    problemNum: number | null | undefined;
};

// TODO(LEMS-2841): Should be able to remove once getPublicWidgetOptions is hooked up
export const matcherShuffle = (
    props: MatcherInfo,
): {left: ReadonlyArray<string>; right: ReadonlyArray<string>} => {
    // Use the same random() function to shuffle both columns sequentially
    const rng = CoreUtil.seededRNG(props.problemNum as number);

    let left;
    if (!props.orderMatters) {
        // If the order doesn't matter, don't shuffle the left column
        left = props.left;
    } else {
        left = CoreUtil.shuffle(props.left, rng, /* ensurePermuted */ true);
    }

    const right = CoreUtil.shuffle(props.right, rng, /* ensurePermuted */ true);

    return {left, right};
};

/**
 * For details on the individual options, see the
 * PerseusMatcherWidgetOptions type
 */
type MatcherPublicWidgetOptions = {
    labels: PerseusMatcherWidgetOptions["labels"];
    left: PerseusMatcherWidgetOptions["left"];
    right: PerseusMatcherWidgetOptions["right"];
    orderMatters: PerseusMatcherWidgetOptions["orderMatters"];
    padding: PerseusMatcherWidgetOptions["padding"];
};

/**
 * Given a PerseusMatcherWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getMatcherPublicWidgetOptions(
    options: PerseusMatcherWidgetOptions,
): MatcherPublicWidgetOptions {
    const {left, right} = matcherShuffle({...options, problemNum: undefined});

    return {
        labels: options.labels,
        left: left,
        right: right,
        orderMatters: options.orderMatters,
        padding: options.padding,
    };
}

export default getMatcherPublicWidgetOptions;
