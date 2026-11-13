import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

import flattenScores from "../../util/flatten-scores";

import type {
    PerseusGroupWidgetOptions,
    PerseusGroupUserInput,
    PerseusScore,
    ScorerContext,
} from "@khanacademy/perseus-core";

// The `group` widget is basically a widget hosting a full Perseus system in
// it. As such, scoring a group means scoring all widgets it contains.
function scoreGroup(
    userInput: PerseusGroupUserInput | undefined,
    rubric: PerseusGroupWidgetOptions,
    locale: string,
    context: ScorerContext,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const scores = context.scoreWidgets(
        rubric.widgets,
        getWidgetIdsFromContent(rubric.content),
        userInput,
        locale,
    );

    return flattenScores(scores);
}

export default scoreGroup;
