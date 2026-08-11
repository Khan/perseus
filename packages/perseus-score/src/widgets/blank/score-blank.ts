import validateBlank from "./validate-blank";

import type {
    PerseusBlankRubric,
    PerseusBlankUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreBlank(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusBlankUserInput | undefined,
    rubric: PerseusBlankRubric,
): PerseusScore {
    const validationResult = validateBlank(userInput);
    if (validationResult != null) {
        return validationResult;
    }
    const isCorrect = userInput?.selected === rubric.correctId;
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreBlank;
