import type iframe from "./iframe";
import type {WidgetType} from "../../prompt-types";
import type {PerseusIFrameUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof iframe.widget>;

export type IFramePromptJSON = {
    type: WidgetType;
    options: {
        url: WidgetProps["url"];
    };
    userInput: {
        message: PerseusIFrameUserInput["message"];
        status: PerseusIFrameUserInput["status"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
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
