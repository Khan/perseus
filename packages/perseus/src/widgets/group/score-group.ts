import {scoreWidgetsFunctional} from "../../renderer-util";
import {flattenScores} from "../../util/scoring";

import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "../../types";
import type {
    PerseusGroupScoringData,
    PerseusGroupUserInput,
} from "../../validation.types";

// The `group` widget is basically a widget hosting a full Perseus system in
// it. As such, scoring a group means scoring all widgets it contains.
function scoreGroup(
    userInput: PerseusGroupUserInput,
    options: PerseusGroupScoringData,
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
