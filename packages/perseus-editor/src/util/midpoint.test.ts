import {describe, expect, it} from "@jest/globals";

import {midpoint} from "./midpoint";

describe("midpoint", () => {
    it("returns point P given (P, P)", () => {
        expect(midpoint([0, 0], [0, 0])).toEqual([0, 0]);
    });

    it("returns a point halfway between two points", () => {
        expect(midpoint([0, 1], [2, 5])).toEqual([1, 3]);
    });

    it("handles negatives", () => {
        expect(midpoint([0, -1], [-2, 5])).toEqual([-1, 2]);
    });
});
