import type {PerseusScore} from "@khanacademy/perseus-core";

// TODO: Move to `perseus-score`!
export function isCorrect(score: PerseusScore): boolean {
    return score.type === "points" && score.earned >= score.total;
}
