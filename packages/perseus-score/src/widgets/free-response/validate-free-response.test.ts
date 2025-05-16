import validateFreeResponse from "./validate-free-response";

describe("free response validation", () => {
    it("should return invalid for empty user input", () => {
        const result = validateFreeResponse({currentValue: ""});
        expect(result).toHaveInvalidInput();
    });

    it("should return null for non-empty user input", () => {
        const result = validateFreeResponse({currentValue: "A short answer"});
        expect(result).toBeNull();
    });
});
