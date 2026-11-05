import {partsAt} from "../domain/items/parts";
import {itemContentFields} from "../domain/search/content-fields";

import {DraftNotFoundError} from "./errors";

import type {ExerciseUseCases} from "./exercises";
import type {Draft} from "../domain/draft";
import type {DraftRepository} from "../ports/draft-repository";

/** What read_items returns of a draft when no paths are given. */
export const DEFAULT_PATHS = ["/question/content"];

/** The most drafts one call returns; `matched` counts them all. */
export const MAX_READ = 200;

export type ReadItemsInput = {
    /** These drafts, in this order. */
    itemIds?: ReadonlyArray<string>;
    /** This exercise's drafts, in its order. Neither: every draft. */
    exerciseId?: string;
    /** JSON Pointers into each item; DEFAULT_PATHS when left out. */
    paths?: ReadonlyArray<string>;
    /**
     * Only drafts whose question or hints contain this text (any case), as
     * written: Markdown, TeX and widget placeholders included.
     */
    contains?: string;
    /** Only drafts using this widget type, nested widgets included. */
    widgetType?: string;
    limit: number;
};

export type ReadItem = {
    itemId: string;
    revision: number;
    notes?: string;
    /** Its problem type, when read by exercise. */
    problemType?: string | null;
    /** The item's parts at the paths asked for; null where it has none. */
    parts: Record<string, unknown>;
};

/**
 * Reads parts of many drafts in one call, in the server: what an agent
 * would otherwise do by reading the drafts' files, which authors' machines
 * don't let it reach.
 */
export function createReadItemsUseCase(deps: {
    drafts: DraftRepository;
    exercises: Pick<ExerciseUseCases, "getExercise">;
}) {
    /** The drafts asked for, each with its problem type when known. */
    function chosen(
        input: ReadItemsInput,
    ): Array<{draft: Draft; problemType?: string | null}> {
        if (input.itemIds != null) {
            return input.itemIds.map((itemId) => {
                const draft = deps.drafts.get(itemId);
                if (draft == null) {
                    throw new DraftNotFoundError(itemId);
                }
                return {draft};
            });
        }
        if (input.exerciseId != null) {
            return deps.exercises
                .getExercise(input.exerciseId)
                .problemTypes.flatMap((problemType) =>
                    problemType.items.flatMap(({itemId}) => {
                        const draft = deps.drafts.get(itemId);
                        return draft == null
                            ? []
                            : [{draft, problemType: problemType.name}];
                    }),
                );
        }
        // Every draft, most recently changed first.
        return [...deps.drafts.list()]
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
            .map((draft) => ({draft}));
    }

    function matches(draft: Draft, input: ReadItemsInput): boolean {
        if (input.contains != null && input.contains !== "") {
            const wanted = input.contains.toLowerCase();
            const contents = [
                draft.item.question.content,
                ...draft.item.hints.map((hint) => hint.content),
            ];
            if (!contents.some((c) => c.toLowerCase().includes(wanted))) {
                return false;
            }
        }
        if (input.widgetType != null) {
            const types = itemContentFields(draft.item).widgetTypes;
            if (!types.includes(input.widgetType)) {
                return false;
            }
        }
        return true;
    }

    return {
        /**
         * @throws DraftNotFoundError for a named draft that doesn't exist,
         * ExerciseNotFoundError for an unknown exercise.
         */
        readItems(input: ReadItemsInput): {
            matched: number;
            items: ReadItem[];
            notReturned?: number;
        } {
            const paths =
                input.paths != null && input.paths.length > 0
                    ? input.paths
                    : DEFAULT_PATHS;
            const found = chosen(input).filter(({draft}) =>
                matches(draft, input),
            );
            const limit = Math.min(input.limit, MAX_READ);
            const items = found.slice(0, limit).map(({draft, problemType}) => ({
                itemId: draft.itemId,
                revision: draft.revision,
                ...(draft.notes != null ? {notes: draft.notes} : {}),
                ...(problemType !== undefined ? {problemType} : {}),
                parts: partsAt(draft.item, paths),
            }));
            return {
                matched: found.length,
                items,
                ...(found.length > items.length
                    ? {notReturned: found.length - items.length}
                    : {}),
            };
        },
    };
}

export type ReadItemsUseCase = ReturnType<typeof createReadItemsUseCase>;
