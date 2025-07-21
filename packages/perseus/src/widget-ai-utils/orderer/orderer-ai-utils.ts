import type orderer from "../../widgets/orderer/orderer";
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
): OrdererPromptJSON => {
    return {
        type: "orderer",
        options: {
            options: renderProps.options.map((option) => option.content),
        },
        userInput: {
            values: renderProps.userInput.current,
        },
    };
};
