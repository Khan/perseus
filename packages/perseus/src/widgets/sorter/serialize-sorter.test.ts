import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {renderQuestion} from "../../__tests__/test-utils";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";

import type {PerseusItem} from "@khanacademy/perseus-core";

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
describe("Sorter serialization", () => {
    function generateBasicSorter(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ sorter 1]]",
            widgets: {
                "sorter 1": {
                    type: "sorter",
                    options: {
                        padding: true,
                        layout: "horizontal",
                        correct: ["First", "Second", "Third"],
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

    beforeEach(() => {
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
        const {renderer} = renderQuestion(generateBasicSorter());

        // Just making sure we're shuffling before answering
        expect(
            generateBasicSorter().question.widgets["sorter 1"].options.correct,
        ).not.toEqual(renderer.getUserInput()["sorter 1"].options);

        // Put the options in the correct order
        const sorter = renderer.questionRenderer.findWidgets("sorter 1")[0];
        ["First", "Second", "Third"].forEach((option, index) => {
            act(() => sorter.moveOptionToIndex(option, index));
        });

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "sorter 1": {
                    alignment: "default",
                    static: false,
                    correct: ["First", "Second", "Third"],
                    options: ["First", "Second", "Third"],
                    changed: true,
                    layout: "horizontal",
                    padding: true,
                },
            },
            hints: [],
        });
    });

    it("should restore serialized state", () => {
        // Arrange
        const {renderer} = renderQuestion(generateBasicSorter());

        // Just making sure things start shuffled
        expect(
            generateBasicSorter().question.widgets["sorter 1"].options.correct,
        ).not.toEqual(renderer.getUserInput()["sorter 1"].options);

        // Act
        act(() =>
            renderer.restoreSerializedState({
                question: {
                    "sorter 1": {
                        correct: ["First", "Second", "Third"],
                        options: ["First", "Second", "Third"],
                        changed: true,
                        layout: "horizontal",
                        padding: true,
                    },
                },
                hints: [],
            }),
        );

        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toEqual({
            "sorter 1": {changed: true, options: ["First", "Second", "Third"]},
        });
    });
});
