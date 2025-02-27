import getExpressionPublicWidgetOptions from "./expression-util";

import type {PerseusExpressionWidgetOptions} from "../../data-schema";

describe("getExpressionPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusExpressionWidgetOptions = {
            answerForms: [
                {
                    considered: "correct",
                    form: false,
                    simplify: false,
                    value: "123-x",
                },
            ],
            buttonSets: ["basic"],
            functions: ["f", "g", "h"],
            times: false,
            visibleLabel: "the visible label",
            ariaLabel: "the aria label",
            buttonsVisible: "always",
            extraKeys: ["i"],
        };

        // Act
        const publicWidgetOptions = getExpressionPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            times: false,
            buttonSets: ["basic"],
            functions: ["f", "g", "h"],
            buttonsVisible: "always",
            visibleLabel: "the visible label",
            ariaLabel: "the aria label",
            extraKeys: ["i"],
        });
    });
});
