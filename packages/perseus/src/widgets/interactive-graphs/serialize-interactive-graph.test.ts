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
describe("InteractiveGraph serialization", () => {
    function generateBasicInteractiveGraph(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ interactive-graph 1]]",
            widgets: {
                "interactive-graph 1": {
                    type: "interactive-graph",
                    options: {
                        correct: {
                            type: "linear",
                            coords: [
                                [0, 0],
                                [1, 1],
                            ],
                        },
                        graph: {
                            type: "linear",
                            startCoords: [
                                [3, 0],
                                [3, 3],
                            ],
                        },
                        markings: "graph",
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        showProtractor: false,
                        snapStep: [1, 1],
                        step: [1, 1],
                        lockedFigures: [],
                        showAxisArrows: {
                            xMin: true,
                            xMax: true,
                            yMin: true,
                            yMax: true,
                        },
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
        const {renderer} = renderQuestion(generateBasicInteractiveGraph());

        // Act

        // Move a point around
        const interactiveElements = screen.getAllByRole("button");
        const movingElement = interactiveElements[0];
        act(() => movingElement.focus());
        await userEvent.keyboard("{ArrowRight}{ArrowUp}");

        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "interactive-graph 1": {
                    alignment: "default",
                    static: false,
                    labels: ["x", "y"],
                    labelLocation: "onAxis",
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    showAxisArrows: {
                        xMin: true,
                        xMax: true,
                        yMin: true,
                        yMax: true,
                    },
                    step: [1, 1],
                    backgroundImage: {
                        url: null,
                    },
                    markings: "graph",
                    showTooltips: false,
                    showProtractor: false,
                    correct: {
                        type: "linear",
                        coords: [
                            [0, 0],
                            [1, 1],
                        ],
                    },
                    snapStep: [1, 1],
                    lockedFigures: [],
                    // this is user input
                    graph: {
                        type: "linear",
                        startCoords: [
                            [3, 0],
                            [3, 3],
                        ],
                        coords: [
                            [4, 1], // <= important, it's different
                            [3, 3],
                        ],
                    },
                },
            },
            hints: [],
        });
    });
});
