import {number as knumber} from "@khanacademy/kmath";

import validateNumberLine from "./validate-number-line";

import type {PerseusScore} from "../../types";
import type {
    PerseusNumberLineScoringData,
    PerseusNumberLineUserInput,
} from "../../validation.types";

function scoreNumberLine(
    userInput: PerseusNumberLineUserInput,
    scoringData: PerseusNumberLineScoringData,
): PerseusScore {
    const validationError = validateNumberLine(userInput, scoringData);
    if (validationError) {
        return validationError;
    }

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
    return {
        type: "points",
        earned: 0,
        total: 1,
        message: null,
    };
}

export default scoreNumberLine;
