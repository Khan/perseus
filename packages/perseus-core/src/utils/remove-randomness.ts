import deepClone from "./deep-clone";

import type {PerseusRenderer} from "../data-schema";

export default function removeRandomness(
    renderer: PerseusRenderer,
    serializedState: any,
): PerseusRenderer {
    const output = deepClone(renderer);

    Object.keys(output.widgets).forEach((widgetId) => {
        const widgetData = output.widgets[widgetId];
        const widgetSerialized = serializedState[widgetId];

        if (
            widgetSerialized &&
            widgetData.type === "radio" &&
            widgetData.options.randomize
        ) {
            output.widgets[widgetId].options = {
                ...output.widgets[widgetId].options,
                randomize: false,
                choices: widgetSerialized.choices.map((c) => {
                    return widgetData.options.choices[c.originalIndex];
                }),
            };
        }
    });

    return output;
}
