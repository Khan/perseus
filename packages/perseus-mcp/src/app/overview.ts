// What the homepage and the images page show: what this server holds, the
// latest work, and the Graffiti diagrams with the drafts that show them.
import {itemIdsOf} from "../domain/exercises/exercise";
import {diagramIdsIn} from "../domain/graffiti/diagram";

import type {GraffitiUseCases} from "./graffiti";
import type {Draft} from "../domain/draft";
import type {DraftRepository} from "../ports/draft-repository";
import type {ExerciseRepository} from "../ports/exercise-repository";

/** How many recent drafts and exercises the homepage lists. */
const RECENT = 5;

/** A draft as the pages list it: enough to recognize and open it. */
export type DraftSummary = {
    itemId: string;
    revision: number;
    updatedAt: string;
    /** The question's first non-blank line, as written. */
    firstLine: string;
    exercises: Array<{exerciseId: string; name: string}>;
};

export type Overview = {
    drafts: number;
    exercises: number;
    diagrams: number;
    recentDrafts: DraftSummary[];
    recentExercises: Array<{
        exerciseId: string;
        name: string;
        updatedAt: string;
        items: number;
    }>;
};

export type DiagramSummary = {
    graffitiId: string;
    revision: number;
    notes?: string;
    updatedAt: string;
    /** The drafts whose items show it, most recently changed first. */
    usedIn: DraftSummary[];
};

function firstLine(content: string): string {
    return (
        content
            .split("\n")
            .find((line) => line.trim() !== "")
            ?.trim() ?? ""
    );
}

export function createOverviewUseCases(deps: {
    drafts: DraftRepository;
    exercises: ExerciseRepository;
    /** Graffiti diagrams, when Graffiti is there to draw them. */
    graffiti?: Pick<GraffitiUseCases, "listGraffiti">;
}) {
    /** Each draft's exercises, by itemId. */
    function exercisesByItem(): Map<
        string,
        Array<{exerciseId: string; name: string}>
    > {
        const byItem = new Map<
            string,
            Array<{exerciseId: string; name: string}>
        >();
        for (const exercise of deps.exercises.list()) {
            for (const itemId of new Set(itemIdsOf(exercise))) {
                byItem.set(itemId, [
                    ...(byItem.get(itemId) ?? []),
                    {exerciseId: exercise.exerciseId, name: exercise.name},
                ]);
            }
        }
        return byItem;
    }

    function summarize(
        draft: Draft,
        byItem: ReturnType<typeof exercisesByItem>,
    ): DraftSummary {
        return {
            itemId: draft.itemId,
            revision: draft.revision,
            updatedAt: draft.updatedAt,
            firstLine: firstLine(draft.item.question.content),
            exercises: byItem.get(draft.itemId) ?? [],
        };
    }

    function newestFirst<T extends {updatedAt: string}>(list: T[]): T[] {
        return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }

    return {
        /** What the homepage shows. */
        overview(): Overview {
            const drafts = deps.drafts.list();
            const exercises = deps.exercises.list();
            const byItem = exercisesByItem();
            return {
                drafts: drafts.length,
                exercises: exercises.length,
                diagrams: deps.graffiti?.listGraffiti().length ?? 0,
                recentDrafts: newestFirst(drafts)
                    .slice(0, RECENT)
                    .map((draft) => summarize(draft, byItem)),
                recentExercises: newestFirst(exercises)
                    .slice(0, RECENT)
                    .map((exercise) => ({
                        exerciseId: exercise.exerciseId,
                        name: exercise.name,
                        updatedAt: exercise.updatedAt,
                        items: itemIdsOf(exercise).length,
                    })),
            };
        },

        /**
         * Every Graffiti diagram, most recently changed first, with the
         * drafts that show it.
         */
        diagrams(): DiagramSummary[] {
            if (deps.graffiti == null) {
                return [];
            }
            const byItem = exercisesByItem();
            const usedIn = new Map<string, DraftSummary[]>();
            for (const draft of newestFirst(deps.drafts.list())) {
                for (const graffitiId of diagramIdsIn(draft.item)) {
                    usedIn.set(graffitiId, [
                        ...(usedIn.get(graffitiId) ?? []),
                        summarize(draft, byItem),
                    ]);
                }
            }
            return newestFirst(deps.graffiti.listGraffiti()).map((diagram) => ({
                ...diagram,
                usedIn: usedIn.get(diagram.graffitiId) ?? [],
            }));
        },
    };
}

export type OverviewUseCases = ReturnType<typeof createOverviewUseCases>;
