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
describe("Categorizer serialization", () => {
    function generateBasicCategorizer(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ categorizer 1]]",
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    options: {
                        categories: ["one", "two", "three"],
                        items: ["uno", "dos", "tres"],
                        randomizeItems: true,
                        values: [],
                        static: false,
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
        const {renderer} = renderQuestion(generateBasicCategorizer());

        await userEvent.click(screen.getAllByRole("button", {name: "one"})[0]);

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "categorizer 1": {
                    categories: ["one", "two", "three"],
                    items: ["uno", "dos", "tres"],
                    randomizeItems: true,
                    /**
                     * values is the user input;
                     * the index of the array represents which item the answer if for,
                     * the number at the index represents which category is selected for that item
                     */
                    values: [undefined, 0],
                },
            },
            hints: [],
        });
    });

    it("should restore serialized state", () => {
        // Arrange
        const {renderer} = renderQuestion(generateBasicCategorizer());

        // Act
        act(() =>
            renderer.restoreSerializedState({
                question: {
                    "categorizer 1": {
                        categories: ["one", "two", "three"],
                        items: ["uno", "dos", "tres"],
                        randomizeItems: true,
                        values: [undefined, 0],
                    },
                },
                hints: [],
            }),
        );

        const userInput = renderer.getUserInput();

        // Assert
        // `values` would be [] if we didn't properly restore serialized state
        expect(userInput).toEqual({"categorizer 1": {values: [undefined, 0]}});
    });
});
