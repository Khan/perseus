import {radioLogic} from "@khanacademy/perseus-core";
import _ from "underscore";

import Radio from "./radio.ff";
import {
    addNoneOfAbove,
    enforceOrdering,
    getUserInputFromSerializedState,
    maybeRandomize,
} from "./util";

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
    problemNumber: number,
) => {
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
    return addNoneOfAbove(
        // 2) then (potentially) enforce ordering (eg. False, True becomes
        //    True, False)
        enforceOrdering(
            // 1) we randomize the order first
            maybeRandomize(choices, problemNumber, widgetOptions.randomize),
            strings,
        ),
    );
};

const transform = (
    widgetOptions: PerseusRadioWidgetOptions,
    strings: PerseusStrings,
    problemNumber: number,
): RenderProps => {
    const choices = _choiceTransform(widgetOptions, strings, problemNumber);

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
        choices: [...choices],
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
