import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {registerAllWidgetsForTesting} from "../../../util/register-all-widgets-for-testing";
import {renderQuestion} from "../../__testutils__/renderQuestion";

import type {
    PerseusRadioWidgetOptions,
    PerseusRenderer,
    PerseusItem,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

function getRadioWidgetOptions(): PerseusRadioWidgetOptions {
    return {
        choices: [
            {
                id: "a1b2c3d4-e5f6-4789-a012-345678901234",
                content: "Correct 1",
                correct: true,
            },
            {
                id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                content: "Correct 2",
                correct: true,
            },
            {
                id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
                content: "Incorrect",
                correct: false,
            },
            {
                id: "3e4d5c6b-7a89-4012-b345-6789cdef0123",
                content: "None",
                isNoneOfTheAbove: true,
                correct: false,
            },
        ],

        numCorrect: 2,

        /*
        Radio derives `numCorrect` from answers
        and uses `numCorrect` for instruction text if both:
        1. multipleSelect is true
        2. countChoices is true

        Since answers can't continue to be on the FE,
        we need to assert that this functionality continues
        to work without answers
        */
        multipleSelect: true,
        countChoices: true,

        hasNoneOfTheAbove: false,
        randomize: false,
        deselectEnabled: false,
    };
}

function getAnswerfulItem(): PerseusItem {
    const question: PerseusRenderer = {
        content: "[[☃ radio 1]]",
        images: {},
        widgets: {
            "radio 1": {
                type: "radio",
                options: getRadioWidgetOptions(),
            },
        },
    };

    return generateTestPerseusItem({question});
}

function getAnswerlessItem(): PerseusItem {
    return splitPerseusItem(getAnswerfulItem());
}

describe("interactive: full vs answerless", () => {
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

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    test.each(["answerless", "answerful"])(
        "is interactive with widget options: %p",
        async (e) => {
            // Arrange
            const useAnswerless = e === "answerless";
            const renderItem = useAnswerless
                ? getAnswerlessItem()
                : getAnswerfulItem();

            // Act
            const {renderer} = renderQuestion(renderItem.question);

            await userEvent.click(
                screen.getByRole("checkbox", {name: "(Choice A) Correct 1"}),
            );
            await userEvent.click(
                screen.getByRole("checkbox", {name: "(Choice B) Correct 2"}),
            );

            // assert that functionality previous based on answers still works
            expect(screen.getByRole("group", {name: "Choose 2 answers:"}));

            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                getAnswerfulItem().question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        },
    );
});
