import {describe, beforeEach, it} from "@jest/globals";
import {waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    angleQuestionWithDefaultCorrect,
    circleQuestionWithDefaultCorrect,
    linearQuestionWithDefaultCorrect,
    linearSystemQuestionWithDefaultCorrect,
    pointQuestionWithDefaultCorrect,
    polygonQuestionDefaultCorrect,
    quadraticQuestionWithDefaultCorrect,
    rayQuestionWithDefaultCorrect,
    segmentQuestionDefaultCorrect,
    sinusoidQuestionWithDefaultCorrect,
} from "../__testdata__/interactive-graph.testdata";
import {trueForAllMafsSupportedGraphTypes} from "../interactive-graphs/mafs-supported-graph-types";

import {renderQuestion} from "./renderQuestion";

import type {PerseusRenderer} from "../../perseus-types";
import type {mafsSupportedGraphTypes} from "../interactive-graphs/mafs-supported-graph-types";
import type {UserEvent} from "@testing-library/user-event";

describe("a mafs graph", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    // Add types to this array as you test them
    const apiOptions = {
        flags: {mafs: trueForAllMafsSupportedGraphTypes},
    };

    const graphQuestionRenderersCorrect: {
        [K in (typeof mafsSupportedGraphTypes)[number]]: PerseusRenderer;
    } = {
        angle: angleQuestionWithDefaultCorrect,
        segment: segmentQuestionDefaultCorrect,
        linear: linearQuestionWithDefaultCorrect,
        "linear-system": linearSystemQuestionWithDefaultCorrect,
        ray: rayQuestionWithDefaultCorrect,
        polygon: polygonQuestionDefaultCorrect,
        point: pointQuestionWithDefaultCorrect,
        circle: circleQuestionWithDefaultCorrect,
        quadratic: quadraticQuestionWithDefaultCorrect,
        sinusoid: sinusoidQuestionWithDefaultCorrect,
    };

    describe.each(Object.entries(graphQuestionRenderersCorrect))(
        "graph type %s: default correct",
        (_type, question) => {
            it("rejects incorrect answer", async () => {
                // Arrange
                const {renderer} = renderQuestion(question, apiOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowright}");

                // Assert
                await waitFor(() => {
                    expect(renderer).toHaveBeenAnsweredIncorrectly();
                });
            });

            it("accepts correct answer", async () => {
                const {renderer} = renderQuestion(question, apiOptions);

                await userEvent.tab();

                // Act
                await userEvent.keyboard("{arrowup}{arrowdown}");

                // Assert
                await waitFor(() => {
                    expect(renderer).toHaveBeenAnsweredCorrectly();
                });
            });
        },
    );
});
