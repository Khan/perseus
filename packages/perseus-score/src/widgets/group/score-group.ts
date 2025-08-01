import {flattenScores, scoreWidgetsFunctional} from "../../score";

import type {
    PerseusGroupRubric,
    PerseusGroupUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

// The `group` widget is basically a widget hosting a full Perseus system in
// it. As such, scoring a group means scoring all widgets it contains.
function scoreGroup(
    userInput: PerseusGroupUserInput | undefined,
    rubric: PerseusGroupRubric,
    locale: string,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const scores = scoreWidgetsFunctional(
        rubric.widgets,
        Object.keys(rubric.widgets),
        userInput,
        locale,
    );

    return flattenScores(scores);
}

export default scoreGroup;
