import {number as knumber} from "@khanacademy/kmath";

import type {
    PerseusNumberLineRubric,
    PerseusNumberLineUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreNumberLine(
    userInput: PerseusNumberLineUserInput,
    rubric: PerseusNumberLineRubric,
): PerseusScore {
    const divisionRange = rubric.divisionRange;
    const outsideAllowedRange =
        userInput.numDivisions > divisionRange[1] ||
        userInput.numDivisions < divisionRange[0];

    if (rubric.isTickCtrl && outsideAllowedRange) {
        return {
            type: "invalid",
            message: "Number of divisions is outside the allowed range.",
        };
    }

    const range = rubric.range;
    const start = rubric.initialX != null ? rubric.initialX : range[0];
    const startRel = rubric.isInequality ? "ge" : "eq";
    const correctRel = rubric.correctRel || "eq";
    const correctPos = knumber.equal(
        userInput.numLinePosition,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
