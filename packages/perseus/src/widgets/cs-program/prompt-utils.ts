import {WidgetType} from "../../prompt-types";

import type csProgram from "./cs-program";
import type {PerseusCSProgramUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof csProgram.widget>;

export type CSProgramPromptJSON = {
    type: WidgetType;
    programID: WidgetProps["programID"];
    userInput: {
        status: PerseusCSProgramUserInput["status"];
        message: PerseusCSProgramUserInput["message"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
    userInput: PerseusCSProgramUserInput,
): CSProgramPromptJSON => {
    return {
        type: WidgetType.CS_PROGRAM,
        programID: renderProps.programID,
        userInput: {
            status: userInput.status,
            message: userInput.message,
        },
    };
};
