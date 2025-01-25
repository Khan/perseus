import _ from "underscore";

import validateOrderer from "./validate-orderer";

import type {
    PerseusOrdererScoringData,
    PerseusOrdererUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreOrderer(
    userInput: PerseusOrdererUserInput,
    scoringData: PerseusOrdererScoringData,
): PerseusScore {
    const validationError = validateOrderer(userInput);
    if (validationError) {
        return validationError;
    }

    const correct = _.isEqual(
        userInput.current,
        scoringData.correctOptions.map((option) => option.content),
    );

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreOrderer;
