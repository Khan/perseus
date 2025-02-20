import type {PerseusMockWidgetUserInput} from "./mock-widget-validation.types";
import type {ValidationResult} from "../../validation.types";

function validateMockWidget(
    userInput: PerseusMockWidgetUserInput,
): ValidationResult {
    if (userInput.currentValue == null || userInput.currentValue === "") {
        return {
            type: "invalid",
            message: "",
        };
    }

    return null;
}

export default validateMockWidget;
