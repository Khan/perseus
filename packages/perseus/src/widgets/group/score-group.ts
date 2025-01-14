import {scoreWidgetsFunctional} from "../../renderer-util";
import {flattenScores} from "../../util/scoring";

import type {PerseusStrings} from "../../strings";
import type {
    PerseusScore,
    PerseusGroupRubric,
    PerseusGroupUserInput,
} from "@khanacademy/perseus-score";

// The `group` widget is basically a widget hosting a full Perseus system in
// it. As such, scoring a group means scoring all widgets it contains.
function scoreGroup(
    userInput: PerseusGroupUserInput,
    options: PerseusGroupRubric,
    strings: PerseusStrings,
    locale: string,
): PerseusScore {
    const scores = scoreWidgetsFunctional(
        options.widgets,
        Object.keys(options.widgets),
        userInput,
        strings,
        locale,
    );

    return flattenScores(scores);
}

export default scoreGroup;
