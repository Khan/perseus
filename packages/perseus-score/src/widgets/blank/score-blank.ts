import validateBlank from "./validate-blank";

import type {
    PerseusBlankWidgetOptions,
    PerseusBlankUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreBlank(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusBlankUserInput | undefined,
    widgetOptions: PerseusBlankWidgetOptions,
): PerseusScore {
    const validationResult = validateBlank(userInput);
    if (validationResult != null) {
        return validationResult;
    }
    const isCorrect = userInput?.selected === widgetOptions.correctId;
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreBlank;
