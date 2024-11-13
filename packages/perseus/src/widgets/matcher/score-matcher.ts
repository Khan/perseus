import _ from "underscore";

import type {PerseusScore} from "../../types";
import type {
    PerseusMatcherRubric,
    PerseusMatcherUserInput,
} from "../../validation.types";

function scoreMatcher(
    state: PerseusMatcherUserInput,
    rubric: PerseusMatcherRubric,
): PerseusScore {
    const correct =
        _.isEqual(state.left, rubric.left) &&
        _.isEqual(state.right, rubric.right);

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreMatcher;
