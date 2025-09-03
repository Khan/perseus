import {radioLogic} from "@khanacademy/perseus-core";
import _ from "underscore";

import Radio from "./radio.ff";
import {getUserInputFromSerializedState} from "./util";

import type {WidgetExports} from "../../types";
import type {
    PerseusRadioUserInput,
    PerseusRadioWidgetOptions,
} from "@khanacademy/perseus-core";

function getStartUserInput(): PerseusRadioUserInput {
    return {
        selectedChoiceIds: [],
    };
}

function getCorrectUserInput(
    options: PerseusRadioWidgetOptions,
): PerseusRadioUserInput {
    return {
        selectedChoiceIds: options.choices
            .filter((option) => option.correct)
            .map((option) => option.id),
    };
}

export default {
    name: "radio",
    displayName: "Radio / Multiple choice",
    widget: Radio,
    getStartUserInput,
    getCorrectUserInput,
    version: radioLogic.version,
    isLintable: true,

    // TODO(LEMS-3185): remove serializedState/restoreSerializedState
    /**
     * @deprecated - do not use in new code.
     */
    getUserInputFromSerializedState: (serializedState: any) => {
        return getUserInputFromSerializedState(serializedState);
    },
} satisfies WidgetExports<typeof Radio>;
