import {getWidgetIdsFromContent} from "@khanacademy/perseus-core";

import {scoreWidgetsFunctional} from "../../score";
import flattenScores from "../../util/flatten-scores";

import type {
    PerseusGroupWidgetOptions,
    PerseusGroupUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

// The `group` widget is basically a widget hosting a full Perseus system in
// it. As such, scoring a group means scoring all widgets it contains.
// The `export default` must stay on the function itself. The group widget
// causes an import cycle because it can contain other widgets. The widget
// registry reads this export before this module finishes loading. A separate
// `export default scoreGroup;` line hasn't run yet at that point, so under
// ES modules the read throws a ReferenceError, and under CommonJS it gets
// `undefined`.
export default function scoreGroup(
    userInput: PerseusGroupUserInput | undefined,
    rubric: PerseusGroupWidgetOptions,
    locale: string,
): PerseusScore {
    if (userInput == null) {
        return {type: "invalid", message: null};
    }

    const scores = scoreWidgetsFunctional(
        rubric.widgets,
        getWidgetIdsFromContent(rubric.content),
        userInput,
        locale,
    );

    return flattenScores(scores);
}
