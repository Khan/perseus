import * as line from "../line";

describe("kline", function () {
    it("finds distance to point", () => {
        const result = line.distanceToPoint(
            [
                [-5, 0],
                [5, 0],
            ],
            [0, 5],
        );
        expect(result).toBe(5);
    });

    it("reflects a point", () => {
        const result = line.reflectPoint(
            [
                [-5, -5],
                [5, 5],
            ],
            [0, 5],
        );
        expect(result).toEqual([5, 0]);
    });

    it("finds the midpoint", () => {
        const result = line.midpoint([
            [-5, -5],
            [5, 5],
        ]);
        expect(result).toEqual([0, 0]);
    });

    it("two identical lines should be equal", function () {
        const result = line.equal(
            [
                [1, 1],
                [3, 3],
            ],
            [
                [1, 1],
                [3, 3],
            ],
        );
        expect(result).toBe(true);
    });

    it("two parallel lines should not be equal", function () {
        const result = line.equal(
            [
                [1, 1],
                [3, 3],
            ],
            [
                [1, 2],
                [3, 4],
            ],
        );
        expect(result).toBe(false);
    });

    it("two intersecting lines should not be equal", function () {
        const result = line.equal(
            [
                [1, 1],
                [3, 3],
            ],
            [
                [1, 1],
                [3, 4],
            ],
        );
        expect(result).toBe(false);
    });

    it("two collinear lines should be equal #1", function () {
        const result = line.equal(
            [
                [1, 1],
                [3, 3],
            ],
            [
                [0, 0],
                [5, 5],
            ],
        );
        expect(result).toBe(true);
    });

    it("two collinear lines should be equal #2", function () {
        const result = line.equal(
            [
                [4, 4],
                [5, 5],
            ],
            [
                [0, 0],
                [1, 1],
            ],
        );
        expect(result).toBe(true);
    });

    it("two collinear lines should be equal #3", function () {
        const result = line.equal(
            [
                [0, 0],
                [1, 1],
            ],
            [
                [3, 3],
                [6, 6],
            ],
        );
        expect(result).toBe(true);
    });
});
