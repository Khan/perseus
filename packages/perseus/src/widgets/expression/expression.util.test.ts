import {expressionItem2} from "./expression.testdata";
import getExpressionPublicWidgetOptions from "./expression.util";

import type {PerseusExpressionWidgetOptions} from "@khanacademy/perseus-core";

describe("getExpressionPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusExpressionWidgetOptions =
            expressionItem2.question.widgets["expression 1"].options;

        // Act
        const publicWidgetOptions = getExpressionPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            times: false,
            buttonSets: ["basic"],
            functions: ["f", "g", "h"],
            buttonsVisible: "always",
        });
    });
});
