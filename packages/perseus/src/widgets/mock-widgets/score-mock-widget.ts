import validateMockWidget from "./validate-mock-widget";

import type {
    PerseusMockWidgetUserInput,
    PerseusMockWidgetRubric,
} from "./mock-widget-types";
import type {PerseusStrings} from "../../strings";
import type {PerseusScore} from "@khanacademy/perseus";

function scoreMockWidget(
    userInput: PerseusMockWidgetUserInput,
    rubric: PerseusMockWidgetRubric,
    strings: PerseusStrings,
): PerseusScore {
    const validationResult = validateMockWidget(userInput);
    if (validationResult != null) {
        return validationResult;
    }

    return {
        type: "points",
        earned: userInput.currentValue === rubric.value ? 1 : 0,
        total: 1,
        message: "",
    };
}

export default scoreMockWidget;
