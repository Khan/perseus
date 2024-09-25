import type {InteractiveMarkerScore, InteractiveMarkerType} from "./types";
import type {PerseusScore} from "../../types";
import type {
    PerseusLabelImageRubric,
    PerseusLabelImageUserInput,
} from "../../validation.types";

export function gradeMarker(
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

function labelImageValidator(
    state: PerseusLabelImageUserInput,
    rubric?: PerseusLabelImageRubric,
): PerseusScore {
    let numAnswered = 0;
    let numCorrect = 0;

    for (const marker of state.markers) {
        const score = gradeMarker(marker);

        if (score.hasAnswers) {
            numAnswered++;
        }

        if (score.isCorrect) {
            numCorrect++;
        }
    }

    // We expect all question markers to be answered before grading.
    if (numAnswered !== state.markers.length) {
        return {
            type: "invalid",
            message: null,
        };
    }

    return {
        type: "points",
        // Markers with no expected answers are graded as correct if user
        // makes no answer selection.
        earned: numCorrect === state.markers.length ? 1 : 0,
        total: 1,
        message: null,
    };
}

export default labelImageValidator;
