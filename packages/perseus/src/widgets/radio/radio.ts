import {radioLogic} from "@khanacademy/perseus-core";
import _ from "underscore";

import Radio from "./radio.ff";
import {choiceTransform, getUserInputFromSerializedState} from "./util";

import type {RenderProps} from "./radio-component";
import type {PerseusStrings} from "../../strings";
import type {WidgetExports} from "../../types";
import type {
    PerseusRadioUserInput,
    PerseusRadioWidgetOptions,
    RadioPublicWidgetOptions,
} from "@khanacademy/perseus-core";

const transform = (
    widgetOptions: PerseusRadioWidgetOptions,
    strings: PerseusStrings,
    problemNumber: number,
): RenderProps => {
    const choices = choiceTransform(widgetOptions, strings, problemNumber);

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
