import {WidgetType} from "../../prompt-types";

import type {PerseusCSProgramWidgetOptions} from "../../perseus-types";
import type {PerseusCSProgramUserInput} from "../../validation.types";

export type CSProgramPromptJSON = {
    type: WidgetType;
    programID: PerseusCSProgramWidgetOptions["programID"];
    userInput: {
        status: PerseusCSProgramUserInput["status"];
        message: PerseusCSProgramUserInput["message"];
    };
};

export const getPromptJSON = (
    renderProps: PerseusCSProgramWidgetOptions,
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
