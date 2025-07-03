import type {Props} from "./radio-component";
import type {PerseusStrings} from "../../strings";
import type {PerseusRadioUserInput} from "@khanacademy/perseus-core";

/**
 * Given a choice's position in the radio widget, return the corresponding
 * "choice letter". (For example, in English, `getChoiceLetter(0)` is "A",
 * `getChoiceLetter(1)` is "B", etc.)
 */
export function getChoiceLetter(pos: number, strings: PerseusStrings): string {
    const lettersString = strings.letters;

    const letters = lettersString.split(" ");

    if (pos < letters.length) {
        // If the position we need is listed in the localized string, use that.
        return letters[pos];
    }
    // If we're out of letters, give up and return a space.
    return " ";
}

export function getUserInputFromSerializedState(
    props: Props,
    unshuffle: boolean = true,
): PerseusRadioUserInput {
    // Return checked inputs in the form {choicesSelected: [bool]}. (Dear
    // future timeline implementers: this used to be {value: i} before
    // multiple select was added)
    if (props.choiceStates) {
        const choiceStates = props.choiceStates;
        const choicesSelected = choiceStates.map(() => false);

        for (let i = 0; i < choicesSelected.length; i++) {
            const index = unshuffle ? props.choices[i].originalIndex : i;

            choicesSelected[index] = choiceStates[i].selected;
        }

        return {
            choicesSelected,
        };
        // Support legacy choiceState implementation
    }
    /* c8 ignore if - props.values is deprecated */
    const {values} = props;
    if (values) {
        const choicesSelected = [...values];
        const valuesLength = values.length;

        for (let i = 0; i < valuesLength; i++) {
            const index = unshuffle ? props.choices[i].originalIndex : i;
            choicesSelected[index] = values[i];
        }
        return {
            choicesSelected,
        };
    }
    // Nothing checked
    return {
        choicesSelected: props.choices.map(() => false),
    };
}
