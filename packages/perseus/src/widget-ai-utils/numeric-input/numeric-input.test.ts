import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../../widgets/__testutils__/renderQuestion";

import type {NumericInputPromptJSON} from "./prompt-utils";
import type {NumericInputWidget, PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

const question: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 1252,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "",
                size: "normal",
            },
            alignment: "default",
        } as NumericInputWidget,
    },
};

describe("numeric input widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should get prompt json which matches the state of the UI", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);
        const widget = renderer.getWidgetInstance("numeric-input 1");

        // Act
        const answer = "838";
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            answer,
        );

        const json = widget?.getPromptJSON?.() as NumericInputPromptJSON;

        // Assert
        expect(json.userInput.value).toEqual(answer);
    });
});
