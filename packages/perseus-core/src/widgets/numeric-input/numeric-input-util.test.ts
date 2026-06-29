import {getNumericInputPublicWidgetOptions} from "./numeric-input-util";

import type {PerseusNumericInputWidgetOptions} from "../../data-schema";

describe("getNumericInputPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusNumericInputWidgetOptions = {
            answers: [
                {
                    status: "correct",
                    maxError: 0.07,
                    strict: true,
                    value: 1252,
                    answerForms: ["pi"],
                    simplify: "required",
                    message: "the answer is 1252",
                },
            ],
            labelText: "labelText",
            size: "Normal",
            coefficient: false,
            textAlign: "left",
        };

        // Act
        const publicWidgetOptions = getNumericInputPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            labelText: "labelText",
            size: "Normal",
            coefficient: false,
            textAlign: "left",
            answers: [
                {
                    status: "correct",
                    value: null,
                    answerForms: ["pi"],
                    simplify: "required",
                    strict: false,
                    message: "",
                },
            ],
        });
    });
});
