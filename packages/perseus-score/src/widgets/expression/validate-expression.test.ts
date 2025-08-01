import validateExpression from "./validate-expression";

describe("expression validation", () => {
    it("should return invalid for undefined user input", () => {
        const result = validateExpression(undefined);
        expect(result).toHaveInvalidInput();
    });

    it("should return invalid for empty user input", () => {
        const result = validateExpression("");
        expect(result).toHaveInvalidInput();
    });

    it("should return null for non-empty user input", () => {
        const result = validateExpression("x+1");
        expect(result).toBeNull();
    });
});
