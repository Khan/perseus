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

const expectedSerializedRadio = {
    alignment: "default",
    static: false,
    numCorrect: 1,
    hasNoneOfTheAbove: false,
    multipleSelect: false,
    countChoices: false,
    deselectEnabled: false,
    choices: [
        {
            id: "2468ace0-1357-4bdf-9024-68ace1357bdf",
            content: "Content 4",
            correct: false,
            originalIndex: 3, // <= note we stash original index
        },
        {
            id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
            content: "Content 2",
            correct: false,
            originalIndex: 1,
        },
        {
            id: "a1b2c3d4-e5f6-4789-a012-345678901234",
            content: "Content 1",
            correct: true,
            originalIndex: 0,
        },
        {
            id: "9c8b7a65-4321-4fed-9876-543210fedcba",
            content: "Content 3",
            correct: false,
            originalIndex: 2,
        },
    ],
    // no idea what this is, it doesn't seem to change...
    selectedChoices: [false, false, true, false],
    choiceStates: [
        {
            selected: true, // <= note we stash user input
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
            readOnly: false,
        },
        {
            selected: false,
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
            readOnly: false,
        },
        {
            selected: false,
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
            readOnly: false,
        },
        {
            selected: false,
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
            readOnly: false,
        },
    ],
};

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
describe("Radio serialization", () => {
    function generateBasicRadio(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        numCorrect: 1,
                        randomize: true, // <= important
                        choices: [
                            {
                                id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                                content: "Content 1",
                                correct: true,
                            },
                            {
                                id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                                content: "Content 2",
                                correct: false,
                            },
                            {
                                id: "9c8b7a65-4321-4fed-9876-543210fedcba",
                                content: "Content 3",
                                correct: false,
                            },
                            {
                                id: "2468ace0-1357-4bdf-9024-68ace1357bdf",
                                content: "Content 4",
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
    let mathRandomSpy: jest.SpyInstance;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mock Math.random to return a deterministic sequence for consistent test results
        mathRandomSpy = jest.spyOn(Math, "random");
        let callCount = 0;
        mathRandomSpy.mockImplementation(() => {
            // This ensures consistent shuffling behavior in radio widgets
            const values = [0.3, 0.2, 0.4, 0.1, 0.5, 0.9, 0.8, 0.7, 0.6];
            return values[callCount++ % values.length];
        });
    });

    afterEach(() => {
        // Restore Math.random to its original implementation
        mathRandomSpy.mockRestore();
    });

    it("should serialize the current state", async () => {
        // Arrange
        const {renderer} = renderQuestion(generateBasicRadio());

        const preAnswerState = renderer.getSerializedState();

        // select the first options
        const radioInputs = screen.getAllByRole("radio");
        await userEvent.click(radioInputs[0]);

        // Act
        const postAnswerState = renderer.getSerializedState();

        // Assert
        expect(
            preAnswerState.question["radio 1"].choicesSelected,
        ).toBeUndefined();
        expect(postAnswerState.question["radio 1"]).toEqual(
            expectedSerializedRadio,
        );
    });

    it("should restore serialized state", () => {
        // Arrange
        const {renderer} = renderQuestion(generateBasicRadio());

        const preUserInput = renderer.getUserInput();

        // Act
        act(() =>
            renderer.restoreSerializedState({
                question: {
                    "radio 1": expectedSerializedRadio,
                },
                hints: [],
            }),
        );

        const postUserInput = renderer.getUserInput();

        // Assert
        // compare pre- and post-restore user input
        // to show it's properly restored
        expect(preUserInput).toEqual({
            "radio 1": {
                choicesSelected: [false, false, false, false],
            },
        });
        expect(postUserInput).toEqual({
            "radio 1": {
                // note we unshuffle!
                // in expectedSerializedRadio.choiceStates the first element
                // is selected; here the last element is selected
                choicesSelected: [false, false, false, true],
            },
        });
    });
});
