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
describe("NumberLine serialization", () => {
    function generateBasicNumberLine(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ number-line 1]]",
            widgets: {
                "number-line 1": {
                    type: "number-line",
                    options: {
                        labelRange: [null, null],
                        initialX: null,
                        tickStep: 1,
                        labelStyle: "decimal",
                        labelTicks: true,
                        isInequality: false,
                        snapDivisions: 2,
                        range: [-4, 4],
                        static: false,
                        correctRel: "eq",
                        numDivisions: null,
                        divisionRange: [1, 10],
                        correctX: -2.5,
                        isTickCtrl: false,
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
        const {renderer} = renderQuestion(generateBasicNumberLine());

        const [numberLine] =
            renderer.questionRenderer.findWidgets("number-line 1");
        act(() => numberLine.movePosition(-2.5));

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "number-line 1": {
                    alignment: "default",
                    static: false,
                    range: [-4, 4],
                    labelRange: [null, null],
                    labelStyle: "decimal",
                    labelTicks: true,
                    divisionRange: [1, 10],
                    snapDivisions: 2,
                    isInequality: false,
                    showTooltips: false,
                    isTickCtrl: false,
                    numLinePosition: -2.5,
                    numDivisions: 8,
                    // pretty sure this is wrong, but it's the existing behavior
                    rel: "ge",
                },
            },
            hints: [],
        });
    });
});
