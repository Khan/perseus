import type grapher from "../../widgets/grapher/grapher";
import type {GrapherAnswerTypes} from "@khanacademy/perseus-core";
import type React from "react";

export type GrapherPromptJSON = {
    type: "grapher";
    options: {
        availableTypes: ReadonlyArray<string>;
        range: [x: [min: number, max: number], y: [min: number, max: number]];
        labels: ReadonlyArray<string>;
        tickStep: [number, number];
        gridStep?: [number, number];
        snapStep?: [number, number];
        backgroundImageUrl?: string | null;
    };
    userInput: GrapherAnswerTypes;
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof grapher.widget>,
): GrapherPromptJSON => {
    const {userInput} = renderProps;
    const {type, coords} = userInput;
    const input = {type, coords} as GrapherAnswerTypes;

    if (userInput.type === "logarithm" || userInput.type === "exponential") {
        input["asymptote"] = userInput.asymptote;
    }

    return {
        type: "grapher",
        options: {
            availableTypes: renderProps.availableTypes,
            range: renderProps.graph.range,
            labels: renderProps.graph.labels,
            tickStep: renderProps.graph.step,
            gridStep: renderProps.graph.gridStep,
            snapStep: renderProps.graph.snapStep,
            backgroundImageUrl: renderProps.graph.backgroundImage.url,
        },
        userInput: input,
    };
};
