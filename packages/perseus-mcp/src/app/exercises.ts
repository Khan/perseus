import {newDraft} from "../domain/draft";
import {itemIdsOf, placeItems} from "../domain/exercises/exercise";
import {readImport} from "../domain/exercises/import-shapes";
import {parseItem} from "../domain/items/parse";
import {validateItem} from "../domain/items/validate";

import {
    ExerciseNotFoundError,
    DraftNotFoundError,
    ExportExistsError,
    InvalidImportError,
} from "./errors";

import type {Catalog} from "./catalog";
import type {Draft} from "../domain/draft";
import type {Exercise, ExerciseItem} from "../domain/exercises/exercise";
import type {ImportShape} from "../domain/exercises/import-shapes";
import type {Issue} from "../domain/items/validate";
import type {Clipboard} from "../ports/clipboard";
import type {DraftFeed} from "../ports/draft-feed";
import type {DraftRepository} from "../ports/draft-repository";
import type {ExerciseFeed} from "../ports/exercise-feed";
import type {ExerciseRepository} from "../ports/exercise-repository";
import type {ExportFileWriter} from "../ports/export-file-writer";
import type {ItemFileReader} from "../ports/item-file-reader";

export type ExerciseDependencies = {
    exercises: ExerciseRepository;
    drafts: DraftRepository;
    /** Announces exercise saves, for watchExercise. */
    exerciseFeed: ExerciseFeed;
    /** Announces draft saves, for watchExercise. */
    draftFeed: DraftFeed;
    files: ItemFileReader;
    exports: ExportFileWriter;
    /** Where an export is copied, for pasting into the exercise editor. */
    clipboard: Clipboard;
    catalog: Catalog;
    /** Where export_exercise writes when it isn't given a path. */
    defaultExportPath: (exercise: Exercise) => string;
    now: () => Date;
    newId: () => string;
};

/** An item the file held that couldn't be imported, and why. */
export type SkippedItem = {
    problemType: string | null;
    /** Its position in its problem type, from 1. */
    position: number;
    reason: string;
};

/** What the exercise editor's import would make of an exported item. */
export type ImportChange = "new" | "edited" | "unchanged";

/** An exercise's problem types, with each draft's state. */
export type ExerciseTree = {
    exerciseId: string;
    name: string;
    notes?: string;
    editorUrl?: string;
    problemTypes: Array<{
        name: string | null;
        contentId?: string;
        items: Array<{
            itemId: string;
            contentId?: string;
            revision?: number;
            /**
             * The question's first non-blank line, as written (Markdown,
             * TeX and widget placeholders included), to tell items apart.
             */
            summary?: string;
            /** What the exercise editor's import would make of it. */
            change?: ImportChange;
            /** Set when the draft is gone. */
            missing?: true;
        }>;
    }>;
};

/** The tree with each draft's validation issues, as the exercise page shows it. */
export type ExerciseView = Omit<ExerciseTree, "problemTypes"> & {
    problemTypes: Array<
        Omit<ExerciseTree["problemTypes"][number], "items"> & {
            items: Array<
                ExerciseTree["problemTypes"][number]["items"][number] & {
                    issues?: Issue[];
                }
            >;
        }
    >;
};

/**
 * How many new or edited items the exercise editor's bulk import reviews in
 * one pass; unchanged items don't count.
 */
const REVIEW_LIMIT = 50;

/** The first non-blank line of `content`, cut at 200 characters. */
function firstLine(content: string): string {
    const line = content.split("\n").find((l) => l.trim() !== "") ?? "";
    return line.trim().slice(0, 200);
}

/** The format the exercise editor's bulk JSON import reads. */
type BulkProblemType = {
    problemType: string;
    contentId?: string;
    assessmentItems: Array<{contentId?: string; itemData: string}>;
};

/**
 * The use cases for groups of drafts: importing a file of items as a
 * exercise, organizing it, checking it, and exporting it in the exercise
 * editor's bulk JSON format.
 */
export function createExerciseUseCases(deps: ExerciseDependencies) {
    const {exercises, drafts} = deps;

    function getExercise(exerciseId: string): Exercise {
        const exercise = exercises.get(exerciseId);
        if (exercise == null) {
            throw new ExerciseNotFoundError(exerciseId);
        }
        return exercise;
    }

    /**
     * New if it has no contentId (the import creates it); edited if its item
     * differs from the revision it was imported at; unchanged otherwise.
     */
    function changeSinceImport(item: ExerciseItem, draft: Draft): ImportChange {
        if (item.contentId == null) {
            return "new";
        }
        const imported = drafts.getRevision(
            item.itemId,
            item.importedRevision ?? 1,
        );
        return imported != null &&
            JSON.stringify(imported.item) === JSON.stringify(draft.item)
            ? "unchanged"
            : "edited";
    }

    // Validating every item each time an exercise page updates would redo
    // the same work: a revision's item never changes.
    const issueCache = new Map<string, Issue[]>();
    function issuesOf(draft: Draft): Issue[] {
        const key = `${draft.itemId}@${draft.revision}`;
        let issues = issueCache.get(key);
        if (issues == null) {
            issues = validateItem(draft.item, deps.catalog.widgets()).issues;
            issueCache.set(key, issues);
        }
        return issues;
    }

    function treeOf(exercise: Exercise, withIssues: boolean): ExerciseView {
        return {
            exerciseId: exercise.exerciseId,
            name: exercise.name,
            notes: exercise.notes,
            editorUrl: exercise.editorUrl,
            problemTypes: exercise.problemTypes.map((problemType) => ({
                name: problemType.name,
                contentId: problemType.contentId,
                items: problemType.items.map((item) => {
                    const draft = drafts.get(item.itemId);
                    if (draft == null) {
                        return {...item, missing: true as const};
                    }
                    return {
                        ...item,
                        revision: draft.revision,
                        summary: firstLine(draft.item.question.content),
                        change: changeSinceImport(item, draft),
                        ...(withIssues ? {issues: issuesOf(draft)} : {}),
                    };
                }),
            })),
        };
    }

    /**
     * The exercise in the exercise editor's bulk JSON format, with what
     * its import would make of each item.
     */
    function bulkExport(exercise: Exercise, onlyChanged: boolean) {
        const counts: Record<ImportChange, number> = {
            new: 0,
            edited: 0,
            unchanged: 0,
        };
        const missing: string[] = [];
        const payload: BulkProblemType[] = exercise.problemTypes
            .map((problemType) => ({
                // The bulk format needs a name; items with no problem type
                // go under an empty one, which its import routes to
                // Unassigned.
                problemType: problemType.name ?? "",
                ...(problemType.contentId != null
                    ? {contentId: problemType.contentId}
                    : {}),
                assessmentItems: problemType.items.flatMap((item) => {
                    const draft = drafts.get(item.itemId);
                    if (draft == null) {
                        missing.push(item.itemId);
                        return [];
                    }
                    const change = changeSinceImport(item, draft);
                    counts[change]++;
                    if (onlyChanged && change === "unchanged") {
                        return [];
                    }
                    return [
                        {
                            ...(item.contentId != null
                                ? {contentId: item.contentId}
                                : {}),
                            itemData: JSON.stringify(draft.item),
                        },
                    ];
                }),
            }))
            .filter(
                (problemType) =>
                    !onlyChanged || problemType.assessmentItems.length > 0,
            );
        return {
            json: JSON.stringify(payload, null, 2),
            payload,
            counts,
            missing,
        };
    }

    function getDraft(itemId: string): Draft {
        const draft = drafts.get(itemId);
        if (draft == null) {
            throw new DraftNotFoundError(itemId);
        }
        return draft;
    }

    return {
        /**
         * Reads a file of items into a new exercise: a draft per item
         * that parses (migrated to the latest schema), grouped as the file
         * groups them. Items that don't parse are skipped and reported.
         *
         * @throws InvalidImportError if the file isn't JSON or isn't in a
         * shape import reads.
         */
        async importExercise(input: {
            path: string;
            name?: string;
            notes?: string;
            editorUrl?: string;
        }): Promise<{
            exercise: Exercise;
            shape: ImportShape;
            imported: number;
            skipped: SkippedItem[];
        }> {
            let data: unknown;
            try {
                data = JSON.parse(await deps.files.read(input.path));
            } catch (e) {
                throw new InvalidImportError(
                    `Couldn't read ${input.path} as JSON: ${String(e)}`,
                );
            }
            const read = readImport(data);
            if (!read.ok) {
                throw new InvalidImportError(read.error);
            }

            const now = deps.now();
            const skipped: SkippedItem[] = [];
            const problemTypes = read.problemTypes.map((problemType) => ({
                name: problemType.name,
                contentId: problemType.contentId,
                items: problemType.items.flatMap((item, index) => {
                    // The bulk format may hold itemData as a JSON string;
                    // parseItem reads both.
                    const parsed = parseItem(item.itemData);
                    if (!parsed.ok) {
                        skipped.push({
                            problemType: problemType.name,
                            position: index + 1,
                            reason: parsed.error,
                        });
                        return [];
                    }
                    const draft = newDraft({
                        itemId: deps.newId(),
                        item: parsed.item,
                        notes: item.label,
                        change: `Imported from ${input.path}`,
                        now,
                    });
                    drafts.save(draft);
                    return [
                        {
                            itemId: draft.itemId,
                            contentId: item.contentId,
                            importedRevision: draft.revision,
                        },
                    ];
                }),
            }));

            const exercise: Exercise = {
                exerciseId: deps.newId(),
                name: input.name ?? input.path,
                notes: input.notes,
                editorUrl: input.editorUrl,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
                problemTypes: problemTypes.filter(
                    (problemType) => problemType.items.length > 0,
                ),
            };
            exercises.save(exercise);
            return {
                exercise,
                shape: read.shape,
                imported: itemIdsOf(exercise).length,
                skipped,
            };
        },

        /** @throws ExerciseNotFoundError */
        getExercise(exerciseId: string): ExerciseTree {
            return treeOf(getExercise(exerciseId), false);
        },

        /**
         * Calls `listener` with the exercise's tree, its drafts' issues
         * included, straight away and again after the exercise or any of
         * its drafts changes (once for changes made together, such as
         * edit_items), until the returned function is called.
         *
         * @throws ExerciseNotFoundError
         */
        watchExercise(
            exerciseId: string,
            listener: (view: ExerciseView) => void,
        ): () => void {
            let exercise = getExercise(exerciseId);
            let closed = false;
            let pending = false;
            let draftSubscriptions: Array<() => void> = [];

            function followDrafts() {
                draftSubscriptions.forEach((unsubscribe) => unsubscribe());
                draftSubscriptions = itemIdsOf(exercise).map((itemId) =>
                    deps.draftFeed.subscribe(itemId, schedule),
                );
            }
            function schedule() {
                if (pending) {
                    return;
                }
                pending = true;
                queueMicrotask(() => {
                    pending = false;
                    if (closed) {
                        return;
                    }
                    exercise = getExercise(exerciseId);
                    followDrafts();
                    listener(treeOf(exercise, true));
                });
            }

            const unsubscribeExercise = deps.exerciseFeed.subscribe(
                exerciseId,
                schedule,
            );
            followDrafts();
            listener(treeOf(exercise, true));
            return () => {
                closed = true;
                unsubscribeExercise();
                draftSubscriptions.forEach((unsubscribe) => unsubscribe());
            };
        },

        /**
         * The exercise in the exercise editor's bulk JSON format, as
         * exportExercise writes it, for the exercise page's copy button.
         *
         * @throws ExerciseNotFoundError
         */
        bulkJson(exerciseId: string, onlyChanged = false): string {
            return bulkExport(getExercise(exerciseId), onlyChanged).json;
        },

        listExercises(): Array<{
            exerciseId: string;
            name: string;
            notes?: string;
            editorUrl?: string;
            updatedAt: string;
            items: number;
        }> {
            return exercises.list().map((exercise) => ({
                exerciseId: exercise.exerciseId,
                name: exercise.name,
                notes: exercise.notes,
                editorUrl: exercise.editorUrl,
                updatedAt: exercise.updatedAt,
                items: itemIdsOf(exercise).length,
            }));
        },

        /**
         * Changes an exercise's name, notes or editor URL; an empty string
         * clears the notes or the URL.
         *
         * @throws ExerciseNotFoundError
         */
        updateExercise(
            exerciseId: string,
            changes: {name?: string; notes?: string; editorUrl?: string},
        ): Exercise {
            const exercise = getExercise(exerciseId);
            const cleared = (value: string | undefined, current?: string) =>
                value == null ? current : value === "" ? undefined : value;
            const updated: Exercise = {
                ...exercise,
                name: changes.name ?? exercise.name,
                notes: cleared(changes.notes, exercise.notes),
                editorUrl: cleared(changes.editorUrl, exercise.editorUrl),
                updatedAt: deps.now().toISOString(),
            };
            exercises.save(updated);
            return updated;
        },

        /**
         * Puts drafts at the end of a problem type (null for none), adding
         * the problem type if it's new; drafts not yet in the exercise are
         * added. A problem type left empty is removed.
         *
         * @throws ExerciseNotFoundError
         * @throws DraftNotFoundError
         */
        placeItems(
            exerciseId: string,
            itemIds: ReadonlyArray<string>,
            problemType: string | null,
        ): Exercise {
            const exercise = getExercise(exerciseId);
            itemIds.forEach(getDraft);
            const placed = placeItems(
                exercise,
                itemIds,
                problemType,
                deps.now(),
            );
            exercises.save(placed);
            return placed;
        },

        /**
         * Validates every draft in the exercise, as validate_item does.
         *
         * @throws ExerciseNotFoundError
         */
        validateExercise(exerciseId: string): Array<{
            itemId: string;
            valid: boolean;
            issues: Issue[];
        }> {
            return itemIdsOf(getExercise(exerciseId)).map((itemId) => {
                const draft = drafts.get(itemId);
                if (draft == null) {
                    return {
                        itemId,
                        valid: false,
                        issues: [
                            {
                                severity: "error",
                                code: "missing-draft",
                                path: "(root)",
                                message: `The draft "${itemId}" is gone.`,
                            },
                        ],
                    };
                }
                const {valid, issues} = validateItem(
                    draft.item,
                    deps.catalog.widgets(),
                );
                return {itemId, valid, issues};
            });
        },

        /**
         * Writes the exercise in the exercise editor's bulk JSON format:
         * its problem types and their items, each item's data as a JSON
         * string of its latest revision, with the contentIds it was
         * imported with. With `onlyChanged`, only the items that are new
         * (no contentId) or edited since import, which are what that
         * import reviews. The JSON is also copied to the clipboard, since
         * the import takes a paste, unless `copy` is false. Drafts that are
         * gone are left out and reported.
         *
         * @throws ExerciseNotFoundError
         * @throws ExportExistsError if the file exists and `overwrite` isn't
         * set.
         */
        exportExercise(input: {
            exerciseId: string;
            path?: string;
            overwrite?: boolean;
            onlyChanged?: boolean;
            copy?: boolean;
        }): {
            path: string;
            copied: boolean;
            problemTypes: number;
            items: number;
            counts: Record<ImportChange, number>;
            /** Set when more items need review than the import takes. */
            overReviewLimit?: string;
            missing: string[];
        } {
            const exercise = getExercise(input.exerciseId);
            const target = input.path ?? deps.defaultExportPath(exercise);
            if (input.overwrite !== true && deps.exports.exists(target)) {
                throw new ExportExistsError(target);
            }
            const {json, payload, counts, missing} = bulkExport(
                exercise,
                input.onlyChanged === true,
            );
            const written = deps.exports.write(target, json);
            const copied = input.copy !== false && deps.clipboard.copy(json);
            const toReview = counts.new + counts.edited;
            return {
                path: written,
                copied,
                problemTypes: payload.length,
                items: payload.reduce(
                    (count, problemType) =>
                        count + problemType.assessmentItems.length,
                    0,
                ),
                counts,
                ...(toReview > REVIEW_LIMIT
                    ? {
                          overReviewLimit:
                              `${toReview} items are new or edited, and the ` +
                              `exercise editor's import reviews at most ` +
                              `${REVIEW_LIMIT} at a time. Import in ` +
                              `batches: move some items to another ` +
                              `exercise, or paste this export in parts.`,
                      }
                    : {}),
                missing,
            };
        },
    };
}

export type ExerciseUseCases = ReturnType<typeof createExerciseUseCases>;
