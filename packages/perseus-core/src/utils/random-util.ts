/* Note(tamara): Brought over from the perseus package packages/perseus/src/util.ts file.
    May be useful to bring other perseus package utilities here. Contains utility functions
    and types used across multiple widgets for randomization and shuffling. */

import _ from "underscore";

type RNG = () => number;

export const seededRNG: (seed: number) => RNG = function (seed: number): RNG {
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
// If `ensurePermuted` is true, the input and output are guaranteed to be
// distinct permutations.
export function shuffle<T>(
    array: ReadonlyArray<T>,
    randomSeed: number | RNG,
    ensurePermuted = false,
): T[] {
    // Always return a copy of the input array
    const shuffled = [...array];

    // Handle edge cases (input array is empty or uniform)
    if (
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
        for (let i = shuffled.length - 1; i >= 0; i--) {
            const k = Math.floor(random() * (i + 1));

            // eslint-disable-next-line functional/immutable-data
            [shuffled[k], shuffled[i]] = [shuffled[i], shuffled[k]];
        }
    } while (ensurePermuted && _.isEqual(array, shuffled));

    return shuffled;
}

export const random: RNG = seededRNG(new Date().getTime() & 0xffffffff);
