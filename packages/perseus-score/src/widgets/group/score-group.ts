import {scoreWidgetsFunctional} from "../../score";
import flattenScores from "../../util/flatten-scores";

import type {
    PerseusGroupWidgetOptions,
    PerseusGroupUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

// The `group` widget is basically a widget hosting a full Perseus system in
// it. As such, scoring a group means scoring all widgets it contains.
function scoreGroup(
    userInput: PerseusGroupUserInput | undefined,
    widgetOptions: PerseusGroupWidgetOptions,
    locale: string,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const scores = scoreWidgetsFunctional(
        widgetOptions.widgets,
        Object.keys(widgetOptions.widgets),
        userInput,
        locale,
    );

    return flattenScores(scores);
}

export default scoreGroup;
