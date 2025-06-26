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
describe("Matrix serialization", () => {
    function generateBasicMatrix(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ matrix 1]]",
            widgets: {
                "matrix 1": {
                    type: "matrix",
                    options: {
                        answers: [
                            [1, 2],
                            [3, 4],
                        ],
                        matrixBoardSize: [2, 2],
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
        const {renderer} = renderQuestion(generateBasicMatrix());

        await userEvent.type(screen.getAllByRole("textbox")[0], "1");
        await userEvent.type(screen.getAllByRole("textbox")[1], "2");
        await userEvent.type(screen.getAllByRole("textbox")[2], "3");
        await userEvent.type(screen.getAllByRole("textbox")[3], "4");

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "matrix 1": {
                    alignment: "default",
                    static: false,
                    matrixBoardSize: [2, 2],
                    prefix: "",
                    suffix: "",
                    cursorPosition: [1, 1],
                    answers: [
                        ["1", "2"],
                        ["3", "4"],
                    ],
                },
            },
            hints: [],
        });
    });

    it("should restore serialized state", () => {
        // Arrange
        const {renderer} = renderQuestion(generateBasicMatrix());

        // Act
        act(() =>
            renderer.restoreSerializedState({
                question: {
                    "matrix 1": {
                        matrixBoardSize: [2, 2],
                        prefix: "",
                        suffix: "",
                        emptyMatrix: [
                            ["", ""],
                            ["", ""],
                        ],
                        cursorPosition: [1, 1],
                        answers: [
                            ["1", "2"],
                            ["3", "4"],
                        ],
                    },
                },
                hints: [],
            }),
        );

        const userInput = renderer.getUserInput();

        // Assert
        // `answers` would be undefined if we didn't properly restore serialized state
        expect(userInput).toEqual({
            "matrix 1": {
                answers: [
                    ["1", "2"],
                    ["3", "4"],
                ],
            },
        });
    });
});
