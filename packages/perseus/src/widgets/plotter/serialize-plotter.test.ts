import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
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
describe("Plotter serialization", () => {
    function generateBasicPlotter(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content:
                "Match the horizontal with the vertical.\n\n[[☃ plotter 1]]",
            images: {},
            widgets: {
                "plotter 1": {
                    type: "plotter",
                    options: {
                        categories: ["0", "1", "2"],
                        plotDimensions: [300, 300],
                        correct: [0, 1, 2],
                        labels: ["Horizontal", "Vertical"],
                        maxY: 2,
                        scaleY: 1,
                        snapsPerLine: 1,
                        starting: [0, 0, 0],
                        type: "bar",
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
        const {renderer} = renderQuestion(generateBasicPlotter());

        const [plotter] = renderer.questionRenderer.findWidgets("plotter 1");
        act(() => plotter._testInsertUserInput([3, 3, 3]));

        // Act
        const state = renderer.getSerializedState();
        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toEqual({
            "plotter 1": [3, 3, 3],
        });
        expect(state).toEqual({
            question: {
                "plotter 1": {
                    alignment: "default",
                    static: false,
                    scaleY: 1,
                    maxY: 2,
                    snapsPerLine: 1,
                    correct: [0, 1, 2],
                    starting: [0, 0, 0],
                    type: "bar",
                    labels: ["Horizontal", "Vertical"],
                    categories: ["0", "1", "2"],
                    picSize: 30,
                    picBoxHeight: 36,
                    plotDimensions: [300, 300],
                    labelInterval: 1,
                    picUrl: null,
                    // manually added to serialized state
                    values: [3, 3, 3],
                    dependencies: testDependenciesV2,
                },
            },
            hints: [],
        });
    });
});
