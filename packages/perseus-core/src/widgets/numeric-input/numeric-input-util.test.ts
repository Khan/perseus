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
                    answerForms: ["pi"],
                    simplify: "required",
                    message: "",
                },
            ],
            labelText: "labelText",
            size: "Normal",
            coefficient: false,
            rightAlign: false,
            static: false,
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
            answers: [
                {
                    status: "correct",
                    answerForms: ["pi"],
                    simplify: "required",
                },
            ],
        });
    });
});
