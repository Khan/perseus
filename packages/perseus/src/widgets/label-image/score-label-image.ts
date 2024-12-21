import validateLabelImage from "./validate-label-image";

import type {PerseusScore} from "../../types";
import type {
    PerseusLabelImageScoringData,
    PerseusLabelImageUserInput,
} from "../../validation.types";

// Question state for marker as result of user selected answers.
type InteractiveMarkerScore = {
    // Whether user selected answers for the marker.
    hasAnswers: boolean;
    // Whether user (answer) selection answered the question correctly.
    isCorrect: boolean;
};

export function scoreMarker(
    userInput: PerseusLabelImageUserInput["markers"][number]["selected"],
    scoringData: PerseusLabelImageScoringData["markers"][number]["answers"],
): InteractiveMarkerScore {
    const score = {
        hasAnswers: false,
        isCorrect: false,
    };

    if (userInput && userInput.length > 0) {
        score.hasAnswers = true;
    }

    if (scoringData.length > 0) {
        if (userInput && userInput.length === scoringData.length) {
            // All correct answers are selected by the user.
            score.isCorrect = userInput.every((choice) =>
                scoringData.includes(choice),
            );
        }
    } else if (!userInput || userInput.length === 0) {
        // Correct as no answers should be selected by the user.
        score.isCorrect = true;
    }

    return score;
}

function scoreLabelImage(
    userInput: PerseusLabelImageUserInput,
    scoringData: PerseusLabelImageScoringData,
): PerseusScore {
    const validationError = validateLabelImage(userInput);
    if (validationError) {
        return validationError;
    }

    let numCorrect = 0;

    for (let i = 0; i < userInput.markers.length; i++) {
        const score = scoreMarker(
            userInput.markers[i].selected,
            scoringData.markers[i].answers,
        );

        if (score.isCorrect) {
            numCorrect++;
        }
    }

    return {
        type: "points",
        // Markers with no expected answers are graded as correct if user
        // makes no answer selection.
        earned: numCorrect === userInput.markers.length ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default scoreLabelImage;
