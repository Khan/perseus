import type {
    PerseusCategorizerRubric,
    PerseusCategorizerUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreCategorizer(
    userInput: PerseusCategorizerUserInput,
    rubric: PerseusCategorizerRubric,
): PerseusScore {
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
