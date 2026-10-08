import {
    isFailure,
    parseAndMigratePerseusItem,
    parseAndMigrateUserInputMap,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";

import type {PerseusQuestionResult} from "@khanacademy/perseus";

type CheckResponse =
    | {status: 200; body: PerseusQuestionResult}
    | {status: 400; body: {error: string}};

// Runs on your server, which keeps the full item (with answers) to itself.
// Wire `check` to a route such as POST /api/check.
export function createQuestionHandler(storedItemJson: string) {
    // Parse the stored item once. This also migrates older content.
    const parsed = parseAndMigratePerseusItem(storedItemJson);
    if (isFailure(parsed)) {
        throw new SyntaxError(parsed.detail.message);
    }
    const fullItem = parsed.value;

    return {
        // Send this to the browser: it has the answers stripped out.
        answerlessItem: splitPerseusItem(fullItem),

        check(requestBody: unknown): CheckResponse {
            // Never trust the client: validate the user input first.
            const userInput = parseAndMigrateUserInputMap(requestBody);
            if (isFailure(userInput)) {
                return {status: 400, body: {error: "Invalid user input"}};
            }
            const score = scorePerseusItem(
                fullItem.question,
                userInput.value,
                "en",
            );
            const correct =
                score.type === "points" && score.earned >= score.total;
            // Only send the answers back once they've been earned.
            return {
                status: 200,
                body: {score, solutions: correct ? fullItem : undefined},
            };
        },
    };
}
