import validateFreeResponse from "./validate-free-response";

describe("free response validation", () => {
    it("should return invalid for empty user input", () => {
        const result = validateFreeResponse({currentValue: ""});
        expect(result).toHaveInvalidInput("USER_INPUT_EMPTY");
    });

    it("should return invalid for whitespace-only user input", () => {
        const result = validateFreeResponse({currentValue: "    "});
        expect(result).toHaveInvalidInput("USER_INPUT_EMPTY");
    });

    it("should return null for non-empty user input", () => {
        const result = validateFreeResponse({currentValue: "A short answer"});
        expect(result).toBeNull();
    });
});
