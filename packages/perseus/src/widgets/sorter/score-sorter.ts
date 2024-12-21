import Util from "../../util";

import validateSorter from "./validate-sorter";

import type {PerseusScore} from "../../types";
import type {
    PerseusSorterScoringData,
    PerseusSorterUserInput,
} from "../../validation.types";

function scoreSorter(
    userInput: PerseusSorterUserInput,
    scoringData: PerseusSorterScoringData,
): PerseusScore {
    const validationError = validateSorter(userInput);
    if (validationError) {
        return validationError;
    }

    const correct = Util.deepEq(userInput.options, scoringData.correct);
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreSorter;
