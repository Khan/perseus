import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import {getPromptJSON} from "./input-number-ai-utils";

import type {
    InputNumberWidget,
    PerseusRenderer,
    PerseusInputNumberUserInput,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = {
    content:
        "A sequence is defined recursively as follows:\n\n\n$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} \n~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 input-number 1]]",
    images: {},
    widgets: {
        "input-number 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "input-number",
            options: {
                maxError: 0.1,
                inexact: false,
                value: 0.5,
                simplify: "required",
                answerType: "number",
                size: "normal",
            },
            alignment: "default",
        } as InputNumberWidget,
    },
};

describe("InputNumber AI utils", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            simplify: "optional",
            answerType: "integer",
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "123",
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "input-number",
            options: {
                simplify: "optional",
                answerType: "integer",
            },
            userInput: {
                value: "123",
            },
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const input = "40";
        const textbox = screen.getByRole("textbox");
        await userEvent.click(textbox);
        await userEvent.type(textbox, input);
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "A sequence is defined recursively as follows:\n\n\n$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} \n~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 input-number 1]]",
            widgets: {
                "input-number 1": {
                    type: "input-number",
                    options: {
                        simplify: "required",
                        answerType: "number",
                    },
                    userInput: {
                        value: "40",
                    },
                },
            },
        });
    });
});
