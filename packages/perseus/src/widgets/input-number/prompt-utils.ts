import type inputNumber from "./input-number";
import type {WidgetType} from "../../prompt-types";
import type {PerseusInputNumberUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof inputNumber.widget>;

export type InputNumberPromptJSON = {
    type: WidgetType;
    options: {
        simplify: WidgetProps["simplify"];
        answerType: WidgetProps["answerType"];
    };
    userInput: {
        value: PerseusInputNumberUserInput["currentValue"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
    userInput: PerseusInputNumberUserInput,
): InputNumberPromptJSON => {
    return {
        type: "input-number",
        options: {
            simplify: renderProps.simplify,
            answerType: renderProps.answerType,
        },
        userInput: {
            value: userInput.currentValue,
        },
    };
};
