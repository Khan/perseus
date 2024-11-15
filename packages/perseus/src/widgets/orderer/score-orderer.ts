import _ from "underscore";

import {validateOrderer} from "./validate-orderer";

import type {PerseusScore} from "../../types";
import type {
    PerseusOrdererRubric,
    PerseusOrdererUserInput,
} from "../../validation.types";

export function scoreOrderer(
    userInput: PerseusOrdererUserInput,
    rubric: PerseusOrdererRubric,
): PerseusScore {
    const validateError = validateOrderer(userInput);
    if (validateError) {
        return validateError;
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
