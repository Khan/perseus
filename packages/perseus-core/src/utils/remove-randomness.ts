import deepClone from "./deep-clone";

import type {PerseusWidgetsMap} from "../data-schema";

/**
 * removeRandomness is a stopgap measure to restore the
 * shuffled state of widgets without injecting SerializedState
 * directly back into Perseus. It takes a PerseusItem and SerializedState
 * and returns a new PerseusItem with choices already reshuffled.
 */
export default function removeRandomness(
    widgets: PerseusWidgetsMap,
    serializedState: any,
): PerseusWidgetsMap {
    const output = deepClone(widgets);

    if (!serializedState) {
        return output;
    }

    Object.keys(output).forEach((widgetId) => {
        const widgetData = output[widgetId];
        const widgetSerialized = serializedState?.[widgetId];

        if (
            widgetSerialized?.choices?.length &&
            widgetData.type === "radio" &&
            widgetData.options.randomize
        ) {
            output[widgetId].options = {
                ...output[widgetId].options,
                randomize: false,
                choices: widgetSerialized.choices.map((c) => {
                    return widgetData.options.choices[c.originalIndex];
                }),
            };
        }
    });

    return output;
}
