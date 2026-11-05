import {
    boldFirstLine,
    describeChange,
    replaceText,
} from "../domain/fixes/fixes";

import {DraftNotFoundError, InvalidFixError} from "./errors";

import type {DraftUseCases} from "./drafts";
import type {ExerciseUseCases} from "./exercises";
import type {FixName, FixResult, FixScope} from "../domain/fixes/fixes";
import type {Issue} from "../domain/items/validate";
import type {DraftRepository} from "../ports/draft-repository";

/** A fix and its options. */
export type FixRequest =
    | {fix: "bold-first-line"}
    | {
          fix: "replace-text";
          find: string;
          replace: string;
          regex?: boolean;
          scope?: FixScope;
      };

/** The drafts to fix: some by id, or all of an exercise's. */
export type FixTarget = {itemIds: ReadonlyArray<string>} | {exerciseId: string};

/** What the fix did, or would do, to one draft. */
export type FixOutcome =
    | {
          itemId: string;
          outcome: "changed" | "would change";
          revision?: number;
          changes: Array<ReturnType<typeof describeChange>>;
          warnings?: number;
      }
    | {itemId: string; outcome: "unchanged"; reason: string}
    | {itemId: string; outcome: "rejected"; issues: Issue[]};

/** How many outcomes a result lists in full; the rest are only counted. */
const MAX_LISTED = 50;

export function createFixUseCases(deps: {
    drafts: DraftRepository;
    draftUseCases: Pick<DraftUseCases, "editItem">;
    exercises: Pick<ExerciseUseCases, "getExercise">;
}) {
    function itemIdsFor(target: FixTarget): string[] {
        if ("itemIds" in target) {
            return [...new Set(target.itemIds)];
        }
        return deps.exercises
            .getExercise(target.exerciseId)
            .problemTypes.flatMap((problemType) =>
                problemType.items.map(({itemId}) => itemId),
            );
    }

    function fixer(request: FixRequest) {
        if (request.fix === "bold-first-line") {
            return boldFirstLine;
        }
        if (request.find === "") {
            throw new InvalidFixError("replace-text needs a `find`.");
        }
        if (request.regex === true) {
            try {
                // Called for its check: it throws on a bad pattern.
                RegExp(request.find, "g");
            } catch (e) {
                throw new InvalidFixError(
                    `\`find\` isn't a valid regular expression: ${String(e)}`,
                );
            }
        }
        const options = {
            find: request.find,
            replace: request.replace,
            regex: request.regex ?? false,
            scope: request.scope ?? "all",
        };
        return (item: Parameters<typeof replaceText>[0]): FixResult =>
            replaceText(item, options);
    }

    return {
        /**
         * Applies a fix to drafts, each on its own: the change is saved as
         * a new revision (validated like any edit; one that would break the
         * item is rejected) unless `dryRun`, which only says what would
         * change. Unchanged drafts say why.
         *
         * @throws InvalidFixError, ExerciseNotFoundError, DraftNotFoundError
         */
        applyFix(input: {
            request: FixRequest;
            target: FixTarget;
            dryRun: boolean;
        }) {
            const fix = fixer(input.request);
            const name: FixName = input.request.fix;
            const outcomes: FixOutcome[] = [];
            for (const itemId of itemIdsFor(input.target)) {
                const draft = deps.drafts.get(itemId);
                if (draft == null) {
                    throw new DraftNotFoundError(itemId);
                }
                const result = fix(draft.item);
                if (result.changes.length === 0) {
                    outcomes.push({
                        itemId,
                        outcome: "unchanged",
                        reason: "skipped" in result ? result.skipped : "",
                    });
                    continue;
                }
                const changes = result.changes.map((c) => describeChange(c));
                if (input.dryRun) {
                    outcomes.push({itemId, outcome: "would change", changes});
                    continue;
                }
                const saved = deps.draftUseCases.editItem(itemId, {
                    patch: result.changes.map(({path, after}) => ({
                        op: "replace" as const,
                        path,
                        value: after,
                    })),
                    change: `apply_fix: ${name}`,
                });
                outcomes.push(
                    saved.ok
                        ? {
                              itemId,
                              outcome: "changed",
                              revision: saved.draft.revision,
                              changes,
                              ...(saved.issues.length > 0
                                  ? {warnings: saved.issues.length}
                                  : {}),
                          }
                        : {itemId, outcome: "rejected", issues: saved.issues},
                );
            }
            const counts: Record<FixOutcome["outcome"], number> = {
                changed: 0,
                "would change": 0,
                unchanged: 0,
                rejected: 0,
            };
            // Unchanged drafts are counted by reason, not listed: on a
            // large exercise they'd be most of the result.
            const unchanged: Record<string, number> = {};
            const listed: FixOutcome[] = [];
            for (const outcome of outcomes) {
                counts[outcome.outcome]++;
                if (outcome.outcome === "unchanged") {
                    unchanged[outcome.reason] =
                        (unchanged[outcome.reason] ?? 0) + 1;
                } else {
                    listed.push(outcome);
                }
            }
            return {
                fix: name,
                dryRun: input.dryRun,
                counts,
                unchanged,
                outcomes: listed.slice(0, MAX_LISTED),
                ...(listed.length > MAX_LISTED
                    ? {notListed: listed.length - MAX_LISTED}
                    : {}),
            };
        },
    };
}

export type FixUseCases = ReturnType<typeof createFixUseCases>;
