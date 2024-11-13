import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "../../validation.types";

function scoreRadio(
    userInput: PerseusRadioUserInput,
    rubric: PerseusRadioRubric,
    strings: PerseusStrings,
): PerseusScore {
    const numSelected = userInput.choicesSelected.reduce((sum, selected) => {
        return sum + (selected ? 1 : 0);
    }, 0);

    if (numSelected === 0) {
        return {
            type: "invalid",
            message: null,
        };
    }

    // TODO(LEMS-2541): should numCorrect actually be on the rubric
    // instead of the userInput?
    if (
        userInput.numCorrect &&
        userInput.numCorrect > 1 &&
        numSelected !== userInput.numCorrect
    ) {
        return {
            type: "invalid",
            message: strings.chooseCorrectNum,
        };
        // If NOTA and some other answer are checked, ...
    }

    // TODO(LEMS-2541): should noneOfTheAboveSelected be replaced with a
    // combination of choicesSelected and noneOfTheAboveIndex?
    if (userInput.noneOfTheAboveSelected && numSelected > 1) {
        return {
            type: "invalid",
            message: strings.notNoneOfTheAbove,
        };
    }

    const correct = userInput.choicesSelected.every((selected, i) => {
        let isCorrect: boolean;
        // TODO(LEMS-2541): should noneOfTheAboveIndex actually be on the rubric
        // instead of the userInput?
        if (userInput.noneOfTheAboveIndex === i) {
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
