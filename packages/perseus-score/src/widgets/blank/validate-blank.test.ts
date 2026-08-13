import validateBlank from "./validate-blank";

import type {PerseusBlankUserInput} from "@khanacademy/perseus-core";

describe("validateBlank", () => {
    it("is invalid when the user input is undefined", () => {
        const userInput = undefined;

        const validationError = validateBlank(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("is invalid when no tile has been selected", () => {
        const userInput: PerseusBlankUserInput = {
            selected: null,
        };

        const validationError = validateBlank(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("is valid when a tile has been selected", () => {
        const userInput: PerseusBlankUserInput = {
            selected: "answer-tile-1",
        };

        const validationError = validateBlank(userInput);

        expect(validationError).toBeNull();
    });
});
