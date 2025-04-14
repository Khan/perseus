import {ItemExtras} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./expression-ai-utils";

import type {
    PerseusAnswerArea,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

const expression = {
    question: {
        content: "[[☃ expression 1]]",
        images: {},
        widgets: {
            "expression 1": {
                type: "expression",
                graded: true,
                options: {
                    answerForms: [],
                    times: false,
                    buttonSets: ["basic"],
                    functions: [],
                    buttonsVisible: "always",
                    ariaLabel: "Test aria label",
                    visibleLabel: "Test visible label",
                },
                version: {major: 1, minor: 0},
            },
        },
    },
    answerArea: Object.fromEntries(
        ItemExtras.map((extra) => [extra, false]),
    ) as PerseusAnswerArea,
    hints: [],
};

describe("Expression AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            visibleLabel: "Enter an expression",
        };

        const resultJSON = getPromptJSON(renderProps, "2 + 2");

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
