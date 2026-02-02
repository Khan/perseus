import {describe, it, expect} from "@jest/globals";

import {
    constrainedShuffle,
    randomIntInRange,
    seededRNG,
    shuffle,
} from "./random-util";
import {range} from "./range";

describe("shuffle", () => {
    it("does nothing to an empty array", () => {
        expect(shuffle([], 0)).toEqual([]);
    });

    it("does nothing to a uniform array", () => {
        expect(shuffle([1, 1, 1], 0)).toEqual([1, 1, 1]);
    });

    it("always copies the input array, even if there's nothing to shuffle", () => {
        const input = [];
        const result = shuffle(input, 0);
        expect(result).not.toBe(input);
    });

    it.each([
        [0, [2, 1, 3]],
        [1, [3, 2, 1]],
        [5, [2, 3, 1]],
    ])("always shuffles the same way given a seed of %d", (seed, expected) => {
        expect(shuffle([1, 2, 3], seed)).toEqual(expected);
    });

    it("accepts a random number generator function instead of a seed", () => {
        // We "randomly" choose zero every time. Note that the RNG should
        // return numbers in the range [0, 1), like Math.random().
        const rng = () => 0;
        expect(shuffle([1, 2, 3], rng)).toEqual([2, 3, 1]);
    });

    it("does not mutate the input array", () => {
        const input = [1, 2, 3];
        const result = shuffle(input, 0);
        expect(input).toEqual([1, 2, 3]);
        // Check that the shuffle permuted the data, to guard against false
        // passes in the case where the shuffle was a no-op.
        expect(result).not.toEqual(input);
    });

    it("can return the initial order if ensurePermuted is false", () => {
        expect(shuffle([1, 2, 3], 8)).toEqual([1, 2, 3]);
    });

    it("does not return the initial order if ensurePermuted is true", () => {
        expect(shuffle([1, 2, 3], 8, true)).toEqual([2, 3, 1]);
    });

    it("ignores ensurePermuted if there is nothing to shuffle", () => {
        expect(shuffle([1], 8, true)).toEqual([1]);
    });
});

describe("constrainedShuffle", () => {
    it("does nothing to an empty array", () => {
        const rng = seededRNG(0);
        expect(constrainedShuffle([], rng, () => false)).toEqual([]);
    });

    it("does nothing to a uniform array", () => {
        const rng = seededRNG(0);
        expect(constrainedShuffle([1, 1, 1], rng, () => false)).toEqual([
            1, 1, 1,
        ]);
    });

    it("shuffles the given array", () => {
        const rng = seededRNG(0);
        expect(constrainedShuffle([1, 2, 3], rng, () => true)).toEqual([
            2, 1, 3,
        ]);
    });

    it.each(range(0, 10))(
        "returns an array satisfying the given constraint when the seed is %d",
        (seed) => {
            const rng = seededRNG(seed);
            function constraint(array: readonly number[]) {
                return array[0] === 3;
            }

            const result = constrainedShuffle([1, 2, 3], rng, constraint);

            expect(result[0]).toBe(3);
        },
    );

    it("throws given a constraint that is never satisfied", () => {
        const rng = seededRNG(0);
        expect(() => constrainedShuffle([1, 2, 3], rng, () => false)).toThrow();
    });
});

describe("randomIntInRange", () => {
    function arrayOfLength(n: number) {
        return Array(n).fill(null);
    }

    it("always generates 0 when min and max are both 0", () => {
        expect(
            // eslint-disable-next-line no-restricted-properties
            arrayOfLength(3).map(() => randomIntInRange(0, 0, Math.random)),
        ).toEqual([0, 0, 0]);
    });

    it("always generates N when min and max are both N", () => {
        expect(
            // eslint-disable-next-line no-restricted-properties
            arrayOfLength(3).map(() => randomIntInRange(42, 42, Math.random)),
        ).toEqual([42, 42, 42]);
    });

    it("generates numbers between the min and the max, inclusive", () => {
        // Arrange
        const min = 3;
        const max = 6;
        const rng = seededRNG(0);

        // Act
        const result = arrayOfLength(20).map(() =>
            randomIntInRange(min, max, rng),
        );

        // Assert
        expect(new Set(result)).toEqual(new Set([3, 4, 5, 6]));
    });
});
