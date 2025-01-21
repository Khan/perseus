import type {PerseusMockWidgetUserInput} from "./mock-widget-types";
import type {ValidationResult} from "../../types";

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
