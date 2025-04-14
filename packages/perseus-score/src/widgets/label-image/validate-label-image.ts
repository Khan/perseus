import type {
    PerseusLabelImageUserInput,
    ValidationResult,
} from "@khanacademy/perseus-core";

function validateLabelImage(
    userInput: PerseusLabelImageUserInput,
): ValidationResult {
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
