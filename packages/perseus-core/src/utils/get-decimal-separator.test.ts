import getDecimalSeparator from "./get-decimal-separator";

describe("getDecimalSeparator", () => {
    it("gets the default decimal separator", () => {
        expect(getDecimalSeparator("en")).toBe(".");
    });
    // Ensure that commas are being returned when expected.
    it("gets the decimal separator for the fr locale", () => {
        expect(getDecimalSeparator("fr")).toBe(",");
    });
    // Edge case: Chrome does not support the ka locale properly.
    it("gets the decimal separator for the ka locale", () => {
        expect(getDecimalSeparator("ka")).toBe(",");
    });
    // Edge case: Marathi returns non-Arabic numerals.
    it("gets the decimal separator for the mr locale", () => {
        expect(getDecimalSeparator("mr")).toBe(".");
    });
    // Edge case: Bengali/Bangla returns non-Arabic numerals.
    it("gets the decimal separator for the bn locale", () => {
        expect(getDecimalSeparator("bn")).toBe(".");
    });
});
