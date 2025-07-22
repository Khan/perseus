import {scorePerseusItem} from "@khanacademy/perseus-score";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {
    getAnswerfulItem,
    getAnswerlessItem,
    scorePerseusItemTesting,
} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./matrix.testdata";

import type {APIOptions} from "../../types";
import type {PerseusMatrixWidgetOptions} from "@khanacademy/perseus-core";
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
        const score = scorePerseusItemTesting(
            question1,
            renderer.getUserInputMap(),
        );

        // assert
        expect(score).toHaveBeenAnsweredCorrectly();
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
        const score = scorePerseusItemTesting(
            question1,
            renderer.getUserInputMap(),
        );

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    describe("interactive: full vs answerless", () => {
        beforeAll(() => {
            registerAllWidgetsForTesting();
        });

        const matrixOptions: PerseusMatrixWidgetOptions = {
            answers: [[5, -2]],
            matrixBoardSize: [1, 2],
            cursorPosition: [0, 0],
            prefix: "",
            suffix: "",
            static: false,
        };

        test("the answerless test data doesn't contain answers", () => {
            expect(
                getAnswerlessItem("matrix", matrixOptions).question.widgets[
                    "matrix 1"
                ].options.answers,
            ).toBeUndefined();
        });

        test.each([
            ["answerless", getAnswerlessItem("matrix", matrixOptions)],
            ["answerful", getAnswerfulItem("matrix", matrixOptions)],
        ])("is interactive with widget options: %p", async (_, item) => {
            // Arrange / Act
            const {renderer} = renderQuestion(item.question);

            await userEvent.type(screen.getAllByRole("textbox")[0], "5");
            await userEvent.type(screen.getAllByRole("textbox")[1], "-2");

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                getAnswerfulItem("matrix", matrixOptions).question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });
});
