import {sum} from "./math";

describe("sum", () => {
    it("returns 0 given an empty array", () => {
        expect(sum([])).toBe(0);
    });

    it("adds the numbers in the array", () => {
        expect(sum([1, 2, 5])).toBe(8);
    });
});
