// @flow

import {clone} from "../../../../../testing/object-utils.js";
import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";
import {ApiOptions} from "../../perseus-api.jsx";
import {questionsAndAnswers} from "../__testdata__/interactive-graph_testdata.js";

import {renderQuestion} from "./renderQuestion.jsx";

import type {Coord} from "../../interactive2/types.js";
import type {PerseusRenderer} from "../../perseus-types.js";
import type {APIOptions} from "../../types.js";

const updateWidgetState = (renderer, widgetId, update) => {
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
            correct: $ReadOnlyArray<Coord>,
            incorrect: $ReadOnlyArray<Coord>,
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
