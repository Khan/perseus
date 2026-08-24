import {approximateDeepEqual} from "@khanacademy/perseus-core";

import type {
    PerseusSorterWidgetOptions,
    PerseusSorterUserInput,
    PerseusScore,
} from "@khanacademy/perseus-core";

function scoreSorter(
    userInput: PerseusSorterUserInput,
    widgetOptions: PerseusSorterWidgetOptions,
): PerseusScore {
    const correct = approximateDeepEqual(
        userInput.options,
        widgetOptions.correct,
    );
    return {
        type: "points",
        earned: correct ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreSorter;
