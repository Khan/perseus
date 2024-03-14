import {describe, beforeEach, it} from "@jest/globals";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {clone} from "../../../../../testing/object-utils";
import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {
    questionsAndAnswers,
    segmentQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedPointsWithColorQuestion,
    segmentQuestionDefaultCorrect,
} from "../__testdata__/interactive-graph.testdata";

import {renderQuestion} from "./renderQuestion";

import type {Coord} from "../../interactive2/types";
import type {PerseusRenderer} from "../../perseus-types";
import type Renderer from "../../renderer";
import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

const updateWidgetState = (renderer: Renderer, widgetId: string, update) => {
    const state = clone(renderer.getSerializedState());
    update(state[widgetId]);
    renderer.restoreSerializedState(state);
};

const blankOptions: APIOptions = Object.freeze(ApiOptions.defaults);

describe("interactive-graph widget", function () {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe.each(questionsAndAnswers)(
        "question",
        (
            question: PerseusRenderer,
            correct: ReadonlyArray<Coord>,
            incorrect: ReadonlyArray<Coord>,
        ) => {
            it("Should accept the right answer", () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                // NOTE: This isn't acting on the UI as a user would, which is
                // a weakness of these tests. Because this widget is designed for
                // pointer-dragging, jsdom (which doesn't support getBoundingClientRect
                // or other position-based node attributes) is insufficient to model
                // drag & drop behavior.
                // We'll want to use cypress tests or similar to ensure this widget
                // works as expected.
                updateWidgetState(
                    renderer,
                    "interactive-graph 1",
                    (state) => (state.graph.coords = correct),
                );

                // Assert
                expect(renderer).toHaveBeenAnsweredCorrectly();
            });

            it("Shoud render predictably", () => {
                // Arrange
                const {renderer, container} = renderQuestion(
                    question,
                    blankOptions,
                );
                expect(container).toMatchSnapshot("first render");

                // Act
                updateWidgetState(
                    renderer,
                    "interactive-graph 1",
                    (state) => (state.graph.coords = correct),
                );

                // Assert
                expect(container).toMatchSnapshot("after interaction");
            });

            it("should reject no interaction", () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                // no action

                // Assert
                expect(renderer).toHaveInvalidInput();
            });

            it("should reject an incorrect answer", () => {
                // Arrange
                const {renderer} = renderQuestion(question, blankOptions);

                // Act
                updateWidgetState(
                    renderer,
                    "interactive-graph 1",
                    (state) => (state.graph.coords = incorrect),
                );

                // Assert
                expect(renderer).toHaveBeenAnsweredIncorrectly();
            });
        },
    );
});

describe("segment graph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    const apiOptions = {flags: {mafs: {segment: true}}};

    it("should render", () => {
        renderQuestion(segmentQuestion, apiOptions);
    });

    it("should reject when has not been interacteracted with", () => {
        // Arrange
        const {renderer} = renderQuestion(segmentQuestion, apiOptions);

        // Act
        // no action

        // Assert
        expect(renderer).toHaveInvalidInput();
    });

    it("rejects incorrect answer", async () => {
        // Arrange
        const {renderer, container} = renderQuestion(
            segmentQuestion,
            apiOptions,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "circle.movable-point-hitbox",
        );

        // Act
        await userEvent.type(movablePoints[1], "{arrowup}{arrowdown}");

        // Assert
        await waitFor(() => {
            expect(renderer).toHaveBeenAnsweredIncorrectly();
        });
    });

    it("accepts correct answer", async () => {
        const {renderer, container} = renderQuestion(
            segmentQuestionDefaultCorrect,
            apiOptions,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const movablePoints = container.querySelectorAll(
            "circle.movable-point-hitbox",
        );

        // Act
        await userEvent.type(movablePoints[1], "{arrowup}{arrowdown}");

        // Assert
        await waitFor(() => {
            expect(renderer).toHaveBeenAnsweredCorrectly();
        });
    });
});

describe("locked layer", () => {
    const apiOptions = {flags: {mafs: {segment: true}}};
    it("should render locked points", async () => {
        // Arrange
        const {container} = renderQuestion(
            segmentWithLockedPointsQuestion,
            apiOptions,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const points = container.querySelectorAll(
            // Filter out the interactive points' circles
            "circle:not([class*='movable-point'])",
        );

        // Act

        // Assert
        expect(points).toHaveLength(2);
    });

    test("should render locked points with styles when color is not specified", async () => {
        // Arrange
        const {container} = renderQuestion(
            segmentWithLockedPointsQuestion,
            apiOptions,
        );

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const points = container.querySelectorAll(
            "circle:not([class*='movable-point'])",
        );

        // Assert
        expect(points[0]).toHaveStyle({fill: color.blue, stroke: color.blue});
        expect(points[1]).toHaveStyle({fill: color.blue, stroke: color.blue});
    });

    test("should render locked points with styles when color is specified", async () => {
        // Arrange
        const {container} = renderQuestion(
            segmentWithLockedPointsWithColorQuestion,
            {
                flags: {
                    mafs: {
                        segment: true,
                    },
                },
            },
        );

        // Act
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const points = container.querySelectorAll(
            "circle:not([class*='movable-point'])",
        );

        // Assert
        expect(points[0]).toHaveStyle({fill: color.green, stroke: color.green});
        expect(points[1]).toHaveStyle({fill: color.green, stroke: color.green});
    });
});
