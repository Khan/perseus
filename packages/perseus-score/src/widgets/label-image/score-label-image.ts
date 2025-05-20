import type {
    PerseusLabelImageUserInput,
    PerseusLabelImageRubric,
    PerseusScore,
} from "@khanacademy/perseus-core";

// Question state for marker as result of user selected answers.
export type InteractiveMarkerScore = {
    // Whether user selected answers for the marker.
    hasAnswers: boolean;
    // Whether user (answer) selection answered the question correctly.
    isCorrect: boolean;
};

export function scoreLabelImageMarker(
    userInput: PerseusLabelImageUserInput["markers"][number]["selected"],
    rubric: PerseusLabelImageRubric["markers"][number]["answers"],
): InteractiveMarkerScore {
    const score = {
        hasAnswers: false,
        isCorrect: false,
    };

    if (userInput && userInput.length > 0) {
        score.hasAnswers = true;
    }

    if (rubric.length > 0) {
        if (userInput && userInput.length === rubric.length) {
            // All correct answers are selected by the user.
            score.isCorrect = userInput.every((choice) =>
                rubric.includes(choice),
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
    rubric: PerseusLabelImageRubric,
): PerseusScore {
    let numCorrect = 0;

    for (let i = 0; i < userInput.markers.length; i++) {
        const score = scoreLabelImageMarker(
            userInput.markers[i].selected,
            rubric.markers[i].answers,
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
