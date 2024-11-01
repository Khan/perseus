import {act} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ItemExtras} from "../../perseus-types";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {ExpressionPromptJSON} from "./prompt-utils";
import type {PerseusAnswerArea, PerseusRenderer} from "../../perseus-types";

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
    answer: null,
    answerArea: Object.fromEntries(
        ItemExtras.map((extra) => [extra, false]),
    ) as PerseusAnswerArea,
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
};

describe("expression widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(
            expression.question as PerseusRenderer,
        );
        const widget = renderer.findWidgets("expression 1")[0];
        const expressionOptions =
            expression.question.widgets["expression 1"].options;

        // Act
        const input = "x+1";
        act(() => widget.insert(input));
        act(() => jest.runOnlyPendingTimers());

        const json = widget?.getPromptJSON?.() as ExpressionPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "expression",
            label: expressionOptions.visibleLabel,
            userInput: {value: input},
        });
    });
});
