import validateNumericInput from "./validate-numeric-input";

describe("validateNumericInput", () => {
    it("should return invalid for empty user input", () => {
        const result = validateNumericInput({currentValue: ""}, {});
        expect(result).toHaveInvalidInput();
    });

    it("should return null for non-empty user input", () => {
        const result = validateNumericInput({currentValue: "1"}, {});
        expect(result).toBeNull();
    });
});
