import {WidgetType} from "../../prompt-types";

import {getPromptJSON} from "./prompt-utils";

import type {PerseusCSProgramUserInput} from "../../validation.types";

describe("CS Program getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            programID: 12345,
        };

        const userInput: PerseusCSProgramUserInput = {
            status: "incomplete",
            message: "Keep going!",
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: WidgetType.CS_PROGRAM,
            programID: renderProps.programID,
            userInput,
        });
    });
});
