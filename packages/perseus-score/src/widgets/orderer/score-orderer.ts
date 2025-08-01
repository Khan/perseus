import _ from "underscore";

import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreOrderer(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusOrdererUserInput | undefined,
    rubric: PerseusOrdererRubric,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

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
