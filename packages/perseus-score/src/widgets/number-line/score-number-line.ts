import {number as knumber} from "@khanacademy/kmath";

import validateNumberLine from "./validate-number-line";

import type {
    PerseusNumberLineScoringData,
    PerseusNumberLineUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreNumberLine(
    userInput: PerseusNumberLineUserInput,
    scoringData: PerseusNumberLineScoringData,
): PerseusScore {
    const validationError = validateNumberLine(userInput);
    if (validationError) {
        return validationError;
    }

    const range = scoringData.range;
    const start =
        scoringData.initialX != null ? scoringData.initialX : range[0];
    const startRel = scoringData.isInequality ? "ge" : "eq";
    const correctRel = scoringData.correctRel || "eq";
    const correctPos = knumber.equal(
        userInput.numLinePosition,
        scoringData.correctX || 0,
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
