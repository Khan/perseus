import {scorePerseusItem} from "@khanacademy/perseus-score";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import * as Dependencies from "../../dependencies";
import {
    testDependencies,
    testDependenciesV2,
} from "../../testing/test-dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";
import {
    getAnswerfulItem,
    getAnswerlessItem,
    scorePerseusItemTesting,
} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import CategorizerExport from "./categorizer";
import {question1} from "./categorizer.testdata";

import type {APIOptions, PerseusDependenciesV2} from "../../types";
import type {PerseusCategorizerWidgetOptions} from "@khanacademy/perseus-core";
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
        const userInput =
            CategorizerExport.getUserInputFromSerializedState(widgetProps);

        // Assert
        expect(userInput).toEqual({values: [1, 0, 0, 0, 1, 1]});
    });

    it("should send analytics event when widget is rendered", () => {
        // Arrange
        const onAnalyticsEventSpy = jest.fn();
        const depsV2: PerseusDependenciesV2 = {
            ...testDependenciesV2,
            analytics: {onAnalyticsEvent: onAnalyticsEventSpy},
        };

        // Act
        renderQuestion(question1, undefined, undefined, undefined, depsV2);

        // Assert
        expect(onAnalyticsEventSpy).toHaveBeenCalledWith({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "categorizer",
                widgetId: "categorizer 1",
            },
        });
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

        const options: PerseusCategorizerWidgetOptions = {
            static: false,
            items: ["Circle", "Purple", "Square"],
            categories: ["Shape", "Color"],
            randomizeItems: false,
            values: [0, 1, 0],
        };

        test("the answerless test data doesn't contain answers", () => {
            expect(
                getAnswerlessItem("categorizer", options).question.widgets[
                    "categorizer 1"
                ].options.values,
            ).toBeUndefined();
        });

        test.each([
            ["answerless", getAnswerlessItem("categorizer", options)],
            ["answerful", getAnswerfulItem("categorizer", options)],
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
                getAnswerfulItem("categorizer", options).question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });
});
