import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = {
    content:
        "A sequence is defined recursively as follows:\n\n\n$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} \n~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 input-number 1]]",
    images: {},
    widgets: {
        "input-number 1": {
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "input-number",
            options: {
                size: "normal",
                coefficient: false,
                textAlign: "left",
                answers: [
                    {
                        status: "correct",
                        value: 0.5,
                        maxError: 0,
                        simplify: "required",
                        answerForms: [],
                        message: "",
                        strict: true,
                    },
                ],
            },
            alignment: "default",
        },
    },
};

describe("InputNumber AI utils", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("reports an input-number widget as a numeric-input prompt", async () => {
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
                    type: "numeric-input",
                    label: "",
                    userInput: {
                        value: "40",
                    },
                },
            },
        });
    });
});
