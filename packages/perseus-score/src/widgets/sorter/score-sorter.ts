import {
    approximateDeepEqual,
    exceedsCardLimit,
} from "@khanacademy/perseus-core";

import type {
    PerseusSorterWidgetOptions,
    PerseusSorterUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreSorter(
    userInput: PerseusSorterUserInput,
    rubric: PerseusSorterWidgetOptions,
): PerseusScore {
    // These sorters render as the deprecated standin, so the learner was never
    // shown anything to answer. Award the point so they aren't blocked.
    if (exceedsCardLimit(rubric.correct)) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    }

    const correct = approximateDeepEqual(userInput.options, rubric.correct);
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreSorter;
