import {
    generateExpressionOptions,
    generateExpressionWidget,
    getDefaultAnswerArea,
} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./expression-ai-utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

const expression = {
    question: {
        content: "[[☃ expression 1]]",
        images: {},
        widgets: {
            "expression 1": generateExpressionWidget({
                graded: true,
                version: {major: 1, minor: 0},
                options: generateExpressionOptions({
                    functions: [],
                    buttonsVisible: "always",
                    ariaLabel: "Test aria label",
                    visibleLabel: "Test visible label",
                }),
            }),
        },
    },
    answerArea: getDefaultAnswerArea(),
    hints: [],
};

describe("Expression AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const widgetData: any = {
            visibleLabel: "Enter an expression",
        };

        const resultJSON = getPromptJSON(widgetData, "2 + 2");

        expect(resultJSON).toEqual({
            type: "expression",
            label: "Enter an expression",
            userInput: {
                value: "2 + 2",
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(
            expression.question as PerseusRenderer,
        );
        const widget = renderer.findWidgets("expression 1")[0];

        // Act
        const input = "x+1";
        act(() => widget.insert(input));
        act(() => jest.runOnlyPendingTimers());

        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content: "[[☃ expression 1]]",
            widgets: {
                "expression 1": {
                    type: "expression",
                    label: "Test visible label",
                    userInput: {value: "x+1"},
                },
            },
        });
    });
});
