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

// Note: Previously called cyrb128 -
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function getHash(str: string): [number, number, number, number] {
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

// Note: Previously called sfc32 -
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function createRandomNumberGenerator(
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
    getHash,
    createRandomNumberGenerator,
} as const;

export default CoreUtil;
