import validateNumericInput from "./validate-numeric-input";

describe("validateNumericInput", () => {
    it("should return null always", () => {
        expect(validateNumericInput({currentValue: "1"}, {})).toBeNull();
    });
});
