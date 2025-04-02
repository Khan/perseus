import Util from "./util";

describe("firstNumericalParse", () => {
    it("regression LEMS-2962: handles fractions properly", () => {
        expect(Util.firstNumericalParse("6/8")).toBe(0.75);
    });
});
