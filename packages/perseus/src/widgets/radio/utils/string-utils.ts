import {usesNumCorrect} from "@khanacademy/perseus-core";

import type {PerseusStrings} from "../../../strings";

/**
 * Given a choice's position in the radio widget, return the corresponding
 * "choice letter". (For example, `getChoiceLetter(0)` is "A",
 * `getChoiceLetter(1)` is "B", etc.)
 *
 * All locales use English letters for the choice letters.
 *
 * @param pos - The position of the choice in the radio widget.
 * @param strings - The strings for the Radio widget.
 * @returns The choice letter for the given position.
 */
export const getChoiceLetter = (
    pos: number,
    strings: PerseusStrings,
): string => {
    const lettersString = strings.letters;

    const letters = lettersString.split(" ");

    if (pos < letters.length) {
        // If the position we need is listed in the localized string, use that.
        return letters[pos];
    }
    // If we're out of letters, give up and return a space.
    return " ";
};

interface GetOptionStatusTextProps {
    checked: boolean;
    correct: boolean;
    strings: PerseusStrings;
}

/**
 * Get the correct (translated) string for an option status (correct, incorrect, selected, etc.)
 *
 * @param checked - Whether the option is checked.
 * @param correct - Whether the option is correct.
 * @param strings - The strings for the Radio widget.
 * @returns The appropriate string for the option status.
 */
export const getOptionStatusText = ({
    checked,
    correct,
    strings,
}: GetOptionStatusTextProps): string => {
    if (correct) {
        // For correct answers, we surface checked state,
        // because any interaction with the correct answer is noteworthy!
        if (checked) {
            return strings.correctSelected;
        }
        return strings.correct;
    }
    // But, for incorrect answers, we only surface checked state,
    // because crossing out an incorrect answer is not noteworthy.
    if (checked) {
        return strings.incorrectSelected;
    }
    return strings.incorrect;
};

interface GetInstructionsTextProps {
    multipleSelect: boolean;
    countChoices: boolean | null | undefined;
    numCorrect: number;
    strings: PerseusStrings;
}

/**
 * Get the (translated) instructions string for a Radio widget.
 *
 * This is the text that appears above the widget that explains
 * how many choices the user should select.
 *
 * @param multipleSelect - Whether the widget is a multiple-select widget.
 * @param countChoices - Whether the widget counts choices.
 * @param numCorrect - The number of correct choices.
 * @param strings - The strings for the Radio widget.
 * @returns The instructions string for the widget.
 */
export const getInstructionsText = ({
    multipleSelect,
    countChoices,
    numCorrect,
    strings,
}: GetInstructionsTextProps): string => {
    if (multipleSelect) {
        // using usesNumCorrect to make sure this logic stays in sync
        // with getRadioPublicWidgetOptions logic
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (usesNumCorrect(multipleSelect, !!countChoices, numCorrect)) {
            return strings.chooseNumAnswers({
                numCorrect: String(numCorrect),
            });
        }
        return strings.chooseAllAnswers;
    }
    return strings.chooseOneAnswer;
};

interface GetA11yTextProps {
    letter: string;
    checked: boolean;
    correct: boolean;
    showCorrectness: boolean;
    strings: PerseusStrings;
}

/**
 * Get the (translated) a11y string for a Radio widget.
 *
 * This string is provided to screen readers to help the user
 * understand the current state of a Radio option.
 *
 * @param letter - The letter for the choice.
 * @param checked - Whether the choice is checked.
 * @param correct - Whether the choice is correct.
 * @param crossedOut - Whether the choice is crossed out.
 * @param showCorrectness - Whether the correctness is shown.
 * @param strings - The strings for the Radio widget.
 * @returns The a11y string for the Radio option.
 */
export const getA11yText = ({
    letter,
    checked,
    correct,
    showCorrectness,
    strings,
}: GetA11yTextProps): string => {
    // There are two pieces of metadata we want to add to each a11yText:
    // whether the answer was checked/crossed-out/neither, and whether the
    // answer is correct/incorrect/not-yet-revealed.
    //
    // Translation is tricky for cross-product situations like this, so
    // we've just enumerated all 9 possibilities as separate strings.
    if (showCorrectness && correct) {
        if (checked) {
            return strings.choiceCheckedCorrect({
                letter,
            });
        }
        return strings.choiceCorrect({
            letter,
        });
    }
    if (showCorrectness && !correct) {
        if (checked) {
            return strings.choiceCheckedIncorrect({
                letter,
            });
        }
        return strings.choiceIncorrect({
            letter,
        });
    }
    if (checked) {
        return strings.choiceChecked({
            letter,
        });
    }
    return strings.choice({
        letter,
    });
};
