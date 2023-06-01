import {parsePointCount} from "./points";

describe("parsePointCount", () => {
    it.each([
        // Special case, 0 means unlimited points
        ["0", "unlimited"],
        // Regular cases, ints as a string
        ["1", 1],
        ["2", 2],
        ["3", 3],
        ["4", 4],
        ["5", 5],
        ["6", 6],
        ["7", 7],
        ["8", 8],
        ["9", 9],
        ["10", 10],
        // Parse-error cases - all map to "unlimited"
        ["non-numeric string", "unlimited"],
        ["one", "unlimited"],
    ])("Should parse %s to %s", (input, expected) => {
        expect(parsePointCount(input)).toEqual(expected);
    });
});
