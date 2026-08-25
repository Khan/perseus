import type grapher from "../../widgets/grapher/grapher";
import type {GrapherAnswerTypes} from "@khanacademy/perseus-core";
import type React from "react";

/**
 * JSON describing a grapher widget. Intended for consumption by AI tools.
 * The grapher widget displays a Cartesian plane where the learner can plot an
 * equation by clicking and dragging control points.
 */
export interface GrapherPromptJSON {
    type: "grapher";

    /** The configuration of the widget, set by the content creator. */
    options: {
        /**
         * The types of equations the learner can plot. If there is more than
         * one entry in this array, the widget displays a set of buttons for
         * selecting the graph type.
         */
        availableTypes: ReadonlyArray<string>;

        /**
         * The bounds of the graph, in the format
         * `[[xMin, xMax], [yMin, yMax]]`.
         */
        range: [x: [min: number, max: number], y: [min: number, max: number]];

        /**
         * Labels for the x and y axes of the graph, in the format `[x, y]`.
         */
        labels: ReadonlyArray<string>;

        /**
         * The spacing between tick markings on the graph axes, measured in
         * units on the Cartesian plane. Format: `[xTickStep, yTickStep]`.
         */
        tickStep: [number, number];

        /**
         * The spacing between grid lines, measured in units on the Cartesian
         * plane. Format: `[xGridStep, yGridStep]`.
         */
        gridStep?: [number, number];

        /**
         * Control points snap to coordinates that are multiples of the snap
         * step. Format: `[xSnapStep, ySnapStep]`.
         */
        snapStep?: [number, number];

        /** An image displayed behind the graph */
        backgroundImageUrl?: string | null;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: GrapherAnswerTypes;
}

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof grapher.widget>,
): GrapherPromptJSON => {
    const {userInput} = widgetData;
    const {type, coords} = userInput;
    // eslint-disable-next-line no-restricted-syntax
    const input = {type, coords} as GrapherAnswerTypes;

    if (userInput.type === "logarithm" || userInput.type === "exponential") {
        input["asymptote"] = userInput.asymptote;
    }

    return {
        type: "grapher",
        options: {
            availableTypes: widgetData.options.availableTypes,
            range: widgetData.options.graph.range,
            labels: widgetData.options.graph.labels,
            tickStep: widgetData.options.graph.step,
            gridStep: widgetData.options.graph.gridStep,
            snapStep: widgetData.options.graph.snapStep,
            backgroundImageUrl: widgetData.options.graph.backgroundImage.url,
        },
        userInput: input,
    };
};
