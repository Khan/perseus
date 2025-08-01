import type {PerseusMockWidgetUserInput} from "./mock-widget-validation.types";
import type {ValidationResult} from "@khanacademy/perseus-core";

function validateMockWidget(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusMockWidgetUserInput | undefined,
): ValidationResult {
    if (userInput?.currentValue == null || userInput.currentValue === "") {
        return {
            type: "invalid",
            message: "",
        };
    }

    return null;
}

export default validateMockWidget;
