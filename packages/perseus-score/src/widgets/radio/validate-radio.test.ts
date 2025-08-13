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
            choicesSelected: [
                {id: "0-0-0-0-0", selected: false},
                {id: "1-1-1-1-1", selected: false},
                {id: "2-2-2-2-2", selected: false},
                {id: "3-3-3-3-3", selected: false},
            ],
        };

        const validationError = validateRadio(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns null when validation passes", () => {
        const userInput: PerseusRadioUserInput = {
            choicesSelected: [
                {id: "0-0-0-0-0", selected: true},
                {id: "1-1-1-1-1", selected: false},
                {id: "2-2-2-2-2", selected: false},
                {id: "3-3-3-3-3", selected: false},
            ],
        };

        const validationError = validateRadio(userInput);

        expect(validationError).toBeNull();
    });
});
