import type {
    PerseusScore,
    PerseusScorePoints,
    PerseusScoreInvalid,
} from "../packages/perseus/src/types";

// Asserts that the given PerseusScore is a "points" score
export function assertIsPoints(
    score: PerseusScore,
): asserts score is PerseusScorePoints {
    expect(score.type).toBe("points");
}

// Asserts that the given PerseusScore is an "invalid" score
export function assertIsInvalid(
    score: PerseusScore,
): asserts score is PerseusScoreInvalid {
    expect(score.type).toBe("invalid");
}
