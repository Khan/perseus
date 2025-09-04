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
describe("Grapher serialization", () => {
    function generateBasicGrapher(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ grapher 1]]",
            widgets: {
                "grapher 1": {
                    type: "grapher",
                    options: {
                        correct: {
                            type: "linear",
                            coords: [
                                [0, 0],
                                [5, 5],
                            ],
                        },
                        availableTypes: ["linear"],
                        graph: {
                            range: [
                                [-10, 10],
                                [-10, 10],
                            ],
                            labels: ["x", "y"],
                            step: [1, 1],
                            snapStep: [1, 1],
                            backgroundImage: {
                                url: null,
                            },
                            markings: "graph",
                            rulerLabel: "",
                            rulerTicks: 10,
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
        const {renderer} = renderQuestion(generateBasicGrapher());

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "grapher 1": {
                    alignment: "default",
                    static: false,
                    availableTypes: ["linear"],
                    graph: {
                        range: [
                            [-10, 10],
                            [-10, 10],
                        ],
                        labels: ["x", "y"],
                        step: [1, 1],
                        snapStep: [1, 1],
                        backgroundImage: {
                            url: null,
                        },
                        markings: "graph",
                        rulerLabel: "",
                        rulerTicks: 10,
                    },
                    // this is the user input
                    plot: {
                        type: "linear",
                        asymptote: null,
                        coords: null,
                    },
                },
            },
            hints: [],
        });
    });
});
