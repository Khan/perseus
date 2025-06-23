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
describe("Dropdown serialization", () => {
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

    it("should serialize the current state", async () => {
        // Arrange
        const {renderer} = renderQuestion(generateBasicDropdown());

        await userEvent.click(
            screen.getByRole("combobox", {name: "Select an answer"}),
        );
        await userEvent.click(screen.getByRole("option", {name: "Correct"}));

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

        const userInput = renderer.getUserInput();

        // Assert
        // `value` would be 0 if we didn't properly restore serialized state
        expect(userInput).toEqual({"dropdown 1": {value: 2}});
    });
});
