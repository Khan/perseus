import _ from "underscore";

import type {PerseusScore} from "../../types";
import type {
    PerseusMatcherScoringData,
    PerseusMatcherUserInput,
} from "../../validation.types";

function scoreMatcher(
    state: PerseusMatcherUserInput,
    scoringData: PerseusMatcherScoringData,
): PerseusScore {
    const correct =
        _.isEqual(state.left, scoringData.left) &&
        _.isEqual(state.right, scoringData.right);

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreMatcher;
