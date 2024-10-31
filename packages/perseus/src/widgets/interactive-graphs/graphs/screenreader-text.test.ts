import {srFormatNumber} from "./screenreader-text";

describe("srFormatNumber", () => {
    it("trivially converts most integers to strings", () => {
        expect(srFormatNumber(3, "en")).toBe("3");
    });

    it("does not use thousands separators", () => {
        expect(srFormatNumber(1234567, "en")).toBe("1234567");
    });

    it("displays at most 3 decimal places", () => {
        expect(srFormatNumber(0.123456, "en")).toBe("0.123");
    });

    it("rounds to 3 decimal places", () => {
        expect(srFormatNumber(1.2345, "en")).toBe("1.235");
    });

    it("never displays a negative sign on zero", () => {
        expect(srFormatNumber(-0, "en")).toBe("0");
    });

    it("uses a locale-appropriate decimal separator", () => {
        expect(srFormatNumber(1.5, "de")).toBe("1,5");
    });
});
