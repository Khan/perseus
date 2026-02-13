import {radioLogic} from "@khanacademy/perseus-core";

import Radio from "./multiple-choice-component";
import {getUserInputFromSerializedState} from "./util";

import type {WidgetExports} from "../../types";
import type {PerseusRadioUserInput} from "@khanacademy/perseus-core";

function getStartUserInput(): PerseusRadioUserInput {
    return {
        selectedChoiceIds: [],
    };
}

export default {
    name: "radio",
    displayName: "Radio / Multiple choice",
    widget: Radio,
    getStartUserInput,
    version: radioLogic.version,
    isLintable: true,

    // TODO(LEMS-3185): remove serializedState
    /**
     * @deprecated - do not use in new code.
     */
    getUserInputFromSerializedState: (serializedState: unknown) => {
        return getUserInputFromSerializedState(serializedState);
    },
} satisfies WidgetExports<typeof Radio>;
