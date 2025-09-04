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
    widgetData: React.ComponentProps<typeof orderer.widget>,
): OrdererPromptJSON => {
    return {
        type: "orderer",
        options: {
            options: widgetData.options.map((option) => option.content),
        },
        userInput: {
            values: widgetData.userInput.current,
        },
    };
};
