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
describe("FreeResponse serialization", () => {
    function generateBasicFreeResponse(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ free-response 1]]",
            widgets: {
                "free-response 1": {
                    type: "free-response",
                    options: {
                        allowUnlimitedCharacters: false,
                        characterLimit: 500,
                        placeholder: "test-placeholder",
                        question: "test-question",
                        scoringCriteria: [
                            {
                                text: "test-criterion",
                            },
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
        const {renderer} = renderQuestion(
            generateBasicFreeResponse(),
            {},
            {startAnswerless: false},
        );

        await userEvent.type(
            screen.getByLabelText("test-question"),
            "test-answer",
        );

        // Act
        const state = renderer.getSerializedState();
        const userInput = renderer.getUserInput();

        // Assert
        // FreeResponse doesn't seem to include the user's answer
        // in the serialized state, this assertion just affirms
        // that there _is_ a user input, it's just not serialized
        expect(userInput).toEqual({
            "free-response 1": {
                currentValue: "test-answer",
            },
        });
        expect(state).toEqual({
            question: {
                "free-response 1": {
                    allowUnlimitedCharacters: false,
                    characterLimit: 500,
                    placeholder: "test-placeholder",
                    question: "test-question",
                    scoringCriteria: [
                        {
                            text: "test-criterion",
                        },
                    ],
                },
            },
            hints: [],
        });
    });
});
