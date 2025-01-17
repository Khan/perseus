import type {
    PerseusLabelImageUserInput,
    PerseusLabelImageRubric,
    PerseusScore,
} from "../../validation.types";
import type {InteractiveMarkerType} from "@khanacademy/perseus-core";

// Question state for marker as result of user selected answers.
type InteractiveMarkerScore = {
    // Whether user selected answers for the marker.
    hasAnswers: boolean;
    // Whether user (answer) selection answered the question correctly.
    isCorrect: boolean;
};

export function scoreLabelImageMarker(
    marker: InteractiveMarkerType,
): InteractiveMarkerScore {
    const score = {
        hasAnswers: false,
        isCorrect: false,
    };

    if (marker.selected && marker.selected.length > 0) {
        score.hasAnswers = true;
    }

    if (marker.answers.length > 0) {
        if (
            marker.selected &&
            marker.selected.length === marker.answers.length
        ) {
            // All correct answers are selected by the user.
            score.isCorrect = marker.selected.every((choice) =>
                marker.answers.includes(choice),
            );
        }
    } else if (!marker.selected || marker.selected.length === 0) {
        // Correct as no answers should be selected by the user.
        score.isCorrect = true;
    }

    return score;
}

// TODO(LEMS-2440): May need to pull answers out of PerseusLabelImageWidgetOptions[markers] for the rubric
function scoreLabelImage(
    userInput: PerseusLabelImageUserInput,
    rubric?: PerseusLabelImageRubric,
): PerseusScore {
    let numAnswered = 0;
    let numCorrect = 0;

    for (const marker of userInput.markers) {
        const score = scoreLabelImageMarker(marker);

        if (score.hasAnswers) {
            numAnswered++;
        }

        if (score.isCorrect) {
            numCorrect++;
        }
    }

    // We expect all question markers to be answered before grading.
    if (numAnswered !== userInput.markers.length) {
        return {
            type: "invalid",
            message: null,
        };
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
