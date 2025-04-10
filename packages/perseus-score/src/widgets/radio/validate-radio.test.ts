import validateRadio from "./validate-radio";

import type {PerseusRadioUserInput} from "@khanacademy/perseus-core";

describe("validateRadio", () => {
    it("is invalid when no options are selected", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [false, false, false, false],
        };

        const validationError = validateRadio(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns null when validation passes", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [true, false, false, false],
        };

        const validationError = validateRadio(userInput);

        expect(validationError).toBeNull();
    });
});
