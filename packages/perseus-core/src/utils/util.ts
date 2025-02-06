/* Note(tamara): Brought over from the perseus package packages/perseus/src/util.ts file.
May be useful to bring other perseus package utilities here. */

import _ from "underscore";

type RNG = () => number;

const seededRNG: (seed: number) => RNG = function (seed: number): RNG {
    let randomSeed = seed;

    return function () {
        // Robert Jenkins' 32 bit integer hash function.
        let seed = randomSeed;
        seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
        seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
        seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
        seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
        seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
        seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
        return (randomSeed = seed & 0xfffffff) / 0x10000000;
    };
};

// Shuffle an array using a given random seed or function.
// If `ensurePermuted` is true, the input and ouput are guaranteed to be
// distinct permutations.
function shuffle<T>(
    array: ReadonlyArray<T>,
    randomSeed: number | RNG,
    ensurePermuted = false,
): ReadonlyArray<T> {
    // Always return a copy of the input array
    const shuffled = _.clone(array);

    // Handle edge cases (input array is empty or uniform)
    if (
        !shuffled.length ||
        _.all(shuffled, function (value) {
            return _.isEqual(value, shuffled[0]);
        })
    ) {
        return shuffled;
    }

    let random;
    if (typeof randomSeed === "function") {
        random = randomSeed;
    } else {
        random = seededRNG(randomSeed);
    }

    do {
        // Fischer-Yates shuffle
        for (let top = shuffled.length; top > 0; top--) {
            const newEnd = Math.floor(random() * top);
            const temp = shuffled[newEnd];

            // @ts-expect-error - TS2542 - Index signature in type 'readonly T[]' only permits reading.
            shuffled[newEnd] = shuffled[top - 1];
            // @ts-expect-error - TS2542 - Index signature in type 'readonly T[]' only permits reading.
            shuffled[top - 1] = temp;
        }
    } while (ensurePermuted && _.isEqual(array, shuffled));

    return shuffled;
}

const random: RNG = seededRNG(new Date().getTime() & 0xffffffff);

export const CoreUtil = {
    seededRNG,
    shuffle,
    random,
} as const;

export default CoreUtil;
