import {
    shuffle,
    type PerseusRadioUserInput,
    type PerseusRadioWidgetOptions,
    type RecursiveReadonly,
} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {RadioChoiceWithMetadata} from "./radio-component";
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

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
export function getUserInputFromSerializedState(
    serializedState: any,
    unshuffle: boolean = true,
): PerseusRadioUserInput {
    if (serializedState.choiceStates) {
        const choiceStates = serializedState.choiceStates;
        const choicesSelected = choiceStates.map(() => false);

        for (let i = 0; i < choicesSelected.length; i++) {
            const index = unshuffle
                ? serializedState.choices[i].originalIndex
                : i;

            choicesSelected[index] = choiceStates[i].selected;
        }

        return {
            choicesSelected,
        };
        // Support legacy choiceState implementation
    }
    // Nothing checked
    return {
        choicesSelected: serializedState.choices.map(() => false),
    };
}

export function moveNoneOfTheAboveToEnd(
    choices: ReadonlyArray<RadioChoiceWithMetadata>,
): ReadonlyArray<RadioChoiceWithMetadata> {
    let noneOfTheAbove: RadioChoiceWithMetadata | null = null;

    const newChoices = choices.filter((choice) => {
        if (choice.isNoneOfTheAbove) {
            noneOfTheAbove = choice;
            return false;
        }
        return true;
    });

    // Place the "None of the above" options last
    if (noneOfTheAbove != null) {
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

// Transforms the choices for display.
export function choiceTransform(
    choices: PerseusRadioWidgetOptions["choices"],
    randomize: PerseusRadioWidgetOptions["randomize"],
    strings: PerseusStrings,
    seed: number,
): ReadonlyArray<RadioChoiceWithMetadata> {
    if (choices.some((choice) => (choice as any).originalIndex != null)) {
        throw new Error("Calling choiceTransform on transformed choices!");
    }

    // Add meta-information to choices
    const choicesWithMetadata: ReadonlyArray<RadioChoiceWithMetadata> =
        choices.map((choice, i): RadioChoiceWithMetadata => {
            return {
                ...choice,
                originalIndex: i,
                correct: Boolean(choice.correct),
            };
        });

    // Apply all the transforms. Note that the order we call these is
    // important!
    // 3) finally add "None of the above" to the bottom
    return moveNoneOfTheAboveToEnd(
        // 2) then (potentially) enforce ordering (eg. False, True becomes
        //    True, False)
        enforceOrdering(
            // 1) we randomize the order first
            randomize
                ? shuffle(choicesWithMetadata, seed)
                : choicesWithMetadata,
            strings,
        ),
    );
}

/**
 * converts an unshuffled user input to a shuffled user input
 * based on the original index of the choices
 *
 * not used for shuffling, used for syncing shuffled/unshuffled
 */
export function shuffleUserInput(
    choices: ReadonlyArray<RadioChoiceWithMetadata>,
    userInput: RecursiveReadonly<PerseusRadioUserInput>,
): PerseusRadioUserInput {
    const choicesSelected = userInput.choicesSelected;
    return {
        choicesSelected: choices.map(
            (choice) => choicesSelected[choice.originalIndex],
        ),
    };
}

/**
 * converts a shuffled user input to an unshuffled user input
 * based on the original index of the choices
 *
 * not used for shuffling, used for syncing shuffled/unshuffled
 */
export function unshuffleUserInput(
    choices: RadioChoiceWithMetadata[],
    userInput: PerseusRadioUserInput,
): PerseusRadioUserInput {
    const rv: boolean[] = [];
    const choicesSelected = userInput.choicesSelected;
    choices.forEach((choice, currentIndex) => {
        rv[choice.originalIndex] = choicesSelected[currentIndex];
    });
    return {choicesSelected: rv};
}
