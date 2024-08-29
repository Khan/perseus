import {trim} from "./interval";

describe("trim", () => {
    it("does nothing given amount 0", () => {
        const result = trim(0, [2, 5]);
        expect(result).toEqual([2, 5]);
    });

    it("removes the given amount from each end of the interval", () => {
        const result = trim(1, [2, 5]);
        expect(result).toEqual([3, 4]);
    });

    it("does not let the size of the interval go below zero", () => {
        const result = trim(9, [2, 5]);
        expect(result).toEqual([3.5, 3.5]);
    });

    it("expands the interval when amount is negative", () => {
        const result = trim(-1, [2, 5]);
        expect(result).toEqual([1, 6]);
    });
});
