import {widgetOptionsUpgrades} from "./numeric-input-upgrade";

import type {PerseusNumericInputWidgetOptions} from "../../data-schema";

describe("widgetOptionsUpgrades", () => {
    it("upgrades from 0 to 1", () => {
        // Arrange
        const v0props = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [
                {
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 0.5,
                    simplify: "required",
                    answerForms: ["proper"],
                    message: "",
                },
            ],
        };

        const v1props: PerseusNumericInputWidgetOptions = {
            coefficient: false,
            static: false,
            size: "normal",
            answers: [
                {
                    status: "correct",
                    maxError: null,
                    strict: true,
                    value: 0.5,
                    simplify: "required",
                    answerForms: ["proper"],
                    message: "",
                },
            ],
            fullAnswerForms: [{name: "proper", simplify: "required"}],
        };

        // Act
        const result = widgetOptionsUpgrades["1"](v0props);

        // Assert
        expect(result).toEqual(v1props);
    });
});
