import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {scorePerseusItemTesting} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {Categorizer} from "./categorizer";
import {question1} from "./categorizer.testdata";

import type {APIOptions} from "../../types";
import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("categorizer widget", () => {
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

    it("should snapshot on mobile", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("is incorrect when blank", async () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const score = scorePerseusItem(
            question1,
            renderer.getUserInputMap(),
            "en",
        );

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "message": "INVALID_SELECTION_ERROR",
              "type": "invalid",
            }
        `);
    });

    it("can be answered incorrectly", async () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        const firstItem = screen.getAllByRole("row")[0];
        await userEvent.click(firstItem);

        // act
        const score = scorePerseusItem(
            question1,
            renderer.getUserInputMap(),
            "en",
        );

        // assert
        expect(score).toMatchInlineSnapshot(`
            {
              "message": "INVALID_SELECTION_ERROR",
              "type": "invalid",
            }
        `);
    });

    it("can be answered correctly", async () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        // act
        await userEvent.click(
            screen.getAllByRole("button", {name: "No relationship"})[0],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Positive linear relationship",
            })[0],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Negative linear relationship",
            })[1],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Nonlinear relationship",
            })[1],
        );

        const score = scorePerseusItemTesting(
            question1,
            renderer.getUserInputMap(),
        );

        // assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can get user input from props", () => {
        // Arrange
        const widgetProps: any = {
            randomizeItems: false,
            categories: ["true", "false"],
            items: ["0", "1", "object", "array", "null", "undefined"],
            values: [1, 0, 0, 0, 1, 1],
        };

        // Act
        const userInput = Categorizer.getUserInputFromProps(widgetProps);

        // Assert
        expect(userInput).toEqual({values: [1, 0, 0, 0, 1, 1]});
    });

    describe("interactive: full vs answerless", () => {
        beforeAll(() => {
            registerAllWidgetsForTesting();
        });

        let userEvent: UserEvent;
        beforeEach(() => {
            userEvent = userEventLib.setup({
                advanceTimers: jest.advanceTimersByTime,
            });

            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
        });

        function getAnswerfulItem(): PerseusItem {
            const question: PerseusRenderer = {
                content: "[[☃ categorizer 1]]",
                images: {},
                widgets: {
                    "categorizer 1": {
                        type: "categorizer",
                        options: {
                            static: false,
                            items: ["Circle", "Purple", "Square"],
                            categories: ["Shape", "Color"],
                            randomizeItems: false,
                            values: [0, 1, 0],
                        },
                    },
                },
            };

            return generateTestPerseusItem({question});
        }

        function getAnswerlessItem(): PerseusItem {
            return splitPerseusItem(getAnswerfulItem());
        }

        test("the answerless test data doesn't contain answers", () => {
            expect(
                getAnswerlessItem().question.widgets["categorizer 1"].options
                    .values,
            ).toBeUndefined();
        });

        test.each([
            ["answerless", getAnswerlessItem()],
            ["answerful", getAnswerfulItem()],
        ])("is interactive with widget options: %p", async (_, item) => {
            // Arrange / Act
            const {renderer} = renderQuestion(item.question);

            await userEvent.click(
                screen.getAllByRole("button", {name: "Shape"})[0],
            );
            await userEvent.click(
                screen.getAllByRole("button", {name: "Shape"})[2],
            );
            await userEvent.click(
                screen.getAllByRole("button", {
                    name: "Color",
                })[1],
            );

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                getAnswerfulItem().question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });
});
