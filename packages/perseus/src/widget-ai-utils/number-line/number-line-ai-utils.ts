import type numberLine from "../../widgets/number-line/number-line";
import type {PerseusNumberLineUserInput} from "@khanacademy/perseus-core";
import type React from "react";

export type NumberLinePromptJSON = {
    type: "number-line";
    options: {
        range: ReadonlyArray<number>;
        snapDivisions: number;
    };
    userInput: {
        numLinePosition: number;
        numDivisions: number;
        rel: string;
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
            snapDivisions: renderProps.snapDivisions,
        },
        userInput: {
            numLinePosition: userInput.numLinePosition,
            numDivisions: userInput.numDivisions,
            rel: userInput.rel,
        },
    };
};
