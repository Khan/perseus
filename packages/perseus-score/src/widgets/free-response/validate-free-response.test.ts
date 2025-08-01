import validateFreeResponse from "./validate-free-response";

import type {PerseusFreeResponseWidgetOptions} from "@khanacademy/perseus-core";

const MOCK_STANDARD_OPTIONS: PerseusFreeResponseWidgetOptions = {
    allowUnlimitedCharacters: false,
    characterLimit: 500,
    placeholder: "Please provide response here",
    question: "Test question",
    scoringCriteria: [{text: "Test criterion"}],
};

describe("free response validation", () => {
    it("should return invalid for undefined user input", () => {
        const result = validateFreeResponse(undefined, MOCK_STANDARD_OPTIONS);
        expect(result).toHaveInvalidInput("USER_INPUT_EMPTY");
    });

    it("should return invalid for empty user input", () => {
        const result = validateFreeResponse(
            {currentValue: ""},
            MOCK_STANDARD_OPTIONS,
        );
        expect(result).toHaveInvalidInput("USER_INPUT_EMPTY");
    });

    it("should return invalid for whitespace-only user input", () => {
        const result = validateFreeResponse(
            {currentValue: "    "},
            MOCK_STANDARD_OPTIONS,
        );
        expect(result).toHaveInvalidInput("USER_INPUT_EMPTY");
    });

    it("should return invalid for user input that is too long", () => {
        const result = validateFreeResponse(
            {currentValue: "1234567890"},
            {
                ...MOCK_STANDARD_OPTIONS,
                allowUnlimitedCharacters: false,
                characterLimit: 9,
            },
        );
        expect(result).toHaveInvalidInput("USER_INPUT_TOO_LONG");
    });

    it("should return null for user input that is at the maximum length", () => {
        const result = validateFreeResponse(
            {currentValue: "1234567890"},
            {
                ...MOCK_STANDARD_OPTIONS,
                allowUnlimitedCharacters: false,
                characterLimit: 10,
            },
        );
        expect(result).toBeNull();
    });

    it("should return null for long input when allowUnlimitedCharacters is true", () => {
        const result = validateFreeResponse(
            {currentValue: "1234567890"},
            {
                ...MOCK_STANDARD_OPTIONS,
                allowUnlimitedCharacters: true,
                characterLimit: 2,
            },
        );
        expect(result).toBeNull();
    });

    it("should return null for non-empty user input that is short enough", () => {
        const result = validateFreeResponse(
            {currentValue: "A short answer"},
            {
                ...MOCK_STANDARD_OPTIONS,
                allowUnlimitedCharacters: false,
                characterLimit: 20,
            },
        );
        expect(result).toBeNull();
    });
});
