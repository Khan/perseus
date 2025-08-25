import validateRadio from "./validate-radio";

import type {PerseusRadioUserInput} from "@khanacademy/perseus-core";

describe("validateRadio", () => {
    it("is invalid when the user input is null", () => {
        const userInput = undefined;

        const validationError = validateRadio(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("is invalid when no options are selected", () => {
        const userInput: PerseusRadioUserInput = {
            selectedChoiceIds: [],
        };

        const validationError = validateRadio(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns null when validation passes", () => {
        const userInput: PerseusRadioUserInput = {
            selectedChoiceIds: ["0-0-0-0-0"],
        };

        const validationError = validateRadio(userInput);

        expect(validationError).toBeNull();
    });
});
