import type grapher from "./grapher";
import type {GrapherAnswerTypes} from "../../perseus-types";
import type {WidgetType} from "../../prompt-types";
import type {PerseusGrapherUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof grapher.widget>;

export type GrapherPromptJSON = {
    type: WidgetType;
    options: {
        availableTypes: WidgetProps["availableTypes"];
        range: WidgetProps["graph"]["range"];
        labels: WidgetProps["graph"]["labels"];
        tickStep: WidgetProps["graph"]["step"];
        gridStep: WidgetProps["graph"]["gridStep"];
        snapStep: WidgetProps["graph"]["snapStep"];
        backgroundImage: WidgetProps["graph"]["backgroundImage"]["url"];
    };
    userInput: GrapherAnswerTypes;
};

export const getPromptJSON = (
    renderProps: WidgetProps,
    userInput: PerseusGrapherUserInput,
): GrapherPromptJSON => {
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
            backgroundImage: renderProps.graph.backgroundImage.url,
        },
        userInput: input,
    };
};
