import validateLabelImage from "./validate-label-image";

import type {PerseusLabelImageUserInput} from "@khanacademy/perseus-core";

describe("scoreLabelImage", () => {
    it("should not grade non-interacted widget", function () {
        const userInput: PerseusLabelImageUserInput = {
            markers: [{label: "England"}, {label: "Germany"}, {label: "Italy"}],
        };

        const validationError = validateLabelImage(userInput);

        expect(validationError).toHaveInvalidInput();
    });

    it("should not grade widget with not all markers answered", function () {
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
