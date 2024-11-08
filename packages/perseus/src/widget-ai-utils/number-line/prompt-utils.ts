import type {PerseusNumberLineUserInput} from "../../validation.types";
import type numberLine from "../../widgets/number-line/number-line";
import type React from "react";

export type NumberLinePromptJSON = {
    type: "number-line";
    options: {
        range: ReadonlyArray<number>;
        numDivisions: number;
        snapDivisions: number;
    };
    userInput: {
        numLinePosition: number;
        numDivisions: number;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof numberLine.widget>,
    userInput: PerseusNumberLineUserInput,
): NumberLinePromptJSON => {
    return {
        type: "number-line",
        options: {
            range: renderProps.range,
            numDivisions: renderProps.numDivisions,
            snapDivisions: renderProps.snapDivisions,
        },
        userInput: {
            numLinePosition: userInput.numLinePosition,
            numDivisions: userInput.numDivisions,
        },
    };
};
