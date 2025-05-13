import Util from "../../util";
import PassageRef from "../passage-ref/passage-ref";

import type {RadioChoiceWithMetadata} from "./radio.new";
import type {PerseusStrings} from "../../strings";
import type {ChoiceState} from "../../types";
import type {ShowSolutions} from "@khanacademy/perseus-core";

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
