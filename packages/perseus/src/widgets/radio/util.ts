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
    const selectedChoiceIds: string[] = [];

    if (props.choiceStates) {
        const choiceStates = props.choiceStates;

        for (let i = 0; i < choiceStates.length; i++) {
            if (choiceStates[i].selected) {
                selectedChoiceIds.push(props.choices[i].id);
            }
        }
        return {
            selectedChoiceIds,
        };
    }
    /* c8 ignore if - props.values is deprecated */
    const {values} = props;
    if (values) {
        const valuesLength = values.length;

        for (let i = 0; i < valuesLength && i < props.choices.length; i++) {
            if (values[i]) {
                selectedChoiceIds.push(props.choices[i].id);
            }
        }
        return {
            selectedChoiceIds,
        };
    }
    // Nothing checked
    return {
        selectedChoiceIds,
    };
}
