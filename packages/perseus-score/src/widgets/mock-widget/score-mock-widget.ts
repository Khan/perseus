import validateMockWidget from "./validate-mock-widget";

import type {
    PerseusMockWidgetRubric,
    PerseusMockWidgetUserInput,
} from "./mock-widget-validation.types";
import type {PerseusScore} from "@khanacademy/perseus-core";

function scoreMockWidget(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusMockWidgetUserInput | undefined,
    rubric: PerseusMockWidgetRubric,
): PerseusScore {
    const validationResult = validateMockWidget(userInput);
    if (validationResult != null) {
        return validationResult;
    }

    return {
        type: "points",
        earned: userInput?.currentValue === rubric.value ? 1 : 0,
        total: 1,
        message: "",
    };
}

export default scoreMockWidget;
