import {CoreUtil} from "@khanacademy/perseus-core";

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

/**
 * Returns a random number generator function using the SFC32 function.
 *
 * Using the implementation found at:
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 */ function getHashes(str: string): [number, number, number, number] {
    let h1 = 1779033703;
    let h2 = 3144134277;
    let h3 = 1013904242;
    let h4 = 2773480762;
    let k = 0;
    for (let i = 0; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [
        (h1 ^ h2 ^ h3 ^ h4) >>> 0,
        (h2 ^ h1) >>> 0,
        (h3 ^ h1) >>> 0,
        (h4 ^ h1) >>> 0,
    ];
}

/**
 * Returns a random number generator function using the SFC32 function.
 *
 * Using the implementation found at:
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 */
function getSeedFunctionFromHashes(
    a: number,
    b: number,
    c: number,
    d: number,
): () => number {
    return function (): number {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        const t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
    };
}

// TODO(LEMS-2841): Should be able to remove once getPublicWidgetOptions is hooked up
export const shuffleMatcher = (
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

function shuffleMatcherWithHash(
    data: MatcherShuffleInfo,
    seed: number,
): {left: ReadonlyArray<string>; right: ReadonlyArray<string>} {
    // Use the same random() function to shuffle both columns sequentially
    let left;
    if (!data.orderMatters) {
        // If the order doesn't matter, don't shuffle the left column
        left = data.left;
    } else {
        left = CoreUtil.shuffle(data.left, seed, /* ensurePermuted */ true);
    }

    const right = CoreUtil.shuffle(data.right, seed, /* ensurePermuted */ true);

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
    const columnsToString = options.left.join("") + options.right.join("");
    const hashes = getHashes(columnsToString);
    const getSeed = getSeedFunctionFromHashes(...hashes);
    const seedFromColumns = getSeed();

    const {left, right} = shuffleMatcherWithHash(options, seedFromColumns);

    return {
        ...options,
        left: left,
        right: right,
    };
}

export default getMatcherPublicWidgetOptions;
