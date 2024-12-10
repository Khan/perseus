import {Errors, PerseusError} from "@khanacademy/perseus-core";

import type {PerseusScore} from "../types";
import type {UserInputArray} from "../validation.types";
import type {KEScore} from "@khanacademy/perseus-core";

const noScore: PerseusScore = {
    type: "points",
    earned: 0,
    total: 0,
    message: null,
};

/**
 * If a widget says that it is empty once it is graded.
 * Trying to encapsulate references to the score format.
 */
export function scoreIsEmpty(score: PerseusScore): boolean {
    // HACK(benkomalo): ugh. this isn't great; the Perseus score objects
    // overload the type "invalid" for what should probably be three
    // distinct cases:
    //  - truly empty or not fully filled out
    //  - invalid or malformed inputs
    //  - "almost correct" like inputs where the widget wants to give
    //  feedback (e.g. a fraction needs to be reduced, or `pi` should
    //  be used instead of 3.14)
    //
    //  Unfortunately the coercion happens all over the place, as these
    //  Perseus style score objects are created *everywhere* (basically
    //  in every widget), so it's hard to change now. We assume that
    //  anything with a "message" is not truly empty, and one of the
    //  latter two cases for now.
    return (
        score.type === "invalid" &&
        (!score.message || score.message.length === 0)
    );
}

/**
 * Combine two score objects.
 *
 * Given two score objects for two different widgets, combine them so that
 * if one is wrong, the total score is wrong, etc.
 */
export function combineScores(
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

export function flattenScores(widgetScoreMap: {
    [widgetId: string]: PerseusScore;
}): PerseusScore {
    return Object.values(widgetScoreMap).reduce(combineScores, noScore);
}

export function isCorrect(score: PerseusScore): boolean {
    return score.type === "points" && score.earned >= score.total;
}

export function keScoreFromPerseusScore(
    score: PerseusScore,
    // It's weird, but this is what we're passing it
    guess: UserInputArray | [UserInputArray, []],
    state: any,
): KEScore {
    if (score.type === "points") {
        return {
            empty: false,
            correct: isCorrect(score),
            message: score.message,
            guess: guess,
            state: state,
        };
    }
    if (score.type === "invalid") {
        return {
            empty: true,
            correct: false,
            message: score.message,
            suppressAlmostThere: score.suppressAlmostThere,
            guess: guess,
            state: state,
        };
    }
    throw new PerseusError(
        // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'never'.
        "Invalid score type: " + score.type,
        Errors.InvalidInput,
        {
            metadata: {
                score: JSON.stringify(score),
                guess: JSON.stringify(guess),
                state: JSON.stringify(state),
            },
        },
    );
}
