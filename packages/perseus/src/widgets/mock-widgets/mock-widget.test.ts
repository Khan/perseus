import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {UserEvent} from "@testing-library/user-event";

const question1: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 mock-widget 1]] ",
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
                value: "1",
            },
            alignment: "default",
        },
    },
};
const question1AndAnswer: [
    question: PerseusRenderer,
    correct: string,
    incorrect: string,
] = [question1, "1", "2"];

describe("numeric-input widget", () => {
    const [question, correct, incorrect] = question1AndAnswer;

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("Should accept the right answer", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            correct,
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("should reject an incorrect answer", async () => {
        // Arrange
        const {renderer} = renderQuestion(question);

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {hidden: true}),
            incorrect,
        );

        // Assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});
