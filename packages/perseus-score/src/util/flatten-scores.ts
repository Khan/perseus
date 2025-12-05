import {Errors, PerseusError} from "@khanacademy/perseus-core";

import type {PerseusScore} from "@khanacademy/perseus-core";

const noScore: PerseusScore = {
    type: "points",
    earned: 0,
    total: 0,
    message: null,
};

/**
 * Combine two score objects.
 *
 * Given two score objects for two different widgets, combine them so that
 * if one is wrong, the total score is wrong, etc.
 */
function combineScores(
    scoreA: PerseusScore,
    scoreB: PerseusScore,
): PerseusScore {
    let message;

    if (scoreA.type === "points" && scoreB.type === "points") {
        if (
            scoreA.message &&
            scoreB.message &&
            scoreA.message !== scoreB.message
        ) {
            // TODO(alpert): Figure out how to combine messages usefully
            message = null;
        } else {
            message = scoreA.message || scoreB.message;
        }

        return {
            type: "points",
            earned: scoreA.earned + scoreB.earned,
            total: scoreA.total + scoreB.total,
            message: message,
        };
    }
    if (scoreA.type === "points" && scoreB.type === "invalid") {
        return scoreB;
    }
    if (scoreA.type === "invalid" && scoreB.type === "points") {
        return scoreA;
    }
    if (scoreA.type === "invalid" && scoreB.type === "invalid") {
        if (
            scoreA.message &&
            scoreB.message &&
            scoreA.message !== scoreB.message
        ) {
            // TODO(alpert): Figure out how to combine messages usefully
            message = null;
        } else {
            message = scoreA.message || scoreB.message;
        }

        return {
            type: "invalid",
            message: message,
        };
    }

    /**
     * The above checks cover all combinations of score type, so if we get here
     * then something is amiss with our inputs.
     */
    throw new PerseusError(
        "PerseusScore with unknown type encountered",
        Errors.InvalidInput,
        {
            metadata: {
                scoreA: JSON.stringify(scoreA),
                scoreB: JSON.stringify(scoreB),
            },
        },
    );
}

export default function flattenScores(widgetScoreMap: {
    [widgetId: string]: PerseusScore;
}): PerseusScore {
    return Object.values(widgetScoreMap).reduce(combineScores, noScore);
}
