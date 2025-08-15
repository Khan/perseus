import ErrorCodes from "../../error-codes";

import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
    PerseusScore,
    RecursiveReadonly,
} from "@khanacademy/perseus-core";

function scoreRadio(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: RecursiveReadonly<PerseusRadioUserInput> | undefined,
    rubric: RecursiveReadonly<PerseusRadioRubric>,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const numSelected = userInput.choicesSelected.reduce((sum, choice) => {
        return sum + (choice.selected ? 1 : 0);
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
        (choice) =>
            choice.isNoneOfTheAbove && userInput.choicesSelected.some(userChoice => userChoice.id === choice.id && userChoice.selected),
    );

    if (noneOfTheAboveSelected && numSelected > 1) {
        return {
            type: "invalid",
            message: ErrorCodes.NOT_NONE_ABOVE_ERROR,
        };
    }

    const correct = userInput.choicesSelected.every((userChoice) => {
        // Find the corresponding rubric by choice id
        const rubricChoice = rubric.choices.find(choice => choice.id === userChoice.id)

        if(!rubricChoice){
            return false;
        }

        let isCorrect: boolean;
        if (rubricChoice.isNoneOfTheAbove) {
            isCorrect = rubric.choices.every((choice) => {
                return choice.id === rubricChoice.id || !choice.correct;
            });
        } else {
            isCorrect = !!rubricChoice.correct
        }
        return isCorrect === userChoice.selected;
    });

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreRadio;
