/* Note(tamara): Brought over from the perseus package packages/perseus/src/util.ts file.
    May be useful to bring other perseus package utilities here. Contains utility functions
    and types used across multiple widgets for randomization and shuffling. */

import _ from "underscore";

/**
 * A random number generator. Should return floats in the interval [0, 1), like
 * Math.random().
 */
export type RNG = () => number;

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

/**
 * Shuffle an array using a given random seed or function.
 * If `ensurePermuted` is true, the input and output are guaranteed to be
 * distinct permutations.
 */
export function shuffle<T>(
    array: ReadonlyArray<T>,
    randomSeed: number | RNG,
    ensurePermuted = false,
): T[] {
    let random;
    if (typeof randomSeed === "function") {
        random = randomSeed;
    } else {
        random = seededRNG(randomSeed);
    }

    function isValidShuffle(shuffled: readonly T[]) {
        return ensurePermuted ? !_.isEqual(array, shuffled) : true;
    }

    return constrainedShuffle(array, random, isValidShuffle);
}

export function constrainedShuffle<T>(
    array: readonly T[],
    random: RNG,
    isValidShuffle: (shuffled: readonly T[]) => boolean,
): T[] {
    const maxIterations = 100;
    const shuffled = [...array];

    // Return early if all elements are equal -- both for performance, and
    // to avoid going into an infinite loop in the (common) case where
    // isValidShuffle is checking the order of the values.
    if (shuffled.every((value) => _.isEqual(value, shuffled[0]))) {
        return shuffled;
    }

    for (let i = 0; i < maxIterations; i++) {
        shuffleInPlace(shuffled, random);
        if (isValidShuffle(shuffled)) {
            return shuffled;
        }
    }

    throw new Error(
        `constrainedShuffle: constraint not met after ${maxIterations} attempts`,
    );
}

function shuffleInPlace<T>(a: T[], random: RNG): void {
    // The Fisher-Yates shuffling algorithm. See:
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = a.length - 1; i > 0; i--) {
        const k = randomIntInRange(0, i, random);
        [a[k], a[i]] = [a[i], a[k]];
    }
}

export function randomIntInRange(
    min: number,
    max: number,
    random: RNG,
): number {
    return Math.floor(random() * (max - min + 1)) + min;
}

export const random: RNG = seededRNG(new Date().getTime() & 0xffffffff);
