import {WidgetType} from "../../prompt-types";

import type {Expression} from "./expression";
import type {PerseusExpressionUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type ExpressionPromptJSON = {
    type: WidgetType;
    label?: string;
    userInput: {
        value: string;
    };
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof Expression>,
    userInput: PerseusExpressionUserInput,
): ExpressionPromptJSON => {
    return {
        type: WidgetType.EXPRESSION,
        label: renderProps.visibleLabel,
        userInput: {
            value: userInput,
        },
    };
};
