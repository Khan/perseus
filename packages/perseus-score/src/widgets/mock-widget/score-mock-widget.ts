import validateMockWidget from "./validate-mock-widget";

import type {
    PerseusMockWidgetRubric,
    PerseusMockWidgetUserInput,
} from "./mock-widget-validation.types";
import type {PerseusScore} from "../../validation.types";

function scoreMockWidget(
    userInput: PerseusMockWidgetUserInput,
    rubric: PerseusMockWidgetRubric,
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
