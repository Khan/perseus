import {scoreItem} from "../domain/items/score";

import {DraftNotFoundError} from "./errors";

import type {ItemScore, Outcome, ScoreResult} from "../domain/items/score";
import type {Issue} from "../domain/items/validate";
import type {DraftRepository} from "../ports/draft-repository";

export type ScoringDependencies = {drafts: DraftRepository};

/** An answer to try, and how the author expects Perseus to treat it. */
export type Guess = {
    /** e.g. "3/4 as a fraction" or "forgot to carry the 1". */
    label?: string;
    userInput: unknown;
    expected: Outcome;
};

export type GuessResult = {
    label?: string;
    expected: Outcome;
    /** Null if the user input couldn't be scored; see `issues`. */
    outcome: Outcome | null;
    matches: boolean;
    score?: ItemScore;
    issues?: Issue[];
};

/** Perseus parses numbers with the locale's separators; "en" by default. */
const DEFAULT_LOCALE = "en";

/** The use cases for scoring answers to a draft. */
export function createScoringUseCases(deps: ScoringDependencies) {
    function scoreDraft(
        itemId: string,
        userInput: unknown,
        locale: string,
    ): ScoreResult {
        const draft = deps.drafts.get(itemId);
        if (draft == null) {
            throw new DraftNotFoundError(itemId);
        }
        return scoreItem(draft.item, userInput, locale);
    }

    return {
        /** @throws DraftNotFoundError */
        scoreItem(
            itemId: string,
            userInput: unknown,
            locale = DEFAULT_LOCALE,
        ): ScoreResult {
            return scoreDraft(itemId, userInput, locale);
        },

        /**
         * Scores each guess and compares the outcome with the expected one.
         * A guess that can't be scored doesn't match, and its issues are
         * returned with it rather than failing the whole batch.
         *
         * @throws DraftNotFoundError
         */
        checkUserInputs(
            itemId: string,
            guesses: ReadonlyArray<Guess>,
            locale = DEFAULT_LOCALE,
        ): {mismatches: number; results: GuessResult[]} {
            const results = guesses.map(
                ({label, userInput, expected}): GuessResult => {
                    const result = scoreDraft(itemId, userInput, locale);
                    if (!result.ok) {
                        return {
                            label,
                            expected,
                            outcome: null,
                            matches: false,
                            issues: result.issues,
                        };
                    }
                    const {outcome} = result.score;
                    return {
                        label,
                        expected,
                        outcome,
                        matches: outcome === expected,
                        score: result.score,
                    };
                },
            );
            return {
                mismatches: results.filter((r) => !r.matches).length,
                results,
            };
        },
    };
}

export type ScoringUseCases = ReturnType<typeof createScoringUseCases>;
