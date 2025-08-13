import {shuffle, type PerseusRadioUserInput} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {Props, RadioChoiceWithMetadata} from "./radio-component";
import type {PerseusStrings} from "../../strings";

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

export function addNoneOfAbove(
    choices: ReadonlyArray<RadioChoiceWithMetadata>,
): ReadonlyArray<RadioChoiceWithMetadata> {
    let noneOfTheAbove = null;

    const newChoices = choices.filter((choice, index) => {
        if (choice.isNoneOfTheAbove) {
            // @ts-expect-error - TS2322 - Type 'RadioChoiceWithMetadata' is not assignable to type 'null'.
            noneOfTheAbove = choice;
            return false;
        }
        return true;
    });

    // Place the "None of the above" options last
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (noneOfTheAbove) {
        newChoices.push(noneOfTheAbove);
    }

    return newChoices;
}

export function enforceOrdering(
    choices: ReadonlyArray<RadioChoiceWithMetadata>,
    strings: PerseusStrings,
): ReadonlyArray<RadioChoiceWithMetadata> {
    // Represents choices that we automatically re-order if encountered.
    // Note: these are in the reversed (incorrect) order that we will swap, if
    // found.
    // Note 2: these are internationalized when compared later on.
    const ReversedChoices: ReadonlyArray<[string, string]> = [
        [strings.false, strings.true],
        [strings.no, strings.yes],
    ];
    const content = choices.map((c) => c.content);
    if (ReversedChoices.some((reversed) => _.isEqual(content, reversed))) {
        return [choices[1], choices[0]];
    }
    return choices;
}

export function maybeRandomize(
    array: ReadonlyArray<RadioChoiceWithMetadata>,
    seed: number,
    randomize?: boolean,
): ReadonlyArray<RadioChoiceWithMetadata> {
    return randomize ? shuffle(array, seed) : array;
}
