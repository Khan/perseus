import type {PerseusGraphType} from "../../perseus-types";
import type interactiveGraph from "../../widgets/interactive-graph";
import type React from "react";

type AngleUserInput = {
    coords: [
        [x: number, y: number],
        [x: number, y: number],
        [x: number, y: number],
    ];
    angleOffsetDegrees?: number;
};

export type InteractiveGraphPromptJSON = {
    type: "interactive-graph";
    options: {
        graph: {
            type: string;
        };
        backgroundImageUrl: string | null | undefined;
        range: [min: number, max: number][];
        labels: ReadonlyArray<string>;
    };
    userInput: AngleUserInput;
};

export const getPromptJSON = (
    props: React.ComponentProps<typeof interactiveGraph.widget>,
    userInput: PerseusGraphType,
): InteractiveGraphPromptJSON => {
    let input;

    switch (userInput.type) {
        case "angle":
            input = {
                coords: userInput.coords,
                angleOffsetDegrees: userInput.angleOffsetDeg,
            };
            break;
    }

    return {
        type: "interactive-graph",
        options: {
            graph: {
                type: props.graph.type,
            },
            backgroundImageUrl: props.backgroundImage?.url,
            range: props.range,
            labels: props.labels,
        },
        userInput: input,
    };
};
