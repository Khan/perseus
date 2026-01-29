import {
    shuffle,
    type PerseusRadioUserInput,
    type PerseusRadioWidgetOptions,
} from "@khanacademy/perseus-core";
import _ from "underscore";

import type {RadioChoiceWithMetadata} from "./multiple-choice-widget.new";
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
    serializedState: any,
): PerseusRadioUserInput {
    const selectedChoiceIds: string[] = [];

    if (serializedState?.choiceStates) {
        const choiceStates = serializedState.choiceStates;

        for (let i = 0; i < choiceStates.length; i++) {
            // Guard against undefined choiceStates when choices array length exceeds choiceStates length
            // TODO(LEMS-3861): Investigate if this code path is used and fix root cause
            if (choiceStates[i]?.selected) {
                const choiceId = serializedState.choices[i]?.id;
                if (choiceId) {
                    selectedChoiceIds.push(choiceId);
                }
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

export function moveNoneOfTheAboveToEnd(
    choices: ReadonlyArray<RadioChoiceWithMetadata>,
) {
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
) {
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
) {
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
