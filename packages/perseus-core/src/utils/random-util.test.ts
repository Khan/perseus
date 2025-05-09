import {describe, it, expect} from "@jest/globals";

import {shuffle} from "./random-util";

describe("shuffle", () => {
    it("does nothing to an empty array", () => {
        expect(shuffle([], 0)).toEqual([]);
    });

    it("does nothing to a uniform array", () => {
        expect(shuffle([1, 1, 1], 0)).toEqual([1, 1, 1]);
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
        const input = [1, 2, 3, 4, 5, 6, 7];
        shuffle(input, 0);
        expect(input).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it("can return the initial order if ensurePermuted is false", () => {
        expect(shuffle([1, 2, 3], 8)).toEqual([1, 2, 3]);
    });

    it("does not return the initial order if ensurePermuted is true", () => {
        expect(shuffle([1, 2, 3], 8, true)).toEqual([3, 2, 1]);
    });

    it("ignores ensurePermuted if there is nothing to shuffle", () => {
        expect(shuffle([1], 8, true)).toEqual([1]);
    });
});
