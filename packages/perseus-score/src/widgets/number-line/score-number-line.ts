import {number as knumber} from "@khanacademy/kmath";

import type {
    PerseusNumberLineRubric,
    PerseusNumberLineUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreNumberLine(
    userInput: PerseusNumberLineUserInput,
    rubric: PerseusNumberLineRubric,
): PerseusScore {
    const range = rubric.range;
    const start = rubric.initialX != null ? rubric.initialX : range[0];
    const startRel = rubric.isInequality ? "ge" : "eq";
    const correctRel = rubric.correctRel || "eq";
    const correctPos = knumber.equal(
        userInput.numLinePosition,
        rubric.correctX || 0,
    );

    if (correctPos && correctRel === userInput.rel) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    }
    if (userInput.numLinePosition === start && userInput.rel === startRel) {
        // We're where we started.
        return {
            type: "invalid",
            message: null,
        };
    }
    return {
        type: "points",
        earned: 0,
        total: 1,
        message: null,
    };
}

export default scoreNumberLine;
