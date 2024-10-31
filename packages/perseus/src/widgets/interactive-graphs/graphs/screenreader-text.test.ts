import {srFormatNumber} from "./screenreader-text";

describe("srFormatNumber", () => {
    it("trivially converts most integers to strings", () => {
        expect(srFormatNumber(3)).toBe("3");
    });

    it("does not use thousands separators", () => {
        expect(srFormatNumber(1234567)).toBe("1234567");
    });

    it("displays at most 3 decimal places", () => {
        expect(srFormatNumber(0.123456)).toBe("0.123");
    });

    it("rounds to 3 decimal places", () => {
        expect(srFormatNumber(1.2345)).toBe("1.235");
    });

    it("never displays a negative sign on zero", () => {
        expect(srFormatNumber(-0)).toBe("0");
    });
});
