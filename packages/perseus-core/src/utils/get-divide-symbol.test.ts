import {getDivideSymbol, getDivideSymbolForTex} from "./get-divide-symbol";

describe("getDecimalSeparator", () => {
    it("gets the default decimal separator", () => {
        expect(getDivideSymbol("en")).toBe("/");
    });

    it("gets the decimal separator for the uk locale", () => {
        expect(getDivideSymbol("uk")).toBe(":");
    });

    it("gets the decimal separator for the pt-pt locale", () => {
        expect(getDivideSymbol("pt-pt")).toBe(":");
    });
});

describe("getDivideSymbolForTex", () => {
    it("gets the default divide symbol for TeX", () => {
        expect(getDivideSymbolForTex("en")).toBe("\\div");
    });
});
