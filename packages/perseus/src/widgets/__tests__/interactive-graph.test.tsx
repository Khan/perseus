import {describe, beforeEach, it} from "@jest/globals";
import {waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {segmentQuestionDefaultCorrect} from "../__testdata__/interactive-graph.testdata";
import {trueForAllMafsSupportedGraphTypes} from "../interactive-graphs/mafs-supported-graph-types";

import {renderQuestion} from "./renderQuestion";

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

    // const graphQuestionRenderersCorrect: {
    //     [K in (typeof mafsSupportedGraphTypes)[number]]: PerseusRenderer;
    // } = {
    //     angle: angleQuestionWithDefaultCorrect,
    //     segment: segmentQuestionDefaultCorrect,
    //     linear: linearQuestionWithDefaultCorrect,
    //     "linear-system": linearSystemQuestionWithDefaultCorrect,
    //     ray: rayQuestionWithDefaultCorrect,
    //     polygon: polygonQuestionDefaultCorrect,
    //     point: pointQuestionWithDefaultCorrect,
    //     circle: circleQuestionWithDefaultCorrect,
    //     quadratic: quadraticQuestionWithDefaultCorrect,
    //     sinusoid: sinusoidQuestionWithDefaultCorrect,
    // };

    it("segment graph accepts correct answer", async () => {
        const {renderer} = renderQuestion(
            segmentQuestionDefaultCorrect,
            apiOptions,
        );

        await userEvent.tab();

        // Act
        await userEvent.keyboard("{arrowup}");
        await userEvent.keyboard("{arrowdown}");

        // Assert
        await waitFor(() => {
            expect(renderer).toHaveBeenAnsweredCorrectly();
        });
    });
});
