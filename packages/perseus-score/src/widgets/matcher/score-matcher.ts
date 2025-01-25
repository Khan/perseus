import _ from "underscore";

import type {
    PerseusMatcherScoringData,
    PerseusMatcherUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreMatcher(
    userInput: PerseusMatcherUserInput,
    scoringData: PerseusMatcherScoringData,
): PerseusScore {
    const correct =
        _.isEqual(userInput.left, scoringData.left) &&
        _.isEqual(userInput.right, scoringData.right);

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreMatcher;
