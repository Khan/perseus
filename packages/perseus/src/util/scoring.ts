import {Errors, PerseusError} from "@khanacademy/perseus-core";

import type {KEScore, PerseusScore, UserInput} from "@khanacademy/perseus-core";

export function isCorrect(score: PerseusScore): boolean {
    return score.type === "points" && score.earned >= score.total;
}

export function keScoreFromPerseusScore(
    score: PerseusScore,
    // It's weird, but this is what we're passing it
    guess: UserInput[] | [UserInput[], []],
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
