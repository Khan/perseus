import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "./matrix.testdata";

import {renderQuestion} from "../__tests__/renderQuestion";

import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

describe("matrix widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("can be answered correctly", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const correctAnswers = [5, -2, 1, 1, 1, 1, 7, -3, 3, 0, 0, -2];
        const textboxes = await screen.findAllByRole("textbox");
        for (let i = 0; i < textboxes.length; i++) {
            await userEvent.type(textboxes[i], correctAnswers[i].toString());
        }

        renderer.guessAndScore();

        // assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const textboxes = await screen.findAllByRole("textbox");
        for (let i = 0; i < textboxes.length; i++) {
            await userEvent.type(textboxes[i], "1");
        }

        renderer.guessAndScore();

        // Assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});
