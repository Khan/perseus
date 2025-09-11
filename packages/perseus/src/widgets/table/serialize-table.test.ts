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
 * doesn't use WidgetOptions, but manipulated widget props; it's leveraging
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
describe("Table serialization", () => {
    function generateBasicTable(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ table 1]]",
            widgets: {
                "table 1": {
                    type: "table",
                    options: {
                        headers: ["Column 1", "Column 2"],
                        rows: 2,
                        columns: 2,
                        answers: [
                            ["42", "42"],
                            ["42", "42"],
                        ],
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
        const {renderer} = renderQuestion(generateBasicTable());

        const preAnswerState = renderer.getSerializedState();

        const inputs = screen.getAllByRole("textbox");
        for (let i = 0; i < 4; i++) {
            await userEvent.type(inputs[i], "8");
        }

        // Act
        const postAnswerState = renderer.getSerializedState();

        // Assert
        // make sure the pre-answer and post-answer states are different,
        // to show that Table is reusing `answers` for multiple purposes
        // (correct answer and user input)
        expect(preAnswerState.question["table 1"].answers).not.toEqual(
            postAnswerState.question["table 1"].answers,
        );
        expect(postAnswerState).toEqual({
            question: {
                "table 1": {
                    alignment: "default",
                    static: false,
                    headers: ["Column 1", "Column 2"],
                    rows: 2,
                    columns: 2,
                    answers: [
                        ["8", "8"], // <= important
                        ["8", "8"], // <= important
                    ],
                },
            },
            hints: [],
        });
    });
});
