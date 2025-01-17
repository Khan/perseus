import deepClone from "./deep-clone";

describe("deepClone", () => {
    it("does nothing to a primitive", () => {
        expect(deepClone(3)).toBe(3);
    });

    it("copies an array", () => {
        const input = [1, 2, 3];

        const result = deepClone(input);

        expect(result).toEqual(input);
        expect(result).not.toBe(input);
    });

    it("recursively clones array elements", () => {
        const input = [[1]];

        const result = deepClone(input);

        expect(result).toEqual(input);
        expect(result[0]).not.toBe(input[0]);
    });
});
