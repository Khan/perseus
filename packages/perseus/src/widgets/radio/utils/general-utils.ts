import Util from "../../../util";
import PassageRef from "../../passage-ref/passage-ref";

import type {ChoiceState} from "../../../types";
import type {RadioChoiceWithMetadata} from "../multiple-choice-widget.new";
import type {ShowSolutions} from "@khanacademy/perseus-core";

interface GetChoiceStatesProps {
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    isStatic?: boolean | null;
    showSolutions?: ShowSolutions;
    choiceStates?: ReadonlyArray<ChoiceState>;
}

/**
 * Determine the updated choice states for the Radio widget, based on the
 * widget's static / showSolutions states, and choiceStates.
 *
 * @param choices - The choices for the Radio widget.
 * @param isStatic - Whether the widget is static.
 * @param showSolutions - Whether the widget is in showSolutions mode.
 * @param choiceStates - The choice states for the widget. (The user's current selection states.)
 * @returns The updated choice states for the widget.
 */
export const getChoiceStates = ({
    choices,
    isStatic,
    showSolutions,
    choiceStates,
}: GetChoiceStatesProps): ReadonlyArray<ChoiceState> => {
    // The default state for a choice state object.
    const defaultState: ChoiceState = {
        selected: false,
        readOnly: false,
        highlighted: false,
        rationaleShown: false,
        correctnessShown: false,
        previouslyAnswered: false,
    };

    // Case 1: Review mode
    // The widget is in static or showSolutions mode.
    // — In this state, we display correct answers with explanations and prevent interaction.
    if (isStatic || showSolutions === "all") {
        return choices.map((choice) => ({
            ...defaultState,
            selected: !!choice.correct,
            readOnly: true,
            rationaleShown: true,
            correctnessShown: true,
        }));
    }

    // Case 2: Active user selection without submission
    // The widget has received user input that hasn't been submitted yet
    // — In this state, we preserve the user's current choice states.
    if (choiceStates) {
        return choiceStates;
    }

    // Case 3: Initial state
    // The widget is in its pristine state with no user interaction yet
    // — In this state, we return the default, unselected choice states.
    return choices.map(() => ({...defaultState}));
};

/**
 * Parse the nested widgets in the content of a Radio widget.
 * Currently this only supports passage-ref widgets, but can
 * be extended to support other nested widgets in the future.
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
        (_, passageNum: string, refNum: string, summaryText: string) => {
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
