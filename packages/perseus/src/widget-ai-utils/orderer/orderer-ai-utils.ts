import type orderer from "../../widgets/orderer/orderer";
import type {PerseusOrdererUserInput} from "@khanacademy/perseus-core";
import type React from "react";

export type OrdererPromptJSON = {
    type: "orderer";
    options: {
        options: ReadonlyArray<string>;
    };
    userInput: {
        values: ReadonlyArray<string>;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof orderer.widget>,
    userInput: PerseusOrdererUserInput,
): OrdererPromptJSON => {
    return {
        type: "orderer",
        options: {
            options: renderProps.options.map((option) => option.content),
        },
        userInput: {
            values: userInput.current,
        },
    };
};
