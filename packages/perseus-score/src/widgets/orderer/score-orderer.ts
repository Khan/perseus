import _ from "underscore";

import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreOrderer(
    userInput: PerseusOrdererUserInput,
    rubric: PerseusOrdererRubric,
): PerseusScore {
    const correct = _.isEqual(
        userInput.current,
        rubric.correctOptions.map((option) => option.content),
    );

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreOrderer;
