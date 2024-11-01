import type {WidgetType} from "../../prompt-types";
import type {PerseusNumberLineUserInput} from "../../validation.types";
import type numberLine from "../../widgets/number-line/number-line";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof numberLine.widget>;

export type NumberLinePromptJSON = {
    type: WidgetType;
    options: {
        range: WidgetProps["range"];
        numDivisions: WidgetProps["numDivisions"];
        snapDivisions: WidgetProps["snapDivisions"];
    };
    userInput: {
        numLinePosition: PerseusNumberLineUserInput["numLinePosition"];
        numDivisions: PerseusNumberLineUserInput["numDivisions"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
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
