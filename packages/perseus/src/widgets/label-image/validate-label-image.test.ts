import validateLabelImage from "./validate-label-image";

import type {PerseusLabelImageUserInput} from "../../validation.types";

describe("scoreLabelImage", function () {
    it("should not grade non-interacted widget", function () {
        const userInput: PerseusLabelImageUserInput = {
            markers: [{label: "England"}, {label: "Germany"}, {label: "Italy"}],
        } as const;

        const validationError = validateLabelImage(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("should not grade widget with not all markers answered", function () {
        const userInput = {
            markers: [
                {label: "England", selected: ["Fiat"]},
                {label: "Germany", selected: ["Lamborghini"]},
                {label: "Italy"},
            ],
        } as const;

        const validationError = validateLabelImage(userInput);

        expect(validationError).toHaveInvalidInput();
    });
});
