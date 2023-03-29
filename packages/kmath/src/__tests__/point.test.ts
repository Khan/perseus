import * as point from "../point";

describe("kpoint", function () {
    it("point.compare should return positive if the first element is larger", function () {
        const result = point.compare([5, 2], [3, 4]);
        expect(result).toBeGreaterThan(0);
    });

    it("point.compare should return negative if the first element is smaller", function () {
        const result = point.compare([2, 2], [4, 0]);
        expect(result).toBeLessThan(0);
    });

    it("point.compare should return positive if the second element is larger", function () {
        const result = point.compare([5, 2], [5, 1]);
        expect(result).toBeGreaterThan(0);
    });

    it("point.compare should return negative if the second element is smaller", function () {
        const result = point.compare([2, 2], [2, 4]);
        expect(result).toBeLessThan(0);
    });

    it("point.compare should return positive if the third element is larger", function () {
        const result = point.compare([5, 3, -2], [5, 3, -4]);
        expect(result).toBeGreaterThan(0);
    });

    it("point.compare should return negative if the third element is smaller", function () {
        const result = point.compare([2, -1, -4], [2, -1, -2]);
        expect(result).toBeLessThan(0);
    });

    it("point.compare should return 0 if the vectors are equal", function () {
        const result = point.compare([2, 4, 3], [2, 4, 3]);
        expect(result).toBe(0);
    });

    it("point.compare should return negative if v1 is shorter than v2", function () {
        const result = point.compare([2, 4], [2, 4, 3]);
        expect(result).toBeLessThan(0);
    });

    it("point.compare should return positive if v1 is longer than v2", function () {
        const result = point.compare([2, 4, -2], [2, 2]);
        expect(result).toBeGreaterThan(0);
    });
});
