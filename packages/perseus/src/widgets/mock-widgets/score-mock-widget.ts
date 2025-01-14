import {KhanAnswerTypes} from "@khanacademy/perseus-score";

import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "@khanacademy/perseus";
import type {
    PerseusMockWidgetUserInput,
    PerseusMockWidgetRubric,
} from "@khanacademy/perseus-score";

function scoreMockWidget(
    userInput: PerseusMockWidgetUserInput,
    rubric: PerseusMockWidgetRubric,
    strings: PerseusStrings,
): PerseusScore {
    const stringValue = `${rubric.value}`;
    const val = KhanAnswerTypes.number.createValidatorFunctional(
        stringValue,
        strings,
    );

    const result = val(userInput.currentValue);

    if (result.empty) {
        return {
            type: "invalid",
            message: result.message,
        };
    }
    return {
        type: "points",
        earned: result.correct ? 1 : 0,
        total: 1,
        message: result.message,
    };
}

export default scoreMockWidget;
