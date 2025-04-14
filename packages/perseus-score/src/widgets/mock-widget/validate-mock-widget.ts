import type {PerseusMockWidgetUserInput} from "./mock-widget-validation.types";
import type {ValidationResult} from "@khanacademy/perseus-core";

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
