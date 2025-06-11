import ErrorCodes from "../../error-codes";

import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
    PerseusScore,
    RecursiveReadonly,
} from "@khanacademy/perseus-core";

function scoreRadio(
    userInput: RecursiveReadonly<PerseusRadioUserInput>,
    rubric: RecursiveReadonly<PerseusRadioRubric>,
): PerseusScore {
    const numSelected = userInput.choicesSelected.reduce((sum, selected) => {
        return sum + (selected ? 1 : 0);
    }, 0);

    const numCorrect: number = rubric.choices.reduce((sum, currentChoice) => {
        return currentChoice.correct ? sum + 1 : sum;
    }, 0);

    // If the number of correct answers is greater than 1 and the number of
    // selected answers is not equal to the number of correct answers, and
    // the countChoices option is true, then return an invalid score.
    if (numCorrect > 1 && numSelected !== numCorrect && rubric.countChoices) {
        return {
            type: "invalid",
            message: ErrorCodes.CHOOSE_CORRECT_NUM_ERROR,
        };
    }

    const noneOfTheAboveSelected = rubric.choices.some(
        (choice, index) =>
            choice.isNoneOfTheAbove && userInput.choicesSelected[index],
    );

    if (noneOfTheAboveSelected && numSelected > 1) {
        return {
            type: "invalid",
            message: ErrorCodes.NOT_NONE_ABOVE_ERROR,
        };
    }

    const correct = userInput.choicesSelected.every((selected, i) => {
        let isCorrect: boolean;
        if (rubric.choices[i].isNoneOfTheAbove) {
            isCorrect = rubric.choices.every((choice, j) => {
                return i === j || !choice.correct;
            });
        } else {
            isCorrect = !!rubric.choices[i].correct;
        }
        return isCorrect === selected;
    });

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreRadio;
