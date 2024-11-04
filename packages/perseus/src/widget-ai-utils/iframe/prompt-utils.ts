import type {PerseusIFrameUserInput} from "../../validation.types";
import type iframe from "../../widgets/iframe/iframe";
import type React from "react";

export type IFramePromptJSON = {
    type: "iframe";
    options: {
        url: string;
    };
    userInput: {
        message: string | null;
        status: string;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof iframe.widget>,
    userInput: PerseusIFrameUserInput,
): IFramePromptJSON => {
    return {
        type: "iframe",
        options: {
            url: renderProps.url,
        },
        userInput: {
            message: userInput.message,
            status: userInput.status,
        },
    };
};
