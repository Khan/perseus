import numericInput from "../numeric-input/numeric-input.class";

import type {WidgetExports} from "../../types";
import type {PerseusInputNumberUserInput} from "@khanacademy/perseus-core";

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusInputNumberUserInput {
    return {
        currentValue: serializedState.currentValue,
    };
}

export default {
    name: "input-number",
    version: {major: 1, minor: 0},
    displayName: "Input number (deprecated - use numeric input instead)",
    hidden: true,
    // NOTE(benchristel): We replaced the InputNumber component with
    // NumericInput in 2026.
    widget: numericInput.widget,
    isLintable: true,
    getOneCorrectAnswerFromRubric: numericInput.getOneCorrectAnswerFromRubric,
    getStartUserInput: numericInput.getStartUserInput,
    getCorrectUserInput: numericInput.getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof numericInput.widget>;
