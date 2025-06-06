import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen, act} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../testing/test-dependencies";
import {itemWithMockWidget} from "../__testdata__/server-item-renderer.testdata";
import * as Dependencies from "../dependencies";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing";
import {registerWidget} from "../widgets";
import {MockWidget} from "../widgets/mock-widgets";

import {renderQuestion} from "./test-util";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("ServerItemRenderer state serialization/restoration", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
        registerWidget("mock-widget", MockWidget);
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

    afterEach(() => {
        // The Renderer uses a timer to wait for widgets to complete rendering.
        // If we don't spin the timers here, then the timer fires in the test
        // _after_ and breaks it because we do setState() in the callback,
        // and by that point the component has been unmounted.
        act(() => jest.runOnlyPendingTimers());
    });

    describe("MockWidget", () => {
        it("should serialize the current state", async () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...itemWithMockWidget,
                hints: [
                    {content: "Hint #1", images: {}, widgets: {}},
                    {content: "Hint #2", images: {}, widgets: {}},
                    {content: "Hint #3", images: {}, widgets: {}},
                ],
            });
            await userEvent.type(screen.getByRole("textbox"), "-42");

            // Act
            const state = renderer.getSerializedState();

            // Assert
            expect(state).toEqual({
                hints: [{}, {}, {}],
                question: {
                    "mock-widget 1": {
                        currentValue: "-42",
                        value: "3",
                    },
                },
            });
        });

        it("should restore serialized state", () => {
            // Arrange
            const callback = jest.fn();
            const {renderer} = renderQuestion(itemWithMockWidget);

            // Act
            act(() =>
                renderer.restoreSerializedState(
                    {
                        hints: [{}, {}, {}],
                        question: {
                            "mock-widget 1": {
                                currentValue: "-42",
                            },
                        },
                    },
                    callback,
                ),
            );
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(callback).toHaveBeenCalled();
            expect(screen.getByRole("textbox")).toHaveValue("-42");
        });
    });

    describe("Dropdown", () => {
        function generateBasicDropdown(): PerseusItem {
            const question = generateTestPerseusRenderer({
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": {
                        type: "dropdown",
                        options: {
                            static: false,
                            placeholder: "Choose",
                            choices: [
                                {
                                    content: "Correct",
                                    correct: true,
                                },
                                {
                                    content: "Incorrect",
                                    correct: false,
                                },
                            ],
                        },
                    },
                },
            });
            const item = generateTestPerseusItem({question});
            return item;
        }

        it("should serialize the current state", async () => {
            // Arrange
            const {renderer} = renderQuestion(generateBasicDropdown());

            await userEvent.click(
                screen.getByRole("combobox", {name: "Select an answer"}),
            );
            await userEvent.click(
                screen.getByRole("option", {name: "Correct"}),
            );

            // Act
            const state = renderer.getSerializedState();

            // Assert
            expect(state).toEqual({
                question: {
                    "dropdown 1": {
                        choices: ["Correct", "Incorrect"],
                        placeholder: "Choose",
                        // selected is added to Dropdown props and
                        // represents user input
                        selected: 1,
                    },
                },
                hints: [],
            });
        });

        it("should restore serialized state", () => {
            // Arrange
            const {renderer} = renderQuestion(generateBasicDropdown());

            let userInput = renderer.getUserInput();
            expect(userInput).toEqual({"dropdown 1": {value: 0}});

            // Act
            act(() =>
                renderer.restoreSerializedState({
                    question: {
                        "dropdown 1": {
                            choices: ["Correct", "Incorrect"],
                            placeholder: "Choose",
                            selected: 2,
                        },
                    },
                    hints: [],
                }),
            );

            userInput = renderer.getUserInput();

            // Assert
            expect(userInput).toEqual({"dropdown 1": {value: 2}});
        });
    });

    describe("Expression", () => {
        function generateBasicExpression(): PerseusItem {
            const question = generateTestPerseusRenderer({
                content: "[[☃ expression 1]]",
                widgets: {
                    "expression 1": {
                        type: "expression",
                        options: {
                            answerForms: [
                                {
                                    considered: "correct",
                                    form: true,
                                    simplify: false,
                                    value: "42",
                                },
                            ],
                            buttonSets: [],
                            functions: [],
                            times: false,
                        },
                    },
                },
            });
            const item = generateTestPerseusItem({question});
            return item;
        }

        it("should serialize the current state", async () => {
            // Arrange
            const {renderer} = renderQuestion(generateBasicExpression());

            await userEvent.type(screen.getByRole("textbox"), "42");
            act(() => jest.runOnlyPendingTimers());

            // Act
            const state = renderer.getSerializedState();
            const userInput = renderer.getUserInput();

            // Assert
            expect(userInput).toEqual({"expression 1": "42"});
            expect(state).toEqual({
                question: {
                    "expression 1": {
                        keypadConfiguration: {
                            keypadType: "EXPRESSION",
                            times: false,
                        },
                        times: false,
                        functions: [],
                        buttonSets: [],
                        analytics: {
                            onAnalyticsEvent: expect.any(Function),
                        },
                        handleUserInput: expect.any(Function),
                        alignment: "default",
                        static: false,
                        showSolutions: "none",
                        reviewModeRubric: null,
                        reviewMode: false,
                        isLastUsedWidget: false,
                        linterContext: {
                            contentType: "",
                            highlightLint: false,
                            paths: [],
                            stack: ["question", "widget"],
                        },
                        value: "42",
                    },
                },
                hints: [],
            });
        });

        it("should restore serialized state", () => {
            // Arrange
            const {renderer} = renderQuestion(generateBasicExpression());

            let userInput = renderer.getUserInput();
            expect(userInput).toEqual({"expression 1": ""});

            // Act
            act(() =>
                renderer.restoreSerializedState({
                    question: {
                        "expression 1": {
                            keypadConfiguration: {
                                keypadType: "EXPRESSION",
                                times: false,
                            },
                            times: false,
                            functions: [],
                            buttonSets: [],
                            analytics: {
                                onAnalyticsEvent: expect.any(Function),
                            },
                            alignment: "default",
                            static: false,
                            showSolutions: "none",
                            reviewModeRubric: null,
                            reviewMode: false,
                            isLastUsedWidget: false,
                            linterContext: {
                                contentType: "",
                                highlightLint: false,
                                paths: [],
                                stack: ["question", "widget"],
                            },
                            value: "42",
                        },
                    },
                    hints: [],
                }),
            );

            userInput = renderer.getUserInput();

            // Assert
            // user input would be "" if we didn't properly restore serialized state
            expect(userInput).toEqual({"expression 1": "42"});
        });
    });
});
