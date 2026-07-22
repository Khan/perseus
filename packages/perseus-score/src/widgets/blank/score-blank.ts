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
    if (userInput == null) {
        return {type: "invalid", message: null};
    }
    const isCorrect = userInput.selected === rubric.correct;
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreBlank;
