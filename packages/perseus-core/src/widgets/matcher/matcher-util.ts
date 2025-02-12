import {RandomUtil} from "@khanacademy/perseus-core";

import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";

// TODO(LEMS-2841): Should be able to remove once getPublicWidgetOptions is hooked up
type MatcherInfo = {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
    orderMatters: boolean;
    problemNum: number | null | undefined;
};

type MatcherShuffleInfo = {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
    orderMatters: boolean;
};

// TODO(LEMS-2841): Should be able to remove once getPublicWidgetOptions is hooked up
export const shuffleMatcher = (
    props: MatcherInfo,
): {left: ReadonlyArray<string>; right: ReadonlyArray<string>} => {
    // Use the same random() function to shuffle both columns sequentially
    const rng = RandomUtil.seededRNG(props.problemNum as number);

    let left;
    if (!props.orderMatters) {
        // If the order doesn't matter, don't shuffle the left column
        left = props.left;
    } else {
        left = RandomUtil.shuffle(props.left, rng, /* ensurePermuted */ true);
    }

    const right = RandomUtil.shuffle(
        props.right,
        rng,
        /* ensurePermuted */ true,
    );

    return {left, right};
};

// TODO(LEMS-2841): Can shorten to shuffleMatcher after above function removed
function shuffleMatcherWithRandom(data: MatcherShuffleInfo): {
    left: ReadonlyArray<string>;
    right: ReadonlyArray<string>;
} {
    // Use the same random() function to shuffle both columns sequentially
    let left;
    if (!data.orderMatters) {
        // If the order doesn't matter, don't shuffle the left column
        left = data.left;
    } else {
        left = RandomUtil.shuffle(
            data.left,
            Math.random() * 100,
            /* ensurePermuted */ true,
        );
    }

    const right = RandomUtil.shuffle(
        data.right,
        Math.random() * 100,
        /* ensurePermuted */ true,
    );

    return {left, right};
}

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
    const {left, right} = shuffleMatcherWithRandom(options);

    return {
        ...options,
        left: left,
        right: right,
    };
}

export default getMatcherPublicWidgetOptions;
