import {radioLogic, randomizeArrayElements} from "@khanacademy/perseus-core";
import _ from "underscore";

import Radio from "./radio.ff";
import {getUserInputFromSerializedState} from "./util";

import type {RenderProps, RadioChoiceWithMetadata} from "./radio-component";
import type {PerseusStrings} from "../../strings";
import type {WidgetExports} from "../../types";
import type {
    PerseusRadioUserInput,
    PerseusRadioWidgetOptions,
    RadioPublicWidgetOptions,
} from "@khanacademy/perseus-core";

// Transforms the choices for display.
const _choiceTransform = (
    widgetOptions: PerseusRadioWidgetOptions,
    strings: PerseusStrings,
) => {
    const _maybeRandomize = function (
        array: ReadonlyArray<RadioChoiceWithMetadata>,
    ) {
        return widgetOptions.randomize ? randomizeArrayElements(array) : array;
    };

    const _addNoneOfAbove = function (
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
    };

    const enforceOrdering = (
        choices: ReadonlyArray<RadioChoiceWithMetadata>,
    ) => {
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
    };

    // Add meta-information to choices
    const choices: ReadonlyArray<RadioChoiceWithMetadata> =
        widgetOptions.choices.map((choice, i): RadioChoiceWithMetadata => {
            return {
                ...choice,
                originalIndex: i,
                correct: Boolean(choice.correct),
            };
        });

    // Apply all the transforms. Note that the order we call these is
    // important!
    // 3) finally add "None of the above" to the bottom
    return _addNoneOfAbove(
        // 2) then (potentially) enforce ordering (eg. False, True becomes
        //    True, False)
        enforceOrdering(
            // 1) we randomize the order first
            _maybeRandomize(choices),
        ),
    );
};

const transform = (
    widgetOptions: PerseusRadioWidgetOptions,
    strings: PerseusStrings,
): RenderProps => {
    const choices = _choiceTransform(widgetOptions, strings);

    const {
        hasNoneOfTheAbove,
        multipleSelect,
        countChoices,
        deselectEnabled,
        numCorrect,
    } = widgetOptions;

    return {
        numCorrect: numCorrect as number,
        hasNoneOfTheAbove,
        multipleSelect,
        countChoices,
        deselectEnabled,
        choices,
        // doesn't seem used? choiceStates includes selected...
        selectedChoices: _.pluck(choices, "correct"),
    };
};

function getStartUserInput(
    options: RadioPublicWidgetOptions,
): PerseusRadioUserInput {
    return {
        choicesSelected: options.choices.map(() => false),
    };
}

function getCorrectUserInput(
    options: PerseusRadioWidgetOptions,
): PerseusRadioUserInput {
    return {
        choicesSelected: options.choices.map((option) => !!option.correct),
    };
}

export default {
    name: "radio",
    displayName: "Radio / Multiple choice",
    widget: Radio,
    transform,
    staticTransform: transform,
    getStartUserInput,
    getCorrectUserInput,
    version: radioLogic.version,
    isLintable: true,

    // TODO(LEMS-3185): remove serializedState/restoreSerializedState
    /**
     * @deprecated - do not use in new code.
     */
    getUserInputFromSerializedState: (serializedState: any) => {
        return getUserInputFromSerializedState(serializedState, true);
    },
} satisfies WidgetExports<typeof Radio>;
