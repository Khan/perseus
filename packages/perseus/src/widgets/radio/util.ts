import {usesNumCorrect, type ShowSolutions} from "@khanacademy/perseus-core";

import Util from "../../util";
import PassageRef from "../passage-ref/passage-ref";

import type {RadioChoiceWithMetadata} from "./radio.new";
import type {PerseusStrings} from "../../strings";
import type {ChoiceState} from "../../types";

// State utilities

/**
 * Determine the updated choice states for the Radio widget, based on the
 * widget's static / showSolutions states, choiceStates, and values.
 *
 * @param choices - The choices for the Radio widget.
 * @param isStatic - Whether the widget is static.
 * @param showSolutions - Whether the widget is in showSolutions mode.
 * @param choiceStates - The choice states for the widget. (The user's current selection states.)
 * @param values - The values for the widget. (Deprecated: The user's current selection states.)
 * @returns The updated choice states for the widget.
 */
export const getChoiceStates = (
    choices: ReadonlyArray<RadioChoiceWithMetadata>,
    isStatic?: boolean | null,
    showSolutions?: ShowSolutions,
    choiceStates?: ReadonlyArray<ChoiceState>,
    values?: ReadonlyArray<boolean>,
): ReadonlyArray<ChoiceState> => {
    // The default state for a choice state object.
    const defaultState: ChoiceState = {
        selected: false,
        crossedOut: false,
        readOnly: false,
        highlighted: false,
        rationaleShown: false,
        correctnessShown: false,
        previouslyAnswered: false,
    };

    // Case 1: The widget is in either static or showSolutions mode.
    // Both cases show the correct answers and prevent user interaction.
    if (isStatic || showSolutions === "all") {
        return choices.map((choice) => ({
            ...defaultState,
            selected: !!choice.correct,
            readOnly: true,
            rationaleShown: true,
            correctnessShown: true,
        }));
    }

    // Case 2: The widget has been interacted with, but the user hasn't submitted their answer yet
    // — so we're showing the user's current choice states.
    if (choiceStates) {
        return choiceStates;
    }

    // Case 3: The widget uses the legacy values property, and the user has interacted with the widget
    // but hasn't submitted their answer yet — so we're showing the user's current choice states.
    if (values) {
        /* c8 ignore next - props.values is deprecated */
        return values.map((val) => ({
            ...defaultState,
            selected: val,
        }));
    }

    // Case 4: The widget hasn't been interacted with yet, so we're showing
    // the default choice states.
    return choices.map(() => ({...defaultState}));
};

/**
 * Parse the nested widgets in the content of a Radio widget.
 *
 * @param content - The content of the Radio widget.
 * @returns The parsed content and the extracted widgets.
 */
export const parseNestedWidgets = (
    content: string,
): {parsedContent: string; extractedWidgets: Record<string, any>} => {
    let nextPassageRefId = 1;
    const extractedWidgets: Record<string, any> = {};

    const parsedContent = content.replace(
        /\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,
        (passageNum: string, refNum: string, summaryText: string) => {
            const widgetId = "passage-ref " + nextPassageRefId;
            nextPassageRefId++;

            extractedWidgets[widgetId] = {
                type: "passage-ref",
                graded: false,
                options: {
                    passageNumber: parseInt(passageNum),
                    referenceNumber: parseInt(refNum),
                    summaryText: summaryText,
                },
                version: PassageRef.version,
            };

            return "[[" + Util.snowman + " " + widgetId + "]]";
        },
    );

    return {parsedContent, extractedWidgets};
};

// Text & String utilities

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

/**
 * Render the text for an option status.
 *
 * @param checked - Whether the option is checked.
 * @param correct - Whether the option is correct.
 * @param crossedOut - Whether the option is crossed out.
 * @param strings - The strings for the Radio widget.
 * @returns The rendered text for the option status.
 */
export const getOptionStatusText = (
    checked: boolean,
    correct: boolean,
    crossedOut: boolean,
    strings: PerseusStrings,
): string => {
    if (correct) {
        // For correct answers, we surface checked _or_ crossedOut state,
        // because any interaction with the correct answer is noteworthy!
        if (checked) {
            return strings.correctSelected;
        }
        if (crossedOut) {
            return strings.correctCrossedOut;
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

/**
 * Get the instructions text for a Radio widget.
 *
 * @param multipleSelect - Whether the widget is a multiple-select widget.
 * @param countChoices - Whether the widget counts choices.
 * @param numCorrect - The number of correct choices.
 * @param strings - The strings for the Radio widget.
 * @returns The instructions text for the widget.
 */
export const getInstructionsText = (
    multipleSelect: boolean,
    countChoices: boolean | null | undefined,
    numCorrect: number,
    strings: PerseusStrings,
): string => {
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

/**
 * Get the a11y text for a Radio widget.
 *
 * @param letter - The letter for the choice.
 * @param checked - Whether the choice is checked.
 * @param correct - Whether the choice is correct.
 * @param crossedOut - Whether the choice is crossed out.
 * @param showCorrectness - Whether the correctness is shown.
 * @param strings - The strings for the Radio widget.
 * @returns The a11y text for the widget.
 */
export const getA11yText = (
    letter: string,
    checked: boolean,
    correct: boolean,
    crossedOut: boolean,
    showCorrectness: boolean,
    strings: PerseusStrings,
): string => {
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
        if (crossedOut) {
            return strings.choiceCrossedOutCorrect({
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
        if (crossedOut) {
            return strings.choiceCrossedOutIncorrect({
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
    if (crossedOut) {
        return strings.choiceCrossedOut({
            letter,
        });
    }
    return strings.choice({
        letter,
    });
};
