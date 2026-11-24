import {expand, intervalSize} from "./interval";

describe("intervalSize", () => {
    it("returns the difference between the min and the max", () => {
        expect(intervalSize([2, 5])).toBe(3);
    });
});

describe("expand", () => {
    it("extends an interval by the given amount on both ends", () => {
        expect(expand([1, 4], 1)).toEqual([0, 5]);
    });
});
