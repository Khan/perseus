import {approximateDeepEqual} from "@khanacademy/perseus-core";
import _ from "underscore";

import validateSorter from "./validate-sorter";

import type {
    PerseusSorterScoringData,
    PerseusSorterUserInput,
    PerseusScore,
} from "../../validation.types";

function scoreSorter(
    userInput: PerseusSorterUserInput,
    scoringData: PerseusSorterScoringData,
): PerseusScore {
    const validationError = validateSorter(userInput);
    if (validationError) {
        return validationError;
    }

    const correct = approximateDeepEqual(
        userInput.options,
        scoringData.correct,
    );
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreSorter;
