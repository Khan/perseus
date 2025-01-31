import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {registerWidget} from "../../widgets";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";
import MockWidgetExport from "../../widgets/mock-widgets/mock-widget";

import type {MockWidget} from "../../widgets/mock-widgets/mock-widget-types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = {
    content:
        "A sequence is defined recursively as follows:\n\n\n$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} \n~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 mock-widget 1]]",
    images: {},
    widgets: {
        "mock-widget 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "mock-widget",
            options: {
                value: "42",
            },
            alignment: "default",
        } satisfies MockWidget,
    },
};

describe("mock-widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        registerWidget("mock-widget", MockWidgetExport);

        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const input = "40";
        const textbox = screen.getByRole("textbox");
        await userEvent.type(textbox, input);
        const json = renderer.getPromptJSON();

        // Assert
        expect(json).toEqual({
            content:
                "A sequence is defined recursively as follows:\n\n\n$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} \n~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 mock-widget 1]]",
            widgets: {
                "mock-widget 1": {
                    type: "mock-widget",
                    options: {
                        value: "42",
                    },
                    userInput: {
                        value: "40",
                    },
                },
            },
        });
    });
});
