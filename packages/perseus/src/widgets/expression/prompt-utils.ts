import {WidgetType} from "../../prompt-types";

import type expression from "./expression";
import type {PerseusExpressionUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof expression.widget>;

export type ExpressionPromptJSON = {
    type: WidgetType;
    label: WidgetProps["visibleLabel"];
    userInput: {
        value: PerseusExpressionUserInput;
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
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
