import type {ChoiceState} from "../../../types";
import type {RadioChoiceWithMetadata} from "../multiple-choice-widget.new";
import type {ShowSolutions} from "@khanacademy/perseus-core";

interface GetChoiceStatesProps {
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    isStatic?: boolean | null;
    showSolutions?: ShowSolutions;
    choiceStates?: ReadonlyArray<ChoiceState>;
    reviewMode?: boolean;
}

/**
 * Determine the updated choice states for the Radio widget, based on the
 * widget's static / showSolutions / reviewMode states, and choiceStates.
 *
 * @param choices - The choices for the Radio widget.
 * @param isStatic - Whether the widget is static.
 * @param showSolutions - Whether the widget is in showSolutions mode.
 * @param reviewMode - Whether the widget is in review mode.
 * @param choiceStates - The choice states for the widget. (The user's current selection states.)
 * @returns The updated choice states for the widget.
 */
export const getChoiceStates = ({
    choices,
    isStatic,
    showSolutions,
    choiceStates,
    reviewMode,
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
    // The widget is in static, showSolutions, or reviewMode.
    // — In this state, we display correct answers with explanations and prevent interaction.
    if (isStatic || showSolutions === "all" || reviewMode) {
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
