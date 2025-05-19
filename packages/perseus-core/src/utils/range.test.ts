import {range} from "./range";

describe("range", () => {
    it("returns an empty array when max < min", () => {
        expect(range(3, 2)).toEqual([]);
    });

    it("returns a single item when max = min", () => {
        expect(range(3, 3)).toEqual([3]);
    });

    it("lists numbers between the min and the max, inclusive", () => {
        expect(range(1, 3)).toEqual([1, 2, 3]);
    });
});
