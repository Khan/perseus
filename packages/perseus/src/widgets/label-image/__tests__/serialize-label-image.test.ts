import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {screen, act} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../../testing/test-dependencies";
import {renderQuestion} from "../../../__tests__/test-utils";
import * as Dependencies from "../../../dependencies";
import {registerAllWidgetsForTesting} from "../../../util/register-all-widgets-for-testing";

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
describe("LabelImage serialization", () => {
    function generateBasicLabelImage(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ label-image 1]]",
            widgets: {
                "label-image 1": {
                    type: "label-image",
                    options: {
                        static: false,
                        choices: ["One", "Two", "Three"],
                        imageAlt: "Alt text",
                        imageUrl:
                            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
                        imageWidth: 415,
                        imageHeight: 314,
                        markers: [
                            {
                                answers: ["One"],
                                label: "Uno",
                                x: 25,
                                y: 17.7,
                            },
                            {
                                answers: ["Two"],
                                label: "Dos",
                                x: 25,
                                y: 35.3,
                            },
                            {
                                answers: ["Three"],
                                label: "Tres",
                                x: 25,
                                y: 53,
                            },
                        ],
                        multipleAnswers: false,
                        hideChoicesFromInstructions: true,
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

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
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
            generateBasicLabelImage(),
            {},
            {startAnswerless: false},
        );

        const markerButton = await screen.findByLabelText("Uno");
        await userEvent.click(markerButton);

        const choice = screen.getByRole("option", {name: "One"});
        await userEvent.click(choice);

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "label-image 1": {
                    alignment: "default",
                    static: false,
                    choices: ["One", "Two", "Three"],
                    imageAlt: "Alt text",
                    imageUrl:
                        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
                    imageWidth: 415,
                    imageHeight: 314,
                    markers: [
                        {
                            answers: ["One"],
                            label: "Uno",
                            x: 25,
                            y: 17.7,
                            selected: ["One"],
                        },
                        {
                            answers: ["Two"],
                            label: "Dos",
                            x: 25,
                            y: 35.3,
                        },
                        {
                            answers: ["Three"],
                            label: "Tres",
                            x: 25,
                            y: 53,
                        },
                    ],
                    multipleAnswers: false,
                    hideChoicesFromInstructions: true,
                },
            },
            hints: [],
        });
    });
});
