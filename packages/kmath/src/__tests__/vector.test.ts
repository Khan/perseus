import * as vector from "../vector";

describe("kvector", function () {
    it("vector.zip should return empty given empty", function () {
        expect(vector.zip([], [])).toEqual([]);
    });

    it("vector.zip should create vectors from x and y coords", function () {
        expect(vector.zip([1, 2], [3, 4])).toEqual([
            [1, 3],
            [2, 4],
        ]);
    });

    it("vector.zip should ignore extra xs", function () {
        expect(vector.zip([1, 2, 9], [3, 4])).toEqual([
            [1, 3],
            [2, 4],
        ]);
    });

    it("vector.zip should ignore extra ys", function () {
        expect(vector.zip([1, 2], [3, 4, 9])).toEqual([
            [1, 3],
            [2, 4],
        ]);
    });

    it("vector.map should transform a 2D vector", function () {
        const double = (x) => x * 2;
        expect(vector.map([3, 4], double)).toEqual([6, 8]);
    });

    it("vector.map should pass the index of each element to the callback", function () {
        expect(vector.map([3, 4], (_, i) => i)).toEqual([0, 1]);
    });

    it("vector.add should add two 2D vectors", function () {
        const result = vector.add([1, 2], [3, 4]);
        expect(result).toStrictEqual([4, 6]);
    });

    it("vector.add should add two 3D vectors", function () {
        const result = vector.add([1, 2, 3], [4, 5, 6]);
        expect(result).toStrictEqual([5, 7, 9]);
    });

    it("vector.add should add three 2D vectors", function () {
        const result = vector.add([1, 2], [3, 4], [5, 6]);
        expect(result).toStrictEqual([9, 12]);
    });

    it("vector.subtract should subtract two 2D vectors", function () {
        const result = vector.subtract([1, 2], [3, 4]);
        expect(result).toStrictEqual([-2, -2]);
    });

    it("vector.subtract should subtract two 3D vectors", function () {
        const result = vector.subtract([1, 2, 3], [4, 5, 6]);
        expect(result).toStrictEqual([-3, -3, -3]);
    });

    it("vector.dot should take the dot product of 2 2D vectors", function () {
        const result = vector.dot([1, 2], [3, 4]);
        expect(result).toBe(3 + 8);
    });

    it("vector.dot should take the dot product of 2 3D vectors", function () {
        const result = vector.dot([1, 2, 3], [4, 5, 6]);
        expect(result).toBe(4 + 10 + 18);
    });

    it("vector.scale should scale a 2D vector", function () {
        const result = vector.scale([4, 2], 0.5);
        expect(result).toStrictEqual([2, 1]);
    });

    it("vector.scale should scale a 3D vector", function () {
        const result = vector.scale([1, 2, 3], 2);
        expect(result).toStrictEqual([2, 4, 6]);
    });

    it("vector.length should take the length of a 2D vector", function () {
        const result = vector.length([3, 4]);
        expect(result).toBe(5);
    });

    it("vector.length should take the length of a 3D vector", function () {
        const result = vector.length([4, 0, 3]);
        expect(result).toBe(5);
    });

    it("vector.equal should return true on two equal 3D vectors", function () {
        const result = vector.equal([6, 3, 4], [6, 3, 4]);
        expect(result).toBe(true);
    });

    it("vector.equal should return false on two inequal 3D vectors", function () {
        const result = vector.equal([6, 3, 4], [6, 4, 4]);
        expect(result).toBe(false);
    });

    it("vector.equal should return false on a 2D and 3D vector", function () {
        const result = vector.equal([6, 4], [6, 4, 4]);
        expect(result).toBe(false);
    });

    it("vector.equal should return false on a 2D and 3D vector", function () {
        const result = vector.equal([6, 3, 4], [6, 3]);
        expect(result).toBe(false);
    });

    it("vector.equal should return false on a 2D and 3D vector with a trailing 0", function () {
        const result = vector.equal([6, 3, 0], [6, 3]);
        expect(result).toBe(false);
    });

    it("vector.collinear should return true on two collinear vectors of " +
        "the same magnitude but different direction", function () {
        const result = vector.collinear([3, 3], [-3, -3]);
        expect(result).toBe(true);
    });

    it("vector.collinear should return true on two collinear vectors of " +
        "different magnitudes", function () {
        const result = vector.collinear([2, 1], [6, 3]);
        expect(result).toBe(true);
    });

    it("vector.collinear should return false on non-collinear vectors", function () {
        const result = vector.collinear([1, 2], [-1, 2]);
        expect(result).toBe(false);
    });

    it("vector.negate of [-2, 2] is [2, -2]", function () {
        const result = vector.negate([-2, 2]);
        expect(result).toStrictEqual([2, -2]);
    });
});
