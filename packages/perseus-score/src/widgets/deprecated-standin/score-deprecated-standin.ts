import type {PerseusScore} from "@khanacademy/perseus-core";

/**
 * Scoring function for deprecated-standin widget.
 *
 * The deprecated-standin widget is used as a placeholder for deprecated widgets
 * to prevent old content from breaking. It always scores as correct (full credit)
 * so that content using deprecated widgets doesn't experience any regressions.
 */
function scoreDeprecatedStandin(
    userInput: any,
    rubric: any,
    locale: string,
): PerseusScore {
    return {
        type: "points",
        earned: 1,
        total: 1,
        message: null,
    };
}

export default scoreDeprecatedStandin;
