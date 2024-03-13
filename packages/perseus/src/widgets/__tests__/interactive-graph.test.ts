import {describe, beforeEach, it} from "@jest/globals";
import {waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {clone} from "../../../../../testing/object-utils";
import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {
    questionsAndAnswers,
    segmentQuestion,
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
