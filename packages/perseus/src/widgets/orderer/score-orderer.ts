import _ from "underscore";

import type {PerseusScore} from "../../types";
import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
} from "../../validation.types";

export function scoreOrderer(
    userInput: PerseusOrdererUserInput,
    rubric: PerseusOrdererRubric,
): PerseusScore {
    if (userInput.current.length === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }

    const correct = _.isEqual(
        userInput.current,
        _.pluck(rubric.correctOptions, "content"),
    );

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}
