import type {WidgetType} from "../../prompt-types";
import type {PerseusOrdererUserInput} from "../../validation.types";
import type orderer from "../../widgets/orderer/orderer";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof orderer.widget>;

export type OrdererPromptJSON = {
    type: WidgetType;
    options: {
        options: string[];
    };
    userInput: {
        values: PerseusOrdererUserInput["current"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
    userInput: PerseusOrdererUserInput,
): OrdererPromptJSON => {
    return {
        type: "orderer",
        options: {
            options: renderProps.options?.map((option) => option.content) || [],
        },
        userInput: {
            values: userInput.current,
        },
    };
};
