import type numberLine from "../../widgets/number-line/number-line";
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
): NumberLinePromptJSON => {
    const {userInput} = renderProps;
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
