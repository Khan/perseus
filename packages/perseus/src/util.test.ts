import Util from "./util";

describe("firstNumericalParse", () => {
    it("regression LEMS-2962: handles fractions properly", () => {
        expect(Util.firstNumericalParse("6/8")).toBe(0.75);
    });
});

describe("stringArrayOfSize", () => {
    it("makes an array of strings", () => {
        expect(Util.stringArrayOfSize(2)).toEqual(["", ""]);
    });
});

describe("stringArrayOfSize2D", () => {
    it("makes a 2D array of strings", () => {
        expect(Util.stringArrayOfSize2D({rows: 2, columns: 4})).toEqual([
            ["", "", "", ""],
            ["", "", "", ""],
        ]);
    });
});
