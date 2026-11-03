import {
    isFailure,
    parseAndMigrateUserInputMap,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

import type {Issue} from "./validate";
import type {PerseusItem, PerseusScore} from "@khanacademy/perseus-core";

/**
 * How Perseus would treat an answer: "invalid" means it isn't scored at all
 * (e.g. a widget is left empty), so the learner is asked to finish it.
 */
export type Outcome = "correct" | "incorrect" | "invalid";

export type ItemScore = {
    outcome: Outcome;
    /** The item's score, as Perseus computes it. */
    score: PerseusScore;
    /** Each widget's score, by widget id. Only invalid ones if invalid. */
    widgetScores: Record<string, PerseusScore>;
};

export type ScoreResult =
    | {ok: true; score: ItemScore}
    | {ok: false; issues: Issue[]};

function failure(path: string, code: string, message: string): ScoreResult {
    return {ok: false, issues: [{severity: "error", code, path, message}]};
}

function outcomeOf(score: PerseusScore): Outcome {
    if (score.type === "invalid") {
        return "invalid";
    }
    // Perseus counts a score as correct once every point is earned.
    return score.earned >= score.total ? "correct" : "incorrect";
}

/**
 * Scores a learner's answer to an item's question the way Perseus does when
 * they press "Check". `userInput` maps widget ids to each widget's user
 * input; it's parsed (and migrated) first, and an input for a widget the
 * question doesn't have is rejected, since Perseus would silently ignore it.
 */
export function scoreItem(
    item: PerseusItem,
    userInput: unknown,
    locale: string,
): ScoreResult {
    let parsed: ReturnType<typeof parseAndMigrateUserInputMap>;
    try {
        parsed = parseAndMigrateUserInputMap(userInput);
    } catch (e) {
        // The parser throws a SyntaxError for a string that isn't JSON.
        return failure("userInput", "invalid-user-input", String(e));
    }
    if (isFailure(parsed)) {
        return failure(
            "userInput",
            "invalid-user-input",
            parsed.detail.message,
        );
    }

    const widgetIds = Object.keys(item.question.widgets);
    const unknown = Object.keys(parsed.value).filter(
        (id) => !widgetIds.includes(id),
    );
    if (unknown.length > 0) {
        const known =
            widgetIds.length === 0
                ? "It has no widgets."
                : `Its widgets are: ${widgetIds.join(", ")}.`;
        return failure(
            "userInput",
            "unknown-widget-id",
            `The question has no widget ${unknown
                .map((id) => `"${id}"`)
                .join(", ")}. ${known}`,
        );
    }

    const {widgetScores, ...score} = scorePerseusItem(
        item.question,
        parsed.value,
        locale,
    );
    return {
        ok: true,
        score: {outcome: outcomeOf(score), score, widgetScores},
    };
}
