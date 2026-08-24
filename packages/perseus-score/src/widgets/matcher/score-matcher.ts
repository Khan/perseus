import _ from "underscore";

import type {
    PerseusMatcherWidgetOptions,
    PerseusMatcherUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreMatcher(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusMatcherUserInput | undefined,
    widgetOptions: PerseusMatcherWidgetOptions,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const correct =
        _.isEqual(userInput.left, widgetOptions.left) &&
        _.isEqual(userInput.right, widgetOptions.right);

    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreMatcher;
