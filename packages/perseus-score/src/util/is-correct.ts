import type {PerseusScore} from "@khanacademy/perseus-core";

/**
 * Returns true if the score earned all of its available points.
 */
export function isCorrect(score: PerseusScore): boolean {
    return score.type === "points" && score.earned >= score.total;
}
