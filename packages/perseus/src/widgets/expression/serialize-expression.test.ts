import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen, act} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {renderQuestion} from "../../__tests__/test-utils";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

/**
 * [LEMS-3185] These are tests for the legacy Serialization API.
 *
 * This API is not built in a way that supports migrating data
 * between versions of Perseus JSON. In fact serialization
 * doesn't use WidgetOptions, but RenderProps; it's leveraging
 * what is considered an internal implementation detail to support
 * rehydrating previous state.
 *
 * The API is very fragile and likely broken. We have a ticket to remove it.
 * However we don't have the bandwidth to implement an alternative right now,
 * so I'm adding tests to make sure we're roughly still able to support
 * what little we've been supporting so far.
 *
 * This API needs to be removed and these tests need to be removed with it.
 */
describe("Expression serialization", () => {
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

    afterEach(() => {
        // The Renderer uses a timer to wait for widgets to complete rendering.
        // If we don't spin the timers here, then the timer fires in the test
        // _after_ and breaks it because we do setState() in the callback,
        // and by that point the component has been unmounted.
        act(() => jest.runOnlyPendingTimers());
    });

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
