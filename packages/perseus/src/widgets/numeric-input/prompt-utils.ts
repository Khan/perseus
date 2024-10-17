import {WidgetType} from "../../prompt-types";

import type {
    PerseusNumericInputAnswer,
    PerseusNumericInputWidgetOptions,
} from "../../perseus-types";
import type {PerseusNumericInputUserInput} from "../../validation.types";

type Answer = Omit<PerseusNumericInputAnswer, "answerForms" | "strict"> & {
    answerFormats?: PerseusNumericInputAnswer["answerForms"];
    strictCheckAgainstAnswerFormats: PerseusNumericInputAnswer["strict"];
};

export type NumericInputPromptJSON = {
    type: WidgetType;
    label: PerseusNumericInputWidgetOptions["labelText"];
    answers: Answer[];
    userInput: {
        value: PerseusNumericInputUserInput["currentValue"];
    };
};

export const getPromptJSON = (
    renderProps: PerseusNumericInputWidgetOptions,
    userInput: PerseusNumericInputUserInput,
): NumericInputPromptJSON => {
    const answers: Answer[] = renderProps.answers.map((answer) => ({
        message: answer.message,
        value: answer.value,
        status: answer.status,
        answerFormats: answer.answerForms,
        strictCheckAgainstAnswerFormats: answer.strict,
        maxError: answer.maxError,
        simplify: answer.simplify,
    }));

    return {
        type: WidgetType.NUMERIC_INPUT,
        label: renderProps.labelText,
        answers,
        userInput: {
            value: userInput.currentValue,
        },
    };
};
