import getNumericInputPublicWidgetOptions from "./numeric-input-util";

import type {PerseusNumericInputWidgetOptions} from "../../data-schema";

describe("getNumericInputPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusNumericInputWidgetOptions = {
            answers: [
                {
                    status: "correct",
                    maxError: null,
                    strict: false,
                    value: 1252,
                    simplify: "required",
                    message: "",
                },
            ],
            labelText: "labelText",
            size: "Normal",
            coefficient: false,
            rightAlign: false,
            static: false,
            answerForms: [{simplify: "required", name: "decimal"}],
        };

        // Act
        const publicWidgetOptions = getNumericInputPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            labelText: "labelText",
            size: "Normal",
            coefficient: false,
            rightAlign: false,
            static: false,
            answerForms: [{simplify: "required", name: "decimal"}],
        });
    });
});
