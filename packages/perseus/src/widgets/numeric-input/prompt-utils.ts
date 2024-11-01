import type {NumericInput} from "./numeric-input";
import type {PerseusNumericInputWidgetOptions} from "../../perseus-types";
import type {WidgetType} from "../../prompt-types";
import type {PerseusNumericInputUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type NumericInputPromptJSON = {
    type: WidgetType;
    label: PerseusNumericInputWidgetOptions["labelText"];
    userInput: {
        value: PerseusNumericInputUserInput["currentValue"];
    };
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof NumericInput>,
    userInput: PerseusNumericInputUserInput,
): NumericInputPromptJSON => {
    return {
        type: "numeric-input",
        label: renderProps.labelText || "",
        userInput: {
            value: userInput.currentValue,
        },
    };
};
