import type {
    PerseusCategorizerRubric,
    PerseusCategorizerUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreCategorizer(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusCategorizerUserInput | undefined,
    rubric: PerseusCategorizerRubric,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }
    let allCorrect = true;
    rubric.values.forEach((value, i) => {
        if (userInput.values[i] !== value) {
            allCorrect = false;
        }
    });
    return {
        type: "points",
        earned: allCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreCategorizer;
