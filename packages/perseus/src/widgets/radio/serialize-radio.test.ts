import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../../__tests__/test-utils";
import * as Dependencies from "../../dependencies";
import {testDependencies} from "../../testing/test-dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const expectedSerializedRadio = {
    alignment: "default",
    numCorrect: 1,
    hasNoneOfTheAbove: false,
    choices: [
        {
            id: "5-5-5-5-5",
            content: "Content 4",
            correct: false,
            originalIndex: 3, // <= note we stash original index
        },
        {
            id: "3-3-3-3-3",
            content: "Content 2",
            correct: false,
            originalIndex: 1,
        },
        {
            id: "0-0-0-0-0",
            content: "Content 1",
            correct: true,
            originalIndex: 0,
        },
        {
            id: "4-4-4-4-4",
            content: "Content 3",
            correct: false,
            originalIndex: 2,
        },
    ],
    choiceStates: [
        {
            selected: true, // <= note we stash user input
            // TODO (LEMS-3185): REMOVE THESE FIELDS
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
            readOnly: false,
        },
        {
            selected: false,
            // TODO (LEMS-3185): REMOVE THESE FIELDS
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
            readOnly: false,
        },
        {
            selected: false,
            // TODO (LEMS-3185): REMOVE THESE FIELDS
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
            readOnly: false,
        },
        {
            selected: false,
            // TODO (LEMS-3185): REMOVE THESE FIELDS
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
describe("Radio widget serialization", () => {
    function generateBasicRadioContent(): PerseusItem {
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
                                id: "0-0-0-0-0",
                                content: "Content 1",
                                correct: true,
                            },
                            {
                                id: "3-3-3-3-3",
                                content: "Content 2",
                                correct: false,
                            },
                            {
                                id: "4-4-4-4-4",
                                content: "Content 3",
                                correct: false,
                            },
                            {
                                id: "5-5-5-5-5",
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
        const {renderer} = renderQuestion(generateBasicRadioContent());

        const preAnswerState = renderer.getSerializedState();

        // select the first options
        const choiceInputs = screen.getAllByRole("button");
        await userEvent.click(choiceInputs[0]);

        // Act
        const postAnswerState = renderer.getSerializedState();

        // Assert
        expect(
            preAnswerState.question["radio 1"].selectedChoiceIds,
        ).toBeUndefined();
        expect(postAnswerState.question["radio 1"]).toEqual(
            expectedSerializedRadio,
        );
    });
});
