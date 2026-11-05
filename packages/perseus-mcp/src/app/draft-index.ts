import {draftDocument} from "../domain/search/draft-document";

import type {Draft} from "../domain/draft";
import type {Exercise} from "../domain/exercises/exercise";
import type {
    ContentDocument,
    Placement,
} from "../domain/search/content-document";
import type {DraftExercise} from "../domain/search/draft-document";
import type {DraftSearchIndex} from "../ports/content-search";
import type {DraftRepository} from "../ports/draft-repository";
import type {ExerciseRepository} from "../ports/exercise-repository";

export type DraftIndexingDependencies = {
    drafts: DraftRepository;
    exercises: ExerciseRepository;
    index: DraftSearchIndex;
    /** Where a published item is in the content tree, if it's indexed. */
    placementOf: (contentId: string) => Promise<Placement | undefined>;
    /** Reads TeX aloud, made once, when first needed. */
    speak: () => Promise<(tex: string) => string>;
    /** Where a failure to index is reported; drafts are saved regardless. */
    log: (message: string) => void;
};

/**
 * Keeps the drafts' search index matching the drafts: every draft once at
 * start, then a draft each time it's saved, and an exercise's drafts each
 * time it is (their titles and problem types come from it). Updates run one
 * at a time, in order, and never hold up a save: a failure is logged, and
 * the next full sync puts it right.
 */
export function createDraftIndexing(deps: DraftIndexingDependencies) {
    let speak: Promise<(tex: string) => string> | null = null;
    const placements = new Map<string, Placement | undefined>();
    let queue: Promise<void> = Promise.resolve();

    function exercisesOf(itemId: string): DraftExercise[] {
        return deps.exercises.list().flatMap((exercise) =>
            exercise.problemTypes.flatMap((problemType) =>
                problemType.items
                    .filter((item) => item.itemId === itemId)
                    .map((item) => ({
                        exerciseId: exercise.exerciseId,
                        name: exercise.name,
                        problemType: problemType.name,
                        publishedId: item.contentId,
                    })),
            ),
        );
    }

    async function placementOf(
        contentId: string,
    ): Promise<Placement | undefined> {
        if (!placements.has(contentId)) {
            placements.set(contentId, await deps.placementOf(contentId));
        }
        return placements.get(contentId);
    }

    async function documentFor(draft: Draft): Promise<ContentDocument> {
        speak ??= deps.speak();
        const exercises = exercisesOf(draft.itemId);
        const publishedId = exercises.find(
            (e) => e.publishedId != null,
        )?.publishedId;
        const placement =
            publishedId == null ? undefined : await placementOf(publishedId);
        return draftDocument(draft, exercises, placement, await speak);
    }

    function enqueue(what: string, work: () => Promise<void>): Promise<void> {
        queue = queue.then(work).catch((e: unknown) => {
            deps.log(`couldn't index ${what} for search: ${String(e)}`);
        });
        return queue;
    }

    return {
        /** Indexes every draft, replacing what the index held. */
        syncAll(): Promise<void> {
            return enqueue("the drafts", async () => {
                const documents: ContentDocument[] = [];
                for (const draft of deps.drafts.list()) {
                    documents.push(await documentFor(draft));
                }
                await deps.index.replaceAll(documents);
            });
        },
        draftSaved(draft: Draft): Promise<void> {
            return enqueue(`draft ${draft.itemId}`, async () => {
                await deps.index.upsert([await documentFor(draft)]);
            });
        },
        exerciseSaved(exercise: Exercise): Promise<void> {
            return enqueue(`exercise ${exercise.exerciseId}`, async () => {
                const documents: ContentDocument[] = [];
                for (const problemType of exercise.problemTypes) {
                    for (const {itemId} of problemType.items) {
                        const draft = deps.drafts.get(itemId);
                        if (draft != null) {
                            documents.push(await documentFor(draft));
                        }
                    }
                }
                await deps.index.upsert(documents);
            });
        },
    };
}

export type DraftIndexing = ReturnType<typeof createDraftIndexing>;

/**
 * Wraps the repositories so every save is indexed for search, as
 * withDraftFeed wraps drafts so every save is announced: no change can be
 * saved without reaching the index.
 */
export function withDraftIndexing(
    drafts: DraftRepository,
    exercises: ExerciseRepository,
    indexing: Pick<DraftIndexing, "draftSaved" | "exerciseSaved">,
): {drafts: DraftRepository; exercises: ExerciseRepository} {
    return {
        drafts: {
            get: (itemId) => drafts.get(itemId),
            list: () => drafts.list(),
            locationOf: (itemId) => drafts.locationOf(itemId),
            skipped: () => drafts.skipped(),
            getRevision: (itemId, revision) =>
                drafts.getRevision(itemId, revision),
            revisions: (itemId) => drafts.revisions(itemId),
            save(draft) {
                drafts.save(draft);
                void indexing.draftSaved(draft);
            },
        },
        exercises: {
            get: (exerciseId) => exercises.get(exerciseId),
            list: () => exercises.list(),
            save(exercise) {
                exercises.save(exercise);
                void indexing.exerciseSaved(exercise);
            },
        },
    };
}
