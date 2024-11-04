import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {InputNumberPromptJSON} from "./prompt-utils";
import type {InputNumberWidget, PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = {
    content:
        'Akshat works in a hospital lab.\n\nTo project blood quantities, he wants to know the probability that more than $1$ of the next $7$ donors will have type-A blood. From his previous work, Sorin knows that $\\dfrac14$ of donors have type-A blood.\n\nAkshat uses a computer to produce many samples that simulate the next $7$ donors. The first $8$ samples are shown in the table below where "$\\text{\\red{A}}$" represents a donor *with* type-A blood, and "$\\text{\\blue{Z}}$" represents a donor *without* type-A blood.\n\n**Based on the samples below, estimate the probability that  more than $1$ of the next $7$ donors will have type-A blood.** If necessary, round your answer to the nearest hundredth. [[\u2603 input-number 1]]\n\n*Note: This a small sample to practice with. A larger sample could give a much better estimate.*\n\n | Sample |\n:-: | :-: | \n$1$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$\n$2$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$3$ | $\\text{\\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$4$ | $\\text{\\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$5$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\red{A}}$\n$6$ | $\\text{\\blue{Z}, \\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$7$ | $\\text{\\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}}$\n$8$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$\n\n',
    images: Object.freeze({}),
    widgets: {
        "input-number 1": {
            type: "input-number",
            graded: true,
            options: {
                maxError: 0.1,
                inexact: false,
                value: 0.5,
                simplify: "optional",
                answerType: "percent",
                size: "small",
            },
        } as InputNumberWidget,
    },
};

describe("input-number widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);
        const widget = renderer.getWidgetInstance("input-number 1");
        const options = question.widgets["input-number 1"].options;

        // Act
        const input = "40";
        const textbox = screen.getByRole("textbox");
        await userEvent.click(textbox);
        await userEvent.type(textbox, input);
        const json = widget?.getPromptJSON?.() as InputNumberPromptJSON;

        // Assert
        expect(json).toEqual({
            type: "input-number",
            options: {
                simplify: options.simplify,
                answerType: options.answerType,
            },
            userInput: {
                value: input,
            },
        });
    });
});
