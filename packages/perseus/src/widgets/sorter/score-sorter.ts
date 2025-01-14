import Util from "../../util";

import validateSorter from "./validate-sorter";

import type {
    PerseusScore,
    PerseusSorterRubric,
    PerseusSorterUserInput,
} from "@khanacademy/perseus-score";

function scoreSorter(
    userInput: PerseusSorterUserInput,
    rubric: PerseusSorterRubric,
): PerseusScore {
    const validationError = validateSorter(userInput);
    if (validationError) {
        return validationError;
    }

    const correct = Util.deepEq(userInput.options, rubric.correct);
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreSorter;
