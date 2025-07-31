import validateLabelImage from "./validate-label-image";

import type {PerseusLabelImageUserInput} from "@khanacademy/perseus-core";

describe("validateLabelImage", () => {
    it("returns invalid for undefined user input", function () {
        const userInput = undefined

        const validationError = validateLabelImage(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns invalid for a non-interacted widget", function () {
        const userInput: PerseusLabelImageUserInput = {
            markers: [{label: "England"}, {label: "Germany"}, {label: "Italy"}],
        };

        const validationError = validateLabelImage(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("returns invalid for a widget with not all markers answered", function () {
        const userInput: PerseusLabelImageUserInput = {
            markers: [
                {label: "England", selected: ["Fiat"]},
                {label: "Germany", selected: ["Lamborghini"]},
                {label: "Italy"},
            ],
        };

        const validationError = validateLabelImage(userInput);

        expect(validationError).toHaveInvalidInput();
    });
});
