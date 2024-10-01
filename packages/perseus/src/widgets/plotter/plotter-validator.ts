import Util from "../../util";

import type {PerseusScore} from "../../types";
import type {
    PerseusPlotterRubric,
    PerseusPlotterUserInput,
} from "../../validation.types";

const {deepEq} = Util;

function plotterValidator(
    userInput: PerseusPlotterUserInput,
    rubric: PerseusPlotterRubric,
): PerseusScore {
    if (deepEq(userInput, rubric.starting)) {
        return {
            type: "invalid",
            message: null,
        };
    }
    return {
        type: "points",
        earned: deepEq(userInput, rubric.correct) ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default plotterValidator;
