import {NumericInput} from "../numeric-input/numeric-input.class";

import type {WidgetExports} from "../../types";
import type {
    PerseusInputNumberUserInput,
    PerseusInputNumberWidgetOptions,
} from "@khanacademy/perseus-core";

function getOneCorrectAnswerFromRubric(
    rubric: PerseusInputNumberWidgetOptions,
): string | undefined {
    const answer = rubric.answers[0];
    if (answer.value == null) {
        return;
    }
    let answerString = String(answer.value);
    if (answer.maxError != null && answer.maxError > 0) {
        answerString += " \u00B1 " + answer.maxError;
    }
    return answerString;
}

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

function getStartUserInput(): PerseusInputNumberUserInput {
    return {currentValue: ""};
}

function getCorrectUserInput(
    options: PerseusInputNumberWidgetOptions,
): PerseusInputNumberUserInput {
    return {currentValue: String(options.answers[0].value)};
}

export default {
    name: "input-number",
    displayName: "Input number (deprecated - use numeric input instead)",
    hidden: true,
    // NOTE(benchristel): We replaced the InputNumber component with
    // NumericInput in 2026.
    widget: NumericInput,
    isLintable: true,
    getOneCorrectAnswerFromRubric,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof NumericInput>;
