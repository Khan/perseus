/**
 * A set of drafts grouped by problem type, as an exercise groups its items:
 * what import_exercise makes from a file and export_exercise writes back.
 * It holds the drafts' ids, not their items, so editing a draft changes what
 * the exercise exports.
 */
export type Exercise = {
    exerciseId: string;
    name: string;
    notes?: string;
    /**
     * Where the exercise is edited on the site, as the author gave it, for
     * linking to it.
     */
    editorUrl?: string;
    createdAt: string;
    updatedAt: string;
    problemTypes: ExerciseProblemType[];
};

export type ExerciseProblemType = {
    /** Null for items no problem type was given for. */
    name: string | null;
    /** The problem type's id where it came from, for writing it back. */
    contentId?: string;
    items: ExerciseItem[];
};

export type ExerciseItem = {
    itemId: string;
    /** The item's id where it came from, for writing it back. */
    contentId?: string;
    /**
     * The draft's revision when it was imported, to tell whether it has
     * changed since: an export counts the items that have.
     */
    importedRevision?: number;
};

/** Every draft in the exercise, in order. */
/**
 * Whether `url` is a web page's address, which the exercise page can link
 * to. Anything else, such as a `javascript:` URL from an imported file,
 * would run in the page.
 */
export function isWebUrl(url: string): boolean {
    try {
        const {protocol} = new URL(url);
        return protocol === "https:" || protocol === "http:";
    } catch {
        return false;
    }
}

export function itemIdsOf(exercise: Exercise): string[] {
    return exercise.problemTypes.flatMap((problemType) =>
        problemType.items.map((item) => item.itemId),
    );
}

/**
 * The exercise with `itemIds` moved to the end of the problem type named
 * `problemType` (null for no problem type), which is added if it's new.
 * Items not in the exercise are added. A problem type left empty is
 * removed.
 */
export function placeItems(
    exercise: Exercise,
    itemIds: ReadonlyArray<string>,
    problemType: string | null,
    now: Date,
): Exercise {
    const moving = new Set(itemIds);
    const existing = new Map(
        exercise.problemTypes.flatMap((type) =>
            type.items.map((item) => [item.itemId, item] as const),
        ),
    );
    const placed = itemIds.map((itemId) => existing.get(itemId) ?? {itemId});
    let problemTypes = exercise.problemTypes.map((type) => ({
        ...type,
        items: type.items.filter((item) => !moving.has(item.itemId)),
    }));
    const target = problemTypes.findIndex((type) => type.name === problemType);
    if (target === -1) {
        problemTypes.push({name: problemType, items: placed});
    } else {
        problemTypes[target] = {
            ...problemTypes[target],
            items: [...problemTypes[target].items, ...placed],
        };
    }
    problemTypes = problemTypes.filter((type) => type.items.length > 0);
    return {...exercise, problemTypes, updatedAt: now.toISOString()};
}
