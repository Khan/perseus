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
    widgetData: React.ComponentProps<typeof numberLine.widget>,
): NumberLinePromptJSON => {
    const {userInput} = widgetData;
    return {
        type: "number-line",
        options: {
            range: widgetData.range,
            snapDivisions: widgetData.snapDivisions,
        },
        userInput: {
            numLinePosition: userInput.numLinePosition,
            numDivisions: userInput.numDivisions,
            rel: userInput.rel,
        },
    };
};
