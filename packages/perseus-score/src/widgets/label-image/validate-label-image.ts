import type {
    PerseusLabelImageUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

function validateLabelImage(
    // NOTE(benchristel): userInput can be undefined if the widget has never
    // been interacted with.
    userInput: PerseusLabelImageUserInput | undefined,
): ValidationResult {
    if (userInput == null) {
        return {
            type: "invalid",
            message: null,
        };
    }

    let numAnswered = 0;
    for (let i = 0; i < userInput.markers.length; i++) {
        const userSelection = userInput.markers[i].selected;
        if (userSelection && userSelection.length > 0) {
            numAnswered++;
        }
    }
    // We expect all question markers to be answered before grading.
    if (numAnswered !== userInput.markers.length) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return null;
}

export default validateLabelImage;
